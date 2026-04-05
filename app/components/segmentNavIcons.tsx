import type { ReactNode } from "react";

const svgProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

export function SegmentIconCalendar(): ReactNode {
  return (
    <svg {...svgProps}>
      <path
        d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SegmentIconDirectory(): ReactNode {
  return (
    <svg {...svgProps}>
      <path
        d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function SegmentIconUpdates(): ReactNode {
  return (
    <svg {...svgProps}>
      <path
        d="M6 8a6 6 0 0112 0v9l-6 3-6-3V8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function SegmentIconChevronLeft(): ReactNode {
  return (
    <svg {...svgProps}>
      <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SegmentIconChevronRight(): ReactNode {
  return (
    <svg {...svgProps}>
      <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const hubClass = "hubSpotlightGlyphSvg";

export function HubIconWeekly(): ReactNode {
  return (
    <svg className={hubClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 012 2v11H6a2 2 0 01-2-2V7a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HubIconGoingNow(): ReactNode {
  return (
    <svg className={hubClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M13 2L3 14h7l-1 8 11-13h-7l0-7z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HubIconBlog(): ReactNode {
  return (
    <svg className={hubClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M4 6.5A2.5 2.5 0 016.5 4H18v14a2 2 0 01-2 2H6.5A2.5 2.5 0 014 17.5v-11z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" />
    </svg>
  );
}

export function HubIconPartners(): ReactNode {
  return (
    <svg className={hubClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M10 13a5 5 0 007.07 0l1.41-1.41a5 5 0 000-7.07 5 5 0 00-7.07 0M14 11a5 5 0 00-7.07 0l-1.41 1.41a5 5 0 000 7.07 5 5 0 007.07 0"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HubIconSeason(): ReactNode {
  return (
    <svg className={hubClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M12 3v4M12 17v4M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M3 12h4M17 12h4M5.6 18.4l2.9-2.9M15.5 8.5l2.9-2.9"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.65" />
    </svg>
  );
}
