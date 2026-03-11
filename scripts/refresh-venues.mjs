import fs from 'fs/promises';
import path from 'path';

const CACHE_PATH = path.join(process.cwd(), 'data', 'venue-cache.json');
const location = process.env.VENUE_IMPORT_LOCATION || 'Lancaster, PA';
const query = process.env.VENUE_IMPORT_QUERY || 'restaurants bars coffee shops music venues event spaces theaters stores businesses';
const limit = Number(process.env.VENUE_IMPORT_LIMIT || 30);
const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;

const RULES = [
  [/music venue|concert hall|live music|rock club|jazz club/i, 'Music Venue'],
  [/theater|theatre|performing arts/i, 'Theater'],
  [/event venue|banquet|wedding venue|conference center|community center/i, 'Event Space'],
  [/coffee|cafe|espresso/i, 'Coffee Shop'],
  [/bar|pub|cocktail|taproom|night club/i, 'Bar'],
  [/brewery|brew pub/i, 'Brewery'],
  [/restaurant|eatery|diner|food/i, 'Restaurant'],
  [/gallery|museum|art center/i, 'Gallery'],
  [/shop|store|boutique|retail/i, 'Store'],
  [/service|agency|studio|salon|spa|office/i, 'Service'],
];

function inferDirectoryCategory(category, rawCategories, name) {
  const haystack = [category || '', ...(rawCategories || []), name || ''].join(' ');
  const match = RULES.find(([regex]) => regex.test(haystack));
  return match ? match[1] : 'Business';
}

function dedupeVenues(items) {
  const map = new Map();
  for (const item of items) {
    const key = `${item.name.toLowerCase()}|${(item.address || '').toLowerCase()}`;
    if (!map.has(key)) map.set(key, item);
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

function getCacheDay(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

async function importGoogleVenues() {
  if (!apiKey) throw new Error('Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACES_API_KEY');
  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('query', query.toLowerCase().includes(location.toLowerCase()) ? query : `${query} in ${location}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Google import failed with ${response.status}`);
  const data = await response.json();
  if (data.status && data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(data.error_message || `Google import failed with status ${data.status}`);
  }
  return (data.results || []).slice(0, limit).map((item) => {
    const rawCategories = (item.types || []).map((v) => v.replace(/_/g, ' '));
    return {
      source: 'google',
      externalId: item.place_id || item.name,
      name: item.name || 'Untitled venue',
      address: item.formatted_address || null,
      latitude: item.geometry?.location?.lat ?? null,
      longitude: item.geometry?.location?.lng ?? null,
      rating: item.rating ?? null,
      rawCategories,
      category: inferDirectoryCategory(rawCategories[0] || null, rawCategories, item.name || ''),
      description: null,
      website: null,
      phone: null,
    };
  });
}

const google = await importGoogleVenues();
const now = new Date();
const cache = {
  generatedAt: now.toISOString(),
  cacheDay: getCacheDay(now),
  location,
  query,
  limit,
  providers: {
    google: google.length,
  },
  venues: dedupeVenues(google),
};

await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n', 'utf8');
console.log(`Saved ${cache.venues.length} venues to ${CACHE_PATH}`);
