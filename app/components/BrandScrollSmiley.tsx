"use client";

import { useEffect, useId, useMemo, useRef } from "react";

/**
 * Brand mark: smiley face with a scroll-driven gradient (hue shifts + mild tilt use the same velocity / damping as the prior arrow).
 */
export default function BrandScrollSmiley() {
  const gid = useId().replace(/:/g, "");
  const faceGroupRef = useRef<SVGGElement | null>(null);
  const gradRef = useRef<SVGRadialGradientElement | null>(null);
  const stop0Ref = useRef<SVGStopElement | null>(null);
  const stop1Ref = useRef<SVGStopElement | null>(null);
  const stop2Ref = useRef<SVGStopElement | null>(null);
  const stop3Ref = useRef<SVGStopElement | null>(null);
  const velocityRef = useRef(0);
  const rotationRef = useRef(0);
  const scrollTopRef = useRef(new WeakMap<Element, number>());
  const rafRef = useRef(0);

  const { huePhase, spreadA, spreadB, spreadC } = useMemo(
    () => ({
      huePhase: Math.random() * 360,
      spreadA: 70 + Math.random() * 70,
      spreadB: 130 + Math.random() * 90,
      spreadC: 40 + Math.random() * 50,
    }),
    [],
  );

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
      const tilt = rot * 0.12;
      const faceG = faceGroupRef.current;
      if (faceG) faceG.setAttribute("transform", `rotate(${tilt} 12 12)`);

      const gradEl = gradRef.current;
      if (gradEl) {
        gradEl.setAttribute("gradientTransform", `rotate(${rot * 0.35} 12 12)`);
      }

      const base = (huePhase + rot * 1.12) % 360;
      const h0 = ((base % 360) + 360) % 360;
      const h1 = (h0 + spreadA) % 360;
      const h2 = (h0 + spreadB) % 360;
      const h3 = (h0 + spreadC) % 360;

      stop0Ref.current?.setAttribute("stop-color", `hsl(${h0} 82% 58%)`);
      stop1Ref.current?.setAttribute("stop-color", `hsl(${h1} 78% 52%)`);
      stop2Ref.current?.setAttribute("stop-color", `hsl(${h2} 72% 48%)`);
      stop3Ref.current?.setAttribute("stop-color", `hsl(${h3} 68% 44%)`);

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
  }, [huePhase, spreadA, spreadB, spreadC]);

  const gradId = `brand-smiley-${gid}`;

  return (
    <span className="brandScrollArrow" aria-hidden>
      <svg width="34" height="34" viewBox="0 0 24 24" className="brandScrollArrow__svg">
        <defs>
          <radialGradient
            ref={gradRef}
            id={gradId}
            cx="12"
            cy="12"
            r="11"
            fx="10"
            fy="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop ref={stop0Ref} offset="0%" stopColor="hsl(48 82% 58%)" />
            <stop ref={stop1Ref} offset="38%" stopColor="hsl(280 78% 52%)" />
            <stop ref={stop2Ref} offset="72%" stopColor="hsl(168 72% 48%)" />
            <stop ref={stop3Ref} offset="100%" stopColor="hsl(320 68% 44%)" />
          </radialGradient>
        </defs>
        <g ref={faceGroupRef} transform="rotate(0 12 12)">
          <circle cx="12" cy="12" r="9.25" fill={`url(#${gradId})`} />
          <circle cx="8.35" cy="9.85" r="1.35" fill="rgba(15,15,18,0.88)" />
          <circle cx="15.65" cy="9.85" r="1.35" fill="rgba(15,15,18,0.88)" />
          <path
            d="M 7.6 14.2 Q 12 19.2 16.4 14.2"
            fill="none"
            stroke="rgba(15,15,18,0.82)"
            strokeWidth="1.35"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </span>
  );
}
