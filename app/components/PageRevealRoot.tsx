"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

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

export default function PageRevealRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [headerReady, setHeaderReady] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const prev = prevPathRef.current;
    prevPathRef.current = pathname;

    const shellToShell = prev !== null && isMainShellRoute(prev) && isMainShellRoute(pathname);

    if (shellToShell) {
      setHeaderReady(true);
      setContentReady(true);
      return;
    }

    setContentReady(false);
    let raf2 = 0;
    let revealTimer: number | undefined;

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        setHeaderReady(true);
        revealTimer = window.setTimeout(() => {
          setContentReady(true);
        }, 140);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      if (revealTimer != null) window.clearTimeout(revealTimer);
    };
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
