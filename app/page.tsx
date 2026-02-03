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

  // IMPORTANT:
  // Do NOT order by a specific Prismic field that might have changed (start_datetime).
  // We'll sort locally after we normalize the start date field.
  const docs = await client.getAllByType("event", {
    fetchLinks: [
      "location.name",
      "location.address",
      "location.category",
      "location.website",
      "location.description",
    ],
  });

  // Helper: safely pick the first valid Prismic date/timestamp string from a list of possible API IDs.
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

      /**
       * Prismic Date vs Timestamp compatibility + Slice Machine API ID changes:
       * - Timestamp fields often called: start_datetime / end_datetime
       * - Date fields often called: start_date / end_date or just date
       *
       * We accept several possible names so events don't "disappear" when models change.
       */
      const startVal =
        pickDate(doc.data, [
          "start_datetime",
          "start_date",
          "start",
          "date",
          "start_time",
        ]) ?? null;

      const endVal =
        pickDate(doc.data, ["end_datetime", "end_date", "end", "end_time"]) ??
        null;

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
    // Only require *some* start value (whatever the current Prismic model uses)
    .filter((e) => Boolean(e.start_datetime))
    // Sort locally to avoid relying on a Prismic field that may not exist anymore
    .sort((a, b) => {
      const ta = Date.parse(a.start_datetime ?? "") || 0;
      const tb = Date.parse(b.start_datetime ?? "") || 0;
      return ta - tb;
    });

  return <HomeSplitClient events={events} />;
}
