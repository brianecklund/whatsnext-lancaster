import type { RichTextField } from '@prismicio/client';
import HomeSplitClient from './HomeSplitClient';
import type { EventLite, LocationLite } from '@/lib/types';
import { createClient, prismic } from '@/prismicio';
import { getCachedVenueImport } from '@/lib/venue-import';
import {
  createLocationLiteFromManualFields,
  createLocationLiteFromVenue,
  getLocationDocLookupKey,
  getVenueFields,
  resolveLocationUrl,
} from '@/lib/prismic-venue';
import { resolveVenueById, resolveVenueByName } from '@/lib/venue-import/resolve';
import { seedEvents } from '@/data/seed-events';

export const dynamic = 'force-dynamic';

function pickDateLike(data: any, keys: string[]) {
  for (const key of keys) {
    const value = data?.[key];
    if (!value) continue;
    if (typeof value === 'string' && value.trim()) return value;
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
    if (typeof value === 'object') {
      const objectValue = value?.value ?? value?.iso;
      if (typeof objectValue === 'string' && objectValue.trim()) return objectValue;
    }
  }
  return null;
}

function asText(value: unknown) {
  if (typeof value === 'string') return value || null;
  if (Array.isArray(value) && value.length > 0) {
    return prismic.asText(value as RichTextField) || null;
  }
  return null;
}

function normalize(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

export default async function HomePage() {
  const client = createClient();

  let docs: any[] = [];
  let prismicError: string | null = null;

  try {
    docs = await client.getAllByType('event', {
      fetchLinks: [
        'location.name',
        'location.description',
        'location.address',
        'location.website',
        'location.category',
        'location.venue_name',
        'location.venue_place_id',
      ],
    });
  } catch (err: any) {
    prismicError = err?.message ?? (typeof err === 'string' ? err : 'Unknown error while fetching events from Prismic.');
  }

  const venueCache = await getCachedVenueImport();
  const importedVenues = venueCache.venues || [];

  const customLocationDocs = await client.getAllByType('location').catch(() => [] as any[]);
  const customLocationByVenueId = new Map<string, any>();
  const customLocationByName = new Map<string, any>();

  for (const doc of customLocationDocs) {
    const lookup = getLocationDocLookupKey(doc);
    if (lookup.venueIdKey) customLocationByVenueId.set(lookup.venueIdKey, doc);
    if (lookup.venueNameKey) customLocationByName.set(lookup.venueNameKey, doc);
  }

  const prismicEvents: EventLite[] = docs.map((doc: any) => {
    const descText = asText(doc.data?.description);
    const eventWebsite = prismic.asLink(doc.data?.website_url);
    const ticketsUrl = prismic.asLink(doc.data?.tickets_url);
    const heroImg = doc.data?.image;
    const imageUrl = heroImg && typeof heroImg === 'object' ? heroImg.url ?? null : null;
    const tagsArr = Array.isArray(doc.data?.tags) ? doc.data.tags.map((tag: any) => tag?.tag).filter(Boolean) : [];
    const startVal = pickDateLike(doc.data, ['start_datetime', 'start_date', 'date', 'start', 'datetime', 'event_date']) ?? null;
    const endVal = pickDateLike(doc.data, ['end_datetime', 'end_date', 'end', 'end_time', 'endtime']) ?? null;
    const effectiveStart = startVal ?? endVal;

    const locationPage = doc.data?.location_page ?? null;
    const { venueName, venuePlaceId } = getVenueFields(doc.data);

    const matchedVenue =
      resolveVenueById(importedVenues, venuePlaceId, null) ||
      resolveVenueByName(importedVenues, venueName, doc.data?.venue_address);

    const matchedCustomPage =
      locationPage ||
      (venuePlaceId ? customLocationByVenueId.get(normalize(venuePlaceId)) : null) ||
      (venueName ? customLocationByName.get(normalize(venueName)) : null) ||
      null;

    let location: LocationLite | null = null;

    if (matchedVenue) {
      location = createLocationLiteFromVenue(matchedVenue, matchedCustomPage ? { uid: matchedCustomPage.uid } : null);
    } else {
      location = createLocationLiteFromManualFields(doc.data, matchedCustomPage ? { uid: matchedCustomPage.uid } : null);
    }

    const locationName = location?.name ?? venueName ?? null;
    const locationAddress = location?.address ?? doc.data?.venue_address ?? null;
    const locationUrl = resolveLocationUrl(location);

    return {
      id: doc.id,
      key: doc.uid ?? doc.id,
      uid: doc.uid ?? null,
      title: doc.data?.title ?? null,
      summary: doc.data?.summary ?? null,
      description: descText,
      descriptionText: descText,
      image_url: imageUrl,
      imageUrl,
      locationName,
      address: locationAddress,
      locationUrl,
      venue_external_id: location?.venue_external_id ?? venuePlaceId ?? null,
      location_page_uid: location?.customPageUid ?? null,
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
      tags: tagsArr,
      content_blocks: (doc.data?.content_blocks ?? doc.data?.slices ?? null) as any,
      location,
    } as EventLite;
  });

  const mergedEventMap = new Map<string, EventLite>();
  const buildDedupKey = (event: EventLite) => {
    const title = normalize(event.title);
    const venue = normalize(event.locationName);
    const start = normalize(event.start_datetime);
    return [title, venue, start].join('|');
  };

  for (const event of seedEvents) {
    mergedEventMap.set(buildDedupKey(event), event);
  }

  for (const event of prismicEvents) {
    mergedEventMap.set(buildDedupKey(event), event);
  }

  const events = Array.from(mergedEventMap.values()).sort((a, b) => {
    const ta = a.start_datetime ? Date.parse(a.start_datetime) : Number.NaN;
    const tb = b.start_datetime ? Date.parse(b.start_datetime) : Number.NaN;
    const aValid = Number.isFinite(ta);
    const bValid = Number.isFinite(tb);
    if (aValid && bValid) return ta - tb;
    if (aValid && !bValid) return -1;
    if (!aValid && bValid) return 1;
    return 0;
  });

  if (prismicError) {
    console.error('Prismic event fetch failed, using bundled seed events instead:', prismicError);
  }

  return <HomeSplitClient events={events} />;
}
