"use client";

import { useEffect, useMemo, useState } from "react";
import MediaBlocks from "@/app/components/MediaBlocks";
import SegmentedControl from "@/app/components/SegmentedControl";
import ToolbarIcon from "@/app/components/ToolbarIcon";
import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";
import { useSmoothWheel } from "@/app/components/useSmoothWheel";
import SplitPageLayout from "@/app/components/SplitPageLayout";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type UpdateLite = {
  id: string;
  title: string;
  tags: string[];
  date?: string | null;
  sortDate?: string | null;
  summary?: string | null;
  body?: string | null;
  link?: string | null;
  linkLabel?: string | null;
  pinned?: boolean | null;
  pdfUrl?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_blocks?: any[] | null;
};

type Props = {
  updates: UpdateLite[];
};

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}


function tagIconFor(tag: string): string {
  const t = norm(tag);
  if (t.includes("opening") || t.includes("launch")) return "✦";
  if (t.includes("food") || t.includes("drink") || t.includes("menu")) return "◔";
  if (t.includes("music") || t.includes("show") || t.includes("concert")) return "♪";
  if (t.includes("art") || t.includes("gallery")) return "✳";
  if (t.includes("community") || t.includes("market")) return "◎";
  if (t.includes("alert") || t.includes("psa") || t.includes("notice")) return "!";
  return "•";
}

