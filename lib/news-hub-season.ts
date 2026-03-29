export type NewsHubSeasonTile = {
  title: string;
  imageUrl: string | null;
  href: string;
};

export type NewsHubSeasonRow =
  | { kind: "one"; tile: NewsHubSeasonTile }
  | { kind: "two"; left: NewsHubSeasonTile; right: NewsHubSeasonTile };

export type NewsHubSeasonContent = {
  eyebrow: string;
  rows: NewsHubSeasonRow[];
};

function asImageUrl(field: unknown): string | null {
  if (!field || typeof field !== "object") return null;
  const u = (field as { url?: string }).url;
  return typeof u === "string" && u.trim() ? u.trim() : null;
}

function asLinkHref(field: unknown): string | null {
  if (!field || typeof field !== "object") return null;
  const f = field as Record<string, unknown>;
  if (typeof f.url === "string" && f.url.trim()) return f.url.trim();
  if (f.link_type === "Web" && typeof f.url === "string" && f.url.trim()) return f.url.trim();
  if (f.link_type === "Document" && typeof f.uid === "string" && f.uid.trim()) {
    const t = typeof f.type === "string" ? f.type : "";
    if (t === "location") return `/locations/${f.uid}`;
    if (t === "page") return `/${f.uid}`;
    return null;
  }
  return null;
}

function mapTile(
  data: Record<string, unknown> | undefined | null,
  prefix: "tile_1" | "tile_2",
  resolveLink?: (field: unknown) => string | null,
): NewsHubSeasonTile | null {
  if (!data) return null;
  const titleRaw = data[`${prefix}_title`];
  const title = typeof titleRaw === "string" && titleRaw.trim() ? titleRaw.trim() : "";
  const imageUrl = asImageUrl(data[`${prefix}_image`]);
  const href =
    (resolveLink?.(data[`${prefix}_link`]) ?? asLinkHref(data[`${prefix}_link`]) ?? "#") || "#";
  if (!title && !imageUrl && href === "#") return null;
  return {
    title: title || "Explore",
    imageUrl,
    href: href === "#" ? "/" : href,
  };
}

/**
 * Prismic custom type `news_hub_settings` (singleton or one doc):
 * - `season_eyebrow` (Text): e.g. "This season"
 * - `season_rows` (Group, repeatable):
 *   - `row_layout` (Select): `one_up` | `two_up`
 *   - `tile_1_title`, `tile_1_image`, `tile_1_link`
 *   - `tile_2_title`, `tile_2_image`, `tile_2_link` (for `two_up`)
 */
export function parseNewsHubSeasonFromPrismicData(
  data: Record<string, unknown> | null | undefined,
  resolveLink?: (field: unknown) => string | null,
): NewsHubSeasonContent | null {
  if (!data || typeof data !== "object") return null;

  const eyebrowRaw = data.season_eyebrow;
  const eyebrow = typeof eyebrowRaw === "string" && eyebrowRaw.trim() ? eyebrowRaw.trim() : "This season";

  const rowsIn = data.season_rows;
  if (!Array.isArray(rowsIn) || rowsIn.length === 0) return null;

  const rows: NewsHubSeasonRow[] = [];

  for (const raw of rowsIn) {
    const row = raw as Record<string, unknown>;
    const layout = String(row.row_layout || row.layout || "").toLowerCase();
    const isTwo = layout === "two_up" || layout === "two" || layout === "2";

    const t1 = mapTile(row, "tile_1", resolveLink);
    const t2 = mapTile(row, "tile_2", resolveLink);

    if (isTwo && t1 && t2) {
      rows.push({ kind: "two", left: t1, right: t2 });
    } else if (t1) {
      rows.push({ kind: "one", tile: t1 });
    } else if (t2) {
      rows.push({ kind: "one", tile: t2 });
    }
  }

  if (!rows.length) return null;
  return { eyebrow, rows };
}

export const DEFAULT_NEWS_HUB_SEASON: NewsHubSeasonContent = {
  eyebrow: "This season",
  rows: [
    {
      kind: "two",
      left: { title: "Spring hub", imageUrl: null, href: "/spring" },
      right: { title: "Latest updates", imageUrl: null, href: "/updates" },
    },
    {
      kind: "two",
      left: { title: "Events calendar", imageUrl: null, href: "/" },
      right: { title: "Places directory", imageUrl: null, href: "/locations" },
    },
  ],
};
