import { importGoogleVenues } from "./providers/google";
import {
  canPersistVenueCache,
  getDefaultVenueImportParams,
  readVenueCache,
  writeVenueCache,
  type VenueCacheFile,
} from "./cache";
import type { VenueImportParams } from "./types";

export async function getCachedVenueImport() {
  return readVenueCache();
}

export async function refreshVenueCache(overrides: VenueImportParams = {}): Promise<VenueCacheFile> {
  const params = { ...getDefaultVenueImportParams(), ...overrides };
  const venues = await importGoogleVenues({
    location: params.location,
    query: params.query,
  });

  const now = new Date();
  const cache: VenueCacheFile = {
    generatedAt: now.toISOString(),
    cacheDay: now.toISOString().slice(0, 10),
    location: params.location || "Lancaster, PA",
    query: params.query || "",
    limit: venues.length,
    providers: { google: venues.length },
    venues,
  };

  if (canPersistVenueCache()) {
    await writeVenueCache(cache);
  }

  return cache;
}

export async function getVenues(options?: { refresh?: boolean; overrides?: VenueImportParams }) {
  const refresh = options?.refresh === true;
  const overrides = options?.overrides || {};
  const params = { ...getDefaultVenueImportParams(), ...overrides };
  const cache = await readVenueCache();
  const requestedLocation = params.location || cache.location;
  const requestedQuery = params.query || cache.query;
  const cacheMatchesParams =
    cache.location === requestedLocation &&
    cache.query === requestedQuery;

  if (
    !refresh &&
    cacheMatchesParams &&
    cache.cacheDay &&
    cache.cacheDay === new Date().toISOString().slice(0, 10) &&
    cache.venues.length
  ) {
    return { source: "cache" as const, ...cache };
  }

  const live = await refreshVenueCache(params);
  return { source: canPersistVenueCache() ? ("google" as const) : ("google-live" as const), ...live };
}
