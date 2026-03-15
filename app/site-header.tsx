"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
      <Link className="brand" href="/" aria-label="What’s Next Lancaster">
        <span className="brandFull">What’s Next Lancaster</span>
        <span className="brandShort" aria-hidden>
          What’s Next
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="topNav" aria-label="Primary">
        {LINKS.map((l, idx) => (
          <Link
            key={idx < 3 ? `${l.href}-${flashKey}` : l.href}
            className={idx < 3 ? "navLink navFlash" : "navLink"}
            href={l.href}
            data-active={pathname === l.href ? "true" : "false"}
            onClick={() => setOpen(false)}
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
          </Link>
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
      {open && typeof document !== "undefined"
        ? createPortal(
            <div className="mobileSheetOverlay mobileMenuOverlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
              <div className="mobileSheet mobileMenuSheet" onClick={(e) => e.stopPropagation()}>
                <div className="mobileSheetHeader">
                  <div className="mobileSheetTitle">Menu</div>
                  <button
                    type="button"
                    className="mobileSheetClose"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                <nav className="mobileSheetList mobileMenuList" aria-label="Mobile primary">
                  {LINKS.map((l, idx) => (
                    <Link
                      key={l.href}
                      className="mobileSheetAction mobileMenuAction"
                      href={l.href}
                      data-active={pathname === l.href ? "true" : "false"}
                      style={{ ["--menuIndex" as string]: idx } as CSSProperties}
                      onClick={() => setOpen(false)}
                    >
                      <span className="mobileMenuActionText">{l.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
