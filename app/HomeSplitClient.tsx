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

  // Some builds normalize this already
  imageUrl?: string | null;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickImageUrl(e: any): string | null {
  if (!e) return null;
  if (typeof e.imageUrl === "string" && e.imageUrl) return e.imageUrl;

  const img = e.image;
  if (!img) return null;

  if (typeof img.url === "string" && img.url) return img.url;

  const square = img.Square || img.square;
  if (square?.url) return square.url;

  const thumbs = img.thumbnails || img.variants;
  if (thumbs?.Square?.url) return thumbs.Square.url;
  if (thumbs?.square?.url) return thumbs.square.url;

  return null;
}

function pickDescriptionText(e: EventLite): string | null {
  if (e.descriptionText) return e.descriptionText;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d: any = (e as any).description;
  if (!d) return null;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) {
    const parts = d
      .map((b) => (typeof b?.text === "string" ? b.text : ""))
      .filter(Boolean);
    return parts.length ? parts.join("\n\n") : null;
  }
  return null;
}

export default function HomeSplitClient({ events }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const q = sp.get("q") || "";
  const type = sp.get("type") || "";

  const selectedParam = sp.get("event");
  const selectedKey = selectedParam ?? WEEKLY_KEY;

  const [overlayOpen, setOverlayOpen] = useState(false);

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
      if (e.key === "Escape") setOverlayOpen(false);
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
          d && d.getTime() >= start.getTime() && d.getTime() <= end.getTime()
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

  const showLeft = !isMobile || mobileTab === "list";
  const showRight = !isMobile || mobileTab === "detail";

  const selectedEventDayLabel = useMemo(() => {
    if (!selectedEvent) return null;
    const d = safeDateFromEvent(selectedEvent);
    return d ? formatDayHeading(d) : null;
  }, [selectedEvent]);

  return (
    <div className="pageShell">
      <div className="split">
        {showLeft ? (
          <aside className="pane paneLeft">
            <div className="scroll">
              <div className="leftControls">
                <input
                  className="searchInput"
                  placeholder="Search events…"
                  value={q}
                  onChange={(e) => setParam("q", e.target.value)}
                />

                <button
                  className="filterBtn"
                  type="button"
                  onClick={() => setOverlayOpen(true)}
                >
                  Filter
                </button>

                {(q || type) ? (
                  <button
                    className="clearBtn"
                    type="button"
                    onClick={() => {
                      setParam("q", null);
                      setParam("type", null);
                    }}
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              <div className="leftOverlay" data-open={overlayOpen ? "true" : "false"}>
                <div className="leftOverlayHeader">
                  <div className="leftOverlayTitle">Filter</div>
                  <button
                    className="overlayClose"
                    type="button"
                    aria-label="Close filters"
                    onClick={() => setOverlayOpen(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="filterGrid">
                  {eventTypes.map((t) => {
                    const on = norm(type) === norm(t);
                    return (
                      <button
                        key={t}
                        className="pillBtn"
                        data-active={on ? "true" : "false"}
                        type="button"
                        onClick={() => {
                          setParam("type", t);
                          setOverlayOpen(false);
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: 14 }}>
                  <button
                    className="pillBtn pillBtnSecondary"
                    type="button"
                    onClick={() => {
                      setParam("type", null);
                      setOverlayOpen(false);
                    }}
                  >
                    Clear filter
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="weeklyOverview"
                data-active={selectedKey === WEEKLY_KEY ? "true" : "false"}
                onClick={() => {
                  setParam("event", WEEKLY_KEY);
                  goDetailMobile();
                }}
              >
                <div className="weeklyTitle">Weekly Overview</div>
                <div className="weeklyCount">
                  {weekEventsCount} event{weekEventsCount === 1 ? "" : "s"} left this week
                </div>
              </button>

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
                        className="eventRow"
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

              {leftDayGroups.length === 0 ? (
                <div className="emptyList">No events found.</div>
              ) : null}
            </div>
          </aside>
        ) : null}

        {showRight ? (
          <main className="pane paneRight">
            <div className="scroll">
              {selectedKey === WEEKLY_KEY ? (
                <div className="rightHeader">
                  <div className="rightDayLabel">Weekly Overview</div>
                  <div className="detailTitle">This Week</div>

                  <div className="detailMeta">
                    <span className="muted">
                      {weeklyRange.start.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                      {" — "}
                      {weeklyRange.end.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="muted">•</span>
                    <span className="muted">
                      {weekEventsCount} event{weekEventsCount === 1 ? "" : "s"} left
                    </span>
                  </div>

                  {weekEventsCount === 0 ? (
                    <div className="emptyRight">No events scheduled for the rest of this week.</div>
                  ) : (
                    <div className="weeklyCards">
                      {weekGroups.map((g) => (
                        <div key={dayKey(g.date)}>
                          <div className="weeklyDayTitle">{formatDayHeading(g.date)}</div>

                          {g.items.map((e) => {
                            const title = e.title || "Untitled event";
                            const d = safeDateFromEvent(e);
                            const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                            const imgUrl = pickImageUrl(e);
                            const desc = e.summary || pickDescriptionText(e);

                            return (
                              <button
                                key={e.id}
                                type="button"
                                className="weeklyCard weeklyCardSelectable"
                                onClick={() => {
                                  if (e.uid) setParam("event", e.uid);
                                  else setParam("event", e.id);
                                  if (isMobile) setMobileTab("detail");
                                }}
                              >
                                <div className="weeklyCardMedia">
                                  {imgUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img className="weeklyThumb" src={imgUrl} alt="" />
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

                                  {desc ? <div className="weeklyCardDesc">{desc}</div> : null}
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
                  {selectedEventDayLabel ? (
                    <div className="rightDayLabel">{selectedEventDayLabel}</div>
                  ) : null}

                  <div className="detailTitle">{selectedEvent.title || "Untitled event"}</div>

                  <div className="detailMeta">
                    <span className="muted">
                      {(() => {
                        const d = safeDateFromEvent(selectedEvent);
                        return d ? formatTimeLabel(d) : "Time TBD";
                      })()}
                    </span>

                    {selectedEvent.locationName ? (
                      <>
                        <span className="muted">•</span>
                        <span className="venue">{selectedEvent.locationName}</span>
                      </>
                    ) : null}
                  </div>

                  {(() => {
                    const imgUrl = pickImageUrl(selectedEvent);
                    return imgUrl ? (
                      <div className="heroImage" style={{ backgroundImage: `url(${imgUrl})` }} />
                    ) : null;
                  })()}

                  {selectedEvent.summary ? (
                    <p className="summary">{selectedEvent.summary}</p>
                  ) : null}

                  {(() => {
                    const desc = pickDescriptionText(selectedEvent);
                    return desc ? <div className="detailBody">{desc}</div> : null;
                  })()}

                  {(selectedEvent.website_url || selectedEvent.tickets_url) ? (
                    <div className="ctaRow">
                      {selectedEvent.website_url ? (
                        <a
                          className="ctaBtn"
                          href={selectedEvent.website_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Website
                        </a>
                      ) : null}

                      {selectedEvent.tickets_url ? (
                        <a
                          className="ctaBtn"
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
