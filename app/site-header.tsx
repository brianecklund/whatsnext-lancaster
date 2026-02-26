"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const THEMES = [
  { key: "theme-ink", label: "Ink" },
  { key: "theme-moss", label: "Moss" },
  { key: "theme-plum", label: "Plum" },
  { key: "theme-amber", label: "Amber" },
];

const LINKS = [
  { href: "/", label: "Calendar" },
  { href: "/locations", label: "Directory" },
  { href: "/updates", label: "Updates" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [themeIdx, setThemeIdx] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wnl_theme");
      if (saved) {
        const idx = THEMES.findIndex((t) => t.key === saved);
        if (idx >= 0) setThemeIdx(idx);
        document.documentElement.classList.remove(...THEMES.map((t) => t.key));
        document.documentElement.classList.add(saved);
      } else {
        document.documentElement.classList.remove(...THEMES.map((t) => t.key));
        document.documentElement.classList.add(THEMES[0].key);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const key = THEMES[themeIdx]?.key || THEMES[0].key;
      document.documentElement.classList.remove(...THEMES.map((t) => t.key));
      document.documentElement.classList.add(key);
      localStorage.setItem("wnl_theme", key);
    } catch {}
  }, [themeIdx]);

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

      <button
        type="button"
        className="paletteBtn"
        onClick={() => setThemeIdx((i) => (i + 1) % THEMES.length)}
        aria-label="Change color palette"
        title="Change color palette"
      >
        <span className="paletteDot" aria-hidden />
        <span className="paletteLabel">{THEMES[themeIdx]?.label || "Theme"}</span>
      </button>


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
