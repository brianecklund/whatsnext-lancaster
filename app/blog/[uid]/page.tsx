import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import BlogPostArticle from "@/app/blog/BlogPostArticle";
import { blogPostLiteFromPrismicDoc } from "@/lib/blog";
import { getBlogDemoByUid } from "@/lib/blog-demos";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;
  if (!uid) notFound();

  const demo = getBlogDemoByUid(uid) ?? null;

  let prismicLite = null;
  try {
    const client = createClient();
    const doc = await client.getByUID("blog_post" as any, uid);
    prismicLite = blogPostLiteFromPrismicDoc(doc);
  } catch {
    prismicLite = null;
  }

  if (!demo && !prismicLite) notFound();

  return (
    <BlogPostArticle
      layout={prismicLite?.layout ?? demo?.lite.layout}
      demo={demo}
      titleFallback={prismicLite?.title ?? demo?.lite.title ?? "Blog post"}
    />
  );
}
