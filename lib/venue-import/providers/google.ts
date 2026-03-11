import { inferDirectoryCategory } from "../category-map";
import type { ImportedVenue, VenueImportParams } from "../types";

function getGoogleApiKey() {
  return process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY || null;
}

function buildSearchUrl(params: VenueImportParams) {
  const apiKey = getGoogleApiKey();
  if (!apiKey) return null;

  const query = params.query || `${params.location || "Lancaster, PA"} venues`;
  const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("query", params.location && !query.toLowerCase().includes(params.location.toLowerCase()) ? `${query} in ${params.location}` : query);
  return url.toString();
}

export async function importGoogleVenues(params: VenueImportParams): Promise<ImportedVenue[]> {
  const url = buildSearchUrl(params);
  if (!url) return [];

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Google import failed with ${response.status}`);

  const data = (await response.json()) as {
    status?: string;
    error_message?: string;
    results?: Array<{
      place_id?: string;
      name?: string;
      formatted_address?: string;
      rating?: number;
      types?: string[];
      geometry?: { location?: { lat?: number; lng?: number } };
    }>;
  };

  if (data.status && data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    throw new Error(data.error_message || `Google import failed with status ${data.status}`);
  }

  return (data.results ?? []).slice(0, params.limit ?? 20).map((item) => {
    const rawCategories = item.types?.map((value) => value.replace(/_/g, " ")) ?? [];
    return {
      source: "google" as const,
      externalId: item.place_id || item.name || crypto.randomUUID(),
      name: item.name || "Untitled venue",
      address: item.formatted_address ?? null,
      latitude: item.geometry?.location?.lat ?? null,
      longitude: item.geometry?.location?.lng ?? null,
      rating: item.rating ?? null,
      rawCategories,
      category: inferDirectoryCategory({ category: rawCategories[0] ?? null, rawCategories, name: item.name || "" }),
      website: null,
      phone: null,
      description: null,
    };
  });
}
