"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const t = window.setTimeout(() => {
      delete document.documentElement.dataset.routeSwitching;
    }, 260);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return (
    <div key={pathname} className="routeFrame">
      {children}
    </div>
  );
}
