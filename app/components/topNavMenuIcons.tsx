import type { ReactNode } from "react";

const strokeIcon = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

export function TopNavIconBlog(): ReactNode {
  return (
    <svg {...strokeIcon}>
      <path d="M4 6.5A2.5 2.5 0 016.5 4H18v14a2 2 0 01-2 2H6.5A2.5 2.5 0 014 17.5v-11z" />
      <path d="M8 9h8M8 12.5h6" />
    </svg>
  );
}

export function TopNavIconDonate(): ReactNode {
  return (
    <svg {...strokeIcon}>
      <path d="M12 6.2C10.2 4.2 7 4.5 7 7.4c0 2.6 2.3 4.7 5 7.6 2.7-2.9 5-5 5-7.6 0-2.9-3.2-3.2-5-1.2z" />
    </svg>
  );
}

export function TopNavIconAbout(): ReactNode {
  return (
    <svg {...strokeIcon}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 8h.01" />
    </svg>
  );
}

export function TopNavIconContact(): ReactNode {
  return (
    <svg {...strokeIcon}>
      <path d="M4 6h16v12H4V6z" />
      <path d="M4 8l8 6 8-6" />
    </svg>
  );
}

export function TopNavIconMockup(): ReactNode {
  return (
    <svg {...strokeIcon}>
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.2" />
      <path d="M11 5.6h2" />
      <path d="M12 18.7h.01" />
    </svg>
  );
}
