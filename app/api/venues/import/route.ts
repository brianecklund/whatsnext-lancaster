import { NextRequest, NextResponse } from "next/server";
import { importVenues } from "@/lib/venue-import";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "Lancaster, PA";
  const query = searchParams.get("query") || "music venues restaurants bars coffee shops";
  const limit = Number(searchParams.get("limit") || 20);

  try {
    const result = await importVenues({ location, query, limit });
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Venue import failed" },
      { status: 500 }
    );
  }
}
