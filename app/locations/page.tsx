import { createClient, prismic } from "@/prismicio";
import type { LocationLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";
import LocationsSplitClient from "./LocationsSplitClient";
import { importVenues } from "@/lib/venue-import";
import { importedVenueToLocationLite } from "@/lib/venue-import/to-location";

export const dynamic = "force-dynamic";

type LocationRow = LocationLite & { key: string };

function shouldImportLiveVenues() {
  return process.env.ENABLE_LIVE_VENUE_IMPORT === "true";
}

function mergeLocationRows(prismicRows: LocationRow[], importedRows: LocationRow[]) {
  const map = new Map<string, LocationRow>();

  for (const row of importedRows) {
    const key = `${(row.name ?? "").toLowerCase()}|${(row.address ?? "").toLowerCase()}`;
    map.set(key, row);
  }

  for (const row of prismicRows) {
    const key = `${(row.name ?? "").toLowerCase()}|${(row.address ?? "").toLowerCase()}`;
    const existing = map.get(key);
    map.set(key, {
      ...(existing ?? {}),
      ...row,
      description: row.description ?? existing?.description ?? null,
      website: row.website ?? existing?.website ?? null,
      category: row.category ?? existing?.category ?? null,
    });
  }

  return Array.from(map.values()).sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
}

export default async function LocationsPage() {
  const client = createClient();

  let docs: any[] = [];
  let prismicError: string | null = null;

  try {
    docs = await client.getAllByType("location");
  } catch (e: any) {
    prismicError = e?.message ? String(e.message) : "Unknown error fetching locations";
    docs = [];
  }

  const prismicLocations: LocationRow[] = docs.map((doc: any) => {
    const desc = doc.data?.description;
    const descText =
      typeof desc === "string"
        ? desc
        : Array.isArray(desc) && desc.length > 0
        ? prismic.asText(desc as RichTextField)
        : null;

    const websiteUrl = prismic.asLink(doc.data?.website);

    return {
      id: doc.id,
      key: doc.uid ?? doc.id,
      uid: doc.uid ?? null,
      name: doc.data?.name ?? null,
      address: doc.data?.address ?? null,
      category: doc.data?.category ?? null,
      website: websiteUrl ?? null,
      description: descText ?? null,
    };
  });

  let importedLocations: LocationRow[] = [];
  if (shouldImportLiveVenues()) {
    const result = await importVenues({
      location: process.env.VENUE_IMPORT_LOCATION || "Lancaster, PA",
      query:
        process.env.VENUE_IMPORT_QUERY ||
        "restaurants bars coffee shops music venues event spaces theaters stores businesses",
      limit: Number(process.env.VENUE_IMPORT_LIMIT || 30),
      radiusMeters: Number(process.env.VENUE_IMPORT_RADIUS_METERS || 12000),
    });
    importedLocations = result.venues.map((venue) => importedVenueToLocationLite(venue));
  }

  const locations = mergeLocationRows(prismicLocations, importedLocations);

  if (prismicError && !locations.length) {
    return (
      <div className="pageShell">
        <div className="tagline">Directory</div>
        <div className="emptyRight">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Couldn’t load locations from Prismic.</div>
          <div className="muted">{prismicError}</div>
        </div>
      </div>
    );
  }

  return <LocationsSplitClient locations={locations} />;
}
