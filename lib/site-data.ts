import type { RichTextField } from '@prismicio/client';
import { createClient, prismic } from '@/prismicio';
import { getCachedVenueImport } from '@/lib/venue-import';
import type { EventLite, LocationLite } from '@/lib/types';
import {
  createLocationLiteFromManualFields,
  createLocationLiteFromVenue,
  getLocationDocLookupKey,
  getLocationDocSummary,
  getVenueFields,
  matchVenueFromDocData,
  resolveLocationUrl,
} from '@/lib/prismic-venue';
import { resolveVenueById, resolveVenueByName } from '@/lib/venue-import/resolve';

export type UpdateLite = {
  id: string;
  title: string;
  tags: string[];
  date?: string | null;
  sortDate?: string | null;
  summary?: string | null;
  body?: string | null;
  link?: string | null;
  linkLabel?: string | null;
  pinned?: boolean | null;
  pdfUrl?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_blocks?: any[] | null;
};

type LocationRow = LocationLite & { key: string };

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

function extractPdfUrl(data: any) {
  const candidates = ["pdf", "pdf_file", "attachment", "document", "file", "pdf_document"];
  for (const key of candidates) {
    const field = data?.[key];
    if (!field) continue;
    if (typeof field === "string" && field) return field;
    if (typeof field?.url === "string" && field.url) return field.url;
  }
  return null;
}

function normalize(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

function dedupeLocations(items: LocationRow[]) {
  const seen = new Set<string>();
  const result: LocationRow[] = [];

  for (const item of items) {
    const key = item.venue_external_id || `${(item.name ?? '').toLowerCase()}|${(item.address ?? '').toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}

export async function getSiteData() {
  const client = createClient();
  const venueCache = await getCachedVenueImport();
  const importedVenues = venueCache.venues || [];

  const [eventDocs, locationDocs, updateDocs] = await Promise.all([
    client.getAllByType('event', {
      fetchLinks: [
        'location.name',
        'location.description',
        'location.address',
        'location.website',
        'location.category',
        'location.venue_name',
        'location.venue_place_id',
      ],
    }).catch(() => [] as any[]),
    client.getAllByType('location').catch(() => [] as any[]),
    client.getAllByType('update').catch(() => [] as any[]),
  ]);

  const customLocationByVenueId = new Map<string, any>();
  const customLocationByName = new Map<string, any>();

  for (const doc of locationDocs) {
    const lookup = getLocationDocLookupKey(doc);
    if (lookup.venueIdKey) customLocationByVenueId.set(lookup.venueIdKey, doc);
    if (lookup.venueNameKey) customLocationByName.set(lookup.venueNameKey, doc);
  }

  const events: EventLite[] = eventDocs.map((doc: any) => {
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

  const apiLocations: LocationRow[] = importedVenues.map((venue) => {
    const customPage =
      customLocationByVenueId.get(String(venue.externalId).trim().toLowerCase()) ||
      customLocationByName.get(String(venue.name).trim().toLowerCase()) ||
      null;
    return createLocationLiteFromVenue(venue, customPage ? { uid: customPage.uid } : null) as LocationRow;
  });

  const customOnlyLocations: LocationRow[] = locationDocs
    .filter((doc) => !matchVenueFromDocData(importedVenues, doc.data))
    .map((doc) => {
      const summary = getLocationDocSummary(doc);
      return {
        id: doc.id,
        key: doc.uid ?? doc.id,
        uid: doc.uid ?? null,
        name: summary.name,
        address: summary.address,
        category: summary.category,
        website: summary.website,
        description: summary.description,
        venue_external_id: summary.venue_external_id,
        customPageUid: doc.uid ?? null,
        customPageUrl: doc.uid ? `/locations/${doc.uid}` : null,
      };
    });

  const locations = dedupeLocations([...apiLocations, ...customOnlyLocations]).sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

  let updates: UpdateLite[] = [];
  if (updateDocs.length) {
    updates = updateDocs.map((doc: any) => ({
      id: doc.id,
      title: doc.data?.title || 'Untitled update',
      tags: Array.isArray(doc.data?.tags)
        ? doc.data.tags.map((tag: any) => tag?.tag || tag?.text || '').filter(Boolean)
        : [],
      date: pickDateLike(doc.data, ['publish_date', 'date', 'published_at']) ?? null,
      sortDate: pickDateLike(doc.data, ['publish_date', 'date', 'published_at']) ?? null,
      summary: doc.data?.summary || null,
      body: asText(doc.data?.body) || asText(doc.data?.summary) || null,
      link: prismic.asLink(doc.data?.link) || prismic.asLink(doc.data?.cta_link) || null,
      linkLabel: doc.data?.link_label || null,
      pinned: Boolean(doc.data?.pinned),
      pdfUrl: extractPdfUrl(doc.data),
      content_blocks: (doc.data?.content_blocks ?? doc.data?.slices ?? null) as any,
    })).sort((a, b) => {
      if (Boolean(a.pinned) !== Boolean(b.pinned)) return Number(Boolean(b.pinned)) - Number(Boolean(a.pinned));
      const ta = a.sortDate ? Date.parse(a.sortDate) : Number.NaN;
      const tb = b.sortDate ? Date.parse(b.sortDate) : Number.NaN;
      const aValid = Number.isFinite(ta);
      const bValid = Number.isFinite(tb);
      if (aValid && bValid) return tb - ta;
      if (aValid && !bValid) return -1;
      if (!aValid && bValid) return 1;
      return 0;
    });
  } else {
    updates = [
      {
        id: 'u-1',
        title: 'New seasonal menu at West Art',
        date: 'This week',
        sortDate: '2026-03-16',
        summary: 'Seasonal menu update',
        tags: ['new seasonal menu', 'opening'],
        body: 'A handful of new drinks and a few rotating food items just hit the board. If you’re planning a night out, check the latest menu before you go.',
        link: null,
        pinned: true,
      },
      {
        id: 'u-2',
        title: 'Parking PSA for First Friday',
        date: 'Feb 2026',
        sortDate: '2026-02-01',
        summary: 'Heads up for downtown traffic',
        tags: ['PSA', 'downtown'],
        body: 'Heads up: expect heavier-than-normal traffic near Gallery Row. Give yourself a few extra minutes or consider parking a few blocks out and walking in.',
        link: null,
        pinned: false,
      },
      {
        id: 'u-3',
        title: 'Pop-up weekend: local makers market',
        date: 'Upcoming',
        sortDate: '2026-03-22',
        summary: 'Weekend pop-up market',
        tags: ['pop-up', 'market'],
        body: 'A short, sweet weekend market with local makers and artists. More details will land on the calendar as soon as they’re confirmed.',
        link: null,
        pinned: false,
      },
    ];
  }

  return { events, locations, updates };
}
