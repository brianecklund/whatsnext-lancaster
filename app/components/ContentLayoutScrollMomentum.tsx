"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { attachInertialScroll } from "@/app/components/useSmoothWheel";

function isShellPath(pathname: string) {
  return pathname === "/" || pathname.startsWith("/locations") || pathname.startsWith("/updates");
}

/**
 * Content routes scroll the document (about, donate, contact, clock, etc.).
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
      const se = document.scrollingElement;
      if (!(se instanceof HTMLElement)) return;
      if (se.scrollHeight <= se.clientHeight + 4) return;
      cleanup = attachInertialScroll(se);
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
