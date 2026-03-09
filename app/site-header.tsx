"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Calendar" },
  { href: "/locations", label: "Directory" },
  { href: "/updates", label: "Updates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [flashKey, setFlashKey] = useState(0);


  // Close the overlay on route changes
  useEffect(() => {
    setOpen(false);
    // Trigger a re-mount on the 3 primary buttons only (Calendar/Directory/Updates)
    // so only those "flash in" on route changes.
    setFlashKey((k) => k + 1);
  }, [pathname]);

  // Prevent background scroll when overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="siteHeader">
      <a className="brand" href="/" aria-label="What’s Next Lancaster">
        <span className="brandFull">What’s Next Lancaster</span>
        <span className="brandShort" aria-hidden>
          What’s Next Lancaster
        </span>
      </a>

      {/* Desktop nav */}
      <nav className="topNav" aria-label="Primary">
        {LINKS.map((l, idx) => (
          <a
            key={idx < 3 ? `${l.href}-${flashKey}` : l.href}
            className={idx < 3 ? "navLink navFlash" : "navLink"}
            href={l.href}
            data-active={pathname === l.href ? "true" : "false"}
          >
            <span className="navLinkText">{l.label}</span>
            <span className="navLinkIcon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="hamburgerBtn"
        data-open={open ? "true" : "false"}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="hamburgerIcon" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* Mobile overlay */}
      {open ? (
        <div className="menuOverlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="menuOverlayInner" onClick={(e) => e.stopPropagation()}>
            <div className="menuOverlayHeader">
              <div className="menuOverlayTitle">Menu</div>
              <button
                type="button"
                className="menuCloseBtn"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="menuOverlayNav" aria-label="Mobile primary">
              {LINKS.map((l, idx) => (
                <a
                  key={l.href}
                  className="menuOverlayLink"
                  href={l.href}
                  data-active={pathname === l.href ? "true" : "false"}
                  style={{ ["--menuIndex" as string]: idx } as CSSProperties}
                >
                  <span className="menuOverlayLinkText">{l.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
