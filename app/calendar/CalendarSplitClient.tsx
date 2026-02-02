"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import type { EventLite } from "@/lib/types";

function parseSelectedTypes(param: string | null): string[] {
  if (!param) return [];
  return param.split(",").map((s) => s.trim()).filter(Boolean);
}

export default function CalendarSplitClient({
  events,
  allTypes
}: {
  events: EventLite[];
  allTypes: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedTypes = useMemo(
    () => parseSelectedTypes(searchParams.get("types")),
    [searchParams]
  );
  const selectedSet = useMemo(() => new Set(selectedTypes), [selectedTypes]);
  const selectedEventKey = searchParams.get("event");

  function navigate(params: URLSearchParams) {
    const qs = params.toString();
    router.replace(qs ? `/calendar?${qs}` : "/calendar");
  }

  function setSelectedEvent(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("event", key);
    navigate(params);
  }

  function toggleType(t: string) {
    const next = new Set(selectedSet);
    if (next.has(t)) next.delete(t);
    else next.add(t);

    const params = new URLSearchParams(searchParams.toString());
    const nextArr = Array.from(next.values());
    if (nextArr.length === 0) params.delete("types");
    else params.set("types", nextArr.join(","));
    navigate(params);
  }

  function clearTypes() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("types");
    navigate(params);
  }

  const filtered = useMemo(() => {
    if (selectedSet.size === 0) return events;
    return events.filter((e) => e.event_type && selectedSet.has(e.event_type));
  }, [events, selectedSet]);

  const grouped = useMemo(() => {
    const map = new Map<string, EventLite[]>();
    for (const e of filtered) {
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
  }, [filtered]);

  const selectedEvent = useMemo(() => {
    if (!selectedEventKey && filtered.length) return filtered[0];
    return filtered.find((e) => e.key === selectedEventKey) ?? (filtered[0] ?? null);
  }, [filtered, selectedEventKey]);

  return (
    <div className="pageShell">
      <div className="stickyBar">
        <div className="toolbar">
          <div className="chips" aria-label="Event type filters">
            {allTypes.map((t) => (
              <button
                key={t}
                className="chip"
                data-on={selectedSet.has(t) ? "true" : "false"}
                onClick={() => toggleType(t)}
                type="button"
                aria-pressed={selectedSet.has(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <button className="btnLink" onClick={clearTypes} type="button">
              Clear
            </button>
            <span className="subtle" style={{ fontSize: 13 }}>
              {filtered.length} event{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <div className="split">
        <div className="pane">
          <div className="scroll">
            <div className="listHeader">
              <h1 className="h1">Calendar</h1>
              <div className="subtle" style={{ fontSize: 13 }}>
                Click an event to view details on the right.
              </div>
            </div>

            {grouped.length === 0 ? (
              <p className="subtle" style={{ paddingTop: 14 }}>
                No events found for the selected filters.
              </p>
            ) : (
              grouped.map(({ key, events: dayEvents }) => {
                const dayDate = parseISO(key);
                const label = isToday(dayDate)
                  ? "Today"
                  : isTomorrow(dayDate)
                  ? "Tomorrow"
                  : format(dayDate, "EEEE");

                return (
                  <section key={key} className="dayBlock">
                    <div className="dayTitle">
                      <span>
                        {label}, {format(dayDate, "MMM d")}
                      </span>
                      <span className="subtle">
                        {dayEvents.length} item{dayEvents.length === 1 ? "" : "s"}
                      </span>
                    </div>

                    {dayEvents.map((e) => {
                      const start = e.start_datetime ? parseISO(e.start_datetime) : null;
                      const time = start ? format(start, "h:mm a") : "";
                      const active = selectedEvent?.key === e.key;

                      return (
                        <div
                          key={e.id}
                          className={`row ${active ? "rowActive" : ""}`}
                          onClick={() => setSelectedEvent(e.key)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="rowTop">
                            <div className="rowTitle">{e.title ?? "Untitled event"}</div>
                            {e.event_type ? <span className="badge">{e.event_type}</span> : null}
                          </div>

                          <div className="meta">
                            <span>{time}</span>
                            <span>{e.location?.name ?? "Unknown location"}</span>
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              })
            )}
          </div>
        </div>

        <div className="pane paneRight">
          <div className="scroll">
            {!selectedEvent ? (
              <div className="emptyState">
                <div>
                  <div className="h2">No event selected</div>
                  <div className="subtle">Pick an event from the left.</div>
                </div>
              </div>
            ) : (
              <div className="detail">
                <h2 className="detailTitle">{selectedEvent.title ?? "Event"}</h2>

                <div className="kv" style={{ marginBottom: 10 }}>
                  {selectedEvent.event_type ? <span className="badge">{selectedEvent.event_type}</span> : null}
                  {selectedEvent.start_datetime ? (
                    <span>{format(parseISO(selectedEvent.start_datetime), "MMM d, h:mm a")}</span>
                  ) : null}
                </div>

                <div className="detailBlock">
                  <div className="h2">Where</div>
                  <div className="kv">
                    <span>
                      <a
                        href={
                          selectedEvent.location?.uid
                            ? `/locations?loc=${selectedEvent.location.uid}`
                            : "/locations"
                        }
                      >
                        {selectedEvent.location?.name ?? "Unknown location"}
                      </a>
                    </span>
                    {selectedEvent.location?.address ? <span>•</span> : null}
                    {selectedEvent.location?.address ? <span>{selectedEvent.location.address}</span> : null}
                  </div>
                </div>

                <div className="detailBlock">
                  <div className="h2">Details</div>
                  <div className="subtle" style={{ whiteSpace: "pre-wrap" }}>
                    {selectedEvent.description ?? "No description added yet."}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
