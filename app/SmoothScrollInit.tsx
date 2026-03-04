"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Enables GSAP ScrollSmoother (smooth scrolling + effects) while minimizing
 * route-change "flashes". We create the smoother ONCE and only refresh on
 * navigation.
 */
export default function SmoothScrollInit() {
  const pathname = usePathname();
  const didInit = useRef(false);

  // Create once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    const ScrollSmoother = (window as any).ScrollSmoother;

    if (!gsap || !ScrollTrigger || !ScrollSmoother) return;

    try {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // Avoid duplicates on fast refresh
      const existing = ScrollSmoother.get && ScrollSmoother.get();
      if (existing) {
        didInit.current = true;
        return;
      }

      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.05,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      didInit.current = true;
      ScrollTrigger.refresh();
    } catch {
      // no-op
    }
  }, []);

  // Refresh on route changes (no re-init / no kill)
  useEffect(() => {
    if (!didInit.current) return;
    const ScrollTrigger = (window as any).ScrollTrigger;
    const ScrollSmoother = (window as any).ScrollSmoother;

    try {
      // Keep scroll position stable; just recompute measurements.
      ScrollTrigger && ScrollTrigger.refresh && ScrollTrigger.refresh();
      const s = ScrollSmoother && ScrollSmoother.get && ScrollSmoother.get();
      s && s.refresh && s.refresh();
    } catch {
      // no-op
    }
  }, [pathname]);

  return null;
}
