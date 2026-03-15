import { NextRequest, NextResponse } from 'next/server';
import { getCachedVenueImport } from '@/lib/venue-import';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

function normalize(value: string | null) {
  return (value || '').trim().toLowerCase();
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const q = normalize(url.searchParams.get('q'));
  const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
  const limit = Math.min(PAGE_SIZE, Math.max(1, Number(url.searchParams.get('limit') || String(PAGE_SIZE))));

  const cache = await getCachedVenueImport();
  let venues = cache.venues || [];
  if (q) {
    venues = venues.filter((venue) => [venue.name, venue.address, venue.category, ...(venue.rawCategories || [])].filter(Boolean).join(' ').toLowerCase().includes(q));
  }

  const totalResults = venues.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / limit));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * limit;
  const versionTsMs = Date.parse(cache.generatedAt || '') || Date.now();
  const versionTs = Math.floor(versionTsMs / 1000);
  const results = venues.slice(start, start + limit).map((venue) => ({
    id: venue.externalId,
    title: venue.name,
    description: [venue.category, venue.address].filter(Boolean).join(' • '),
    image_url: '',
    last_update: versionTs,
    blob: {
      sku: venue.externalId,
      id: venue.externalId,
      title: venue.name,
      description: venue.description ?? [venue.category, venue.address].filter(Boolean).join(' • '),
      image_url: '',
      externalId: venue.externalId,
      source: venue.source,
      name: venue.name,
      address: venue.address ?? null,
      website: venue.website ?? null,
      phone: venue.phone ?? null,
      rating: venue.rating ?? null,
      category: venue.category ?? null,
      rawCategories: venue.rawCategories ?? [],
      latitude: venue.latitude ?? null,
      longitude: venue.longitude ?? null,
    },
  }));

  const base = new URL(request.url);
  const makePageUrl = (pageNumber: number) => {
    const next = new URL(base);
    next.searchParams.set('page', String(pageNumber));
    next.searchParams.set('limit', String(limit));
    if (q) next.searchParams.set('q', q);
    return next.toString();
  };

  return NextResponse.json({
    results_size: results.length,
    results_per_page: limit,
    current_page: currentPage,
    total_results_size: totalResults,
    total_pages: totalPages,
    version: cache.generatedAt || new Date().toISOString(),
    license: 'private',
    bookmarks: {
      next_page: currentPage < totalPages ? makePageUrl(currentPage + 1) : null,
      prev_page: currentPage > 1 ? makePageUrl(currentPage - 1) : null,
    },
    results,
  });
}
