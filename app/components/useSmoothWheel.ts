"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export type SmoothWheelOptions = {
  /** Fires after each programmatic scroll step (for scroll-synced UI). */
  onProgrammaticScroll?: (el: HTMLElement) => void;
};

function normalizeWheelDelta(e: WheelEvent, el: HTMLElement): number {
  let d = e.deltaY;
  if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) d *= 16;
  else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) d *= Math.max(el.clientHeight * 0.85, 120);
  return d;
}

/** If the wheel target sits inside a nested scroll container, keep native behavior. */
function wheelTargetIsNestedScroller(start: EventTarget | null, boundary: HTMLElement): boolean {
  let t = start as Node | null;
  while (t && t !== boundary) {
    if (t instanceof HTMLElement) {
      const st = getComputedStyle(t);
      const oy = st.overflowY;
      if ((oy === "auto" || oy === "scroll" || oy === "overlay") && t.scrollHeight > t.clientHeight + 2) {
        return true;
      }
    }
    t = t.parentNode;
  }
  return false;
}

/** Subtle inertial scroll: velocity builds while wheeling, then coasts with friction after input stops. */
export function attachInertialScroll(el: HTMLElement, options?: SmoothWheelOptions): () => void {
  if (typeof window === "undefined") return () => {};

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
  if (reduce || coarse) return () => {};

  let raf: number | null = null;
  let velocity = 0;

  const IMPULSE = 0.038;
  const FRICTION = 0.955;
  const MAX_V = 40;
  const STOP_EPS = 0.055;

  const tick = () => {
    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
    if (maxScroll < 1) {
      velocity = 0;
      raf = null;
      return;
    }

    const st = el.scrollTop;
    const v = velocity;
    const next = st + v;

    if (next <= 0) {
      el.scrollTop = 0;
      velocity = 0;
    } else if (next >= maxScroll) {
      el.scrollTop = maxScroll;
      velocity = 0;
    } else {
      el.scrollTop = next;
      velocity = v * FRICTION;
    }

    options?.onProgrammaticScroll?.(el);

    if (Math.abs(velocity) < STOP_EPS) {
      velocity = 0;
      raf = null;
      options?.onProgrammaticScroll?.(el);
      return;
    }
    raf = window.requestAnimationFrame(tick);
  };

  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    if (el.scrollHeight <= el.clientHeight + 2) return;
    if (wheelTargetIsNestedScroller(e.target, el)) return;

    e.preventDefault();

    const delta = normalizeWheelDelta(e, el);
    velocity += delta * IMPULSE;
    velocity = Math.max(-MAX_V, Math.min(MAX_V, velocity));

    if (raf == null) raf = window.requestAnimationFrame(tick);
  };

  el.addEventListener("wheel", onWheel, { passive: false });
  return () => {
    el.removeEventListener("wheel", onWheel as EventListener);
    if (raf != null) window.cancelAnimationFrame(raf);
  };
}

export function useSmoothWheel(selector = ".scroll", options?: SmoothWheelOptions) {
  const pathname = usePathname();
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    if (typeof document === "undefined") return;

    let cleanups: Array<() => void> = [];

    const bind = () => {
      cleanups.forEach((c) => c());
      cleanups = [];
      const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
      for (const node of els) {
        cleanups.push(
          attachInertialScroll(node, {
            onProgrammaticScroll: (el) => optsRef.current?.onProgrammaticScroll?.(el),
          }),
        );
      }
    };

    bind();
    const id = window.requestAnimationFrame(() => bind());

    return () => {
      window.cancelAnimationFrame(id);
      cleanups.forEach((c) => c());
    };
  }, [selector, pathname]);
}
