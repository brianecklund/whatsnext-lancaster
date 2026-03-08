"use client";

import { useEffect } from "react";

/**
 * Adds a light inertial feel to mouse-wheel scrolling on desktop.
 * Keeps dependency footprint at 0.
 *
 * Notes:
 * - Only runs when prefers-reduced-motion is NOT set.
 * - Skips coarse pointer devices (mobile/tablet).
 * - Targets scroll containers (default: ".scroll").
 */
export function useSmoothWheel(containerSelector = ".scroll") {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (isCoarse) return;

    const containers = Array.from(
      document.querySelectorAll<HTMLElement>(containerSelector)
    );
    if (!containers.length) return;

    const state = new Map<HTMLElement, { target: number; raf: number | null }>();

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    const onWheel = (el: HTMLElement, e: WheelEvent) => {
      // Let trackpads behave naturally (optional heuristic)
      const looksLikeTrackpad = e.deltaMode === 0 && Math.abs(e.deltaY) < 12;
      if (looksLikeTrackpad) return;

      // Only take over vertical wheel scrolling
      if (Math.abs(e.deltaX) > 0) return;

      e.preventDefault();

      const s = state.get(el) ?? { target: el.scrollTop, raf: null };
      // More pronounced inertia: amplify wheel input slightly
      // and ease toward the target more slowly in RAF.
      s.target = clamp(
        s.target + e.deltaY * 1.12,
        0,
        Math.max(0, el.scrollHeight - el.clientHeight)
      );

      if (s.raf == null) {
        const tick = () => {
          const cur = el.scrollTop;
          const diff = s.target - cur;
          // Smaller factor = longer glide
          el.scrollTop = cur + diff * 0.075;

          if (Math.abs(diff) < 0.25) {
            el.scrollTop = s.target;
            s.raf = null;
            return;
          }
          s.raf = requestAnimationFrame(tick);
        };
        s.raf = requestAnimationFrame(tick);
      }

      state.set(el, s);
    };

    const offs: Array<() => void> = [];

    for (const el of containers) {
      const fn = (e: WheelEvent) => onWheel(el, e);
      el.addEventListener("wheel", fn, { passive: false });
      offs.push(() => el.removeEventListener("wheel", fn as any));
    }

    return () => {
      offs.forEach((off) => off());
      for (const s of state.values()) {
        if (s.raf) cancelAnimationFrame(s.raf);
      }
      state.clear();
    };
  }, [containerSelector]);
}
