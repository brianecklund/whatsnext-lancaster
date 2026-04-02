import type { EventLite } from "@/lib/types";

function eventStartMs(e: EventLite): number {
  const raw = e.start_datetime;
  if (!raw) return 0;
  const t = new Date(raw).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/** Upcoming events for a directory /location/[uid] page (linked by Prismic location UID, venue id, or name). */
export function filterUpcomingEventsForLocation(
  events: EventLite[],
  opts: { locationUid: string; venueExternalId?: string | null; locationName?: string | null },
): EventLite[] {
  const uid = opts.locationUid;
  const vid = opts.venueExternalId?.trim() || null;
  const name = (opts.locationName ?? "").trim().toLowerCase();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const minT = startOfToday.getTime();

  return events
    .filter((e) => {
      if (e.location_page_uid && e.location_page_uid === uid) return true;
      if (vid && e.venue_external_id && e.venue_external_id === vid) return true;
      if (name && e.locationName?.trim().toLowerCase() === name) return true;
      return false;
    })
    .filter((e) => {
      const t = eventStartMs(e);
      return t >= minT;
    })
    .sort((a, b) => eventStartMs(a) - eventStartMs(b))
    .slice(0, 18);
}
