import { inferDirectoryCategory } from "../category-map";
import type { ImportedVenue, VenueImportParams } from "../types";

export async function importFoursquareVenues(params: VenueImportParams): Promise<ImportedVenue[]> {
  const apiKey = process.env.FOURSQUARE_API_KEY;
  if (!apiKey) return [];

  const url = new URL("https://api.foursquare.com/v3/places/search");
  url.searchParams.set("query", params.query || "venues");
  url.searchParams.set("near", params.location || "Lancaster, PA");
  url.searchParams.set("limit", String(params.limit ?? 20));

  const response = await fetch(url, {
    cache: "no-store",
    headers: { Authorization: apiKey, Accept: "application/json" },
  });

  if (!response.ok) throw new Error(`Foursquare import failed with ${response.status}`);

  const data = await response.json() as {
    results?: Array<{
      fsq_id?: string;
      name?: string;
      website?: string;
      tel?: string;
      rating?: number;
      location?: { formatted_address?: string };
      geocodes?: { main?: { latitude?: number; longitude?: number } };
      categories?: Array<{ name?: string }>;
    }>;
  };

  return (data.results ?? []).map((item) => {
    const rawCategories = (item.categories ?? []).map((category) => category.name || "").filter(Boolean);
    return {
      source: "foursquare" as const,
      externalId: item.fsq_id || item.name || crypto.randomUUID(),
      name: item.name || "Untitled venue",
      address: item.location?.formatted_address ?? null,
      latitude: item.geocodes?.main?.latitude ?? null,
      longitude: item.geocodes?.main?.longitude ?? null,
      website: item.website ?? null,
      phone: item.tel ?? null,
      rating: item.rating ?? null,
      rawCategories,
      category: inferDirectoryCategory({ category: rawCategories[0] ?? null, rawCategories, name: item.name || "" }),
    };
  });
}
