"use client";

import { useEffect, useRef, useState } from "react";

type Section = { id: string; label: string };

export default function BlogSectionTracker({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sections.length || typeof window === "undefined") return;
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.05, 0.25, 0.5, 0.75, 1] },
    );

    for (const n of nodes) io.observe(n);
    return () => io.disconnect();
  }, [sections]);

  if (!sections.length) return null;

  return (
    <nav ref={navRef} className="blogSectionTracker" aria-label="In this article">
      <div className="blogSectionTracker__label">In this article</div>
      <ol className="blogSectionTracker__list">
        {sections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${encodeURIComponent(s.id)}`}
                className="blogSectionTracker__link"
                data-active={on ? "true" : "false"}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(s.id);
                  if (!el) return;
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  window.history.replaceState(null, "", `#${encodeURIComponent(s.id)}`);
                  setActive(s.id);
                }}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
