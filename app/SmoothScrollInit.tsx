"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Enables GSAP ScrollSmoother (smooth scrolling + effects) in a way that won't
 * break core functionality if GSAP isn't available (e.g., script blocked).
 */
export default function SmoothScrollInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced-motion
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    const ScrollSmoother = (window as any).ScrollSmoother;

    if (!gsap || !ScrollTrigger || !ScrollSmoother) return;

    try {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // Avoid duplicates on route transitions / fast refresh.
      const existing = ScrollSmoother.get && ScrollSmoother.get();
      if (existing) existing.kill();

      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1, // 0.8–1.6 range
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      ScrollTrigger.refresh();
    } catch {
      // no-op: never hard-fail the app if the plugin can't init
    }
  }, [pathname]);

  return null;
}
