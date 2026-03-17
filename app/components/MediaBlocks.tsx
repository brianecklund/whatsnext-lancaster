"use client";

import { useMemo, useRef, useState, type MouseEvent } from "react";

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
  const tiltRaf = useRef<number | null>(null);

  const normalized = useMemo(() => (Array.isArray(slices) ? slices : []), [slices]);
  if (!normalized.length) return null;

  function onTiltMove(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget as HTMLElement;
    if (el.dataset.tilt !== "true") return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / Math.max(1, rect.width);
    const py = (e.clientY - rect.top) / Math.max(1, rect.height);
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 10;

    if (tiltRaf.current) cancelAnimationFrame(tiltRaf.current);
    tiltRaf.current = requestAnimationFrame(() => {
      el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
    });
  }

  function onTiltLeave(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget as HTMLElement;
    if (el.dataset.tilt !== "true") return;
    el.style.setProperty("--tilt-rx", `0deg`);
    el.style.setProperty("--tilt-ry", `0deg`);
  }

  return (
    <div className="mediaBlocks">
      <div className="mediaBlocksTitle">More</div>

      {normalized.map((slice: any, idx: number) => {
        const type: string = String(slice?.slice_type ?? slice?.type ?? "").toLowerCase();
        const primary = slice?.primary ?? {};
        const items = Array.isArray(slice?.items) ? slice.items : [];
        const variation: string = String(slice?.variation ?? "").toLowerCase();

        // --- Showcase Hero ---
        if (type.includes("showcase_hero")) {
          const style = String(primary?.style ?? "clean").toLowerCase();
          const caption = asText(primary?.caption ?? "");
          const embedHtml = safeHtml(primary?.media_embed ?? primary?.embed ?? primary?.oembed);
          const fileUrl = asUrl(primary?.media_video_file ?? primary?.video_file ?? primary?.file);
          const imgUrl = asUrl(primary?.media_image ?? primary?.image ?? primary?.photo);
          const posterUrl = asUrl(primary?.poster ?? primary?.poster_image ?? primary?.thumbnail);

          if (!embedHtml && !fileUrl && !imgUrl) return null;

          return (
            <section className="mbSection mbHero" key={`${type}-${idx}`}>
              <div
                className={`showcaseHero ${style} motionReveal`}
                data-tilt={style === "glow" || style === "poster" ? "true" : "false"}
                onMouseMove={onTiltMove}
                onMouseLeave={onTiltLeave}
              >
                {embedHtml ? (
                  <div
                    className="embedWrap"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: embedHtml }}
                  />
                ) : fileUrl ? (
                  <div className="videoWrap">
                    <video controls playsInline preload="metadata" poster={posterUrl ?? undefined}>
                      <source src={fileUrl as string} />
                    </video>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="singleMedia"
                    onClick={() => setLightboxSrc(imgUrl)}
                    aria-label="Open media"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl as string} alt={caption || ""} loading="lazy" />
                  </button>
                )}
              </div>
              {caption ? <div className="mbCaption">{caption}</div> : null}
            </section>
          );
        }

        // --- Showcase Gallery / Gallery ---
        if (type.includes("showcase_gallery") || type.includes("gallery")) {
          const hoverStyle = String(primary?.hover ?? "zoom").toLowerCase();
          const imgs = items
            .map((it: any) => ({
              url: asUrl(it?.image ?? it?.img ?? it?.photo ?? it?.media),
              caption: asText(it?.caption ?? it?.title ?? ""),
            }))
            .filter((x: any) => x.url);

          if (!imgs.length) return null;

          return (
            <section className="mbSection" key={`${type}-${idx}`}>
              <div className={`galleryGrid motionReveal ${hoverStyle === "reveal" ? "hoverReveal" : "hoverZoom"}`}>
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

        // --- Showcase Embed ---
        if (type.includes("showcase_embed")) {
          const embedHtml = safeHtml(primary?.embed ?? primary?.content ?? primary?.oembed);
          const caption = asText(primary?.caption ?? "");
          if (!embedHtml) return null;
          return (
            <section className="mbSection motionReveal" key={`${type}-${idx}`}>
              <div
                className="embedWrap"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: embedHtml }}
              />
              {caption ? <div className="mbCaption">{caption}</div> : null}
            </section>
          );
        }

        // --- Showcase Video (embed or file) ---
        if (type.includes("showcase_video") || type.includes("video")) {
          const embedHtml = safeHtml(primary?.video ?? primary?.embed ?? primary?.oembed);
          const fileUrl = asUrl(primary?.video_file ?? primary?.file ?? primary?.media);
          const posterUrl = asUrl(primary?.poster ?? primary?.poster_image ?? primary?.thumbnail);
          const caption = asText(primary?.caption ?? primary?.title ?? "");

          if (!embedHtml && !fileUrl) return null;

          return (
            <section className="mbSection motionReveal" key={`${type}-${idx}`}>
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

        // --- Showcase GIF / GIF ---
        if (type.includes("showcase_gif") || type.includes("gif")) {
          const gifUrl = asUrl(primary?.gif ?? primary?.image ?? primary?.media);
          const caption = asText(primary?.caption ?? "");
          if (!gifUrl) return null;
          return (
            <section className="mbSection motionReveal" key={`${type}-${idx}`}>
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

        // --- Showcase Image / Single image ---
        if (type.includes("showcase_image") || type.includes("image") || type.includes("photo")) {
          const imgUrl = asUrl(primary?.image ?? primary?.photo ?? primary?.media);
          const caption = asText(primary?.caption ?? "");
          if (!imgUrl) return null;
          return (
            <section className="mbSection motionReveal" key={`${type}-${idx}`}>
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

        
// --- Showcase Row (2-up / 3-up mixed media) ---
if (
  type.includes("showcase_row") ||
  type.includes("media_row") ||
  type.includes("mediarow") ||
  type.includes("media-grid") ||
  type.includes("mediagrid") ||
  type.includes("media_row_grid") ||
  type.includes("row_grid")
) {
  const layoutRaw = String(primary?.layout ?? primary?.columns ?? primary?.grid ?? "").toLowerCase();
  const cols =
    variation.includes("three") || variation.includes("3")
      ? 3
      : variation.includes("two") || variation.includes("2")
      ? 2
      : layoutRaw.includes("3") || layoutRaw.includes("three")
      ? 3
      : 2;

  const cells = items
    .map((it: any) => {
      const caption = asText(it?.caption ?? it?.title ?? "");
      const behavior = String(it?.behavior ?? "none").toLowerCase();
      // Embed (YouTube/Vimeo/etc)
      const embedHtml = safeHtml(it?.embed ?? it?.oembed ?? it?.video ?? it?.content);
      if (embedHtml) return { kind: "embed", embedHtml, caption, behavior };

      // Video file (mp4/webm)
      const fileUrl = asUrl(it?.video_file ?? it?.file ?? it?.video ?? it?.media);
      const posterUrl = asUrl(it?.poster ?? it?.poster_image ?? it?.thumbnail);
      if (fileUrl && String(fileUrl).match(/\.(mp4|webm|mov)(\?|#|$)/i)) {
        return { kind: "video", fileUrl, posterUrl, caption, behavior };
      }

      // Image / GIF
      const imgUrl = asUrl(it?.image ?? it?.gif ?? it?.img ?? it?.photo ?? it?.media);
      if (imgUrl) return { kind: "image", imgUrl, caption, behavior };

      return null;
    })
    .filter(Boolean);

  if (!cells.length) return null;

  return (
    <section className="mbSection motionReveal" key={`${type}-${idx}`}>
      <div className={`mediaRowGrid cols${cols}`}>
        {cells.map((c: any, j: number) => {
          if (c.kind === "embed") {
            return (
              <div
                key={`${idx}-mr-${j}`}
                className={`mediaCell embedCell ${c.behavior === "parallax" ? "parallax" : ""}`}
              >
                <div
                  className="embedWrap"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: c.embedHtml }}
                />
                {c.caption ? <div className="mbCaption">{c.caption}</div> : null}
              </div>
            );
          }

          if (c.kind === "video") {
            return (
              <div
                key={`${idx}-mr-${j}`}
                className={`mediaCell videoCell ${c.behavior === "parallax" ? "parallax" : ""}`}
              >
                <div className="videoWrap">
                  <video controls playsInline preload="metadata" poster={c.posterUrl ?? undefined}>
                    <source src={c.fileUrl} />
                  </video>
                </div>
                {c.caption ? <div className="mbCaption">{c.caption}</div> : null}
              </div>
            );
          }

          return (
            <div
              key={`${idx}-mr-${j}`}
              className={`mediaCell imageCell ${c.behavior === "tilt" ? "tilt" : ""} ${c.behavior === "parallax" ? "parallax" : ""}`}
              data-tilt={c.behavior === "tilt" ? "true" : "false"}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
            >
              <button
                type="button"
                className="singleMedia"
                onClick={() => setLightboxSrc(c.imgUrl)}
                aria-label={c.caption ? `Open image: ${c.caption}` : "Open image"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.imgUrl} alt={c.caption || ""} loading="lazy" />
              </button>
              {c.caption ? <div className="mbCaption">{c.caption}</div> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

        // --- Embed (legacy) ---
        if (type.includes("embed")) {
          const embedHtml = safeHtml(primary?.embed ?? primary?.content ?? primary?.oembed);
          const caption = asText(primary?.caption ?? "");
          if (!embedHtml) return null;
          return (
            <section className="mbSection motionReveal" key={`${type}-${idx}`}>
              <div
                className="embedWrap"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: embedHtml }}
              />
              {caption ? <div className="mbCaption">{caption}</div> : null}
            </section>
          );
        }

        // --- Showcase Text / Rich text ---
        if (type.includes("showcase_text") || type.includes("rich") || type.includes("text")) {
          const kicker = asText(primary?.kicker ?? "");
          const heading = asText(primary?.heading ?? primary?.title ?? "");
          const body = asText(primary?.body ?? primary?.text ?? primary?.content);
          const style = String(primary?.style ?? "plain").toLowerCase();
          const align = String(primary?.align ?? "left").toLowerCase();
          if (!kicker && !heading && !body) return null;
          return (
            <section className={`mbSection motionReveal showcaseText ${align}`} key={`${type}-${idx}`}>
              {kicker ? (
                style === "marquee" ? (
                  <div className="marquee" aria-label={kicker}>
                    <div className="marqueeTrack">
                      <span>{kicker}</span>
                      <span aria-hidden="true">{kicker}</span>
                      <span aria-hidden="true">{kicker}</span>
                    </div>
                  </div>
                ) : (
                  <div className="kicker">{kicker}</div>
                )
              ) : null}
              {heading ? <div className="mbHeading">{heading}</div> : null}
              {body ? <div className={`mbRich ${style}`}>{body}</div> : null}
            </section>
          );
        }

        // --- Showcase CTA / Buttons / links ---
        if (type.includes("showcase_cta") || type.includes("button") || type.includes("link")) {
          const links = items
            .map((it: any) => ({
              label: String(it?.label ?? it?.text ?? it?.title ?? "").trim(),
              url: asUrl(it?.url ?? it?.link ?? it?.href),
              variant: String(it?.variant ?? "ghost").toLowerCase(),
            }))
            .filter((x: any) => x.label && x.url);
          if (!links.length) return null;
          return (
            <section className="mbSection motionReveal" key={`${type}-${idx}`}>
              <div className="mbButtons">
                {links.map((l: any, j: number) => (
                  <a
                    key={`${idx}-b-${j}`}
                    className={`mbBtn ${l.variant === "primary" ? "primary" : ""}`}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                  >
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
