
import { notFound } from 'next/navigation';
import type { RichTextField } from '@prismicio/client';
import MediaBlocks from '@/app/components/MediaBlocks';
import { createClient, prismic } from '@/prismicio';
import { getCachedVenueImport } from '@/lib/venue-import';
import { matchVenueFromDocData } from '@/lib/prismic-venue';
import { fetchPlaceDetails } from '@/lib/google-places';
import { getTestPartnerPage, TEST_DATA_TAG } from '@/lib/test-fixtures';

export const dynamic = 'force-dynamic';

function asText(value: unknown) {
  if (typeof value === 'string') return value || null;
  if (Array.isArray(value) && value.length > 0) return prismic.asText(value as RichTextField) || null;
  return null;
}

export default async function LocationDetailPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  const testPage = getTestPartnerPage(uid);
  if (testPage) {
    return (
      <main className="locationPageShell">
        <div className="locationPageInner">
          <a className="locationPageBack" href="/locations">← Back to directory</a>
          <div className="locationPageHeader">
            <div className="locationPageEyebrow">Directory</div>
            <h1 className="locationPageTitle">{testPage.name}</h1>
            <div className="locationPageMeta">
              <span>{testPage.category}</span>
              <span>{testPage.address}</span>
              <span>{TEST_DATA_TAG}</span>
            </div>
            <div className="locationDetailLinkRow">
              <a className="locationOutlineLinkBtn" href={testPage.website} target="_blank" rel="noreferrer">
                <span className="locationOutlineLinkBtn__icon" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="btnIconImg" src="/icons/globe.svg" alt="" width={18} height={18} />
                </span>
                <span className="locationOutlineLinkBtn__label">Website</span>
                <span className="locationOutlineLinkBtn__arrow" aria-hidden>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </a>
              <a className="locationOutlineLinkBtn" href={testPage.mapsUrl} target="_blank" rel="noreferrer">
                <span className="locationOutlineLinkBtn__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="locationOutlineLinkBtn__label">Maps</span>
                <span className="locationOutlineLinkBtn__arrow" aria-hidden>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </a>
            </div>
          </div>

          <section className="locationPageIntro">
            <div className="locationCover">
              <img src={testPage.coverImageUrl} alt={`${testPage.name} cover`} />
            </div>
          </section>

          <section className="locationPageIntro">
            <div className="detailBody"><p>{testPage.description}</p></div>
          </section>

          <section className="locationPageVenueCard">
            <div className="locationPageSectionLabel">Business info</div>
            <div className="locationPageVenueGrid">
              <div><div className="locationPageStatLabel">Phone</div><div>{testPage.phone}</div></div>
              <div><div className="locationPageStatLabel">Website</div><div>{testPage.website}</div></div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div className="locationPageStatLabel">Hours</div>
                <div className="locationHoursList">
                  {testPage.weekdayDescriptions.map((line) => (
                    <div key={line} className="locationHoursRow">{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="locationPageVenueCard">
            <div className="locationPageSectionLabel">Gallery</div>
            <div className="locationGallery">
              {testPage.galleryImageUrls.map((src, index) => (
                <div key={`${src}-${index}`} className="locationGalleryItem">
                  <img src={src} alt={`${testPage.name} image ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

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
            <div className="locationDetailLinkRow">
              {website ? (
                <a className="locationOutlineLinkBtn" href={website} target="_blank" rel="noreferrer">
                  <span className="locationOutlineLinkBtn__icon" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="btnIconImg" src="/icons/globe.svg" alt="" width={18} height={18} />
                  </span>
                  <span className="locationOutlineLinkBtn__label">Website</span>
                  <span className="locationOutlineLinkBtn__arrow" aria-hidden>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </a>
              ) : null}
              {mapsUrl ? (
                <a className="locationOutlineLinkBtn" href={mapsUrl} target="_blank" rel="noreferrer">
                  <span className="locationOutlineLinkBtn__icon" aria-hidden>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span className="locationOutlineLinkBtn__label">Maps</span>
                  <span className="locationOutlineLinkBtn__arrow" aria-hidden>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </a>
              ) : null}
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
