"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef } from "react";
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
  const touchRef = useRef<{
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    t0: number;
    target: EventTarget | null;
  } | null>(null);

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
    for (let i = 0; el && i < 14; i += 1) {
      // Fast checks first (avoid style calc if obviously not scrollable)
      if (el.scrollWidth > el.clientWidth + 2) {
        const ox = window.getComputedStyle(el).overflowX;
        if (ox === "auto" || ox === "scroll") return true;
      }
      el = el.parentElement;
    }
    return false;
  };

  useEffect(() => {
    if (!isMobile || mobileDetailOpen) return;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      touchRef.current = { x0: t.clientX, y0: t.clientY, x1: t.clientX, y1: t.clientY, t0: Date.now(), target: e.target };
    };

    const onMove = (e: TouchEvent) => {
      const state = touchRef.current;
      if (!state) return;
      const t = e.touches[0];
      if (!t) return;
      state.x1 = t.clientX;
      state.y1 = t.clientY;
    };

    const onEnd = (e: TouchEvent) => {
      const state = touchRef.current;
      touchRef.current = null;
      if (!state) return;

      // Ignore swipes that began inside horizontal scroll containers.
      if (isInHorizontalScrollArea(state.target)) return;

      const dx = state.x1 - state.x0;
      const dy = state.y1 - state.y0;
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      const dt = Date.now() - state.t0;

      // Horizontal swipe: strong x intent, limited vertical drift, not too slow.
      if (ax < 64) return;
      if (ax < ay * 1.6) return;
      if (ay > 46) return;
      if (dt > 800) return;

      const order: PageKey[] = ["calendar", "directory", "updates"];
      const idx = Math.max(0, order.indexOf(current));
      const nextIdx = dx < 0 ? Math.min(order.length - 1, idx + 1) : Math.max(0, idx - 1);
      const next = order[nextIdx];
      if (next !== current) navigateTo(next);
    };

    // Capture ensures we still get the end even if a child scroll area
    // is handling the gesture, and avoids relying on bubbling React handlers.
    window.addEventListener("touchstart", onStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onMove, { passive: true, capture: true });
    window.addEventListener("touchend", onEnd, { passive: true, capture: true });
    window.addEventListener("touchcancel", onEnd, { passive: true, capture: true });
    return () => {
      window.removeEventListener("touchstart", onStart, true);
      window.removeEventListener("touchmove", onMove, true);
      window.removeEventListener("touchend", onEnd, true);
      window.removeEventListener("touchcancel", onEnd, true);
    };
  }, [current, isMobile, mobileDetailOpen]); // keep deps minimal; router/items stable

  return (
    <div
      className="pageShell"
      style={style}
      data-mobile-detail-open={isMobile && mobileDetailOpen ? "true" : "false"}
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
