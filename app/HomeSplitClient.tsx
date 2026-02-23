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

const WEEKLY_KEY = "__weekly__";

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

function safeDateFromEvent(e: EventLite): Date | null {
  const raw = e.start_datetime || e.end_datetime;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d;
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfSundayFromToday(): Date {
  const today = startOfToday();
  const day = today.getDay(); // 0=Sun .. 6=Sat
  const daysUntilSunday = (7 - day) % 7;
  const end = new Date(today);
  end.setDate(today.getDate() + daysUntilSunday);
  end.setHours(23, 59, 59, 999);
  return end;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function formatDayHeading(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function formatTimeLabel(d: Date): string {
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function HomeSplitClient({ events }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") || "";
  const type = sp.get("type") || "";

  // Default to weekly overview on page load if no explicit selection
  const selectedParam = sp.get("event");
  const selectedKey = selectedParam ?? WEEKLY_KEY;

  const [filterOpen, setFilterOpen] = useState(false);

  // mobile tab toggle (keeps your bottom buttons behavior)
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTab, setMobileTab] = useState<"list" | "detail">("list");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFilterOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.push(`/?${params.toString()}`);
  }

  function goDetailMobile() {
    if (isMobile) setMobileTab("detail");
  }

  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) if (e.event_type) set.add(e.event_type);
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

  const leftDayGroups = useMemo(() => {
    const map = new Map<string, { date: Date; items: EventLite[] }>();

    for (const e of filteredEvents) {
      const d = safeDateFromEvent(e);
      if (!d) continue;
      const dk = dayKey(d);

      if (!map.has(dk)) map.set(dk, { date: startOfDay(d), items: [] });
      map.get(dk)!.items.push(e);
    }

    const groups = Array.from(map.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    for (const g of groups) {
      g.items.sort((a, b) => {
        const da = safeDateFromEvent(a)?.getTime() ?? 0;
        const db = safeDateFromEvent(b)?.getTime() ?? 0;
        return da - db;
      });
    }

    return groups;
  }, [filteredEvents]);

  const weeklyRange = useMemo(() => {
    const start = startOfToday();
    const end = endOfSundayFromToday();
    return { start, end };
  }, []);

  const weekEvents = useMemo(() => {
    const { start, end } = weeklyRange;

    return filteredEvents
      .map((e) => ({ e, d: safeDateFromEvent(e) }))
      .filter(
        ({ d }) =>
          d &&
          d.getTime() >= start.getTime() &&
          d.getTime() <= end.getTime()
      )
      .sort((a, b) => a.d!.getTime() - b.d!.getTime())
      .map(({ e }) => e);
  }, [filteredEvents, weeklyRange]);

  const weekEventsCount = weekEvents.length;

  const weekGroups = useMemo(() => {
    const map = new Map<string, { date: Date; items: EventLite[] }>();

    for (const e of weekEvents) {
      const d = safeDateFromEvent(e);
      if (!d) continue;
      const dk = dayKey(d);

      if (!map.has(dk)) map.set(dk, { date: startOfDay(d), items: [] });
      map.get(dk)!.items.push(e);
    }

    const groups = Array.from(map.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    for (const g of groups) {
      g.items.sort((a, b) => {
        const da = safeDateFromEvent(a)?.getTime() ?? 0;
        const db = safeDateFromEvent(b)?.getTime() ?? 0;
        return da - db;
      });
    }

    return groups;
  }, [weekEvents]);

  const selectedEvent = useMemo(() => {
    if (!filteredEvents.length) return null;
    if (selectedKey === WEEKLY_KEY) return null;

    const byUid =
      selectedKey && filteredEvents.find((e) => e.uid && e.uid === selectedKey);
    const byId = selectedKey && filteredEvents.find((e) => e.id === selectedKey);

    return byUid || byId || null;
  }, [filteredEvents, selectedKey]);

  // stagger counter for left list (only affects animation delay if you already have fadeInItem)
  let listAnimIndex = 0;

  const showLeft = !isMobile || mobileTab === "list";
  const showRight = !isMobile || mobileTab === "detail";

  return (
    <div className="pageShell">
      <div className="split">
        {/* LEFT */}
        {showLeft ? (
          <aside className="pane">
            <div className="scroll">
              {/* Keep your existing sticky/filter UI structure as-is */}
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

              {/* Weekly Overview (left) — uses the SAME row styling system */}
              <button
                type="button"
                className="eventRow weeklyOverviewRow fadeInItem"
                style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}
                data-active={selectedKey === WEEKLY_KEY ? "true" : "false"}
                onClick={() => {
                  setParam("event", WEEKLY_KEY);
                  goDetailMobile();
                }}
              >
                <div className="eventRowTitle">Weekly Overview</div>
                <div className="eventRowMeta">
                  {weekEventsCount} event{weekEventsCount === 1 ? "" : "s"} left
                  this week
                </div>
              </button>

              {/* Left list */}
              {leftDayGroups.map((g) => (
                <section key={dayKey(g.date)} className="dayBlock">
                  <div className="dayTitle">{formatDayHeading(g.date)}</div>

                  {g.items.map((e) => {
                    const active =
                      selectedEvent?.id === e.id ||
                      (selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid);

                    const title = e.title || "Untitled event";
                    const d = safeDateFromEvent(e);
                    const timeLabel = d ? formatTimeLabel(d) : "Time TBD";

                    return (
                      <button
                        key={e.id}
                        className="eventRow fadeInItem"
                        style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}
                        data-active={active ? "true" : "false"}
                        onClick={() => {
                          if (e.uid) setParam("event", e.uid);
                          else setParam("event", e.id);
                          goDetailMobile();
                        }}
                        type="button"
                      >
                        <div className="eventRowTitle">{title}</div>
                        <div className="eventRowMeta">
                          <span>{timeLabel}</span>
                          {e.event_type ? <span className="dot">•</span> : null}
                          {e.event_type ? <span>{e.event_type}</span> : null}
                        </div>
                      </button>
                    );
                  })}
                </section>
              ))}

              {/* Filter Overlay — keep structure consistent */}
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
            </div>
          </aside>
        ) : null}

        {/* RIGHT */}
        {showRight ? (
          <main className="pane paneRight">
            <div className="scroll">
              {selectedKey === WEEKLY_KEY ? (
                <div className="detailWrap">
                  <div className="detailKicker">Weekly Overview</div>
                  <h1 className="detailTitle">This Week</h1>

                  <div className="detailMeta">
                    <span>
                      {weeklyRange.start.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      –{" "}
                      {weeklyRange.end.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="dot">•</span>
                    <span>
                      {weekEventsCount} event{weekEventsCount === 1 ? "" : "s"} left
                    </span>
                  </div>

                  {weekEventsCount === 0 ? (
                    <div className="emptyRight">
                      No events scheduled for the rest of this week.
                    </div>
                  ) : (
                    <div className="weeklyCards">
                      {weekGroups.map((g) => (
                        <div key={dayKey(g.date)} className="weeklyDayGroup">
                          <div className="dayTitle">{formatDayHeading(g.date)}</div>

                          {g.items.map((e) => {
                            const title = e.title || "Untitled event";
                            const d = safeDateFromEvent(e);
                            const timeLabel = d ? formatTimeLabel(d) : "Time TBD";

                            const isSelected =
                              selectedEvent?.id === e.id ||
                              (selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid);

                            return (
                              <button
                                key={e.id}
                                type="button"
                                className="weeklyCard weeklyCardSelectable"
                                aria-selected={isSelected ? "true" : "false"}
                                onClick={() => {
                                  if (e.uid) setParam("event", e.uid);
                                  else setParam("event", e.id);
                                }}
                              >
                                <div className="weeklyCardMedia">
                                  {e.imageUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img className="weeklyThumb" src={e.imageUrl} alt="" />
                                  ) : (
                                    <div className="weeklyThumbPlaceholder" aria-hidden />
                                  )}
                                </div>

                                <div className="weeklyCardContent">
                                  <div className="weeklyCardTop">
                                    <div className="weeklyCardTitleWrap">
                                      <div className="weeklyCardTitle">{title}</div>
                                      <div className="weeklyCardTime">{timeLabel}</div>
                                    </div>

                                    {(e.tickets_url || e.website_url) ? (
                                      <div className="weeklyCardActions">
                                        {e.tickets_url ? (
                                          <a
                                            className="weeklyMiniBtn"
                                            href={e.tickets_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(ev) => ev.stopPropagation()}
                                          >
                                            Tickets
                                          </a>
                                        ) : null}

                                        {e.website_url ? (
                                          <a
                                            className="weeklyMiniBtn"
                                            href={e.website_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(ev) => ev.stopPropagation()}
                                          >
                                            Website
                                          </a>
                                        ) : null}
                                      </div>
                                    ) : null}
                                  </div>

                                  {(e.summary || e.descriptionText) ? (
                                    <div className="weeklyCardDesc">
                                      {e.summary || e.descriptionText}
                                    </div>
                                  ) : null}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : !selectedEvent ? (
                <div className="emptyRight">Select an event.</div>
              ) : (
                <div className="detailWrap">
                  <div className="detailKicker">{selectedEvent.event_type || "Event"}</div>
                  <h1 className="detailTitle">{selectedEvent.title || "Untitled event"}</h1>

                  <div className="detailMeta">
                    <span>
                      {(() => {
                        const d = safeDateFromEvent(selectedEvent);
                        return d ? formatTimeLabel(d) : "Time TBD";
                      })()}
                    </span>

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

                  {selectedEvent.summary ? (
                    <p className="detailSummary">{selectedEvent.summary}</p>
                  ) : null}

                  {selectedEvent.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="detailImage" src={selectedEvent.imageUrl} alt="" />
                  ) : null}

                  {selectedEvent.descriptionText ? (
                    <div className="detailBody">{selectedEvent.descriptionText}</div>
                  ) : null}

                  {(selectedEvent.website_url || selectedEvent.tickets_url) ? (
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
                  ) : null}
                </div>
              )}
            </div>
          </main>
        ) : null}
      </div>

      {/* Mobile bottom tabs */}
      {isMobile ? (
        <div className="mobileTabs">
          <button
            className="tabBtn"
            aria-current={mobileTab === "list" ? "page" : undefined}
            onClick={() => setMobileTab("list")}
            type="button"
          >
            List
          </button>
          <button
            className="tabBtn"
            aria-current={mobileTab === "detail" ? "page" : undefined}
            onClick={() => setMobileTab("detail")}
            type="button"
          >
            Details
          </button>
        </div>
      ) : null}
    </div>
  );
}