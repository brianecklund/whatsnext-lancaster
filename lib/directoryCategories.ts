export const DIRECTORY_CATEGORIES = [
  "Business",
  "Restaurant",
  "Store",
  "Music Venue",
  "Event Space",
  "Theater",
  "Coffee Shop",
  "Bar",
  "Brewery",
  "Gallery",
  "Service",
] as const;

const aliasMap: Record<string, string> = {
  bar: "Bar",
  bars: "Bar",
  pub: "Bar",
  restaurant: "Restaurant",
  restaurants: "Restaurant",
  cafe: "Coffee Shop",
  café: "Coffee Shop",
  coffee: "Coffee Shop",
  coffeeshop: "Coffee Shop",
  "coffee shop": "Coffee Shop",
  shop: "Store",
  store: "Store",
  retail: "Store",
  business: "Business",
  venue: "Event Space",
  "event space": "Event Space",
  theater: "Theater",
  theatre: "Theater",
  brewery: "Brewery",
  gallery: "Gallery",
  service: "Service",
  services: "Service",
  "music venue": "Music Venue",
  music: "Music Venue",
};

export function normalizeDirectoryCategory(input?: string | null): string {
  const raw = (input || "").trim();
  if (!raw) return "Business";
  const key = raw.toLowerCase();
  return aliasMap[key] || raw;
}
