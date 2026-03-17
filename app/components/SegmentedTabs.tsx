"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Calendar", match: (pathname: string) => pathname === "/" },
  { href: "/locations", label: "Directory", match: (pathname: string) => pathname.startsWith("/locations") },
  { href: "/updates", label: "Updates", match: (pathname: string) => pathname.startsWith("/updates") },
] as const;

function getActiveIndex(pathname: string | null) {
  const current = pathname || "/";
  const index = ITEMS.findIndex((item) => item.match(current));
  return index >= 0 ? index : 0;
}

export default function SegmentedTabs({ className = "tabs" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const activeIndex = useMemo(() => getActiveIndex(pathname), [pathname]);
  const [displayIndex, setDisplayIndex] = useState(activeIndex);

  useEffect(() => {
    setDisplayIndex(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    ITEMS.forEach((item) => router.prefetch(item.href));
  }, [router]);

  function goTo(href: string, index: number) {
    if (pathname === href || (href !== "/" && pathname?.startsWith(href))) {
      setDisplayIndex(index);
      return;
    }

    setDisplayIndex(index);

    const nav = () => router.push(href, { scroll: false });
    const startViewTransition = (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition;

    if (typeof startViewTransition === "function") {
      startViewTransition(() => {
        nav();
      });
      return;
    }

    requestAnimationFrame(() => nav());
  }

  return (
    <div
      className={`segmentedTabs ${className}`}
      aria-label="Primary navigation"
      style={{ ["--segment-index" as string]: displayIndex } as CSSProperties}
    >
      <span className="segmentedTabsThumb" aria-hidden />
      {ITEMS.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={item.href}
            type="button"
            className="tabBtn"
            data-active={isActive ? "true" : "false"}
            aria-pressed={isActive ? "true" : "false"}
            onClick={() => goTo(item.href, index)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
