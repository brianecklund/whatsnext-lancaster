"use client";

import { useMemo, useState } from "react";
import HomeSplitClient from "@/app/HomeSplitClient";
import LocationsSplitClient from "@/app/locations/LocationsSplitClient";
import UpdatesSplitClient from "@/app/updates/UpdatesSplitClient";
import type { EventLite, LocationLite } from "@/lib/types";
import type { UpdateLite } from "@/lib/site-data";
import type { SegmentedView } from "@/app/components/SegmentedTabs";

type Props = {
  events: EventLite[];
  locations: (LocationLite & { key?: string })[];
  updates: UpdateLite[];
  initialView?: SegmentedView;
};

export default function UnifiedShellClient({
  events,
  locations,
  updates,
  initialView = "calendar",
}: Props) {
  const [activeView, setActiveView] = useState<SegmentedView>(initialView);

  const directoryRows = useMemo(
    () => locations.map((item, index) => ({ ...item, key: item.key || item.id || `location-${index}` })),
    [locations],
  );

  if (activeView === "directory") {
    return (
      <LocationsSplitClient
        locations={directoryRows}
        activeView={activeView}
        onViewChange={setActiveView}
      />
    );
  }

  if (activeView === "updates") {
    return (
      <UpdatesSplitClient
        updates={updates}
        activeView={activeView}
        onViewChange={setActiveView}
      />
    );
  }

  return (
    <HomeSplitClient
      events={events}
      activeView={activeView}
      onViewChange={setActiveView}
    />
  );
}
