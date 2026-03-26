"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { EventLite } from "@/lib/types";
import { dayKey, safeDateFromEvent, startOfToday } from "@/lib/calendar";

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

  const hPart = h > 0 ? `${h}h` : "";
  const mPart = `${m}m`;
  const core = h > 0 ? `${hPart} ${mPart}` : mPart;

  if (totalMinutes >= 0) return `In ${core}`;
  return `${core} ago`;
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
  const sp = useSearchParams();
  const dayParam = sp.get("day") ?? "";
  const eventParam = sp.get("event") ?? "";

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
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
  const innerR = center * 0.64;
  const outerR = center * 0.80;
  const tickR = center * 0.90;

  const minute = now.getMinutes();
  const second = now.getSeconds();
  const hour = now.getHours() % 12;

  const minuteAngle = (minute + second / 60) * 6; // 360/60
  const hourAngle = (hour + minute / 60) * 30; // 360/12

  return (
    <main className="contentPage clockPage">
      <header className="clockHeader">
        <h1 className="clockTitle">Calendar Clock</h1>
        <p className="clockSubhead">{formatDayHeading(selectedDayDate)}</p>
      </header>

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

              const { angleDeg, isPM } = dialAngleForEvent(d);
              const jitterDeg = ((idx % 7) - 3) * 1.2; // reduce exact overlaps
              const finalDeg = angleDeg + jitterDeg;
              const rad = (finalDeg * Math.PI) / 180;

              const radius = isPM ? outerR : innerR;
              const x = center + radius * Math.cos(rad);
              const y = center + radius * Math.sin(rad);

              const ring = isPM ? "pm" : "am";
              const timeLabel = formatTimeShort(d);
              const title = e.title ?? "Untitled event";

              return (
                <button
                  key={key}
                  type="button"
                  className="clockMarker"
                  data-active={active ? "true" : "false"}
                  data-ring={ring}
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
                  <button
                    key={key}
                    type="button"
                    className="clockEventRow"
                    data-active={active ? "true" : "false"}
                    role="listitem"
                    onMouseEnter={() => setHoveredKey(key)}
                    onMouseLeave={() => setHoveredKey((prev) => (prev === key ? null : prev))}
                    onFocus={() => setHoveredKey(key)}
                    onBlur={() => setHoveredKey((prev) => (prev === key ? null : prev))}
                  >
                    <div className="clockEventTime">{timeLabel}</div>
                    <div className="clockEventTitle">{title}</div>
                    {metaBits ? <div className="clockEventMeta">{metaBits}</div> : null}
                  </button>
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

