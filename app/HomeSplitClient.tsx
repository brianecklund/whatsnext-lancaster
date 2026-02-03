"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import type { EventLite } from "@/lib/types";

function safeParseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  // Prismic Date can be YYYY-MM-DD. Timestamp can be ISO.
  try {
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return parseISO(value + "T00:00:00");
    }
    return parseISO(value);
  } catch {
    return null;
  }
}

function dayLabel(dateKey: string) {
  const dayDate = safeParseDate(dateKey);
  if (!dayDate) return dateKey;
  const label = isToday(dayDate)
    ? "Today"
    : isTomorrow(dayDate)
    ? "Tomorrow"
    : format(dayDate, "EEEE");
  return `${label}, ${format(dayDate, "MMM d")}`;
}

export default function HomeSplitClient({ events }: { events: EventLite[] }) {
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
      const d = safeParseDate(e.start_datetime);
      if (!d) continue;
      const key = format(d, "yyyy-MM-dd");
      const cur = map.get(key) ?? [];
      cur.push(e);
      map.set(key, cur);
    }

    const keys = Array.from(map.keys()).sort();
    return keys.map((k) => {
      const list = map.get(k) ?? [];
      list.sort((a, b) => {
        const ad = a.start_datetime ? safeParseDate(a.start_datetime)?.getTime() ?? 0 : 0;
        const bd = b.start_datetime ? safeParseDate(b.start_datetime)?.getTime() ?? 0 : 0;
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
              <div className="tabs" aria-label="Primary navigation">
                <a className="tabBtn" href="/" aria-current="page">Calendar</a>
                <a className="tabBtn" href="/locations">Directory</a>
                <a className="tabBtn" href="/updates">Updates</a>
              </div>
            </div>

            {grouped.length === 0 ? (
              <div className="emptyList">No upcoming events yet.</div>
            ) : (
              grouped.map(({ key, events: dayEvents }, idx) => (
                <section
                  key={key}
                  className="dayBlock"
                  style={{ borderTop: idx === 0 ? "0" : undefined }}
                >
                  <div className="dayTitle">
                    <span className="dayTitleText">{dayLabel(key)}</span>
                  </div>

                  {dayEvents.map((e) => {
                    const active = selectedEventKey
                      ? selectedEventKey === e.key
                      : selectedEventDesktop?.key === e.key;

                    return (
                      <button
                        key={e.id}
                        className="eventRow"
                        data-active={active ? "true" : "false"}
                        onClick={() => setSelectedEvent(e.key)}
                        type="button"
                      >
                        <span className="eventRowTitle">{e.title ?? "Untitled event"}</span>

                        <span className="eventRowMeta">
                          {formatEventTime(e)}
                          {e.location?.name ? <span className="dot">•</span> : null}
                          {e.location?.name ? <span>{e.location.name}</span> : null}
                        </span>
                      </button>
                    );
                  })}
                </section>
              ))
            )}
          </div>
        </div>

        {/* RIGHT (desktop) */}
        <div className="pane paneRight">
          <div className="scroll">
            {!selectedEventDesktop ? (
              <div className="emptyRight">Select an event to see details.</div>
            ) : (
              <EventDetail event={selectedEventDesktop} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <div className="mobileTabs" aria-label="Primary navigation">
        <a className="tabBtn" href="/" aria-current="page">Calendar</a>
        <a className="tabBtn" href="/locations">Directory</a>
        <a className="tabBtn" href="/updates">Updates</a>
      </div>

      {/* Mobile detail overlay */}
      <div
        className="mobileDetail"
        data-open={mobileDetailOpen ? "true" : "false"}
        aria-hidden={!mobileDetailOpen}
      >
        <div className="mobileDetailHeader">
          <button className="backBtn" type="button" onClick={clearSelectedEvent}>
            Back
          </button>
          <div className="mobileDetailTitle">Event</div>
        </div>
        <div className="scroll" style={{ padding: "0 16px 24px 16px" }}>
          {selectedEventMobile ? <EventDetail event={selectedEventMobile} /> : null}
        </div>
      </div>
    </div>
  );
}

function formatEventTime(event: EventLite): string {
  const start = safeParseDate(event.start_datetime);
  const end = safeParseDate(event.end_datetime);

  // Date-only events (no time) or explicitly all-day
  const hasTime = Boolean(event.start_datetime && !/^\d{4}-\d{2}-\d{2}$/.test(event.start_datetime));
  const allDay = Boolean(event.all_day) || !hasTime;

  if (allDay) return "All day";

  if (start && end) {
    const s = format(start, "h:mma").toLowerCase();
    const e = format(end, "h:mma").toLowerCase();
    return `${s} – ${e}`;
  }

  if (start) return format(start, "h:mma").toLowerCase();

  return "";
}

function EventDetail({ event }: { event: EventLite }) {
  const start = safeParseDate(event.start_datetime);
  const dayStr = start ? format(start, "EEEE, MMMM do") : "";

  const timeStr = formatEventTime(event);

  const status = event.status && event.status !== "Scheduled" ? event.status : null;

  const websiteHref = event.website_url || null;
  const ticketsHref = event.tickets_url || null;

  return (
    <div>
      <div className="rightHeader">
        {dayStr ? <div className="rightDayLabel">{dayStr}</div> : null}

        <h1 className="detailTitle">{event.title ?? "Event"}</h1>

        <div className="detailMeta">
          <span className="venue">{event.location?.name ?? "Unknown location"}</span>
          {timeStr ? <span className="muted">{timeStr}</span> : null}
        </div>

        <div className="detailChips" aria-label="Event highlights">
          {event.event_type ? <span className="pill">{event.event_type}</span> : null}
          {event.cost ? <span className="pill">{event.cost}</span> : null}
          {event.age_restriction ? <span className="pill">{event.age_restriction}</span> : null}
          {status ? <span className="pill pillWarn">{status}</span> : null}
          {Array.isArray(event.tags)
            ? event.tags.slice(0, 4).map((t) => (
                <span key={t} className="pill pillSoft">
                  {t}
                </span>
              ))
            : null}
        </div>
      </div>

      <div
        className="heroImage"
        style={
          event.image_url
            ? { backgroundImage: `url(${event.image_url})` }
            : undefined
        }
        aria-hidden="true"
      />

      {event.summary ? <p className="summary">{event.summary}</p> : null}

      <div className="detailBody">
        {event.description ? event.description : "No description added yet."}
      </div>

      <div className="ctaRow">
        <a
          className="ctaBtn"
          data-disabled={!websiteHref ? "true" : "false"}
          href={websiteHref ?? undefined}
          target={websiteHref ? "_blank" : undefined}
          rel={websiteHref ? "noreferrer" : undefined}
          aria-disabled={!websiteHref}
          onClick={(e) => {
            if (!websiteHref) e.preventDefault();
          }}
        >
          Website
        </a>

        <a
          className="ctaBtn"
          data-disabled={!ticketsHref ? "true" : "false"}
          href={ticketsHref ?? undefined}
          target={ticketsHref ? "_blank" : undefined}
          rel={ticketsHref ? "noreferrer" : undefined}
          aria-disabled={!ticketsHref}
          onClick={(e) => {
            if (!ticketsHref) e.preventDefault();
          }}
        >
          Tickets
        </a>
      </div>

      {event.location?.address ? (
        <div className="finePrint">
          <span className="label">Address</span>
          <span>{event.location.address}</span>
        </div>
      ) : null}

      {event.location?.website ? (
        <div className="finePrint">
          <span className="label">Venue site</span>
          <a href={event.location.website} target="_blank" rel="noreferrer">
            {event.location.website}
          </a>
        </div>
      ) : null}
    </div>
  );
}
