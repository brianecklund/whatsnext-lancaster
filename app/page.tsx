import { createClient, prismic } from "@/prismicio";
import HomeSplitClient from "./HomeSplitClient";
import type { EventLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";

export const dynamic = "force-dynamic";

/**
 * Homepage: split calendar list + event detail.
 * Data source: Prismic event-like documents.
 */
export default async function HomePage() {
  const client = createClient();

  /**
   * Slice Machine edits often change Custom Type API IDs.
   * Try common variations so your calendar doesn't go blank.
   */
  const EVENT_TYPE_CANDIDATES = [
    "event",
    "events",
    "calendar_event",
    "calendar-events",
    "calendarEvent",
    "calendar",
  ];

  let docs: any[] = [];
  let foundType: string | null = null;
  let typeErrors: Record<string, string> = {};

  for (const t of EVENT_TYPE_CANDIDATES) {
    try {
      const found = await client.getAllByType(t, {
        fetchLinks: [
          "location.name",
          "location.address",
          "location.category",
          "location.website",
          "location.description",
        ],
      });

      if (Array.isArray(found) && found.length > 0) {
        docs = found;
        foundType = t;
        break;
      }
    } catch (err: any) {
      typeErrors[t] = err?.message ? String(err.message) : String(err);
    }
  }

  /**
   * If we still have nothing, fetch a small sample of ANY docs
   * so we can display their types + keys on the page.
   *
   * NOTE: Use client.getAll() instead of client.get() to avoid API/typing differences.
   */
  let debugSample: any[] = [];
  let debugError: string | null = null;

  if (!docs.length) {
    try {
      // Many Prismic clients support getAll(params) to retrieve docs across pagination.
      // We'll keep it small with pageSize.
      debugSample = await client.getAll({ pageSize: 10 });
    } catch (err: any) {
      debugError = err?.message ? String(err.message) : String(err);
      debugSample = [];
    }
  }

  // Helper: pick the first valid Prismic date/timestamp string from a list of possible API IDs.
  const pickDate = (data: any, keys: string[]) => {
    for (const k of keys) {
      const v = data?.[k];
      if (typeof v === "string" && v.trim()) return v;
    }
    return null;
  };

  const events: EventLite[] = docs
    .map((doc: any) => {
      const loc = doc.data?.location;
      const locData = loc?.data;

      const desc = doc.data?.description;
      const descText =
        typeof desc === "string"
          ? desc
          : Array.isArray(desc) && desc.length > 0
          ? prismic.asText(desc as RichTextField)
          : null;

      const websiteUrl = prismic.asLink(locData?.website);

      const locDesc = locData?.description;
      const locDescText =
        typeof locDesc === "string"
          ? locDesc
          : Array.isArray(locDesc) && locDesc.length > 0
          ? prismic.asText(locDesc as RichTextField)
          : null;

      const eventWebsite = prismic.asLink(doc.data?.website_url);
      const ticketsUrl = prismic.asLink(doc.data?.tickets_url);

      const heroImg = doc.data?.image;
      const imageUrl =
        heroImg && typeof heroImg === "object" ? heroImg.url ?? null : null;

      const tagsArr = Array.isArray(doc.data?.tags)
        ? doc.data.tags.map((t: any) => t?.tag).filter(Boolean)
        : [];

      // Support common “start/end” API ID variations after Slice Machine edits
      const startVal =
        pickDate(doc.data, [
          "start_datetime",
          "start_date",
          "start",
          "date",
          "datetime",
          "event_date",
        ]) ?? null;

      const endVal =
        pickDate(doc.data, [
          "end_datetime",
          "end_date",
          "end",
          "endtime",
          "end_time",
        ]) ?? null;

      return {
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
      } as EventLite;
    })
    .filter((e) => Boolean(e.start_datetime))
    .sort((a, b) => {
      const ta = Date.parse(a.start_datetime ?? "") || 0;
      const tb = Date.parse(b.start_datetime ?? "") || 0;
      return ta - tb;
    });

  // If we found events, render your normal UI
  if (events.length) {
    return <HomeSplitClient events={events} />;
  }

  // Otherwise show a helpful debug panel right on the page
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>
        No events returned from Prismic
      </h1>

      <p style={{ opacity: 0.85, lineHeight: 1.5 }}>
        Your homepage is querying Prismic for event documents but it is getting{" "}
        <b>0 results</b>. This usually means your Custom Type API ID changed
        after Slice Machine updates (for example, it&apos;s now{" "}
        <code>events</code> instead of <code>event</code>), or your environment
        variables are pointing at a different Prismic repo.
      </p>

      <h2 style={{ marginTop: 18, fontSize: 16 }}>Tried these Custom Type IDs</h2>
      <pre
        style={{
          padding: 12,
          background: "rgba(0,0,0,0.06)",
          borderRadius: 8,
          overflowX: "auto",
          fontSize: 12,
        }}
      >
        {JSON.stringify(
          {
            candidates: EVENT_TYPE_CANDIDATES,
            foundType,
            typeErrors,
          },
          null,
          2
        )}
      </pre>

      <h2 style={{ marginTop: 18, fontSize: 16 }}>
        Sample docs from your repository (type + data keys)
      </h2>

      {debugError ? (
        <pre
          style={{
            padding: 12,
            background: "rgba(0,0,0,0.06)",
            borderRadius: 8,
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          {debugError}
        </pre>
      ) : debugSample.length === 0 ? (
        <p style={{ opacity: 0.85 }}>
          Could not fetch a sample of docs. This can happen if the Prismic repo /
          token env vars are misconfigured, or there are no documents at all.
        </p>
      ) : (
        <pre
          style={{
            padding: 12,
            background: "rgba(0,0,0,0.06)",
            borderRadius: 8,
            overflowX: "auto",
            fontSize: 12,
          }}
        >
          {JSON.stringify(
            debugSample.map((d: any) => ({
              type: d.type,
              uid: d.uid,
              dataKeys: Object.keys(d.data ?? {}),
            })),
            null,
            2
          )}
        </pre>
      )}

      <p style={{ marginTop: 18, opacity: 0.85, lineHeight: 1.5 }}>
        Find the correct <b>type</b> in the JSON above (for example{" "}
        <code>events</code>). Then update your code to query that exact type.
      </p>
    </div>
  );
}
