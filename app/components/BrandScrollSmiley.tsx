"use client";

import { useEffect, useRef } from "react";

const BASE_DEG_PER_FRAME = 0.22;

/**
 * Brand mark: black line smiley; constant slow rotation, with extra angular velocity from scroll/wheel that damps back to base speed.
 */
export default function BrandScrollSmiley() {
  const faceRef = useRef<SVGGElement | null>(null);
  const angleRef = useRef(0);
  const boostRef = useRef(0);
  const scrollTopRef = useRef(new WeakMap<Element, number>());
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = (e: Event) => {
      const el = e.target;
      if (!(el instanceof HTMLElement)) return;
      if (el.scrollHeight <= el.clientHeight + 2) return;
      const prev = scrollTopRef.current.get(el);
      const st = el.scrollTop;
      scrollTopRef.current.set(el, st);
      if (prev === undefined) return;
      const delta = st - prev;
      boostRef.current += delta * 0.014;
    };

    const onWheel = (e: WheelEvent) => {
      boostRef.current += e.deltaY * 0.009;
    };

    const tick = () => {
      boostRef.current *= 0.94;
      angleRef.current += BASE_DEG_PER_FRAME + boostRef.current;
      const a = angleRef.current;
      faceRef.current?.setAttribute("transform", `rotate(${a} 12 12)`);
      rafRef.current = requestAnimationFrame(tick);
    };

    document.addEventListener("scroll", onScroll, true);
    document.addEventListener("wheel", onWheel, { passive: true, capture: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("wheel", onWheel, true);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stroke = "#141418";

  return (
    <span className="brandScrollArrow" aria-hidden>
      <svg width="34" height="34" viewBox="0 0 24 24" className="brandScrollArrow__svg">
        <g ref={faceRef} transform="rotate(0 12 12)">
          <circle cx="12" cy="12" r="9.25" fill="none" stroke={stroke} strokeWidth="1.35" />
          <circle cx="8.35" cy="9.85" r="1.15" fill="none" stroke={stroke} strokeWidth="1.2" />
          <circle cx="15.65" cy="9.85" r="1.15" fill="none" stroke={stroke} strokeWidth="1.2" />
          <path
            d="M 7.6 14.2 Q 12 19.2 16.4 14.2"
            fill="none"
            stroke={stroke}
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </span>
  );
}
