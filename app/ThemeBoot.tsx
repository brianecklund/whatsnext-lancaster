"use client";

import { useLayoutEffect } from "react";

export default function ThemeBoot() {
  useLayoutEffect(() => {
    try {
      const stored = window.localStorage.getItem("theme");

      if (stored) {
        document.documentElement.dataset.theme = stored;
        return;
      }

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    } catch {
      // no-op
    }
  }, []);

  return null;
}
