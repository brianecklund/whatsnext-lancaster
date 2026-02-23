"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type EventItem = {
  id: string;
  uid?: string | null;

  // These can be missing depending on how EventLite is typed upstream
  title?: string | null;
  summary?: string | null;

  start_datetime?: string | null;
  end_datetime?: string | null;

  event_type?: string | null;

  locationName?: string | null;
  address?: string | null;
};

type Props = {
  events: EventItem[];
};

function normalize(str: string) {
  return (str || "").toLowerCase().trim();
}

export default function HomeSplitClient({ events }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const selectedUid = searchParams.get("event");

  const [filterOpen, setFilterOpen] = useState(false);

  // Types derived from all events
  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) {
      const t = e.event_type || "";
      if (t) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [events]);

  // Filtered list
  const filteredEvents = useMemo(() => {
    const nq = normalize(q);
    const nt = normalize(type);

    return events.filter((e) => {
      const haystack = normalize(
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

      const matchesSearch = !nq || haystack.includes(nq);
      const matchesType = !nt || normalize(e.event_type ?? "") === nt;

      return matchesSearch && matchesType;
    });
  }, [events, q, type]);

  // Selected event: only match by uid if uid exists
  const selectedEvent =
    (selectedUid
      ? filteredEvents.find((e) => e.uid && e.uid === selectedUid)
      : null) ||
    filteredEvents[0] ||
    null;

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="splitLayout">
      {/* LEFT */}
      <div className="leftPane">
        <div className="topControls">
          <input
            className="searchInput"
            placeholder="Search events..."
            value={q}
            onChange={(e) => updateParam("q", e.target.value)}
          />

          <button className="filterButton" onClick={() => setFilterOpen(true)}>
            Filter
          </button>
        </div>

        <div className="eventList">
          {filteredEvents.map((event) => {
            const title = event.title || "Untitled event";
            const dt = event.start_datetime || event.end_datetime;

            return (
              <div
                key={event.id}
                className={`eventRow ${
                  selectedEvent?.id === event.id ? "active" : ""
                }`}
                onClick={() => {
                  if (event.uid) updateParam("event", event.uid);
                }}
              >
                <div className="eventTitle">{title}</div>
                {dt && (
                  <div className="eventMeta">
                    {new Date(dt).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FILTER OVERLAY */}
        {filterOpen && (
          <div className="filterOverlay">
            <div className="filterHeader">
              <button
                className="closeButton"
                onClick={() => setFilterOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="filterOptions">
              {eventTypes.map((t) => (
                <button
                  key={t}
                  className={`filterPill ${
                    normalize(type) === normalize(t) ? "active" : ""
                  }`}
                  onClick={() => {
                    updateParam("type", t);
                    setFilterOpen(false);
                  }}
                >
                  {t}
                </button>
              ))}

              {type && (
                <button
                  className="filterPill clear"
                  onClick={() => {
                    updateParam("type", null);
                    setFilterOpen(false);
                  }}
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="rightPane">
        {selectedEvent ? (
          <div className="eventDetail">
            <h2>{selectedEvent.title || "Untitled event"}</h2>

            {(selectedEvent.start_datetime || selectedEvent.end_datetime) && (
              <p>
                {new Date(
                  selectedEvent.start_datetime || selectedEvent.end_datetime!
                ).toLocaleString()}
              </p>
            )}

            {selectedEvent.summary && <p>{selectedEvent.summary}</p>}
          </div>
        ) : (
          <div className="emptyState">No events found.</div>
        )}
      </div>
    </div>
  );
}