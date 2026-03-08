"use client";

import { useEffect, useMemo, useState } from "react";
import { useSmoothWheel } from "@/app/components/useSmoothWheel";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { LocationLite } from "@/lib/types";

function normalize(v: string) {
  return (v || "").toLowerCase().trim();
}

type LocationRow = LocationLite & { key: string };

export default function LocationsSplitClient({ locations }: { locations: LocationRow[] }) {
  useSmoothWheel(".scroll");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
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

  useEffect(() => {
    if (!effectiveIsMobile) setFilterOpen(false);
  }, [effectiveIsMobile]);

  const selectedKey = searchParams.get("location");
  const q = searchParams.get("q") ?? "";
  const cat = searchParams.get("cat") ?? "";

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
    navigate(params);
  }

  function setCategory(next: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!next) params.delete("cat");
    else params.set("cat", next);
    params.delete("location");
    navigate(params);
  }

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const l of locations) {
      if (l.category) set.add(l.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [locations]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    const nc = normalize(cat);

    return locations.filter((l) => {
      const hay = normalize([l.name ?? "", l.address ?? "", l.category ?? "", l.description ?? ""].filter(Boolean).join(" "));
      const matchesSearch = !nq || hay.includes(nq);
      const matchesCat = !nc || normalize(l.category ?? "") === nc;
      return matchesSearch && matchesCat;
    });
  }, [locations, q, cat]);

  const selectedDesktop = useMemo(() => {
    if (!filtered.length) return null;
    if (!selectedKey) return filtered[0];
    return filtered.find((l) => l.key === selectedKey) ?? filtered[0];
  }, [filtered, selectedKey]);

  const selectedMobile = useMemo(() => {
    if (!selectedKey) return null;
    return filtered.find((l) => l.key === selectedKey) ?? null;
  }, [filtered, selectedKey]);

  const mobileDetailOpen = Boolean(selectedKey);

  return (
    <div className="pageShell">
      <div className="tagline">A directory of places in Lancaster to explore.</div>

      <div className="split">
        {/* LEFT */}
        <div className="pane paneLeft">
          <div className="scroll">
            <div className="leftSticky">
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
                {effectiveIsMobile ? (
                  <div className="searchRow">
                    <input
                      className="searchInput"
                      value={q}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      aria-label="Search locations"
                    />
                    <button
                      type="button"
                      className="filterBtn"
                      aria-label={filterOpen ? "Close filters" : "Open filters"}
                      aria-expanded={filterOpen ? "true" : "false"}
                      onClick={() => setFilterOpen((v) => !v)}
                    >
                      Filter
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      className="searchInput"
                      value={q}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      aria-label="Search locations"
                    />
                    {(q || cat) ? (
                      <button
                        className="clearBtn"
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setCategory(null);
                        }}
                      >
                        Clear
                      </button>
                    ) : null}
                  </>
                )}
              </div>

              {!effectiveIsMobile ? (
                <div className="typePills" role="group" aria-label="Directory filters">
                  <button
                    type="button"
                    className="typePill"
                    data-active={!cat ? "true" : "false"}
                    onClick={() => setCategory(null)}
                  >
                    All
                  </button>
                  {categories.map((t) => {
                    const on = normalize(cat ?? "") === normalize(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        className="typePill"
                        data-active={on ? "true" : "false"}
                        onClick={() => setCategory(on ? null : t)}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {effectiveIsMobile && filterOpen ? (
              <div
                className="filterOverlay"
                role="dialog"
                aria-modal="true"
                aria-label="Filters"
                onClick={() => setFilterOpen(false)}
              >
                <div className="filterOverlayPanel" onClick={(e) => e.stopPropagation()}>
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

                  {(q || cat) ? (
                    <button
                      type="button"
                      className="filterOverlayClear"
                      onClick={() => {
                        setQuery("");
                        setCategory(null);
                        setFilterOpen(false);
                      }}
                    >
                      Clear search & filters
                    </button>
                  ) : null}

                  <div className="typePills" role="group" aria-label="Directory filters">
                    <button
                      type="button"
                      className="typePill"
                      data-active={!cat ? "true" : "false"}
                      onClick={() => {
                        setCategory(null);
                        setFilterOpen(false);
                      }}
                    >
                      All
                    </button>
                    {categories.map((t) => {
                      const on = normalize(cat ?? "") === normalize(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          className="typePill"
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
                </div>
              </div>
            ) : null}

            {filtered.length === 0 ? (
              <div className="emptyList">No listings yet.</div>
            ) : (
              <div style={{ paddingTop: 6 }}>
                {filtered.map((l) => {
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
            )}

          </div>
        </div>

        {/* RIGHT (desktop) */}
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

      {/* Mobile bottom tabs */}
      <div className="mobileTabs" aria-label="Primary navigation">
        <a className="tabBtn" href="/">Calendar</a>
        <a className="tabBtn" href="/locations" aria-current="page">Directory</a>
        <a className="tabBtn" href="/updates">Updates</a>
      </div>

      {/* Mobile detail overlay */}
      <div
        className="mobileDetail"
        data-open={mobileDetailOpen ? "true" : "false"}
        aria-hidden={!mobileDetailOpen}
      >
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
    </div>
  );
}

function LocationDetail({ location }: { location: LocationRow }) {
  const detailFlashKey = location.id ?? location.uid ?? location.name ?? "detail";
  return (
    <div key={detailFlashKey} className="detailCard detailFlash" data-reveal-group>
      <div className="detailTitle fadeInItem" data-reveal-item style={{ animationDelay: "260ms" }}>
        {location.name ?? "Untitled listing"}
      </div>

      <div className="detailMeta fadeInItem" data-reveal-item style={{ animationDelay: "320ms" }}>
        {location.category ? <span className="badge">{location.category}</span> : null}
        {location.address ? <span className="muted">{location.address}</span> : null}
      </div>

      {location.website ? (
        <p style={{ marginTop: 10 }} data-reveal-item>
          <a className="link" href={location.website} target="_blank" rel="noreferrer">
            Website
          </a>
        </p>
      ) : null}

      {location.description ? (
        <div className="detailBody fadeInItem" data-reveal-item style={{ marginTop: 14, animationDelay: "360ms" }}>
          <p>{location.description}</p>
        </div>
      ) : (
        <div className="detailBody fadeInItem" data-reveal-item style={{ marginTop: 14, animationDelay: "360ms" }}>
          <p className="muted">No description yet.</p>
        </div>
      )}
    </div>
  );
}
