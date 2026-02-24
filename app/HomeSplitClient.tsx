"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSmoothWheel } from "@/app/components/useSmoothWheel";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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

  // Some builds normalize this already
  imageUrl?: string | null;
  image_url?: string | null;
  descriptionText?: string | null;

  // Others pass through raw Prismic-ish shapes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any;
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
  return Number.isNaN(d.getTime()) ? null : d;
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfSundayFromToday(): Date {
  const today = startOfToday();
  const day = today.getDay(); // 0=Sun..6=Sat
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

function formatTimeShort(d: Date): string {
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickImageUrl(e: any): string | null {
  if (!e) return null;

  // normalized keys
  if (typeof e.imageUrl === "string" && e.imageUrl) return e.imageUrl;
  if (typeof e.image_url === "string" && e.image_url) return e.image_url;

  // raw prismic-ish image field
  const img = e.image;
  if (img) {
    if (typeof img.url === "string" && img.url) return img.url;
    const square = img.Square || img.square;
    if (square?.url) return square.url;

    const thumbs = img.thumbnails || img.variants;
    if (thumbs?.Square?.url) return thumbs.Square.url;
    if (thumbs?.square?.url) return thumbs.square.url;
  }

  return null;
}

function pickDescriptionText(e: EventLite): string | null {
  if (e.descriptionText) return e.descriptionText;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d: any = (e as any).description;
  if (!d) return null;
  if (typeof d === "string") return d;

  // very lightweight rich text fallback (avoid prismic runtime dependency here)
  if (Array.isArray(d)) {
    const parts = d
      .map((b) => (typeof b?.text === "string" ? b.text : ""))
      .filter(Boolean);
    return parts.length ? parts.join("\n\n") : null;
  }

  return null;
}

export default function HomeSplitClient({ events }: Props) {
  useSmoothWheel(".scroll");
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const q = sp.get("q") || "";
  const type = sp.get("type") || "";

  // Event type filter options (derived from data so we don't depend on hard-coded enums)
  const EVENT_TYPE_CANDIDATES = useMemo(() => {
    const set = new Set<string>();
    for (const e of events || []) {
      const t = typeof e.event_type === "string" ? e.event_type.trim() : "";
      if (t) set.add(t);
    }
    const dynamic = Array.from(set).sort((a, b) => a.localeCompare(b));
    // Keep Weekly Overview available alongside types
    return [WEEKLY_KEY, ...dynamic];
  }, [events]);

  // default selection = weekly overview
  const selectedParam = sp.get("event");
  // URL drives selection, but on mobile we keep an optimistic client key so the
  // detail panel can update immediately on tap (before the router finishes).
  const [clientSelectedKey, setClientSelectedKey] = useState<string | null>(null);
  const selectedKey = (clientSelectedKey ?? selectedParam) ?? WEEKLY_KEY;
  // Initialize from matchMedia so the first tap on mobile reliably opens detail.
  const [mounted, setMounted] = useState(false);
  // Hydration-safe: start false so SSR and first client render match.
  const [isMobile, setIsMobile] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [leftScrolled, setLeftScrolled] = useState(false);
  const leftScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    // Safari < 14 uses addListener/removeListener
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMq: any = mq;
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else if (anyMq.addListener) anyMq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else if (anyMq.removeListener) anyMq.removeListener(apply);
    };
  }, []);

  // Keep the optimistic client key in sync with the URL when navigation completes.
  useEffect(() => {
    setClientSelectedKey(selectedParam);
  }, [selectedParam]);

  function isMobileNow() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 980px)").matches;
  }
  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.push(`/?${params.toString()}`);
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

  const weekLabel = useMemo(() => {
    const fmt = (d: Date) => {
      const m = d.getMonth() + 1;
      const day = d.getDate();
      const yy = String(d.getFullYear()).slice(-2);
      return `${m}/${day}/${yy}`;
    };
    return `${fmt(weeklyRange.start)} to ${fmt(weeklyRange.end)}`;
  }, [weeklyRange]);

  const weekInsights = useMemo(() => {
    const buckets = { "Live music": 0, "Food & drink": 0, "Community": 0, "Other": 0 };
    for (const e of weekEvents) {
      const t = (e.event_type || "").toLowerCase();
      if (t.includes("music") || t.includes("concert") || t.includes("show")) buckets["Live music"]++;
      else if (t.includes("food") || t.includes("drink") || t.includes("dining") || t.includes("menu")) buckets["Food & drink"]++;
      else if (t.includes("community") || t.includes("market") || t.includes("fundraiser") || t.includes("family")) buckets["Community"]++;
      else buckets["Other"]++;
    }
    return buckets;
  }, [weekEvents]);


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

  // stagger counter for left list
  let listAnimIndex = 0;

  const effectiveIsMobile = mounted ? isMobile : false;

  useEffect(() => {
    if (!effectiveIsMobile) return;
    const el = leftScrollRef.current;
    if (!el) return;
    const onScroll = () => setLeftScrolled(el.scrollTop > 8);
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll as any);
  }, [effectiveIsMobile]);

  const showLeft = true;

  // Desktop shows the split detail pane; mobile uses an overlay for details.
  const showRight = !effectiveIsMobile;

  // Right pane content helpers
  const selectedImg = selectedEvent ? pickImageUrl(selectedEvent) : null;
  const selectedDesc = selectedEvent ? pickDescriptionText(selectedEvent) : null;
  const selectedTime = selectedEvent
    ? (() => {
        const d = safeDateFromEvent(selectedEvent);
        return d ? formatTimeLabel(d) : "Time TBD";
      })()
    : null;

  const mobileDetailOpen =
    effectiveIsMobile && selectedKey !== WEEKLY_KEY && !!selectedEvent;

  function clearSelected() {
    setClientSelectedKey(null);
    setParam("event", null);
  }

  function openSelected(key: string) {
    setClientSelectedKey(key);
    setParam("event", key);
  }

  return (
    <div className="pageShell">
      <div className="tagline taglineDesktop">A calendar of events, specials, and pop-ups in Lancaster, PA.</div>
      <div className="split">
        {/* LEFT */}
        {showLeft ? (
          <aside className="pane paneLeft">
            <div className="scroll" ref={leftScrollRef}>
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
                    data-active={pathname?.startsWith("/locations") ? "true" : "false"}
                    onClick={() => router.push("/locations")}
                  >
                    Directory
                  </button>
                  <button
                    type="button"
                    className="tabBtn"
                    data-active={pathname?.startsWith("/updates") ? "true" : "false"}
                    onClick={() => router.push("/updates")}
                  >
                    Updates
                  </button>
                </div>

                <div className={"tagline taglineMobile" + (leftScrolled ? " isCollapsed" : "")}>
                  A calendar of events, specials, and pop-ups in Lancaster, PA.
                </div>

                <div className="leftControls">
                  <div className="searchRow">
                    <input
                      className="searchInput"

                    placeholder="Search events…"
                    value={q}
                    onChange={(e) => setParam("q", e.target.value)}
                  />
                    {effectiveIsMobile ? (
                      <button type="button" className="filtersBtn" onClick={() => setFiltersOpen(true)}>
                        Filters
                      </button>
                    ) : null}
                  </div>

                  {(q || type) ? (
                    <button
                      className="clearBtn"
                      onClick={() => {
                        setParam("q", null);
                        setParam("type", null);
                      }}
                      type="button"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>

                <div className={"typePills" + (effectiveIsMobile ? " mobileHidden" : "")} role="group" aria-label="Event type filters">
                  <button
                    type="button"
                    className="typePill"
                    data-active={!type ? "true" : "false"}
                    onClick={() => setParam("type", null)}
                  >
                    All
                  </button>
                  {eventTypes.map((t) => {
                    const on = norm(type) === norm(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        className="typePill"
                        data-active={on ? "true" : "false"}
                        onClick={() => setParam("type", on ? null : t)}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weekly Overview (left) */}
              <button
                type="button"
                className="weeklyOverview fadeInItem"
                style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}
                data-active={selectedKey === WEEKLY_KEY ? "true" : "false"}
                onClick={() => {
                  setClientSelectedKey(WEEKLY_KEY);
                  setParam("event", WEEKLY_KEY);
                  
                }}
              >
                <div className="weeklyTitle">Weekly Overview</div>
                <div className="weeklyCount">
                  {weekEventsCount} event{weekEventsCount === 1 ? "" : "s"} left
                  this week
                </div>
              </button>

              
              {effectiveIsMobile && selectedKey === WEEKLY_KEY ? (
                <div className="weeklyMobilePanel fadeInItem" style={{ animationDelay: "320ms" }}>
                  <div className="weekSummaryMini">
                    <div className="weekSummaryMiniTitle">Week of {weekLabel}</div>
                    <div className="weekSummaryMiniGrid" role="list">
                      <div className="weekSummaryMiniCard" role="listitem">
                        <div className="weekSummaryMiniKicker">Total</div>
                        <div className="weekSummaryMiniValue">{weekEventsCount}</div>
                      </div>
                      <div className="weekSummaryMiniCard" role="listitem">
                        <div className="weekSummaryMiniKicker">Live</div>
                        <div className="weekSummaryMiniValue">{weekInsights["Live music"]}</div>
                      </div>
                      <div className="weekSummaryMiniCard" role="listitem">
                        <div className="weekSummaryMiniKicker">Food</div>
                        <div className="weekSummaryMiniValue">{weekInsights["Food & drink"]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="weeklyCondensed" aria-label="Weekly overview (condensed)">
                    {weekGroups.map((g) => (
                      <div key={dayKey(g.date)}>
                        <div className="weeklyCondensedDayTitle">{formatDayHeading(g.date)}</div>

                        {g.items.map((e) => {
                          const title = e.title || "Untitled event";
                          const d = safeDateFromEvent(e);
                          const timeLabel = d ? formatTimeShort(d) : "Time TBD";

                          const venueBits = [e.locationName, e.event_type]
                            .filter(Boolean)
                            .join(" • ");

                          return (
                            <button
                              key={e.id}
                              type="button"
                              className="weeklyCondRow"
                              onClick={() => {
                                const key = e.uid ?? e.id;
                                setClientSelectedKey(key);
                                setParam("event", key);
                              }}
                            >
                              <div className="weeklyCondTop">
                                <div className="weeklyCondTime">{timeLabel}</div>
                                <div className="weeklyCondTitle">{title}</div>
                              </div>
                              {venueBits ? (
                                <div className="weeklyCondMeta">{venueBits}</div>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

{leftDayGroups.length === 0 ? (
                <div className="emptyList">No events match your search.</div>
              ) : null}

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
                          const key = e.uid ?? e.id;
                          setClientSelectedKey(key);
                          setParam("event", key);
                          
                        }}
                        type="button"
                      >
                        <div className="eventRowTitle">{title}</div>
                        <div className="eventRowMeta">
                          <span>{timeLabel}</span>
                          {e.event_type ? <span className="dot">•</span> : null}
                          {e.event_type ? <span>{e.event_type}</span> : null}
                        </div>
                        {(() => {
                          const raw =
                            (e.summary ?? "") || (pickDescriptionText(e) ?? "");
                          const s = (raw || "").trim();
                          if (!s) return null;
                          return (
                            <div className="eventRowDesc">
                              {s.length > 180 ? `${s.slice(0, 180).trim()}…` : s}
                            </div>
                          );
                        })()}

                      </button>
                    );
                  })}
                </section>
              ))}

            </div>
          </aside>
        ) : null}

        {/* RIGHT */}
        {showRight ? (
          <main className="pane paneRight">
            <div className="scroll">

              {selectedKey === WEEKLY_KEY ? (
                <div className="rightHeader">
                  <div
                    className="rightDayLabel fadeInItem"
                    style={{ animationDelay: "260ms" }}
                  >
                    Weekly Overview
                  </div>

                  <div className="weekSummary fadeInItem" style={{ animationDelay: "320ms" }}>
                    <h3 className="weekSummaryTitle">Week of {weekLabel}</h3>
                    <p className="weekSummarySubhead">
                      A quick snapshot of what&apos;s happening on the calendar this week.
                    </p>

                    <div className="weekSummaryGrid" role="list">
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Total events</div>
                        <div className="weekSummaryValue">{weekEventsCount}</div>
                      </div>
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Live music</div>
                        <div className="weekSummaryValue">{weekInsights["Live music"]}</div>
                      </div>
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Food &amp; drink</div>
                        <div className="weekSummaryValue">{weekInsights["Food & drink"]}</div>
                      </div>
                    </div>
                  </div>


                  {weekEventsCount === 0 ? (
                    <div className="emptyRight">No events scheduled for the rest of this week.</div>
                  ) : effectiveIsMobile ? (
                    <div
                      className="weeklyCondensed fadeInItem"
                      style={{ animationDelay: "380ms" }}
                      aria-label="Weekly overview (condensed)"
                    >
                      {weekGroups.map((g) => (
                        <div key={dayKey(g.date)}>
                          <div className="weeklyCondensedDayTitle">{formatDayHeading(g.date)}</div>

                          {g.items.map((e) => {
                            const title = e.title || "Untitled event";
                            const d = safeDateFromEvent(e);
                            const timeLabel = d ? formatTimeShort(d) : "Time TBD";

                            const venueBits = [e.locationName, e.event_type]
                              .filter(Boolean)
                              .join(" • ");

                            return (
                              <button
                                key={e.id}
                                type="button"
                                className="weeklyCondRow"
                                onClick={() => {
                                  const key = e.uid ?? e.id;
                                  setClientSelectedKey(key);
                                  setParam("event", key);
                                  
                                }}
                              >
                                <div className="weeklyCondTop">
                                  <div className="weeklyCondTime">{timeLabel}</div>
                                  <div className="weeklyCondTitle">{title}</div>
                                </div>
                                {venueBits ? (
                                  <div className="weeklyCondMeta">{venueBits}</div>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="weeklyCards fadeInItem" style={{ animationDelay: "380ms" }}>
                      {weekGroups.map((g) => (
                        <div key={dayKey(g.date)} className="weeklyDayGroup">
                          <div className="dayTitle">{formatDayHeading(g.date)}</div>

                          {g.items.map((e) => {
                            const title = e.title || "Untitled event";
                            const d = safeDateFromEvent(e);
                            const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                            const img = pickImageUrl(e);

                            return (
                              <button
                                key={e.id}
                                type="button"
                                className="weeklyCard weeklyCardSelectable"
                                onClick={() => {
                                  const key = e.uid ?? e.id;
                                  setClientSelectedKey(key);
                                  setParam("event", key);
                                  
                                }}
                              >
                                <div className="weeklyCardMedia">
                                  {img ? (
                                    <div className="media16x9">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img className="weeklyThumb" src={img} alt="" />
                                      {e.descriptionText ? (
                                        <div className="mediaDescBtn">{String(e.descriptionText).slice(0, 110)}</div>
                                      ) : null}
                                    </div>
                                  ) : (
                                    <div className="media16x9 weeklyThumbPlaceholder" aria-hidden />
                                  )}
                                </div>

                                <div className="weeklyCardContent">
                                  <div className="weeklyCardTop">
                                    <div className="weeklyCardTitleWrap">
                                      <div className="weeklyCardTitle">{title}</div>
                                      <div className="weeklyCardTime">{timeLabel}</div>
                                    </div>

                                    {e.tickets_url || e.website_url ? (
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
                <div className="rightHeader">
                  <div
                    className="rightDayLabel fadeInItem"
                    style={{ animationDelay: "260ms" }}
                  >
                    {selectedEvent.event_type || "Event"}
                  </div>

                  <h1 className="detailTitle fadeInItem" style={{ animationDelay: "320ms" }}>
                    {selectedEvent.title || "Untitled event"}
                  </h1>

                  <div className="detailMeta fadeInItem" style={{ animationDelay: "360ms" }}>
                    <span>{selectedTime}</span>
                    {selectedEvent.locationName ? (
                      <>
                        <span className="dot">•</span>
                        <span className="venue">{selectedEvent.locationName}</span>
                      </>
                    ) : null}
                    {selectedEvent.address ? (
                      <>
                        <span className="dot">•</span>
                        <span className="muted">{selectedEvent.address}</span>
                      </>
                    ) : null}
                  </div>

                  {/* Always render heroImage for placeholder behavior */}
                  <div
                    className="heroImage"
                    style={selectedImg ? { backgroundImage: `url(${selectedImg})` } : undefined}
                  />

                  {selectedEvent.summary ? <p className="summary">{selectedEvent.summary}</p> : null}

                  {selectedDesc ? <div className="detailBody">{selectedDesc}</div> : null}

                  {(selectedEvent.website_url || selectedEvent.tickets_url) ? (
                    <div className="ctaRow">
                      <a
                        className="ctaBtn"
                        data-disabled={selectedEvent.website_url ? "false" : "true"}
                        href={selectedEvent.website_url || "#"}
                        target={selectedEvent.website_url ? "_blank" : undefined}
                        rel={selectedEvent.website_url ? "noreferrer" : undefined}
                        onClick={(ev) => {
                          if (!selectedEvent.website_url) ev.preventDefault();
                        }}
                      >
                        Website
                      </a>

                      <a
                        className="ctaBtn"
                        data-disabled={selectedEvent.tickets_url ? "false" : "true"}
                        href={selectedEvent.tickets_url || "#"}
                        target={selectedEvent.tickets_url ? "_blank" : undefined}
                        rel={selectedEvent.tickets_url ? "noreferrer" : undefined}
                        onClick={(ev) => {
                          if (!selectedEvent.tickets_url) ev.preventDefault();
                        }}
                      >
                        Tickets
                      </a>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </main>
        ) : null}
      </div>

      {/* Mobile bottom tabs */}
      {effectiveIsMobile ? (
        <div className="mobileTabs" aria-label="Primary navigation">
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
            data-active={pathname?.startsWith("/locations") ? "true" : "false"}
            onClick={() => router.push("/locations")}
          >
            Directory
          </button>
          <button
            type="button"
            className="tabBtn"
            data-active={pathname?.startsWith("/updates") ? "true" : "false"}
            onClick={() => router.push("/updates")}
          >
            Updates
          </button>
        </div>
      ) : null}
    
      {/* Mobile detail overlay (matches Directory/Updates behavior) */}
      <div
        className="mobileDetail"
        data-open={mobileDetailOpen ? "true" : "false"}
        aria-hidden={!mobileDetailOpen}
      >
        <div className="mobileDetailHeader">
          <button className="backBtn" type="button" onClick={clearSelected}>
            Back
          </button>
          <div className="mobileDetailTitle">Event</div>
        </div>
        <div className="scroll" style={{ padding: "0 16px 84px 16px" }}>
          {selectedEvent ? (
            <div className="detailCard">
              <div className="detailTitle">{selectedEvent.title ?? selectedEvent.summary ?? "Untitled event"}</div>
              <div className="detailMeta">
                <span className="muted">{selectedTime ?? "Time TBD"}</span>
                {selectedEvent.event_type ? <span className="badge">{selectedEvent.event_type}</span> : null}
              </div>
              {selectedImg ? (
                <div className="media16x9" style={{ marginTop: 14 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedImg} alt="" />
                  {selectedDesc ? <div className="mediaDescBtn">{selectedDesc.slice(0, 120)}</div> : null}
                </div>
              ) : null}
              {selectedDesc ? (
                <div className="detailBody" style={{ marginTop: 14 }}>
                  <p>{selectedDesc}</p>
                </div>
              ) : (
                <div className="detailBody" style={{ marginTop: 14 }}>
                  <p className="muted">No description yet.</p>
                </div>
              )}
              {selectedEvent.website_url ? (
                <p style={{ marginTop: 12 }}>
                  <a className="link" href={selectedEvent.website_url} target="_blank" rel="noreferrer">
                    Website
                  </a>
                </p>
              ) : null}
              {selectedEvent.tickets_url ? (
                <p style={{ marginTop: 8 }}>
                  <a className="link" href={selectedEvent.tickets_url} target="_blank" rel="noreferrer">
                    Tickets
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

</div>
  );

                {effectiveIsMobile && filtersOpen ? (
                  <div className="filtersOverlay" role="dialog" aria-modal="true">
                    <div className="filtersPanel">
                      <div className="filtersPanelHeader">
                        <div className="filtersPanelTitle">Filters</div>
                        <button type="button" className="filtersClose" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
                          ×
                        </button>
                      </div>

                      <div className="typePills" role="group" aria-label="Event type filters">
                        <button
                          type="button"
                          className="pill"
                          data-active={!type ? "true" : "false"}
                          onClick={() => {
                            setParam("type", null);
                            setFiltersOpen(false);
                          }}
                        >
                          All
                        </button>
                        {EVENT_TYPE_CANDIDATES.filter((t) => t !== WEEKLY_KEY).map((t) => (
                          <button
                            key={t}
                            type="button"
                            className="pill"
                            data-active={norm(type) === norm(t) ? "true" : "false"}
                            onClick={() => {
                              setParam("type", t);
                              setFiltersOpen(false);
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
}