"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gsap?: {
      to: (target: unknown, vars: Record<string, unknown>) => unknown;
      set: (target: unknown, vars: Record<string, unknown>) => unknown;
      killTweensOf?: (target: unknown) => unknown;
    };
  }
}

const SELECTOR = [
  ".navLink",
  ".tabBtn",
  ".filterBtn",
  ".clearBtn",
  ".viewBtn",
  ".monthNavBtn",
  ".weeklyMiniBtn",
  ".ctaBtn",
  ".submitBtn",
  ".backBtn",
  ".menuOverlayLink",
  ".hamburgerBtn",
  ".pillBtn",
  ".calloutLink",
  ".mobileTab"
].join(", ");

export default function GsapButtonFX() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gsap = window.gsap;
    if (!gsap || prefersReduced) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const cleanups: Array<() => void> = [];

    nodes.forEach((node) => {
      node.dataset.gsapEnhanced = "true";
      gsap.set(node, { transformOrigin: "50% 50%" });

      const icon = node.querySelector<HTMLElement>(".navLinkIcon svg");
      const glow = node.querySelector<HTMLElement>(".btnGlow");

      const onMove = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const dx = ((x / rect.width) - 0.5) * 10;
        const dy = ((y / rect.height) - 0.5) * 8;

        gsap.to(node, {
          x: dx,
          y: dy,
          scale: 1.02,
          duration: 0.28,
          ease: "power3.out"
        });

        if (glow) {
          gsap.to(glow, {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            opacity: 0.95,
            duration: 0.3,
            ease: "power3.out"
          });
        }
      };

      const onEnter = () => {
        gsap.to(node, {
          scale: 1.02,
          y: -2,
          duration: 0.28,
          ease: "power3.out"
        });
        if (icon) {
          gsap.to(icon, { x: 4, rotate: -8, duration: 0.28, ease: "power3.out" });
        }
        if (glow) {
          gsap.to(glow, { opacity: 0.9, duration: 0.24, ease: "power2.out" });
        }
      };

      const onLeave = () => {
        gsap.to(node, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.36,
          ease: "power3.out"
        });
        if (icon) {
          gsap.to(icon, { x: 0, rotate: 0, duration: 0.32, ease: "power3.out" });
        }
        if (glow) {
          gsap.to(glow, { opacity: 0.2, x: 0, y: 0, duration: 0.32, ease: "power2.out" });
        }
      };

      const onDown = () => {
        gsap.to(node, { scale: 0.97, y: 0, duration: 0.12, ease: "power2.out" });
        if (glow) {
          gsap.to(glow, { opacity: 1, scale: 1.12, duration: 0.14, ease: "power2.out" });
        }
      };

      const onUp = () => {
        gsap.to(node, { scale: 1.015, y: -1, duration: 0.18, ease: "back.out(2)" });
        if (glow) {
          gsap.to(glow, { scale: 1, duration: 0.2, ease: "power2.out" });
        }
      };

      node.addEventListener("mousemove", onMove);
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
      node.addEventListener("mousedown", onDown);
      node.addEventListener("mouseup", onUp);

      cleanups.push(() => {
        node.removeEventListener("mousemove", onMove);
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
        node.removeEventListener("mousedown", onDown);
        node.removeEventListener("mouseup", onUp);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
