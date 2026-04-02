"use client";

import { useLayoutEffect } from "react";
import { normalizeThemeKey } from "@/app/theme-palettes";

export default function ThemeBoot() {
  useLayoutEffect(() => {
    try {
      const stored =
        window.localStorage.getItem("wnl-theme") ?? window.localStorage.getItem("theme");
      const next = normalizeThemeKey(stored);
      document.documentElement.dataset.theme = next;
    } catch {
      // no-op
    }
  }, []);

  return null;
}
