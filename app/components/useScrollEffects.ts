"use client";

import { useEffect } from "react";

/**
 * Adds light, non-invasive scroll effects (GSAP ScrollTrigger) to a scroll container.
 * - Reveals `.motionReveal` blocks as they enter view (instead of firing all at once).
 * - Adds a subtle parallax + shadow shift on `.documentPaper`.
 *
 * Safe defaults:
 * - No-op if GSAP/ScrollTrigger isn't loaded
 * - Respects prefers-reduced-motion
 */
export function useScrollEffects(scrollerEl: HTMLElement | null) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!scrollerEl) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    try {
      if (!gsap.core.globals().ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    } catch {
      // ignore
    }

    // Clear previous triggers tied to this scroller.
    const existing = ScrollTrigger.getAll?.() ?? [];
    for (const t of existing) {
      // Some pages mount multiple scrollers; only kill triggers that use this scroller.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const st: any = t;
      if (st?.scroller === scrollerEl) {
        t.kill(true);
      }
    }

    // Reveal blocks as they enter.
    const revealEls = Array.from(
      scrollerEl.querySelectorAll<HTMLElement>(
        ".motionReveal, .detailCard, .weekSummaryCard, .weekSummaryMiniCard, .aboutCard, .calloutCard"
      )
    );

    for (const el of revealEls) {
      gsap.set(el, { opacity: 0, y: 14, filter: "blur(4px)" });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          scroller: scrollerEl,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Paper parallax (if present)
    const paper = scrollerEl.querySelector<HTMLElement>(".documentPaper");
    if (paper) {
      gsap.to(paper, {
        y: -12,
        rotate: -0.25,
        ease: "none",
        scrollTrigger: {
          trigger: paper,
          scroller: scrollerEl,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    ScrollTrigger.refresh?.();

    return () => {
      const all = ScrollTrigger.getAll?.() ?? [];
      for (const t of all) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const st: any = t;
        if (st?.scroller === scrollerEl) t.kill(true);
      }
    };
  }, [scrollerEl]);
}
