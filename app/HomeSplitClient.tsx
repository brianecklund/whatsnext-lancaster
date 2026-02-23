"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type EventLite = {
  id: string;
  uid?: string | null;

  title?: string | null;
  summary?: string | null;

  start_datetime?: string | null;
  end_datetime?: string | null;

  event_type?: string | null;
  status?: string | null;

  locationName?: string | null;
  address?: string | null;

  website_url?: string | null;
  tickets_url?: string | null;

  imageUrl?: string | null;
  descriptionText?: string | null;
};

type Props = {
  events: EventLite[];
};

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

export default function HomeSplitClient({ events }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") || "";
  const type = sp.get("type") || "";
  const selectedKey = sp.get("event") || ""; // uid preferred

  const [filterOpen, setFilterOpen] = useState(false);

  // close filter overlay on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFilterOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) {
      if (e.event_type) set.add(e.event_type);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [events]);

  const filteredEvents = useMemo(() => {
    const nq = norm(q);
    const nt = norm(type);

    return events.filter((e) => {
      const hay = norm(
        [
          e.title ?? "",
          e.summary ?? "",
          e.locationName ?? "",
          e.address ?? "",
          e.event_type ?? "",
        ]
          .filter(Boolean)
          .join(" ")
      );

      const matchesSearch = !nq || hay.includes(nq);
      const matchesType = !nt || norm(e.event_type ?? "") === nt;

      return matchesSearch && matchesType;
    });
  }, [events, q, type]);

  const selectedEvent = useMemo(() => {
    if (!filteredEvents.length) return null;

    const byUid =
      selectedKey &&
      filteredEvents.find((e) => e.uid && e.uid === selectedKey);

    const byId =
      selectedKey && filteredEvents.find((e) => e.id === selectedKey);

    return byUid || byId || filteredEvents[0];
  }, [filteredEvents, selectedKey]);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);

    router.push(`/?${params.toString()}`);
  }

  // ✅ FIX: declare the stagger counter (used in inline animationDelay)
  let listAnimIndex = 0;

  return (
    <div className="pageShell">
      <div className="split">
        {/* LEFT */}
        <aside className="pane leftPane">
          {/* TOP LEFT CONTROLS */}
          <div className="leftSticky">
            <div className="leftTopControls">
              <input
                className="searchInput"
                placeholder="Search events…"
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
              {type ? (
                <button
                  className="activeChip"
                  onClick={() => setParam("type", null)}
                  type="button"
                >
                  {type} <span aria-hidden>×</span>
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

          {/* LIST */}
          <div className="listWrap">
            {filteredEvents.length === 0 ? (
              <div className="emptyLeft fadeInBlock">No matching events.</div>
            ) : (
              <div className="eventList">
                {filteredEvents.map((e) => {
                  const active =
                    (selectedEvent?.uid &&
                      e.uid &&
                      selectedEvent.uid === e.uid) ||
                    selectedEvent?.id === e.id;

                  const title = e.title || "Untitled event";
                  const dt = e.start_datetime || e.end_datetime;

                  return (
                    <button
                      key={e.id}
                      className="eventRow fadeInItem"
                      style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}
                      data-active={active ? "true" : "false"}
                      onClick={() => {
                        if (e.uid) setParam("event", e.uid);
                        else setParam("event", e.id);
                      }}
                      type="button"
                    >
                      <div className="eventRowTitle">{title}</div>
                      <div className="eventRowMeta">
                        {dt ? new Date(dt).toLocaleString() : "Date TBD"}
                        {e.event_type ? <span className="dot">•</span> : null}
                        {e.event_type ? <span>{e.event_type}</span> : null}
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
                  {eventTypes.map((t) => {
                    const isOn = norm(type) === norm(t);
                    return (
                      <button
                        key={t}
                        className={`filterPill ${isOn ? "on" : ""}`}
                        onClick={() => {
                          setParam("type", t);
                          setFilterOpen(false);
                        }}
                        type="button"
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <div className="filterOverlayFooter">
                  <button
                    className="filterClear"
                    onClick={() => {
                      setParam("type", null);
                      setFilterOpen(false);
                    }}
                    disabled={!type}
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
          {!selectedEvent ? (
            <div className="emptyRight fadeInBlock">Select an event.</div>
          ) : (
            <div className="detailWrap">
              {/* cascade blocks */}
              <div className="fadeInBlock" style={{ animationDelay: "0ms" }}>
                <div className="detailKicker">
                  {selectedEvent.event_type ? selectedEvent.event_type : "Event"}
                </div>
              </div>

              <div className="fadeInBlock" style={{ animationDelay: "70ms" }}>
                <h1 className="detailTitle">
                  {selectedEvent.title || "Untitled event"}
                </h1>
              </div>

              <div className="fadeInBlock" style={{ animationDelay: "140ms" }}>
                <div className="detailMeta">
                  {(selectedEvent.start_datetime || selectedEvent.end_datetime) ? (
                    <span>
                      {new Date(
                        selectedEvent.start_datetime || selectedEvent.end_datetime!
                      ).toLocaleString()}
                    </span>
                  ) : (
                    <span>Date TBD</span>
                  )}

                  {selectedEvent.locationName ? (
                    <>
                      <span className="dot">•</span>
                      <span>{selectedEvent.locationName}</span>
                    </>
                  ) : null}

                  {selectedEvent.address ? (
                    <>
                      <span className="dot">•</span>
                      <span>{selectedEvent.address}</span>
                    </>
                  ) : null}
                </div>
              </div>

              {selectedEvent.summary ? (
                <div className="fadeInBlock" style={{ animationDelay: "210ms" }}>
                  <p className="detailSummary">{selectedEvent.summary}</p>
                </div>
              ) : null}

              {selectedEvent.imageUrl ? (
                <div className="fadeInBlock" style={{ animationDelay: "280ms" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="detailImage" src={selectedEvent.imageUrl} alt="" />
                </div>
              ) : null}

              {selectedEvent.descriptionText ? (
                <div className="fadeInBlock" style={{ animationDelay: "350ms" }}>
                  <div className="detailBody">{selectedEvent.descriptionText}</div>
                </div>
              ) : null}

              {(selectedEvent.website_url || selectedEvent.tickets_url) ? (
                <div className="fadeInBlock" style={{ animationDelay: "420ms" }}>
                  <div className="detailActions">
                    {selectedEvent.website_url ? (
                      <a
                        className="detailButton"
                        href={selectedEvent.website_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Website
                      </a>
                    ) : null}

                    {selectedEvent.tickets_url ? (
                      <a
                        className="detailButton"
                        href={selectedEvent.tickets_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Tickets
                      </a>
                    ) : null}
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