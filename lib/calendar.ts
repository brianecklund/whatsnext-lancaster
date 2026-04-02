export type CalendarEventLite = {
  start_datetime?: string | null;
  end_datetime?: string | null;
};

export function safeDateFromEvent<T extends CalendarEventLite>(e: T): Date | null {
  const raw = e.start_datetime || e.end_datetime;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function eventHasEnded<T extends CalendarEventLite>(e: T, now = Date.now()): boolean {
  const raw = e.end_datetime || e.start_datetime;
  if (!raw) return false;
  const d = new Date(raw);
  return !Number.isNaN(d.getTime()) && d.getTime() < now;
}

/** True when local time is between start and end (or within a short window after start if no end). */
export function eventHappeningNow<T extends CalendarEventLite>(e: T, nowMs = Date.now()): boolean {
  const start = safeDateFromEvent(e);
  if (!start) return false;
  const startMs = start.getTime();
  if (startMs > nowMs) return false;
  if (e.end_datetime) {
    const end = new Date(e.end_datetime);
    if (Number.isNaN(end.getTime())) return false;
    return nowMs <= end.getTime();
  }
  const assumedEndMs = startMs + 4 * 60 * 60 * 1000;
  return nowMs <= assumedEndMs;
}

export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

/** Ended event whose scheduled day is “today” — for same-day ENDED badges (not past days). */
export function eventEndedEarlierToday<T extends CalendarEventLite>(e: T, eventDay: Date, now = Date.now()): boolean {
  if (!eventHasEnded(e, now)) return false;
  return dayKey(eventDay) === dayKey(new Date(now));
}

export function startOfWeekSundayFromDate(d: Date): Date {
  const x = startOfDay(d);
  const offset = x.getDay();
  x.setDate(x.getDate() - offset);
  return x;
}

export function endOfWeekSaturdayFromDate(d: Date): Date {
  const start = startOfWeekSundayFromDate(d);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/** Count events whose start falls within the current calendar week (Sun–Sat, local). */
export function countEventsInCurrentWeek<T extends CalendarEventLite>(events: T[]): number {
  const now = new Date();
  const start = startOfWeekSundayFromDate(now);
  const end = endOfWeekSaturdayFromDate(now);
  let n = 0;
  for (const e of events) {
    const d = safeDateFromEvent(e);
    if (!d) continue;
    if (d.getTime() >= start.getTime() && d.getTime() <= end.getTime()) n++;
  }
  return n;
}

export function nearestDayWithEvents<T extends CalendarEventLite>(events: T[]): Date {
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
