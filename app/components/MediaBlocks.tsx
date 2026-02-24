"use client";

import { useMemo, useState } from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slices?: any[] | null;
};

function asUrl(v: any): string | null {
  if (!v) return null;
  if (typeof v === "string") return v.trim() ? v : null;
  if (typeof v?.url === "string" && v.url) return v.url;
  if (typeof v?.href === "string" && v.href) return v.href;
  // Prismic Link fields sometimes appear as { url } or { link_type, ... }
  if (typeof v?.value === "string" && v.value) return v.value;
  return null;
}

function asText(rich: any): string {
  if (!rich) return "";
  if (typeof rich === "string") return rich;
  if (Array.isArray(rich)) {
    return rich
      .map((b) => (typeof b?.text === "string" ? b.text : ""))
      .filter(Boolean)
      .join("\n\n");
  }
  return "";
}

function safeHtml(v: any): string | null {
  if (!v) return null;
  if (typeof v === "string") return v;
  if (typeof v?.html === "string") return v.html;
  // Some embed fields include oEmbed html in `oembed.html`
  if (typeof v?.oembed?.html === "string") return v.oembed.html;
  return null;
}

export default function MediaBlocks({ slices }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const normalized = useMemo(() => (Array.isArray(slices) ? slices : []), [slices]);
  if (!normalized.length) return null;

  return (
    <div className="mediaBlocks">
      <div className="mediaBlocksTitle">More</div>

      {normalized.map((slice: any, idx: number) => {
        const type: string = String(slice?.slice_type ?? slice?.type ?? "").toLowerCase();
        const primary = slice?.primary ?? {};
        const items = Array.isArray(slice?.items) ? slice.items : [];

        // --- Gallery ---
        if (type.includes("gallery")) {
          const imgs = items
            .map((it: any) => ({
              url: asUrl(it?.image ?? it?.img ?? it?.photo ?? it?.media),
              caption: asText(it?.caption ?? it?.title ?? ""),
            }))
            .filter((x: any) => x.url);

          if (!imgs.length) return null;

          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              <div className="galleryGrid">
                {imgs.map((im: any, j: number) => (
                  <button
                    key={`${idx}-g-${j}`}
                    type="button"
                    className="galleryItem"
                    onClick={() => setLightboxSrc(im.url)}
                    aria-label={im.caption ? `Open image: ${im.caption}` : "Open image"}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={im.url} alt={im.caption || ""} loading="lazy" />
                  </button>
                ))}
              </div>
            </section>
          );
        }

        // --- Video (embed or file) ---
        if (type.includes("video")) {
          const embedHtml = safeHtml(primary?.video ?? primary?.embed ?? primary?.oembed);
          const fileUrl = asUrl(primary?.video_file ?? primary?.file ?? primary?.media);
          const posterUrl = asUrl(primary?.poster ?? primary?.poster_image ?? primary?.thumbnail);
          const caption = asText(primary?.caption ?? primary?.title ?? "");

          if (!embedHtml && !fileUrl) return null;

          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              {embedHtml ? (
                <div
                  className="embedWrap"
                  // Prismic embed fields are already HTML; we place them in a responsive wrapper.
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: embedHtml }}
                />
              ) : (
                <div className="videoWrap">
                  <video controls playsInline preload="metadata" poster={posterUrl ?? undefined}>
                    <source src={fileUrl as string} />
                  </video>
                </div>
              )}
              {caption ? <div className="mbCaption">{caption}</div> : null}
            </section>
          );
        }

        // --- GIF ---
        if (type.includes("gif")) {
          const gifUrl = asUrl(primary?.gif ?? primary?.image ?? primary?.media);
          const caption = asText(primary?.caption ?? "");
          if (!gifUrl) return null;
          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              <button
                type="button"
                className="singleMedia"
                onClick={() => setLightboxSrc(gifUrl)}
                aria-label="Open GIF"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gifUrl} alt={caption || ""} loading="lazy" />
              </button>
              {caption ? <div className="mbCaption">{caption}</div> : null}
            </section>
          );
        }

        // --- Single image ---
        if (type.includes("image") || type.includes("photo")) {
          const imgUrl = asUrl(primary?.image ?? primary?.photo ?? primary?.media);
          const caption = asText(primary?.caption ?? "");
          if (!imgUrl) return null;
          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              <button
                type="button"
                className="singleMedia"
                onClick={() => setLightboxSrc(imgUrl)}
                aria-label="Open image"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imgUrl} alt={caption || ""} loading="lazy" />
              </button>
              {caption ? <div className="mbCaption">{caption}</div> : null}
            </section>
          );
        }

        // --- Embed ---
        if (type.includes("embed")) {
          const embedHtml = safeHtml(primary?.embed ?? primary?.content ?? primary?.oembed);
          const caption = asText(primary?.caption ?? "");
          if (!embedHtml) return null;
          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              <div
                className="embedWrap"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: embedHtml }}
              />
              {caption ? <div className="mbCaption">{caption}</div> : null}
            </section>
          );
        }

        // --- Rich text ---
        if (type.includes("rich") || type.includes("text")) {
          const body = asText(primary?.body ?? primary?.text ?? primary?.content);
          if (!body) return null;
          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              <div className="mbRich">{body}</div>
            </section>
          );
        }

        // --- Buttons / links ---
        if (type.includes("button") || type.includes("link")) {
          const links = items
            .map((it: any) => ({
              label: String(it?.label ?? it?.text ?? it?.title ?? "").trim(),
              url: asUrl(it?.url ?? it?.link ?? it?.href),
            }))
            .filter((x: any) => x.label && x.url);
          if (!links.length) return null;
          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              <div className="mbButtons">
                {links.map((l: any, j: number) => (
                  <a key={`${idx}-b-${j}`} className="mbBtn" href={l.url} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                ))}
              </div>
            </section>
          );
        }

        // Unknown slice type: no-op (keeps the UI resilient)
        return null;
      })}

      {/* Lightbox */}
      {lightboxSrc ? (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightboxSrc(null)}>
          <button className="lightboxClose" type="button" onClick={() => setLightboxSrc(null)} aria-label="Close">
            ✕
          </button>
          <div className="lightboxInner" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightboxSrc} alt="" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
