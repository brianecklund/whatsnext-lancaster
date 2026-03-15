import { notFound } from 'next/navigation';
import type { RichTextField } from '@prismicio/client';
import MediaBlocks from '@/app/components/MediaBlocks';
import { createClient, prismic } from '@/prismicio';
import { getCachedVenueImport } from '@/lib/venue-import';
import { matchVenueFromDocData } from '@/lib/prismic-venue';

export const dynamic = 'force-dynamic';

function asText(value: unknown) {
  if (typeof value === 'string') return value || null;
  if (Array.isArray(value) && value.length > 0) return prismic.asText(value as RichTextField) || null;
  return null;
}

export default async function LocationDetailPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const client = createClient();
  const doc = await client.getByUID('location', uid).catch(() => null);
  if (!doc) notFound();

  const cache = await getCachedVenueImport();
  const venue = matchVenueFromDocData(cache.venues || [], doc.data);
  const pageDescription = asText(doc.data?.description);
  const website = prismic.asLink(doc.data?.website) ?? venue?.website ?? null;

  return (
    <main className="locationPageShell">
      <div className="locationPageInner">
        <a className="locationPageBack" href="/locations">← Back to directory</a>
        <div className="locationPageHeader">
          <div className="locationPageEyebrow">Directory</div>
          <h1 className="locationPageTitle">{doc.data?.name || venue?.name || doc.data?.venue_name || 'Location'}</h1>
          <div className="locationPageMeta">
            {doc.data?.category || venue?.category ? <span>{doc.data?.category || venue?.category}</span> : null}
            {doc.data?.address || venue?.address ? <span>{doc.data?.address || venue?.address}</span> : null}
            {typeof venue?.rating === 'number' ? <span>Rating {venue.rating.toFixed(1)}</span> : null}
          </div>
          {website ? (
            <div style={{ marginTop: 14 }}>
              <a className="link" href={website} target="_blank" rel="noreferrer">Visit website</a>
            </div>
          ) : null}
        </div>

        {pageDescription ? (
          <section className="locationPageIntro">
            <div className="detailBody"><p>{pageDescription}</p></div>
          </section>
        ) : null}

        {venue ? (
          <section className="locationPageVenueCard">
            <div className="locationPageSectionLabel">Live venue data</div>
            <div className="locationPageVenueGrid">
              <div><div className="locationPageStatLabel">Address</div><div>{venue.address || '—'}</div></div>
              <div><div className="locationPageStatLabel">Phone</div><div>{venue.phone || '—'}</div></div>
              <div><div className="locationPageStatLabel">Category</div><div>{venue.category || '—'}</div></div>
              <div><div className="locationPageStatLabel">Source</div><div>{venue.source}</div></div>
            </div>
          </section>
        ) : null}

        <MediaBlocks slices={(doc.data?.content_blocks ?? null) as any} />
      </div>
    </main>
  );
}
