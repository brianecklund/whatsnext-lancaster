"use client";

import NewsTickerBar from "./components/NewsTickerBar";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useSmoothWheel } from "@/app/components/useSmoothWheel";
import MediaBlocks from "@/app/components/MediaBlocks";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

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
};

const WEEKLY_KEY = "__weekly__";

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

function safeDateFromEvent(e: EventLite): Date | null {
  const raw = e.start_datetime || e.end_datetime;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
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

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function nearestDayWithEvents(events: EventLite[]): Date {
  const today = startOfToday();
  const dated = events
    .map((e) => safeDateFromEvent(e))
    .filter((d): d is Date => !!d)
    .sort((a, b) => a.getTime() - b.getTime());

  if (!dated.length) return today;

  const todayMatch = dated.find((d) => dayKey(d) === dayKey(today));
  if (todayMatch) return startOfDay(todayMatch);

  const upcoming = dated.find((d) => d.getTime() >= today.getTime());
  if (upcoming) return startOfDay(upcoming);

  return startOfDay(dated[dated.length - 1]);
}

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
  const buckets = { "Live music": 0, "Food & drink": 0, "Community": 0, "Other": 0 };
  const timeWindows = { Morning: 0, Afternoon: 0, Evening: 0, Late: 0 };
  const dayCounts = new Map<string, { date: Date; count: number }>();

  for (const e of items) {
    const t = (e.event_type || "").toLowerCase();
    if (t.includes("music") || t.includes("concert") || t.includes("show")) buckets["Live music"]++;
    else if (t.includes("food") || t.includes("drink") || t.includes("dining") || t.includes("menu")) buckets["Food & drink"]++;
    else if (t.includes("community") || t.includes("market") || t.includes("fundraiser") || t.includes("family")) buckets["Community"]++;
    else buckets["Other"]++;

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

export default function HomeSplitClient({ events }: Props) {
  useSmoothWheel(".scroll");
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const q = sp.get("q") || "";
  const type = sp.get("type") || "";
  const view = sp.get("view") || "list";
  const dayParam = sp.get("day");

  const listRef = useRef<HTMLDivElement | null>(null);
  const daySectionRefs = useRef<Record<string, HTMLElement | null>>({});
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

  const viewMode: "list" | "month" = view === "month" ? "month" : "list";
  const selectedDisplayKey = selectedKey ?? (!effectiveIsMobile && viewMode === "list" ? WEEKLY_KEY : null);

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
      const matchesType = !norm(type) || norm(e.event_type ?? "") === norm(type);
      return matchesSearch && matchesType;
    });

    return nearestDayWithEvents(source);
  }, [dayParam, events, q, type]);

  const selectedDayStr = dayKey(selectedDay);
  const monthAnchor = useMemo(() => {
    const d = new Date(selectedDay);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [selectedDayStr]);


  // Mobile-only: hide the subhead tagline when the user starts scrolling the left list.
  const [taglineHidden, setTaglineHidden] = useState(false);

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
  }, [effectiveIsMobile, q, type, viewMode, filterOpen]);

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
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
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

  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) if (e.event_type) set.add(e.event_type);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [events]);

  const filteredEvents = useMemo(() => {
    const nq = norm(q);
    const nt = norm(type);

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
      const matchesType = !nt || norm(e.event_type ?? "") === nt;
      return matchesSearch && matchesType;
    });
  }, [events, q, type]);

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



  const currentWeekRange = useMemo(() => {
    const today = startOfToday();
    const start = startOfWeekSundayFromDate(today);
    const end = endOfWeekSaturdayFromDate(today);
    return { start, end };
  }, []);

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

    const anchorIndex = groups.findIndex((g) => dayKey(g.date) === selectedDayStr);
    if (anchorIndex <= 0) return groups;

    return [...groups.slice(anchorIndex), ...groups.slice(0, anchorIndex)];
  }, [filteredEvents, selectedDayStr]);

  const currentWeekDayGroups = useMemo(() => {
    const start = currentWeekRange.start;
    const end = currentWeekRange.end;
    return leftDayGroups.filter((group) => group.date.getTime() >= start.getTime() && group.date.getTime() <= end.getTime());
  }, [currentWeekRange, leftDayGroups]);

  const dayJumpDates = useMemo(() => {
    const map = new Map<number, Date>();
    for (const group of currentWeekDayGroups) {
      const idx = group.date.getDay();
      if (!map.has(idx)) map.set(idx, group.date);
    }
    return DAY_ABBR.map((label, idx) => ({ label, index: idx, date: map.get(idx) ?? null }));
  }, [currentWeekDayGroups]);

  function getListScrollOffset() {
    const stickyH = leftStickyRef.current?.offsetHeight ?? 0;
    return Math.max(stickyH + 10, 24);
  }


  useEffect(() => {
    const root = listRef.current;
    if (!root || didInitialScroll || viewMode !== "list" || !leftDayGroups.length) return;

    root.scrollTop = 0;
    setScrollDayKey(selectedDayStr);
    setDidInitialScroll(true);
  }, [didInitialScroll, leftDayGroups, selectedDayStr, viewMode]);

  useEffect(() => {
    if (dayParam) setDidInitialScroll(true);
  }, [dayParam]);

  function syncVisibleDayFromScroll(scrollTop: number) {
    const root = listRef.current;
    if (!root) return;
    const threshold = scrollTop + getListScrollOffset() + 16;
    let active = currentWeekDayGroups[0]?.date ? dayKey(currentWeekDayGroups[0].date) : null;

    for (const group of currentWeekDayGroups) {
      const key = dayKey(group.date);
      const el = daySectionRefs.current[key];
      if (!el) continue;
      if (el.offsetTop <= threshold) active = key;
      else break;
    }

    if (active && active !== scrollDayKey) setScrollDayKey(active);
  }

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

  const selectedWeekIndex = useMemo(() => {
    if (!selectedWeekBucket) return -1;
    return weekBuckets.findIndex((bucket) => bucket.key === selectedWeekBucket.key);
  }, [selectedWeekBucket, weekBuckets]);

  const previousWeekKey =
    selectedWeekIndex > 0 ? weekBuckets[selectedWeekIndex - 1]?.key ?? null : null;
  const nextWeekKey =
    selectedWeekIndex >= 0 && selectedWeekIndex < weekBuckets.length - 1
      ? weekBuckets[selectedWeekIndex + 1]?.key ?? null
      : null;

  const weekEvents = selectedWeekBucket?.events ?? [];
  const weekEventsCount = weekEvents.length;
  const weekLabel = selectedWeekBucket?.rangeLabel ?? defaultWeekBucket?.rangeLabel ?? "";
  const weekInsights = selectedWeekBucket?.insights ?? ({ "Live music": 0, "Food & drink": 0, "Community": 0, "Other": 0 } as Record<string, number>);
  const weekGroups = selectedWeekBucket?.groups ?? [];

  const selectedEvent = useMemo(() => {
    if (!filteredEvents.length) return null;
    if (selectedDisplayKey === WEEKLY_KEY) return null;

    const byUid =
      selectedDisplayKey && filteredEvents.find((e) => e.uid && e.uid === selectedDisplayKey);
    const byId = selectedDisplayKey && filteredEvents.find((e) => e.id === selectedDisplayKey);

    return byUid || byId || null;
  }, [filteredEvents, selectedDisplayKey]);

  const currentDisplayDayKey = useMemo(() => {
    if (selectedEvent) {
      const d = safeDateFromEvent(selectedEvent);
      if (d) return dayKey(d);
    }
    return scrollDayKey ?? selectedDayStr;
  }, [scrollDayKey, selectedDayStr, selectedEvent]);

  
  const detailFlashKey = useMemo(() => {
    if (!selectedEvent) return "none";
    return `${selectedEvent.uid ?? selectedEvent.id ?? "event"}|${selectedDisplayKey}|${viewMode}|${q}|${type}`;
  }, [selectedEvent, selectedDisplayKey, viewMode, q, type]);

