"use client";

import { useEffect, useRef } from "react";

export type SmoothWheelOptions = {
  /** Fires after each programmatic scrollTop update (smooth wheel), for scroll-synced UI. */
  onProgrammaticScroll?: (el: HTMLElement) => void;
};

/**
 * Wheel smoothing with clearer acceleration on input and gentle deceleration at rest.
 * Falls back to native scrolling on touch / reduced motion.
 */
export function useSmoothWheel(selector = ".scroll", options?: SmoothWheelOptions) {
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (reduce || coarse) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
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

        // Stronger initial response (acceleration feel), then friction eases the stop.
        velocity += delta * 0.2;

        if (raf) return;
        const step = () => {
          const current = el.scrollTop;
          const diff = target - current;

          const move = diff * 0.15 + velocity;
          el.scrollTop = current + move;

          optsRef.current?.onProgrammaticScroll?.(el);

          velocity *= 0.74;

          if (Math.abs(diff) < 0.35 && Math.abs(velocity) < 0.18) {
            raf = null;
            velocity = 0;
            optsRef.current?.onProgrammaticScroll?.(el);
            return;
          }
          raf = window.requestAnimationFrame(step);
        };
        raf = window.requestAnimationFrame(step);
      };

      el.addEventListener("wheel", onWheel, { passive: false });
      cleanups.push(() => {
        el.removeEventListener("wheel", onWheel as EventListener);
        if (raf) window.cancelAnimationFrame(raf);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [selector]);
}
