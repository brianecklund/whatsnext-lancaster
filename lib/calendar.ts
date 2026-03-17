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
