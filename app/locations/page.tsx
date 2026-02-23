import { createClient, prismic } from "@/prismicio";
import type { LocationLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";
import LocationsSplitClient from "./LocationsSplitClient";

export const dynamic = "force-dynamic";

type LocationRow = LocationLite & { key: string };

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


// Helper: convert a Prismic rich text field (or string) to plain text.
const pickRichTextAsText = (data: any, keys: string[]) => {
  for (const k of keys) {
    const v = data?.[k];
    if (!v) continue;
    if (typeof v === "string" && v.trim()) return v;
    if (Array.isArray(v) && v.length > 0) {
      try {
        return prismic.asText(v as RichTextField);
      } catch {
        // fall through
      }
    }
  }
  return null;
};

  const locations: LocationRow[] = docs.map((doc: any) => {
    const descText = pickRichTextAsText(doc.data, ["description","desc","details","body","content"]); 

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

  // Simple alpha sort
  locations.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));

  if (prismicError) {
    return (
      <div className="pageShell">
        <div className="tagline">Directory</div>
        <div className="emptyRight">
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Couldn’t load locations from Prismic.</div>
          <div className="muted">{prismicError}</div>
        </div>
      </div>
    );
  }

  return <LocationsSplitClient locations={locations} />;
}
