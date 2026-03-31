import type { BlogLayoutKind } from "@/lib/blog";
import BlogDemoBlocks from "@/app/blog/BlogDemoBlocks";
import BlogSectionTracker from "@/app/blog/BlogSectionTracker";
import type { BlogDemoDetail } from "@/lib/blog-demos";

function formatDateLabel(isoOrYmd: string | null) {
  if (!isoOrYmd) return null;
  const d = new Date(isoOrYmd);
  if (Number.isNaN(d.getTime())) return isoOrYmd.slice(0, 10);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPostArticle({
  layout,
  demo,
  titleFallback,
}: {
  layout: BlogLayoutKind | null | undefined;
  demo: BlogDemoDetail | null;
  titleFallback: string;
}) {
  const L = layout ?? demo?.lite.layout ?? "article";
  const title = demo?.lite.title ?? titleFallback;
  const excerpt = demo?.lite.excerpt;
  const category = demo?.lite.category;
  const date = demo?.lite.date;
  const imageUrl = demo?.lite.imageUrl;
  const sections = demo?.sections?.length ? demo.sections : [];
  const hasTracker = sections.length > 0;

  return (
    <main className={`contentPage blogPostPage blogPostPage--layout-${L}`}>
      <article className="blogPostArticle">
        <header className="blogPostHeader">
          {category ? <span className="blogPostKicker">{category}</span> : null}
          <h1 className="blogPostTitle">{title}</h1>
          {date ? <time className="blogPostDate muted" dateTime={date}>{formatDateLabel(date)}</time> : null}
          {excerpt ? <p className="blogPostDeck">{excerpt}</p> : null}
        </header>

        {imageUrl ? (
          <div className="blogPostHero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="" className="blogPostHeroImg" />
          </div>
        ) : null}

        <div className={hasTracker ? "blogPostGrid" : "blogPostGrid blogPostGrid--single"}>
          {hasTracker ? (
            <aside className="blogPostAside">
              <BlogSectionTracker sections={sections} />
            </aside>
          ) : null}
          <div className="blogPostMainCol">
            {demo ? <BlogDemoBlocks blocks={demo.blocks} /> : (
              <p className="muted">This post has no demo body yet. Add slices in Prismic or link from the blog index.</p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
