"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    setIsEntering(true);
    const raf = window.requestAnimationFrame(() => {
      const settle = window.setTimeout(() => setIsEntering(false), 760);
      return () => window.clearTimeout(settle);
    });

    const resetSwitching = window.setTimeout(() => {
      delete document.documentElement.dataset.routeSwitching;
    }, 340);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(resetSwitching);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (!href.startsWith("/")) return;
      document.documentElement.dataset.routeSwitching = "true";
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  return (
    <div className={`routeFrame${isEntering ? " routeFrame--entering" : ""}`}>
      {children}
    </div>
  );
}
