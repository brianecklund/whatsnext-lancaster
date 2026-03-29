"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import type { UpdateLite } from "@/app/updates/UpdatesSplitClient";
import type { NewsHubSeasonContent, NewsHubSeasonTile } from "@/lib/news-hub-season";

type Props = {
  open: boolean;
  closing: boolean;
  onRequestClose: () => void;
  introBarText: string;
  hubLead: string;
  updates: UpdateLite[];
  seasonContent: NewsHubSeasonContent;
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

function SeasonTileInner({ tile }: { tile: NewsHubSeasonTile }) {
  return (
    <>
      {tile.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="newsTickerHubSeasonTileBg" src={tile.imageUrl} alt="" />
      ) : (
        <div className="newsTickerHubSeasonTileBg newsTickerHubSeasonTileBg--placeholder" aria-hidden />
      )}
      <div className="newsTickerHubSeasonTileScrim" aria-hidden />
      <span className="newsTickerHubSeasonTileTitle">{tile.title}</span>
    </>
  );
}

function SeasonGrid({
  content,
  onTileNavigate,
}: {
  content: NewsHubSeasonContent;
  onTileNavigate: () => void;
}) {
  return (
    <div className="newsTickerHubSeasonBlock">
      <p className="newsTickerHubSeasonEyebrow">{content.eyebrow}</p>
      <div className="newsTickerHubSeasonGrid">
        {content.rows.map((row, ri) =>
          row.kind === "one" ? (
            <Link
              key={`${ri}-full`}
              href={row.tile.href}
              className="newsTickerHubSeasonTile newsTickerHubSeasonTile--full"
              onClick={onTileNavigate}
            >
              <SeasonTileInner tile={row.tile} />
            </Link>
          ) : (
            <div key={ri} className="newsTickerHubSeasonRow">
              <Link
                href={row.left.href}
                className="newsTickerHubSeasonTile newsTickerHubSeasonTile--half"
                onClick={onTileNavigate}
              >
                <SeasonTileInner tile={row.left} />
              </Link>
              <Link
                href={row.right.href}
                className="newsTickerHubSeasonTile newsTickerHubSeasonTile--half"
                onClick={onTileNavigate}
              >
                <SeasonTileInner tile={row.right} />
              </Link>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default function NewsTickerHub({
  open,
  closing,
  onRequestClose,
  introBarText,
  hubLead,
  updates,
  seasonContent,
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
          <p className="newsTickerHubHeaderKicker">{introBarText}</p>
          <button type="button" className="newsTickerHubClose" onClick={onRequestClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="newsTickerHubScroll">
          <h2 className="newsTickerHubTitle">What’s happening in Lancaster</h2>
          <p className="newsTickerHubLead">{hubLead}</p>

          <SeasonGrid content={seasonContent} onTileNavigate={onRequestClose} />

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
                <li key={u.id} className="newsTickerHubCardWrap">
                  <Link
                    href={`${updatesHref}?u=${encodeURIComponent(u.id)}`}
                    className="newsTickerHubCard newsTickerHubCard--link"
                    onClick={onRequestClose}
                  >
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
                    <span className="newsTickerHubReadMore">Read on Updates →</span>
                  </Link>
                  {u.link ? (
                    <a href={u.link} className="newsTickerHubExternal" target="_blank" rel="noreferrer">
                      {u.linkLabel || "Open link"} →
                    </a>
                  ) : null}
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
