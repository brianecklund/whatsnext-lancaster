import { NextRequest, NextResponse } from 'next/server';
import { getCachedVenueImport } from '@/lib/venue-import';
import { resolveVenueByName } from '@/lib/venue-import/resolve';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function normalize(value: string | null | undefined) {
  return (value || '').trim().toLowerCase();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || searchParams.get('query') || '';
  const limit = Math.min(Math.max(Number(searchParams.get('limit') || '12'), 1), 50);

  try {
    const cache = await getCachedVenueImport();
    const venues = cache.venues || [];
    const nq = normalize(q);

    let results = !nq
      ? venues.slice(0, limit)
      : venues.filter((venue) => {
          const hay = normalize([venue.name, venue.address, venue.category].filter(Boolean).join(' '));
          return hay.includes(nq);
        });

    if (nq && results.length === 0) {
      const fallback = resolveVenueByName(venues, q, null);
      results = fallback ? [fallback] : [];
    }

    return NextResponse.json({
      ok: true,
      query: q,
      count: results.slice(0, limit).length,
      results: results.slice(0, limit).map((venue) => ({
        id: venue.externalId,
        source: venue.source,
        key: `${venue.source}:${venue.externalId}`,
        name: venue.name,
        address: venue.address ?? null,
        website: venue.website ?? null,
        phone: venue.phone ?? null,
        rating: venue.rating ?? null,
        category: venue.category ?? null,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Failed to search venue cache' },
      { status: 500 },
    );
  }
}
