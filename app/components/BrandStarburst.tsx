"use client";

import { useEffect, useId, useRef } from "react";

const DROPLET_D =
  "M12 3.6c1.35 0 2.45 1.05 2.45 2.35 0 1.55-1.1 3.65-2.45 5.85-1.35-2.2-2.45-4.3-2.45-5.85 0-1.3 1.1-2.35 2.45-2.35z";

/**
 * Symmetrical droplet cluster beside the site title: gradient fill, spin + hue from scroll velocity.
 */
export default function BrandStarburst() {
  const gid = useId().replace(/:/g, "");
  const groupRef = useRef<SVGGElement | null>(null);
  const stop0Ref = useRef<SVGStopElement | null>(null);
  const stop1Ref = useRef<SVGStopElement | null>(null);
  const stop2Ref = useRef<SVGStopElement | null>(null);
  const velocityRef = useRef(0);
  const rotationRef = useRef(0);
  const scrollTopRef = useRef(new WeakMap<Element, number>());
  const rafRef = useRef(0);

  const dropletAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

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
      velocityRef.current += delta * 0.0024;
    };

    const onWheel = (e: WheelEvent) => {
      velocityRef.current += e.deltaY * 0.00135;
    };

    const tick = () => {
      const v = velocityRef.current;
      rotationRef.current += v;
      velocityRef.current *= 0.935;

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

  const gradId = `brand-droplets-${gid}`;

  return (
    <span className="brandStarburst" aria-hidden>
      <svg width="32" height="32" viewBox="0 0 24 24" className="brandStarburst__svg">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop ref={stop0Ref} offset="0%" stopColor="hsl(265 78% 52%)" />
            <stop ref={stop1Ref} offset="48%" stopColor="hsl(38 82% 58%)" />
            <stop ref={stop2Ref} offset="100%" stopColor="hsl(168 70% 48%)" />
          </linearGradient>
        </defs>
        <g ref={groupRef} transform="rotate(0 12 12)">
          {dropletAngles.map((deg) => (
            <g key={`o-${deg}`} transform={`rotate(${deg} 12 12) translate(0 -6.2)`}>
              <path d={DROPLET_D} fill={`url(#${gradId})`} />
            </g>
          ))}
          {innerAngles.map((deg) => (
            <g key={`i-${deg}`} transform={`rotate(${deg} 12 12) translate(0 -3.35) scale(0.58)`}>
              <path d={DROPLET_D} fill={`url(#${gradId})`} opacity={0.88} />
            </g>
          ))}
        </g>
      </svg>
    </span>
  );
}
