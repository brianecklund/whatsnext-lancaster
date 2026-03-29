"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DEFAULT_THEME, THEME_PALETTES, type ThemeKey } from "./theme-palettes";
import {
  FONT_OPTIONS,
  TEXT_SCALE_OPTIONS,
  applyA11yEnhancedFocus,
  applyA11yLinkUnderline,
  applyA11yReducedMotion,
  applyFontFamily,
  applyTextScale,
  applyTheme,
  type FontFamilyKey,
  type TextScaleKey,
} from "@/lib/site-preferences";

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

const SHEET_CLOSE_MS = 320;

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
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [settingsClosing, setSettingsClosing] = useState(false);
  const menuCloseTimerRef = useRef<number | null>(null);
  const settingsCloseTimerRef = useRef<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(DEFAULT_THEME);
  const [fontFamily, setFontFamily] = useState<FontFamilyKey>("default");
  const [textScale, setTextScale] = useState<TextScaleKey>("default");
  const [a11yMotion, setA11yMotion] = useState(false);
  const [a11yFocus, setA11yFocus] = useState(false);
  const [a11yLinks, setA11yLinks] = useState(false);

  const clearMenuCloseTimer = useCallback(() => {
    if (menuCloseTimerRef.current != null) {
      window.clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
  }, []);

  const clearSettingsCloseTimer = useCallback(() => {
    if (settingsCloseTimerRef.current != null) {
      window.clearTimeout(settingsCloseTimerRef.current);
      settingsCloseTimerRef.current = null;
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
    }, SHEET_CLOSE_MS);
  }, [open, menuClosing, clearMenuCloseTimer]);

  const closeSettings = useCallback(() => {
    if (!settingsOpen || settingsClosing) return;
    setSettingsClosing(true);
    clearSettingsCloseTimer();
    settingsCloseTimerRef.current = window.setTimeout(() => {
      setSettingsOpen(false);
      setSettingsClosing(false);
      settingsCloseTimerRef.current = null;
    }, SHEET_CLOSE_MS);
  }, [settingsOpen, settingsClosing, clearSettingsCloseTimer]);

  useEffect(() => {
    return () => {
      clearMenuCloseTimer();
      clearSettingsCloseTimer();
    };
  }, [clearMenuCloseTimer, clearSettingsCloseTimer]);

  const currentThemeLabel = useMemo(
    () => THEME_PALETTES.find((theme) => theme.key === currentTheme)?.name ?? "Theme",
    [currentTheme],
  );

  useEffect(() => {
    clearMenuCloseTimer();
    clearSettingsCloseTimer();
    setMenuClosing(false);
    setSettingsClosing(false);
    setOpen(false);
    setSettingsOpen(false);

    if (typeof document !== "undefined") {
      const isShellRoute = pathname === "/" || pathname?.startsWith("/locations") || pathname?.startsWith("/updates");
      document.body.dataset.layout = isShellRoute ? "shell" : "content";
    }
  }, [pathname, clearMenuCloseTimer, clearSettingsCloseTimer]);

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
    try {
      const f = window.localStorage.getItem("wnl-font") as FontFamilyKey | null;
      if (f && FONT_OPTIONS.some((o) => o.key === f)) setFontFamily(f);
    } catch {
      /* ignore */
    }
    try {
      const s = window.localStorage.getItem("wnl-text-scale") as TextScaleKey | null;
      if (s && TEXT_SCALE_OPTIONS.some((o) => o.key === s)) setTextScale(s);
    } catch {
      /* ignore */
    }
    setA11yMotion(window.localStorage.getItem("wnl-a11y-reduced-motion") === "1");
    setA11yFocus(window.localStorage.getItem("wnl-a11y-enhanced-focus") === "1");
    setA11yLinks(window.localStorage.getItem("wnl-a11y-link-underline") === "1");
  }, []);

  useEffect(() => {
    if (!open && !settingsOpen && !menuClosing && !settingsClosing) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open, settingsOpen, menuClosing, settingsClosing]);

  function onPickTheme(theme: ThemeKey) {
    setCurrentTheme(theme);
    applyTheme(theme);
  }

  return (
    <header className="siteHeader">
      <Link className="brand" href="/" aria-label="What’s Next Lancaster">
        <span className="brandFull">What’s Next Lancaster</span>
        <span className="brandShort" aria-hidden>
          What’s Next
        </span>
      </Link>

      <nav className="topNav" aria-label="Primary">
        {DESKTOP_LINKS.map((l) => (
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
          className="settingsBtn"
          aria-label="Settings"
          aria-expanded={settingsOpen ? "true" : "false"}
          aria-haspopup="dialog"
          title="Settings"
          onClick={() => {
            clearMenuCloseTimer();
            setMenuClosing(false);
            setOpen(false);
            if (settingsOpen) {
              closeSettings();
            } else {
              clearSettingsCloseTimer();
              setSettingsClosing(false);
              setSettingsOpen(true);
            }
          }}
        >
          <span className="settingsBtnIcon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.34 2.25a.75.75 0 0 1 .73.57l.26 1.08c.52.12 1.02.3 1.5.54l.98-.6a.75.75 0 0 1 .95.14l1.5 1.5a.75.75 0 0 1 .14.95l-.6.98c.24.48.42.98.54 1.5l1.08.26a.75.75 0 0 1 .57.73v2.12a.75.75 0 0 1-.57.73l-1.08.26a8.09 8.09 0 0 1-.54 1.5l.6.98a.75.75 0 0 1-.14.95l-1.5 1.5a.75.75 0 0 1-.95.14l-.98-.6c-.48.24-.98.42-1.5.54l-.26 1.08a.75.75 0 0 1-.73.57H9.66a.75.75 0 0 1-.73-.57l-.26-1.08a8.09 8.09 0 0 1-1.5-.54l-.98.6a.75.75 0 0 1-.95-.14l-1.5-1.5a.75.75 0 0 1-.14-.95l.6-.98a8.09 8.09 0 0 1-.54-1.5l-1.08-.26a.75.75 0 0 1-.57-.73V9.66a.75.75 0 0 1 .57-.73l1.08-.26c.12-.52.3-1.02.54-1.5l-.6-.98a.75.75 0 0 1 .14-.95l1.5-1.5a.75.75 0 0 1 .95-.14l.98.6c.48-.24.98-.42 1.5-.54l.26-1.08a.75.75 0 0 1 .73-.57h4.68ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
              />
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
            clearSettingsCloseTimer();
            setSettingsClosing(false);
            setSettingsOpen(false);
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
                  <button type="button" className="mobileSheetClose" onClick={() => closeMenu()} aria-label="Close menu">
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

      {settingsOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className={`mobileSheetOverlay settingsSheetOverlay mobileSheetOverlay--fromNav${settingsClosing ? " mobileSheetOverlay--closing" : ""}`}
              role="dialog"
              aria-modal="true"
              aria-label="Settings"
              onClick={() => closeSettings()}
            >
              <div className="mobileSheet settingsSheet" onClick={(e) => e.stopPropagation()}>
                <div className="mobileSheetHeader">
                  <div className="mobileSheetTitle">Settings</div>
                  <button type="button" className="mobileSheetClose" onClick={() => closeSettings()} aria-label="Close settings">
                    ✕
                  </button>
                </div>

                <div className="settingsSheetScroll">
                  <section className="settingsSection" aria-labelledby="settings-palette">
                    <h2 id="settings-palette" className="settingsSectionTitle">
                      Palette
                    </h2>
                    <p className="settingsSectionHint">Current: {currentThemeLabel}</p>
                    <div className="mobileSheetList mobileThemeList" aria-label="Color palettes">
                      {THEME_PALETTES.map((theme) => (
                        <button
                          key={theme.key}
                          type="button"
                          className="mobileSheetAction mobileThemeAction"
                          data-active={currentTheme === theme.key ? "true" : "false"}
                          onClick={() => onPickTheme(theme.key)}
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
                  </section>

                  <section className="settingsSection" aria-labelledby="settings-type">
                    <h2 id="settings-type" className="settingsSectionTitle">
                      Typography
                    </h2>
                    <div className="settingsFieldGroup">
                      <span className="settingsFieldLabel">Typeface</span>
                      <div className="settingsChipRow">
                        {FONT_OPTIONS.map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            className="settingsChip"
                            data-active={fontFamily === opt.key ? "true" : "false"}
                            onClick={() => {
                              setFontFamily(opt.key);
                              applyFontFamily(opt.key);
                            }}
                          >
                            {opt.label.replace("Default (Inter / Gabarito)", "Default")}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="settingsFieldGroup">
                      <span className="settingsFieldLabel">Text size</span>
                      <div className="settingsChipRow">
                        {TEXT_SCALE_OPTIONS.map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            className="settingsChip"
                            data-active={textScale === opt.key ? "true" : "false"}
                            onClick={() => {
                              setTextScale(opt.key);
                              applyTextScale(opt.key);
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="settingsSection" aria-labelledby="settings-a11y">
                    <h2 id="settings-a11y" className="settingsSectionTitle">
                      Accessibility
                    </h2>
                    <label className="settingsToggle">
                      <input
                        type="checkbox"
                        checked={a11yMotion}
                        onChange={(e) => {
                          const on = e.target.checked;
                          setA11yMotion(on);
                          applyA11yReducedMotion(on);
                        }}
                      />
                      <span>Reduce motion (minimize animations)</span>
                    </label>
                    <label className="settingsToggle">
                      <input
                        type="checkbox"
                        checked={a11yFocus}
                        onChange={(e) => {
                          const on = e.target.checked;
                          setA11yFocus(on);
                          applyA11yEnhancedFocus(on);
                        }}
                      />
                      <span>Stronger focus indicators</span>
                    </label>
                    <label className="settingsToggle">
                      <input
                        type="checkbox"
                        checked={a11yLinks}
                        onChange={(e) => {
                          const on = e.target.checked;
                          setA11yLinks(on);
                          applyA11yLinkUnderline(on);
                        }}
                      />
                      <span>Underline links</span>
                    </label>
                  </section>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
