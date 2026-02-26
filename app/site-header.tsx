"use client";

import { useEffect, useState } from "react";
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

  // Close the overlay on route changes
  useEffect(() => {
    setOpen(false);
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
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} data-active={pathname === l.href ? "true" : "false"}>
            {l.label}
          </a>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="hamburgerBtn"
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
        <div className="menuOverlay" role="dialog" aria-modal="true">
          <div className="menuOverlayInner">
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
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  className="menuOverlayLink"
                  href={l.href}
                  data-active={pathname === l.href ? "true" : "false"}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
