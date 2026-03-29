"use client";

import Link from "next/link";
import type { EventLite } from "@/lib/types";
import { dayKey, safeDateFromEvent } from "@/lib/calendar";

type Props = {
  event: EventLite;
  className?: string;
  children: React.ReactNode;
};

/**
 * Navigates to the calendar clock view for this event’s day (and highlights the event).
 */
export default function EventClockLink({ event, className, children }: Props) {
  const d = safeDateFromEvent(event);
  if (!d) return <span className={className}>{children}</span>;

  const day = dayKey(d);
  const id = String(event.uid ?? event.id);
  const href = `/?view=clock&day=${encodeURIComponent(day)}&event=${encodeURIComponent(id)}`;

  return (
    <Link
      href={href}
      className={["eventTimeLink", className].filter(Boolean).join(" ")}
      title="Open in clock view"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Link>
  );
}
