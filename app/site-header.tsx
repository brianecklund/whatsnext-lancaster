"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DEFAULT_THEME, THEME_PALETTES, THEME_PREVIEW_COLORS, type ThemeKey } from "./theme-palettes";
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

function SettingsPanel({
  currentTheme,
  currentThemeLabel,
  onPickTheme,
  fontFamily,
  setFontFamily,
  textScale,
  setTextScale,
  a11yMotion,
  setA11yMotion,
  a11yFocus,
  setA11yFocus,
  a11yLinks,
  setA11yLinks,
  paletteOpen,
  setPaletteOpen,
  typeOpen,
  setTypeOpen,
  a11yOpen,
  setA11yOpen,
  compactPalette,
}: {
  currentTheme: ThemeKey;
  currentThemeLabel: string;
  onPickTheme: (theme: ThemeKey) => void;
  fontFamily: FontFamilyKey;
  setFontFamily: (k: FontFamilyKey) => void;
  textScale: TextScaleKey;
  setTextScale: (k: TextScaleKey) => void;
  a11yMotion: boolean;
  setA11yMotion: (v: boolean) => void;
  a11yFocus: boolean;
  setA11yFocus: (v: boolean) => void;
  a11yLinks: boolean;
  setA11yLinks: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  typeOpen: boolean;
  setTypeOpen: (v: boolean) => void;
  a11yOpen: boolean;
  setA11yOpen: (v: boolean) => void;
  compactPalette?: boolean;
}) {
  const a11yOnCount = (a11yMotion ? 1 : 0) + (a11yFocus ? 1 : 0) + (a11yLinks ? 1 : 0);

  return (
    <div className="settingsSheetScroll">
      <section className="settingsSection settingsSection--compact" aria-labelledby="settings-palette">
        <button
          type="button"
          id="settings-palette"
          className="settingsSectionToggle"
          aria-expanded={paletteOpen ? "true" : "false"}
          onClick={() => setPaletteOpen(!paletteOpen)}
        >
          <span className="settingsSectionToggleLabel">Palette</span>
          <span className="settingsSectionToggleMeta muted">{currentThemeLabel}</span>
          <span className="settingsSectionToggleChevron" aria-hidden>
            {paletteOpen ? "▾" : "▸"}
          </span>
        </button>
        {paletteOpen ? (
          <div className={compactPalette ? "settingsPaletteGrid" : "mobileSheetList mobileThemeList"} aria-label="Color palettes">
            {THEME_PALETTES.map((theme) => {
              const sw = THEME_PREVIEW_COLORS[theme.key];
              return (
                <button
                  key={theme.key}
                  type="button"
                  className="settingsPaletteOption"
                  data-active={currentTheme === theme.key ? "true" : "false"}
                  onClick={() => onPickTheme(theme.key)}
                >
                  <span className="settingsPaletteOptionName">{theme.name}</span>
                  <span className="settingsPaletteSwatches" aria-hidden>
                    <span className="settingsPaletteSwatch" style={{ background: sw.bg }} title="Background" />
                    <span className="settingsPaletteSwatch" style={{ background: sw.text }} title="Text" />
                    <span className="settingsPaletteSwatch" style={{ background: sw.accent }} title="Accent" />
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </section>

      <section className="settingsSection" aria-labelledby="settings-type">
        <button
          type="button"
          id="settings-type"
          className="settingsSectionToggle"
          aria-expanded={typeOpen ? "true" : "false"}
          onClick={() => setTypeOpen(!typeOpen)}
        >
          <span className="settingsSectionToggleLabel">Typography</span>
          <span className="settingsSectionToggleChevron" aria-hidden>
            {typeOpen ? "▾" : "▸"}
          </span>
        </button>
        {typeOpen ? (
          <>
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
          </>
        ) : null}
      </section>

      <section className="settingsSection" aria-labelledby="settings-a11y">
        <button
          type="button"
          id="settings-a11y"
          className="settingsSectionToggle"
          aria-expanded={a11yOpen ? "true" : "false"}
          onClick={() => setA11yOpen(!a11yOpen)}
        >
          <span className="settingsSectionToggleLabel">Accessibility</span>
          <span className={`settingsA11yBadge${a11yOnCount > 0 ? " settingsA11yBadge--on" : ""}`} aria-live="polite">
            {a11yOnCount === 0 ? "Off" : `${a11yOnCount} on`}
          </span>
          <span className="settingsSectionToggleChevron" aria-hidden>
            {a11yOpen ? "▾" : "▸"}
          </span>
        </button>
        {a11yOpen ? (
          <div className="settingsA11yBody">
            <p className="settingsA11yHint muted">
              Options: {a11yOnCount === 0 ? "none active" : `${a11yOnCount} of 3 active`}
            </p>
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
              <span>
                Reduce motion (minimize animations)
                <span className={`settingsToggleStatus${a11yMotion ? " settingsToggleStatus--on" : ""}`}>
                  {a11yMotion ? "On" : "Off"}
                </span>
              </span>
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
              <span>
                Stronger focus indicators
                <span className={`settingsToggleStatus${a11yFocus ? " settingsToggleStatus--on" : ""}`}>
                  {a11yFocus ? "On" : "Off"}
                </span>
              </span>
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
              <span>
                Underline links
                <span className={`settingsToggleStatus${a11yLinks ? " settingsToggleStatus--on" : ""}`}>
                  {a11yLinks ? "On" : "Off"}
                </span>
              </span>
            </label>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [settingsClosing, setSettingsClosing] = useState(false);
  const menuCloseTimerRef = useRef<number | null>(null);
  const settingsCloseTimerRef = useRef<number | null>(null);
  const settingsWrapRef = useRef<HTMLDivElement | null>(null);
  const [desktop, setDesktop] = useState(false);

  const [paletteSectionOpen, setPaletteSectionOpen] = useState(true);
  const [typeSectionOpen, setTypeSectionOpen] = useState(true);
  const [a11ySectionOpen, setA11ySectionOpen] = useState(true);

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
    if (desktop) {
      setSettingsOpen(false);
      return;
    }
    setSettingsClosing(true);
    clearSettingsCloseTimer();
    settingsCloseTimerRef.current = window.setTimeout(() => {
      setSettingsOpen(false);
      setSettingsClosing(false);
      settingsCloseTimerRef.current = null;
    }, SHEET_CLOSE_MS);
  }, [settingsOpen, settingsClosing, desktop, clearSettingsCloseTimer]);

  useEffect(() => {
    return () => {
      clearMenuCloseTimer();
      clearSettingsCloseTimer();
    };
  }, [clearMenuCloseTimer, clearSettingsCloseTimer]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 981px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!settingsOpen || !desktop) return;
    const onDocDown = (e: MouseEvent) => {
      const el = settingsWrapRef.current;
      if (!el || el.contains(e.target as Node)) return;
      setSettingsOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [settingsOpen, desktop]);

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

  const lockScroll = open || (settingsOpen && !desktop);
  useEffect(() => {
    if (!lockScroll) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [lockScroll]);

  function onPickTheme(theme: ThemeKey) {
    setCurrentTheme(theme);
    applyTheme(theme);
  }

  const settingsPanelProps = {
    currentTheme,
    currentThemeLabel,
    onPickTheme,
    fontFamily,
    setFontFamily,
    textScale,
    setTextScale,
    a11yMotion,
    setA11yMotion,
    a11yFocus,
    setA11yFocus,
    a11yLinks,
    setA11yLinks,
    paletteOpen: paletteSectionOpen,
    setPaletteOpen: setPaletteSectionOpen,
    typeOpen: typeSectionOpen,
    setTypeOpen: setTypeSectionOpen,
    a11yOpen: a11ySectionOpen,
    setA11yOpen: setA11ySectionOpen,
    compactPalette: true,
  };

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
        <div className="settingsDropdownWrap" ref={settingsWrapRef}>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="settingsBtnIconImg" src="/icons/gear-setting.svg" alt="" width={22} height={22} />
            </span>
          </button>

          {desktop && settingsOpen ? (
            <div className="settingsDropdown" role="dialog" aria-label="Settings" onClick={(e) => e.stopPropagation()}>
              <SettingsPanel {...settingsPanelProps} />
            </div>
          ) : null}
        </div>

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

      {!desktop && settingsOpen && typeof document !== "undefined"
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

                <SettingsPanel {...settingsPanelProps} />
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
