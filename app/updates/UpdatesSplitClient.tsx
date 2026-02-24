"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/** ✅ Keep page.tsx import working */
export type UpdateLite = {
  id: string;
  title?: string | null;

  // used by updates/page.tsx sample data
  date?: string | null;
  body?: string | null;

  // used elsewhere / UI
  description?: string | null;
  tags?: string[] | null;
};

type Props = {
  updates: UpdateLite[];
};

function norm(v: string) {
  return v?.toLowerCase().trim();
}

export default function UpdatesSplitClient({ updates }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.get("update");
  const tagParam = searchParams.get("tag") || "";
  const qParam = searchParams.get("q") || "";

  const [q, setQ] = useState(qParam);
  const [tag, setTag] = useState(tagParam);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // --- Hydration-safe mobile detection ---
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(Boolean(mq.matches));
    apply();

    // Safari fallback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMq: any = mq;

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else if (anyMq.addListener) anyMq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else if (anyMq.removeListener) anyMq.removeListener(apply);
    };
  }, []);

  const effectiveIsMobile = mounted ? isMobile : false;

  // --- Tags ---
  const tags = useMemo(() => {
    const all = updates.flatMap((u) => u.tags || []);
    return Array.from(new Set(all)).sort();
  }, [updates]);

  // --- Filtering ---
  const filtered = useMemo(() => {
    return updates.filter((u) => {
      const matchesTag =
        !tag || (u.tags || []).some((t) => norm(t) === norm(tag));
      const hay = `${u.title || ""} ${u.body || ""} ${u.description || ""} ${u.date || ""}`;
      const matchesQ = !q || norm(hay).includes(norm(q));
      return matchesTag && matchesQ;
    });
  }, [updates, tag, q]);

  const selectedUpdate = updates.find((u) => u.id === selected) || null;

  function updateQuery(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="pageShell">
      <div className="split">
        {/* LEFT */}
        <div className="pane paneLeft">
          <div className="scroll">
            <div className="leftSticky">
              <div className="searchRow">
                <input
                  type="text"
                  placeholder="Search updates..."
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    updateQuery({ q: e.target.value || null });
                  }}
                  aria-label="Search updates"
                />

                {effectiveIsMobile ? (
                  <button
                    type="button"
                    className="filtersBtn"
                    onClick={() => setFiltersOpen(true)}
                  >
                    Filters
                  </button>
                ) : null}
              </div>

              <div
                className={"typePills" + (effectiveIsMobile ? " mobileHidden" : "")}
                role="group"
                aria-label="Update filters"
              >
                <button
                  type="button"
                  className="typePill"
                  data-active={!tag}
                  onClick={() => {
                    setTag("");
                    updateQuery({ tag: null });
                  }}
                >
                  All
                </button>

                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="typePill"
                    data-active={norm(tag) === norm(t)}
                    onClick={() => {
                      setTag(t);
                      updateQuery({ tag: t });
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="list">
              {filtered.map((u) => (
                <button
                  key={u.id}
                  className="listItem"
                  onClick={() => updateQuery({ update: u.id })}
                >
                  <div className="title">{u.title}</div>
                  <div className="meta">
                    {u.date ? <span className="tag">{u.date}</span> : null}
                    {(u.tags || []).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {!effectiveIsMobile && (
          <div className="pane paneRight">
            <div className="scroll">
              {selectedUpdate ? (
                <div className="detail">
                  <h2>{selectedUpdate.title}</h2>
                  {selectedUpdate.date ? <div className="meta">{selectedUpdate.date}</div> : null}
                  <p>{selectedUpdate.body || selectedUpdate.description}</p>
                </div>
              ) : (
                <div className="detailEmpty">Select an update</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Detail Overlay */}
      {effectiveIsMobile && selectedUpdate && (
        <div className="mobileOverlay">
          <button className="overlayClose" onClick={() => updateQuery({ update: null })}>
            Back
          </button>
          <div className="detail">
            <h2>{selectedUpdate.title}</h2>
            {selectedUpdate.date ? <div className="meta">{selectedUpdate.date}</div> : null}
            <p>{selectedUpdate.body || selectedUpdate.description}</p>
          </div>
        </div>
      )}

      {/* Mobile Filters Overlay */}
      {effectiveIsMobile && filtersOpen && (
        <div className="filtersOverlay">
          <button className="overlayClose" onClick={() => setFiltersOpen(false)}>
            ×
          </button>

          <div className="filtersContent">
            <button
              className="typePill"
              data-active={!tag}
              onClick={() => {
                setTag("");
                updateQuery({ tag: null });
                setFiltersOpen(false);
              }}
            >
              All
            </button>

            {tags.map((t) => (
              <button
                key={t}
                className="typePill"
                data-active={norm(tag) === norm(t)}
                onClick={() => {
                  setTag(t);
                  updateQuery({ tag: t });
                  setFiltersOpen(false);
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}