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
    const result = await getVenues({
      refresh: true,
      overrides: parseOverrides(request),
    });

    return NextResponse.json({
      imported: result.venues.length,
      cacheUpdated: true,
      source: result.source,
      cacheDay: result.cacheDay,
      updatedAt: result.generatedAt,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Refresh failed",
      },
      { status: 500 }
    );
  }
}
