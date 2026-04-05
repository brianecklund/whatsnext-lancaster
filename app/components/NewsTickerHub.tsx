"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useEffect } from "react";
import type { NewsHubSeasonContent, NewsHubSeasonTile } from "@/lib/news-hub-season";

/** Subset of update fields for the explore hub list (avoids importing the heavy updates client here). */
export type NewsHubUpdatePreview = {
  id: string;
  title: string;
  pinned?: boolean | null;
  date?: string | null;
  summary?: string | null;
};

type Props = {
  open: boolean;
  closing: boolean;
  onRequestClose: () => void;
  introBarText: string;
  hubLead: string;
  seasonContent: NewsHubSeasonContent;
  updates?: NewsHubUpdatePreview[];
  updatesHref?: string;
};

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

function HubUpdatesBlock({
  updates,
  updatesHref,
  onTileNavigate,
}: {
  updates: NewsHubUpdatePreview[];
  updatesHref: string;
  onTileNavigate: () => void;
}) {
  const top = updates.slice(0, 4);
  const base = updatesHref.replace(/\/$/, "");

  return (
    <section className="newsTickerHubUpdatesBlock">
      <div className="newsTickerHubSectionHead">
        <h3 className="newsTickerHubSectionTitle">Latest updates</h3>
        <Link href={updatesHref} className="newsTickerHubAllLink" onClick={onTileNavigate}>
          View all
        </Link>
      </div>
      {top.length === 0 ? (
        <p className="newsTickerHubEmpty">No updates yet — check back soon.</p>
      ) : (
        <ul className="newsTickerHubList">
          {top.map((u) => (
            <li key={u.id} className="newsTickerHubCardWrap">
              <Link
                href={`${base}?u=${encodeURIComponent(u.id)}`}
                className="newsTickerHubCard newsTickerHubCard--link"
                onClick={onTileNavigate}
              >
                <div className="newsTickerHubCardInner">
                  <div className="wnlPlaceholderThumb" aria-hidden />
                  <div className="newsTickerHubCardBody">
                    <div className="newsTickerHubCardTop">
                      {u.pinned ? <span className="newsTickerHubPin">Pinned</span> : null}
                      {u.date ? <span>{u.date}</span> : null}
                    </div>
                    <div className="newsTickerHubCardTitle">{u.title}</div>
                    {u.summary ? <p className="newsTickerHubCardSummary">{u.summary}</p> : null}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function NewsTickerHub({
  open,
  closing,
  onRequestClose,
  introBarText,
  hubLead,
  seasonContent,
  updates = [],
  updatesHref = "/updates",
}: Props) {
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
        <button type="button" className="newsTickerHubHeader" onClick={onRequestClose} aria-label="Close What’s happening in Lancaster">
          <p className="newsTickerHubHeaderKicker">{introBarText}</p>
          <span className="newsTickerHubClose" aria-hidden>
            ✕
          </span>
        </button>

        <div className="newsTickerHubScroll">
          <h2 className="newsTickerHubTitle">What’s happening in Lancaster</h2>
          <p className="newsTickerHubLead">{hubLead}</p>

          <SeasonGrid content={seasonContent} onTileNavigate={onRequestClose} />

          <HubUpdatesBlock updates={updates} updatesHref={updatesHref} onTileNavigate={onRequestClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
