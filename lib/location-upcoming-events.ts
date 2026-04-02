/** Minimal event shape for venue matching (shell `EventLite` omits `key`). */
export type LocationFilterEvent = {
  id: string;
  uid?: string | null;
  start_datetime?: string | null;
  end_datetime?: string | null;
  location_page_uid?: string | null;
  venue_external_id?: string | null;
  locationName?: string | null;
  event_type?: string | null;
  title?: string | null;
};

function eventStartMs(e: LocationFilterEvent): number {
  const raw = e.start_datetime;
  if (!raw) return 0;
  const t = new Date(raw).getTime();
  return Number.isNaN(t) ? 0 : t;
}

/** Upcoming events for a directory /location/[uid] page (linked by Prismic location UID, venue id, or name). */
export function filterUpcomingEventsForLocation(
  events: LocationFilterEvent[],
  opts: {
    locationUid?: string | null;
    venueExternalId?: string | null;
    locationName?: string | null;
    excludeEventId?: string | null;
    excludeEventUid?: string | null;
  },
): LocationFilterEvent[] {
  const uid = opts.locationUid?.trim() || null;
  const vid = opts.venueExternalId?.trim() || null;
  const name = (opts.locationName ?? "").trim().toLowerCase();
  const exId = opts.excludeEventId ?? null;
  const exUid = opts.excludeEventUid?.trim() || null;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const minT = startOfToday.getTime();

  return events
    .filter((e) => {
      if (exId && e.id === exId) return false;
      if (exUid && e.uid && e.uid === exUid) return false;
      if (uid && e.location_page_uid && e.location_page_uid === uid) return true;
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
