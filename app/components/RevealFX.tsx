"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = [
  ".eventRow",
  ".weeklyCondensed .weeklyCondRow",
  ".weeklyCards .weeklyCard",
  ".paneRight .detailCard",
  ".paneRight .detailCard > *",
  ".paneRight .weeklyList > *",
  ".paneRight .weekSummary",
  ".paneRight .weeklyCondensed > *",
  ".paneRight .weeklyCards > *",
  ".filterOverlayPanel > *",
  ".mobileDetail .detailCard",
  ".mobileDetail .detailCard > *",
  ".newsBar .nw__slider__item",
  ".directoryCard",
  ".directoryFeaturedCard",
  ".locationCard",
  ".updateCard",
  ".updateRow"
].join(",");

export default function RevealFX() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const all = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const unique = Array.from(new Set(all));

    unique.forEach((el) => {
      el.classList.remove("reveal-visible");
      el.classList.add("reveal-ready");
      el.style.removeProperty("--reveal-delay");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (!entry.isIntersecting) return;

          const siblings = Array.from(el.parentElement?.children || []).filter((node) =>
            (node as HTMLElement).matches?.(SELECTOR)
          ) as HTMLElement[];
          const siblingIndex = Math.max(0, siblings.indexOf(el));
          el.style.setProperty("--reveal-delay", `${Math.min(siblingIndex * 85, 520)}ms`);

          window.requestAnimationFrame(() => {
            el.classList.add("reveal-visible");
          });
          observer.unobserve(el);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    unique.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
