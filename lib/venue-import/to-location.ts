import type { LocationLite } from "@/lib/types";
import type { ImportedVenue } from "./types";

export function importedVenueToLocationLite(venue: ImportedVenue): LocationLite & { key: string; source: string } {
  return {
    id: `${venue.source}:${venue.externalId}`,
    key: `${venue.source}:${venue.externalId}`,
    uid: null,
    source: venue.source,
    name: venue.name,
    address: venue.address ?? null,
    category: venue.category ?? null,
    website: venue.website ?? null,
    description:
      venue.description ??
      [venue.category, venue.rawCategories?.slice(0, 2).join(" • "), venue.phone].filter(Boolean).join(" • ") ||
      null,
  };
}
