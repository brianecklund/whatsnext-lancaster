import type { ImportedVenue } from "./types";

const RULES: Array<{ match: RegExp; category: string }> = [
  { match: /(music venue|concert hall|live music|rock club|jazz club|venue)/i, category: "Music Venue" },
  { match: /(theater|theatre|performing arts|playhouse)/i, category: "Theater" },
  { match: /(event venue|banquet|wedding venue|conference center|community center|event space|hall)/i, category: "Event Space" },
  { match: /(coffee|cafe|espresso|roaster)/i, category: "Coffee Shop" },
  { match: /(bar|pub|cocktail|taproom|night club|speakeasy)/i, category: "Bar" },
  { match: /(brewery|brew pub)/i, category: "Brewery" },
  { match: /(restaurant|eatery|diner|food|pizza|brunch|bistro)/i, category: "Restaurant" },
  { match: /(gallery|museum|art center)/i, category: "Gallery" },
  { match: /(shop|store|boutique|retail|market)/i, category: "Store" },
  { match: /(service|agency|studio|salon|spa|office)/i, category: "Service" },
];

export function inferDirectoryCategory(venue: Pick<ImportedVenue, "category" | "rawCategories" | "name">): string {
  const haystack = [venue.category ?? "", ...(venue.rawCategories ?? []), venue.name ?? ""].join(" ");
  const rule = RULES.find((entry) => entry.match.test(haystack));
  return rule?.category ?? "Business";
}
