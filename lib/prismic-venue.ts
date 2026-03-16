import { prismic } from '@/prismicio';
import type { RichTextField } from '@prismicio/client';
import type { LocationLite } from './types';
import type { ImportedVenue } from './venue-import/types';
import { resolveVenueById, resolveVenueByName } from './venue-import/resolve';

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

export function getVenueFields(data: any) {
  const venueName = typeof data?.venue_name === 'string' && data.venue_name.trim() ? data.venue_name.trim() : null;
  const venuePlaceId = typeof data?.venue_place_id === 'string' && data.venue_place_id.trim() ? data.venue_place_id.trim() : null;
  return { venueName, venuePlaceId };
}

export function createLocationLiteFromVenue(venue: ImportedVenue, customPage?: { uid?: string | null } | null): LocationLite {
  return {
    id: `${venue.source}:${venue.externalId}`,
    key: `${venue.source}:${venue.externalId}`,
    uid: null,
    name: venue.name,
    address: venue.address ?? null,
    category: venue.category ?? null,
    website: venue.website ?? null,
    description: venue.description ?? null,
    phone: venue.phone ?? null,
    rating: venue.rating ?? null,
    venue_external_id: venue.externalId,
    source: venue.source,
    customPageUid: customPage?.uid ?? null,
    customPageUrl: customPage?.uid ? `/locations/${customPage.uid}` : null,
    googleMapsUri: null,
  };
}

export function createLocationLiteFromManualFields(data: any, customPage?: { uid?: string | null } | null): LocationLite | null {
  const { venueName, venuePlaceId } = getVenueFields(data);
  const fallbackName = typeof data?.name === 'string' && data.name.trim() ? data.name.trim() : null;
  const fallbackAddress = typeof data?.address === 'string' && data.address.trim() ? data.address.trim() : null;
  const fallbackCategory = typeof data?.category === 'string' && data.category.trim() ? data.category.trim() : null;
  const fallbackWebsite = prismic.asLink(data?.website) ?? null;
  const name = venueName ?? fallbackName;
  if (!name && !venuePlaceId) return null;

  return {
    id: venuePlaceId || name || 'location',
    key: venuePlaceId ? `google:${venuePlaceId}` : name || 'location',
    uid: null,
    name,
    address: fallbackAddress,
    category: fallbackCategory,
    website: fallbackWebsite,
    description: asText(data?.description),
    venue_external_id: venuePlaceId,
    source: 'google',
    customPageUid: customPage?.uid ?? null,
    customPageUrl: customPage?.uid ? `/locations/${customPage.uid}` : null,
    googleMapsUri: null,
  };
}

export function resolveLocationUrl(location: LocationLite | null | undefined) {
  if (!location) return null;
  if (location.customPageUrl) return location.customPageUrl;
  if (location.venue_external_id) {
    return `/locations?location=${encodeURIComponent(`${location.source || 'google'}:${location.venue_external_id}`)}`;
  }
  if (location.key) {
    return `/locations?location=${encodeURIComponent(location.key)}`;
  }
  return '/locations';
}

export function matchVenueFromDocData(venues: ImportedVenue[], data: any) {
  const { venueName, venuePlaceId } = getVenueFields(data);
  return (
    resolveVenueById(venues, venuePlaceId, null) ||
    resolveVenueByName(venues, venueName || data?.name, data?.address) ||
    null
  );
}

export function getLocationDocSummary(doc: any) {
  const { venueName, venuePlaceId } = getVenueFields(doc.data);
  return {
    id: doc.id,
    uid: doc.uid ?? null,
    name: doc.data?.name ?? venueName ?? null,
    description: asText(doc.data?.description),
    address: doc.data?.address ?? null,
    website: prismic.asLink(doc.data?.website) ?? null,
    category: doc.data?.category ?? null,
    venue_external_id: venuePlaceId ?? null,
  };
}

export function getLocationDocLookupKey(doc: any) {
  const { venueName, venuePlaceId } = getVenueFields(doc.data);
  return {
    venueIdKey: normalize(venuePlaceId),
    venueNameKey: normalize(venueName || doc.data?.name),
  };
}
