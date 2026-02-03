"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import type { EventLite } from "@/lib/types";
import { prismic } from "@/prismicio";

export default function HomeSplitClient({
  events
}: {
  events: EventLite[];
  allTypes: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedEventKey = searchParams.get("event");

  function navigate(params: URLSearchParams) {
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/");
  }

  function setSelectedEvent(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("event", key);
    navigate(params);
  }

  function clearSelectedEvent() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("event");
    navigate(params);
  }

  const grouped = useMemo(() => {
    const map = new Map<string, EventLite[]>();
    for (const e of events) {
      if (!e.start_datetime) continue;
      const d = parseISO(e.start_datetime);
      const key = format(d, "yyyy-MM-dd");
      const cur = map.get(key) ?? [];
      cur.push(e);
      map.set(key, cur);
    }
    const keys = Array.from(map.keys()).sort();
    return keys.map((k) => {
      const list = map.get(k) ?? [];
      list.sort((a, b) => {
        const ad = a.start_datetime ? parseISO(a.start_datetime).getTime() : 0;
        const bd = b.start_datetime ? parseISO(b.start_datetime).getTime() : 0;
        return ad - bd;
      });
      return { key: k, events: list };
    });
  }, [events]);

  const selectedEventDesktop = useMemo(() => {
    if (!events.length) return null;
    if (!selectedEventKey) return events[0];
    return events.find((e) => e.key === selectedEventKey) ?? events[0];
  }, [events, selectedEventKey]);

  const selectedEventMobile = useMemo(() => {
    if (!selectedEventKey) return null;
    return events.find((e) => e.key === selectedEventKey) ?? null;
  }, [events, selectedEventKey]);

  const mobileDetailOpen = Boolean(selectedEventKey);

  function dayLabel(dateKey: string) {
    const dayDate = parseISO(dateKey);
    const label = isToday(dayDate)
      ? "Today"
      : isTomorrow(dayDate)
      ? "Tomorrow"
      : format(dayDate, "EEEE");
    return `${label}, ${format(dayDate, "MMM d")}`;
  }

  return (
    <div className="pageShell">
      <div className="tagline">
        A shared calendar for local events, specials, and pop-ups in Lancaster, PA.
      </div>

      <div className="split">
        {/* LEFT */}
        <div className="pane">
          <div className="scroll">
            <div className="leftSticky">
              <div className="tabs">
                <a className="tabBtn" href="/" role="button">Calendar</a>
                <a className="tabBtn" href="/locations" role="button">Directory</a>
                <a className="tabBtn" href="/updates" role="button">Updates</a>
              </div>
            </div>

            {grouped.map(({ key, events: dayEvents }, idx) => (
              <section key={key} className="dayBlock" style={{ borderTop: idx === 0 ? "0" : undefined }}>
                <div className="dayTitle">
                  <span>{dayLabel(key)}</span>
                </div>

                {dayEvents.map((e) => {
                  const active = selectedEventKey ? selectedEventKey === e.key : selectedEventDesktop?.key === e.key;
                  return (
                    <div
                      key={e.id}
                      className="eventRow"
                      data-active={active ? "true" : "false"}
                      onClick={() => setSelectedEvent(e.key)}
                      role="button"
                      tabIndex={0}
                    >
                      {e.title ?? "Untitled event"}
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>

        {/* RIGHT (desktop) */}
        <div className="pane paneRight">
          <div className="scroll">
            {!selectedEventDesktop ? (
              <div style={{ paddingTop: 24, color: "var(--muted)" }}>No events found.</div>
            ) : (
              <EventDetail event={selectedEventDesktop} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <div className="mobileTabs" aria-label="Primary navigation">
        <a className="tabBtn" href="/" role="button">Calendar</a>
        <a className="tabBtn" href="/locations" role="button">Directory</a>
        <a className="tabBtn" href="/updates" role="button">Updates</a>
      </div>

      {/* Mobile detail overlay */}
      <div className="mobileDetail" data-open={mobileDetailOpen ? "true" : "false"} aria-hidden={!mobileDetailOpen}>
        <div className="mobileDetailHeader">
          <button className="backBtn" type="button" onClick={clearSelectedEvent}>
            Back
          </button>
          <div style={{ fontWeight: 900 }}>Event</div>
        </div>
        <div className="scroll" style={{ padding: "0 16px 24px 16px" }}>
          {selectedEventMobile ? <EventDetail event={selectedEventMobile} /> : null}
        </div>
      </div>
    </div>
  );
}

function EventDetail({ event }: { event: EventLite }) {
  const start = event.start_datetime ? parseISO(event.start_datetime) : null;
  const end = event.end_datetime ? parseISO(event.end_datetime) : null;

  const dayStr = start ? format(start, "EEEE, MMMM do") : "";
  const timeStr =
    start && end ? `${format(start, "h:mma").toLowerCase()} – ${format(end, "h:mma").toLowerCase()}` : start ? format(start, "h:mma").toLowerCase() : "";

  const websiteHref = event.location?.website ? (event.location.website as string) : null;

  return (
    <div>
      <div className="rightHeader">
        {dayStr ? <div className="rightDayLabel">{dayStr}</div> : null}

        <h1 className="detailTitle">{event.title ?? "Event"}</h1>

        <div className="detailMeta">
          <span>{event.location?.name ?? "Unknown location"}</span>
          {timeStr ? <span className="muted">{timeStr}</span> : null}
        </div>
      </div>

      <div className="heroImage" aria-hidden="true" />

      <div className="detailBody">
        {event.description ? event.description : "No description added yet."}
      </div>

      <div className="ctaRow">
        {websiteHref ? (
          <a className="ctaBtn" href={websiteHref} target="_blank" rel="noreferrer">
            Website
          </a>
        ) : (
          <span className="ctaBtn" aria-disabled="true">
            Website
          </span>
        )}

        <span className="ctaBtn" aria-disabled="true">
          Tickets
        </span>
      </div>
    </div>
  );
}
