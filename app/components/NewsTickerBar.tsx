"use client";

import { useEffect, useMemo, useRef } from "react";

type NewsTickerItem = {
  label?: string;
  text: string;
  href?: string;
};

export default function NewsTickerBar({
  introText,
  items,
}: {
  introText: string;
  items: NewsTickerItem[];
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLUListElement | null>(null);

  const renderedItems = useMemo(() => {
    if (!items.length) {
      return [{ label: "NEWS", text: "Upcoming Lancaster events and pop-ups.", href: "#" }];
    }
    const base = items.slice(0, 6);
    return [...base, base[0]];
  }, [items]);

  useEffect(() => {
    const newsWidget = rootRef.current;
    const slider = sliderRef.current;
    if (!newsWidget || !slider) return;

    const allItems = Array.from(slider.querySelectorAll<HTMLElement>(".nw__slider__item"));
    if (!allItems.length) return;

    const path = newsWidget.querySelector<SVGPathElement>(".js-news-widget__progress");
    if (!path) return;

    const itemHeight = allItems[0].getBoundingClientRect().height;
    const length = path.getTotalLength();
    const duration = 2200;

    let counter = 1;
    let strokeTimer: number | undefined;
    let resetTimer: number | undefined;
    let destroyed = false;

    const animateStroke = () => {
      if (destroyed) return;
      path.style.transition = "none";
      path.style.strokeDasharray = `${length} ${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.getBoundingClientRect();
      path.style.transition = `stroke-dashoffset ${duration / 1000}s linear`;
      path.style.strokeDashoffset = "0";

      strokeTimer = window.setTimeout(() => {
        slideItem();
      }, duration);
    };

    const slideItem = () => {
      if (destroyed) return;
      slider.style.transition = `transform ${duration / 1000 / 4}s ease-in-out`;
      slider.style.transform = `translate3d(0, -${itemHeight * counter}px, 0)`;

      if (counter === allItems.length - 1) {
        resetTimer = window.setTimeout(() => {
          slider.style.transition = "none";
          slider.style.transform = "translate3d(0,0,0)";
          counter = 1;
        }, duration / 4);
      } else {
        counter += 1;
      }

      animateStroke();
    };

    animateStroke();

    return () => {
      destroyed = true;
      if (strokeTimer) window.clearTimeout(strokeTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [renderedItems]);

  return (
    <section className="newsBar" aria-label="Latest updates">
      <div className="newsBar__intro">{introText}</div>

      <div className="nw js-news-widget" ref={rootRef}>
        <div className="nw__inner">
          <div className="nw__wrapper">
            <ul className="nw__slider" ref={sliderRef}>
              {renderedItems.map((item, index) => (
                <li key={`${item.text}-${index}`} className="nw__slider__item">
                  <a className="nw__slider__link" href={item.href || "#"}>
                    {item.label ? <strong>{item.label}:</strong> : null} {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="nw__progress" aria-hidden>
            <svg className="nw__progress__icon" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.8 12.6H7v4.7h2.4c.2 2 1.7 3.9 3.7 4.5.4.1.8.2 1.2.2.7 0 1.3-.2 1.8-.6.6-.4.9-1 1.1-1.6L23 22V8l-12.2 4.6zm4.4 7.6c-.4.3-1 .3-1.6.1-1.3-.4-2.4-1.7-2.6-2.9l4.7 1.8c0 .4-.2.8-.5 1zm6.2-.5L11.8 16v-2l9.6-3.7v9.4z" />
            </svg>
            <svg className="nw__progress__indicator" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path className="js-news-widget__progress__bg" d="M 50,50 m 0,-48.5 a 48.5,48.5 0 1 1 0,97 a 48.5,48.5 0 1 1 0,-97" fill="none" />
              <path className="js-news-widget__progress" d="M 50,50 m 0,-48.5 a 48.5,48.5 0 1 1 0,97 a 48.5,48.5 0 1 1 0,-97" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
