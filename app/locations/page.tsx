import { headers } from "next/headers";
import { createClient, prismic } from "@/prismicio";
import type { LocationLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";
import LocationsSplitClient from "./LocationsSplitClient";

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

async function getImportedLocations(): Promise<LocationRow[]> {
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto =
      h.get("x-forwarded-proto") ||
      (process.env.NODE_ENV === "development" ? "http" : "https");

    if (!host) {
      return [];
    }

    const url = `${proto}://${host}/api/venues/import?location=Lancaster,%20PA&limit=20`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || !data?.ok || !Array.isArray(data.venues)) {
      console.error("Failed to load imported venues from API route", data);
      return [];
    }

    return data.venues.map((venue: any) => ({
      id: venue.id ?? venue.externalId ?? venue.name,
      key: venue.id ?? venue.externalId ?? venue.name,
      uid: null,
      name: venue.name ?? null,
      address: venue.address ?? null,
      category: venue.category ?? null,
      website: venue.website ?? null,
      description: null,
    }));
  } catch (error) {
    console.error("Failed to fetch imported venues", error);
    return [];
  }
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

  const importedLocations = await getImportedLocations();

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