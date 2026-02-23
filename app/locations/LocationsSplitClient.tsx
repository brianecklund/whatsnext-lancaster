"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LocationLite } from "@/lib/types";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function LocationsSplitClient({ locations }: { locations: LocationLite[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterOpen, setFilterOpen] = useState(false);

  const selectedLocationKey = searchParams.get("location");
  const q = searchParams.get("q") ?? "";
  const cat = searchParams.get("cat") ?? "";

  function navigate(params: URLSearchParams) {
    const qs = params.toString();
    router.replace(qs ? `/locations?${qs}` : "/locations");
  }

  function setSelectedLocation(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", key);
    navigate(params);
  }

  function clearSelectedLocation() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("location");
    navigate(params);
  }

  function setQuery(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.trim()) params.set("q", next);
    else params.delete("q");
    // If current selection is filtered out, we'll fallback in derived state.
    navigate(params);
  }

  function setCategory(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set("cat", next);
    else params.delete("cat");
    // reset selection when changing category for clarity
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
    const nq = normalize(q || "");
    const ncat = normalize(cat || "");

    return locations.filter((l) => {
      const name = l.name ?? "";
      const addr = l.address ?? "";
      const desc = l.description ?? "";
      const category = l.category ?? "";

      if (ncat && normalize(category) !== ncat) return false;

      if (!nq) return true;

      const hay = `${name} ${addr} ${desc} ${category}`.toLowerCase();
      return hay.includes(nq);
    });
  }, [locations, q, cat]);

  const selectedDesktop = useMemo(() => {
    if (!filtered.length) return null;
    if (!selectedLocationKey) return filtered[0];
    return (
      filtered.find((l) => (l.uid ?? l.id) === selectedLocationKey) ?? filtered[0]
    );
  }, [filtered, selectedLocationKey]);

  const selectedMobile = useMemo(() => {
    if (!selectedLocationKey) return null;
    return filtered.find((l) => (l.uid ?? l.id) === selectedLocationKey) ?? null;
  }, [filtered, selectedLocationKey]);

  const mobileDetailOpen = Boolean(selectedLocationKey);

  return (
    <div className="pageShell">
      <div className="tagline">
        A directory of places to go — venues, galleries, parks, shops, and more.
      </div>

      <div className="split">
        {/* LEFT */}
        <div className="pane">
          <div className="scroll">
            <div className="leftSticky">
              <div className="leftTopControls" aria-label="Search and filters">
                <input
                  className="searchInput"
                  type="search"
                  value={q}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search directory…"
                />
                <button
                  className="filterBtn"
                  type="button"
                  onClick={() => setFilterOpen(true)}
                >
                  Filter
                </button>
              </div>

              <div className="tabs" aria-label="Primary navigation">
                <a className="tabBtn" href="/">Calendar</a>
                <a className="tabBtn" href="/locations" aria-current="page">Directory</a>
                <a className="tabBtn" href="/updates">Updates</a>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="emptyList">No locations match your search.</div>
            ) : (
              <section className="listBlock" style={{ paddingTop: 10 }}>
                {filtered.map((l) => {
                  const key = (l.uid ?? l.id) as string;
                  const active = selectedLocationKey
                    ? selectedLocationKey === key
                    : selectedDesktop?.uid === l.uid && selectedDesktop?.id === l.id;

                  return (
                    <button
                      key={l.id}
                      className="eventRow"
                      data-active={active ? "true" : "false"}
                      onClick={() => setSelectedLocation(key)}
                      type="button"
                    >
                      <span className="eventRowTitle">{l.name ?? "Untitled"}</span>
                      <span className="eventRowMeta">
                        {l.category ? <span>{l.category}</span> : null}
                        {l.address ? <span className="dot">•</span> : null}
                        {l.address ? <span>{l.address}</span> : null}
                      </span>
                    </button>
                  );
                })}
              </section>
            )}

            {/* Filter overlay (covers LEFT content area) */}
            <div
              className="filterOverlay"
              data-open={filterOpen ? "true" : "false"}
              aria-hidden={!filterOpen}
            >
              <div className="filterOverlayHeader">
                <div className="filterOverlayTitle">Filter</div>
                <button
                  className="overlayClose"
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setFilterOpen(false)}
                >
                  ×
                </button>
              </div>

              <div className="filterOptions">
                <button
                  className="pillBtn"
                  data-active={cat ? "false" : "true"}
                  type="button"
                  onClick={() => {
                    setCategory("");
                    setFilterOpen(false);
                  }}
                >
                  All
                </button>

                {categories.map((c) => (
                  <button
                    key={c}
                    className="pillBtn"
                    data-active={normalize(cat) === normalize(c) ? "true" : "false"}
                    type="button"
                    onClick={() => {
                      setCategory(c);
                      setFilterOpen(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (desktop) */}
        <div className="pane paneRight">
          <div className="scroll">
            {!selectedDesktop ? (
              <div className="emptyRight">Select a location to see details.</div>
            ) : (
              <LocationDetail location={selectedDesktop} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile controls (above bottom tabs) */}
      <div className="mobileControls" aria-label="Search and filters">
        <input
          className="searchInput"
          type="search"
          value={q}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search directory…"
        />
        <button className="filterBtn" type="button" onClick={() => setFilterOpen(true)}>
          Filter
        </button>
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
          <button className="backBtn" type="button" onClick={clearSelectedLocation}>
            Back
          </button>
          <div className="mobileDetailTitle">Location</div>
        </div>
        <div className="scroll" style={{ padding: "0 16px 24px 16px" }}>
          {selectedMobile ? <LocationDetail location={selectedMobile} /> : null}
        </div>
      </div>
    </div>
  );
}

function LocationDetail({ location }: { location: LocationLite }) {
  return (
    <div>
      <div className="rightHeader">
        <h1 className="detailTitle">{location.name ?? "Location"}</h1>

        <div className="detailMeta">
          {location.category ? <span className="venue">{location.category}</span> : null}
          {location.address ? <span className="muted">{location.address}</span> : null}
        </div>

        <div className="detailChips" aria-label="Location highlights">
          {location.website ? (
            <a className="pillLink" href={location.website} target="_blank" rel="noreferrer">
              Website
            </a>
          ) : null}
        </div>
      </div>

      {location.description ? (
        <div className="prose" style={{ marginTop: 18 }}>
          <p>{location.description}</p>
        </div>
      ) : (
        <div className="prose" style={{ marginTop: 18 }}>
          <p className="muted">No description yet.</p>
        </div>
      )}
    </div>
  );
}
