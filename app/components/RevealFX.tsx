"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = [
  ".newsBar",
  ".tagline",
  ".weeklyOverview",
  ".weeklyMobilePanel",
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
  ".menuOverlayLink",
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

    try {
      const KEY = "wnl_ui_load_v2";
      if (!window.sessionStorage.getItem(KEY)) {
        document.body.classList.add("ui-load-in");
        window.sessionStorage.setItem(KEY, "1");
        const t = window.setTimeout(() => {
          document.body.classList.remove("ui-load-in");
        }, 1900);
        return () => window.clearTimeout(t);
      }
    } catch (e) {
      // ignore storage issues
    }
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const all = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.closest(".routeFrame .routeFrame")
    );

    const unique = Array.from(new Set(all));

    unique.forEach((el, index) => {
      el.classList.remove("reveal-visible");
      el.classList.add("reveal-ready");
      el.style.setProperty("--reveal-delay", `${Math.min(index * 70, 720)}ms`);
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
          el.style.setProperty("--reveal-delay", `${Math.min(siblingIndex * 120, 760)}ms`);

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
