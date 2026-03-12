import fs from 'node:fs/promises';
import path from 'node:path';

const CACHE_PATH = path.join(process.cwd(), 'data', 'venue-cache.json');
const DEFAULT_LOCATION = process.env.VENUE_IMPORT_LOCATION || 'Lancaster, PA';
const PAGE_SIZE = 20;
const MAX_PAGES_PER_QUERY = 3;
const NEXT_PAGE_DELAY_MS = 1500;

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.location',
  'places.websiteUri',
  'places.nationalPhoneNumber',
  'places.rating',
  'places.primaryType',
  'places.types',
  'places.googleMapsUri',
  'nextPageToken',
].join(',');

const BASE_QUERIES = process.env.VENUE_IMPORT_QUERY
  ? process.env.VENUE_IMPORT_QUERY.split(/[\n|,]+/).map((item) => item.trim()).filter(Boolean)
  : [
      'restaurants',
      'coffee shops',
      'bars',
      'music venues',
      'art galleries',
      'event venues',
      'breweries',
      'bakeries',
      'bookstores',
      'boutiques',
    ];

function getApiKey() {
  return process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';
}

function getTodayCacheDay() {
  return new Date().toISOString().slice(0, 10);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readExistingCache() {
  try {
    const raw = await fs.readFile(CACHE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function buildQueries() {
  return BASE_QUERIES.map((item) => (/\bin\s+/i.test(item) ? item : `${item} in ${DEFAULT_LOCATION}`));
}

function normalizePlace(place) {
  const externalId = place?.id?.trim() || '';
  const name = place?.displayName?.text?.trim() || '';
  if (!externalId || !name) return null;

  const rawCategories = [...new Set([...(place.types || []), place.primaryType || ''].filter(Boolean).map((v) => String(v).replace(/_/g, ' ')))];
  return {
    source: 'google',
    externalId,
    name,
    address: place.formattedAddress || null,
    latitude: typeof place?.location?.latitude === 'number' ? place.location.latitude : null,
    longitude: typeof place?.location?.longitude === 'number' ? place.location.longitude : null,
    website: place.websiteUri || place.googleMapsUri || null,
    phone: place.nationalPhoneNumber || null,
    rating: typeof place.rating === 'number' ? place.rating : null,
    rawCategories,
    category: rawCategories[0] || 'place',
    description: null,
  };
}

function isLancasterArea(venue) {
  const haystack = `${venue.name} ${venue.address || ''} ${(venue.rawCategories || []).join(' ')}`.toLowerCase();
  return ['lancaster, pa', 'lancaster pa', 'lititz', 'millersville', 'manheim', 'east petersburg', 'landisville', 'strasburg'].some((term) => haystack.includes(term));
}

function mergeVenue(existing, incoming) {
  return {
    ...existing,
    website: existing.website || incoming.website || null,
    phone: existing.phone || incoming.phone || null,
    rating: existing.rating ?? incoming.rating ?? null,
    rawCategories: [...new Set([...(existing.rawCategories || []), ...(incoming.rawCategories || [])])],
    category: existing.category || incoming.category || null,
  };
}

async function searchTextPage(apiKey, textQuery, pageToken) {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery,
      pageSize: PAGE_SIZE,
      languageCode: 'en',
      regionCode: 'US',
      ...(pageToken ? { pageToken } : {}),
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Google Places request failed (${response.status} ${response.statusText}): ${await response.text()}`);
  }

  return response.json();
}

async function importGoogleVenues() {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACES_API_KEY');

  const byId = new Map();

  for (const textQuery of buildQueries()) {
    let pageToken;
    let page = 0;

    do {
      const data = await searchTextPage(apiKey, textQuery, pageToken);
      const venues = (data.places || []).map(normalizePlace).filter(Boolean).filter(isLancasterArea);

      for (const venue of venues) {
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

  return [...byId.values()].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

const existingCache = await readExistingCache();
if (existingCache?.cacheDay === getTodayCacheDay() && Array.isArray(existingCache.venues) && existingCache.venues.length > 0) {
  console.log(`Venue cache already populated for ${existingCache.cacheDay}; skipping refresh.`);
  process.exit(0);
}

const venues = await importGoogleVenues();
const cache = {
  generatedAt: new Date().toISOString(),
  cacheDay: getTodayCacheDay(),
  location: DEFAULT_LOCATION,
  query: BASE_QUERIES.join(', '),
  limit: venues.length,
  providers: { google: venues.length },
  venues,
};

await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
await fs.writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
console.log(`Wrote ${cache.venues.length} venues to ${CACHE_PATH}`);
