"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  itemCount: number;
  ariaLabel?: string;
};

export default function WeeklyPreviewRail({ children, itemCount, ariaLabel }: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const loopLockRef = useRef(false);

  const syncActive = useCallback(() => {
    const el = railRef.current;
    if (!el || itemCount <= 0) return;
    const first = el.querySelector<HTMLElement>(".weeklyPreviewCard");
    if (!first) return;
    const styles = getComputedStyle(el);
    const gapRaw =
      styles.columnGap && styles.columnGap !== "normal" && styles.columnGap !== "0px"
        ? styles.columnGap
        : styles.gap || "12px";
    const gap = parseFloat(gapRaw) || 12;
    const step = first.offsetWidth + gap;
    if (step <= gap) return;
    let idx = Math.round(el.scrollLeft / step);
    idx = Math.max(0, Math.min(itemCount - 1, idx));
    setActive(idx);
  }, [itemCount]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onScroll = () => {
      syncActive();
      if (loopLockRef.current || itemCount <= 1) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 4) return;
      if (el.scrollLeft >= maxScroll - 12) {
        loopLockRef.current = true;
        el.scrollTo({ left: 0, behavior: "smooth" });
        window.setTimeout(() => {
          loopLockRef.current = false;
        }, 450);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => syncActive()) : null;
    ro?.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro?.disconnect();
    };
  }, [itemCount, syncActive]);

  useEffect(() => {
    syncActive();
  }, [itemCount, syncActive]);

  function scrollToIndex(i: number) {
    const el = railRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".weeklyPreviewCard");
    if (!first) return;
    const styles = getComputedStyle(el);
    const gapRaw =
      styles.columnGap && styles.columnGap !== "normal" && styles.columnGap !== "0px"
        ? styles.columnGap
        : styles.gap || "12px";
    const gap = parseFloat(gapRaw) || 12;
    const step = first.offsetWidth + gap;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  }

  return (
    <div className="weeklyPreviewRailWrap">
      <div ref={railRef} className="weeklyPreviewRail" aria-label={ariaLabel ?? "Swipe through upcoming events this week"}>
        {children}
      </div>
      {itemCount > 1 ? (
        <div className="weeklyPreviewRailDots" role="tablist" aria-label="Event cards">
          {Array.from({ length: itemCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`weeklyPreviewRailDot${i === active ? " weeklyPreviewRailDot--active" : ""}`}
              aria-label={`Card ${i + 1} of ${itemCount}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
