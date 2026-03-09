import type { ImportedVenue } from "./types";

const RULES: Array<{ match: RegExp; category: string }> = [
  { match: /(music venue|concert hall|live music|rock club|jazz club)/i, category: "Music Venue" },
  { match: /(theater|theatre|performing arts)/i, category: "Theater" },
  { match: /(event venue|banquet|wedding venue|conference center|community center)/i, category: "Event Space" },
  { match: /(coffee|cafe|espresso)/i, category: "Coffee Shop" },
  { match: /(bar|pub|cocktail|taproom|night club)/i, category: "Bar" },
  { match: /(brewery|brew pub)/i, category: "Brewery" },
  { match: /(restaurant|eatery|diner|food)/i, category: "Restaurant" },
  { match: /(gallery|museum|art center)/i, category: "Gallery" },
  { match: /(shop|store|boutique|retail)/i, category: "Store" },
  { match: /(service|agency|studio|salon|spa|office)/i, category: "Service" },
];

export function inferDirectoryCategory(venue: Pick<ImportedVenue, "category" | "rawCategories" | "name">): string {
  const haystack = [venue.category ?? "", ...(venue.rawCategories ?? []), venue.name ?? ""].join(" ");
  const rule = RULES.find((entry) => entry.match.test(haystack));
  return rule?.category ?? "Business";
}
