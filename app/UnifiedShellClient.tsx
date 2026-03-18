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
  locations: Array<LocationLite & { key: string }>;
  updates: UpdateLite[];
};

function sectionPath(section: SectionKey) {
  if (section === "directory") return "/locations";
  if (section === "updates") return "/updates";
  return "/";
}

function pathToSection(pathname: string): SectionKey {
  if (pathname.startsWith("/locations")) return "directory";
  if (pathname.startsWith("/updates")) return "updates";
  return "calendar";
}

export default function UnifiedShellClient({ initialSection, events, locations, updates }: Props) {
  const [activeSection, setActiveSection] = useState<SectionKey>(initialSection);
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    const handlePopState = () => {
      const nextSection = pathToSection(window.location.pathname);
      setActiveSection(nextSection);
      setContentKey((value) => value + 1);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderedContent = useMemo(() => {
    if (activeSection === "directory") {
      return <LocationsSplitClient locations={locations} activeSection={activeSection} onChangeSection={changeSection} />;
    }
    if (activeSection === "updates") {
      return <UpdatesSplitClient updates={updates} activeSection={activeSection} onChangeSection={changeSection} />;
    }
    return <HomeSplitClient events={events} activeSection={activeSection} onChangeSection={changeSection} />;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, contentKey, events, locations, updates]);

  function changeSection(section: SectionKey) {
    if (section === activeSection) return;
    setActiveSection(section);
    setContentKey((value) => value + 1);
    const nextUrl = `${sectionPath(section)}${window.location.search}`;
    window.history.pushState({}, "", nextUrl);
  }

  return <div className="unifiedShellContent" key={`${activeSection}-${contentKey}`}>{renderedContent}</div>;
}
