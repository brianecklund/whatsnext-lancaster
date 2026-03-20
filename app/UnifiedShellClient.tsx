"use client";

import { useEffect, useMemo, useState } from "react";
import HomeSplitClient from "@/app/HomeSplitClient";
import LocationsSplitClient from "@/app/locations/LocationsSplitClient";
import UpdatesSplitClient, { type UpdateLite } from "@/app/updates/UpdatesSplitClient";
import type { EventLite, LocationLite } from "@/lib/types";

type SectionKey = "calendar" | "directory" | "updates";

type Props = {
  initialSection: SectionKey;
  events: EventLite[];
  locations: (LocationLite & { key: string })[];
  updates: UpdateLite[];
};

const SECTION_PATHS: Record<SectionKey, string> = {
  calendar: "/",
  directory: "/locations",
  updates: "/updates",
};

export default function UnifiedShellClient({ initialSection, events, locations, updates }: Props) {
  const [activeSection, setActiveSection] = useState<SectionKey>(initialSection);
  const [renderedSection, setRenderedSection] = useState<SectionKey>(initialSection);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setActiveSection(initialSection);
    setRenderedSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      const next: SectionKey = path.startsWith('/updates') ? 'updates' : path.startsWith('/locations') ? 'directory' : 'calendar';
      setActiveSection(next);
      setRenderedSection(next);
      setIsTransitioning(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function switchSection(next: SectionKey) {
    if (next === activeSection) return;
    setActiveSection(next);
    setIsTransitioning(true);
    window.setTimeout(() => {
      setRenderedSection(next);
      const target = SECTION_PATHS[next];
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 180);
    }, 120);
  }

  const sharedProps = useMemo(() => ({
    currentSection: activeSection,
    onNavigateSection: switchSection,
  }), [activeSection]);

  return (
    <div className="shellSwap" data-transitioning={isTransitioning ? 'true' : 'false'}>
      <div key={renderedSection} className="shellSwap__panel">
        {renderedSection === 'calendar' ? (
          <HomeSplitClient events={events} {...sharedProps} />
        ) : renderedSection === 'directory' ? (
          <LocationsSplitClient locations={locations} basePath="/locations" {...sharedProps} />
        ) : (
          <UpdatesSplitClient updates={updates} basePath="/updates" {...sharedProps} />
        )}
      </div>
    </div>
  );
}
