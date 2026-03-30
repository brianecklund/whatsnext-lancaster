import { createClient } from "@/prismicio";
import BlogClient from "@/app/blog/BlogClient";
import { blogPostLiteFromPrismicDoc, type BlogPostLite } from "@/lib/blog";

export const revalidate = 60;

export default async function BlogPage() {
  let posts: BlogPostLite[] = [];
  try {
    const client = createClient();
    const docs = await client.getAllByType("blog_post" as any, {
      pageSize: 100,
      orderings: [{ field: "my.blog_post.date", direction: "desc" }],
    } as any);
    posts = (docs as any[]).map((d) => blogPostLiteFromPrismicDoc(d));
  } catch {
    posts = [];
  }

  return <BlogClient posts={posts} />;
}

