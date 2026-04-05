"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Sitewide staged reveal: header + main on first paint / leaving the main shell.
 * Calendar ⟷ Directory ⟷ Updates stays visible: only `UnifiedShellClient` list/right cascade runs.
 */
function isMainShellRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/" || pathname === "") return true;
  if (pathname.startsWith("/locations")) return true;
  if (pathname.startsWith("/updates")) return true;
  return false;
}

function getMainScrollColumn(): HTMLElement | null {
  const root = document.querySelector(".wnlPageRevealRoot");
  if (!root) return null;
  for (const child of root.children) {
    if (child instanceof HTMLElement && child.classList.contains("siteHeader")) continue;
    if (child instanceof HTMLElement) return child;
  }
  return null;
}

const INITIAL_CONTENT_DELAY_MS = 24;
/** Brief hold before fade-in on client navigations (blog, donate, shell, etc.) so the swap reads as out → in. */
const ROUTE_TRANSITION_ENTER_DELAY_MS = 200;

export default function PageRevealRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [headerReady, setHeaderReady] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const prevPathRef = useRef<string | null>(null);
  const revealTimerRef = useRef<number | undefined>(undefined);

  useLayoutEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    const shellToShell = prev !== null && isMainShellRoute(prev) && isMainShellRoute(pathname);

    if (revealTimerRef.current != null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = undefined;
    }

    if (shellToShell) {
      setHeaderReady(true);
      setContentReady(true);
      return;
    }

    setContentReady(false);
    setHeaderReady(true);

    const isFirstPaint = prev === null;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const enterDelay = reduceMotion ? 0 : isFirstPaint ? INITIAL_CONTENT_DELAY_MS : ROUTE_TRANSITION_ENTER_DELAY_MS;

    revealTimerRef.current = window.setTimeout(() => {
      revealTimerRef.current = undefined;
      setContentReady(true);
    }, enterDelay);

    return () => {
      if (revealTimerRef.current != null) {
        window.clearTimeout(revealTimerRef.current);
        revealTimerRef.current = undefined;
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (!pathname || isMainShellRoute(pathname)) return;

    const run = () => {
      const el = getMainScrollColumn();
      if (el) el.scrollTop = 0;
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
  }, [pathname]);

  return (
    <div
      className={[
        "wnlPageRevealRoot",
        headerReady ? "wnlPageRevealRoot--headerReady" : "",
        contentReady ? "wnlPageRevealRoot--contentReady" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
