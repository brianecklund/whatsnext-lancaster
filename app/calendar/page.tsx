import { createClient, prismic } from "@/prismicio";
import CalendarSplitClient from "./CalendarSplitClient";
import type { EventLite } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const client = createClient();

  const docs = await client.getAllByType("event", {
    orderings: [{ field: "my.event.start_datetime", direction: "asc" }],
    fetchLinks: ["location.name", "location.address", "location.category", "location.website", "location.description"]
  });

  const events: EventLite[] = docs
    .map((doc: any) => {
      const loc = doc.data?.location;
      const locData = loc?.data;

      const desc = doc.data?.description;
      const descText =
        typeof desc === "string"
          ? desc
          : Array.isArray(desc)
          ? prismic.asText(desc)
          : null;

      return {
        id: doc.id,
        key: doc.uid ?? doc.id,
        uid: doc.uid ?? null,
        title: doc.data?.title ?? null,
        artists: doc.data?.artists ?? null,
        description: descText,
        start_datetime: doc.data?.start_datetime ?? null,
        end_datetime: doc.data?.end_datetime ?? null,
        event_type: doc.data?.event_type ?? null,
        location: loc
          ? {
              id: loc.id,
              uid: loc.uid ?? null,
              name: locData?.name ?? null,
              address: locData?.address ?? null,
              category: locData?.category ?? null,
              website: locData?.website?.url ?? null,
              description:
                locData?.description && Array.isArray(locData.description)
                  ? prismic.asText(locData.description)
                  : typeof locData?.description === "string"
                  ? locData.description
                  : null
            }
          : null
      };
    })
    .filter((e) => Boolean(e.start_datetime));

  const allTypes = Array.from(
    new Set(events.map((e) => e.event_type).filter(Boolean) as string[])
  ).sort((a, b) => a.localeCompare(b));

  return <CalendarSplitClient events={events} allTypes={allTypes} />;
}
