"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostLite } from "@/lib/blog";

function norm(v: string) {
  return (v || "").trim().toLowerCase();
}

function formatDateLabel(isoOrYmd: string | null) {
  if (!isoOrYmd) return null;
  const d = new Date(isoOrYmd);
  if (Number.isNaN(d.getTime())) return isoOrYmd.slice(0, 10);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogClient({ posts }: { posts: BlogPostLite[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of posts) {
      const c = (p.category ?? "").trim();
      if (c) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    const nq = norm(q);
    const ncat = norm(cat ?? "");
    return posts.filter((p) => {
      if (ncat && norm(p.category ?? "") !== ncat) return false;
      if (!nq) return true;
      const hay = norm([p.title, p.excerpt ?? "", p.category ?? ""].join(" "));
      return hay.includes(nq);
    });
  }, [posts, q, cat]);

  return (
    <main className="contentPage blogPage">
      <header className="blogHeader">
        <h1 className="blogTitle">Blog</h1>
        <p className="blogLead muted">Reviews, profiles, and articles from around Lancaster.</p>
      </header>

      <section className="blogLayout" aria-label="Blog list with filters">
        <aside className="blogSidebar" aria-label="Blog filters">
          <div className="blogSidebarBlock blogSidebarBlock--mobileTop">
            <input
              className="searchInput blogSearchInput"
              placeholder="Search blog…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search blog posts"
            />
          </div>

          <div className="blogSidebarBlock">
            <div className="blogSidebarLabel">Categories</div>
            <div className="blogCatPills" role="group" aria-label="Blog categories">
              <button type="button" className="typePill" data-active={!cat ? "true" : "false"} onClick={() => setCat(null)}>
                All
              </button>
              {categories.map((c) => {
                const on = norm(cat ?? "") === norm(c);
                return (
                  <button key={c} type="button" className="typePill" data-active={on ? "true" : "false"} onClick={() => setCat(on ? null : c)}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="blogList" role="list">
          {filtered.length === 0 ? <div className="emptyList">No posts found.</div> : null}
          {filtered.map((p) => (
            <Link
              key={p.id}
              href={p.uid ? `/blog/${encodeURIComponent(p.uid)}` : "/blog"}
              className="blogListRow"
              role="listitem"
            >
              <div className="blogListRowThumb" aria-hidden>
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt="" className="blogListRowImg" />
                ) : (
                  <div className="blogListRowPlaceholder" />
                )}
              </div>
              <div className="blogListRowMain">
                <div className="blogListRowTop">
                  {p.category ? <span className="blogListRowCat">{p.category}</span> : null}
                  {p.date ? <span className="blogListRowDate">{formatDateLabel(p.date)}</span> : null}
                </div>
                <div className="blogListRowTitle">{p.title}</div>
                {p.excerpt ? <div className="blogListRowExcerpt">{p.excerpt}</div> : null}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

