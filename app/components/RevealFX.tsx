"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = [
  ".siteHeader .brand",
  ".siteHeader .topNav .navLink",
  ".siteHeader .headerActions > *",
  ".siteHeader .mobileSheetHeader > *",
  ".siteHeader .mobileSheetList > *",
  ".pageIntroBar",
  ".newsBar",
  ".tagline",
  ".leftSticky",
  ".tabs .tabBtn",
  ".leftControls > *",
  ".typePills .typePill",
  ".weeklyOverview",
  ".weeklyMobilePanel",
  ".eventRow",
  ".daySection",
  ".weeklyCondensed .weeklyCondRow",
  ".weeklyCards .weeklyCard",
  ".paneRight .detailCard",
  ".paneRight .detailCard > *",
  ".paneRight .weeklyList > *",
  ".paneRight .weekSummary",
  ".paneRight .weeklyCondensed > *",
  ".paneRight .weeklyCards > *",
  ".filterOverlayPanel",
  ".filterOverlayPanel > *",
  ".mobileDetail .detailCard",
  ".mobileDetail .detailCard > *",
  ".menuOverlayLink",
  ".contentPage > section",
  ".contentPage .contentCard",
  ".contentPage .contentChecklist > *",
  ".contentPage .contentSteps > *",
  ".simplePage > *",
  ".simplePage .formRow > *",
  ".simplePage .formRowSingle > *",
  ".simplePage .contactCallouts > *",
  ".clockPage > *",
  ".clockShell > *",
  "[data-switch-item='true']",
  "[data-intro-item='true']"
].join(",");

export default function RevealFX() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const all = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => {
      if (el.closest(".routeFrame .routeFrame")) return false;
      if (el.dataset.revealIgnore === "true") return false;
      return el.offsetParent !== null;
    });

    const unique = Array.from(new Set(all));

    unique.forEach((el) => {
      el.classList.remove("reveal-visible");
      el.classList.add("reveal-ready");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry, index) => {
            const el = entry.target as HTMLElement;
            const siblings = Array.from(el.parentElement?.children || []).filter((node) =>
              (node as HTMLElement).classList?.contains("reveal-ready")
            ) as HTMLElement[];
            const siblingIndex = Math.max(0, siblings.indexOf(el));
            const cascadeIndex = Math.min(index + siblingIndex, 12);
            el.style.setProperty("--reveal-delay", `${cascadeIndex * 62}ms`);
            el.classList.add("reveal-visible");
            observer.unobserve(el);
          });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    unique.forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${Math.min(index * 34, 360)}ms`);
      observer.observe(el);
    });

    const settle = window.setTimeout(() => {
      unique.forEach((el) => el.classList.add("reveal-visible"));
    }, 1200);

    return () => {
      window.clearTimeout(settle);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
