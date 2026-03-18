
import type { RichTextField } from "@prismicio/client";
import { createClient, prismic } from "@/prismicio";
import UpdatesSplitClient, { type UpdateLite } from "./UpdatesSplitClient";

export const dynamic = "force-dynamic";

function asText(value: unknown) {
  if (typeof value === "string") return value || null;
  if (Array.isArray(value) && value.length > 0) {
    return prismic.asText(value as RichTextField) || null;
  }
  return null;
}

function pickDateLike(data: any, keys: string[]) {
  for (const key of keys) {
    const value = data?.[key];
    if (!value) continue;
    if (typeof value === "string" && value.trim()) return value;
    if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
    if (typeof value === "object") {
      const objectValue = value?.value ?? value?.iso;
      if (typeof objectValue === "string" && objectValue.trim()) return objectValue;
    }
  }
  return null;
}

function formatUpdateDate(value: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function extractPdfUrl(data: any) {
  const candidates = ["pdf", "pdf_file", "attachment", "document", "file", "pdf_document"];
  for (const key of candidates) {
    const field = data?.[key];
    if (!field) continue;
    if (typeof field === "string" && field) return field;
    if (typeof field?.url === "string" && field.url) return field.url;
  }
  return null;
}

export default async function UpdatesPage() {
  const client = createClient();

  let docs: any[] = [];
  try {
    docs = await client.getAllByType("update" as any);
  } catch {
    docs = [];
  }

  const updatesFromPrismic: UpdateLite[] = docs.map((doc: any) => {
    const rawDate = pickDateLike(doc.data, ["publish_date", "date", "posted_on", "announcement_date"]);
    const tags = Array.isArray(doc.data?.tags)
      ? doc.data.tags.map((tag: any) => tag?.tag).filter(Boolean)
      : [];

    return {
      id: doc.id,
      title: doc.data?.title ?? "Untitled update",
      summary: doc.data?.summary ?? null,
      date: formatUpdateDate(rawDate),
      sortDate: rawDate,
      tags,
      body: asText(doc.data?.body) ?? asText(doc.data?.description) ?? null,
      link: prismic.asLink(doc.data?.link) ?? prismic.asLink(doc.data?.website_url) ?? null,
      linkLabel: doc.data?.link_label ?? null,
      pinned: Boolean(doc.data?.pinned),
      pdfUrl: extractPdfUrl(doc.data),
      content_blocks: (doc.data?.content_blocks ?? doc.data?.slices ?? null) as any,
    };
  }).sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    const ta = a.sortDate ? Date.parse(a.sortDate) : Number.NaN;
    const tb = b.sortDate ? Date.parse(b.sortDate) : Number.NaN;
    const aValid = Number.isFinite(ta);
    const bValid = Number.isFinite(tb);
    if (aValid && bValid) return tb - ta;
    if (aValid && !bValid) return -1;
    if (!aValid && bValid) return 1;
    return a.title.localeCompare(b.title);
  });

  const fallbackUpdates: UpdateLite[] = [
    {
      id: "u-1",
      title: "New seasonal menu at West Art",
      date: "This week",
      tags: ["new seasonal menu", "opening"],
      body: "A handful of new drinks and a few rotating food items just hit the board. If you’re planning a night out, check the latest menu before you go.",
      link: null,
      pinned: true,
    },
    {
      id: "u-2",
      title: "Parking PSA for First Friday",
      date: "Feb 2026",
      tags: ["PSA", "downtown"],
      body: "Heads up: expect heavier-than-normal traffic near Gallery Row. Give yourself a few extra minutes or consider parking a few blocks out and walking in.",
      link: null,
    },
    {
      id: "u-3",
      title: "Pop-up weekend: local makers market",
      date: "Upcoming",
      tags: ["pop-up", "market"],
      body: "A short, sweet weekend market with local makers and artists. More details will land on the calendar as soon as they’re confirmed.",
      link: null,
    },
  ];

  return <UpdatesSplitClient updates={updatesFromPrismic.length ? updatesFromPrismic : fallbackUpdates} />;
}
