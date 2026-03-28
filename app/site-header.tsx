"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { DEFAULT_THEME, THEME_PALETTES, type ThemeKey } from "./theme-palettes";

const DESKTOP_LINKS = [
  { href: "/donate", label: "Donate" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const MOBILE_LINKS = [
  { href: "/", label: "Calendar" },
  { href: "/locations", label: "Directory" },
  { href: "/updates", label: "Updates" },
  { href: "/donate", label: "Donate" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function ThemeIcon({ theme }: { theme: ThemeKey }) {
  switch (theme) {
    case "paper-ink":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.4" fill="currentColor" />
        </svg>
      );
    case "night-shift":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15.8 3.6a8.9 8.9 0 1 0 4.6 16.3A9.6 9.6 0 0 1 15.8 3.6Z" fill="currentColor" />
        </svg>
      );
    case "moss-stone":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3.8c4.7 0 8.5 3.8 8.5 8.5S16.7 20.8 12 20.8 3.5 17 3.5 12.3 7.3 3.8 12 3.8Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 6.2c-1.9 2.1-3 4-3 5.8 0 1.9 1.3 3.3 3 3.3s3-1.4 3-3.3c0-1.8-1.1-3.7-3-5.8Z" fill="currentColor" />
        </svg>
      );
    case "ocean-blueprint":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 14c1.6-1.8 3.2-2.7 4.8-2.7S12 12.2 13.6 14c1.6 1.8 3.2 2.7 4.8 2.7 1 0 2-.3 3-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 9c1.6-1.8 3.2-2.7 4.8-2.7S12 7.2 13.6 9c1.6 1.8 3.2 2.7 4.8 2.7 1 0 2-.3 3-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "rose-room":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 20.2s-6.6-4.1-6.6-9.2c0-2.1 1.7-3.8 3.8-3.8 1.2 0 2.2.5 2.8 1.4.6-.9 1.6-1.4 2.8-1.4 2.1 0 3.8 1.7 3.8 3.8 0 5.1-6.4 9.2-6.6 9.2Z" fill="currentColor" />
        </svg>
      );
    case "ember-signal":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3 14.3 9.2 21 12l-6.7 2.8L12 21l-2.3-6.2L3 12l6.7-2.8L12 3Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const sp = useSearchParams();
  const [open, setOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [themeMenuClosing, setThemeMenuClosing] = useState(false);
  const menuCloseTimerRef = useRef<number | null>(null);
  const themeCloseTimerRef = useRef<number | null>(null);
  const [flashKey, setFlashKey] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(DEFAULT_THEME);

  const MOBILE_SHEET_CLOSE_MS = 320;

  const clearMenuCloseTimer = useCallback(() => {
    if (menuCloseTimerRef.current != null) {
      window.clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
  }, []);

  const clearThemeCloseTimer = useCallback(() => {
    if (themeCloseTimerRef.current != null) {
      window.clearTimeout(themeCloseTimerRef.current);
      themeCloseTimerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (!open || menuClosing) return;
    setMenuClosing(true);
    clearMenuCloseTimer();
    menuCloseTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setMenuClosing(false);
      menuCloseTimerRef.current = null;
    }, MOBILE_SHEET_CLOSE_MS);
  }, [open, menuClosing, clearMenuCloseTimer]);

  const closeThemeMenu = useCallback(() => {
    if (!themeMenuOpen || themeMenuClosing) return;
    setThemeMenuClosing(true);
    clearThemeCloseTimer();
    themeCloseTimerRef.current = window.setTimeout(() => {
      setThemeMenuOpen(false);
      setThemeMenuClosing(false);
      themeCloseTimerRef.current = null;
    }, MOBILE_SHEET_CLOSE_MS);
  }, [themeMenuOpen, themeMenuClosing, clearThemeCloseTimer]);

  useEffect(() => {
    return () => {
      clearMenuCloseTimer();
      clearThemeCloseTimer();
    };
  }, [clearMenuCloseTimer, clearThemeCloseTimer]);

  const currentThemeLabel = useMemo(
    () => THEME_PALETTES.find((theme) => theme.key === currentTheme)?.name ?? "Theme",
    [currentTheme],
  );

  useEffect(() => {
    clearMenuCloseTimer();
    clearThemeCloseTimer();
    setMenuClosing(false);
    setThemeMenuClosing(false);
    setOpen(false);
    setThemeMenuOpen(false);
    setFlashKey((k) => k + 1);

    if (typeof document !== "undefined") {
      const isShellRoute = pathname === "/" || pathname?.startsWith("/locations") || pathname?.startsWith("/updates");
      document.body.dataset.layout = isShellRoute ? "shell" : "content";
    }
  }, [pathname, clearMenuCloseTimer, clearThemeCloseTimer]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("wnl-theme") as ThemeKey | null;
      const initial = THEME_PALETTES.some((theme) => theme.key === stored) ? stored! : DEFAULT_THEME;
      setCurrentTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch {
      setCurrentTheme(DEFAULT_THEME);
      document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    }
  }, []);

  useEffect(() => {
    if (!open && !themeMenuOpen && !menuClosing && !themeMenuClosing) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open, themeMenuOpen, menuClosing, themeMenuClosing]);

  function applyTheme(theme: ThemeKey) {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("wnl-theme", theme);
    } catch {}
  }

  function cycleTheme() {
    const currentIndex = THEME_PALETTES.findIndex((theme) => theme.key === currentTheme);
    const nextTheme = THEME_PALETTES[(currentIndex + 1 + THEME_PALETTES.length) % THEME_PALETTES.length];
    applyTheme(nextTheme.key);
  }

  function onThemeButtonPress() {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 980px)").matches) {
      clearMenuCloseTimer();
      setMenuClosing(false);
      setOpen(false);
      clearThemeCloseTimer();
      setThemeMenuClosing(false);
      setThemeMenuOpen(true);
      return;
    }
    cycleTheme();
  }

  const clockHref = useMemo(() => {
    const base = "/clock";
    if (pathname !== "/") return base;

    const params = new URLSearchParams();
    const day = sp.get("day");
    const event = sp.get("event");
    if (day) params.set("day", day);
    if (event) params.set("event", event);

    const q = params.toString();
    return q ? `${base}?${q}` : base;
  }, [pathname, sp]);

  return (
    <header className="siteHeader">
      <Link className="brand" href="/" aria-label="What’s Next Lancaster">
        <span className="brandFull">What’s Next Lancaster</span>
        <span className="brandShort" aria-hidden>
          What’s Next
        </span>
      </Link>

      <nav className="topNav" aria-label="Primary">
        {DESKTOP_LINKS.map((l, idx) => (
          <Link
            key={l.href}
            className="navLink"
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

      <div className="headerActions">
        <button
          type="button"
          className="themeToggleBtn"
          aria-label={`Change color palette. Current palette: ${currentThemeLabel}`}
          title={`Palette: ${currentThemeLabel}`}
          onClick={onThemeButtonPress}
        >
          <span className="themeToggleIcon" aria-hidden>
            <ThemeIcon theme={currentTheme} />
          </span>
        </button>

        <button
          type="button"
          className="clockToggleBtn"
          aria-label="Open calendar clock"
          title="Clock view"
          onClick={() => router.push(clockHref)}
        >
          <span className="clockToggleIcon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7.8v4.7l3.2 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <button
          type="button"
          className="hamburgerBtn"
          data-open={open ? "true" : "false"}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open ? "true" : "false"}
          onClick={() => {
            clearThemeCloseTimer();
            setThemeMenuClosing(false);
            setThemeMenuOpen(false);
            if (open) {
              closeMenu();
            } else {
              clearMenuCloseTimer();
              setMenuClosing(false);
              setOpen(true);
            }
          }}
        >
          <span className="hamburgerIcon" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className={`mobileSheetOverlay mobileMenuOverlay mobileSheetOverlay--fromNav${menuClosing ? " mobileSheetOverlay--closing" : ""}`}
              role="dialog"
              aria-modal="true"
              onClick={() => closeMenu()}
            >
              <div className="mobileSheet mobileMenuSheet" onClick={(e) => e.stopPropagation()}>
                <div className="mobileSheetHeader">
                  <div className="mobileSheetTitle">Menu</div>
                  <button
                    type="button"
                    className="mobileSheetClose"
                    onClick={() => closeMenu()}
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                <nav className="mobileSheetList mobileMenuList" aria-label="Mobile primary">
                  {MOBILE_LINKS.map((l, idx) => (
                    <Link
                      key={l.href}
                      className="mobileSheetAction mobileMenuAction"
                      href={l.href}
                      data-active={pathname === l.href ? "true" : "false"}
                      style={{ ["--menuIndex" as string]: idx } as CSSProperties}
                      onClick={() => closeMenu()}
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

      {themeMenuOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className={`mobileSheetOverlay mobileThemeOverlay mobileSheetOverlay--fromNav${themeMenuClosing ? " mobileSheetOverlay--closing" : ""}`}
              role="dialog"
              aria-modal="true"
              onClick={() => closeThemeMenu()}
            >
              <div className="mobileSheet mobileThemeSheet" onClick={(e) => e.stopPropagation()}>
                <div className="mobileSheetHeader">
                  <div className="mobileSheetTitle">Choose palette</div>
                  <button
                    type="button"
                    className="mobileSheetClose"
                    onClick={() => closeThemeMenu()}
                    aria-label="Close color palette menu"
                  >
                    ✕
                  </button>
                </div>

                <div className="mobileSheetList mobileThemeList" aria-label="Color palettes">
                  {THEME_PALETTES.map((theme) => (
                    <button
                      key={theme.key}
                      type="button"
                      className="mobileSheetAction mobileThemeAction"
                      data-active={currentTheme === theme.key ? "true" : "false"}
                      onClick={() => {
                        applyTheme(theme.key);
                        closeThemeMenu();
                      }}
                    >
                      <span className="mobileThemeActionMain">
                        <span className="mobileThemeIcon" aria-hidden>
                          <ThemeIcon theme={theme.key} />
                        </span>
                        <span>{theme.name}</span>
                      </span>
                      <span className="mobileThemeSwatches" aria-hidden>
                        <span className="mobileThemeSwatch swatchOne" />
                        <span className="mobileThemeSwatch swatchTwo" />
                        <span className="mobileThemeSwatch swatchThree" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
