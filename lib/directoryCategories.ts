export const DIRECTORY_CATEGORIES = [
  "Business",
  "Restaurant",
  "Store",
  "Music Venue",
  "Event Space",
  "Theater",
  "Coffee Shop",
  "Bar",
  "Brewery",
  "Gallery",
  "Service",
] as const;

export type DirectoryCategory = (typeof DIRECTORY_CATEGORIES)[number];

export function mergeDirectoryCategories(input: Array<string | null | undefined>): string[] {
  const discovered = input.filter((value): value is string => Boolean(value && value.trim()));
  return Array.from(new Set([...DIRECTORY_CATEGORIES, ...discovered])).sort((a, b) => a.localeCompare(b));
}
