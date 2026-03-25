"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [contentSwitching, setContentSwitching] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);

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
      setContentSwitching(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const KEY = "wnl_shell_intro_done_v1";
    if (window.sessionStorage?.getItem(KEY)) return;
    window.sessionStorage?.setItem(KEY, "1");
    setIntroActive(true);

    const timeoutId = window.setTimeout(() => {
      setIntroActive(false);
    }, 1400);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const root = shellRef.current;
    if (!root) return;

    const selector = [
      ".paneLeft .weeklyOverview",
      ".paneLeft .daySection",
      ".paneLeft .weeklyCondensed > *",
      ".paneLeft .splitPageListBody > *",
      ".paneLeft .directoryHeroList > *",
      ".paneLeft .directoryLetterSection",
      ".paneLeft .eventRow",
      ".paneRight > .scroll > *",
      ".mobileDetail[data-open='true'] > *",
      ".mobileDetail[data-open='true'] .scroll > *"
    ].join(", ");

    const seen = new Set<HTMLElement>();
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter((el) => {
      if (seen.has(el)) return false;
      seen.add(el);
      return el.offsetParent !== null;
    });

    nodes.forEach((el, index) => {
      el.dataset.switchItem = contentSwitching ? "true" : "false";
      el.style.setProperty("--switch-index", String(index));
    });

    return () => {
      nodes.forEach((el) => delete el.dataset.switchItem);
    };
  }, [renderedSection, contentSwitching]);

  useEffect(() => {
    if (!introActive) return;

    const frame = window.requestAnimationFrame(() => {
      const root = shellRef.current;
      if (!root) return;

      const selector = [
        ".newsBar",
        ".pageIntroBar",
        ".leftSticky",
        ".paneLeft .weeklyOverview",
        ".paneLeft .daySection",
        ".paneLeft .weeklyCondensed > *",
        ".paneLeft .splitPageListBody > *",
        ".paneLeft .directoryHeroList > *",
        ".paneLeft .directoryLetterSection",
        ".paneLeft .eventRow",
        ".paneRight > .scroll > *",
        ".mobileDetail[data-open='true'] > *",
        ".mobileDetail[data-open='true'] .scroll > *"
      ].join(", ");

      const seen = new Set<HTMLElement>();
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter((el) => {
        if (seen.has(el)) return false;
        seen.add(el);
        return el.offsetParent !== null;
      });

      nodes.forEach((el, index) => {
        el.dataset.introItem = "true";
        el.style.setProperty("--intro-index", String(index));
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [introActive, renderedSection]);

  function switchSection(next: SectionKey) {
    if (next === activeSection) return;
    setActiveSection(next);
    setRenderedSection(next);
    setIsTransitioning(true);
    setContentSwitching(true);
    const target = SECTION_PATHS[next];
    if (window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 120);
    window.setTimeout(() => {
      setContentSwitching(false);
    }, 560);
  }

  const sharedProps = useMemo(() => ({
    currentSection: activeSection,
    onNavigateSection: switchSection,
  }), [activeSection]);

  return (
    <div ref={shellRef} className={`shellSwap homeShell${introActive ? " shellIntro--active" : ""}`} data-transitioning={isTransitioning ? 'true' : 'false'} data-content-switching={contentSwitching ? 'true' : 'false'}>
      <div key={renderedSection} className="shellSwap__panel">
        {renderedSection === 'calendar' ? (
          <HomeSplitClient events={events} updates={updates} {...sharedProps} />
        ) : renderedSection === 'directory' ? (
          <LocationsSplitClient locations={locations} basePath="/locations" {...sharedProps} />
        ) : (
          <UpdatesSplitClient updates={updates} basePath="/updates" {...sharedProps} />
        )}
      </div>
    </div>
  );
}
