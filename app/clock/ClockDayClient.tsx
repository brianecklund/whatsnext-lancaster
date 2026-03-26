"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { EventLite } from "@/lib/types";
import { dayKey, safeDateFromEvent, startOfDay, startOfToday } from "@/lib/calendar";
import MediaBlocks from "@/app/components/MediaBlocks";

type Props = {
  events: EventLite[];
};

function parseDayKey(ymd: string): Date | null {
  if (!ymd) return null;
  const d = new Date(`${ymd}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDayHeading(d: Date): string {
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

function formatTimeShort(d: Date): string {
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function formatUntil(from: Date, to: Date): string {
  const deltaMs = to.getTime() - from.getTime();
  const totalMinutes = Math.round(deltaMs / 60000);
  const abs = Math.abs(totalMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;

  if (totalMinutes < 0) {
    if (h > 0) return `${h}h ${m}m ago`;
    return `${m}m ago`;
  }

  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function dialAngleForEvent(d: Date) {
  const hour24 = d.getHours();
  const minute = d.getMinutes();
  const isPM = hour24 >= 12;
  const hourDial = (hour24 % 12) || 12;

  // Map 12-hour dial position with minutes: 12 -> 0deg, 3 -> 90deg, 6 -> 180deg ...
  const progress = (hourDial + minute / 60) / 12;
  const angleDeg = progress * 360 - 90; // -90 so 12:00 is at the top
  return { angleDeg, isPM };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ClockDayClient({ events }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const dayParam = sp.get("day") ?? "";
  const eventParam = sp.get("event") ?? "";

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    // Smooth real-time movement for all hands and inward-moving dots.
    const id = window.setInterval(() => setNow(new Date()), 250);
    return () => window.clearInterval(id);
  }, []);

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const selectedDayDate = useMemo(() => {
    const parsed = parseDayKey(dayParam);
    if (parsed) return parsed;

    if (eventParam) {
      const match = events.find((e) => (e.uid ?? e.id) === eventParam);
      const d = match ? safeDateFromEvent(match) : null;
      if (d) return d;
    }

    return startOfToday();
  }, [dayParam, eventParam, events]);

  const selectedDayStr = dayKey(selectedDayDate);

  const selectedDayStart = useMemo(() => startOfDay(selectedDayDate), [selectedDayDate]);
  const selectedDayEnd = useMemo(() => {
    const d = new Date(selectedDayStart);
    d.setDate(d.getDate() + 1);
    return d;
  }, [selectedDayStart]);

  const dayEvents = useMemo(() => {
    const list = events
      .map((e) => ({ e, d: safeDateFromEvent(e) }))
      .filter((x): x is { e: EventLite; d: Date } => !!x.d)
      .filter(({ d }) => dayKey(d) === selectedDayStr)
      .sort((a, b) => a.d.getTime() - b.d.getTime());

    return list;
  }, [events, selectedDayStr]);

  const hoveredEvent = useMemo(() => {
    if (!hoveredKey) return null;
    return dayEvents.find(({ e }) => (e.uid ?? e.id) === hoveredKey) ?? null;
  }, [hoveredKey, dayEvents]);

  const hoverLabel = useMemo(() => {
    if (!hoveredEvent?.d) return null;
    return formatUntil(now, hoveredEvent.d);
  }, [hoveredEvent, now]);

  const dayOptions = useMemo(() => {
    const base = startOfToday();
    const opts: Array<{ key: string; date: Date }> = [];
    for (let i = 0; i < 21; i++) {
      const d = new Date(base);
      d.setDate(d.getDate() + i);
      opts.push({ key: dayKey(d), date: d });
    }
    return opts;
  }, []);

  const eventsCountByDay = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of events) {
      const d = safeDateFromEvent(e);
      if (!d) continue;
      const k = dayKey(d);
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return m;
  }, [events]);

  const faceRef = useRef<HTMLDivElement | null>(null);
  const [facePx, setFacePx] = useState(360);

  useEffect(() => {
    if (!faceRef.current) return;
    if (typeof ResizeObserver === "undefined") return;

    const el = faceRef.current;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      if (!w) return;
      setFacePx(clamp(Math.round(w), 240, 420));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const center = facePx / 2;
  const dotMinR = center * 0.22; // close to center
  const dotMaxR = center * 0.82; // near outer ring
  const tickR = center * 0.90;

  const ms = now.getMilliseconds();
  const second = now.getSeconds() + ms / 1000;
  const minute = now.getMinutes() + second / 60;
  const hour = (now.getHours() % 12) + minute / 60;

  const secondAngle = second * 6; // 360/60
  const minuteAngle = minute * 6; // 360/60
  const hourAngle = hour * 30; // 360/12

  return (
    <main className="contentPage clockPage">
      <header className="clockHeader">
        <h1 className="clockTitle">Calendar Clock</h1>
        <p className="clockSubhead">{formatDayHeading(selectedDayDate)}</p>
      </header>

      <nav className="clockDayRail" aria-label="Pick a day">
        {dayOptions.map((opt) => {
          const active = opt.key === selectedDayStr;
          const count = eventsCountByDay.get(opt.key) ?? 0;
          return (
            <button
              key={opt.key}
              type="button"
              className="clockDayBtn"
              data-active={active ? "true" : "false"}
              onClick={() => {
                router.push(`/clock?day=${encodeURIComponent(opt.key)}`);
                setHoveredKey(null);
              }}
            >
              <span className="clockDayBtnLabel">{opt.date.toLocaleDateString(undefined, { weekday: "short" })}</span>
              <span className="clockDayBtnCount" aria-hidden>
                {count ? count : ""}
              </span>
            </button>
          );
        })}
      </nav>

      <section className="clockLayout" aria-label="Analog clock with event markers">
        <div className="clockFaceWrap">
          <div ref={faceRef} className="clockFace">
            {/* Tick marks */}
            {Array.from({ length: 12 }, (_, i) => {
              const angleDeg = i * 30;
              const x = center;
              const y = center;
              return (
                <div
                  key={i}
                  className="clockTick"
                  style={{
                    left: x,
                    top: y,
                    transform: `translate(-50%,-50%) rotate(${angleDeg}deg) translateY(-${tickR}px)`,
                    height: i % 3 === 0 ? 18 : 14,
                  }}
                  aria-hidden="true"
                />
              );
            })}

            {/* Hands */}
            <div
              className="clockHand clockHand--second"
              style={{ transform: `translate(-50%,-100%) rotate(${secondAngle}deg)` }}
              aria-hidden="true"
            />
            <div
              className="clockHand clockHand--hour"
              style={{ transform: `translate(-50%,-100%) rotate(${hourAngle}deg)` }}
              aria-hidden="true"
            />
            <div
              className="clockHand clockHand--minute"
              style={{ transform: `translate(-50%,-100%) rotate(${minuteAngle}deg)` }}
              aria-hidden="true"
            />
            <div className="clockCenterDot" aria-hidden="true" />

            {/* Hover label */}
            {hoverLabel ? (
              <div className="clockHoverLabel" aria-live="polite">
                {hoverLabel}
              </div>
            ) : (
              <div className="clockHoverLabel clockHoverLabel--muted" aria-hidden="true">
                Hover an event to see time until
              </div>
            )}

            {/* Event markers */}
            {dayEvents.map(({ e, d }, idx) => {
              const key = e.uid ?? e.id;
              const active = hoveredKey === key;

              const { angleDeg } = dialAngleForEvent(d);
              // Reduce overlaps when multiple events fall near the same time.
              const jitterDeg = ((idx % 9) - 4) * 0.9;
              const finalDeg = angleDeg + jitterDeg;
              const rad = (finalDeg * Math.PI) / 180;

              // Move each dot inward as time approaches the event start.
              const dayRangeMs = selectedDayEnd.getTime() - selectedDayStart.getTime();
              const untilFrac = clamp((d.getTime() - now.getTime()) / dayRangeMs, 0, 1);
              const radiusBase = dotMinR + untilFrac * (dotMaxR - dotMinR);
              const radiusJitter = ((idx % 5) - 2) * 3.2;
              const radius = clamp(radiusBase + radiusJitter, dotMinR, dotMaxR);

              const x = center + radius * Math.cos(rad);
              const y = center + radius * Math.sin(rad);
              const timeLabel = formatTimeShort(d);
              const title = e.title ?? "Untitled event";

              return (
                <button
                  key={key}
                  type="button"
                  className="clockMarker"
                  data-active={active ? "true" : "false"}
                  style={{ left: x, top: y }}
                  aria-label={`Event marker: ${title} at ${timeLabel}`}
                  title={`${title} • ${timeLabel}`}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey((prev) => (prev === key ? null : prev))}
                  onFocus={() => setHoveredKey(key)}
                  onBlur={() => setHoveredKey((prev) => (prev === key ? null : prev))}
                />
              );
            })}
          </div>
        </div>

        <div className="clockListWrap">
          <div className="clockListHeader">
            {dayEvents.length ? `${dayEvents.length} event${dayEvents.length === 1 ? "" : "s"}` : "No events"}
          </div>

          <div className="clockEventList" role="list">
            {dayEvents.length ? (
              dayEvents.map(({ e, d }) => {
                const key = e.uid ?? e.id;
                const active = hoveredKey === key;
                const timeLabel = formatTimeShort(d);
                const title = e.title ?? "Untitled event";
                const metaBits = [e.event_type, e.locationName].filter(Boolean).join(" • ");

                return (
                  <div
                    key={key}
                    className="clockEventRow"
                    data-active={active ? "true" : "false"}
                    role="listitem"
                    tabIndex={0}
                    onMouseEnter={() => setHoveredKey(key)}
                    onMouseLeave={() => setHoveredKey((prev) => (prev === key ? null : prev))}
                    onFocus={() => setHoveredKey(key)}
                    onBlur={() => setHoveredKey((prev) => (prev === key ? null : prev))}
                  >
                    <div className="clockEventTime">{timeLabel}</div>
                    <div className="clockEventTitle">{title}</div>
                    {metaBits ? <div className="clockEventMeta">{metaBits}</div> : null}

                    {active && (e as any)?.content_blocks ? (
                      <div className="clockEventMedia" aria-live="polite">
                        <MediaBlocks slices={(e as any).content_blocks} />
                      </div>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <div className="emptyList">No events on this day.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

