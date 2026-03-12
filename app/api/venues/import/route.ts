import { NextRequest, NextResponse } from "next/server";
import { getVenues } from "@/lib/venue-import";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseOverrides(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    location: searchParams.get("location") || undefined,
    query: searchParams.get("query") || undefined,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get("refresh") === "true";
    const result = await getVenues({ refresh, overrides: parseOverrides(request) });
    return NextResponse.json({
      ok: true,
      source: result.source,
      cacheDay: result.cacheDay,
      updatedAt: result.generatedAt,
      count: result.venues.length,
      venues: result.venues,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Venue import failed" },
      { status: 500 }
    );
  }
}
