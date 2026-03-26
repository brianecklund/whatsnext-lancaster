"use client";

import { useEffect } from "react";

/**
 * Subtle wheel smoothing / de-acceleration for trackpad/mouse wheels.
 * Falls back to native scrolling on touch / reduced motion.
 */
export function useSmoothWheel(_containerSelector = ".scroll") {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (reduce || coarse) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(_containerSelector));
    if (!els.length) return;

    const cleanups: Array<() => void> = [];

    for (const el of els) {
      let raf: number | null = null;
      let target = el.scrollTop;
      let velocity = 0;

      const onWheel = (e: WheelEvent) => {
        // Let pinch-zoom / horizontal gestures pass through.
        if (e.ctrlKey) return;
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        // Only apply when this element can actually scroll vertically.
        const canScroll = el.scrollHeight > el.clientHeight + 2;
        if (!canScroll) return;

        e.preventDefault();

        const delta = e.deltaY;
        target += delta;
        target = Math.max(0, Math.min(target, el.scrollHeight - el.clientHeight));

        // Start with a bit of "inertia" but keep it subtle.
        velocity += delta * 0.12;

        if (raf) return;
        const step = () => {
          const current = el.scrollTop;
          const diff = target - current;

          // Ease: critically-damped-ish approach.
          const move = diff * 0.18 + velocity;
          el.scrollTop = current + move;

          // Decelerate.
          velocity *= 0.78;

          if (Math.abs(diff) < 0.4 && Math.abs(velocity) < 0.2) {
            raf = null;
            velocity = 0;
            return;
          }
          raf = window.requestAnimationFrame(step);
        };
        raf = window.requestAnimationFrame(step);
      };

      el.addEventListener("wheel", onWheel, { passive: false });
      cleanups.push(() => {
        el.removeEventListener("wheel", onWheel as any);
        if (raf) window.cancelAnimationFrame(raf);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [_containerSelector]);
}
