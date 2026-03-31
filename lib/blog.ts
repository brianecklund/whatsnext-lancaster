import type { RichTextField } from "@prismicio/client";
import { prismic } from "@/prismicio";

export type BlogLayoutKind = "article" | "review" | "profile";

export type BlogPostLite = {
  id: string;
  uid: string | null;
  title: string;
  excerpt: string | null;
  category: string | null;
  date: string | null;
  imageUrl: string | null;
  /** When set (e.g. demo posts), drives styling on the post page. */
  layout?: BlogLayoutKind | null;
  featured?: boolean;
};

function asText(value: unknown) {
  if (typeof value === "string") return value || null;
  if (Array.isArray(value) && value.length > 0) {
    return prismic.asText(value as RichTextField) || null;
  }
  return null;
}

function asImageUrl(img: any): string | null {
  if (!img) return null;
  if (typeof img.url === "string" && img.url) return img.url;
  if (typeof img === "string" && img) return img;
  const square = img.Square || img.square;
  if (square?.url) return square.url;
  const thumbs = img.thumbnails || img.variants;
  if (thumbs?.Square?.url) return thumbs.Square.url;
  if (thumbs?.square?.url) return thumbs.square.url;
  return null;
}

export function blogPostLiteFromPrismicDoc(doc: any): BlogPostLite {
  const data = doc?.data ?? {};
  const title = (asText(data?.title) ?? asText(data?.headline) ?? doc?.uid ?? "Blog post").trim() || "Blog post";
  const excerpt = (asText(data?.excerpt) ?? asText(data?.summary) ?? null) || null;
  const category =
    (typeof data?.category === "string" ? data.category : null) ||
    (typeof data?.category_name === "string" ? data.category_name : null) ||
    (typeof data?.kind === "string" ? data.kind : null) ||
    null;
  const date =
    (typeof data?.date === "string" ? data.date : null) ||
    (typeof data?.publish_date === "string" ? data.publish_date : null) ||
    (typeof doc?.first_publication_date === "string" ? doc.first_publication_date : null) ||
    null;
  const imageUrl = asImageUrl(data?.image ?? data?.thumbnail ?? data?.hero_image ?? null);
  const layoutRaw = data?.layout ?? data?.post_layout ?? data?.kind_layout;
  const layout: BlogLayoutKind | null =
    layoutRaw === "review" || layoutRaw === "profile" || layoutRaw === "article" ? layoutRaw : null;

  return {
    id: String(doc?.id ?? title),
    uid: typeof doc?.uid === "string" ? doc.uid : null,
    title,
    excerpt,
    category: category ? String(category).trim() || null : null,
    date,
    imageUrl,
    layout,
    featured: Boolean(data?.featured),
  };
}

export function mergeBlogPostsForList(prismicPosts: BlogPostLite[], demoPosts: BlogPostLite[]): BlogPostLite[] {
  const uids = new Set(prismicPosts.map((p) => (p.uid ?? "").trim()).filter(Boolean));
  const extra = demoPosts.filter((p) => p.uid && !uids.has(p.uid));
  return [...prismicPosts, ...extra].sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });
}

