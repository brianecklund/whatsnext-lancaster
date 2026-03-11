import fs from 'node:fs/promises';
import path from 'node:path';

const CACHE_PATH = path.join(process.cwd(), 'data', 'venue-cache.json');
const location = process.env.VENUE_IMPORT_LOCATION || 'Lancaster, PA';
const query = process.env.VENUE_IMPORT_QUERY || 'restaurants bars coffee shops cafes music venues event spaces theaters shops boutiques businesses';
const limit = Number(process.env.VENUE_IMPORT_LIMIT || 30);

function getApiKey() {
  return process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';
}

function getTodayCacheDay() {
  return new Date().toISOString().slice(0, 10);
}

function dedupeVenues(items) {
  const map = new Map();
  for (const item of items) {
    const key = `${(item.name || '').toLowerCase()}|${(item.address || '').toLowerCase()}`;
    if (!map.has(key)) map.set(key, item);
  }
  return [...map.values()].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
}

async function readExistingCache() {
  try {
    const raw = await fs.readFile(CACHE_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function importGoogleVenues() {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACES_API_KEY');

  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
  url.searchParams.set('key', apiKey);
  url.searchParams.set('query', `${location} ${query}`);

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Google import failed with ${response.status}`);

  const data = await response.json();
  return (data.results ?? []).slice(0, limit).map((item) => ({
    source: 'google',
    externalId: item.place_id || item.name || crypto.randomUUID(),
    name: item.name || 'Untitled venue',
    address: item.formatted_address ?? null,
    latitude: item.geometry?.location?.lat ?? null,
    longitude: item.geometry?.location?.lng ?? null,
    rating: item.rating ?? null,
    rawCategories: Array.isArray(item.types) ? item.types.map((value) => String(value).replace(/_/g, ' ')) : [],
    category: Array.isArray(item.types) && item.types.length ? String(item.types[0]).replace(/_/g, ' ') : null,
  }));
}

const existingCache = await readExistingCache();
if (existingCache?.cacheDay === getTodayCacheDay() && Array.isArray(existingCache.venues) && existingCache.venues.length > 0) {
  console.log(`Venue cache already populated for ${existingCache.cacheDay}; skipping refresh.`);
  process.exit(0);
}

const google = await importGoogleVenues();
const cache = {
  generatedAt: new Date().toISOString(),
  cacheDay: getTodayCacheDay(),
  location,
  query,
  limit,
  providers: { google: google.length },
  venues: dedupeVenues(google),
};

await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
await fs.writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
console.log(`Wrote ${cache.venues.length} venues to ${CACHE_PATH}`);
