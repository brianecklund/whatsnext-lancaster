/** Safe path for router.push from query params (same-origin only). */
export function sanitizeInternalReturnPath(raw: string | null | undefined): string | null {
  if (raw == null || raw === "") return null;
  let p = raw.trim();
  try {
    p = decodeURIComponent(p);
  } catch {
    return null;
  }
  if (!p.startsWith("/") || p.startsWith("//")) return null;
  const beforeHash = p.split("#")[0] ?? "";
  if (beforeHash.includes("..")) return null;
  return beforeHash || null;
}
