"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SplitPageLayout from "@/app/components/SplitPageLayout";
import type { LocationLite } from "@/lib/types";
import { mergeDirectoryCategories } from "@/lib/directoryCategories";

function normalize(v?: string | null) {
  return (v || "").toLowerCase().trim();
}

function getLetter(value?: string | null) {
  const first = (value || "").trim().charAt(0).toUpperCase();
  return /^[A-Z]$/.test(first) ? first : "#";
}

type LocationRow = LocationLite & { key: string };
type GroupedSection = { letter: string; rows: LocationRow[] };

type Props = {
  locations?: LocationRow[];
};

const ALPHABET = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function LocationsSplitClient({ locations = [] }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const safeLocations = useMemo<LocationRow[]>(
    () => (Array.isArray(locations) ? locations : []),
    [locations],
  );

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [desktopFilterOpen, setDesktopFilterOpen] = useState(false);
  const [mobileOverlayOffset, setMobileOverlayOffset] = useState(0);
  const [activeLetter, setActiveLetter] = useState("#");
  const [taglineHidden, setTaglineHidden] = useState(false);

  const leftStickyRef = useRef<HTMLDivElement | null>(null);
  const leftScrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectedKey = searchParams.get("location");
  const q = searchParams.get("q") ?? "";
  const cat = searchParams.get("cat") ?? "";

  useEffect(() => {
    setMounted(true);
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

  const effectiveIsMobile = mounted ? isMobile : false;

  useEffect(() => {
    if (!effectiveIsMobile) {
      setFilterOpen(false);
      setTaglineHidden(false);
    }
    if (effectiveIsMobile) setDesktopFilterOpen(false);
  }, [effectiveIsMobile]);

  useEffect(() => {
    const shouldLock = filterOpen || (effectiveIsMobile && Boolean(selectedKey));
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    if (shouldLock) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [filterOpen, effectiveIsMobile, selectedKey]);

  useEffect(() => {
    if (!effectiveIsMobile) {
      setMobileOverlayOffset(0);
      return;
    }

    const updateOffset = () => {
      setMobileOverlayOffset(leftStickyRef.current?.offsetHeight ?? 0);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && leftStickyRef.current) {
      ro = new ResizeObserver(updateOffset);
      ro.observe(leftStickyRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateOffset);
      ro?.disconnect();
    };
  }, [effectiveIsMobile, q, cat, filterOpen, desktopFilterOpen]);

  function navigate(params: URLSearchParams) {
    const qs = params.toString();
    router.replace(qs ? `/locations?${qs}` : "/locations");
  }

  function setSelected(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", key);
    navigate(params);
  }

  function clearSelected() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("location");
    navigate(params);
  }

  function setQuery(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!next) params.delete("q");
    else params.set("q", next);
    params.delete("location");
    navigate(params);
  }

  function setCategory(next: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!next) params.delete("cat");
    else params.set("cat", next);
    params.delete("location");
    navigate(params);
  }

  const categories = useMemo(
    () => mergeDirectoryCategories(safeLocations.map((location) => location.category)),
    [safeLocations],
  );

  const filtered = useMemo(() => {
    const nq = normalize(q);
    const nc = normalize(cat);

    return safeLocations.filter((l) => {
      const hay = normalize(
        [l.name ?? "", l.address ?? "", l.category ?? "", l.description ?? ""]
          .filter(Boolean)
          .join(" "),
      );
      const matchesSearch = !nq || hay.includes(nq);
      const matchesCat = !nc || normalize(l.category) === nc;
      return matchesSearch && matchesCat;
    });
  }, [safeLocations, q, cat]);

  const featuredPartners = useMemo(
    () =>
      filtered
        .filter((location) => Boolean(location.customPageUid))
        .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")),
    [filtered],
  );

  const standardListings = useMemo(
    () =>
      filtered
        .filter((location) => !location.customPageUid)
        .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")),
    [filtered],
  );

  const groupedStandardListings = useMemo<GroupedSection[]>(() => {
    const grouped = new Map<string, LocationRow[]>();

    for (const row of standardListings) {
      const letter = getLetter(row.name);
      const existing = grouped.get(letter) ?? [];
      existing.push(row);
      grouped.set(letter, existing);
    }

    return ALPHABET.filter((letter) => grouped.has(letter)).map((letter) => ({
      letter,
      rows: grouped.get(letter) ?? [],
    }));
  }, [standardListings]);

  const visibleLetters = useMemo(
    () => groupedStandardListings.map((section) => section.letter),
    [groupedStandardListings],
  );

  const orderedLocations = useMemo(
    () => [...featuredPartners, ...standardListings],
    [featuredPartners, standardListings],
  );

  const selectedDesktop = useMemo(() => {
    if (orderedLocations.length === 0) return null;
    if (!selectedKey) return orderedLocations[0] ?? null;
    return filtered.find((l) => l.key === selectedKey) ?? orderedLocations[0] ?? null;
  }, [orderedLocations, selectedKey, filtered]);

  const selectedMobile = useMemo(() => {
    if (!selectedKey) return null;
    return filtered.find((l) => l.key === selectedKey) ?? null;
  }, [filtered, selectedKey]);

  useEffect(() => {
    if (visibleLetters.length === 0) {
      setActiveLetter("#");
      return;
    }
    if (!visibleLetters.includes(activeLetter)) {
      setActiveLetter(visibleLetters[0] ?? "#");
    }
  }, [visibleLetters, activeLetter]);

  useEffect(() => {
    if (effectiveIsMobile) return;
    const container = leftScrollRef.current;
    if (!container || visibleLetters.length === 0) return;

    const syncActiveLetter = () => {
      const containerRect = container.getBoundingClientRect();
      let current = visibleLetters[0] ?? "#";

      for (const letter of visibleLetters) {
        const section = sectionRefs.current[letter];
        if (!section) continue;
        const top = section.getBoundingClientRect().top - containerRect.top;
        if (top <= 140) current = letter;
        else break;
      }

      setActiveLetter(current);
    };

    syncActiveLetter();
    container.addEventListener("scroll", syncActiveLetter, { passive: true });
    window.addEventListener("resize", syncActiveLetter);

    return () => {
      container.removeEventListener("scroll", syncActiveLetter);
      window.removeEventListener("resize", syncActiveLetter);
    };
  }, [effectiveIsMobile, visibleLetters]);

  function jumpToLetter(letter: string) {
    const section = sectionRefs.current[letter];
    const container = leftScrollRef.current;
    if (!section || !container) return;

    const stickyHeight = leftStickyRef.current?.offsetHeight ?? 0;
    const top = section.offsetTop - stickyHeight - 12;
    container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActiveLetter(letter);
  }

  const mobileDetailOpen = effectiveIsMobile && Boolean(selectedMobile);
  const activeFilterLabel = cat ? `Filter: ${cat}` : "Filter";

  return (
    <SplitPageLayout
      tagline="A directory of places in Lancaster to explore."
      taglineHidden={taglineHidden}
      isMobile={effectiveIsMobile}
      current="directory"
      style={
        effectiveIsMobile
          ? ({ ["--mobileOverlayOffset" as string]: `${mobileOverlayOffset}px` } as CSSProperties)
          : undefined
      }
      mobileOverlay={
        <div className="mobileDetail" data-open={mobileDetailOpen ? "true" : "false"} aria-hidden={!mobileDetailOpen}>
          <div className="mobileDetailHeader">
            <button className="backBtn" type="button" onClick={clearSelected}>
              Back
            </button>
            <div className="mobileDetailTitle">Listing</div>
          </div>
          <div className="scroll" style={{ padding: "0 16px 84px 16px" }}>
            {selectedMobile ? <LocationDetail location={selectedMobile} /> : null}
          </div>
        </div>
      }
    >
      <div className="split">
        <div className="pane paneLeft">
          <div className="scroll" ref={leftScrollRef} onScroll={(e) => { if (effectiveIsMobile) setTaglineHidden((e.currentTarget as HTMLDivElement).scrollTop > 2); }}>
            <div className="leftSticky splitPageStickySurface" ref={leftStickyRef}>
              <div className="tabs" aria-label="Primary navigation">
                <button
                  type="button"
                  className="tabBtn"
                  data-active={pathname === "/" ? "true" : "false"}
                  onClick={() => router.push("/")}
                >
                  Calendar
                </button>
                <button
                  type="button"
                  className="tabBtn"
                  data-active={pathname.startsWith("/locations") ? "true" : "false"}
                  onClick={() => router.push("/locations")}
                >
                  Directory
                </button>
                <button
                  type="button"
                  className="tabBtn"
                  data-active={pathname.startsWith("/updates") ? "true" : "false"}
                  onClick={() => router.push("/updates")}
                >
                  Updates
                </button>
              </div>

              <div className="leftControls">
                <div className="searchRow">
                  <input
                    className="searchInput"
                    value={q}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    aria-label="Search locations"
                  />

                  {effectiveIsMobile ? (
                    <button
                      type="button"
                      className="filterBtn"
                      data-active={filterOpen || !!cat ? "true" : "false"}
                      aria-label={filterOpen ? "Close filters" : "Open filters"}
                      aria-expanded={filterOpen ? "true" : "false"}
                      onClick={() => setFilterOpen((v) => !v)}
                    >
                      {activeFilterLabel}
                    </button>
                  ) : q || cat ? (
                    <button
                      className="clearBtn"
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setCategory(null);
                        setDesktopFilterOpen(false);
                      }}
                    >
                      Clear
                    </button>
                  ) : null}
                </div>

                {!effectiveIsMobile ? (
                  <div className="directoryToolbar">
                    <div className="directoryAlphabetNav" aria-label="Directory alphabet navigation">
                      {ALPHABET.map((letter) => {
                        const enabled = visibleLetters.includes(letter);
                        const active = activeLetter === letter;
                        return (
                          <button
                            key={letter}
                            type="button"
                            className="directoryAlphaBtn"
                            data-letter={letter}
                            data-active={active ? "true" : "false"}
                            disabled={!enabled}
                            onClick={() => jumpToLetter(letter)}
                          >
                            {letter}
                          </button>
                        );
                      })}
                    </div>

                    <div className="directoryFilterWrap">
                      <button
                        type="button"
                        className="filterBtn"
                        data-active={desktopFilterOpen || !!cat ? "true" : "false"}
                        aria-expanded={desktopFilterOpen ? "true" : "false"}
                        onClick={() => setDesktopFilterOpen((value) => !value)}
                      >
                        {activeFilterLabel}
                      </button>

                      {desktopFilterOpen ? (
                        <div className="directoryFilterMenu" role="dialog" aria-label="Directory filters">
                          <button
                            type="button"
                            className="directoryFilterOption"
                            data-active={!cat ? "true" : "false"}
                            onClick={() => {
                              setCategory(null);
                              setDesktopFilterOpen(false);
                            }}
                          >
                            All
                          </button>
                          {categories.map((t) => {
                            const on = normalize(cat) === normalize(t);
                            return (
                              <button
                                key={t}
                                type="button"
                                className="directoryFilterOption"
                                data-active={on ? "true" : "false"}
                                onClick={() => {
                                  setCategory(on ? null : t);
                                  setDesktopFilterOpen(false);
                                }}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {effectiveIsMobile && filterOpen ? (
              <div className="mobileSheetOverlay" role="dialog" aria-modal="true" onClick={() => setFilterOpen(false)}>
                <div className="mobileSheet" onClick={(e) => e.stopPropagation()}>
                  <div className="mobileSheetHeader">
                    <div className="mobileSheetTitle">Directory filters</div>
                    <button
                      type="button"
                      className="mobileSheetClose"
                      onClick={() => setFilterOpen(false)}
                      aria-label="Close filters"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mobileSheetList" role="group" aria-label="Directory filters">
                    <button
                      type="button"
                      className="mobileSheetAction"
                      data-active={!cat ? "true" : "false"}
                      onClick={() => {
                        setCategory(null);
                        setFilterOpen(false);
                      }}
                    >
                      All
                    </button>
                    {categories.map((t) => {
                      const on = normalize(cat) === normalize(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          className="mobileSheetAction"
                          data-active={on ? "true" : "false"}
                          onClick={() => {
                            setCategory(on ? null : t);
                            setFilterOpen(false);
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>

                  {q || cat ? (
                    <button
                      type="button"
                      className="mobileSheetClear"
                      onClick={() => {
                        setQuery("");
                        setCategory(null);
                        setFilterOpen(false);
                      }}
                    >
                      Clear search & filters
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="splitPageListBody">
            {filtered.length === 0 ? (
              <div className="emptyList">No listings yet.</div>
            ) : (
              <div className="directoryListWrap">
                {featuredPartners.length > 0 ? (
                  <div className="directoryGroupBlock">
                    <div className="directorySectionHeading">Featured partners</div>
                    {featuredPartners.map((l) => {
                      const active = selectedKey ? selectedKey === l.key : selectedDesktop?.key === l.key;
                      return (
                        <button
                          key={l.id}
                          className="eventRow"
                          data-active={active ? "true" : "false"}
                          onClick={() => setSelected(l.key)}
                          type="button"
                        >
                          <span className="eventRowTitle">{l.name ?? "Untitled listing"}</span>
                          <span className="eventRowMeta">
                            {l.category ? <span>{l.category}</span> : null}
                            {l.address ? <span className="dot">•</span> : null}
                            {l.address ? <span>{l.address}</span> : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {groupedStandardListings.length > 0 ? (
                  <div className="directoryGroupBlock">
                    <div className="directorySectionHeading">Directory</div>
                    {groupedStandardListings.map((section) => (
                      <div
                        key={section.letter}
                        ref={(node) => {
                          sectionRefs.current[section.letter] = node;
                        }}
                        className="directoryLetterSection"
                        data-letter-section={section.letter}
                      >
                        <div className="directoryLetterHeading">{section.letter}</div>
                        {section.rows.map((l) => {
                          const active = selectedKey ? selectedKey === l.key : selectedDesktop?.key === l.key;
                          return (
                            <button
                              key={l.id}
                              className="eventRow"
                              data-active={active ? "true" : "false"}
                              onClick={() => setSelected(l.key)}
                              type="button"
                            >
                              <span className="eventRowTitle">{l.name ?? "Untitled listing"}</span>
                              <span className="eventRowMeta">
                                {l.category ? <span>{l.category}</span> : null}
                                {l.address ? <span className="dot">•</span> : null}
                                {l.address ? <span>{l.address}</span> : null}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
            </div>
          </div>
        </div>

        <div className="pane paneRight">
          <div className="scroll">
            {!selectedDesktop ? (
              <div className="emptyRight">Select a listing to see details.</div>
            ) : (
              <LocationDetail location={selectedDesktop} />
            )}
          </div>
        </div>
      </div>
    </SplitPageLayout>
  );
}

function LocationDetail({ location }: { location: LocationRow }) {
  const detailFlashKey = location.id ?? location.uid ?? location.name ?? "detail";

  return (
    <div key={detailFlashKey} className="detailCard detailFlash">
      <div className="detailTitle fadeInItem" style={{ animationDelay: "260ms" }}>
        {location.name ?? "Untitled listing"}
      </div>

      <div className="detailMeta fadeInItem" style={{ animationDelay: "320ms" }}>
        {location.category ? <span className="badge">{location.category}</span> : null}
        {location.address ? <span className="muted">{location.address}</span> : null}
      </div>

      {(location.customPageUrl || location.website) ? (
        <p style={{ marginTop: 10, display: "flex", gap: 14, flexWrap: "wrap" }}>
          {location.customPageUrl ? (
            <a className="link" href={location.customPageUrl}>
              Full page
            </a>
          ) : null}
          {location.website ? (
            <a className="link" href={location.website} target="_blank" rel="noreferrer">
              Website
            </a>
          ) : null}
        </p>
      ) : null}

      {location.description ? (
        <div className="detailBody fadeInItem" style={{ animationDelay: "380ms" }}>
          <p>{location.description}</p>
        </div>
      ) : null}
    </div>
  );
}
