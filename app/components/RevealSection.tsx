"use client";

import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Fades a section in when it enters the viewport (for async / below-the-fold content).
 * Optional: add `className` or `style` as needed.
 */
export default function RevealSection({ children, className = "", ...rest }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={["wnl-reveal", visible ? "wnl-reveal--visible" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
