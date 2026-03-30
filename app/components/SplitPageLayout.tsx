"use client";

import type { CSSProperties, ReactNode } from "react";
import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import SegmentedControl from "@/app/components/SegmentedControl";

type PageKey = "calendar" | "directory" | "updates";

type Props = {
  tagline: string;
  taglineHidden?: boolean;
  isMobile?: boolean;
  mobileDetailOpen?: boolean;
  current: PageKey;
  children: ReactNode;
  mobileOverlay?: ReactNode;
  style?: CSSProperties;
  onNavigateSection?: (section: PageKey) => void;
  topBar?: ReactNode;
  hideDefaultIntro?: boolean;
};

export default function SplitPageLayout({
  tagline,
  taglineHidden = false,
  isMobile = false,
  mobileDetailOpen = false,
  current,
  children,
  mobileOverlay,
  style,
  onNavigateSection,
  topBar,
  hideDefaultIntro = false,
}: Props) {
  const router = useRouter();
  const touchRef = useRef<{ x: number; y: number; t: number; target: EventTarget | null } | null>(null);

  const items = useMemo(
    () => [
      { key: "calendar" as const, label: "Calendar", href: "/" },
      { key: "directory" as const, label: "Directory", href: "/locations" },
      { key: "updates" as const, label: "Updates", href: "/updates" },
    ],
    [],
  );

  const navigateTo = (next: PageKey) => {
    if (onNavigateSection) {
      onNavigateSection(next);
      return;
    }
    const href = items.find((i) => i.key === next)?.href ?? "/";
    router.push(href);
  };

  const isInHorizontalScrollArea = (target: EventTarget | null) => {
    let el = target instanceof Element ? target : null;
    for (let i = 0; el && i < 10; i += 1) {
      const style = window.getComputedStyle(el);
      const ox = style.overflowX;
      const isScrollable = (ox === "auto" || ox === "scroll") && el.scrollWidth > el.clientWidth + 2;
      if (isScrollable) return true;
      el = el.parentElement;
    }
    return false;
  };

  return (
    <div
      className="pageShell"
      style={style}
      data-mobile-detail-open={isMobile && mobileDetailOpen ? "true" : "false"}
      onTouchStart={(e) => {
        if (!isMobile || mobileDetailOpen) return;
        const t = e.touches?.[0];
        if (!t) return;
        touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now(), target: e.target };
      }}
      onTouchEnd={(e) => {
        if (!isMobile || mobileDetailOpen) return;
        const start = touchRef.current;
        touchRef.current = null;
        const t = e.changedTouches?.[0];
        if (!start || !t) return;

        // Ignore swipes starting inside horizontal scroll containers.
        if (isInHorizontalScrollArea(start.target)) return;

        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        const ax = Math.abs(dx);
        const ay = Math.abs(dy);
        const dt = Date.now() - start.t;

        // Horizontal swipe: strong x intent, limited vertical drift, not too slow.
        if (ax < 64) return;
        if (ax < ay * 1.6) return;
        if (ay > 46) return;
        if (dt > 700) return;

        const order: PageKey[] = ["calendar", "directory", "updates"];
        const idx = Math.max(0, order.indexOf(current));
        const nextIdx = dx < 0 ? Math.min(order.length - 1, idx + 1) : Math.max(0, idx - 1);
        const next = order[nextIdx];
        if (next !== current) navigateTo(next);
      }}
    >
      {topBar ?? (!hideDefaultIntro ? (
        <section className={`newsBar pageIntroBar ${taglineHidden ? "pageIntroBarHidden" : ""}`} aria-label="Page introduction">
          <div className="newsBar__intro">{tagline}</div>
        </section>
      ) : null)}
      {children}
      {isMobile ? (
        <div className="mobileTabs mobilePrimaryTabs mobileTabDock" aria-label="Primary navigation">
          <SegmentedControl
            className="segmentedControl--mobile"
            ariaLabel="Primary navigation"
            currentKey={current}
            items={[
              { key: "calendar", label: "Calendar", href: onNavigateSection ? undefined : "/", onClick: onNavigateSection ? () => onNavigateSection("calendar") : undefined },
              { key: "directory", label: "Directory", href: onNavigateSection ? undefined : "/locations", onClick: onNavigateSection ? () => onNavigateSection("directory") : undefined },
              { key: "updates", label: "Updates", href: onNavigateSection ? undefined : "/updates", onClick: onNavigateSection ? () => onNavigateSection("updates") : undefined },
            ]}
          />
        </div>
      ) : null}
      {mobileOverlay}
    </div>
  );
}