function UpdateDetail({ update }: { update: UpdateLite }) {
  const detailFlashKey = update?.id ?? update?.title ?? update?.date ?? "detail";

  return (
    <div key={detailFlashKey} className="detailCard detailFlash">
      <div className="detailHeader">
        <div>
          <div className="detailTitle fadeInItem" style={{ animationDelay: "260ms" }}>
            {update.title}
          </div>
          <div className="detailMeta fadeInItem" style={{ animationDelay: "320ms" }}>
            {update.pinned ? <span className="pinnedBadge">Pinned</span> : null}
            {update.date ? <span>{update.date}</span> : null}
          </div>
        </div>
      </div>

      {update.summary ? <div className="detailLead fadeInItem" style={{ animationDelay: "340ms" }}>{update.summary}</div> : null}

      {update.tags?.length ? (
        <div className="tagRow" style={{ marginTop: 10 }}>
          {update.tags.map((t) => (
            <span key={t} className="tagChip updateTagChip">
              <span className="tagGlyph" aria-hidden>{tagIconFor(t)}</span>
              <span>{t}</span>
            </span>
          ))}
        </div>
      ) : null}

      {update.body ? (
        <div className="detailDesc fadeInItem" style={{ animationDelay: "360ms" }}>
          {update.body}
        </div>
      ) : null}

      {update.pdfUrl ? (
        <div className="updatePdfFrame fadeInItem" style={{ animationDelay: "400ms" }}>
          <div className="updatePdfFrameLabel">Attached PDF</div>
          <iframe src={update.pdfUrl} title={`${update.title} PDF`} className="updatePdfEmbed" />
        </div>
      ) : null}

      {update.content_blocks?.length ? <MediaBlocks slices={update.content_blocks} /> : null}

      {update.link ? (
        <div className="detailLinks">
          <a className="pillBtn" href={update.link} target="_blank" rel="noreferrer">
            {update.linkLabel || "Learn more"}
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default function UpdatesSplitClient({ updates }: Props) {
  useSmoothWheel(".scroll");
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const q = sp.get("q") || "";
  const tag = sp.get("tag") || "";
  const selectedKey = sp.get("u") || "";

  const [isMobile, setIsMobile] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [taglineHidden, setTaglineHidden] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  const safeUpdates = useMemo(() => (Array.isArray(updates) ? updates : []), [updates]);

  const tags = useMemo(() => {
    const s = new Set<string>();
    for (const u of safeUpdates) {
      for (const t of u.tags || []) {
        const tt = (t || "").trim();
        if (tt) s.add(tt);
      }
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [safeUpdates]);

  const filtered = useMemo(() => {
    const nq = norm(q);
    const nt = norm(tag);
    return safeUpdates.filter((u) => {
      if (nt) {
        const utags = (u.tags || []).map((t) => norm(t));
        if (!utags.includes(nt)) return false;
      }
      if (!nq) return true;
      const hay = norm([u.title, ...(u.tags || []), u.body || ""].join(" "));
      return hay.includes(nq);
    });
  }, [safeUpdates, q, tag]);

  const selectedDesktop = useMemo(() => {
    if (!filtered.length) return null;
    if (!selectedKey) return filtered[0];
    return filtered.find((u) => u.id === selectedKey) ?? filtered[0];
  }, [filtered, selectedKey]);

  const selectedMobile = useMemo(() => {
    if (!selectedKey) return null;
    return filtered.find((u) => u.id === selectedKey) ?? null;
  }, [filtered, selectedKey]);

  const selected = isMobile ? selectedMobile : selectedDesktop;
  const mobileDetailOpen = isMobile && Boolean(selectedMobile);

  useEffect(() => {
    if (!isMobile) {
      setFilterOpen(false);
      setTaglineHidden(false);
    }
  }, [isMobile]);

  useBodyScrollLock(filterOpen || mobileDetailOpen);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    router.push(query ? `/updates?${query}` : "/updates");
  }

  function setSelected(id: string) {
    setParam("u", id);
  }

  function clearSelected() {
    setParam("u", null);
  }

  const leftSticky = (
    <div className="leftSticky splitPageStickySurface">
      <SegmentedControl
        className="tabs segmentedControl--primary"
        ariaLabel="Primary navigation"
        currentKey={pathname?.startsWith("/updates") ? "updates" : pathname?.startsWith("/locations") ? "directory" : "calendar"}
        items={[
          { key: "calendar", label: "Calendar", href: "/" },
          { key: "directory", label: "Directory", href: "/locations" },
          { key: "updates", label: "Updates", href: "/updates" },
        ]}
      />

      <div className="leftControls">
        {isMobile ? (
          <div className="searchRow">
            <input
              className="searchInput"
              placeholder="Search updates…"
              value={q}
              onChange={(e) => setParam("q", e.target.value)}
              aria-label="Search updates"
            />
            <button
              type="button"
              className="filterBtn"
              aria-label={filterOpen ? "Close filters" : "Open filters"}
              aria-expanded={filterOpen ? "true" : "false"}
              onClick={() => setFilterOpen((v) => !v)}
            >
              <ToolbarIcon src="/icons/filter.svg" alt="Filter" />
              <span>{tag ? `Filter: ${tag}` : "Filter"}</span>
            </button>
          </div>
        ) : (
          <div className="searchRow directorySearchRowDesktop">
            <input
              className="searchInput"
              placeholder="Search updates…"
              value={q}
              onChange={(e) => setParam("q", e.target.value)}
              aria-label="Search updates"
            />
            <button
              type="button"
              className="filterBtn filterBtnSquare squareIconBtn"
              aria-label={filterOpen ? "Close filters" : "Open filters"}
              aria-expanded={filterOpen ? "true" : "false"}
              data-active={filterOpen || !!tag ? "true" : "false"}
              onClick={() => setFilterOpen((v) => !v)}
            >
              <ToolbarIcon src="/icons/filter.svg" alt="Filter" />
            </button>
            {q || tag ? (
              <button
                className="clearBtn"
                type="button"
                onClick={() => {
                  setParam("q", null);
                  setParam("tag", null);
                }}
              >
                Clear
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );

  const list = filtered.length === 0 ? (
    <div className="emptyList">No updates found.</div>
  ) : (
    filtered.map((u) => {
      const active = selected?.id === u.id;
      return (
        <button
          key={u.id}
          className="eventRow"
          data-active={active ? "true" : "false"}
          onClick={() => setSelected(u.id)}
          type="button"
        >
          <span className="eventRowTitle">{u.title}</span>
          <span className="eventRowMeta updateRowMeta">
            {u.pinned ? <span className="updateDateBadge">Pinned</span> : null}{u.date ? <span className="updateDateBadge">{u.date}</span> : null}
          </span>
          {u.summary ? <span className="eventRowMeta">{u.summary}</span> : null}
          {u.tags?.length ? (
            <span className="tagRow" aria-label="Update tags">
              {u.tags.slice(0, 3).map((t) => (
                <span key={t} className="tagChip updateTagChip">
                  <span className="tagGlyph" aria-hidden>{tagIconFor(t)}</span>
                  <span>{t}</span>
                </span>
              ))}
            </span>
          ) : null}
        </button>
      );
    })
  );

  return (
    <SplitPageLayout
      tagline="Updates, openings, menu changes, PSAs, and quick announcements."
      taglineHidden={taglineHidden}
      isMobile={isMobile}
      current="updates"
      mobileOverlay={
        <div className="mobileDetail" data-open={mobileDetailOpen ? "true" : "false"} aria-hidden={!mobileDetailOpen}>
          <div className="mobileDetailHeader">
            <button className="backBtn" type="button" onClick={clearSelected}>
              Back
            </button>
            <div className="mobileDetailTitle">Update</div>
          </div>
          <div className="scroll" style={{ padding: "0 16px 96px 16px" }}>
            {selectedMobile ? <UpdateDetail update={selectedMobile} /> : null}
          </div>
        </div>
      }
    >
      <div className="split">
        <aside className="pane paneLeft">
          <div
            className="scroll"
            onScroll={(e) => {
              if (isMobile) setTaglineHidden((e.currentTarget as HTMLDivElement).scrollTop > 2);
            }}
          >
            {leftSticky}

            {filterOpen ? (
              <div
                className={`filterOverlay filterOverlay--pane${isMobile ? " filterOverlay--mobilePane" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Filters"
                onClick={() => setFilterOpen(false)}
              >
                <div className="filterOverlayPanel filterOverlayPanel--pane" onClick={(e) => e.stopPropagation()}>
                  <div className="filterOverlayHeader">
                    <div className="filterOverlayTitle">Filters</div>
                    <button
                      type="button"
                      className="filterOverlayClose"
                      onClick={() => setFilterOpen(false)}
                      aria-label="Close filters"
                    >
                      ✕
                    </button>
                  </div>

                  {q || tag ? (
                    <button
                      type="button"
                      className="filterOverlayClear"
                      onClick={() => {
                        setParam("q", null);
                        setParam("tag", null);
                        setFilterOpen(false);
                      }}
                    >
                      Clear search & filters
                    </button>
                  ) : null}

                  <div className="typePills" role="group" aria-label="Update filters">
                    <button
                      type="button"
                      className="typePill"
                      data-active={!tag ? "true" : "false"}
                      onClick={() => {
                        setParam("tag", null);
                        setFilterOpen(false);
                      }}
                    >
                      All
                    </button>
                    {tags.map((t) => {
                      const on = norm(tag) === norm(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          className="typePill"
                          data-active={on ? "true" : "false"}
                          onClick={() => {
                            setParam("tag", on ? null : t);
                            setFilterOpen(false);
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="splitPageListBody">{list}</div>
          </div>
        </aside>

        {!isMobile ? (
          <section className="pane paneRight">
            <div className="scroll">
              {!selectedDesktop ? (
                <div className="emptyRight">Select an update to view details.</div>
              ) : (
                <UpdateDetail update={selectedDesktop} />
              )}
            </div>
          </section>
        ) : null}
      </div>
    </SplitPageLayout>
  );
}
