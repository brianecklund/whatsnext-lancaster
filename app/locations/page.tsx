import { createClient, prismic } from "@/prismicio";
import LocationsSplitClient from "./LocationsSplitClient";
import type { LocationLite, EventLite } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const client = createClient();

  const locationDocs = await client.getAllByType("location", {
    orderings: [{ field: "my.location.name", direction: "asc" }]
  });

  const eventDocs = await client.getAllByType("event", {
    orderings: [{ field: "my.event.start_datetime", direction: "asc" }],
    fetchLinks: ["location.name", "location.address", "location.category", "location.website", "location.description"]
  });

  const locations: LocationLite[] = locationDocs.map((loc: any) => {
    const desc = loc.data?.description;
    return {
      id: loc.id,
      uid: loc.uid ?? null,
      name: loc.data?.name ?? null,
      address: loc.data?.address ?? null,
      category: loc.data?.category ?? null,
      website: loc.data?.website?.url ?? null,
      description:
        typeof desc === "string"
          ? desc
          : Array.isArray(desc)
          ? prismic.asText(desc)
          : null
    };
  });

  const events: EventLite[] = eventDocs
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

  return <LocationsSplitClient locations={locations} events={events} />;
}
