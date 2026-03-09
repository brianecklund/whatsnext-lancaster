import type { ImportedVenue } from "./types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function normalizeAddress(value?: string | null) {
  return (value ?? "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildVenueKey(venue: Pick<ImportedVenue, "name" | "address">) {
  return `${slugify(venue.name)}|${normalizeAddress(venue.address)}`;
}

function mergeVenue(base: ImportedVenue, incoming: ImportedVenue): ImportedVenue {
  const rawCategories = Array.from(new Set([...(base.rawCategories ?? []), ...(incoming.rawCategories ?? [])])).filter(Boolean);
  return {
    ...base,
    ...incoming,
    name: base.name || incoming.name,
    slug: base.slug || incoming.slug,
    address: base.address ?? incoming.address ?? null,
    city: base.city ?? incoming.city ?? null,
    state: base.state ?? incoming.state ?? null,
    latitude: base.latitude ?? incoming.latitude ?? null,
    longitude: base.longitude ?? incoming.longitude ?? null,
    website: base.website ?? incoming.website ?? null,
    phone: base.phone ?? incoming.phone ?? null,
    rating: base.rating ?? incoming.rating ?? null,
    reviewCount: base.reviewCount ?? incoming.reviewCount ?? null,
    category: base.category ?? incoming.category ?? "Business",
    rawCategories,
    description: base.description ?? incoming.description ?? null,
    hoursText: base.hoursText ?? incoming.hoursText ?? null,
    imageUrl: base.imageUrl ?? incoming.imageUrl ?? null,
    importRank: Math.min(base.importRank ?? Number.MAX_SAFE_INTEGER, incoming.importRank ?? Number.MAX_SAFE_INTEGER),
  };
}

export function dedupeVenues(items: ImportedVenue[]) {
  const map = new Map<string, ImportedVenue>();
  for (const item of items) {
    const key = buildVenueKey(item);
    const existing = map.get(key);
    map.set(key, existing ? mergeVenue(existing, item) : item);
  }
  return Array.from(map.values()).sort((a, b) => {
    const aRank = a.importRank ?? Number.MAX_SAFE_INTEGER;
    const bRank = b.importRank ?? Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return a.name.localeCompare(b.name);
  });
}
