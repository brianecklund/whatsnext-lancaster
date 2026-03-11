import { importFoursquareVenues } from "./providers/foursquare";
import { importGoogleVenues } from "./providers/google";
import { importYelpVenues } from "./providers/yelp";
import { getDefaultVenueImportParams, readVenueCache, writeVenueCache, type VenueCacheFile } from "./cache";
import type { ImportedVenue, VenueImportParams } from "./types";

function dedupeVenues(items: ImportedVenue[]) {
  const map = new Map<string, ImportedVenue>();
  for (const item of items) {
    const key = `${item.name.toLowerCase()}|${(item.address ?? "").toLowerCase()}`;
    if (!map.has(key)) map.set(key, item);
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function importVenues(params: VenueImportParams) {
  const [google, foursquare, yelp] = await Promise.all([
    importGoogleVenues(params),
    importFoursquareVenues(params),
    importYelpVenues(params),
  ]);

  return {
    venues: dedupeVenues([...google, ...foursquare, ...yelp]),
    providers: {
      google: google.length,
      foursquare: foursquare.length,
      yelp: yelp.length,
    },
  };
}

export async function getCachedVenueImport() {
  return readVenueCache();
}

export async function refreshVenueCache(overrides: VenueImportParams = {}): Promise<VenueCacheFile> {
  const params = { ...getDefaultVenueImportParams(), ...overrides };
  const result = await importVenues(params);
  const cache: VenueCacheFile = {
    generatedAt: new Date().toISOString(),
    location: params.location || "Lancaster, PA",
    query: params.query || "venues",
    limit: Number(params.limit || 30),
    providers: result.providers,
    venues: result.venues,
  };
  await writeVenueCache(cache);
  return cache;
}
