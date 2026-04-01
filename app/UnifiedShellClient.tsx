"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import HomeSplitClient from "@/app/HomeSplitClient";
import LocationsSplitClient from "@/app/locations/LocationsSplitClient";
import UpdatesSplitClient, { type UpdateLite } from "@/app/updates/UpdatesSplitClient";
import type { EventLite, LocationLite } from "@/lib/types";
import type { NewsHubSeasonContent } from "@/lib/news-hub-season";

type SectionKey = "calendar" | "directory" | "updates";

type Props = {
  initialSection: SectionKey;
  events: EventLite[];
  locations: (LocationLite & { key: string })[];
  updates: UpdateLite[];
  newsHubSeason: NewsHubSeasonContent;
};

const SECTION_PATHS: Record<SectionKey, string> = {
  calendar: "/",
  directory: "/locations",
  updates: "/updates",
};

function sectionFromPathname(pathname: string | null): SectionKey {
  if (!pathname) return "calendar";
  if (pathname.startsWith("/updates")) return "updates";
  if (pathname.startsWith("/locations")) return "directory";
  return "calendar";
}

export default function UnifiedShellClient({ initialSection, events, locations, updates, newsHubSeason }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sectionFromUrl = useMemo(() => sectionFromPathname(pathname), [pathname]);

  const [activeSection, setActiveSection] = useState<SectionKey>(() => sectionFromUrl ?? initialSection);
  const [renderedSection, setRenderedSection] = useState<SectionKey>(() => sectionFromUrl ?? initialSection);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [introActive, setIntroActive] = useState(false);
  /** Listing / right-pane only: exit old → swap panel → enter new (chrome stays mounted until swap, no ticker/tabs animation). */
  const [shellSwitchPhase, setShellSwitchPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const shellRef = useRef<HTMLDivElement | null>(null);
  const prevShellSectionRef = useRef<SectionKey | null>(null);
  const renderedSectionRef = useRef(renderedSection);
  const shellTransitionTimersRef = useRef<{ exit?: number; enter?: number }>({});

  useEffect(() => {
    renderedSectionRef.current = renderedSection;
  }, [renderedSection]);

  /** Keep shell in sync with URL; defer panel swap until listing fade-out finishes. */
  useEffect(() => {
    const urlSection = sectionFromPathname(pathname);
    setActiveSection(urlSection);
    setIsTransitioning(false);

    if (prevShellSectionRef.current === null) {
      prevShellSectionRef.current = urlSection;
      setRenderedSection(urlSection);
      setShellSwitchPhase("idle");
      return;
    }

    const currentRendered = renderedSectionRef.current;
    if (urlSection === currentRendered) {
      prevShellSectionRef.current = urlSection;
      if (shellTransitionTimersRef.current.exit) window.clearTimeout(shellTransitionTimersRef.current.exit);
      if (shellTransitionTimersRef.current.enter) window.clearTimeout(shellTransitionTimersRef.current.enter);
      shellTransitionTimersRef.current = {};
      setShellSwitchPhase("idle");
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const exitBeforeSwapMs = reduceMotion ? 0 : 780;
    const enterHoldMs = reduceMotion ? 0 : 1200;

    if (shellTransitionTimersRef.current.exit) window.clearTimeout(shellTransitionTimersRef.current.exit);
    if (shellTransitionTimersRef.current.enter) window.clearTimeout(shellTransitionTimersRef.current.enter);
    shellTransitionTimersRef.current = {};

    setShellSwitchPhase("exiting");

    shellTransitionTimersRef.current.exit = window.setTimeout(() => {
      shellTransitionTimersRef.current.exit = undefined;
      setRenderedSection(urlSection);
      prevShellSectionRef.current = urlSection;
      setShellSwitchPhase("entering");
      shellTransitionTimersRef.current.enter = window.setTimeout(() => {
        shellTransitionTimersRef.current.enter = undefined;
        setShellSwitchPhase("idle");
      }, enterHoldMs);
    }, exitBeforeSwapMs);

    return () => {
      if (shellTransitionTimersRef.current.exit) window.clearTimeout(shellTransitionTimersRef.current.exit);
      if (shellTransitionTimersRef.current.enter) window.clearTimeout(shellTransitionTimersRef.current.enter);
    };
  }, [pathname]);

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
      ".paneLeft .calendarListMonthSwap .dayBlock",
      ".paneLeft .calendarListMonthSwap .emptyList",
      ".paneLeft .calendarListMonthSwap .monthWrap",
      ".paneLeft .paneLeftClockEmbed",
      ".paneLeft .splitPageListBody > *",
      ".paneLeft .directoryHeroList > *",
      ".paneLeft .directoryLetterSection",
      ".paneRight > .scroll > *",
      ".mobileDetail[data-open='true'] > .scroll > *",
    ].join(", ");

    const seen = new Set<HTMLElement>();
    const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector)).filter((el) => {
      if (seen.has(el)) return false;
      seen.add(el);
      return el.offsetParent !== null;
    });

    const tag = shellSwitchPhase === "exiting" || shellSwitchPhase === "entering";
    nodes.forEach((el, index) => {
      if (tag) {
        el.dataset.switchItem = "true";
        el.style.setProperty("--switch-index", String(index));
      } else {
        delete el.dataset.switchItem;
      }
    });

    return () => {
      nodes.forEach((el) => delete el.dataset.switchItem);
    };
  }, [renderedSection, shellSwitchPhase]);

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
        ".mobileDetail[data-open='true'] .scroll > *",
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
    const p = pathname ?? "";
    const onCalendar = p === "/" || p === "";
    const onDirectory = p.startsWith("/locations");
    const onUpdates = p.startsWith("/updates");
    if (next === "calendar" && onCalendar) return;
    if (next === "directory" && onDirectory) return;
    if (next === "updates" && onUpdates) return;

    setIsTransitioning(true);
    const target = SECTION_PATHS[next];
    router.push(target);
    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 120);
  }

  const sharedProps = useMemo(
    () => ({
      currentSection: activeSection,
      onNavigateSection: switchSection,
    }),
    [activeSection],
  );

  return (
    <div
      ref={shellRef}
      className={`shellSwap homeShell${introActive ? " shellIntro--active" : ""}`}
      data-transitioning={isTransitioning ? "true" : "false"}
      data-shell-switch={shellSwitchPhase}
    >
      <div key={renderedSection} className="shellSwap__panel">
        {renderedSection === "calendar" ? (
          <HomeSplitClient events={events} updates={updates} newsHubSeason={newsHubSeason} {...sharedProps} />
        ) : renderedSection === "directory" ? (
          <LocationsSplitClient locations={locations} updates={updates} basePath="/locations" newsHubSeason={newsHubSeason} {...sharedProps} />
        ) : (
          <UpdatesSplitClient updates={updates} basePath="/updates" newsHubSeason={newsHubSeason} {...sharedProps} />
        )}
      </div>
    </div>
  );
}
