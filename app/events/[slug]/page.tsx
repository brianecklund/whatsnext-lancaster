import { createClient, prismic } from "@/prismicio";
import MediaBlocks from "@/app/components/MediaBlocks";
import type { RichTextField } from "@prismicio/client";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Params = { slug: string };

function pickDateLike(data: any, keys: string[]) {
  for (const k of keys) {
    const v = data?.[k];
    if (!v) continue;
    if (typeof v === "string" && v.trim()) return v;
    if (v instanceof Date && !Number.isNaN(v.getTime())) return v.toISOString();
    if (typeof v === "object") {
      const vv = (v as any).value ?? (v as any).iso;
      if (typeof vv === "string" && vv.trim()) return vv;
    }
  }
  return null;
}

function formatTimeLabel(value?: string | null) {
  if (!value) return "Time TBD";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Time TBD";
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function EventPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const client = createClient();

  let doc: any = null;

  const fetchLinks = [
    "location.name",
    "location.address",
    "location.category",
    "location.website",
    "location.description",
  ];

  try {
    doc = await client.getByUID("event", slug, { fetchLinks });
  } catch {
    try {
      doc = await client.getByID(slug, { fetchLinks });
    } catch {
      try {
        const docs = await client.getAllByType("event", { fetchLinks });
        doc = docs.find((item: any) => item?.uid === slug || item?.id === slug) ?? null;
      } catch {
        doc = null;
      }
    }
  }

  if (!doc) notFound();

  const loc = doc.data?.location;
  const locData = loc?.data;
  const desc = doc.data?.description;
  const descText = typeof desc === "string"
    ? desc
    : Array.isArray(desc) && desc.length > 0
      ? prismic.asText(desc as RichTextField)
      : null;

  const imageUrl = doc.data?.image?.url ?? null;
  const websiteUrl = prismic.asLink(doc.data?.website_url);
  const ticketsUrl = prismic.asLink(doc.data?.tickets_url);
  const startVal = pickDateLike(doc.data, ["start_datetime", "start_date", "date", "start", "datetime", "event_date"]);

  return (
    <div className="eventPageWrap">
      <div className="eventPageInner">
        <Link className="eventBackLink" href="/">← Back to calendar</Link>

        <div className="eventEyebrow">{doc.data?.event_type || "Event"}</div>
        <h1 className="eventPageTitle">{doc.data?.title || "Untitled event"}</h1>

        <div className="eventPageMeta">
          <span>{formatTimeLabel(startVal)}</span>
          {locData?.name ? <span>• {locData.name}</span> : null}
          {locData?.address ? <span>• {locData.address}</span> : null}
        </div>

        {imageUrl ? <div className="eventPageHero" style={{ backgroundImage: `url(${imageUrl})` }} /> : null}

        {doc.data?.summary ? <p className="eventPageSummary">{doc.data.summary}</p> : null}

        {descText ? <div className="eventPageBody">{descText}</div> : null}

        <MediaBlocks slices={(doc.data?.content_blocks ?? doc.data?.slices ?? null) as any} />

        {(websiteUrl || ticketsUrl) ? (
          <div className="eventPageCtas">
            {websiteUrl ? (
              <a className="ctaBtn" href={websiteUrl} target="_blank" rel="noreferrer">Website</a>
            ) : null}
            {ticketsUrl ? (
              <a className="ctaBtn" href={ticketsUrl} target="_blank" rel="noreferrer">Tickets</a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
