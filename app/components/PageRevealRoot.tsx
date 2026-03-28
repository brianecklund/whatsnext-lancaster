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
    let r1 = 0;
    let r2 = 0;
    r1 = window.requestAnimationFrame(() => {
      r2 = window.requestAnimationFrame(() => {
        setHeaderReady(true);
        setContentReady(true);
      });
    });
    return () => {
      window.cancelAnimationFrame(r1);
      window.cancelAnimationFrame(r2);
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
