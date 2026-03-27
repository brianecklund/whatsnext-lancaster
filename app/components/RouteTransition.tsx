"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.routeSwitching = "true";
    }

    const raf = window.requestAnimationFrame(() => {
      setKey(pathname);
      if (typeof document !== "undefined") {
        delete document.documentElement.dataset.routeSwitching;
      }
    });

    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  return <div key={key} className="routeFrame">{children}</div>;
}
