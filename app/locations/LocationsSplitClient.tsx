"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type LocationLite = {
  id: string;
  uid?: string | null;

  name?: string | null;
  descriptionText?: string | null;

  address?: string | null;
  category?: string | null;

  website?: string | null;

  imageUrl?: string | null;
};

type Props = {
  locations: LocationLite[];
};

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

export default function LocationsSplitClient({ locations }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") || "";
  const cat = sp.get("cat") || "";
  const selectedKey = sp.get("location") || ""; // uid preferred

  const [filterOpen, setFilterOpen] = useState(false);

  // close filter overlay on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFilterOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const l of locations) {
      if (l.category) set.add(l.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [locations]);

  const filteredLocations = useMemo(() => {
    const nq = norm(q);
    const nc = norm(cat);

    return locations.filter((l) => {
      const hay = norm(
        [l.name ?? "", l.descriptionText ?? "", l.address ?? "", l.category ?? ""]
          .filter(Boolean)
          .join(" ")
      );

      const matchesSearch = !nq || hay.includes(nq);
      const matchesCat = !nc || norm(l.category ?? "") === nc;

      return matchesSearch && matchesCat;
    });
  }, [locations, q, cat]);

  const selectedLocation = useMemo(() => {
    if (!filteredLocations.length) return null;

    const byUid =
      selectedKey &&
      filteredLocations.find((l) => l.uid && l.uid === selectedKey);

    const byId =
      selectedKey && filteredLocations.find((l) => l.id === selectedKey);

    return byUid || byId || filteredLocations[0];
  }, [filteredLocations, selectedKey]);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);

    router.push(`/locations?${params.toString()}`);
  }

  // ✅ FIX: declare stagger counter for list animation
  let listAnimIndex = 0;

  return (
    <div className="pageShell">
      <div className="split">
        {/* LEFT */}
        <aside className="pane leftPane">
          <div className="leftSticky">
            <div className="leftTopControls">
              <input
                className="searchInput"
                placeholder="Search places…"
                value={q}
                onChange={(e) => setParam("q", e.target.value)}
              />

              <button
                className="filterButton"
                onClick={() => setFilterOpen(true)}
                type="button"
              >
                Filter
              </button>
            </div>

            <div className="leftActiveFilters">
              {cat ? (
                <button
                  className="activeChip"
                  onClick={() => setParam("cat", null)}
                  type="button"
                >
                  {cat} <span aria-hidden>×</span>
                </button>
              ) : null}

              {q ? (
                <button
                  className="activeChip"
                  onClick={() => setParam("q", null)}
                  type="button"
                >
                  “{q}” <span aria-hidden>×</span>
                </button>
              ) : null}
            </div>
          </div>

          <div className="listWrap">
            {filteredLocations.length === 0 ? (
              <div className="emptyLeft fadeInBlock">No matching listings.</div>
            ) : (
              <div className="eventList">
                {filteredLocations.map((l) => {
                  const active =
                    (selectedLocation?.uid &&
                      l.uid &&
                      selectedLocation.uid === l.uid) ||
                    selectedLocation?.id === l.id;

                  const title = l.name || "Untitled location";

                  return (
                    <button
                      key={l.id}
                      className="eventRow fadeInItem"
                      style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}
                      data-active={active ? "true" : "false"}
                      onClick={() => {
                        if (l.uid) setParam("location", l.uid);
                        else setParam("location", l.id);
                      }}
                      type="button"
                    >
                      <div className="eventRowTitle">{title}</div>
                      <div className="eventRowMeta">
                        {l.category ? <span>{l.category}</span> : <span>Listing</span>}
                        {l.address ? <span className="dot">•</span> : null}
                        {l.address ? <span>{l.address}</span> : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* FILTER OVERLAY (covers LEFT pane) */}
          {filterOpen ? (
            <div className="filterOverlay" role="dialog" aria-modal="true">
              <div className="filterOverlayHeader">
                <div className="filterOverlayTitle">Filter</div>
                <button
                  className="filterOverlayClose"
                  onClick={() => setFilterOpen(false)}
                  aria-label="Close filters"
                  type="button"
                >
                  ×
                </button>
              </div>

              <div className="filterOverlayBody">
                <div className="filterPills">
                  {categories.map((c) => {
                    const isOn = norm(cat) === norm(c);
                    return (
                      <button
                        key={c}
                        className={`filterPill ${isOn ? "on" : ""}`}
                        onClick={() => {
                          setParam("cat", c);
                          setFilterOpen(false);
                        }}
                        type="button"
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>

                <div className="filterOverlayFooter">
                  <button
                    className="filterClear"
                    onClick={() => {
                      setParam("cat", null);
                      setFilterOpen(false);
                    }}
                    disabled={!cat}
                    type="button"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </aside>

        {/* RIGHT */}
        <main className="pane rightPane">
          {!selectedLocation ? (
            <div className="emptyRight fadeInBlock">Select a listing.</div>
          ) : (
            <div className="detailWrap">
              <div className="fadeInBlock" style={{ animationDelay: "0ms" }}>
                <div className="detailKicker">
                  {selectedLocation.category ? selectedLocation.category : "Directory"}
                </div>
              </div>

              <div className="fadeInBlock" style={{ animationDelay: "70ms" }}>
                <h1 className="detailTitle">
                  {selectedLocation.name || "Untitled location"}
                </h1>
              </div>

              <div className="fadeInBlock" style={{ animationDelay: "140ms" }}>
                <div className="detailMeta">
                  {selectedLocation.address ? (
                    <span>{selectedLocation.address}</span>
                  ) : (
                    <span>Address TBD</span>
                  )}
                </div>
              </div>

              {selectedLocation.imageUrl ? (
                <div className="fadeInBlock" style={{ animationDelay: "210ms" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="detailImage" src={selectedLocation.imageUrl} alt="" />
                </div>
              ) : null}

              {selectedLocation.descriptionText ? (
                <div className="fadeInBlock" style={{ animationDelay: "280ms" }}>
                  <div className="detailBody">{selectedLocation.descriptionText}</div>
                </div>
              ) : null}

              {selectedLocation.website ? (
                <div className="fadeInBlock" style={{ animationDelay: "350ms" }}>
                  <div className="detailActions">
                    <a
                      className="detailButton"
                      href={selectedLocation.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}