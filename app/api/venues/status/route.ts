import { NextResponse } from "next/server";
import { readVenueCache } from "@/lib/venue-import/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const cache = await readVenueCache();
  return NextResponse.json({
    ok: true,
    apiKeyPresent: Boolean(process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY),
    cacheExists: Boolean(cache.venues?.length || cache.generatedAt),
    cacheDay: cache.cacheDay || null,
    cachedVenues: cache.venues?.length || 0,
    updatedAt: cache.generatedAt || null,
    location: cache.location,
    query: cache.query,
  });
}
