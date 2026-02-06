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
  // Don't rely on orderings for a field that might have changed (start_datetime).
  // We'll sort locally after normalizing the start date.
  const docs = await client.getAllByType("event", {
    fetchLinks: [
      "location.name",
      "location.address",
      "location.category",
      "location.website",
      "location.description",
    ],
  });

  // Helper: pick first existing string value from a list of possible field API IDs.
  const pickString = (data: any, keys: string[]) => {
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

      // ✅ Date/Timestamp compatibility + model changes:
      // Prefer start_datetime, but fall back to common alternatives.
      const startVal =
        pickString(doc.data, [
          "start_datetime",
          "start_date",
          "date",
          "start",
          "datetime",
          "event_date",
        ]) ?? null;

      const endVal =
        pickString(doc.data, [
          "end_datetime",
          "end_date",
          "end",
          "end_time",
          "endtime",
        ]) ?? null;

      return {
        id: doc.id,
        key: doc.uid ?? doc.id,
        uid: doc.uid ?? null,

        title: doc.data?.title ?? null,
        summary: doc.data?.summary ?? null,
        description: descText,

        // keep property name as start_datetime because the rest of your UI expects it
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
    // ✅ Only filter out events with truly no usable start field
    .filter((e) => Boolean(e.start_datetime))
    // ✅ Sort locally so events appear in order regardless of which field name is used
    .sort((a, b) => {
      const ta = Date.parse(a.start_datetime ?? "") || 0;
      const tb = Date.parse(b.start_datetime ?? "") || 0;
      return ta - tb;
    });

  return <HomeSplitClient events={events} />;
}
