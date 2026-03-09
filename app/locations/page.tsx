import { createClient, prismic } from "@/prismicio";
import type { LocationLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";
import LocationsSplitClient from "./LocationsSplitClient";
import { getCachedVenueImport } from "@/lib/venue-import";
import { importedVenueToLocationLite } from "@/lib/venue-import/to-location";

export const dynamic = "force-dynamic";

type LocationRow = LocationLite & { key: string };

function dedupeLocations(items: LocationRow[]) {
  const seen = new Set<string>();
  const result: LocationRow[] = [];

  for (const item of items) {
    const key = `${(item.name ?? "").toLowerCase()}|${(item.address ?? "").toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
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

  const cachedImport = await getCachedVenueImport();
  const importedLocations: LocationRow[] = (cachedImport.venues ?? []).map(importedVenueToLocationLite);

  const locations = dedupeLocations([...prismicLocations, ...importedLocations]).sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? "")
  );

  if (prismicError && !locations.length) {
    return (
      <div className="pageShell">
        <div className="emptyRight">
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Couldn’t load locations from Prismic.</div>
          <div className="muted">{prismicError}</div>
        </div>
      </div>
    );
  }

  return <LocationsSplitClient locations={locations} />;
}
