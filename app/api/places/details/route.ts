
import { NextRequest, NextResponse } from "next/server";
import { fetchPlaceDetails } from "@/lib/google-places";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const placeId = req.nextUrl.searchParams.get("id")?.trim();
    if (!placeId) {
      return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });
    }

    const details = await fetchPlaceDetails(placeId);
    return NextResponse.json({ ok: true, details });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unable to load place details" },
      { status: 500 }
    );
  }
}
