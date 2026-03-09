import { inferDirectoryCategory } from "../category-map";
import { slugify } from "../normalize";
import type { ImportedVenue, VenueImportParams } from "../types";

function getApiKey() {
  return process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY || null;
}

export async function importGoogleVenues(params: VenueImportParams): Promise<ImportedVenue[]> {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const limit = Math.min(Math.max(params.limit ?? 20, 1), 20);
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.location",
        "places.websiteUri",
        "places.nationalPhoneNumber",
        "places.rating",
        "places.userRatingCount",
        "places.types",
        "places.regularOpeningHours",
      ].join(","),
    },
    body: JSON.stringify({
      textQuery: params.query ? `${params.query} in ${params.location || "Lancaster, PA"}` : `businesses and venues in ${params.location || "Lancaster, PA"}`,
      pageSize: limit,
      ...(params.lat != null && params.lng != null
        ? {
            locationBias: {
              circle: {
                center: { latitude: params.lat, longitude: params.lng },
                radius: params.radiusMeters ?? 12000,
              },
            },
          }
        : {}),
    }),
  });

  if (!response.ok) throw new Error(`Google import failed with ${response.status}`);

  const data = (await response.json()) as {
    places?: Array<{
      id?: string;
      displayName?: { text?: string };
      formattedAddress?: string;
      websiteUri?: string;
      nationalPhoneNumber?: string;
      rating?: number;
      userRatingCount?: number;
      types?: string[];
      location?: { latitude?: number; longitude?: number };
      regularOpeningHours?: { weekdayDescriptions?: string[] };
    }>;
  };

  return (data.places ?? []).map((item, index) => {
    const name = item.displayName?.text || "Untitled venue";
    const rawCategories = item.types?.map((value) => value.replace(/_/g, " ")) ?? [];
    return {
      source: "google" as const,
      externalId: item.id || name,
      slug: slugify(name),
      name,
      address: item.formattedAddress ?? null,
      latitude: item.location?.latitude ?? null,
      longitude: item.location?.longitude ?? null,
      website: item.websiteUri ?? null,
      phone: item.nationalPhoneNumber ?? null,
      rating: item.rating ?? null,
      reviewCount: item.userRatingCount ?? null,
      rawCategories,
      hoursText: item.regularOpeningHours?.weekdayDescriptions ?? null,
      category: inferDirectoryCategory({ category: rawCategories[0] ?? null, rawCategories, name }),
      importRank: index,
    } satisfies ImportedVenue;
  });
}
