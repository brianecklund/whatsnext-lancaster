"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import type { LocationLite, EventLite } from "@/lib/types";

export default function LocationsSplitClient({
  locations,
  events
}: {
  locations: LocationLite[];
  events: EventLite[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedUid = searchParams.get("loc");

  function setSelected(uid: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!uid) params.delete("loc");
    else params.set("loc", uid);
    const qs = params.toString();
    router.replace(qs ? `/locations?${qs}` : "/locations");
  }

  const selectedLocation = useMemo(() => {
    if (!selectedUid && locations.length) return locations[0];
    return locations.find((l) => l.uid === selectedUid) ?? (locations[0] ?? null);
  }, [locations, selectedUid]);

  const upcomingForSelected = useMemo(() => {
    if (!selectedLocation) return [];
    return events.filter((e) => e.location?.id === selectedLocation.id).slice(0, 30);
  }, [events, selectedLocation]);

  return (
    <div className="pageShell">
      <div className="stickyBar">
        <div className="toolbar" style={{ justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Locations</div>
            <div className="subtle" style={{ fontSize: 13 }}>
              Click a location to view details on the right.
            </div>
          </div>
          <div className="subtle" style={{ fontSize: 13 }}>
            {locations.length} total
          </div>
        </div>
      </div>

      <div className="split">
        <div className="pane">
          <div className="scroll">
            <div className="listHeader">
              <h1 className="h1">Locations</h1>
              <div className="subtle" style={{ fontSize: 13 }}>
                Restaurants, venues, shops, and other places.
              </div>
            </div>

            {locations.map((loc) => {
              const active = selectedLocation?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  className={`row ${active ? "rowActive" : ""}`}
                  onClick={() => setSelected(loc.uid ?? null)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="rowTop">
                    <div className="rowTitle">{loc.name ?? "Untitled location"}</div>
                    {loc.category ? <span className="badge">{loc.category}</span> : null}
                  </div>
                  <div className="meta">
                    {loc.address ? <span>{loc.address}</span> : <span className="subtle">No address added</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pane paneRight">
          <div className="scroll">
            {!selectedLocation ? (
              <div className="emptyState">
                <div>
                  <div className="h2">No location selected</div>
                  <div className="subtle">Pick a location from the left.</div>
                </div>
              </div>
            ) : (
              <div className="detail">
                <h2 className="detailTitle">{selectedLocation.name ?? "Location"}</h2>

                <div className="kv" style={{ marginBottom: 10 }}>
                  {selectedLocation.category ? <span className="badge">{selectedLocation.category}</span> : null}
                  {selectedLocation.address ? <span>{selectedLocation.address}</span> : null}
                  {selectedLocation.website ? (
                    <>
                      <span>•</span>
                      <a href={selectedLocation.website} target="_blank" rel="noreferrer">
                        Website
                      </a>
                    </>
                  ) : null}
                </div>

                <div className="detailBlock">
                  <div className="h2">About</div>
                  <div className="subtle" style={{ whiteSpace: "pre-wrap" }}>
                    {selectedLocation.description ?? "No description added yet."}
                  </div>
                </div>

                <div className="detailBlock">
                  <div className="h2">Upcoming events</div>
                  {upcomingForSelected.length === 0 ? (
                    <div className="subtle">No upcoming events published for this location yet.</div>
                  ) : (
                    <div>
                      {upcomingForSelected.map((e) => (
                        <div
                          key={e.id}
                          className="row"
                          onClick={() => router.replace(`/calendar?event=${encodeURIComponent(e.key)}`)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="rowTop">
                            <div className="rowTitle">{e.title ?? "Event"}</div>
                            {e.event_type ? <span className="badge">{e.event_type}</span> : null}
                          </div>
                          <div className="meta">
                            {e.start_datetime ? (
                              <span>{format(parseISO(e.start_datetime), "MMM d, h:mm a")}</span>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
