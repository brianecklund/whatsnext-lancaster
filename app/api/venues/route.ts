import { NextRequest, NextResponse } from "next/server";

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  websiteUri?: string;
  nationalPhoneNumber?: string;
  rating?: number;
  primaryType?: string;
  types?: string[];
  googleMapsUri?: string;
};

const GOOGLE_URL = "https://places.googleapis.com/v1/places:searchText";

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.websiteUri",
  "places.nationalPhoneNumber",
  "places.rating",
  "places.primaryType",
  "places.types",
  "places.googleMapsUri",
].join(",");

export async function GET(req: NextRequest) {
  try {
    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location") || "Lancaster, PA";
    const limit = Number(searchParams.get("limit") || "20");

    const queries = [
      `restaurants in ${location}`,
      `coffee shops in ${location}`,
      `bars in ${location}`,
      `music venues in ${location}`,
      `art galleries in ${location}`,
      `event venues in ${location}`,
      `breweries in ${location}`,
    ];

    const byId = new Map<string, any>();

    for (const textQuery of queries) {
      const res = await fetch(GOOGLE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        body: JSON.stringify({
          textQuery,
          pageSize: Math.min(limit, 20),
          languageCode: "en",
          regionCode: "US",
        }),
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        return NextResponse.json(
          {
            ok: false,
            error: "Google Places request failed",
            status: res.status,
            details: data,
          },
          { status: 500 }
        );
      }

      for (const place of (data.places || []) as GooglePlace[]) {
        const id = place.id || "";
        const name = place.displayName?.text || "";
        if (!id || !name) continue;

        if (!byId.has(id)) {
          byId.set(id, {
            id,
            name,
            address: place.formattedAddress || "",
            lat: place.location?.latitude ?? null,
            lng: place.location?.longitude ?? null,
            website: place.websiteUri || "",
            phone: place.nationalPhoneNumber || "",
            rating: place.rating ?? null,
            category: place.primaryType || "place",
            rawCategories: place.types || [],
            mapsUrl: place.googleMapsUri || "",
            source: "google",
          });
        }
      }
    }

    const venues = Array.from(byId.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return NextResponse.json({
      ok: true,
      source: "google-live",
      count: venues.length,
      venues,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}