export const DEFAULT_THEME = "paper-ink";

export const THEME_PALETTES = [
  { key: "paper-ink", name: "Paper Ink" },
  { key: "night-shift", name: "Night Shift" },
  { key: "rose-room", name: "Rose Room" },
  { key: "ember-signal", name: "Ember Signal" },
] as const;

export type ThemeKey = (typeof THEME_PALETTES)[number]["key"];

/** Removed palettes still stored in localStorage — map to a supported theme. */
export const RETIRED_THEME_FALLBACK: Record<string, ThemeKey> = {
  "moss-stone": "paper-ink",
  "ocean-blueprint": "paper-ink",
};

export function normalizeThemeKey(stored: string | null | undefined): ThemeKey {
  if (!stored) return DEFAULT_THEME;
  if (THEME_PALETTES.some((t) => t.key === stored)) return stored as ThemeKey;
  return RETIRED_THEME_FALLBACK[stored] ?? DEFAULT_THEME;
}

/** Preview swatches for settings UI (matches `html[data-theme]` tokens in globals.css). */
export const THEME_PREVIEW_COLORS: Record<
  ThemeKey,
  { bg: string; text: string; accent: string }
> = {
  "paper-ink": { bg: "#fbfaf6", text: "#1f1a17", accent: "#2a2420" },
  "night-shift": { bg: "#0e1116", text: "#e6edf3", accent: "#7aa2ff" },
  "rose-room": { bg: "#fff4f6", text: "#2a0f16", accent: "#d14b6c" },
  "ember-signal": { bg: "#fff6f2", text: "#2b140a", accent: "#ff6a3d" },
};
