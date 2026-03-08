import { inferDirectoryCategory } from "../category-map";
import type { ImportedVenue, VenueImportParams } from "../types";

export async function importYelpVenues(params: VenueImportParams): Promise<ImportedVenue[]> {
  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) return [];

  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.searchParams.set("location", params.location || "Lancaster, PA");
  url.searchParams.set("term", params.query || "venues");
  url.searchParams.set("limit", String(params.limit ?? 20));

  const response = await fetch(url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!response.ok) throw new Error(`Yelp import failed with ${response.status}`);

  const data = await response.json() as {
    businesses?: Array<{
      id?: string;
      name?: string;
      url?: string;
      phone?: string;
      rating?: number;
      location?: { display_address?: string[] };
      coordinates?: { latitude?: number; longitude?: number };
      categories?: Array<{ title?: string }>;
    }>;
  };

  return (data.businesses ?? []).map((item) => {
    const rawCategories = (item.categories ?? []).map((category) => category.title || "").filter(Boolean);
    return {
      source: "yelp" as const,
      externalId: item.id || item.name || crypto.randomUUID(),
      name: item.name || "Untitled venue",
      address: item.location?.display_address?.join(", ") ?? null,
      latitude: item.coordinates?.latitude ?? null,
      longitude: item.coordinates?.longitude ?? null,
      website: item.url ?? null,
      phone: item.phone ?? null,
      rating: item.rating ?? null,
      rawCategories,
      category: inferDirectoryCategory({ category: rawCategories[0] ?? null, rawCategories, name: item.name || "" }),
    };
  });
}
