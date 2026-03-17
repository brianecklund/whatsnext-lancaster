"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = [
  ".tagline",
  ".leftSticky",
  ".tabs .tabBtn",
  ".leftControls > *",
  ".typePills .typePill",
  ".weeklyOverview",
  ".weeklyMobilePanel",
  ".eventRow",
  ".weeklyCondensed .weeklyCondRow",
  ".weeklyCards .weeklyCard",
  ".paneRight .detailCard > *",
  ".paneRight .weeklyList > *",
  ".paneRight .weekSummary",
  ".paneRight .weeklyCondensed > *",
  ".paneRight .weeklyCards > *",
  ".filterOverlayPanel > *",
  ".mobileDetail .detailCard > *",
  ".menuOverlayLink",
  ".newsBar",
  ".newsBar .nw__slider__item",
  ".directoryCard",
  ".directoryFeaturedCard",
  ".locationCard",
  ".updateCard",
  ".updateRow",
  ".dayJumpBtn"
].join(",");

export default function RevealFX() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const all = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.closest(".routeFrame .routeFrame")
    );

    const unique = Array.from(new Set(all));

    unique.forEach((el, index) => {
      el.classList.add("reveal-ready");
      el.style.setProperty("--reveal-delay", `${Math.min(index * 45, 520)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (!entry.isIntersecting) return;

          const siblings = Array.from(el.parentElement?.children || []).filter((node) =>
            (node as HTMLElement).classList?.contains("reveal-ready")
          ) as HTMLElement[];
          const siblingIndex = Math.max(0, siblings.indexOf(el));
          el.style.setProperty("--reveal-delay", `${Math.min(siblingIndex * 95, 620)}ms`);

          window.requestAnimationFrame(() => {
            el.classList.add("reveal-visible");
          });
          observer.unobserve(el);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    unique.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
