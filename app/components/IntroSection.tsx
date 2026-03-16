
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const items = [
  "Live music tonight at Tellus360",
  "Open Mic at West Art",
  "Trivia Night at Southern Market",
  "Gallery Opening at Ware Center",
  "Broadway Cabaret at Prima Theatre",
  "New production at Fulton Theatre"
];

export default function IntroSection() {
  const track = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!track.current) return;

    const children = Array.from(track.current.children);

    gsap.to(children, {
      yPercent: -100 * children.length,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        yPercent: gsap.utils.wrap(-100 * children.length, 0)
      }
    });
  }, []);

  return (
    <section className="intro-section">
      <div className="intro-left">
        <h1>What's Next Lancaster</h1>
        <p>
          A live calendar of events, pop-ups, music, food, and happenings around
          Lancaster, Pennsylvania.
        </p>
      </div>

      <div className="intro-right ticker">
        <div ref={track} className="ticker-track">
          {items.concat(items).map((item, i) => (
            <div key={i} className="ticker-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