// stagger counter for left list
  let listAnimIndex = 0;

  // Close filter overlay when leaving mobile.
  useEffect(() => {
    if (!effectiveIsMobile) setFilterOpen(false);
  }, [effectiveIsMobile]);

  // On mobile, ensure route switches (Calendar/Directory/Updates) never carry a stuck detail overlay.
  useEffect(() => {
    if (!effectiveIsMobile) return;
    setClientSelectedKey(null);
    if (sp.get("event")) setParam("event", null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Ensure tagline is visible again when leaving mobile.
  useEffect(() => {
    if (!effectiveIsMobile) setTaglineHidden(false);
  }, [effectiveIsMobile]);

const mobileWeeklyOpen =
    effectiveIsMobile && !!selectedDisplayKey && (selectedDisplayKey === WEEKLY_KEY || selectedDisplayKey.startsWith("__week__:"));

  const mobileDetailOpen =
    effectiveIsMobile && (!!selectedEvent || mobileWeeklyOpen);

useEffect(() => {
  if (typeof document === "undefined") return;
  if (!mobileDetailOpen) {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    return;
  }
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };
}, [mobileDetailOpen]);

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
      .map(({ event, date }) => ({
        label: event.event_type ? event.event_type.toUpperCase() : "NEWS",
        text: `${event.title ?? event.summary ?? "Upcoming event"} • ${event.locationName ?? "Lancaster"} • ${formatTimeLabel(date)}`,
        href: "#",
      }));

    return upcoming.length
      ? upcoming
      : [
          { label: "NEWS", text: "Upcoming Lancaster events, specials, and pop-ups.", href: "#" },
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

  function openSelected(key: string) {
    setClientSelectedKey(key);
    setParam("event", key);
  }

  function openWeek(key: string) {
    setClientSelectedKey(key);
    setParam("event", key);
  }

  return (<>
    {!(effectiveIsMobile && mobileDetailOpen) ? (
      <NewsTickerBar
        introText="A calendar of events, specials, and pop-ups in Lancaster, PA."
        items={newsTickerItems}
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
              <div className="leftSticky" ref={leftStickyRef}>
                <div className="tabs" aria-label="Primary navigation">
                  <button
                    type="button"
                    className="tabBtn"
                    data-active={pathname === "/" ? "true" : "false"}
                    onClick={() => router.push("/")}
                  >
                    Calendar
                  </button>
                  <button
                    type="button"
                    className="tabBtn"
                    data-active={pathname?.startsWith("/locations") ? "true" : "false"}
                    onClick={() => router.push("/locations")}
                  >
                    Directory
                  </button>
                  <button
                    type="button"
                    className="tabBtn"
                    data-active={pathname?.startsWith("/updates") ? "true" : "false"}
                    onClick={() => router.push("/updates")}
                  >
                    Updates
                  </button>
                </div>

                <div className="leftControls">
                  <div className="calendarToolbar">
                    <div className="dayJumpRail" aria-label="Jump to day">
                      {dayJumpDates.map((entry) => {
                        const isActive = currentDisplayDayKey
                          ? entry.date
                            ? dayKey(entry.date) === currentDisplayDayKey
                            : entry.index === parseDayKey(currentDisplayDayKey)?.getDay()
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
                        className={`viewBtn ${effectiveIsMobile ? "viewBtnSquare viewBtnIcon" : ""}`}
                        aria-label={viewMode === "month" ? "Switch to list view" : "Switch to calendar view"}
                        onClick={() => {
                          clearSelected();
                          setFilterOpen(false);
                          setParam("view", viewMode === "month" ? "list" : "month");
                        }}
                      >
                        {effectiveIsMobile ? (
                          <span className="controlIconWrap" aria-hidden="true">
                            <img src="/calendar-mobile.svg" alt="" className="controlIcon" />
                          </span>
                        ) : (
                          viewMode === "month" ? "List view" : "Calendar view"
                        )}
                      </button>
                      {effectiveIsMobile ? (
                        <button
                          type="button"
                          className="filterBtn filterBtnSquare filterBtnIcon"
                          aria-label={filterOpen ? "Close filters" : "Open filters"}
                          aria-expanded={filterOpen ? "true" : "false"}
                          data-active={filterOpen || !!type ? "true" : "false"}
                          onClick={() => setFilterOpen((v) => !v)}
                        >
                          <span className="controlIconWrap" aria-hidden="true">
                            <img src="/filter-mobile.svg" alt="" className="controlIcon" />
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="filterBtn filterBtnSquare"
                          aria-label={filterOpen ? "Close filters" : "Open filters"}
                          aria-expanded={filterOpen ? "true" : "false"}
                          data-active={filterOpen || !!type ? "true" : "false"}
                          onClick={() => setFilterOpen((v) => !v)}
                        >
                          {type ? "F*" : "F"}
                        </button>
                      )}
                      {!effectiveIsMobile && (q || type) ? (
                        <button
                          className="clearBtn"
                          onClick={() => {
                            setParam("q", null);
                            setParam("type", null);
                          }}
                          type="button"
                        >
                          Clear
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

              </div>

              {!effectiveIsMobile ? (
                <div
                  className="filterDropdown"
                  data-open={filterOpen ? "true" : "false"}
                  aria-hidden={filterOpen ? "false" : "true"}
                >
                  <div className="filterDropdownInner">
                    <div className="typePills" role="group" aria-label="Event type filters">
                      <button
                        type="button"
                        className="typePill"
                        data-active={!type ? "true" : "false"}
                        onClick={() => {
                          setParam("type", null);
                          setFilterOpen(false);
                        }}
                      >
                        All
                      </button>
                      {eventTypes.map((t) => {
                        const on = norm(type) === norm(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            className="typePill"
                            data-active={on ? "true" : "false"}
                            onClick={() => {
                              setParam("type", on ? null : t);
                              setFilterOpen(false);
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    {(q || type) ? (
                      <button
                        type="button"
                        className="filterDropdownClear"
                        onClick={() => {
                          setParam("q", null);
                          setParam("type", null);
                          setFilterOpen(false);
                        }}
                      >
                        Clear search & filters
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* Mobile filter overlay */}
              {effectiveIsMobile && filterOpen ? (
                <div
                  className="filterOverlay"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Filters"
                  onClick={() => setFilterOpen(false)}
                >
                  <div className="filterOverlayPanel" onClick={(e) => e.stopPropagation()}>
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

                    {(q || type) ? (
                      <button
                        type="button"
                        className="filterOverlayClear"
                        onClick={() => {
                          setParam("q", null);
                          setParam("type", null);
                          setFilterOpen(false);
                        }}
                      >
                        Clear search & filters
                      </button>
                    ) : null}

                    <div className="typePills" role="group" aria-label="Event type filters">
                      <button
                        type="button"
                        className="typePill"
                        data-active={!type ? "true" : "false"}
                        onClick={() => {
                          setParam("type", null);
                          setFilterOpen(false);
                        }}
                      >
                        All
                      </button>
                      {eventTypes.map((t) => {
                        const on = norm(type) === norm(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            className="typePill"
                            data-active={on ? "true" : "false"}
                            onClick={() => {
                              setParam("type", on ? null : t);
                              setFilterOpen(false);
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : null}

              {viewMode === "list" ? (
                <>
                  {/* Weekly Overview (left) */}
                  <button
                    type="button"
                    className="weeklyOverview fadeInItem"
                    style={{ animationDelay: `${listAnimIndex++ * 35}ms` }}
                    data-active={selectedDisplayKey === WEEKLY_KEY ? "true" : "false"}
                    onClick={() => openWeek(WEEKLY_KEY)}
                  >
                    <div className="weeklyTitle">Weekly Overview</div>
                    <div className="weeklyCount">
                      {defaultWeekBucket?.events.length ?? 0} event{(defaultWeekBucket?.events.length ?? 0) === 1 ? "" : "s"} left this week
                    </div>
                  </button>

{leftDayGroups.length === 0 ? (
                <div className="emptyList">No events match your search.</div>
              ) : null}

              {/* Left list */}
              {leftDayGroups.map((g) => (
                <section key={dayKey(g.date)} className="dayBlock" ref={(el) => { daySectionRefs.current[dayKey(g.date)] = el; }}>
                  <div className="dayTitle">{formatDayHeading(g.date)}</div>

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
                        onClick={() => {
                          const key = e.uid ?? e.id;
                          setClientSelectedKey(key);
                          setParam("event", key);
                          
                        }}
                        type="button"
                      >
                        <div className="eventRowTitle">{title}</div>
                        <div className="eventRowMeta">
                          <span>{timeLabel}</span>
                          {e.event_type ? <span className="dot">•</span> : null}
                          {e.event_type ? <span>{e.event_type}</span> : null}
                        </div>
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
              ) : (
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
                            const venueBits = [e.locationName, e.event_type].filter(Boolean).join(" • ");
                            return (
                              <button
                                key={key}
                                type="button"
                                className="eventCard"
                                onClick={() => {
                                  setClientSelectedKey(key);
                                  setParam("event", key);
                                }}
                              >
                                <div className="eventCardTitle">{title}</div>
                                <div className="eventMeta">{timeLabel}{venueBits ? ` • ${venueBits}` : ""}</div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : null}
                </>
              )}



            </div>
          </aside>
        ) : null}

        {/* RIGHT */}
        {showRight ? (
          <main className="pane paneRight">
            <div className="scroll">


              {viewMode === "month" ? (
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
                        const venueBits = [e.locationName, e.event_type].filter(Boolean).join(" • ");

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
                            <div className="dayRightTop">
                              <div className="dayRightTitle">{title}</div>
                              <div className="dayRightTime">{timeLabel}</div>
                            </div>
                            {venueBits ? <div className="dayRightMeta">{venueBits}</div> : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}


              {viewMode === "list" && selectedWeekBucket ? (
                <div className="rightHeader weeklyOverviewLanding">
                  <div
                    className="rightDayLabel fadeInItem"
                    style={{ animationDelay: "260ms" }}
                  >
                    Weekly Overview
                  </div>

                  <div className="weekSelectorRail fadeInItem" style={{ animationDelay: "320ms" }}>
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

                  <div className="weekSummary fadeInItem" style={{ animationDelay: "360ms" }}>
                    <div className="weekSummaryTopline">
                      <div>
                        <h3 className="weekSummaryTitle">{selectedWeekBucket.label}</h3>
                        <p className="weekSummarySubhead">
                          Week of {weekLabel}. Browse the current week plus the next four weeks, then open a week for a fuller breakdown.
                        </p>
                      </div>
                      <div className="weekSummaryRangePill">{selectedWeekBucket.rangeLabel}</div>
                    </div>

                    <div className="weekSummaryGrid" role="list">
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Total events</div>
                        <div className="weekSummaryValue">{weekEventsCount}</div>
                      </div>
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Live music</div>
                        <div className="weekSummaryValue">{weekInsights["Live music"]}</div>
                      </div>
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Food &amp; drink</div>
                        <div className="weekSummaryValue">{weekInsights["Food & drink"]}</div>
                      </div>
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Community</div>
                        <div className="weekSummaryValue">{weekInsights["Community"]}</div>
                      </div>
                    </div>

                    <div className="weekSummaryGrid weekSummaryGridSecondary" role="list">
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Busiest day</div>
                        <div className="weekSummaryValueSmall">{selectedWeekBucket.busiestDayLabel}</div>
                      </div>
                      <div className="weekSummaryCard" role="listitem">
                        <div className="weekSummaryKicker">Peak time</div>
                        <div className="weekSummaryValueSmall">{selectedWeekBucket.peakWindowLabel}</div>
                      </div>
                    </div>
                  </div>

                  {weekEventsCount === 0 ? (
                    <div className="emptyRight">No events scheduled for this week yet.</div>
                  ) : (
                    <div className="weeklyLanding fadeInItem" style={{ animationDelay: "420ms" }}>
                      <div className="weeklyInsightsBar" aria-label="Week visualizations">
                        {Object.entries(weekInsights).map(([label, rawCount]) => {
                          const count = Number(rawCount) || 0;
                          return (
                          <div key={label} className="weeklyInsightMetric">
                            <div className="weeklyInsightTop">
                              <span>{label}</span>
                              <span>{count}</span>
                            </div>
                            <div className="weeklyInsightTrack">
                              <span
                                className="weeklyInsightFill"
                                style={{
                                  width: `${weekEventsCount ? Math.max((count / weekEventsCount) * 100, count > 0 ? 12 : 0) : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                        })}
                      </div>

                      <div className="weeklyCards">
                        {weekGroups.map((g) => (
                          <div key={dayKey(g.date)} className="weeklyDayGroup">
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
                                      <div className="weeklyCardTitleWrap">
                                        <div className="weeklyCardTitle">{title}</div>
                                        <div className="weeklyCardTime">{timeLabel}</div>
                                      </div>

                                      {e.tickets_url || e.website_url ? (
                                        <div className="weeklyCardActions">
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
                                      {[e.locationName, e.event_type].filter(Boolean).join(" • ")}
                                    </div>
                                    {desc ? <div className="weeklyCardDesc">{desc.length > 200 ? `${desc.slice(0, 200).trim()}…` : desc}</div> : null}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                        const venueBits = [e.locationName, e.event_type].filter(Boolean).join(" • ");

                        return (
                          <button
                            key={key}
                            type="button"
                            className="dayRightRow"
                            onClick={() => openSelected(key)}
                            role="listitem"
                          >
                            <div className="dayRightTop">
                              <div className="dayRightTitle">{title}</div>
                              <div className="dayRightTime">{timeLabel}</div>
                            </div>
                            {venueBits ? <div className="dayRightMeta">{venueBits}</div> : null}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="rightHeader">
                  <div
                    className="rightDayLabel fadeInItem"
                    style={{ animationDelay: "260ms" }}
                  >
                    {selectedEvent.event_type || "Event"}
                  </div>

                  <h1 className="detailTitle fadeInItem" style={{ animationDelay: "320ms" }}>
                    {selectedEvent.title || "Untitled event"}
                  </h1>

                  <div className="detailMeta fadeInItem" style={{ animationDelay: "360ms" }}>
                    <span>{selectedTime}</span>
                    {selectedEvent.locationName ? (
                      <>
                        <span className="dot">•</span>
                        {selectedEvent.locationUrl ? (
                          <a className="venue link" href={selectedEvent.locationUrl}>
                            {selectedEvent.locationName}
                          </a>
                        ) : (
                          <span className="venue">{selectedEvent.locationName}</span>
                        )}
                      </>
                    ) : null}
                    {selectedEvent.address ? (
                      <>
                        <span className="dot">•</span>
                        <span className="muted">{selectedEvent.address}</span>
                      </>
                    ) : null}
                  </div>

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
                </div>
              )}
            </div>
          </main>
        ) : null}
      </div>

      {/* Mobile bottom tabs */}
      {effectiveIsMobile && !mobileDetailOpen ? (
        <div className="mobileTabs" aria-label="Primary navigation">
          <button
            type="button"
            className="tabBtn"
            data-active={pathname === "/" ? "true" : "false"}
            onClick={() => router.push("/")}
          >
            Calendar
          </button>
          <button
            type="button"
            className="tabBtn"
            data-active={pathname?.startsWith("/locations") ? "true" : "false"}
            onClick={() => router.push("/locations")}
          >
            Directory
          </button>
          <button
            type="button"
            className="tabBtn"
            data-active={pathname?.startsWith("/updates") ? "true" : "false"}
            onClick={() => router.push("/updates")}
          >
            Updates
          </button>
        </div>
      ) : null}

      {/* Mobile detail overlay */}
      <div
        className="mobileDetail"
        data-open={mobileDetailOpen ? "true" : "false"}
        aria-hidden={!mobileDetailOpen}
        role="dialog"
        aria-modal={mobileDetailOpen ? "true" : "false"}
      >
        <div className="scroll mobileDetailScroll">
          {selectedEvent ? (
            <div key={detailFlashKey} className="detailCard detailFlash mobileEventDetailCard">
              <div className="detailTitle">{selectedEvent.title ?? selectedEvent.summary ?? "Untitled event"}</div>
              <div className="detailMeta">
                <span className="muted">{selectedTime ?? "Time TBD"}</span>
                {selectedEvent.event_type ? <span className="badge">{selectedEvent.event_type}</span> : null}
              </div>
              {selectedImg ? (
                <div className="media16x9 mobileEventHero">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedImg} alt="" />
                </div>
              ) : null}
              {selectedDesc ? (
                <div className="detailBody mobileEventDetailBody">
                  <p>{selectedDesc}</p>
                </div>
              ) : (
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
            </div>
          ) : selectedWeekBucket ? (
            <div className="weeklyOverviewLanding mobileWeeklyOverviewOpen">
              <div className="weekSummary fadeInItem" style={{ animationDelay: "180ms" }}>
                <div className="weekSummaryTopline">
                  <div>
                    <div className="rightDayLabel">Weekly Overview</div>
                    <h3 className="weekSummaryTitle">{selectedWeekBucket.label}</h3>
                  </div>
                  <div className="weekSummaryRangePill">{selectedWeekBucket.rangeLabel}</div>
                </div>

                <div className="weekSummaryGrid" role="list">
                  <div className="weekSummaryCard" role="listitem">
                    <div className="weekSummaryKicker">Events</div>
                    <div className="weekSummaryValue">{selectedWeekBucket.events.length}</div>
                  </div>
                  <div className="weekSummaryCard" role="listitem">
                    <div className="weekSummaryKicker">Live music</div>
                    <div className="weekSummaryValue">{weekInsights["Live music"]}</div>
                  </div>
                  <div className="weekSummaryCard" role="listitem">
                    <div className="weekSummaryKicker">Food & drink</div>
                    <div className="weekSummaryValue">{weekInsights["Food & drink"]}</div>
                  </div>
                </div>
              </div>

              <div className="weeklyLanding fadeInItem" style={{ animationDelay: "260ms" }}>
                <div className="weeklyCards">
                  {weekGroups.map((g) => (
                    <div key={dayKey(g.date)} className="weeklyDayGroup">
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
                                <div className="weeklyCardTitleWrap">
                                  <div className="weeklyCardTitle">{title}</div>
                                  <div className="weeklyCardTime">{timeLabel}</div>
                                </div>
                              </div>
                              <div className="weeklyCardMetaRow">{[e.locationName, e.event_type].filter(Boolean).join(" • ")}</div>
                              {desc ? <div className="weeklyCardDesc">{desc.length > 180 ? `${desc.slice(0, 180).trim()}…` : desc}</div> : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {effectiveIsMobile && mobileDetailOpen ? (
          mobileWeeklyOpen ? (
            <div className="mobileTabsDetail" aria-label="Week navigation">
              <button
                type="button"
                className="tabBtn"
                onClick={() => previousWeekKey && openWeek(previousWeekKey)}
                disabled={!previousWeekKey}
                aria-disabled={!previousWeekKey}
              >
                Previous
              </button>
              <button
                type="button"
                className="tabBtn"
                onClick={clearSelected}
              >
                Cal
              </button>
              <button
                type="button"
                className="tabBtn"
                onClick={() => nextWeekKey && openWeek(nextWeekKey)}
                disabled={!nextWeekKey}
                aria-disabled={!nextWeekKey}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="mobileTabsDetail" aria-label="Event navigation">
              <button
                type="button"
                className="tabBtn"
                onClick={() => previousEventKey && openSelected(previousEventKey)}
                disabled={!previousEventKey}
                aria-disabled={!previousEventKey}
              >
                Previous
              </button>
              <button
                type="button"
                className="tabBtn"
                onClick={clearSelected}
              >
                Cal
              </button>
              <button
                type="button"
                className="tabBtn"
                onClick={() => nextEventKey && openSelected(nextEventKey)}
                disabled={!nextEventKey}
                aria-disabled={!nextEventKey}
              >
                Next
              </button>
            </div>
          )
        ) : null}
      </div>

</div>
    </>
  );
}
