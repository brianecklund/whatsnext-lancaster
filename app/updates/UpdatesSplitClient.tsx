"use client";

import { useEffect, useMemo, useState } from "react";
import MediaBlocks from "@/app/components/MediaBlocks";
import NewsTickerBar from "@/app/components/NewsTickerBar";
import SegmentedControl from "@/app/components/SegmentedControl";
import ToolbarIcon from "@/app/components/ToolbarIcon";
import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";
import { useSmoothWheel } from "@/app/components/useSmoothWheel";
import SplitPageLayout from "@/app/components/SplitPageLayout";
import MobileContentBackButton from "@/app/components/MobileContentBackButton";
import {
  resolveUpdateKind,
  updateKindIcon,
  updateKindLabel,
  type UpdateKind,
} from "@/lib/updateDisplay";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { NewsHubSeasonContent } from "@/lib/news-hub-season";

export type UpdateLite = {
  id: string;
  title: string;
  tags: string[];
  /** Primary type for icon + filter inference (menu, community, notice, opening, event, general, urgent, psa). */
  kind?: UpdateKind | string | null;
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
  newsHubSeason: NewsHubSeasonContent;
  currentSection?: "calendar" | "directory" | "updates";
  onNavigateSection?: (section: "calendar" | "directory" | "updates") => void;
  basePath?: string;
  /** Events in the current calendar week (Sun–Sat, local). */
  thisWeekEventCount?: number;
};

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}


function tagIconFor(tag: string): string {
  const t = norm(tag);
  if (t.includes("urgent") || t.includes("time-sensitive") || t.includes("asap")) return "⏱";
  if (t.includes("opening") || t.includes("launch") || t.includes("now open")) return "✦";
  if (t.includes("food") || t.includes("drink") || t.includes("menu") || t.includes("dining")) return "◔";
  if (t.includes("music") || t.includes("show") || t.includes("concert") || t.includes("festival")) return "♪";
  if (t.includes("art") || t.includes("gallery")) return "✳";
  if (t.includes("community") || t.includes("neighborhood") || t.includes("civic")) return "◎";
  if (t.includes("notable") || t.includes("headline event")) return "★";
  if (t.includes("alert") || t.includes("psa") || t.includes("notice") || t.includes("advisory")) return "!";
  return "•";
}

function UpdateDetail({ update }: { update: UpdateLite }) {
  const detailFlashKey = update?.id ?? update?.title ?? update?.date ?? "detail";
  const primaryKind = resolveUpdateKind(update);
  const linkLabel = update.linkLabel || "Learn more";
  const menuSampleCta = /sample menu/i.test(linkLabel);

  return (
    <div className="detailCard">
      <div key={detailFlashKey} className="detailFlash">
      <div className="detailHeader">
        <div>
          <div className="updateDetailTitleRow fadeInItem" style={{ animationDelay: "260ms" }}>
            <div className="detailTitle updateDetailTitleRow__title">{update.title}</div>
          </div>
          <div className="detailMeta fadeInItem" style={{ animationDelay: "320ms" }}>
            <span className="updateKindPill">{updateKindLabel(primaryKind)}</span>
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
          <a
            className={`pillBtn${menuSampleCta ? " pillBtn--menuSample" : ""}`}
            href={update.link}
            target="_blank"
            rel="noreferrer"
          >
            {linkLabel}
          </a>
        </div>
      ) : null}
      </div>
    </div>
  );
}

