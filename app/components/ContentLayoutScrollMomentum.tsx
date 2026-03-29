"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { attachInertialScroll } from "@/app/components/useSmoothWheel";

function isShellPath(pathname: string) {
  return pathname === "/" || pathname.startsWith("/locations") || pathname.startsWith("/updates");
}

function getContentScrollRoot(): HTMLElement | null {
  const root = document.querySelector(".wnlPageRevealRoot");
  if (!root) return null;
  for (const child of root.children) {
    if (child instanceof HTMLElement && child.classList.contains("siteHeader")) continue;
    if (child instanceof HTMLElement) return child;
  }
  return null;
}

/**
 * Content routes: inertial scroll on the main content column (not `body`), so the
 * header stays fixed and scrollbars do not shift nav between shell vs content pages.
 * Shell routes use in-pane `.scroll` via useSmoothWheel in split clients.
 */
export default function ContentLayoutScrollMomentum() {
  const pathname = usePathname() ?? "";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isShellPath(pathname)) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const coarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (reduce || coarse) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;

    const attach = () => {
      if (cancelled) return;
      const el = getContentScrollRoot();
      if (!el) return;
      if (el.scrollHeight <= el.clientHeight + 4) return;
      cleanup = attachInertialScroll(el);
    };

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(attach);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
