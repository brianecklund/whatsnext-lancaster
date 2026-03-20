import { Suspense } from "react";
import type { RichTextField } from '@prismicio/client';
import HomeSplitClient from './HomeSplitClient';
import { unstable_cache } from 'next/cache';
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

export const revalidate = 60;

const getEventDocsCached = unstable_cache(
  async () => {
    const client = createClient();
    return client.getAllByType('event', {
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
  },
  ['wnl-events-v1'],
  { revalidate: 60 },
);

const getLocationDocsCached = unstable_cache(
  async () => {
    const client = createClient();
    return client.getAllByType('location').catch(() => [] as any[]);
  },
  ['wnl-location-docs-v1'],
  { revalidate: 60 },
);

function pickDateLike(data: any, keys: string[]) {
  for (const key of keys) {
    const value = data?.[key];
    if (!value) continue;
    if (typeof value === 'string' && value.trim()) return value;
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
    if (typeof value === 'object') {
      const objectValue = value?.value ?? value?.iso ?? value?.start ?? value?.end;
      if (typeof objectValue === 'string' && objectValue.trim()) return objectValue;
    }
  }
  return null;
}

function combineDateAndTime(dateValue: string | null | undefined, timeValue: string | null | undefined, fallbackHour = 0) {
  if (!dateValue) return null;
  const datePart = String(dateValue).slice(0, 10);
  if (!datePart) return null;

  const rawTime = (timeValue || '').trim();
  if (rawTime) {
    const normalized = /^\d{2}:\d{2}$/.test(rawTime) ? `${rawTime}:00` : rawTime;
    const iso = `${datePart}T${normalized}`;
    const d = new Date(iso);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }

  const fallback = new Date(`${datePart}T00:00:00`);
  if (Number.isNaN(fallback.getTime())) return null;
  fallback.setHours(fallbackHour, 0, 0, 0);
  return fallback.toISOString();
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
  let docs: any[] = [];
  let prismicError: string | null = null;

  try {
    docs = await getEventDocsCached();
  } catch (err: any) {
    prismicError = err?.message ?? (typeof err === 'string' ? err : 'Unknown error while fetching events from Prismic.');
  }

  const venueCache = await getCachedVenueImport();
  const importedVenues = venueCache.venues || [];

  const customLocationDocs = await getLocationDocsCached();
  const customLocationByVenueId = new Map<string, any>();
  const customLocationByName = new Map<string, any>();

  for (const doc of customLocationDocs) {
    const lookup = getLocationDocLookupKey(doc);
    if (lookup.venueIdKey) customLocationByVenueId.set(lookup.venueIdKey, doc);
    if (lookup.venueNameKey) customLocationByName.set(lookup.venueNameKey, doc);
  }

  const events: EventLite[] = docs.map((doc: any) => {
    const descText = asText(doc.data?.description);
    const eventWebsite = prismic.asLink(doc.data?.website_url);
    const ticketsUrl = prismic.asLink(doc.data?.tickets_url);
    const heroImg = doc.data?.image;
    const imageUrl = heroImg && typeof heroImg === 'object' ? heroImg.url ?? null : null;
    const tagsArr = Array.isArray(doc.data?.tags) ? doc.data.tags.map((tag: any) => tag?.tag).filter(Boolean) : [];
    const startVal = pickDateLike(doc.data, ['start_datetime', 'start_date', 'date', 'start', 'datetime', 'event_date']) ?? null;
    const endVal = pickDateLike(doc.data, ['end_datetime', 'end_date', 'end', 'end_time', 'endtime']) ?? null;
    const simpleDate = pickDateLike(doc.data, ['event_date', 'date', 'start_date']) ?? null;
    const simpleEndDate = pickDateLike(doc.data, ['end_date']) ?? simpleDate;
    const startTime = (typeof doc.data?.start_time === 'string' ? doc.data.start_time : null) ?? null;
    const endTime = (typeof doc.data?.end_time_simple === 'string' ? doc.data.end_time_simple : null) ?? (typeof doc.data?.end_time === 'string' ? doc.data.end_time : null) ?? null;
    const simplifiedStart = combineDateAndTime(simpleDate, startTime, 9);
    const simplifiedEnd = combineDateAndTime(simpleEndDate, endTime, 23);
    const effectiveStart = startVal ?? simplifiedStart ?? endVal ?? simplifiedEnd;
    const effectiveEnd = endVal ?? simplifiedEnd;

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
      end_datetime: effectiveEnd,
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
  }).sort((a, b) => {
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
    return (
      <div style={{ padding: 24, maxWidth: 820 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>Prismic is not returning events</h1>
        <p style={{ marginBottom: 12, opacity: 0.9 }}>
          This page couldn&apos;t fetch <code>event</code> documents from Prismic. The most common causes are a missing/incorrect <code>PRISMIC_REPO_NAME</code> and/or a missing access token when the repository is private.
        </p>
        <div style={{ padding: 12, border: '1px solid rgba(0,0,0,0.12)', borderRadius: 12 }}>
          <div style={{ fontWeight: 500, marginBottom: 6 }}>Error</div>
          <code style={{ whiteSpace: 'pre-wrap' }}>{prismicError}</code>
        </div>
        <p style={{ marginTop: 14, opacity: 0.9 }}>Debug endpoint: <code>/api/prismic-debug</code></p>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <HomeSplitClient events={events} />
    </Suspense>
  );
}
