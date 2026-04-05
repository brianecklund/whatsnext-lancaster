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
    setHeaderReady(true);
    let revealTimer: number | undefined;

    revealTimer = window.setTimeout(() => {
      setContentReady(true);
    }, 48);

    return () => {
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
