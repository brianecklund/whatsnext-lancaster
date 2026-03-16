
import { notFound } from 'next/navigation';
import type { RichTextField } from '@prismicio/client';
import MediaBlocks from '@/app/components/MediaBlocks';
import { createClient, prismic } from '@/prismicio';
import { getCachedVenueImport } from '@/lib/venue-import';
import { matchVenueFromDocData } from '@/lib/prismic-venue';
import { fetchPlaceDetails } from '@/lib/google-places';

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
  const placeDetails = venue?.externalId ? await fetchPlaceDetails(venue.externalId).catch(() => null) : null;
  const website = prismic.asLink(doc.data?.website) ?? placeDetails?.websiteUri ?? venue?.website ?? null;
  const coverImageUrl = placeDetails?.coverImageUrl ?? null;
  const galleryImageUrls = placeDetails?.galleryImageUrls ?? [];
  const weekdayDescriptions = placeDetails?.weekdayDescriptions ?? [];
  const phone = placeDetails?.nationalPhoneNumber ?? venue?.phone ?? null;
  const mapsUrl = placeDetails?.googleMapsUri ?? null;
  const photoAttributions = placeDetails?.photoAttributions ?? [];

  return (
    <main className="locationPageShell">
      <div className="locationPageInner">
        <a className="locationPageBack" href="/locations">← Back to directory</a>
        <div className="locationPageHeader">
          <div className="locationPageEyebrow">Directory</div>
          <h1 className="locationPageTitle">{doc.data?.name || venue?.name || doc.data?.venue_name || 'Location'}</h1>
          <div className="locationPageMeta">
            {doc.data?.category || venue?.category ? <span>{doc.data?.category || venue?.category}</span> : null}
            {doc.data?.address || placeDetails?.formattedAddress || venue?.address ? <span>{doc.data?.address || placeDetails?.formattedAddress || venue?.address}</span> : null}
            {typeof (placeDetails?.rating ?? venue?.rating) === 'number' ? <span>Rating {(placeDetails?.rating ?? venue?.rating)?.toFixed(1)}</span> : null}
            {typeof placeDetails?.openNow === 'boolean' ? <span>{placeDetails.openNow ? 'Open now' : 'Closed now'}</span> : null}
          </div>
          {(website || mapsUrl) ? (
            <div style={{ marginTop: 14, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {website ? <a className="link" href={website} target="_blank" rel="noreferrer">Visit website</a> : null}
              {mapsUrl ? <a className="link" href={mapsUrl} target="_blank" rel="noreferrer">Open in Maps</a> : null}
            </div>
          ) : null}
        </div>

        {coverImageUrl ? (
          <section className="locationPageIntro">
            <div className="locationCover">
              <img src={coverImageUrl} alt={`${doc.data?.name || venue?.name || 'Location'} cover`} />
            </div>
          </section>
        ) : null}

        {pageDescription ? (
          <section className="locationPageIntro">
            <div className="detailBody"><p>{pageDescription}</p></div>
          </section>
        ) : null}

        {(phone || weekdayDescriptions.length) ? (
          <section className="locationPageVenueCard">
            <div className="locationPageSectionLabel">Business info</div>
            <div className="locationPageVenueGrid">
              {phone ? <div><div className="locationPageStatLabel">Phone</div><div>{phone}</div></div> : null}
              {website ? <div><div className="locationPageStatLabel">Website</div><div>{website}</div></div> : null}
              {weekdayDescriptions.length ? (
                <div style={{ gridColumn: '1 / -1' }}>
                  <div className="locationPageStatLabel">Hours</div>
                  <div className="locationHoursList">
                    {weekdayDescriptions.map((line) => (
                      <div key={line} className="locationHoursRow">{line}</div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : venue ? (
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

        {galleryImageUrls.length ? (
          <section className="locationPageVenueCard">
            <div className="locationPageSectionLabel">Gallery</div>
            <div className="locationGallery">
              {galleryImageUrls.map((src, index) => (
                <div key={`${src}-${index}`} className="locationGalleryItem">
                  <img src={src} alt={`${doc.data?.name || venue?.name || 'Location'} image ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
            {photoAttributions.length ? <div className="locationPhotoAttribution">Photos: {photoAttributions.join(', ')}</div> : null}
          </section>
        ) : null}

        <MediaBlocks slices={(doc.data?.content_blocks ?? null) as any} />
      </div>
    </main>
  );
}
