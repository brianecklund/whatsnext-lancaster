import type { ImportedVenue } from './types';

function normalize(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

function stripSourcePrefix(value: string | null | undefined) {
  const input = (value || '').trim();
  if (!input) return '';
  const parts = input.split(':');
  return parts.length > 1 ? parts.slice(1).join(':') : input;
}

export function resolveVenueById(
  venues: ImportedVenue[],
  externalId?: string | null,
  sourceId?: string | null,
): ImportedVenue | null {
  const direct = normalize(externalId);
  const source = normalize(stripSourcePrefix(sourceId));
  if (!direct && !source) return null;

  return (
    venues.find((venue) => normalize(venue.externalId) === direct || normalize(venue.externalId) === source) || null
  );
}

export function resolveVenueByName(
  venues: ImportedVenue[],
  name?: string | null,
  address?: string | null,
): ImportedVenue | null {
  const targetName = normalize(name);
  const targetAddress = normalize(address);
  if (!targetName) return null;

  const exact = venues.find((venue) => {
    const venueName = normalize(venue.name);
    const venueAddress = normalize(venue.address);
    if (venueName !== targetName) return false;
    if (!targetAddress) return true;
    return venueAddress === targetAddress;
  });

  if (exact) return exact;

  return (
    venues.find((venue) => {
      const venueName = normalize(venue.name);
      return venueName === targetName || venueName.includes(targetName) || targetName.includes(venueName);
    }) || null
  );
}
