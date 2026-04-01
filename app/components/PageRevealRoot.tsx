"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState, type ReactNode } from "react";

/**
 * Sitewide staged reveal: header once, main content re-reveals on route changes.
 * Uses CSS in `globals.css` (classes `wnlPageRevealRoot--headerReady` / `--contentReady`).
 */
export default function PageRevealRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [headerReady, setHeaderReady] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useLayoutEffect(() => {
    setContentReady(false);
    let raf2 = 0;
    let revealTimer: number | undefined;

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        setHeaderReady(true);
        // Let one frame paint with --contentReady off so route transitions visibly fade
        // (double rAF alone often batches with the next ready state).
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
