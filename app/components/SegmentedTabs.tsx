"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";

export type SegmentedView = "calendar" | "directory" | "updates";

const ITEMS = [
  { key: "calendar" as const, href: "/", label: "Calendar", match: (pathname: string) => pathname === "/" },
  { key: "directory" as const, href: "/locations", label: "Directory", match: (pathname: string) => pathname.startsWith("/locations") },
  { key: "updates" as const, href: "/updates", label: "Updates", match: (pathname: string) => pathname.startsWith("/updates") },
] as const;

function getActiveIndex(pathname: string | null) {
  const current = pathname || "/";
  const index = ITEMS.findIndex((item) => item.match(current));
  return index >= 0 ? index : 0;
}

function getIndexFromView(view: SegmentedView) {
  const index = ITEMS.findIndex((item) => item.key === view);
  return index >= 0 ? index : 0;
}

export default function SegmentedTabs({
  className = "tabs",
  activeView,
  onChange,
}: {
  className?: string;
  activeView?: SegmentedView;
  onChange?: (view: SegmentedView) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const routeIndex = useMemo(() => getActiveIndex(pathname), [pathname]);
  const controlledIndex = typeof activeView === "string" ? getIndexFromView(activeView) : routeIndex;
  const [displayIndex, setDisplayIndex] = useState(controlledIndex);

  useEffect(() => {
    setDisplayIndex(controlledIndex);
  }, [controlledIndex]);

  useEffect(() => {
    ITEMS.forEach((item) => router.prefetch(item.href));
  }, [router]);

  function goTo(index: number) {
    const item = ITEMS[index];
    setDisplayIndex(index);

    if (onChange) {
      onChange(item.key);
      return;
    }

    if (pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))) {
      return;
    }

    const nav = () => router.push(item.href, { scroll: false });
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
        const isActive = controlledIndex === index;
        return (
          <button
            key={item.href}
            type="button"
            className="tabBtn"
            data-active={isActive ? "true" : "false"}
            aria-pressed={isActive ? "true" : "false"}
            onClick={() => goTo(index)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
