import type { ThemeKey } from "@/app/theme-palettes";

export type FontFamilyKey = "default" | "inter-gabarito" | "dm-sans" | "source-serif" | "jetbrains-mono";
export type TextScaleKey = "default" | "smaller" | "larger";

export const FONT_OPTIONS: { key: FontFamilyKey; label: string }[] = [
  { key: "default", label: "Default (ABC Arizona Flare)" },
  { key: "inter-gabarito", label: "Inter / Gabarito" },
  { key: "dm-sans", label: "DM Sans" },
  { key: "source-serif", label: "Source Serif" },
  { key: "jetbrains-mono", label: "JetBrains Mono" },
];

export const TEXT_SCALE_OPTIONS: { key: TextScaleKey; label: string }[] = [
  { key: "default", label: "Default size" },
  { key: "smaller", label: "Smaller" },
  { key: "larger", label: "Larger" },
];

export const STORAGE_FONT = "wnl-font";
export const STORAGE_TEXT_SCALE = "wnl-text-scale";
export const STORAGE_A11Y_REDUCED_MOTION = "wnl-a11y-reduced-motion";
export const STORAGE_A11Y_FOCUS = "wnl-a11y-enhanced-focus";
export const STORAGE_A11Y_LINKS = "wnl-a11y-link-underline";

export function applyFontFamily(key: FontFamilyKey) {
  if (key === "default") document.documentElement.removeAttribute("data-font");
  else document.documentElement.setAttribute("data-font", key);
  try {
    window.localStorage.setItem(STORAGE_FONT, key);
  } catch {
    /* ignore */
  }
}

export function applyTextScale(key: TextScaleKey) {
  if (key === "default") document.documentElement.removeAttribute("data-text-scale");
  else document.documentElement.setAttribute("data-text-scale", key);
  try {
    window.localStorage.setItem(STORAGE_TEXT_SCALE, key);
  } catch {
    /* ignore */
  }
}

export function applyA11yReducedMotion(on: boolean) {
  if (on) document.documentElement.setAttribute("data-a11y-reduced-motion", "true");
  else document.documentElement.removeAttribute("data-a11y-reduced-motion");
  try {
    window.localStorage.setItem(STORAGE_A11Y_REDUCED_MOTION, on ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function applyA11yEnhancedFocus(on: boolean) {
  if (on) document.documentElement.setAttribute("data-a11y-enhanced-focus", "true");
  else document.documentElement.removeAttribute("data-a11y-enhanced-focus");
  try {
    window.localStorage.setItem(STORAGE_A11Y_FOCUS, on ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function applyA11yLinkUnderline(on: boolean) {
  if (on) document.documentElement.setAttribute("data-a11y-link-underline", "true");
  else document.documentElement.removeAttribute("data-a11y-link-underline");
  try {
    window.localStorage.setItem(STORAGE_A11Y_LINKS, on ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function applyTheme(theme: ThemeKey) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    window.localStorage.setItem("wnl-theme", theme);
  } catch {
    /* ignore */
  }
}

export function bootSitePreferencesFromStorage() {
  if (typeof document === "undefined") return;

  try {
    applyFontFamily("default");
    window.localStorage.removeItem(STORAGE_FONT);
  } catch {
    /* ignore */
  }

  try {
    const s = window.localStorage.getItem(STORAGE_TEXT_SCALE) as TextScaleKey | null;
    if (s && TEXT_SCALE_OPTIONS.some((o) => o.key === s) && s !== "default") applyTextScale(s);
  } catch {
    /* ignore */
  }

  try {
    if (window.localStorage.getItem(STORAGE_A11Y_REDUCED_MOTION) === "1") applyA11yReducedMotion(true);
  } catch {
    /* ignore */
  }

  try {
    if (window.localStorage.getItem(STORAGE_A11Y_FOCUS) === "1") applyA11yEnhancedFocus(true);
  } catch {
    /* ignore */
  }

  try {
    if (window.localStorage.getItem(STORAGE_A11Y_LINKS) === "1") applyA11yLinkUnderline(true);
  } catch {
    /* ignore */
  }
}