export default function UpdatesSplitClient({
  updates,
  newsHubSeason,
  currentSection,
  onNavigateSection,
  basePath = "/updates",
  thisWeekEventCount = 0,
}: Props) {
  useSmoothWheel(".scroll");
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();
  const resolvedSection = currentSection ?? (pathname?.startsWith("/updates") ? "updates" : pathname?.startsWith("/locations") ? "directory" : "calendar");

  const q = sp.get("q") || "";
  const searchKey = sp.toString();
  const selectedTags = useMemo(() => {
    const raw = new URLSearchParams(searchKey).getAll("tag");
    const out: string[] = [];
    const seen = new Set<string>();
    for (const t of raw) {
      const n = norm(t);
      if (!n || seen.has(n)) continue;
      seen.add(n);
      out.push(t.trim());
    }
    return out;
  }, [searchKey]);
  const selectedTagNormSet = useMemo(() => new Set(selectedTags.map((t) => norm(t))), [selectedTags]);
  const hasActiveTagFilters = selectedTags.length > 0;
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
    return safeUpdates.filter((u) => {
      if (selectedTagNormSet.size > 0) {
        const utags = new Set((u.tags || []).map((t) => norm(t)));
        const any = [...selectedTagNormSet].some((t) => utags.has(t));
        if (!any) return false;
      }
      if (!nq) return true;
      const hay = norm([u.title, ...(u.tags || []), u.body || ""].join(" "));
      return hay.includes(nq);
    });
  }, [safeUpdates, q, selectedTagNormSet]);

  const newsTickerItems = useMemo(() => {
    const upcoming = filtered.slice(0, 6).map((update) => {
      const rawTitle = (update.title ?? "").trim();
      const rawSum = (update.summary ?? "").trim();
      const fromBody =
        !rawTitle && !rawSum && update.body
          ? update.body
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 140)
          : "";
      const title = rawTitle || rawSum || fromBody || "Update";
      const tag0 = update.tags?.map((t) => (t ?? "").trim()).find(Boolean);
      let tail = "";
      if (rawTitle) {
        if (rawSum) tail = rawSum;
        else if (tag0) tail = tag0;
      } else if (tag0) {
        tail = tag0;
      }
      const text = tail ? `${title} • ${tail}` : title;
      return {
        id: update.id,
        label: update.pinned ? "NEWS" : "UPDATE",
        text,
        href: "#",
      };
    });

    return upcoming.length
      ? upcoming
      : [{ id: "ticker-fallback", label: "NEWS", text: "Upcoming Lancaster events, specials, and pop-ups.", href: "#" }];
  }, [filtered]);

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
    router.push(query ? `${basePath}?${query}` : basePath);
  }

  function clearTagFilters() {
    const params = new URLSearchParams(sp.toString());
    params.delete("tag");
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  }

  function toggleTagFilter(tagLabel: string) {
    const params = new URLSearchParams(sp.toString());
    const current = params.getAll("tag");
    const n = norm(tagLabel);
    const exists = current.some((c) => norm(c) === n);
    params.delete("tag");
    if (exists) {
      for (const c of current) {
        if (norm(c) !== n) params.append("tag", c);
      }
    } else {
      for (const c of current) params.append("tag", c);
      params.append("tag", tagLabel);
    }
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  }

  function setSelected(id: string) {
    setParam("u", id);
  }

  function clearSelected() {
    setParam("u", null);
  }

  function handleMobileUpdateBack() {
    clearSelected();
  }

  const leftSticky = (
    <div className="leftSticky splitPageStickySurface">
      <SegmentedControl
        className="tabs segmentedControl--primary"
        ariaLabel="Primary navigation"
        currentKey={resolvedSection}
        items={[
          { key: "calendar", label: "Calendar", href: onNavigateSection ? undefined : "/", onClick: onNavigateSection ? () => onNavigateSection("calendar") : undefined },
          { key: "directory", label: "Directory", href: onNavigateSection ? undefined : "/locations", onClick: onNavigateSection ? () => onNavigateSection("directory") : undefined },
          { key: "updates", label: "Updates", href: onNavigateSection ? undefined : "/updates", onClick: onNavigateSection ? () => onNavigateSection("updates") : undefined },
        ]}
      />

      <div className="leftControls">
        {isMobile ? (
          <>
            <div className="searchRow updatesSearchRowMobile">
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
                data-active={filterOpen || hasActiveTagFilters ? "true" : "false"}
                aria-label={filterOpen ? "Close filters" : "Open filters"}
                aria-expanded={filterOpen ? "true" : "false"}
                onClick={() => setFilterOpen((v) => !v)}
              >
                <ToolbarIcon src="/icons/filter.svg" alt="Filter" />
                <span>
                  {hasActiveTagFilters
                    ? selectedTags.length === 1
                      ? `Filter: ${selectedTags[0]}`
                      : `Filters (${selectedTags.length})`
                    : "Filter"}
                </span>
              </button>
            </div>
            <div className="weeklySpotlightMobile weeklySpotlightMobile--stickyRow weeklySpotlightMobile--updatesHub fadeInItem">
              <div className="weeklySpotlightMobile__row">
                <Link href="/spring" className="weeklyOverview weeklyOverview--spotlightMobileHalf">
                  <div className="weeklySpotlightMobile__label weeklySpotlightMobile__label--seasonCaps">This season</div>
                  <div className="weeklySpotlightMobile__count">Spring Guide</div>
                </Link>
                <Link href="/?event=__weekly__&fromShell=updates" className="weeklyOverview weeklyOverview--spotlightMobileHalf">
                  <div className="weeklySpotlightMobile__label">This week</div>
                  <div className="weeklySpotlightMobile__count">
                    {(() => {
                      const n = thisWeekEventCount;
                      return `${n} ${n === 1 ? "event" : "events"}`;
                    })()}
                  </div>
                </Link>
              </div>
            </div>
          </>
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
              data-active={filterOpen || hasActiveTagFilters ? "true" : "false"}
              onClick={() => setFilterOpen((v) => !v)}
            >
              <ToolbarIcon src="/icons/filter.svg" alt="Filter" />
            </button>
            {q || hasActiveTagFilters ? (
              <button
                className="clearBtn"
                type="button"
                onClick={() => {
                  setParam("q", null);
                  clearTagFilters();
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

  const updatesDesktopHubRow = !isMobile ? (
    <div className="weeklySpotlightPair fadeInItem updatesDesktopHubRow updatesDesktopHubRow--inScroll">
      <Link href="/spring" className="weeklyOverview weeklyOverview--spotlightHalf">
        <div className="weeklyTitle weeklyTitle--seasonCaps">This season</div>
        <div className="weeklyCount">Spring Guide</div>
      </Link>
      <Link href="/?event=__weekly__&fromShell=updates" className="weeklyOverview weeklyOverview--spotlightHalf">
        <div className="weeklyTitle">Weekly Overview</div>
        <div className="weeklyCount">
          {thisWeekEventCount} event{thisWeekEventCount === 1 ? "" : "s"} this week
        </div>
      </Link>
    </div>
  ) : null;

  const list = filtered.length === 0 ? (
    <div className="emptyList">No updates found.</div>
  ) : (
    filtered.map((u) => {
      const active = selected?.id === u.id;
      const primaryKind = resolveUpdateKind(u);
      return (
        <button
          key={u.id}
          className="eventRow updateListRow"
          data-active={active ? "true" : "false"}
          data-update-kind={primaryKind}
          onClick={() => setSelected(u.id)}
          type="button"
        >
          <span className="updateListRow__thumb wnlPlaceholderThumb" aria-hidden />
          <span className="updateListRow__main">
            <span className="eventRowTitle">{u.title}</span>
            <span className="eventRowMeta updateRowMeta">
              {u.pinned ? <span className="updateDateBadge">Pinned</span> : null}
              {u.date ? <span className="updateDateBadge">{u.date}</span> : null}
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
          </span>
          <span className="updateListRow__kind" title={updateKindLabel(primaryKind)}>
            <span className="updateKindOrb updateKindOrb--list" aria-hidden>
              <span className="updateKindOrb__glyph">{updateKindIcon(primaryKind)}</span>
            </span>
            <span className="visuallyHidden">{updateKindLabel(primaryKind)}</span>
          </span>
        </button>
      );
    })
  );

  return (
    <SplitPageLayout
      tagline="Updates, openings, menu changes, PSAs, and quick announcements."
      taglineHidden={taglineHidden}
      isMobile={isMobile}
      mobileDetailOpen={mobileDetailOpen}
      current={resolvedSection === "calendar" ? "calendar" : resolvedSection === "directory" ? "directory" : "updates"}
      onNavigateSection={onNavigateSection}
      hideDefaultIntro={isMobile && mobileDetailOpen}
      pageShellClassName="pageShell--listingPairReveal"
      topBar={!(isMobile && mobileDetailOpen) ? (
        <NewsTickerBar
          className={isMobile ? undefined : "newsBar--shellDesktop"}
          introText="A calendar of events, specials, and pop-ups in Lancaster, PA."
          items={newsTickerItems}
          seasonLandingHref="/spring"
          seasonContent={newsHubSeason}
          mobileExploreOnly={isMobile}
          desktopIntroExplore
        />
      ) : undefined}
      mobileOverlay={
        <div
          className="mobileDetail mobileDetail--updatesListing"
          data-open={mobileDetailOpen ? "true" : "false"}
          aria-hidden={!mobileDetailOpen}
        >
          <div className="scroll mobileListingContentScroll" style={{ paddingBottom: 96 }}>
            {selectedMobile ? (
              <>
                <div className="mobileListingContentBackWrap">
                  <MobileContentBackButton onBack={handleMobileUpdateBack} />
                </div>
                <UpdateDetail update={selectedMobile} />
              </>
            ) : null}
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

            {updatesDesktopHubRow}

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

                  {q || hasActiveTagFilters ? (
                    <button
                      type="button"
                      className="filterOverlayClear"
                      onClick={() => {
                        setParam("q", null);
                        clearTagFilters();
                        setFilterOpen(false);
                      }}
                    >
                      Clear search & filters
                    </button>
                  ) : null}

                  <div className="typePills" role="group" aria-label="Update filters (choose one or more)">
                    <button
                      type="button"
                      className="typePill"
                      data-active={!hasActiveTagFilters ? "true" : "false"}
                      onClick={() => {
                        clearTagFilters();
                        if (!isMobile) setFilterOpen(false);
                      }}
                    >
                      All
                    </button>
                    {tags.map((t) => {
                      const on = selectedTagNormSet.has(norm(t));
                      return (
                        <button
                          key={t}
                          type="button"
                          className="typePill"
                          data-active={on ? "true" : "false"}
                          onClick={() => toggleTagFilter(t)}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="splitPageListBody splitPageListBody--updatesLead">{list}</div>
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
