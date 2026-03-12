import { inferDirectoryCategory } from "../category-map";
import type { ImportedVenue } from "../types";

const GOOGLE_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const PAGE_SIZE = 20;
const MAX_PAGES_PER_QUERY = 3;
const NEXT_PAGE_DELAY_MS = 1500;

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.websiteUri",
  "places.nationalPhoneNumber",
  "places.rating",
  "places.primaryType",
  "places.types",
  "places.googleMapsUri",
  "nextPageToken",
].join(",");

const DEFAULT_CITY = "Lancaster, PA";

const DEFAULT_QUERIES = [
  "restaurants in Lancaster, PA",
  "coffee shops in Lancaster, PA",
  "bars in Lancaster, PA",
  "music venues in Lancaster, PA",
  "art galleries in Lancaster, PA",
  "event venues in Lancaster, PA",
  "breweries in Lancaster, PA",
  "bakeries in Lancaster, PA",
  "bookstores in Lancaster, PA",
  "boutiques in Lancaster, PA",
];

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  websiteUri?: string;
  nationalPhoneNumber?: string;
  rating?: number;
  primaryType?: string;
  types?: string[];
  googleMapsUri?: string;
};

function getApiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    throw new Error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY");
  }
  return key;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildQueries(location?: string, query?: string) {
  const city = (location || DEFAULT_CITY).trim();
  if (query?.trim()) {
    return query
      .split(/[\n|,]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => (/\bin\s+/i.test(item) ? item : `${item} in ${city}`));
  }
  return DEFAULT_QUERIES.map((item) => item.replace(DEFAULT_CITY, city));
}

async function searchTextPage(params: {
  apiKey: string;
  textQuery: string;
  pageToken?: string;
}) {
  const body: Record<string, unknown> = {
    textQuery: params.textQuery,
    pageSize: PAGE_SIZE,
    languageCode: "en",
    regionCode: "US",
  };

  if (params.pageToken) body.pageToken = params.pageToken;

  const response = await fetch(GOOGLE_TEXT_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": params.apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Google Places request failed (${response.status} ${response.statusText}): ${message}`);
  }

  return (await response.json()) as {
    places?: GooglePlace[];
    nextPageToken?: string;
  };
}

function normalizePlace(place: GooglePlace): ImportedVenue | null {
  const externalId = place.id?.trim() || "";
  const name = place.displayName?.text?.trim() || "";
  if (!externalId || !name) return null;

  const rawCategories = Array.from(
    new Set([...(place.types || []), place.primaryType || ""].filter(Boolean).map((value) => value.replace(/_/g, " ")))
  );

  return {
    source: "google",
    externalId,
    name,
    address: place.formattedAddress || null,
    latitude: typeof place.location?.latitude === "number" ? place.location.latitude : null,
    longitude: typeof place.location?.longitude === "number" ? place.location.longitude : null,
    website: place.websiteUri || place.googleMapsUri || null,
    phone: place.nationalPhoneNumber || null,
    rating: typeof place.rating === "number" ? place.rating : null,
    rawCategories,
    category: inferDirectoryCategory({
      category: place.primaryType?.replace(/_/g, " ") || rawCategories[0] || null,
      rawCategories,
      name,
    }),
    description: null,
  };
}

function isLancasterArea(venue: ImportedVenue) {
  const haystack = `${venue.name} ${venue.address || ""} ${(venue.rawCategories || []).join(" ")}`.toLowerCase();
  return [
    "lancaster, pa",
    "lancaster pa",
    "lititz",
    "millersville",
    "manheim",
    "east petersburg",
    "landisville",
    "strasburg",
  ].some((term) => haystack.includes(term));
}

function mergeVenue(existing: ImportedVenue, incoming: ImportedVenue): ImportedVenue {
  return {
    ...existing,
    website: existing.website || incoming.website || null,
    phone: existing.phone || incoming.phone || null,
    rating: existing.rating ?? incoming.rating ?? null,
    rawCategories: Array.from(new Set([...(existing.rawCategories || []), ...(incoming.rawCategories || [])])),
    category: existing.category || incoming.category || null,
    address: existing.address || incoming.address || null,
    latitude: existing.latitude ?? incoming.latitude ?? null,
    longitude: existing.longitude ?? incoming.longitude ?? null,
  };
}

export async function importGoogleVenues(params: { location?: string; query?: string } = {}): Promise<ImportedVenue[]> {
  const apiKey = getApiKey();
  const queries = buildQueries(params.location, params.query);
  const byId = new Map<string, ImportedVenue>();

  for (const textQuery of queries) {
    let pageToken: string | undefined;
    let page = 0;

    do {
      const data = await searchTextPage({ apiKey, textQuery, pageToken });
      const normalized = (data.places || [])
        .map(normalizePlace)
        .filter((venue): venue is ImportedVenue => Boolean(venue))
        .filter(isLancasterArea);

      for (const venue of normalized) {
        const existing = byId.get(venue.externalId);
        byId.set(venue.externalId, existing ? mergeVenue(existing, venue) : venue);
      }

      page += 1;
      pageToken = data.nextPageToken;
      if (pageToken && page < MAX_PAGES_PER_QUERY) {
        await sleep(NEXT_PAGE_DELAY_MS);
      } else {
        pageToken = undefined;
      }
    } while (pageToken);
  }

  return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
}
