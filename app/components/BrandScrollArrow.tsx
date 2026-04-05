"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Brand mark: arrow with radial gradient from the center; rotation and hue shift follow scroll velocity (same feel as the old droplet burst).
 */
export default function BrandScrollArrow() {
  const gid = useId().replace(/:/g, "");
  const groupRef = useRef<SVGGElement | null>(null);
  const stop0Ref = useRef<SVGStopElement | null>(null);
  const stop1Ref = useRef<SVGStopElement | null>(null);
  const stop2Ref = useRef<SVGStopElement | null>(null);
  const velocityRef = useRef(0);
  const rotationRef = useRef(0);
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
      velocityRef.current += delta * 0.0054;
    };

    const onWheel = (e: WheelEvent) => {
      velocityRef.current += e.deltaY * 0.0036;
    };

    const tick = () => {
      const v = velocityRef.current;
      rotationRef.current += v;
      velocityRef.current *= 0.942;

      const rot = rotationRef.current;
      const g = groupRef.current;
      if (g) g.setAttribute("transform", `rotate(${rot} 12 12)`);

      const hue0 = ((rot * 1.15) % 360 + 360) % 360;
      const hue1 = (hue0 + 118) % 360;
      const hue2 = (hue0 + 232) % 360;
      stop0Ref.current?.setAttribute("stop-color", `hsl(${hue0} 78% 52%)`);
      stop1Ref.current?.setAttribute("stop-color", `hsl(${hue1} 82% 58%)`);
      stop2Ref.current?.setAttribute("stop-color", `hsl(${hue2} 70% 48%)`);

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

  const gradId = `brand-arrow-${gid}`;

  return (
    <span className="brandScrollArrow" aria-hidden>
      <svg width="34" height="34" viewBox="0 0 24 24" className="brandScrollArrow__svg">
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="62%" fx="50%" fy="50%">
            <stop ref={stop0Ref} offset="0%" stopColor="hsl(265 78% 52%)" />
            <stop ref={stop1Ref} offset="52%" stopColor="hsl(38 82% 58%)" />
            <stop ref={stop2Ref} offset="100%" stopColor="hsl(168 70% 48%)" />
          </radialGradient>
        </defs>
        <g ref={groupRef} transform="rotate(0 12 12)">
          <path
            d="M12 4.25 L19.75 12 12 19.75 12 14.1 H5.5 V9.9 H12 Z"
            fill={`url(#${gradId})`}
          />
        </g>
      </svg>
    </span>
  );
}
