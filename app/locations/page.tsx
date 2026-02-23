import { createClient, prismic } from "@/prismicio";
import type { LocationLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";
import LocationsSplitClient from "./LocationsSplitClient";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const client = createClient();

  let docs: any[] = [];
  let prismicError: string | null = null;

  try {
    docs = await client.getAllByType("location");
  } catch (err: any) {
    prismicError =
      err?.message ??
      (typeof err === "string" ? err : "Unknown error while fetching locations from Prismic.");
  }

  const locations: LocationLite[] = docs.map((doc: any) => {
    const website = prismic.asLink(doc.data?.website);

    const desc = doc.data?.description;
    const descText =
      typeof desc === "string"
        ? desc
        : Array.isArray(desc) && desc.length > 0
        ? prismic.asText(desc as RichTextField)
        : null;

    return {
      id: doc.id,
      uid: doc.uid ?? null,
      name: doc.data?.name ?? null,
      address: doc.data?.address ?? null,
      category: doc.data?.category ?? null,
      website: website ?? null,
      description: descText,
    } as LocationLite;
  });

  if (prismicError) {
    return (
      <div style={{ padding: 24, maxWidth: 820 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
          Prismic is not returning locations
        </h1>
        <p style={{ marginBottom: 12, opacity: 0.9 }}>
          This page couldn&apos;t fetch <code>location</code> documents from Prismic.
        </p>
        <pre
          style={{
            background: "#f5f5f5",
            padding: 12,
            borderRadius: 12,
            overflowX: "auto",
            border: "1px solid #ddd",
          }}
        >
          {prismicError}
        </pre>
      </div>
    );
  }

  return <LocationsSplitClient locations={locations} />;
}
