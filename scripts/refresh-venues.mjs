import fs from 'fs/promises';
import path from 'path';

const CACHE_PATH = path.join(process.cwd(), 'data', 'venue-cache.json');
const location = process.env.VENUE_IMPORT_LOCATION || 'Lancaster, PA';
const query = process.env.VENUE_IMPORT_QUERY || 'restaurants bars coffee shops music venues event spaces theaters stores businesses';
const limit = Number(process.env.VENUE_IMPORT_LIMIT || 30);

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

async function importGoogleVenues() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) return [];
  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('query', query || `${location} venues`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Google import failed with ${response.status}`);
  const data = await response.json();
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

async function importFoursquareVenues() {
  const apiKey = process.env.FOURSQUARE_API_KEY;
  if (!apiKey) return [];
  const url = new URL('https://api.foursquare.com/v3/places/search');
  url.searchParams.set('query', query || 'venues');
  url.searchParams.set('near', location || 'Lancaster, PA');
  url.searchParams.set('limit', String(limit));
  const response = await fetch(url, { headers: { Authorization: apiKey, Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Foursquare import failed with ${response.status}`);
  const data = await response.json();
  return (data.results || []).map((item) => {
    const rawCategories = (item.categories || []).map((c) => c.name || '').filter(Boolean);
    return {
      source: 'foursquare',
      externalId: item.fsq_id || item.name,
      name: item.name || 'Untitled venue',
      address: item.location?.formatted_address || null,
      latitude: item.geocodes?.main?.latitude ?? null,
      longitude: item.geocodes?.main?.longitude ?? null,
      website: item.website || null,
      phone: item.tel || null,
      rating: item.rating ?? null,
      rawCategories,
      category: inferDirectoryCategory(rawCategories[0] || null, rawCategories, item.name || ''),
      description: null,
    };
  });
}

async function importYelpVenues() {
  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) return [];
  const url = new URL('https://api.yelp.com/v3/businesses/search');
  url.searchParams.set('location', location || 'Lancaster, PA');
  url.searchParams.set('term', query || 'venues');
  url.searchParams.set('limit', String(limit));
  const response = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
  if (!response.ok) throw new Error(`Yelp import failed with ${response.status}`);
  const data = await response.json();
  return (data.businesses || []).map((item) => {
    const rawCategories = (item.categories || []).map((c) => c.title || '').filter(Boolean);
    return {
      source: 'yelp',
      externalId: item.id || item.name,
      name: item.name || 'Untitled venue',
      address: item.location?.display_address?.join(', ') || null,
      latitude: item.coordinates?.latitude ?? null,
      longitude: item.coordinates?.longitude ?? null,
      website: item.url || null,
      phone: item.phone || null,
      rating: item.rating ?? null,
      rawCategories,
      category: inferDirectoryCategory(rawCategories[0] || null, rawCategories, item.name || ''),
      description: null,
    };
  });
}

const [google, foursquare, yelp] = await Promise.all([
  importGoogleVenues(),
  importFoursquareVenues(),
  importYelpVenues(),
]);

const cache = {
  generatedAt: new Date().toISOString(),
  location,
  query,
  limit,
  providers: {
    google: google.length,
    foursquare: foursquare.length,
    yelp: yelp.length,
  },
  venues: dedupeVenues([...google, ...foursquare, ...yelp]),
};

await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n', 'utf8');
console.log(`Saved ${cache.venues.length} venues to ${CACHE_PATH}`);
