"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NewsTickerHub from "@/app/components/NewsTickerHub";
import type { UpdateLite } from "@/app/updates/UpdatesSplitClient";
import type { NewsHubSeasonContent } from "@/lib/news-hub-season";

type NewsTickerItem = {
  id?: string;
  label?: string;
  text: string;
  href?: string;
};

function stripInvisible(s: string) {
  return (s ?? "").replace(/\u200B/g, "").replace(/\uFEFF/g, "").replace(/\u00AD/g, "");
}

function tickerItemLine(item: NewsTickerItem): string {
  const text = stripInvisible(item.text ?? "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length > 0) return text;
  const label = stripInvisible(item.label ?? "").trim();
  if (label) return `${label}: see Updates for details.`;
  return "Community update.";
}

const HUB_CLOSE_MS = 340;

const DEFAULT_HUB_LEAD =
  "What’s Next Lancaster brings together a shared events calendar, a directory of places, and short community updates so you can see what’s on, where to go, and what just changed—whether you’re planning a night out or keeping up with openings and specials.";

export default function NewsTickerBar({
  introText,
  items,
  updates = [],
  hubLead = DEFAULT_HUB_LEAD,
  seasonLandingHref = "/spring",
  updatesHref = "/updates",
  seasonContent,
  className = "",
}: {
  introText: string;
  items: NewsTickerItem[];
  updates?: UpdateLite[];
  hubLead?: string;
  seasonLandingHref?: string;
  updatesHref?: string;
  seasonContent: NewsHubSeasonContent;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [hubOpen, setHubOpen] = useState(false);
  const [hubClosing, setHubClosing] = useState(false);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openHub = useCallback(() => {
    clearCloseTimer();
    setHubClosing(false);
    setHubOpen(true);
  }, [clearCloseTimer]);

  const requestCloseHub = useCallback(() => {
    if (!hubOpen || hubClosing) return;
    setHubClosing(true);
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setHubOpen(false);
      setHubClosing(false);
      closeTimerRef.current = null;
    }, HUB_CLOSE_MS);
  }, [hubOpen, hubClosing, clearCloseTimer]);

  const toggleHubFromBar = useCallback(() => {
    if (hubClosing) return;
    if (hubOpen) requestCloseHub();
    else openHub();
  }, [hubOpen, hubClosing, openHub, requestCloseHub]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  const renderedItems = useMemo(() => {
    const raw = !items.length
      ? [{ id: "ticker-empty", label: "NEWS", text: "Upcoming Lancaster events and pop-ups.", href: "#" as const }]
      : items.slice(0, 6);
    const base = raw.map((item) => ({ ...item, text: tickerItemLine(item) }));
    return [...base, base[0]];
  }, [items]);

  useEffect(() => {
    const newsWidget = rootRef.current;
    const slider = sliderRef.current;
    if (!newsWidget || !slider) return;

    const path = newsWidget.querySelector<SVGPathElement>(".js-news-widget__progress");
    if (!path) return;

    const length = path.getTotalLength();
    const duration = 2200;

    let counter = 1;
    let strokeTimer: number | undefined;
    let resetTimer: number | undefined;
    let destroyed = false;

    const measureHeight = () => {
      const allItems = Array.from(slider.querySelectorAll<HTMLElement>(".nw__slider__item"));
      if (!allItems.length) return 24;
      let maxH = 8;
      for (const el of allItems) {
        const h = el.getBoundingClientRect().height;
        if (h > maxH) maxH = h;
      }
      return Math.max(8, Math.round(maxH * 1000) / 1000);
    };

    const syncFixedHeights = () => {
      const wrapper = newsWidget.querySelector<HTMLElement>(".nw__wrapper");
      if (!wrapper) return;
      const allItems = Array.from(slider.querySelectorAll<HTMLElement>(".nw__slider__item"));
      if (!allItems.length) return;
      const itemHeightPx = measureHeight();
      wrapper.style.height = `${itemHeightPx}px`;
      for (const el of allItems) el.style.height = `${itemHeightPx}px`;
    };

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
      const allItems = Array.from(slider.querySelectorAll<HTMLElement>(".nw__slider__item"));
      if (!allItems.length) return;

      syncFixedHeights();
      const itemHeightPx = measureHeight();
      const y = Math.round(itemHeightPx * counter * 1000) / 1000;
      slider.style.transition = `transform ${duration / 1000 / 4}s ease-in-out`;
      slider.style.transform = `translate3d(0, -${y}px, 0)`;

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

    // If fonts/layout are still settling (common on mobile), measured heights can be 0-ish
    // which makes the slider land between items (blank frames). Wait for fonts + 2 frames,
    // then lock the wrapper/item heights and start the loop.
    const start = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fontsReady = (document as any)?.fonts?.ready as Promise<void> | undefined;
        if (fontsReady) await fontsReady;
      } catch {
        /* ignore */
      }
      if (destroyed) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (destroyed) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (destroyed) return;

      slider.style.transition = "none";
      slider.style.transform = "translate3d(0,0,0)";
      counter = 1;
      syncFixedHeights();
      animateStroke();
    };

    void start();

    return () => {
      destroyed = true;
      if (strokeTimer) window.clearTimeout(strokeTimer);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [renderedItems]);

  return (
    <>
      <section className={["newsBar", className].filter(Boolean).join(" ")} aria-label="Latest updates — open full list">
        <button
          type="button"
          className="newsBar__openBtn"
          onClick={toggleHubFromBar}
          aria-haspopup="dialog"
          aria-expanded={hubOpen}
          aria-label={hubOpen ? "Close latest updates panel" : undefined}
        >
          <span className="newsBar__intro">{introText}</span>

          <div className="nw js-news-widget" ref={rootRef}>
            <div className="nw__inner">
              <div className="nw__wrapper">
                <ul className="nw__slider" ref={sliderRef}>
                  {renderedItems.map((item, index) => (
                    <li key={item.id ? `nw-${item.id}-${index}` : `nw-${index}`} className="nw__slider__item">
                      <span className="nw__slider__text">
                        {item.label ? <strong>{item.label}:</strong> : null} {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="nw__progress" aria-hidden>
                <svg className="nw__progress__icon" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8 12.6H7v4.7h2.4c.2 2 1.7 3.9 3.7 4.5.4.1.8.2 1.2.2.7 0 1.3-.2 1.8-.6.6-.4.9-1 1.1-1.6L23 22V8l-12.2 4.6zm4.4 7.6c-.4.3-1 .3-1.6.1-1.3-.4-2.4-1.7-2.6-2.9l4.7 1.8c0 .4-.2.8-.5 1zm6.2-.5L11.8 16v-2l9.6-3.7v9.4z" />
                </svg>
                <svg className="nw__progress__indicator" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="js-news-widget__progress__bg"
                    d="M 50,50 m 0,-48.5 a 48.5,48.5 0 1 1 0,97 a 48.5,48.5 0 1 1 0,-97"
                    fill="none"
                  />
                  <path
                    className="js-news-widget__progress"
                    d="M 50,50 m 0,-48.5 a 48.5,48.5 0 1 1 0,97 a 48.5,48.5 0 1 1 0,-97"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </section>

      <NewsTickerHub
        open={hubOpen}
        closing={hubClosing}
        onRequestClose={requestCloseHub}
        introBarText={introText}
        hubLead={hubLead}
        updates={updates}
        seasonContent={seasonContent}
        updatesHref={updatesHref}
      />
    </>
  );
}
