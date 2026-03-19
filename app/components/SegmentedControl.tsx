"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";

type Item = {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
};

type Props = {
  items: Item[];
  currentKey: string;
  ariaLabel: string;
  className?: string;
  delayMs?: number;
  resetToKeyAfterAction?: string | null;
  resetDelayMs?: number;
};

export default function SegmentedControl({
  items,
  currentKey,
  ariaLabel,
  className = "",
  delayMs = 320,
  resetToKeyAfterAction = null,
  resetDelayMs = 220,
}: Props) {
  const router = useRouter();
  const [visualKey, setVisualKey] = useState(currentKey);
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const resetRef = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    items.forEach((item) => {
      if (item.href) router.prefetch(item.href);
    });
  }, [items, router]);

  useEffect(() => {
    if (!isPending) setVisualKey(currentKey);
  }, [currentKey, isPending]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (resetRef.current) window.clearTimeout(resetRef.current);
    };
  }, []);

  const activeIndex = useMemo(() => {
    const idx = items.findIndex((item) => item.key === visualKey);
    return idx >= 0 ? idx : 0;
  }, [items, visualKey]);

  const cols = Math.max(items.length, 1);

  function handleSelect(item: Item) {
    if (item.disabled || isPending) return;
    const isRoute = typeof item.href === "string";
    const isSameRoute = isRoute && item.key === currentKey;
    const isActionOnly = !isRoute && typeof item.onClick === "function";

    if (isSameRoute) return;

    setVisualKey(item.key);
    setIsPending(true);

    if (typeof document !== "undefined") {
      document.documentElement.dataset.routeSwitching = "true";
    }

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (isRoute && item.href) {
        const navigate = () => router.push(item.href as string);
        if (typeof document !== "undefined" && "startViewTransition" in document) {
          const doc = document as Document & {
            startViewTransition?: (cb: () => void) => void;
          };
          doc.startViewTransition?.(navigate);
        } else {
          navigate();
        }
      } else if (isActionOnly) {
        item.onClick?.();
        if (resetToKeyAfterAction) {
          if (resetRef.current) window.clearTimeout(resetRef.current);
          resetRef.current = window.setTimeout(() => {
            setVisualKey(resetToKeyAfterAction);
            setIsPending(false);
            if (typeof document !== "undefined") {
              delete document.documentElement.dataset.routeSwitching;
            }
          }, resetDelayMs);
          return;
        }
      }
      setIsPending(false);
    }, delayMs);
  }

  return (
    <div
      ref={rootRef}
      className={`segmentedControl ${className}`.trim()}
      style={{ ["--segments" as string]: cols, ["--active-index" as string]: activeIndex } as CSSProperties}
      role="tablist"
      aria-label={ariaLabel}
      data-pending={isPending ? "true" : "false"}
    >
      <div className="segmentedControl__pill" aria-hidden="true" />
      {items.map((item) => {
        const isActive = item.key === currentKey;
        const isVisualActive = item.key === visualKey;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            data-active={isActive ? "true" : "false"}
            data-visual-active={isVisualActive ? "true" : "false"}
            className="segmentedControl__button"
            onClick={() => handleSelect(item)}
            disabled={item.disabled}
          >
            <span className="segmentedControl__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
