"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import type { UpdateLite } from "@/app/updates/UpdatesSplitClient";

type Props = {
  open: boolean;
  closing: boolean;
  onRequestClose: () => void;
  introBarText: string;
  hubLead: string;
  updates: UpdateLite[];
  seasonLandingHref?: string;
  updatesHref?: string;
};

function tagIconFor(tag: string) {
  const t = (tag || "").toLowerCase();
  if (t.includes("opening") || t.includes("launch")) return "✦";
  if (t.includes("food") || t.includes("drink") || t.includes("menu")) return "◔";
  if (t.includes("music") || t.includes("show") || t.includes("concert")) return "♪";
  if (t.includes("art") || t.includes("gallery")) return "✳";
  if (t.includes("community") || t.includes("market")) return "◎";
  if (t.includes("alert") || t.includes("psa") || t.includes("notice")) return "!";
  return "•";
}

export default function NewsTickerHub({
  open,
  closing,
  onRequestClose,
  introBarText,
  hubLead,
  updates,
  seasonLandingHref = "/spring",
  updatesHref = "/updates",
}: Props) {
  const sorted = useMemo(() => {
    return [...updates].sort((a, b) => {
      const ap = a.pinned ? 1 : 0;
      const bp = b.pinned ? 1 : 0;
      if (ap !== bp) return bp - ap;
      const ad = a.sortDate || a.date || "";
      const bd = b.sortDate || b.date || "";
      return bd.localeCompare(ad);
    });
  }, [updates]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onRequestClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onRequestClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`newsTickerHubOverlay${closing ? " newsTickerHubOverlay--closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="What’s Next Lancaster highlights"
    >
      <button type="button" className="newsTickerHubBackdrop" aria-label="Close" onClick={onRequestClose} />
      <div className="newsTickerHubPanel" onClick={(e) => e.stopPropagation()}>
        <header className="newsTickerHubHeader">
          <button type="button" className="newsTickerHubClose" onClick={onRequestClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="newsTickerHubScroll">
          <p className="newsTickerHubKicker">{introBarText}</p>
          <h2 className="newsTickerHubTitle">What’s happening in Lancaster</h2>
          <p className="newsTickerHubLead">{hubLead}</p>

          <p className="newsTickerHubSeason">
            <span className="newsTickerHubSeasonLabel">This season:</span> Spring brings markets, patios, and energy
            back to Main Street. Visit the{" "}
            <Link href={seasonLandingHref} className="newsTickerHubSeasonLink" onClick={onRequestClose}>
              spring hub
            </Link>{" "}
            for suggestions, upcoming events, reviews, and updates in one place.
          </p>

          <div className="newsTickerHubSectionHead">
            <h3 className="newsTickerHubSectionTitle">Latest updates</h3>
            <Link href={updatesHref} className="newsTickerHubAllLink" onClick={onRequestClose}>
              View all →
            </Link>
          </div>

          {sorted.length === 0 ? (
            <p className="newsTickerHubEmpty muted">No updates posted yet. Check back soon.</p>
          ) : (
            <ul className="newsTickerHubList" role="list">
              {sorted.map((u) => (
                <li key={u.id} className="newsTickerHubCard">
                  <div className="newsTickerHubCardTop">
                    {u.pinned ? <span className="newsTickerHubPin">Pinned</span> : null}
                    {u.date ? <span className="newsTickerHubDate">{u.date}</span> : null}
                  </div>
                  <div className="newsTickerHubCardTitle">{u.title}</div>
                  {u.summary ? <p className="newsTickerHubCardSummary">{u.summary}</p> : null}
                  {u.tags?.length ? (
                    <div className="newsTickerHubTags">
                      {u.tags.slice(0, 4).map((t) => (
                        <span key={t} className="newsTickerHubTag">
                          <span className="newsTickerHubTagGlyph" aria-hidden>
                            {tagIconFor(t)}
                          </span>
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {u.link ? (
                    <a
                      href={u.link}
                      className="newsTickerHubExternal"
                      target="_blank"
                      rel="noreferrer"
                      onClick={onRequestClose}
                    >
                      {u.linkLabel || "Open link"} →
                    </a>
                  ) : (
                    <Link
                      href={`${updatesHref}?u=${encodeURIComponent(u.id)}`}
                      className="newsTickerHubReadMore"
                      onClick={onRequestClose}
                    >
                      Read on Updates →
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
