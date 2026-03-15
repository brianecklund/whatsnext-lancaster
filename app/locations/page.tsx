import LocationsSplitClient from './LocationsSplitClient';
import { createClient } from '@/prismicio';
import { getCachedVenueImport } from '@/lib/venue-import';
import type { LocationLite } from '@/lib/types';
import {
  createLocationLiteFromVenue,
  getLocationDocLookupKey,
  getLocationDocSummary,
  matchVenueFromDocData,
} from '@/lib/prismic-venue';

export const dynamic = 'force-dynamic';

type LocationRow = LocationLite & { key: string };

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

export default async function LocationsPage() {
  const client = createClient();
  const cache = await getCachedVenueImport();
  const importedVenues = cache.venues || [];
  const docs = await client.getAllByType('location').catch(() => [] as any[]);

  const customPageByVenueId = new Map<string, any>();
  const customPageByName = new Map<string, any>();

  for (const doc of docs) {
    const lookup = getLocationDocLookupKey(doc);
    if (lookup.venueIdKey) customPageByVenueId.set(lookup.venueIdKey, doc);
    if (lookup.venueNameKey) customPageByName.set(lookup.venueNameKey, doc);
  }

  const apiLocations: LocationRow[] = importedVenues.map((venue) => {
    const customPage =
      customPageByVenueId.get(String(venue.externalId).trim().toLowerCase()) ||
      customPageByName.get(String(venue.name).trim().toLowerCase()) ||
      null;
    return createLocationLiteFromVenue(venue, customPage ? { uid: customPage.uid } : null) as LocationRow;
  });

  const customOnlyLocations: LocationRow[] = docs
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
  return <LocationsSplitClient locations={locations} />;
}
