import { promises as fs } from "fs";
import path from "path";
import type { ImportedVenue, VenueImportParams } from "./types";

export type VenueCacheFile = {
  generatedAt: string | null;
  cacheDay: string | null;
  location: string;
  query: string;
  limit: number;
  providers: Record<string, number>;
  venues: ImportedVenue[];
};

const CACHE_PATH = path.join(process.cwd(), "data", "venue-cache.json");

const EMPTY_CACHE: VenueCacheFile = {
  generatedAt: null,
  cacheDay: null,
  location: "Lancaster, PA",
  query: "restaurants bars coffee shops music venues event spaces theaters stores businesses",
  limit: 30,
  providers: { google: 0 },
  venues: [],
};

export function getDefaultVenueImportParams(): VenueImportParams {
  return {
    location: process.env.VENUE_IMPORT_LOCATION || EMPTY_CACHE.location,
    query: process.env.VENUE_IMPORT_QUERY || EMPTY_CACHE.query,
    limit: Number(process.env.VENUE_IMPORT_LIMIT || EMPTY_CACHE.limit),
    radiusMeters: Number(process.env.VENUE_IMPORT_RADIUS_METERS || 12000),
  };
}

export function getCacheDay(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export async function readVenueCache(): Promise<VenueCacheFile> {
  try {
    const raw = await fs.readFile(CACHE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<VenueCacheFile>;
    return {
      ...EMPTY_CACHE,
      ...parsed,
      cacheDay: parsed.cacheDay || (parsed.generatedAt ? String(parsed.generatedAt).slice(0, 10) : null),
      providers: { ...EMPTY_CACHE.providers, ...(parsed.providers || {}) },
      venues: Array.isArray(parsed.venues) ? parsed.venues : [],
    };
  } catch {
    return EMPTY_CACHE;
  }
}

export async function writeVenueCache(cache: VenueCacheFile) {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

export function isVenueCacheFresh(cache: VenueCacheFile, maxAgeHours = 24) {
  if (cache.cacheDay && cache.cacheDay === getCacheDay()) return true;
  if (!cache.generatedAt) return false;
  const generatedAt = new Date(cache.generatedAt).getTime();
  if (Number.isNaN(generatedAt)) return false;
  return Date.now() - generatedAt < maxAgeHours * 60 * 60 * 1000;
}
