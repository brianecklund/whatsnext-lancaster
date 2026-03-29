import type { UpdateLite } from "@/app/updates/UpdatesSplitClient";

export type UpdateKind =
  | "menu"
  | "community"
  | "notice"
  | "opening"
  | "event"
  | "general"
  | "urgent"
  | "psa";

const KIND_SET = new Set<string>([
  "menu",
  "community",
  "notice",
  "opening",
  "event",
  "general",
  "urgent",
  "psa",
]);

function norm(v: string) {
  return (v || "").toLowerCase().trim();
}

function isNoiseTag(text: string) {
  const t = norm(text);
  return (
    t.includes("wnl_test_data") ||
    t.includes("general-test") ||
    t.includes("weeks-") ||
    t.startsWith("staging")
  );
}

function inferFromText(text: string): UpdateKind | null {
  const t = norm(text);
  if (!t) return null;
  if (/\burgent\b|\btime[\s-]?sensitive\b|\basap\b|\bimmediate\b|\btoday only\b/.test(t)) return "urgent";
  if (/\bmenu\b|\bbrunch\b|\bhappy hour\b|\bnew dish\b|\bdrink list\b|\bchef\b|\bspecials\b/.test(t)) return "menu";
  if (/\bopening\b|\bnow open\b|\bgrand opening\b|\blaunches\b|\bribbon cutting\b/.test(t)) return "opening";
  if (/\bnotice\b|\badvisory\b|\bheads[\s-]?up\b|\breminder\b/.test(t)) return "notice";
  if (/\bpsa\b|\bpublic service\b|\bstreet closure\b|\bparking\b/.test(t)) return "psa";
  if (/\bcommunity\b|\bneighborhood\b|\bcivic\b|\bvolunteer\b|\bstreet fair\b|\bfarmers market\b|\bmarket day\b/.test(t)) return "community";
  if (/\bconcert\b|\bshow\b|\bfestival\b|\bperformance\b|\bnotable event\b|\bheadliner\b/.test(t)) return "event";
  return null;
}

/** Primary kind for icon + label (explicit `kind` on update, else tags/title). */
export function resolveUpdateKind(update: UpdateLite): UpdateKind {
  const raw = update.kind;
  if (raw && KIND_SET.has(norm(raw))) return norm(raw) as UpdateKind;

  for (const tag of update.tags || []) {
    if (isNoiseTag(tag)) continue;
    const hit = inferFromText(tag);
    if (hit) return hit;
  }

  const fromTitle = inferFromText(update.title || "");
  if (fromTitle) return fromTitle;

  return "general";
}

export function updateKindIcon(kind: UpdateKind): string {
  switch (kind) {
    case "menu":
      return "◔";
    case "community":
      return "◎";
    case "notice":
      return "⌁";
    case "opening":
      return "✦";
    case "event":
      return "★";
    case "urgent":
      return "⏱";
    case "psa":
      return "!";
    case "general":
    default:
      return "•";
  }
}

export function updateKindLabel(kind: UpdateKind): string {
  switch (kind) {
    case "menu":
      return "Menu & dining";
    case "community":
      return "Community";
    case "notice":
      return "Notice";
    case "opening":
      return "Opening";
    case "event":
      return "Notable event";
    case "urgent":
      return "Time sensitive";
    case "psa":
      return "PSA";
    case "general":
    default:
      return "Update";
  }
}
