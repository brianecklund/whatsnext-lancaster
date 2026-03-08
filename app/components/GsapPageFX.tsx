"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gsap?: {
      set: (target: unknown, vars: Record<string, unknown>) => unknown;
      to: (target: unknown, vars: Record<string, unknown>) => unknown;
      fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => unknown;
      killTweensOf?: (target: unknown) => unknown;
    };
  }
}

function animateGroup(group: HTMLElement) {
  const gsap = window.gsap;
  if (!gsap || group.dataset.revealAnimated === "true") return;

  const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]"));
  if (!items.length) return;

  group.dataset.revealAnimated = "true";
  gsap.set(items, {
    opacity: 0,
    y: 28,
    filter: "blur(12px)",
    willChange: "transform, opacity, filter"
  });

  items.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.35,
      delay: 0.18 + index * 0.15,
      ease: "power3.out",
      clearProps: "willChange"
    });
  });
}

function prepareScrollItem(el: HTMLElement) {
  if (el.dataset.scrollPrepared === "true") return;
  el.dataset.scrollPrepared = "true";
  el.style.opacity = "0";
  el.style.transform = "translate3d(0, 30px, 0)";
  el.style.filter = "blur(12px)";
}

function revealScrollItem(el: HTMLElement) {
  const gsap = window.gsap;
  if (!gsap || el.dataset.scrollAnimated === "true") return;
  el.dataset.scrollAnimated = "true";

  gsap.to(el, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.45,
    ease: "power3.out",
    clearProps: "willChange"
  });
}

export default function GsapPageFX() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gsap = window.gsap;
    if (!gsap || prefersReduced) return;

    const initGroups = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach(animateGroup);
    };

    const scrollEls = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
    scrollEls.forEach(prepareScrollItem);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          revealScrollItem(target);
          observer.unobserve(target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    scrollEls.forEach((el) => observer.observe(el));
    initGroups();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches?.("[data-reveal-group]")) animateGroup(node);
          if (node.querySelectorAll) node.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach(animateGroup);

          if (node.matches?.("[data-scroll-reveal]")) {
            prepareScrollItem(node);
            observer.observe(node);
          }
          if (node.querySelectorAll) node.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((el) => {
            prepareScrollItem(el);
            observer.observe(el);
          });
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
