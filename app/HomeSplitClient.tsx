"use client";

import NewsTickerBar from "./components/NewsTickerBar";
import MobileContentBackButton from "./components/MobileContentBackButton";
import ToolbarIcon from "./components/ToolbarIcon";
import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";
import {
  dayKey,
  eventEndedEarlierToday,
  eventHasEnded,
  eventHappeningNow,
  nearestDayWithEvents,
  safeDateFromEvent,
  startOfDay,
  startOfToday,
} from "@/lib/calendar";
import { filterUpcomingEventsForLocation } from "@/lib/location-upcoming-events";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { NewsHubSeasonContent } from "@/lib/news-hub-season";
import WeeklyPreviewRail from "@/app/components/WeeklyPreviewRail";
import ClockDayClient from "@/app/clock/ClockDayClient";
import type { EventLite as LibEventLite } from "@/lib/types";
import { useSmoothWheel } from "@/app/components/useSmoothWheel";
import MediaBlocks from "@/app/components/MediaBlocks";
import SegmentedControl from "@/app/components/SegmentedControl";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { UpdateLite } from "@/app/updates/UpdatesSplitClient";

type EventLite = {
  id: string;
  uid?: string | null;

  title?: string | null;
  summary?: string | null;

  start_datetime?: string | null;
  end_datetime?: string | null;

  event_type?: string | null;
  status?: string | null;

  locationName?: string | null;
  address?: string | null;
  locationUrl?: string | null;
  /** Prismic directory location document UID when linked in CMS */
  location_page_uid?: string | null;
  venue_external_id?: string | null;

  website_url?: string | null;
  tickets_url?: string | null;

  // Some builds normalize this already
  imageUrl?: string | null;
  image_url?: string | null;
  descriptionText?: string | null;

  // Others pass through raw Prismic-ish shapes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any;

  /** Optional Prismic slice zone for richer event content. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_blocks?: any[] | null;
};

type Props = {
  events: EventLite[];
  updates?: UpdateLite[];
  newsHubSeason: NewsHubSeasonContent;
  currentSection?: "calendar" | "directory" | "updates";
  onNavigateSection?: (section: "calendar" | "directory" | "updates") => void;
};

const WEEKLY_KEY = "__weekly__";
const GOING_NOW_KEY = "__going_now__";

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

type WeekCategory = "All" | "Live music" | "Food & drink" | "Arts & culture" | "Community" | "Other";

type WeekCategoryToggle = Exclude<WeekCategory, "All">;

function eventDirectoryPageUid(e: EventLite): string | null {
  const raw = e.location_page_uid;
  return typeof raw === "string" && raw.trim() ? raw.trim() : null;
}

function eventReturnKey(e: EventLite): string {
  return encodeURIComponent(String(e.uid ?? e.id));
}

function directoryHrefForEvent(e: EventLite): string | null {
  const uid = eventDirectoryPageUid(e);
  if (!uid) return null;
  return `/locations/${encodeURIComponent(uid)}?fromEvent=${eventReturnKey(e)}`;
}

function weekCategoryForEvent(eventType?: string | null): WeekCategory {
  const t = (eventType || "").toLowerCase();
  if (t.includes("music") || t.includes("concert") || t.includes("show") || t.includes("dj")) return "Live music";
  if (t.includes("food") || t.includes("drink") || t.includes("dining") || t.includes("menu") || t.includes("happy hour") || t.includes("bar")) return "Food & drink";
  if (t.includes("art") || t.includes("gallery") || t.includes("film") || t.includes("movie") || t.includes("theatre") || t.includes("theater") || t.includes("comedy") || t.includes("poetry")) return "Arts & culture";
  if (t.includes("community") || t.includes("market") || t.includes("fundraiser") || t.includes("family") || t.includes("workshop") || t.includes("outreach")) return "Community";
  return "Other";
}

function EventListingLocation({ e, className }: { e: EventLite; className?: string }) {
  const name = (e.locationName || "").trim();
  if (!name) return null;
  const cn = ["eventListingLocation", className].filter(Boolean).join(" ");
  const dir = directoryHrefForEvent(e);
  if (dir) {
    return (
      <Link href={dir} className={`${cn} eventListingLocation--directory`} onClick={(ev) => ev.stopPropagation()}>
        {name}
      </Link>
    );
  }
  if (e.locationUrl) {
    return (
      <a
        href={e.locationUrl}
        className={`${cn} eventListingLocation--external`}
        target="_blank"
        rel="noreferrer"
        onClick={(ev) => ev.stopPropagation()}
      >
        {name}
      </a>
    );
  }
  return <span className={cn}>{name}</span>;
}

/** Desktop weekly overview: directory venue page when linked, else open this event’s detail. */
function WeeklyOverviewVenueLink({ e, openSelected }: { e: EventLite; openSelected: (key: string) => void }) {
  const name = (e.locationName || "").trim();
  if (!name) return null;
  const dir = directoryHrefForEvent(e);
  const cn = "eventListingLocation eventListingLocation--directory";
  if (dir) {
    return (
      <Link href={dir} className={cn} onClick={(ev) => ev.stopPropagation()}>
        {name}
      </Link>
    );
  }
  if (e.locationUrl) {
    return (
      <a
        href={e.locationUrl}
        className={`${cn} eventListingLocation--external`}
        target="_blank"
        rel="noreferrer"
        onClick={(ev) => ev.stopPropagation()}
      >
        {name}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={`${cn} weeklyVenueNamePeekBtn`}
      onClick={(ev) => {
        ev.stopPropagation();
        openSelected(String(e.uid ?? e.id));
      }}
    >
      {name}
    </button>
  );
}

function EventDetailLocation({ e }: { e: EventLite }) {
  const name = (e.locationName || "").trim();
  if (!name) return null;
  const dir = directoryHrefForEvent(e);
  if (dir) {
    return (
      <Link href={dir} className="venue link eventDetailLocation--directory">
        {name}
      </Link>
    );
  }
  if (e.locationUrl) {
    return (
      <a className="venue link" href={e.locationUrl} target="_blank" rel="noreferrer">
        {name}
      </a>
    );
  }
  return <span className="venue">{name}</span>;
}

function endOfWeekSaturdayFromDate(d: Date): Date {
  const start = startOfWeekSundayFromDate(d);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function startOfWeekSundayFromDate(d: Date): Date {
  const x = startOfDay(d);
  const offset = x.getDay();
  x.setDate(x.getDate() - offset);
  return x;
}

function endOfWeekFromStart(start: Date): Date {
  const x = new Date(start);
  x.setDate(x.getDate() + 6);
  x.setHours(23, 59, 59, 999);
  return x;
}

function addDays(d: Date, delta: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + delta);
  return x;
}

function formatWeekRange(start: Date, end: Date): string {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const startLabel = start.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const endLabel = end.toLocaleDateString(undefined, sameMonth ? { day: "numeric" } : { month: "short", day: "numeric" });
  return `${startLabel}–${endLabel}`;
}

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function parseDayKey(ymd: string): Date | null {
  if (!ymd) return null;
  // Interpret as local date.
  const d = new Date(`${ymd}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function monthKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function addMonths(d: Date, delta: number): Date {
  const x = new Date(d);
  const day = x.getDate();
  x.setDate(1);
  x.setMonth(x.getMonth() + delta);
  const dim = new Date(x.getFullYear(), x.getMonth() + 1, 0).getDate();
  x.setDate(Math.min(day, dim));
  return x;
}

function formatMonthYear(d: Date): string {
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDayHeading(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function formatTimeLabel(d: Date): string {
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatTimeShort(d: Date): string {
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pickImageUrl(e: any): string | null {
  if (!e) return null;

  // normalized keys
  if (typeof e.imageUrl === "string" && e.imageUrl) return e.imageUrl;
  if (typeof e.image_url === "string" && e.image_url) return e.image_url;

  // raw prismic-ish image field
  const img = e.image;
  if (img) {
    if (typeof img.url === "string" && img.url) return img.url;
    const square = img.Square || img.square;
    if (square?.url) return square.url;

    const thumbs = img.thumbnails || img.variants;
    if (thumbs?.Square?.url) return thumbs.Square.url;
    if (thumbs?.square?.url) return thumbs.square.url;
  }

  return null;
}

function pickDescriptionText(e: EventLite): string | null {
  if (e.descriptionText) return e.descriptionText;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d: any = (e as any).description;
  if (!d) return null;
  if (typeof d === "string") return d;

  // very lightweight rich text fallback (avoid prismic runtime dependency here)
  if (Array.isArray(d)) {
    const parts = d
      .map((b) => (typeof b?.text === "string" ? b.text : ""))
      .filter(Boolean);
    return parts.length ? parts.join("\n\n") : null;
  }

  return null;
}

function VenueHoverPreviewAside({
  event: e,
  onMouseEnter,
  onMouseLeave,
}: {
  event: EventLite;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const descRaw = (pickDescriptionText(e) || e.summary || "").trim();
  const desc = descRaw.length > 240 ? `${descRaw.slice(0, 237).trim()}…` : descRaw;
  return (
    <aside className="venueHoverPreview" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} aria-label="Venue preview">
      <div className="venueHoverPreview__kicker">Venue</div>
      {e.locationName?.trim() ? <div className="venueHoverPreview__title">{e.locationName.trim()}</div> : null}
      {e.address?.trim() ? <div className="venueHoverPreview__address muted">{e.address.trim()}</div> : null}
      {desc ? <p className="venueHoverPreview__desc">{desc}</p> : null}
      <div className="venueHoverPreview__contact">
        {e.website_url ? (
          <a className="venueHoverPreview__link" href={e.website_url} target="_blank" rel="noreferrer">
            Website
          </a>
        ) : null}
        {e.tickets_url ? (
          <a className="venueHoverPreview__link" href={e.tickets_url} target="_blank" rel="noreferrer">
            Tickets
          </a>
        ) : null}
      </div>
    </aside>
  );
}

type WeekBucket = {
  key: string;
  label: string;
  rangeLabel: string;
  start: Date;
  end: Date;
  events: EventLite[];
  groups: Array<{ date: Date; items: EventLite[] }>;
  insights: Record<string, number>;
  busiestDayLabel: string;
  peakWindowLabel: string;
};

function buildWeekInsights(items: EventLite[]) {
  const buckets: Record<WeekCategory, number> = { All: items.length, "Live music": 0, "Food & drink": 0, "Arts & culture": 0, "Community": 0, "Other": 0 };
  const timeWindows = { Morning: 0, Afternoon: 0, Evening: 0, Late: 0 };
  const dayCounts = new Map<string, { date: Date; count: number }>();

  for (const e of items) {
    buckets[weekCategoryForEvent(e.event_type)]++;

    const d = safeDateFromEvent(e);
    if (!d) continue;
    const hour = d.getHours();
    if (hour < 12) timeWindows.Morning++;
    else if (hour < 17) timeWindows.Afternoon++;
    else if (hour < 21) timeWindows.Evening++;
    else timeWindows.Late++;

    const dk = dayKey(d);
    if (!dayCounts.has(dk)) dayCounts.set(dk, { date: startOfDay(d), count: 0 });
    dayCounts.get(dk)!.count += 1;
  }

  const busiestDay = Array.from(dayCounts.values()).sort((a, b) => b.count - a.count)[0];
  const busiestDayLabel = busiestDay ? `${formatDayHeading(busiestDay.date)} (${busiestDay.count})` : "No events";
  const peakWindow = Object.entries(timeWindows).sort((a, b) => b[1] - a[1])[0];
  const peakWindowLabel = peakWindow && peakWindow[1] > 0 ? `${peakWindow[0]} (${peakWindow[1]})` : "Time TBD";

  return { buckets, busiestDayLabel, peakWindowLabel };
}

export default function HomeSplitClient({ events, updates = [], newsHubSeason, currentSection, onNavigateSection }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();
  const resolvedSection = currentSection ?? (pathname?.startsWith("/updates") ? "updates" : pathname?.startsWith("/locations") ? "directory" : "calendar");

  const q = sp.get("q") || "";
  const searchParamsKey = sp.toString();
  const selectedEventTypes = useMemo(() => {
    const raw = new URLSearchParams(searchParamsKey).getAll("type");
    const out: string[] = [];
    const seen = new Set<string>();
    for (const t of raw) {
      const n = norm(t);
      if (!n || seen.has(n)) continue;
      seen.add(n);
      out.push(t.trim());
    }
    return out;
  }, [searchParamsKey]);
  const selectedEventTypeNormSet = useMemo(() => new Set(selectedEventTypes.map((t) => norm(t))), [selectedEventTypes]);
  const hasActiveEventTypeFilters = selectedEventTypes.length > 0;
  const view = sp.get("view") || "list";
  const dayParam = sp.get("day");
  const viewMode: "list" | "month" | "clock" = view === "month" ? "month" : view === "clock" ? "clock" : "list";
  const isClockView = viewMode === "clock";
  /** Clock view reuses list-style right pane (detail / weekly / day list). */
  const showListStyleRightPane = viewMode === "list" || isClockView;

  const listRef = useRef<HTMLDivElement | null>(null);
  const paneRightScrollRef = useRef<HTMLDivElement | null>(null);
  const openFromWeeklyRef = useRef(false);
  const mobileDetailScrollRef = useRef<HTMLDivElement | null>(null);
  const [mobileTabsPortalReady, setMobileTabsPortalReady] = useState(false);

  useEffect(() => {
    setMobileTabsPortalReady(true);
  }, []);
  const daySectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const displayDayGroupsRef = useRef<Array<{ date: Date; items: EventLite[] }>>([]);
  const [scrollDayKey, setScrollDayKey] = useState<string | null>(null);
  const leftStickyRef = useRef<HTMLDivElement | null>(null);
  const [didInitialScroll, setDidInitialScroll] = useState(false);

  // Staged intro animation (runs once per session): UI first, then list + right content.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const KEY = "wnl_intro_done_v1";
    if (window.sessionStorage?.getItem(KEY)) return;
    window.sessionStorage?.setItem(KEY, "1");

    document.body.classList.add("wnl-intro");

    // Assign indices for CSS-staggered animation.
    const listEl = listRef.current;
    if (listEl) {
      const items = listEl.querySelectorAll<HTMLElement>(
        'button.eventRow, button.weeklyCondRow, button.weeklyOverview'
      );
      items.forEach((el, i) => el.style.setProperty("--i", String(i)));
    }

    const t = window.setTimeout(() => {
      document.body.classList.remove("wnl-intro");
    }, 1400);

    return () => window.clearTimeout(t);
  }, []);

  // default selection = weekly overview
  const selectedParam = sp.get("event");
  // URL drives selection, but on mobile we keep an optimistic client key so the
  // detail panel can update immediately on tap (before the router finishes).
  const [clientSelectedKey, setClientSelectedKey] = useState<string | null>(null);
  const selectedKey = clientSelectedKey ?? selectedParam ?? null;
  // Initialize from matchMedia so the first tap on mobile reliably opens detail.
  const [mounted, setMounted] = useState(false);
  // Hydration-safe: start false so SSR and first client render match.
  const [isMobile, setIsMobile] = useState(false);

  // Mobile-only filter overlay state (used to show/hide filter pills on small screens)
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileOverlayOffset, setMobileOverlayOffset] = useState(0);

  const effectiveIsMobile = mounted ? isMobile : false;

  const selectedDisplayKey =
    selectedKey ?? (!effectiveIsMobile && (viewMode === "list" || isClockView) ? WEEKLY_KEY : null);

  const mobileSpotlightOpen =
    effectiveIsMobile &&
    !isClockView &&
    !!selectedDisplayKey &&
    (selectedDisplayKey === WEEKLY_KEY ||
      selectedDisplayKey === GOING_NOW_KEY ||
      selectedDisplayKey.startsWith("__week__:"));

  const selectedDay = useMemo(() => {
    const parsed = dayParam ? parseDayKey(dayParam) : null;
    if (parsed) return parsed;

    const source = events.filter((e) => {
      const hay = norm(
        [e.title ?? "", e.summary ?? "", e.locationName ?? "", e.address ?? "", e.event_type ?? ""]
          .filter(Boolean)
          .join(" ")
      );
      const matchesSearch = !norm(q) || hay.includes(norm(q));
      const et = norm(e.event_type ?? "");
      const matchesType =
        selectedEventTypeNormSet.size === 0 || (et && selectedEventTypeNormSet.has(et));
      return matchesSearch && matchesType;
    });

    return nearestDayWithEvents(source);
  }, [dayParam, events, q, selectedEventTypeNormSet]);

  const selectedDayStr = dayKey(selectedDay);
  const monthAnchor = useMemo(() => {
    const d = new Date(selectedDay);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [selectedDayStr]);


  // Mobile-only: hide the subhead tagline when the user starts scrolling the left list.
  const [taglineHidden, setTaglineHidden] = useState(false);
  const [mobileControlsCollapsed, setMobileControlsCollapsed] = useState(false);
  const [mobileControlsPinnedOpen, setMobileControlsPinnedOpen] = useState(false);
  /** Empty Set = show all categories (same as “All”). */
  const [weekCategorySelection, setWeekCategorySelection] = useState<Set<WeekCategoryToggle>>(() => new Set());
  const [pinnedAnnouncementsExpanded, setPinnedAnnouncementsExpanded] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [pullRefreshing, setPullRefreshing] = useState(false);
  const pullDistanceRef = useRef(0);
  const pullRefreshingRef = useRef(false);
  const mobileControlsCollapsedRef = useRef(false);
  const weekCategorySentinelRef = useRef<HTMLDivElement | null>(null);
  const [mobileWeekCategorySticky, setMobileWeekCategorySticky] = useState(false);
  const [mobileWeekCategorySheetOpen, setMobileWeekCategorySheetOpen] = useState(false);
  const [mobileWeekPickerSheetOpen, setMobileWeekPickerSheetOpen] = useState(false);

  const desktopHoverLeaveTimerRef = useRef<number | null>(null);
  const [desktopListHoverEvent, setDesktopListHoverEvent] = useState<EventLite | null>(null);

  useEffect(() => {
    mobileControlsCollapsedRef.current = mobileControlsCollapsed;
  }, [mobileControlsCollapsed]);

  useEffect(() => {
    pullDistanceRef.current = pullDistance;
  }, [pullDistance]);

  useEffect(() => {
    pullRefreshingRef.current = pullRefreshing;
  }, [pullRefreshing]);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    // Safari < 14 uses addListener/removeListener
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyMq: any = mq;
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else if (anyMq.addListener) anyMq.addListener(apply);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else if (anyMq.removeListener) anyMq.removeListener(apply);
    };
  }, []);

  useEffect(() => {
    if (!effectiveIsMobile) {
      setMobileOverlayOffset(0);
      return;
    }

    const updateOffset = () => {
      setMobileOverlayOffset(leftStickyRef.current?.offsetHeight ?? 0);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && leftStickyRef.current) {
      ro = new ResizeObserver(() => updateOffset());
      ro.observe(leftStickyRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateOffset);
      ro?.disconnect();
    };
  }, [effectiveIsMobile, q, searchParamsKey, viewMode, filterOpen]);

  useEffect(() => {
    if (!effectiveIsMobile) {
      setMobileControlsCollapsed(false);
      setMobileControlsPinnedOpen(false);
    }
  }, [effectiveIsMobile]);

  useEffect(() => {
    if (!effectiveIsMobile || !mobileSpotlightOpen) return;
    setMobileControlsCollapsed(false);
    setMobileControlsPinnedOpen(false);
  }, [effectiveIsMobile, mobileSpotlightOpen]);

  // Keep the optimistic client key in sync with the URL when navigation completes.
  useEffect(() => {
    setClientSelectedKey(selectedParam);
  }, [selectedParam]);


  function isMobileNow() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 980px)").matches;
  }
  function pushParams(next: URLSearchParams) {
    const qs = next.toString();
    const basePath = resolvedSection === "updates" ? "/updates" : resolvedSection === "directory" ? "/locations" : "/";
    router.push(`${basePath}${qs ? `?${qs}` : ""}`);
  }

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (value == null || value === "") params.delete(key);
    else params.set(key, value);
    pushParams(params);
  }

  function setParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v == null || v === "") params.delete(k);
      else params.set(k, v);
    }
    pushParams(params);
  }

  function clearEventTypeFilters() {
    const params = new URLSearchParams(sp.toString());
    params.delete("type");
    pushParams(params);
  }

  function toggleEventTypeFilter(t: string) {
    const params = new URLSearchParams(sp.toString());
    const current = params.getAll("type");
    const n = norm(t);
    const exists = current.some((c) => norm(c) === n);
    params.delete("type");
    if (exists) {
      for (const c of current) {
        if (norm(c) !== n) params.append("type", c);
      }
    } else {
      for (const c of current) params.append("type", c);
      params.append("type", t);
    }
    pushParams(params);
  }

  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) if (e.event_type) set.add(e.event_type);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [events]);

  const filteredEvents = useMemo(() => {
    const nq = norm(q);

    return events.filter((e) => {
      const hay = norm(
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

      const matchesSearch = !nq || hay.includes(nq);
      const et = norm(e.event_type ?? "");
      const matchesType =
        selectedEventTypeNormSet.size === 0 || (et && selectedEventTypeNormSet.has(et));
      return matchesSearch && matchesType;
    });
  }, [events, q, selectedEventTypeNormSet]);

  const liveEventsNow = useMemo(() => {
    return filteredEvents.filter((e) => eventHappeningNow(e));
  }, [filteredEvents]);

  const dayEvents = useMemo(() => {
    const key = selectedDayStr;
    return filteredEvents.filter((e) => {
      const d = safeDateFromEvent(e);
      return d ? dayKey(d) === key : false;
    });
  }, [filteredEvents, selectedDayStr]);

  const monthGrid = useMemo(() => {
    const first = new Date(monthAnchor);
    const startWeekday = first.getDay(); // 0=Sun..6=Sat
    const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();

    const cells: Array<{ ymd: string | null; hasEvents: boolean }> = [];
    for (let i = 0; i < startWeekday; i++) cells.push({ ymd: null, hasEvents: false });

    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(first);
      dt.setDate(d);
      const ymd = dayKey(dt);
      const hasEvents = filteredEvents.some((e) => {
        const ed = safeDateFromEvent(e);
        return ed ? dayKey(ed) === ymd : false;
      });
      cells.push({ ymd, hasEvents });
    }

    // Pad to complete weeks (multiples of 7)
    while (cells.length % 7 !== 0) cells.push({ ymd: null, hasEvents: false });

    return { first, cells };
  }, [monthAnchor, filteredEvents]);

  useEffect(() => {
    // Auto-open the only event for a selected day on desktop.
    // On mobile, this can feel "trappy" (Back immediately re-opens), so we skip it.
    if (effectiveIsMobile) return;
    if (viewMode !== "month") return;
    if (dayEvents.length !== 1) return;

    const only = dayEvents[0];
    const key = only.uid ?? only.id;
    if (selectedDisplayKey === key) return;

    setClientSelectedKey(key);
    setParam("event", key);
  }, [effectiveIsMobile, viewMode, selectedDayStr, dayEvents, selectedDisplayKey]);



  // Keep the week rail aligned to the currently-selected day so day-of-week buttons
  // keep working even with non-"today" test data.
  const currentWeekRange = useMemo(() => {
    const base = selectedDay ?? startOfToday();
    const start = startOfWeekSundayFromDate(base);
    const end = endOfWeekSaturdayFromDate(base);
    return { start, end };
  }, [selectedDayStr]);

  const leftDayGroups = useMemo(() => {
    const map = new Map<string, { date: Date; items: EventLite[] }>();

    for (const e of filteredEvents) {
      const d = safeDateFromEvent(e);
      if (!d) continue;
      const dk = dayKey(d);
      if (!map.has(dk)) map.set(dk, { date: startOfDay(d), items: [] });
      map.get(dk)!.items.push(e);
    }

    const groups = Array.from(map.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    for (const g of groups) {
      g.items.sort((a, b) => {
        const da = safeDateFromEvent(a)?.getTime() ?? 0;
        const db = safeDateFromEvent(b)?.getTime() ?? 0;
        return da - db;
      });
    }

    return groups;
  }, [filteredEvents]);

  const displayDayGroups = useMemo(() => {
    if (!leftDayGroups.length) return leftDayGroups;
    const currentIndex = leftDayGroups.findIndex((group) => dayKey(group.date) === selectedDayStr);
    if (currentIndex <= 0) return leftDayGroups;
    return [...leftDayGroups.slice(currentIndex), ...leftDayGroups.slice(0, currentIndex)];
  }, [leftDayGroups, selectedDayStr]);

  displayDayGroupsRef.current = displayDayGroups;

  /** Calendar week that contains the day currently at the top of the list (scroll-synced). */
  const viewportWeekAnchorDate = useMemo(() => {
    const k = scrollDayKey ?? selectedDayStr;
    const parsed = parseDayKey(k);
    if (parsed) return parsed;
    return selectedDay;
  }, [scrollDayKey, selectedDayStr, selectedDay]);

  /** Sun–Sat for that week; each button jumps to that calendar day if it has events. */
  const dayJumpDates = useMemo(() => {
    const weekStart = startOfWeekSundayFromDate(viewportWeekAnchorDate);
    return DAY_ABBR.map((label, idx) => {
      const d = addDays(weekStart, idx);
      const dk = dayKey(d);
      const g = leftDayGroups.find((x) => dayKey(x.date) === dk);
      return { label, index: idx, date: g ? startOfDay(g.date) : null };
    });
  }, [viewportWeekAnchorDate, leftDayGroups]);

  function getListScrollOffset() {
    const stickyH = leftStickyRef.current?.offsetHeight ?? 0;
    // Make the day section snap neatly to the top under the sticky controls.
    return Math.max(stickyH + 2, 16);
  }


  useEffect(() => {
    const root = listRef.current;
    if (!root || didInitialScroll || viewMode !== "list" || !leftDayGroups.length) return;

    const scrollToAnchor = () => {
      // On the default page load, keep the list at the natural top so the
      // Weekly Overview card starts directly underneath the sticky search /
      // filter controls instead of being scrolled up behind them.
      if (!dayParam) {
        root.scrollTop = 0;
        syncVisibleDayFromScroll(0);
        setDidInitialScroll(true);
        return;
      }

      const target = daySectionRefs.current[selectedDayStr];
      const top = target ? Math.max(target.offsetTop - getListScrollOffset(), 0) : 0;
      root.scrollTop = top;
      syncVisibleDayFromScroll(top);
      setScrollDayKey(selectedDayStr);
      setDidInitialScroll(true);
    };

    window.requestAnimationFrame(scrollToAnchor);
  }, [dayParam, didInitialScroll, leftDayGroups, selectedDayStr, viewMode]);

  useEffect(() => {
    if (dayParam) setDidInitialScroll(true);
  }, [dayParam]);

  function syncVisibleDayFromScroll(scrollTop: number) {
    const root = listRef.current;
    if (!root) return;
    const threshold = scrollTop + getListScrollOffset() + 16;
    const groups = displayDayGroupsRef.current;
    let active: string | null = groups[0]?.date ? dayKey(groups[0].date) : null;

    for (const group of groups) {
      const key = dayKey(group.date);
      const el = daySectionRefs.current[key];
      if (!el) continue;
      if (el.offsetTop <= threshold) active = key;
      else break;
    }

    if (active) setScrollDayKey((prev) => (prev === active ? prev : active!));
  }

  useSmoothWheel(".scroll", {
    onProgrammaticScroll: (el) => {
      if (el !== listRef.current) return;
      if (viewMode !== "list") return;
      syncVisibleDayFromScroll(el.scrollTop);
    },
  });

  useLayoutEffect(() => {
    const scrollEl = listRef.current;
    const stickyEl = leftStickyRef.current;
    if (!scrollEl || !stickyEl) return;
    if (resolvedSection !== "calendar" || viewMode !== "list") {
      scrollEl.style.removeProperty("--calendarListStickyTop");
      return;
    }

    const apply = () => {
      scrollEl.style.setProperty("--calendarListStickyTop", `${stickyEl.offsetHeight}px`);
    };
    apply();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(apply);
      ro.observe(stickyEl);
    }
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      ro?.disconnect();
      scrollEl.style.removeProperty("--calendarListStickyTop");
    };
  }, [resolvedSection, viewMode, effectiveIsMobile, mobileControlsCollapsed]);

  function jumpToDay(target: Date) {
    const key = dayKey(target);
    const scrollNow = () => {
      const root = listRef.current;
      const el = daySectionRefs.current[key];
      if (!root || !el) return false;
      const top = Math.max(el.offsetTop - getListScrollOffset(), 0);
      root.scrollTo({ top, behavior: "smooth" });
      syncVisibleDayFromScroll(top);
      return true;
    };

    setDidInitialScroll(true);
    setScrollDayKey(key);
    setClientSelectedKey(null);

    // Scroll immediately against the current DOM so the first tap always works,
    // then sync the URL and retry once after React/router updates settle.
    scrollNow();
    setParams({ day: key, event: null });

    window.requestAnimationFrame(() => {
      if (scrollNow()) return;
      window.setTimeout(scrollNow, 80);
    });
  }

  const weekBuckets = useMemo<WeekBucket[]>(() => {
    const currentStart = currentWeekRange.start;
    const currentEnd = currentWeekRange.end;
    const nextWeekStart = addDays(startOfWeekSundayFromDate(currentStart), 7);

    return Array.from({ length: 5 }, (_, index) => {
      const start = index === 0 ? currentStart : addDays(nextWeekStart, (index - 1) * 7);
      const end = index === 0 ? currentEnd : endOfWeekFromStart(start);
      const eventsInRange = filteredEvents
        .map((e) => ({ e, d: safeDateFromEvent(e) }))
        .filter(({ d }) => d && d.getTime() >= start.getTime() && d.getTime() <= end.getTime())
        .sort((a, b) => a.d!.getTime() - b.d!.getTime())
        .map(({ e }) => e);

      const groupsMap = new Map<string, { date: Date; items: EventLite[] }>();
      for (const e of eventsInRange) {
        const d = safeDateFromEvent(e);
        if (!d) continue;
        const dk = dayKey(d);
        if (!groupsMap.has(dk)) groupsMap.set(dk, { date: startOfDay(d), items: [] });
        groupsMap.get(dk)!.items.push(e);
      }

      const groups = Array.from(groupsMap.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
      for (const group of groups) {
        group.items.sort((a, b) => (safeDateFromEvent(a)?.getTime() ?? 0) - (safeDateFromEvent(b)?.getTime() ?? 0));
      }

      const { buckets, busiestDayLabel, peakWindowLabel } = buildWeekInsights(eventsInRange);

      return {
        key: `__week__:${dayKey(start)}`,
        label: index === 0 ? "This Week" : `Week ${index + 1}`,
        rangeLabel: formatWeekRange(start, end),
        start,
        end,
        events: eventsInRange,
        groups,
        insights: buckets,
        busiestDayLabel,
        peakWindowLabel,
      };
    });
  }, [filteredEvents, currentWeekRange]);

  const defaultWeekBucket = weekBuckets[0] ?? null;
  const selectedWeekBucket = useMemo(() => {
    if (selectedDisplayKey === WEEKLY_KEY) return defaultWeekBucket;
    if (!selectedDisplayKey?.startsWith("__week__:")) return null;
    return weekBuckets.find((bucket) => bucket.key === selectedDisplayKey) ?? defaultWeekBucket;
  }, [defaultWeekBucket, selectedDisplayKey, weekBuckets]);

  const weekEvents = selectedWeekBucket?.events ?? [];
  const weekEventsCount = weekEvents.length;
  const weekCategoryOptions = ["Live music", "Food & drink", "Arts & culture", "Community", "Other"] as const satisfies readonly Exclude<WeekCategory, "All">[];
  const mobileWeekCategoryStickyEnabled =
    effectiveIsMobile &&
    mobileSpotlightOpen &&
    !!selectedWeekBucket &&
    selectedDisplayKey !== GOING_NOW_KEY;

  const filteredWeekEvents = useMemo(() => {
    if (weekCategorySelection.size === 0) return weekEvents;
    return weekEvents.filter((event) => weekCategorySelection.has(weekCategoryForEvent(event.event_type) as WeekCategoryToggle));
  }, [weekCategorySelection, weekEvents]);
  const filteredWeekGroups = useMemo(() => {
    if (weekCategorySelection.size === 0) return selectedWeekBucket?.groups ?? [];
    return (selectedWeekBucket?.groups ?? [])
      .map((group) => ({
        ...group,
        items: group.items.filter((event) =>
          weekCategorySelection.has(weekCategoryForEvent(event.event_type) as WeekCategoryToggle),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [selectedWeekBucket, weekCategorySelection]);
  const weekGroups = filteredWeekGroups;

  const weeklyScrollAnchorKey = useMemo(() => {
    if (!weekGroups.length) return null;
    const todayK = dayKey(startOfToday());
    if (weekGroups.some((g) => dayKey(g.date) === todayK)) return todayK;
    const t0 = startOfToday().getTime();
    const nextUp = weekGroups.find((g) => startOfDay(g.date).getTime() >= t0);
    if (nextUp) return dayKey(nextUp.date);
    return dayKey(weekGroups[0].date);
  }, [weekGroups]);

  const weeklyHasEarlierDays = useMemo(
    () => weekGroups.some((g) => startOfDay(g.date).getTime() < startOfToday().getTime()),
    [weekGroups],
  );

  const weeklyDayGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const weekAnnouncements = useMemo(() => {
    const start = selectedWeekBucket?.start?.getTime();
    const end = selectedWeekBucket?.end?.getTime();
    const items = Array.isArray(updates) ? updates : [];

    return items
      .filter((update) => {
        const dateLike = update.sortDate || update.date || null;
        const ts = dateLike ? new Date(dateLike).getTime() : NaN;
        if (Number.isFinite(start) && Number.isFinite(end) && Number.isFinite(ts)) {
          const bufferEnd = (end as number) + 1000 * 60 * 60 * 24 * 7;
          if (ts >= (start as number) && ts <= bufferEnd) return true;
        }

        if (update.pinned) return true;
        const tags = (update.tags || []).map((tag) => (tag || '').toLowerCase());
        return tags.some((tag) => tag.includes('announcement') || tag.includes('notice') || tag.includes('news') || tag.includes('opening'));
      })
      .sort((a, b) => {
        const ap = a.pinned ? 1 : 0;
        const bp = b.pinned ? 1 : 0;
        if (ap !== bp) return bp - ap;
        const at = new Date(a.sortDate || a.date || 0).getTime() || 0;
        const bt = new Date(b.sortDate || b.date || 0).getTime() || 0;
        return bt - at;
      })
      .slice(0, 4);
  }, [selectedWeekBucket, updates]);

  useEffect(() => {
    setWeekCategorySelection(new Set());
    setPinnedAnnouncementsExpanded(false);
  }, [selectedWeekBucket?.key]);

  const selectAllWeekCategories = () => setWeekCategorySelection(new Set());

  const toggleWeekCategory = (cat: WeekCategoryToggle) => {
    setWeekCategorySelection((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  useEffect(() => {
    if (!mobileWeekCategoryStickyEnabled) {
      setMobileWeekCategorySticky(false);
      return;
    }

    let io: IntersectionObserver | null = null;
    let raf = 0;
    let cancelled = false;
    let attempts = 0;

    const arm = () => {
      if (cancelled) return;
      const root = mobileDetailScrollRef.current;
      const target = weekCategorySentinelRef.current;
      if (!root || !target) {
        if (attempts++ < 160) raf = window.requestAnimationFrame(arm);
        return;
      }
      io = new IntersectionObserver(
        ([e]) => {
          setMobileWeekCategorySticky(!e.isIntersecting);
        },
        { root, rootMargin: "-64px 0px 0px 0px", threshold: 0 },
      );
      io.observe(target);
    };

    raf = window.requestAnimationFrame(arm);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [mobileWeekCategoryStickyEnabled, selectedWeekBucket?.key]);

  useEffect(() => {
    if (!mobileWeekCategorySticky) {
      setMobileWeekCategorySheetOpen(false);
      setMobileWeekPickerSheetOpen(false);
    }
  }, [mobileWeekCategorySticky]);

  useEffect(() => {
    if (!mobileWeekCategorySheetOpen && !mobileWeekPickerSheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileWeekCategorySheetOpen(false);
        setMobileWeekPickerSheetOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileWeekCategorySheetOpen, mobileWeekPickerSheetOpen]);

  const mobileWeeklyStickySheetsOpen = mobileWeekCategorySheetOpen || mobileWeekPickerSheetOpen;

  const selectedEvent = useMemo(() => {
    if (!filteredEvents.length) return null;
    if (selectedDisplayKey === WEEKLY_KEY) return null;
    if (selectedDisplayKey === GOING_NOW_KEY) return null;

    const byUid =
      selectedDisplayKey && filteredEvents.find((e) => e.uid && e.uid === selectedDisplayKey);
    const byId = selectedDisplayKey && filteredEvents.find((e) => e.id === selectedDisplayKey);

    return byUid || byId || null;
  }, [filteredEvents, selectedDisplayKey]);

  useLayoutEffect(() => {
    if (!weeklyScrollAnchorKey || weekGroups.length === 0 || filteredWeekEvents.length === 0) return;
    const el = weeklyDayGroupRefs.current[weeklyScrollAnchorKey];
    if (!el) return;

    const align = (root: HTMLElement | null) => {
      if (!root) return;
      const rr = root.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      const top = er.top - rr.top + root.scrollTop - 6;
      root.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };

    if (effectiveIsMobile && mobileSpotlightOpen && selectedWeekBucket && !selectedEvent) {
      align(mobileDetailScrollRef.current);
      requestAnimationFrame(() => align(mobileDetailScrollRef.current));
    } else if (!effectiveIsMobile && selectedWeekBucket && !selectedEvent) {
      align(paneRightScrollRef.current);
      requestAnimationFrame(() => align(paneRightScrollRef.current));
    }
  }, [
    weeklyScrollAnchorKey,
    weekGroups.length,
    filteredWeekEvents.length,
    effectiveIsMobile,
    mobileSpotlightOpen,
    selectedWeekBucket?.key,
    selectedEvent,
    weekCategorySelection,
  ]);

  const otherVenueEvents = useMemo(() => {
    if (!selectedEvent) return [];
    return filterUpcomingEventsForLocation(filteredEvents, {
      locationUid: selectedEvent.location_page_uid?.trim() || null,
      venueExternalId: selectedEvent.venue_external_id?.trim() || null,
      locationName: selectedEvent.locationName?.trim() || null,
      excludeEventId: selectedEvent.id,
      excludeEventUid: selectedEvent.uid ?? null,
    });
  }, [filteredEvents, selectedEvent]);

  const otherVenueHeading = (selectedEvent?.locationName ?? "").trim() || "this venue";

  useEffect(() => {
    setDesktopListHoverEvent(null);
  }, [selectedEvent, selectedDisplayKey, viewMode, selectedDayStr]);

  function desktopListingHoverable(e: EventLite) {
    return Boolean(e.locationName?.trim() || (e.address ?? "").trim());
  }

  function onDesktopListingHoverEnter(e: EventLite) {
    if (effectiveIsMobile || !desktopListingHoverable(e)) return;
    if (desktopHoverLeaveTimerRef.current != null) {
      window.clearTimeout(desktopHoverLeaveTimerRef.current);
      desktopHoverLeaveTimerRef.current = null;
    }
    setDesktopListHoverEvent(e);
  }

  function onDesktopListingHoverLeave() {
    if (effectiveIsMobile) return;
    if (desktopHoverLeaveTimerRef.current != null) window.clearTimeout(desktopHoverLeaveTimerRef.current);
    desktopHoverLeaveTimerRef.current = window.setTimeout(() => {
      setDesktopListHoverEvent(null);
      desktopHoverLeaveTimerRef.current = null;
    }, 140);
  }

  function onDesktopVenuePreviewEnter() {
    if (desktopHoverLeaveTimerRef.current != null) {
      window.clearTimeout(desktopHoverLeaveTimerRef.current);
      desktopHoverLeaveTimerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (desktopHoverLeaveTimerRef.current != null) window.clearTimeout(desktopHoverLeaveTimerRef.current);
    };
  }, []);

  /** Day jump rail follows list scroll position (not the selected event’s date). */
  const dayRailActiveKey = scrollDayKey ?? selectedDayStr;

  const detailFlashKey = useMemo(() => {
    if (!selectedEvent) return "none";
    return `${selectedEvent.uid ?? selectedEvent.id ?? "event"}|${selectedDisplayKey}|${viewMode}|${q}|${selectedEventTypes.join(",")}`;
  }, [selectedEvent, selectedDisplayKey, viewMode, q, selectedEventTypes]);

// stagger counter for left list
  let listAnimIndex = 0;

  // Close filter overlay when leaving mobile.
  useEffect(() => {
    if (!effectiveIsMobile) setFilterOpen(false);
  }, [effectiveIsMobile]);

  const mobilePathPrevRef = useRef<string | null>(null);

  // On mobile, clear the event overlay when switching primary sections — but not when returning
  // from a venue page (…/locations/[uid]) back to the calendar with ?event= still in the URL.
  useEffect(() => {
    if (!effectiveIsMobile) return;
    const prev = mobilePathPrevRef.current;
    const isVenueDetailPath = (p: string) => /^\/locations\/[^/]+$/.test(p);

    if (prev === null) {
      mobilePathPrevRef.current = pathname;
      return;
    }

    mobilePathPrevRef.current = pathname;

    if (pathname === "/" && isVenueDetailPath(prev)) return;

    setClientSelectedKey(null);
    if (sp.get("event")) setParam("event", null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, effectiveIsMobile]);

  // Ensure tagline is visible again when leaving mobile.
  useEffect(() => {
    if (!effectiveIsMobile) setTaglineHidden(false);
  }, [effectiveIsMobile]);

  const mobileDetailOpen =
    effectiveIsMobile && (!!selectedEvent || mobileSpotlightOpen);

  useEffect(() => {
    if (!effectiveIsMobile || !mobileDetailOpen) return;
    try {
      delete document.documentElement.dataset.routeSwitching;
      window.sessionStorage.removeItem("wnl-segmented-pending");
    } catch {
      /* ignore */
    }
  }, [effectiveIsMobile, mobileDetailOpen]);

  useEffect(() => {
    if (mobileDetailOpen) setFilterOpen(false);
  }, [mobileDetailOpen]);

  const [mobileDetailVisualKey, setMobileDetailVisualKey] = useState<"cal" | "previous" | "next">("cal");
  const [mobileDetailNavPending, setMobileDetailNavPending] = useState(false);

  useEffect(() => {
    if (!effectiveIsMobile || !mobileDetailOpen) {
      setMobileDetailVisualKey("cal");
      setMobileDetailNavPending(false);
      return;
    }

    if (mobileDetailNavPending) {
      const timer = window.setTimeout(() => {
        setMobileDetailVisualKey("cal");
        setMobileDetailNavPending(false);
      }, 90);
      return () => window.clearTimeout(timer);
    }

    setMobileDetailVisualKey("cal");
  }, [effectiveIsMobile, mobileDetailOpen, mobileDetailNavPending, detailFlashKey]);

  useLayoutEffect(() => {
    if (!effectiveIsMobile || !mobileDetailOpen || !selectedEvent) return;
    const el = mobileDetailScrollRef.current;
    if (!el) return;
    el.scrollTop = 0;
  }, [detailFlashKey, effectiveIsMobile, mobileDetailOpen, selectedEvent]);

  useLayoutEffect(() => {
    if (!openFromWeeklyRef.current) return;
    if (effectiveIsMobile || !selectedEvent) return;
    openFromWeeklyRef.current = false;
    paneRightScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedEvent, effectiveIsMobile]);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl || !effectiveIsMobile || resolvedSection !== "calendar" || viewMode !== "list") {
      setPullDistance(0);
      setPullRefreshing(false);
      return;
    }

    let startY = 0;
    let active = false;

    const onTouchStart = (event: TouchEvent) => {
      if (pullRefreshingRef.current || mobileDetailOpen || filterOpen) return;
      if (listEl.scrollTop > 0) return;
      if (event.touches.length !== 1) return;
      startY = event.touches[0].clientY;
      active = true;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!active || listEl.scrollTop > 0) return;
      const currentY = event.touches[0]?.clientY ?? startY;
      const delta = Math.max(0, currentY - startY);
      if (delta <= 0) {
        setPullDistance(0);
        return;
      }
      event.preventDefault();
      setPullDistance(Math.min(88, delta * 0.48));
    };

    const finishPull = () => {
      active = false;
      if (pullDistanceRef.current >= 64) {
        setPullRefreshing(true);
        setPullDistance(56);
        router.refresh();
        window.setTimeout(() => {
          setPullRefreshing(false);
          setPullDistance(0);
        }, 900);
      } else {
        setPullDistance(0);
      }
    };

    listEl.addEventListener('touchstart', onTouchStart, { passive: true });
    listEl.addEventListener('touchmove', onTouchMove, { passive: false });
    listEl.addEventListener('touchend', finishPull);
    listEl.addEventListener('touchcancel', finishPull);

    return () => {
      listEl.removeEventListener('touchstart', onTouchStart);
      listEl.removeEventListener('touchmove', onTouchMove);
      listEl.removeEventListener('touchend', finishPull);
      listEl.removeEventListener('touchcancel', finishPull);
    };
  }, [effectiveIsMobile, filterOpen, mobileDetailOpen, resolvedSection, router, viewMode]);

useBodyScrollLock(filterOpen || mobileDetailOpen);

  const showLeft = true;

  // Desktop shows the split detail pane; mobile uses an overlay for details.
  const showRight = !effectiveIsMobile;

  // Right pane content helpers
  const selectedImg = selectedEvent ? pickImageUrl(selectedEvent) : null;
  const selectedDesc = selectedEvent ? pickDescriptionText(selectedEvent) : null;
  const selectedTime = selectedEvent
    ? (() => {
        const d = safeDateFromEvent(selectedEvent);
        return d ? formatTimeLabel(d) : "Time TBD";
      })()
    : null;

  const newsTickerItems = useMemo(() => {
    const upcoming = [...events]
      .map((event) => ({ event, date: safeDateFromEvent(event) }))
      .filter((entry): entry is { event: EventLite; date: Date } => !!entry.date)
      .filter(({ date }) => date.getTime() >= startOfToday().getTime())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 6)
      .map(({ event, date }) => {
        const title =
          (event.title ?? "").trim() ||
          (event.summary ?? "").trim() ||
          "Upcoming event";
        const where = (event.locationName ?? "").trim() || "Lancaster";
        return {
          id: `ev-${event.id}`,
          label: event.event_type ? event.event_type.toUpperCase() : "NEWS",
          text: `${title} • ${where} • ${formatTimeLabel(date)}`,
          href: "#",
        };
      });

    return upcoming.length
      ? upcoming
      : [
          { id: "ticker-fallback", label: "NEWS", text: "Upcoming Lancaster events, specials, and pop-ups.", href: "#" },
        ];
  }, [events]);

  const navigableEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const da = safeDateFromEvent(a)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      const db = safeDateFromEvent(b)?.getTime() ?? Number.MAX_SAFE_INTEGER;
      if (da !== db) return da - db;
      return (a.title ?? "").localeCompare(b.title ?? "");
    });
  }, [filteredEvents]);

  const selectedEventIndex = useMemo(() => {
    if (!selectedEvent) return -1;
    return navigableEvents.findIndex((e) => (selectedEvent.uid && e.uid ? e.uid === selectedEvent.uid : e.id === selectedEvent.id));
  }, [navigableEvents, selectedEvent]);

  const previousEventKey = selectedEventIndex > 0 ? (navigableEvents[selectedEventIndex - 1].uid ?? navigableEvents[selectedEventIndex - 1].id) : null;
  const nextEventKey = selectedEventIndex >= 0 && selectedEventIndex < navigableEvents.length - 1
    ? (navigableEvents[selectedEventIndex + 1].uid ?? navigableEvents[selectedEventIndex + 1].id)
    : null;

  function clearSelected() {
    setClientSelectedKey(null);
    setParam("event", null);
  }

  function handleMobileDetailBack() {
    if (effectiveIsMobile && sp.get("fromShell") === "updates" && mobileSpotlightOpen) {
      setClientSelectedKey(null);
      router.push("/updates");
      return;
    }
    clearSelected();
  }

  function openSelected(key: string) {
    const fromWeeklyContext =
      selectedDisplayKey === WEEKLY_KEY ||
      selectedDisplayKey === GOING_NOW_KEY ||
      Boolean(selectedDisplayKey?.startsWith("__week__:"));
    if (!effectiveIsMobile && fromWeeklyContext) {
      openFromWeeklyRef.current = true;
    }
    setClientSelectedKey(key);
    setParam("event", key);
  }

  function openWeek(key: string) {
    setClientSelectedKey(key);
    setParam("event", key);
  }

  /** Mobile bottom “Cal.” — `replace` avoids a history loop after venue page → back to event → back. */
  function exitMobileEventDetailToCalendarList() {
    setClientSelectedKey(null);
    try {
      delete document.documentElement.dataset.routeSwitching;
      window.sessionStorage.removeItem("wnl-segmented-pending");
    } catch {
      /* ignore */
    }
    setMobileDetailVisualKey("cal");
    setMobileDetailNavPending(false);
    const params = new URLSearchParams(sp.toString());
    params.delete("event");
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/");
  }

  function desktopListingHoverHandlers(e: EventLite) {
    if (effectiveIsMobile || !desktopListingHoverable(e)) return {};
    return {
      onMouseEnter: () => onDesktopListingHoverEnter(e),
      onMouseLeave: onDesktopListingHoverLeave,
    };
  }

  function desktopHoverSplit(children: ReactNode) {
    if (effectiveIsMobile) return children;
    return (
      <div className="desktopEventHoverSplit">
        <div className="desktopEventHoverSplit__main">{children}</div>
        <div className="desktopEventHoverSplit__aside">
          {desktopListHoverEvent && desktopListingHoverable(desktopListHoverEvent) ? (
            <VenueHoverPreviewAside
              key={String(desktopListHoverEvent.uid ?? desktopListHoverEvent.id)}
              event={desktopListHoverEvent}
              onMouseEnter={onDesktopVenuePreviewEnter}
              onMouseLeave={onDesktopListingHoverLeave}
            />
          ) : (
            <div className="venueHoverPreview venueHoverPreview--empty" aria-hidden />
          )}
        </div>
      </div>
    );
  }

  return (<>
    {!(effectiveIsMobile && mobileDetailOpen) ? (
      <NewsTickerBar
        className="newsBar--shellDesktop"
        introText="A calendar of events, specials, and pop-ups in Lancaster, PA."
        items={newsTickerItems}
        updates={updates}
        updatesHref="/updates"
        seasonLandingHref="/spring"
        seasonContent={newsHubSeason}
        mobileExploreOnly={effectiveIsMobile && resolvedSection === "calendar"}
        desktopIntroExplore
      />
    ) : null}

    <div className="pageShell" data-mobile-detail-open={mobileDetailOpen ? "true" : "false"} style={effectiveIsMobile ? ({ ["--mobileOverlayOffset" as string]: `${mobileOverlayOffset}px` } as CSSProperties) : undefined}>
      <div className="split">
        {/* LEFT */}
        {showLeft ? (
          <aside className="pane paneLeft">
            <div
              className="scroll"
              ref={listRef}
              onScroll={(e) => {
                const st = (e.currentTarget as HTMLDivElement).scrollTop;
                if (effectiveIsMobile) setTaglineHidden(st > 2);
                syncVisibleDayFromScroll(st);
              }}
            >
              {effectiveIsMobile && resolvedSection === "calendar" ? (
                <div
                  className="pullRefreshIndicator"
                  aria-hidden={pullDistance <= 0 && !pullRefreshing ? "true" : "false"}
                  data-ready={pullDistance >= 64 ? "true" : "false"}
                  data-refreshing={pullRefreshing ? "true" : "false"}
                  style={{ height: `${Math.max(0, pullDistance)}px` }}
                >
                  <span>{pullRefreshing ? "Refreshing events…" : pullDistance >= 64 ? "Release to refresh" : "Pull to refresh"}</span>
                </div>
              ) : null}
              <div
                className="leftSticky"
                ref={leftStickyRef}
                data-mobile-collapsed={
                  effectiveIsMobile && mobileControlsCollapsed && !mobileSpotlightOpen && !mobileDetailOpen
                    ? "true"
                    : "false"
                }
                data-mobile-pinned={effectiveIsMobile && mobileControlsPinnedOpen ? "true" : "false"}
                data-mobile-weekly-surface={effectiveIsMobile && resolvedSection === "calendar" && mobileSpotlightOpen ? "true" : "false"}
              >
                <SegmentedControl
                  className="tabs segmentedControl--primary"
                  ariaLabel="Primary navigation"
                  currentKey={resolvedSection}
                  items={[
                    { key: "calendar", label: "Calendar", href: onNavigateSection ? undefined : "/", onClick: onNavigateSection ? () => onNavigateSection("calendar") : undefined },
                    { key: "directory", label: "Directory", href: onNavigateSection ? undefined : "/locations", onClick: onNavigateSection ? () => onNavigateSection("directory") : undefined },
                    { key: "updates", label: "Updates", href: onNavigateSection ? undefined : "/updates", onClick: onNavigateSection ? () => onNavigateSection("updates") : undefined },
                  ]}
                />

                {effectiveIsMobile &&
                resolvedSection === "calendar" &&
                !mobileDetailOpen &&
                (mobileControlsCollapsed || mobileControlsPinnedOpen) ? (
                  <button
                    type="button"
                    className="mobileControlsToggle mobileControlsToggle--text"
                    aria-label={mobileControlsCollapsed ? "Show search and filters" : "Hide search and filters"}
                    aria-expanded={mobileControlsCollapsed ? "false" : "true"}
                    onClick={() => {
                      if (mobileControlsCollapsed) {
                        setMobileControlsCollapsed(false);
                        setMobileControlsPinnedOpen(true);
                      } else {
                        setMobileControlsCollapsed(true);
                        setMobileControlsPinnedOpen(false);
                      }
                    }}
                  >
                    <span className="mobileControlsToggleLabel">{mobileControlsCollapsed ? "Show controls" : "Hide controls"}</span>
                    <span className="mobileControlsToggleIcon" aria-hidden="true">▾</span>
                  </button>
                ) : null}

                <div className="leftControls">
                  <div className="calendarToolbar">
                    <div className="dayJumpRail" aria-label="Jump to day">
                      {dayJumpDates.map((entry) => {
                        const isActive = dayRailActiveKey
                          ? entry.date
                            ? dayKey(entry.date) === dayRailActiveKey
                            : entry.index === parseDayKey(dayRailActiveKey)?.getDay()
                          : false;

                        return (
                          <button
                            key={entry.label}
                            type="button"
                            className="dayJumpBtn"
                            data-active={isActive ? "true" : "false"}
                            disabled={!entry.date}
                            onClick={() => entry.date && jumpToDay(entry.date)}
                            aria-label={entry.date ? `Jump to ${entry.label}` : `${entry.label} has no events`}
                          >
                            {entry.label.slice(0, 1)}
                          </button>
                        );
                      })}
                    </div>

                    <div className={`searchRow calendarSearchRow${effectiveIsMobile ? " calendarSearchRowMobile" : ""}`}>
                      <input
                        className="searchInput"
                        placeholder="Search events…"
                        value={q}
                        onChange={(e) => setParam("q", e.target.value)}
                        aria-label="Search events"
                      />
                      <button
                        type="button"
                        className={`viewBtn iconBtn${!effectiveIsMobile ? " squareIconBtn" : ""}`}
                        aria-label={
                          viewMode === "clock"
                            ? "Switch to month calendar view"
                            : viewMode === "month"
                              ? "Switch to list view"
                              : "Switch to calendar view"
                        }
                        data-active={viewMode === "month" ? "true" : "false"}
                        onClick={() => {
                          if (viewMode === "clock") {
                            clearSelected();
                            setFilterOpen(false);
                            setParams({ view: "month", event: null });
                            return;
                          }
                          clearSelected();
                          setFilterOpen(false);
                          setParam("view", viewMode === "month" ? "list" : "month");
                        }}
                      >
                        <ToolbarIcon src="/icons/calendar-alt.svg" alt="Calendar view" />
                        {effectiveIsMobile ? (
                          <span>{viewMode === "clock" ? "Calendar" : viewMode === "month" ? "List" : "Calendar"}</span>
                        ) : null}
                      </button>
                      <button
                        type="button"
                        className={`viewBtn iconBtn clockViewToolbarBtn${!effectiveIsMobile ? " squareIconBtn" : ""}`}
                        aria-label={isClockView ? "Switch to list view" : "Clock view"}
                        aria-pressed={isClockView ? "true" : "false"}
                        data-active={isClockView ? "true" : "false"}
                        onClick={() => {
                          if (isClockView) {
                            setParams({ view: "list", event: null });
                            return;
                          }
                          clearSelected();
                          setFilterOpen(false);
                          setParams({
                            view: "clock",
                            day: dayParam || selectedDayStr,
                            event: null,
                          });
                        }}
                      >
                        <ToolbarIcon src="/icons/clock-view.svg" alt="" />
                        {effectiveIsMobile ? <span>Clock</span> : null}
                      </button>
                      {effectiveIsMobile ? (
                        <button
                          type="button"
                          className="filterBtn"
                          aria-label={filterOpen ? "Close filters" : "Open filters"}
                          aria-expanded={filterOpen ? "true" : "false"}
                          data-active={filterOpen || hasActiveEventTypeFilters ? "true" : "false"}
                          onClick={() => setFilterOpen((v) => !v)}
                        >
                          <ToolbarIcon src="/icons/filter.svg" alt="Filter" />
                          <span>
                            {hasActiveEventTypeFilters
                              ? selectedEventTypes.length === 1
                                ? `Filter: ${selectedEventTypes[0]}`
                                : `Filters (${selectedEventTypes.length})`
                              : "Filter"}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="filterBtn filterBtnSquare squareIconBtn"
                          aria-label={filterOpen ? "Close filters" : "Open filters"}
                          aria-expanded={filterOpen ? "true" : "false"}
                          data-active={filterOpen || hasActiveEventTypeFilters ? "true" : "false"}
                          onClick={() => setFilterOpen((v) => !v)}
                        >
                          <ToolbarIcon src="/icons/filter.svg" alt="Filter" />
                          {!effectiveIsMobile ? null : (
                            <span>{hasActiveEventTypeFilters ? "Filtered" : "Filter"}</span>
                          )}
                        </button>
                      )}
                      {!effectiveIsMobile && (q || hasActiveEventTypeFilters) ? (
                        <button
                          className="clearBtn"
                          onClick={() => {
                            setParam("q", null);
                            clearEventTypeFilters();
                          }}
                          type="button"
                        >
                          Clear
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {effectiveIsMobile &&
                resolvedSection === "calendar" &&
                !mobileDetailOpen &&
                viewMode === "list" &&
                !isClockView ? (
                  <div className="weeklySpotlightMobile weeklySpotlightMobile--stickyRow fadeInItem" style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}>
                    <div className="weeklySpotlightMobile__row">
                      <button
                        type="button"
                        className="weeklyOverview weeklyOverview--spotlightMobileHalf"
                        data-active={selectedDisplayKey === WEEKLY_KEY ? "true" : "false"}
                        onClick={() => openWeek(WEEKLY_KEY)}
                      >
                        <div className="weeklySpotlightMobile__label">This week</div>
                        <div className="weeklySpotlightMobile__count">
                          {(() => {
                            const n = defaultWeekBucket?.events.length ?? 0;
                            return `${n} ${n === 1 ? "event" : "events"}`;
                          })()}
                        </div>
                      </button>
                      <button
                        type="button"
                        className="weeklyOverview weeklyOverview--spotlightMobileHalf"
                        data-active={selectedDisplayKey === GOING_NOW_KEY ? "true" : "false"}
                        onClick={() => openWeek(GOING_NOW_KEY)}
                      >
                        <div className="weeklySpotlightMobile__label">Happening now</div>
                        <div className="weeklySpotlightMobile__count">
                          {(() => {
                            const n = liveEventsNow.length;
                            return `${n} ${n === 1 ? "event" : "events"}`;
                          })()}
                        </div>
                      </button>
                    </div>
                  </div>
                ) : null}

              </div>

              {filterOpen ? (
                <div
                  className={`filterOverlay filterOverlay--pane${effectiveIsMobile ? " filterOverlay--mobilePane" : ""}`}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Filters"
                  onClick={() => setFilterOpen(false)}
                >
                  <div className="filterOverlayPanel filterOverlayPanel--pane" onClick={(e) => e.stopPropagation()}>
                    <div className="filterOverlayHeader">
                      <div className="filterOverlayTitle">Filters</div>
                      <button
                        type="button"
                        className="filterOverlayClose"
                        onClick={() => setFilterOpen(false)}
                        aria-label="Close filters"
                      >
                        ✕
                      </button>
                    </div>

                    {(q || hasActiveEventTypeFilters) ? (
                      <button
                        type="button"
                        className="filterOverlayClear"
                        onClick={() => {
                          setParam("q", null);
                          clearEventTypeFilters();
                          setFilterOpen(false);
                        }}
                      >
                        Clear search & filters
                      </button>
                    ) : null}

                    <div className="typePills" role="group" aria-label="Event type filters (choose one or more)">
                      <button
                        type="button"
                        className="typePill"
                        data-active={!hasActiveEventTypeFilters ? "true" : "false"}
                        onClick={() => {
                          clearEventTypeFilters();
                          /* Mobile: leave overlay open so several types can be toggled without reopening. */
                          if (!effectiveIsMobile) setFilterOpen(false);
                        }}
                      >
                        All
                      </button>
                      {eventTypes.map((t) => {
                        const on = selectedEventTypeNormSet.has(norm(t));
                        return (
                          <button
                            key={t}
                            type="button"
                            className="typePill"
                            data-active={on ? "true" : "false"}
                            onClick={() => toggleEventTypeFilter(t)}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}

              <div
                className={
                  !effectiveIsMobile && resolvedSection === "calendar"
                    ? "calendarListMonthSwap calendarListMonthSwap--desktopAnim"
                    : "calendarListMonthSwap"
                }
                key={resolvedSection === "calendar" ? viewMode : "static"}
              >
              {isClockView && resolvedSection === "calendar" ? (
                <div className="paneLeftClockEmbed">
                  <ClockDayClient events={filteredEvents as unknown as LibEventLite[]} navigationMode="embedded" />
                </div>
              ) : viewMode === "list" ? (
                <>
                  {/* Weekly overview + Going on now (desktop — mobile lives in leftSticky under filters) */}
                  {!effectiveIsMobile ? (
                    <div className="weeklySpotlightPair fadeInItem" style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}>
                      <button
                        type="button"
                        className="weeklyOverview weeklyOverview--spotlightHalf"
                        data-active={selectedDisplayKey === WEEKLY_KEY ? "true" : "false"}
                        onClick={() => openWeek(WEEKLY_KEY)}
                      >
                        <div className="weeklyTitle">Weekly Overview</div>
                        <div className="weeklyCount">
                          {defaultWeekBucket?.events.length ?? 0} event{(defaultWeekBucket?.events.length ?? 0) === 1 ? "" : "s"} left this week
                        </div>
                      </button>
                      <button
                        type="button"
                        className="weeklyOverview weeklyOverview--spotlightHalf"
                        data-active={selectedDisplayKey === GOING_NOW_KEY ? "true" : "false"}
                        onClick={() => openWeek(GOING_NOW_KEY)}
                      >
                        <div className="weeklyTitle">Going on now</div>
                        <div className="weeklyCount">
                          {liveEventsNow.length} event{liveEventsNow.length === 1 ? "" : "s"} happening now
                        </div>
                      </button>
                    </div>
                  ) : null}

{displayDayGroups.length === 0 ? (
                <div className="emptyList">No events match your search.</div>
              ) : null}

              {/* Left list */}
              {displayDayGroups.map((g) => (
                <section key={dayKey(g.date)} className="dayBlock" ref={(el) => { daySectionRefs.current[dayKey(g.date)] = el; }}>
                  <div
                    className={
                      resolvedSection === "calendar" && viewMode === "list"
                        ? "dayTitle dayTitle--sticky"
                        : "dayTitle"
                    }
                  >
                    {formatDayHeading(g.date)}
                  </div>

                  {g.items.map((e) => {
                    const active =
                      selectedEvent?.id === e.id ||
                      (selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid);

                    const title = e.title || "Untitled event";
                    const d = safeDateFromEvent(e);
                    const timeLabel = d ? formatTimeLabel(d) : "Time TBD";

                    return (
                      <button
                        key={e.id}
                        className="eventRow fadeInItem"
                        style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}
                        data-active={active ? "true" : "false"}
                        data-past={eventHasEnded(e) ? "true" : "false"}
                        onClick={() => {
                          const key = e.uid ?? e.id;
                          setClientSelectedKey(key);
                          setParam("event", key);
                          
                        }}
                        type="button"
                      >
                        {eventEndedEarlierToday(e, g.date) ? (
                          <span className="eventEndedTag">ENDED</span>
                        ) : null}
                        <div className="eventRowTitle">{title}</div>
                        <div className="eventRowMeta">
                          <span className="eventListingTime">{timeLabel}</span>
                          {e.event_type ? (
                            effectiveIsMobile ? (
                              <span className="eventRowTypePill">{e.event_type}</span>
                            ) : (
                              <>
                                <span className="dot">•</span>
                                <span className="eventListingType">{e.event_type}</span>
                              </>
                            )
                          ) : null}
                        </div>
                        {e.locationName?.trim() ? (
                          <div className="eventRowLocation">
                            <EventListingLocation e={e} />
                          </div>
                        ) : null}
                        {(() => {
                          const raw =
                            (e.summary ?? "") || (pickDescriptionText(e) ?? "");
                          const s = (raw || "").trim();
                          if (!s) return null;
                          return (
                            <div className="eventRowDesc">
                              {s.length > 180 ? `${s.slice(0, 180).trim()}…` : s}
                            </div>
                          );
                        })()}

                      </button>
                    );
                  })}
                </section>
              ))}
                </>
              ) : viewMode === "month" ? (
                <>
                  <div className="monthWrap">
                    <div className="monthHeader">
                      <button
                        type="button"
                        className="monthNavBtn"
                        aria-label="Previous month"
                        onClick={() => {
                          const prev = addMonths(monthAnchor, -1);
                          const d = new Date(prev);
                          d.setDate(1);
                          // clear selected event so the day list is visible
                          setClientSelectedKey(null);
                          setParams({ day: dayKey(d), event: null });
                        }}
                      >
                        ‹
                      </button>
                      <div className="monthTitle">{formatMonthYear(monthGrid.first)}</div>
                      <button
                        type="button"
                        className="monthNavBtn"
                        aria-label="Next month"
                        onClick={() => {
                          const next = addMonths(monthAnchor, 1);
                          const d = new Date(next);
                          d.setDate(1);
                          setClientSelectedKey(null);
                          setParams({ day: dayKey(d), event: null });
                        }}
                      >
                        ›
                      </button>
                    </div>

                    <div className="weekdayRow" aria-hidden="true">
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>

                    <div className="monthGrid" role="grid" aria-label="Calendar month view">
                      {monthGrid.cells.map((c, i) => {
                        if (!c.ymd) return <div key={`e-${i}`} className="monthCell empty" />;
                        const dayNum = Number(c.ymd.split("-")[2]);
                        const active = c.ymd === selectedDayStr;
                        return (
                          <button
                            key={c.ymd}
                            type="button"
                            className="monthCell"
                            data-active={active ? "true" : "false"}
                            data-has={c.hasEvents ? "true" : "false"}
                            onClick={() => {
                              setClientSelectedKey(null);
                              setParams({ day: c.ymd, event: null });
                            }}
                            aria-label={`Select ${c.ymd}`}
                          >
                            <span className="monthDayNum">{dayNum}</span>
                            {c.hasEvents ? <span className="monthDot" aria-hidden="true" /> : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {effectiveIsMobile ? (
                    <div className="dayEventsMobile">
                      <div className="dayEventsHeader">
                        <div className="dayEventsTitle">{formatDayHeading(selectedDay)}</div>
                        <div className="dayEventsCount">
                          {dayEvents.length} event{dayEvents.length === 1 ? "" : "s"}
                        </div>
                      </div>

                      {dayEvents.length === 0 ? (
                        <div className="emptyList">No events on this day.</div>
                      ) : (
                        <div className="dayEventsList">
                          {dayEvents.map((e) => {
                            const key = e.uid ?? e.id;
                            const title = e.title || "Untitled event";
                            const d = safeDateFromEvent(e);
                            const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                            return (
                              <button
                                key={key}
                                type="button"
                                className="eventCard"
                                data-past={eventHasEnded(e) ? "true" : "false"}
                                onClick={() => {
                                  setClientSelectedKey(key);
                                  setParam("event", key);
                                }}
                              >
                                {eventEndedEarlierToday(e, selectedDay) ? (
                                  <span className="eventEndedTag">ENDED</span>
                                ) : null}
                                <div className="eventCardTitle">{title}</div>
                                <div className="eventMeta">
                                  <span className="eventListingTime">{timeLabel}</span>
                                  {e.event_type ? (
                                    <>
                                      <span className="dot" aria-hidden>
                                        •
                                      </span>
                                      <span className="eventListingType">{e.event_type}</span>
                                    </>
                                  ) : null}
                                </div>
                                {e.locationName?.trim() ? (
                                  <div className="eventCardLocation">
                                    <EventListingLocation e={e} />
                                  </div>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : null}
                </>
              ) : null}
              </div>

            </div>
          </aside>
        ) : null}

        {/* RIGHT */}
        {showRight ? (
          <main className="pane paneRight">
            <div className="scroll" ref={paneRightScrollRef}>

              {!isClockView && viewMode === "month" ? (
                <div className="dayRight">
                  <div className="dayRightHeader">
                    <div className="rightDayLabel">{formatDayHeading(selectedDay)}</div>
                    <div className="dayRightCount">
                      {dayEvents.length} event{dayEvents.length === 1 ? "" : "s"}
                    </div>
                  </div>

                  {dayEvents.length === 0 ? (
                    <div className="emptyList">No events on this day.</div>
                  ) : (
                    <div className="dayRightList" role="list">
                      {dayEvents.map((e) => {
                        const key = e.uid ?? e.id;
                        const active =
                          selectedEvent?.id === e.id ||
                          (selectedEvent?.uid && e.uid && selectedEvent.uid === e.uid);

                        const title = e.title || "Untitled event";
                        const d = safeDateFromEvent(e);
                        const timeLabel = d ? formatTimeShort(d) : "Time TBD";

                        return (
                          <button
                            key={key}
                            type="button"
                            className="dayRightRow"
                            data-active={active ? "true" : "false"}
                            onClick={() => {
                              setClientSelectedKey(key);
                              setParam("event", key);
                            }}
                            role="listitem"
                          >
                            {eventEndedEarlierToday(e, selectedDay) ? (
                              <span className="eventEndedTag">ENDED</span>
                            ) : null}
                            <div className="dayRightTop">
                              <div className="dayRightTitle">{title}</div>
                              <div className="dayRightTime eventListingTime">{timeLabel}</div>
                            </div>
                            {e.event_type ? <div className="dayRightMeta"><span className="eventListingType">{e.event_type}</span></div> : null}
                            {e.locationName?.trim() ? (
                              <div className="dayRightLocation">
                                <EventListingLocation e={e} />
                              </div>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}


              {showListStyleRightPane && selectedDisplayKey === GOING_NOW_KEY ? (
                <div className="rightHeader weeklyOverviewLanding goingNowRight">
                  <div className="weeklyOverviewRevealGroup">
                  <div className="goingNowRight__top">
                    <div className="rightDayLabel">Going on now</div>
                    <div className="weekSummaryRangePill">{liveEventsNow.length} live</div>
                  </div>
                  {liveEventsNow.length === 0 ? (
                    <div className="emptyRight">Nothing scheduled as happening right now.</div>
                  ) : (
                    desktopHoverSplit(
                      <div className="goingNowRightList" role="list">
                      {liveEventsNow.map((e) => {
                        const key = e.uid ?? e.id;
                        const title = e.title || "Untitled event";
                        const d = safeDateFromEvent(e);
                        const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                        return (
                          <button
                            key={key}
                            type="button"
                            className="dayRightRow"
                            data-past={eventHasEnded(e) ? "true" : "false"}
                            onClick={() => openSelected(String(key))}
                            role="listitem"
                            {...desktopListingHoverHandlers(e)}
                          >
                            <div className="dayRightTop">
                              <div className="dayRightTitle">{title}</div>
                              <div className="dayRightTime eventListingTime">{timeLabel}</div>
                            </div>
                            {e.event_type ? <div className="dayRightMeta"><span className="eventListingType">{e.event_type}</span></div> : null}
                            {e.locationName?.trim() ? (
                              <div className="dayRightLocation">
                                <EventListingLocation e={e} />
                              </div>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                    )
                  )}
                  </div>
                </div>
              ) : showListStyleRightPane && selectedWeekBucket ? (
                <div className="rightHeader weeklyOverviewLanding">
                  <div className="weeklyOverviewRevealGroup">
                  <div className="rightDayLabel">Weekly Overview</div>

                  <div className="weekSelectorRail">
                    {weekBuckets.map((bucket) => (
                      <button
                        key={bucket.key}
                        type="button"
                        className="weekSelectorCard"
                        data-active={selectedWeekBucket.key === bucket.key ? "true" : "false"}
                        onClick={() => openWeek(bucket.key)}
                      >
                        <div className="weekSelectorEyebrow">{bucket.label}</div>
                        <div className="weekSelectorRange">{bucket.rangeLabel}</div>
                        <div className="weekSelectorMeta">{bucket.events.length} event{bucket.events.length === 1 ? "" : "s"}</div>
                      </button>
                    ))}
                  </div>

                  <div className="weekSummary">
                    <div className="weekSummaryTopline">
                      <div>
                        <h3 className="weekSummaryTitle">{selectedWeekBucket.label}</h3>
                      </div>
                      <div className="weekSummaryRangePill">{selectedWeekBucket.rangeLabel}</div>
                    </div>

                    <div className="weekCategoryChipGrid" role="group" aria-label="Filter events by category (choose one or more)">
                      <button
                        type="button"
                        aria-pressed={weekCategorySelection.size === 0}
                        className="weekCategoryChip"
                        data-active={weekCategorySelection.size === 0 ? "true" : "false"}
                        onClick={selectAllWeekCategories}
                      >
                        <span className="weekCategoryChip__label">All</span>
                        <span className="weekCategoryChip__count">{weekEventsCount}</span>
                      </button>
                      {weekCategoryOptions.map((category) => {
                        const isActive = weekCategorySelection.has(category);
                        const count = selectedWeekBucket.insights[category] ?? 0;
                        return (
                          <button
                            key={category}
                            type="button"
                            aria-pressed={isActive}
                            className="weekCategoryChip"
                            data-active={isActive ? "true" : "false"}
                            onClick={() => toggleWeekCategory(category)}
                          >
                            <span className="weekCategoryChip__label">{category}</span>
                            <span className="weekCategoryChip__count">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div ref={weekCategorySentinelRef} className="weekCategoryStickySentinel" aria-hidden />
                  </div>

                  <section
                    className={`weekAnnouncements weekAnnouncements--strip weekAnnouncements--collapsible${
                      pinnedAnnouncementsExpanded ? " weekAnnouncements--expanded" : " weekAnnouncements--collapsed"
                    }`}
                    aria-label="Pinned announcements"
                  >
                    <button
                      type="button"
                      className="weekAnnouncementsCollapseToggle"
                      aria-expanded={pinnedAnnouncementsExpanded}
                      aria-controls="pinned-week-announcements-panel"
                      onClick={() => setPinnedAnnouncementsExpanded((v) => !v)}
                    >
                      <span className="weekSummaryKicker">Pinned announcements</span>
                      <span className="weekAnnouncementsCollapseAction">
                        {pinnedAnnouncementsExpanded ? "Show less" : "See all"}
                      </span>
                    </button>
                    <div id="pinned-week-announcements-panel" className="weekAnnouncementsCollapseBody">
                      {weekAnnouncements.length ? (
                        weekAnnouncements.map((update) => (
                          <button
                            key={update.id}
                            type="button"
                            className="weekAnnouncementCard"
                            onClick={() => router.push(`/updates?u=${encodeURIComponent(update.id)}`)}
                          >
                            <div className="weekAnnouncementTop">
                              <div className="weekAnnouncementTitle">{update.title}</div>
                              {update.date ? <div className="weekAnnouncementDate">{update.date}</div> : null}
                            </div>
                            {update.summary ? <div className="weekAnnouncementText">{update.summary}</div> : null}
                            {update.link ? <div className="weekAnnouncementLink">{update.linkLabel || "Open link"}</div> : null}
                          </button>
                        ))
                      ) : (
                        <div className="weekAnnouncementEmpty">Add or pin announcements in the Updates CMS collection to feature them here.</div>
                      )}
                    </div>
                    <Link href="/updates" className="weekAnnouncementsAllUpdates">
                      All updates
                    </Link>
                  </section>

                  {filteredWeekEvents.length === 0 ? (
                    <div className="emptyRight">No events match this weekly overview filter right now.</div>
                  ) : (
                    <div className="weeklyLanding weeklyLanding--desktopFull">
                      {weeklyHasEarlierDays ? (
                        <p className="weeklyEarlierDaysHint" role="note">
                          Earlier days this week are above — scroll up to see listings (past events appear muted).
                        </p>
                      ) : null}
                      <div className="weeklyCards">
                        {weekGroups.map((g) => {
                          const dk = dayKey(g.date);
                          return (
                            <div
                              key={dk}
                              className="weeklyDayGroup"
                              ref={(node) => {
                                weeklyDayGroupRefs.current[dk] = node;
                              }}
                            >
                              <div className="dayTitle">{formatDayHeading(g.date)}</div>

                              {g.items.map((e) => {
                                const title = e.title || "Untitled event";
                                const d = safeDateFromEvent(e);
                                const timeLabel = d ? formatTimeLabel(d) : "Time TBD";
                                const img = pickImageUrl(e);
                                const desc = (pickDescriptionText(e) || e.summary || "").trim();

                                return (
                                  <button
                                    key={e.id}
                                    type="button"
                                    className="weeklyCard weeklyCardSelectable"
                                    data-past={eventHasEnded(e) ? "true" : "false"}
                                    onClick={() => openSelected(e.uid ?? e.id)}
                                  >
                                    <div className="weeklyCardMedia">
                                      {img ? (
                                        <div className="media16x9">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img className="weeklyThumb" src={img} alt="" />
                                        </div>
                                      ) : (
                                        <div className="media16x9 weeklyThumbPlaceholder" aria-hidden />
                                      )}
                                    </div>

                                    <div className="weeklyCardContent weeklyCardContentExpanded">
                                      <div className="weeklyCardTop">
                                        <div className="weeklyCardTitleCol">
                                          {e.event_type ? <div className="weeklyCardTag">{e.event_type}</div> : null}
                                          <div className="weeklyCardTitleWrap">
                                            <div className="weeklyCardTitle">{title}</div>
                                            <div className="weeklyCardTime eventListingTime">{timeLabel}</div>
                                          </div>
                                        </div>

                                        {e.tickets_url || e.website_url ? (
                                          <div className="weeklyCardActions weeklyCardActions--listingCorner">
                                            {e.tickets_url ? (
                                              <a
                                                className="weeklyMiniBtn"
                                                href={e.tickets_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(ev) => ev.stopPropagation()}
                                              >
                                                Tickets
                                              </a>
                                            ) : null}
                                            {e.website_url ? (
                                              <a
                                                className="weeklyMiniBtn"
                                                href={e.website_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(ev) => ev.stopPropagation()}
                                              >
                                                Website
                                              </a>
                                            ) : null}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div className="weeklyCardMetaRow">
                                        {e.locationName?.trim() ? (
                                          <WeeklyOverviewVenueLink e={e} openSelected={openSelected} />
                                        ) : null}
                                      </div>
                                      {desc ? <div className="weeklyCardDesc">{desc.length > 200 ? `${desc.slice(0, 200).trim()}…` : desc}</div> : null}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              ) : !selectedEvent ? (
                <div className="dayRight">
                  <div className="dayRightHeader">
                    <div className="rightDayLabel">{formatDayHeading(selectedDay)}</div>
                    <div className="dayRightCount">
                      {dayEvents.length} event{dayEvents.length === 1 ? "" : "s"}
                    </div>
                  </div>

                  {dayEvents.length === 0 ? (
                    <div className="emptyList">No events on this day.</div>
                  ) : (
                    <div className="dayRightList" role="list">
                      {dayEvents.map((e) => {
                        const key = e.uid ?? e.id;
                        const title = e.title || "Untitled event";
                        const d = safeDateFromEvent(e);
                        const timeLabel = d ? formatTimeShort(d) : "Time TBD";

                        return (
                          <button
                            key={key}
                            type="button"
                            className="dayRightRow"
                            data-past={eventHasEnded(e) ? "true" : "false"}
                            onClick={() => openSelected(key)}
                            role="listitem"
                          >
                            {eventEndedEarlierToday(e, selectedDay) ? (
                              <span className="eventEndedTag">ENDED</span>
                            ) : null}
                            <div className="dayRightTop">
                              <div className="dayRightTitle">{title}</div>
                              <div className="dayRightTime eventListingTime">{timeLabel}</div>
                            </div>
                            {e.event_type ? <div className="dayRightMeta"><span className="eventListingType">{e.event_type}</span></div> : null}
                            {e.locationName?.trim() ? (
                              <div className="dayRightLocation">
                                <EventListingLocation e={e} />
                              </div>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div key={detailFlashKey} className="rightHeader calendarListingDetailReveal">
                  <div className="rightDayLabel">{selectedEvent.event_type || "Event"}</div>

                  <h1 className="detailTitle">{selectedEvent.title || "Untitled event"}</h1>

                  <div className="detailMeta">
                    <span className="eventDetailMetaTime">{selectedTime}</span>
                    {selectedEvent.event_type ? (
                      <>
                        <span className="dot">•</span>
                        <span className="eventListingType">{selectedEvent.event_type}</span>
                      </>
                    ) : null}
                  </div>
                  {selectedEvent.locationName?.trim() || selectedEvent.address ? (
                    <div className="detailLocationBlock">
                      {selectedEvent.locationName?.trim() ? (
                        <div className="detailLocationName">
                          <EventDetailLocation e={selectedEvent} />
                        </div>
                      ) : null}
                      {selectedEvent.address ? <div className="detailAddress muted">{selectedEvent.address}</div> : null}
                    </div>
                  ) : null}

                  {/* Always render heroImage for placeholder behavior */}
                  <div
                    className="heroImage"
                    style={selectedImg ? { backgroundImage: `url(${selectedImg})` } : undefined}
                  />

                  {selectedEvent.summary ? <p className="summary">{selectedEvent.summary}</p> : null}

                  {selectedDesc ? <div className="detailBody">{selectedDesc}</div> : null}

                  {/* Extra media / rich blocks from Prismic slices (gallery, video, embeds, etc.) */}
                  <MediaBlocks slices={(selectedEvent as any)?.content_blocks} />

                  {(selectedEvent.website_url || selectedEvent.tickets_url) ? (
                    <div className="ctaRow">
                      <a
                        className="ctaBtn"
                        data-disabled={selectedEvent.website_url ? "false" : "true"}
                        href={selectedEvent.website_url || "#"}
                        target={selectedEvent.website_url ? "_blank" : undefined}
                        rel={selectedEvent.website_url ? "noreferrer" : undefined}
                        onClick={(ev) => {
                          if (!selectedEvent.website_url) ev.preventDefault();
                        }}
                      >
                        Website
                      </a>

                      <a
                        className="ctaBtn"
                        data-disabled={selectedEvent.tickets_url ? "false" : "true"}
                        href={selectedEvent.tickets_url || "#"}
                        target={selectedEvent.tickets_url ? "_blank" : undefined}
                        rel={selectedEvent.tickets_url ? "noreferrer" : undefined}
                        onClick={(ev) => {
                          if (!selectedEvent.tickets_url) ev.preventDefault();
                        }}
                      >
                        Tickets
                      </a>
                    </div>
                  ) : null}
                  {otherVenueEvents.length ? (
                    <section className="eventDetailOtherVenue" aria-label={`Other upcoming events at ${otherVenueHeading}`}>
                      <div className="eventDetailOtherVenue__label">Other upcoming events at {otherVenueHeading}</div>
                      <ul className="locationPageUpcomingList eventDetailOtherVenue__list">
                        {otherVenueEvents.map((e) => {
                          const href = `/?event=${encodeURIComponent(e.uid ?? e.id)}`;
                          const d = safeDateFromEvent(e);
                          const time =
                            d != null
                              ? d.toLocaleString(undefined, {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                })
                              : "";
                          return (
                            <li key={e.id}>
                              <Link className="locationPageUpcomingLink" href={href}>
                                <span className="locationPageUpcomingTitle">{e.title || "Event"}</span>
                                {time ? <span className="locationPageUpcomingMeta muted">{time}</span> : null}
                                {e.event_type ? <span className="locationPageUpcomingType">{e.event_type}</span> : null}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : null}
                </div>
              )}
            </div>
          </main>
        ) : null}
      </div>

      {/* Mobile bottom tabs — portaled to body so position:fixed anchors to the viewport (shell transforms otherwise clip/push tabs). */}
      {effectiveIsMobile && mobileTabsPortalReady
        ? createPortal(
            selectedEvent ? (
              <div className="mobileTabs mobileTabsDetail mobileTabDock" aria-label="Event navigation">
                <SegmentedControl
                  className="segmentedControl--mobile segmentedControl--detail"
                  ariaLabel="Event navigation"
                  currentKey="cal"
                  visualKeyOverride={mobileDetailVisualKey}
                  pendingOverride={mobileDetailNavPending}
                  items={[
                    {
                      key: "previous",
                      label: "Prev.",
                      onClick: () => {
                        if (!previousEventKey) return;
                        setMobileDetailVisualKey("previous");
                        setMobileDetailNavPending(true);
                        openSelected(previousEventKey);
                      },
                      disabled: !previousEventKey,
                    },
                    {
                      key: "cal",
                      label: "Cal.",
                      onClick: () => {
                        exitMobileEventDetailToCalendarList();
                      },
                    },
                    {
                      key: "next",
                      label: "Next",
                      onClick: () => {
                        if (!nextEventKey) return;
                        setMobileDetailVisualKey("next");
                        setMobileDetailNavPending(true);
                        openSelected(nextEventKey);
                      },
                      disabled: !nextEventKey,
                    },
                  ]}
                />
              </div>
            ) : mobileSpotlightOpen ? null : (
              <div className="mobileTabs mobilePrimaryTabs mobileTabDock" aria-label="Primary navigation">
                <SegmentedControl
                  className="segmentedControl--mobile"
                  ariaLabel="Primary navigation"
                  currentKey={resolvedSection}
                  items={[
                    { key: "calendar", label: "Calendar", href: "/" },
                    { key: "directory", label: "Directory", href: "/locations" },
                    { key: "updates", label: "Updates", href: "/updates" },
                  ]}
                />
              </div>
            ),
            document.body,
          )
        : null}

      {effectiveIsMobile && mobileTabsPortalReady && mobileWeekCategoryStickyEnabled && mobileDetailOpen && selectedWeekBucket
        ? createPortal(
            <>
              <button
                type="button"
                className={`mobileWeekCategorySheetBackdrop${mobileWeeklyStickySheetsOpen ? " mobileWeekCategorySheetBackdrop--open" : ""}`}
                aria-label="Close menu"
                tabIndex={mobileWeeklyStickySheetsOpen ? 0 : -1}
                onClick={() => {
                  setMobileWeekCategorySheetOpen(false);
                  setMobileWeekPickerSheetOpen(false);
                }}
              />
              <div
                className={["mobileWeekCategoryStickyBar", mobileWeekCategorySticky ? "mobileWeekCategoryStickyBar--visible" : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="mobileWeekCategoryStickyBar__row">
                  <button
                    type="button"
                    className="mobileWeekCategoryStickyBar__btn"
                    aria-expanded={mobileWeekCategorySheetOpen}
                    onClick={() => {
                      setMobileWeekPickerSheetOpen(false);
                      setMobileWeekCategorySheetOpen((o) => !o);
                    }}
                  >
                    Category
                    <span className="mobileWeekCategoryStickyBar__chev" aria-hidden>
                      {mobileWeekCategorySheetOpen ? "▾" : "▸"}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="mobileWeekCategoryStickyBar__btn mobileWeekCategoryStickyBar__btn--week"
                    aria-expanded={mobileWeekPickerSheetOpen}
                    onClick={() => {
                      setMobileWeekCategorySheetOpen(false);
                      setMobileWeekPickerSheetOpen((o) => !o);
                    }}
                  >
                    <span className="mobileWeekCategoryStickyBar__weekLabel">Week</span>
                    <span className="mobileWeekCategoryStickyBar__weekRange">{selectedWeekBucket.rangeLabel}</span>
                    <span className="mobileWeekCategoryStickyBar__chev" aria-hidden>
                      {mobileWeekPickerSheetOpen ? "▾" : "▸"}
                    </span>
                  </button>
                </div>
              </div>
              <div
                className={["mobileWeekCategorySheet", mobileWeekCategorySheetOpen ? "mobileWeekCategorySheet--open" : ""]
                  .filter(Boolean)
                  .join(" ")}
                role="dialog"
                aria-label="Weekly overview categories"
              >
                <div className="mobileWeekCategorySheet__inner">
                  <button
                    type="button"
                    className="weekSummaryCard weekSummaryCardButton mobileWeekCategorySheet__total"
                    data-active={weekCategorySelection.size === 0 ? "true" : "false"}
                    onClick={() => {
                      selectAllWeekCategories();
                      setMobileWeekCategorySheetOpen(false);
                    }}
                  >
                    <div className="weekSummaryKicker">All events</div>
                    <div className="weekSummaryValue">{selectedWeekBucket.events.length}</div>
                  </button>
                  <div className="weekCategoryFilters weekCategoryFilters--sheet weekCategoryFilters--sheetMulti" role="group" aria-label="Categories">
                    {weekCategoryOptions.map((category) => {
                      const isActive = weekCategorySelection.has(category);
                      const count = selectedWeekBucket.insights[category] ?? 0;
                      return (
                        <button
                          key={category}
                          type="button"
                          className="weekCategoryFilterBtn"
                          data-active={isActive ? "true" : "false"}
                          aria-pressed={isActive}
                          onClick={() => toggleWeekCategory(category)}
                        >
                          <div className="weekSummaryKicker">{category}</div>
                          <div className="weekSummaryValue weekCategoryFilterCount">{count}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div
                className={["mobileWeekPickerSheet", mobileWeekPickerSheetOpen ? "mobileWeekPickerSheet--open" : ""]
                  .filter(Boolean)
                  .join(" ")}
                role="dialog"
                aria-label="Choose week"
              >
                <div className="mobileWeekPickerSheet__inner">
                  {weekBuckets.map((bucket) => {
                    const active = selectedWeekBucket?.key === bucket.key;
                    return (
                      <button
                        key={bucket.key}
                        type="button"
                        className="mobileWeekPickerSheet__option"
                        data-active={active ? "true" : "false"}
                        onClick={() => {
                          openWeek(bucket.key);
                          setMobileWeekPickerSheetOpen(false);
                        }}
                      >
                        <span className="mobileWeekPickerSheet__optionTitle">{bucket.label}</span>
                        <span className="mobileWeekPickerSheet__optionRange muted">{bucket.rangeLabel}</span>
                        <span className="mobileWeekPickerSheet__optionCount">{bucket.events.length} events</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>,
            document.body,
          )
        : null}

      {/* Mobile detail overlay */}
      <div
        className="mobileDetail"
        data-open={mobileDetailOpen ? "true" : "false"}
        data-spotlight-no-tabs={mobileSpotlightOpen && !selectedEvent ? "true" : "false"}
        aria-hidden={!mobileDetailOpen}
        role="dialog"
        aria-modal={mobileDetailOpen ? "true" : "false"}
      >
        <div className="scroll mobileDetailScroll mobileListingContentScroll" ref={mobileDetailScrollRef}>
          {selectedEvent ? (
            <>
              <div className="mobileListingContentBackWrap">
                <MobileContentBackButton onBack={handleMobileDetailBack} />
              </div>
              <div key={detailFlashKey} className="detailCard mobileEventDetailCard calendarListingDetailReveal calendarListingDetailReveal--mobile">
              <div className="detailTitle">{selectedEvent.title ?? selectedEvent.summary ?? "Untitled event"}</div>
              <div className="detailMeta">
                <span className="muted eventDetailMetaTime">{selectedTime ?? "Time TBD"}</span>
                {selectedEvent.event_type ? <span className="badge">{selectedEvent.event_type}</span> : null}
              </div>
              {selectedEvent.locationName?.trim() || selectedEvent.address ? (
                <div className="detailLocationBlock detailLocationBlock--mobile">
                  {selectedEvent.locationName?.trim() ? (
                    <div className="detailLocationName">
                      <EventDetailLocation e={selectedEvent} />
                    </div>
                  ) : null}
                  {selectedEvent.address ? <div className="detailAddress muted">{selectedEvent.address}</div> : null}
                </div>
              ) : null}
              {selectedImg ? (
                <div className="media16x9 mobileEventHero">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedImg} alt="" />
                </div>
              ) : null}
              {selectedEvent.summary ? (
                <p className="summary mobileEventSummary">{selectedEvent.summary}</p>
              ) : null}
              {selectedDesc ? (
                <div className="detailBody mobileEventDetailBody">
                  <p>{selectedDesc}</p>
                </div>
              ) : selectedEvent.summary ? null : (
                <div className="detailBody mobileEventDetailBody">
                  <p className="muted">No description yet.</p>
                </div>
              )}
              <MediaBlocks slices={(selectedEvent as any)?.content_blocks} />
              {(selectedEvent.website_url || selectedEvent.tickets_url) ? (
                <div className="ctaRow">
                  {selectedEvent.website_url ? (
                    <a className="ctaBtn" href={selectedEvent.website_url} target="_blank" rel="noreferrer">Website</a>
                  ) : null}
                  {selectedEvent.tickets_url ? (
                    <a className="ctaBtn" href={selectedEvent.tickets_url} target="_blank" rel="noreferrer">Tickets</a>
                  ) : null}
                </div>
              ) : null}
              {otherVenueEvents.length ? (
                <section className="eventDetailOtherVenue" aria-label={`Other upcoming events at ${otherVenueHeading}`}>
                  <div className="eventDetailOtherVenue__label">Other upcoming events at {otherVenueHeading}</div>
                  <ul className="locationPageUpcomingList eventDetailOtherVenue__list">
                    {otherVenueEvents.map((e) => {
                      const href = `/?event=${encodeURIComponent(e.uid ?? e.id)}`;
                      const d = safeDateFromEvent(e);
                      const time =
                        d != null
                          ? d.toLocaleString(undefined, {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })
                          : "";
                      return (
                        <li key={e.id}>
                          <Link className="locationPageUpcomingLink locationPageUpcomingLink--stacked" href={href}>
                            <span className="locationPageUpcomingTitle">{e.title || "Event"}</span>
                            <span className="locationPageUpcomingLink__metaRow">
                              {time ? <span className="locationPageUpcomingMeta muted">{time}</span> : null}
                              {e.event_type ? <span className="locationPageUpcomingType">{e.event_type}</span> : null}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : null}
            </div>
            </>
          ) : selectedDisplayKey === GOING_NOW_KEY ? (
            <div className="weeklyOverviewLanding mobileWeeklyOverviewOpen mobileGoingNowOpen weeklyOverviewRevealGroup">
              <div className="mobileListingContentBackWrap">
                <MobileContentBackButton onBack={handleMobileDetailBack} />
              </div>
              <div className="weekSummary fadeInItem" style={{ animationDelay: "140ms" }}>
                <div className="weekSummaryTopline">
                  <div>
                    <div className="rightDayLabel">Going on now</div>
                    <h3 className="weekSummaryTitle">Live now</h3>
                  </div>
                  <div className="weekSummaryRangePill">{liveEventsNow.length} live</div>
                </div>
              </div>
              <div className="weeklyLanding fadeInItem" style={{ animationDelay: "200ms" }}>
                {liveEventsNow.length === 0 ? (
                  <div className="emptyRight">Nothing scheduled as happening right now.</div>
                ) : (
                  <div className="weeklyCards">
                    {liveEventsNow.map((e) => {
                      const title = e.title || "Untitled event";
                      const d = safeDateFromEvent(e);
                      const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                      const desc = (pickDescriptionText(e) || e.summary || "").trim();
                      const img = pickImageUrl(e);
                      return (
                        <button
                          key={e.id}
                          type="button"
                          className="weeklyCard weeklyCardSelectable"
                          data-past={eventHasEnded(e) ? "true" : "false"}
                          onClick={() => openSelected(e.uid ?? e.id)}
                        >
                          <div className="weeklyCardMedia">
                            {img ? (
                              <div className="media16x9">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="weeklyThumb" src={img} alt="" />
                              </div>
                            ) : (
                              <div className="media16x9 weeklyThumbPlaceholder" aria-hidden />
                            )}
                          </div>
                          <div className="weeklyCardContent weeklyCardContentExpanded">
                            <div className="weeklyCardTop">
                              <div className="weeklyCardTitleCol">
                                {e.event_type ? <div className="weeklyCardTag">{e.event_type}</div> : null}
                                <div className="weeklyCardTitleWrap">
                                  <div className="weeklyCardTitle">{title}</div>
                                  <div className="weeklyCardTime eventListingTime">{timeLabel}</div>
                                </div>
                              </div>
                              {e.tickets_url || e.website_url ? (
                                <div className="weeklyCardActions weeklyCardActions--listingCorner">
                                  {e.tickets_url ? (
                                    <a
                                      className="weeklyMiniBtn"
                                      href={e.tickets_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(ev) => ev.stopPropagation()}
                                    >
                                      Tickets
                                    </a>
                                  ) : null}
                                  {e.website_url ? (
                                    <a
                                      className="weeklyMiniBtn"
                                      href={e.website_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(ev) => ev.stopPropagation()}
                                    >
                                      Website
                                    </a>
                                  ) : null}
                                </div>
                              ) : null}
                            </div>
                            <div className="weeklyCardMetaRow">
                              {e.locationName?.trim() ? <EventListingLocation e={e} /> : null}
                            </div>
                            {desc ? <div className="weeklyCardDesc">{desc.length > 180 ? `${desc.slice(0, 180).trim()}…` : desc}</div> : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : selectedWeekBucket ? (
            <div className="weeklyOverviewLanding mobileWeeklyOverviewOpen weeklyOverviewRevealGroup">
              <div className="mobileListingContentBackWrap">
                <MobileContentBackButton onBack={handleMobileDetailBack} />
              </div>

              <div className="weekSelectorRail weekSelectorRailMobile fadeInItem" style={{ animationDelay: "40ms" }}>
                {weekBuckets.map((bucket) => (
                  <button
                    key={bucket.key}
                    type="button"
                    className="weekSelectorCard"
                    data-active={selectedWeekBucket.key === bucket.key ? "true" : "false"}
                    onClick={() => openWeek(bucket.key)}
                  >
                    <div className="weekSelectorEyebrow">{bucket.label}</div>
                    <div className="weekSelectorRange">{bucket.rangeLabel}</div>
                    <div className="weekSelectorMeta">{bucket.events.length} event{bucket.events.length === 1 ? "" : "s"}</div>
                  </button>
                ))}
              </div>

              <div className="mobileWeeklyOverviewIntro fadeInItem" style={{ animationDelay: "120ms" }}>
                <div className="weekSummary">
                  <div className="weekSummaryTopline">
                    <div>
                      <div className="rightDayLabel">Weekly Overview</div>
                      <h3 className="weekSummaryTitle">{selectedWeekBucket.label}</h3>
                    </div>
                    <div className="weekSummaryRangePill">{selectedWeekBucket.rangeLabel}</div>
                  </div>
                </div>
              </div>

              <div className="weekSummary fadeInItem" style={{ animationDelay: "80ms" }}>
                <div className="weekCategoryChipGrid weekCategoryChipGrid--mobile" role="group" aria-label="Filter events by category (choose one or more)">
                  <button
                    type="button"
                    aria-pressed={weekCategorySelection.size === 0}
                    className="weekCategoryChip"
                    data-active={weekCategorySelection.size === 0 ? "true" : "false"}
                    onClick={selectAllWeekCategories}
                  >
                    <span className="weekCategoryChip__label">All</span>
                    <span className="weekCategoryChip__count">{selectedWeekBucket.events.length}</span>
                  </button>
                  {weekCategoryOptions.map((category) => {
                    const isActive = weekCategorySelection.has(category);
                    const count = selectedWeekBucket.insights[category] ?? 0;
                    return (
                      <button
                        key={category}
                        type="button"
                        aria-pressed={isActive}
                        className="weekCategoryChip"
                        data-active={isActive ? "true" : "false"}
                        onClick={() => toggleWeekCategory(category)}
                      >
                        <span className="weekCategoryChip__label">{category}</span>
                        <span className="weekCategoryChip__count">{count}</span>
                      </button>
                    );
                  })}
                </div>
                <div ref={weekCategorySentinelRef} className="weekCategoryStickySentinel" aria-hidden />
              </div>

              <section
                className={`weekAnnouncements weekAnnouncements--strip weekAnnouncements--collapsible mobileWeekAnnouncements${
                  pinnedAnnouncementsExpanded ? " weekAnnouncements--expanded" : " weekAnnouncements--collapsed"
                }`}
                aria-label="Pinned announcements"
              >
                <button
                  type="button"
                  className="weekAnnouncementsCollapseToggle"
                  aria-expanded={pinnedAnnouncementsExpanded}
                  aria-controls="pinned-week-announcements-panel-mobile"
                  onClick={() => setPinnedAnnouncementsExpanded((v) => !v)}
                >
                  <span className="weekSummaryKicker">Pinned announcements</span>
                  <span className="weekAnnouncementsCollapseAction">
                    {pinnedAnnouncementsExpanded ? "Show less" : "See all"}
                  </span>
                </button>
                <div id="pinned-week-announcements-panel-mobile" className="weekAnnouncementsCollapseBody">
                  {weekAnnouncements.length ? (
                    weekAnnouncements.map((update) => (
                      <button
                        key={update.id}
                        type="button"
                        className="weekAnnouncementCard"
                        onClick={() => router.push(`/updates?u=${encodeURIComponent(update.id)}`)}
                      >
                        <div className="weekAnnouncementTop">
                          <div className="weekAnnouncementTitle">{update.title}</div>
                          {update.date ? <div className="weekAnnouncementDate">{update.date}</div> : null}
                        </div>
                        {update.summary ? <div className="weekAnnouncementText">{update.summary}</div> : null}
                      </button>
                    ))
                  ) : (
                    <div className="weekAnnouncementEmpty">Add or pin updates in the CMS to feature them here.</div>
                  )}
                </div>
                <Link href="/updates" className="weekAnnouncementsAllUpdates">
                  Updates
                </Link>
              </section>

              <div className="weeklyLanding fadeInItem" style={{ animationDelay: "260ms" }}>
                {filteredWeekEvents.length && !effectiveIsMobile ? (
                  <WeeklyPreviewRail itemCount={filteredWeekEvents.length}>
                    {filteredWeekEvents.map((e) => {
                      const title = e.title || "Untitled event";
                      const d = safeDateFromEvent(e);
                      const img = pickImageUrl(e);
                      const desc = pickDescriptionText(e);
                      return (
                        <button
                          key={`preview-${e.id}`}
                          type="button"
                          className="weeklyPreviewCard"
                          onClick={() => openSelected(e.uid ?? e.id)}
                        >
                          <div className="weeklyPreviewMedia">
                            {img ? (
                              <div className="media16x9">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="weeklyThumb" src={img} alt="" />
                              </div>
                            ) : (
                              <div className="media16x9 weeklyThumbPlaceholder" aria-hidden />
                            )}
                          </div>
                          <div className="weeklyPreviewContent">
                            <div className="weeklyPreviewTime eventListingTime">
                              {d ? `${formatDayHeading(d)} • ${formatTimeShort(d)}` : "Time TBD"}
                            </div>
                            <div className="weeklyPreviewTitle">{title}</div>
                            {e.event_type || e.locationName?.trim() ? (
                              <div className="weeklyPreviewMeta">
                                {e.event_type ? <span className="eventListingType">{e.event_type}</span> : null}
                                {e.event_type && e.locationName?.trim() ? <span className="dot"> • </span> : null}
                                {e.locationName?.trim() ? <EventListingLocation e={e} /> : null}
                              </div>
                            ) : null}
                            {desc ? <div className="weeklyPreviewDesc">{desc.length > 110 ? `${desc.slice(0, 110).trim()}…` : desc}</div> : null}
                          </div>
                        </button>
                      );
                    })}
                  </WeeklyPreviewRail>
                ) : null}

                {weeklyHasEarlierDays ? (
                  <p className="weeklyEarlierDaysHint" role="note">
                    Earlier days are above — scroll up for past listings (muted).
                  </p>
                ) : null}
                <div className="weeklyCards">
                  {weekGroups.map((g) => {
                    const dk = dayKey(g.date);
                    return (
                      <div
                        key={dk}
                        className="weeklyDayGroup"
                        ref={(node) => {
                          weeklyDayGroupRefs.current[dk] = node;
                        }}
                      >
                        <div className="weeklyCondensedDayTitle">{formatDayHeading(g.date)}</div>
                        {g.items.map((e) => {
                          const title = e.title || "Untitled event";
                          const d = safeDateFromEvent(e);
                          const timeLabel = d ? formatTimeShort(d) : "Time TBD";
                          const desc = pickDescriptionText(e);
                          const img = pickImageUrl(e);
                          return (
                            <button
                              key={e.id}
                              type="button"
                              className="weeklyCard weeklyCardSelectable"
                              data-past={eventHasEnded(e) ? "true" : "false"}
                              onClick={() => openSelected(e.uid ?? e.id)}
                            >
                              <div className="weeklyCardMedia">
                                {img ? (
                                  <div className="media16x9">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img className="weeklyThumb" src={img} alt="" />
                                  </div>
                                ) : (
                                  <div className="media16x9 weeklyThumbPlaceholder" aria-hidden />
                                )}
                              </div>
                              <div className="weeklyCardContent weeklyCardContentExpanded">
                                <div className="weeklyCardTop">
                                  <div className="weeklyCardTitleCol">
                                    {e.event_type ? <div className="weeklyCardTag">{e.event_type}</div> : null}
                                    <div className="weeklyCardTitleWrap">
                                      <div className="weeklyCardTitle">{title}</div>
                                      <div className="weeklyCardTime eventListingTime">{timeLabel}</div>
                                    </div>
                                  </div>
                                  {e.tickets_url || e.website_url ? (
                                    <div className="weeklyCardActions weeklyCardActions--listingCorner">
                                      {e.tickets_url ? (
                                        <a
                                          className="weeklyMiniBtn"
                                          href={e.tickets_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          onClick={(ev) => ev.stopPropagation()}
                                        >
                                          Tickets
                                        </a>
                                      ) : null}
                                      {e.website_url ? (
                                        <a
                                          className="weeklyMiniBtn"
                                          href={e.website_url}
                                          target="_blank"
                                          rel="noreferrer"
                                          onClick={(ev) => ev.stopPropagation()}
                                        >
                                          Website
                                        </a>
                                      ) : null}
                                    </div>
                                  ) : null}
                                </div>
                                <div className="weeklyCardMetaRow">
                                  {e.locationName?.trim() ? <EventListingLocation e={e} /> : null}
                                </div>
                                {desc ? <div className="weeklyCardDesc">{desc.length > 180 ? `${desc.slice(0, 180).trim()}…` : desc}</div> : null}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

</div>
    </>
  );
}
