import { NextRequest, NextResponse } from "next/server";
import { importVenues } from "@/lib/venue-import";

export const dynamic = "force-dynamic";

function parseRequest(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    location: searchParams.get("location") || process.env.VENUE_IMPORT_LOCATION || "Lancaster, PA",
    query:
      searchParams.get("query") ||
      process.env.VENUE_IMPORT_QUERY ||
      "restaurants bars coffee shops music venues event spaces theaters stores businesses",
    limit: Number(searchParams.get("limit") || process.env.VENUE_IMPORT_LIMIT || 20),
    radiusMeters: Number(searchParams.get("radiusMeters") || process.env.VENUE_IMPORT_RADIUS_METERS || 12000),
  };
}

export async function GET(request: NextRequest) {
  try {
    const result = await importVenues(parseRequest(request));
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Venue import failed" },
      { status: 500 },
    );
  }
}
