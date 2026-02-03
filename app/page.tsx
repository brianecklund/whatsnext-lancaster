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

  const docs = await client.getAllByType("event", {
    orderings: [{ field: "my.event.start_datetime", direction: "asc" }],
    fetchLinks: [
      "location.name",
      "location.address",
      "location.category",
      "location.website",
      "location.description",
    ],
  });

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

      const tagsArr =
        Array.isArray(doc.data?.tags) ? doc.data.tags.map((t: any) => t?.tag).filter(Boolean) : [];

      // Prismic Date vs Timestamp compatibility:
      // - Date: YYYY-MM-DD (no time)
      // - Timestamp: ISO string
      const startVal = doc.data?.start_datetime ?? null;
      const endVal = doc.data?.end_datetime ?? null;

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
    .filter((e) => Boolean(e.start_datetime));

  return <HomeSplitClient events={events} />;
}
