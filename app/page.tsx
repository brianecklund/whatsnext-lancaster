import { createClient, prismic } from "@/prismicio";
import HomeSplitClient from "./HomeSplitClient";
import type { EventLite } from "@/lib/types";
import type { RichTextField } from "@prismicio/client";

export const dynamic = "force-dynamic";

/**
 * Homepage: split calendar list + event detail.
 * Data source: Prismic `event` documents.
 */
export default async function HomePage() {
  const client = createClient();

  let docs: any[] = [];
  let prismicError: string | null = null;

  try {
    // IMPORTANT:
    // Don't rely on orderings for a field that might have changed (start_datetime).
    // We'll sort locally after normalizing the start date.
    docs = await client.getAllByType("event", {
      fetchLinks: [
        "location.name",
        "location.address",
        "location.category",
        "location.website",
        "location.description",
      ],
    });
  } catch (err: any) {
    prismicError =
      err?.message ??
      (typeof err === "string" ? err : "Unknown error while fetching events from Prismic.");
  }

  // Helper: pick first usable date/time value from a list of possible field API IDs.
// Prismic Timestamp/Date fields usually come through as ISO strings, but we handle a few variants.
  const pickDateLike = (data: any, keys: string[]) => {
    for (const k of keys) {
      const v = data?.[k];
      if (!v) continue;
      if (typeof v === "string" && v.trim()) return v;
      if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString();
      // sometimes a field value can be nested (rare, but safe)
      if (typeof v === "object") {
        const vv = (v as any).value ?? (v as any).iso ?? (v as any).url;
        if (typeof vv === "string" && vv.trim()) return vv;
      }
    }
    return null;
  };

  const events: EventLite[] = docs
    .map((doc: any) => {
      const loc = doc.data?.location;
      const locData = loc?.data;

      // Rich text -> plain text (safe for empty arrays)
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

      // ✅ Date/Timestamp compatibility + model changes:
      // Prefer start_datetime, but fall back to common alternatives.
      const startVal =
        pickDateLike(doc.data, [
          "start_datetime",
          "start_date",
          "date",
          "start",
          "datetime",
          "event_date",
        ]) ?? null;

      const endVal =
        pickDateLike(doc.data, [
          "end_datetime",
          "end_date",
          "end",
          "end_time",
          "endtime",
        ]) ?? null;

      // Some Prismic models (or older docs) may have an `end_datetime` filled while
      // `start_datetime` is empty. The UI expects a usable `start_datetime` for grouping.
      // Use end as a fallback so the event still appears in the calendar list.
      const effectiveStart = startVal ?? endVal;

      return {
        id: doc.id,
        key: doc.uid ?? doc.id,
        uid: doc.uid ?? null,

        title: doc.data?.title ?? null,
        summary: doc.data?.summary ?? null,
        description: descText,

        // keep property name as start_datetime because the rest of your UI expects it
        start_datetime: effectiveStart,
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
    // ✅ Only filter out events with truly no usable start field
    // ✅ Keep events even if missing a start date (they'll sort to the bottom)
    // ✅ Sort locally so events appear in order regardless of which field name is used
    .sort((a, b) => {
      const ta = a.start_datetime ? Date.parse(a.start_datetime) : NaN;
      const tb = b.start_datetime ? Date.parse(b.start_datetime) : NaN;

      // Put valid-dated events first; undated events last.
      const aValid = Number.isFinite(ta);
      const bValid = Number.isFinite(tb);
      if (aValid && bValid) return ta - tb;
      if (aValid && !bValid) return -1;
      if (!aValid && bValid) return 1;
      return 0;
    });

  // If Prismic fetch failed, show a helpful error instead of a blank calendar.
  if (prismicError) {
    return (
      <div style={{ padding: 24, maxWidth: 820 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
          Prismic is not returning events
        </h1>
        <p style={{ marginBottom: 12, opacity: 0.9 }}>
          This page couldn&apos;t fetch <code>event</code> documents from Prismic.
          The most common causes are a missing/incorrect <code>PRISMIC_REPO_NAME</code>
          and/or a missing access token when the repository is private.
        </p>
        <div style={{ padding: 12, border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Error</div>
          <code style={{ whiteSpace: "pre-wrap" }}>{prismicError}</code>
        </div>
        <p style={{ marginTop: 14, opacity: 0.9 }}>
          Debug endpoint: <code>/api/prismic-debug</code>
        </p>
      </div>
    );
  }

  return <HomeSplitClient events={events} />;
}
