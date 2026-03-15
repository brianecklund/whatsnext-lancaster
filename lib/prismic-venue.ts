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

function asVenueBlob(value: any) {
  if (!value || typeof value !== 'object') return null;
  if (value.blob && typeof value.blob === 'object') return value.blob;
  return value;
}

export function parseIntegrationVenue(value: any): LocationLite | null {
  const blob = asVenueBlob(value);
  if (!blob) return null;

  const externalId = blob.externalId || blob.external_id || blob.place_id || blob.id || value?.id || null;
  const name = blob.name || value?.title || value?.name || null;
  if (!externalId && !name) return null;

  return {
    id: externalId || name,
    key: externalId || name,
    uid: null,
    name,
    address: blob.address || value?.description || null,
    category: blob.category || null,
    website: blob.website || null,
    description: blob.description || null,
    phone: blob.phone || null,
    rating: typeof blob.rating === 'number' ? blob.rating : null,
    venue_external_id: externalId,
    source: blob.source || 'google',
  };
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
  const venueField = parseIntegrationVenue(data?.venue);
  return (
    resolveVenueById(venues, venueField?.venue_external_id || data?.venue_place_id, venueField?.id || null) ||
    resolveVenueByName(venues, data?.name || venueField?.name, data?.address || venueField?.address) ||
    null
  );
}

export function getLocationDocSummary(doc: any) {
  const venue = parseIntegrationVenue(doc.data?.venue);
  return {
    id: doc.id,
    uid: doc.uid ?? null,
    name: doc.data?.name ?? venue?.name ?? null,
    description: asText(doc.data?.description),
    address: doc.data?.address ?? venue?.address ?? null,
    website: prismic.asLink(doc.data?.website) ?? venue?.website ?? null,
    category: doc.data?.category ?? venue?.category ?? null,
    venue_external_id: venue?.venue_external_id ?? null,
  };
}
