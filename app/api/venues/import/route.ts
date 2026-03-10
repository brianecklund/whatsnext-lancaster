import { NextRequest, NextResponse } from "next/server";
import { getCachedVenueImport, refreshVenueCache } from "@/lib/venue-import";
import { getDefaultVenueImportParams, isVenueCacheFresh } from "@/lib/venue-import/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    location: searchParams.get("location") || undefined,
    query: searchParams.get("query") || undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
    radiusMeters: searchParams.get("radiusMeters") ? Number(searchParams.get("radiusMeters")) : undefined,
    refresh: searchParams.get("refresh") === "true",
    maxAgeHours: searchParams.get("maxAgeHours") ? Number(searchParams.get("maxAgeHours")) : 24,
  };
}

export async function GET(request: NextRequest) {
  try {
    const parsed = parseParams(request);
    const cache = await getCachedVenueImport();
    const sameQuery =
      (!parsed.location || parsed.location === cache.location) &&
      (!parsed.query || parsed.query === cache.query) &&
      (!parsed.limit || parsed.limit === cache.limit);

    if (!parsed.refresh && sameQuery && isVenueCacheFresh(cache, parsed.maxAgeHours) && cache.venues.length) {
      return NextResponse.json({ ok: true, source: "cache", ...cache });
    }

    const refreshed = await refreshVenueCache({
      ...getDefaultVenueImportParams(),
      location: parsed.location,
      query: parsed.query,
      limit: parsed.limit,
      radiusMeters: parsed.radiusMeters,
    });

    return NextResponse.json({ ok: true, source: "live", ...refreshed });
  } catch (error) {
    const cache = await getCachedVenueImport();
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Venue import failed",
        source: cache.venues.length ? "cache-fallback" : "none",
        ...cache,
      },
      { status: cache.venues.length ? 200 : 500 }
    );
  }
}
