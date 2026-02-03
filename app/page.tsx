import { createClient, prismic } from "@/prismicio";
import HomeSplitClient from "./HomeSplitClient";
import type { EventLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const client = createClient();

  // Keep this typed: your generated types confirm "event" exists
  const docs = await client.getAllByType("event", {
    fetchLinks: [
      "location.name",
      "location.address",
      "location.category",
      "location.website",
      "location.description",
    ],
  });

  // Helper: pick the first valid string value from candidate keys
  const pickString = (data: any, keys: string[]) => {
    for (const k of keys) {
      const v = data?.[k];
      if (typeof v === "string" && v.trim()) return v;
    }
    return null;
  };

  // Helper: find *any* plausible date/timestamp field (string) on the doc
  const pickStart = (data: any) =>
    pickString(data, [
      "start_datetime",
      "start_date",
      "date",
      "start",
      "datetime",
      "event_date",
    ]);

  const pickEnd = (data: any) =>
    pickString(data, [
      "end_datetime",
      "end_date",
      "end",
      "end_time",
      "endtime",
    ]);

  const eventsRaw = docs.map((doc: any) => {
    const loc = doc.data?.location;
    const locData = loc?.data;

    const desc = doc.data?.description;
    const descText =
      typeof desc === "string"
        ? desc
        : Array.isArray(desc) && desc.length > 0
        ? prismic.asText(desc as RichTextField)
        : null;

    const locDesc = locData?.description;
    const locDescText =
      typeof locDesc === "string"
        ? locDesc
        : Array.isArray(locDesc) && locDesc.length > 0
        ? prismic.asText(locDesc as RichTextField)
        : null;

    const websiteUrl = prismic.asLink(locData?.website);
    const eventWebsite = prismic.asLink(doc.data?.website_url);
    const ticketsUrl = prismic.asLink(doc.data?.tickets_url);

    const heroImg = doc.data?.image;
    const imageUrl =
      heroImg && typeof heroImg === "object" ? heroImg.url ?? null : null;

    const tagsArr = Array.isArray(doc.data?.tags)
      ? doc.data.tags.map((t: any) => t?.tag).filter(Boolean)
      : [];

    const startVal = pickStart(doc.data);
    const endVal = pickEnd(doc.data);

    const e: EventLite = {
      id: doc.id,
      key: doc.uid ?? doc.id,
      uid: doc.uid ?? null,

      title: doc.data?.title ?? null,
      summary: doc.data?.summary ?? null,
      description: descText,

      start_datetime: startVal,
      end_datetime: endVal,
      all_day: doc.data?.all_day ?? null,

      event_type: doc.data?.event_type ?? null,
      status: doc.data?.status ?? null,
      featured: doc.data?.featured ?? null,

      cost: doc.data?.cost ?? null,
      age_restriction: doc.data?.age_restriction ?? null,

      website_url: eventWebsite ?? null,
      tickets_url: ticketsUrl ?? null,

      image_url: imageUrl,
      tags: tagsArr,

      location: loc
        ? {
            id: loc.id,
            uid: loc.uid ?? null,
            name: locData?.name ?? null,
            address: locData?.address ?? null,
            category: locData?.category ?? null,
            website: websiteUrl ?? null,
            description: locDescText,
          }
        : null,
    };

    return { event: e, dataKeys: Object.keys(doc.data ?? {}) };
  });

  // Keep all events, but sort ones with valid start dates first
  const events: EventLite[] = eventsRaw
    .map((x) => x.event)
    .sort((a, b) => {
      const ta = Date.parse(a.start_datetime ?? "") || Number.POSITIVE_INFINITY;
      const tb = Date.parse(b.start_datetime ?? "") || Number.POSITIVE_INFINITY;
      return ta - tb;
    });

  // If nothing came back at all, show debug
  if (!docs.length) {
    return (
      <div style={{ padding: 24, maxWidth: 900 }}>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>No Prismic events found</h1>
        <p style={{ opacity: 0.85, lineHeight: 1.5 }}>
          The query <code>getAllByType("event")</code> returned 0 docs.
          This usually means your Prismic repo/env vars are pointing to a repo
          that doesn’t have published event documents.
        </p>
      </div>
    );
  }

  // If events exist but none have a recognizable start date field, show the keys so we can fix the mapping
  const noneHaveStart = events.every((e) => !e.start_datetime);
  if (noneHaveStart) {
    return (
      <div style={{ padding: 24, maxWidth: 900 }}>
        <h1 style={{ fontSize: 22, marginBottom: 8 }}>
          Events exist, but no start date field matched
        </h1>
        <p style={{ opacity: 0.85, lineHeight: 1.5 }}>
          You have <b>{docs.length}</b> event documents, but the homepage can’t find any of these
          fields: <code>start_datetime</code>, <code>start_date</code>, <code>date</code>, etc.
          This means Slice Machine changed your field API IDs.
        </p>

        <h2 style={{ marginTop: 18, fontSize: 16 }}>Event doc field keys (first 5 docs)</h2>
        <pre
          style={{
            padding: 12,
            background: "rgba(0,0,0,0.06)",
            borderRadius: 8,
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          {JSON.stringify(eventsRaw.slice(0, 5).map((x) => x.dataKeys), null, 2)}
        </pre>

        <p style={{ marginTop: 12, opacity: 0.85 }}>
          Copy/paste that JSON here and I’ll update the code to use the exact correct field name.
        </p>
      </div>
    );
  }

  // Normal render
  return <HomeSplitClient events={events} />;
}
