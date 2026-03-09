import { dedupeVenues } from "./normalize";
import { importFoursquareVenues } from "./providers/foursquare";
import { importGoogleVenues } from "./providers/google";
import { importYelpVenues } from "./providers/yelp";
import type { ImportedVenue, VenueImportParams, VenueImportResult, VenueImportProviderSummary, VenueSource } from "./types";

async function runProvider(
  source: VenueSource,
  fn: (params: VenueImportParams) => Promise<ImportedVenue[]>,
  params: VenueImportParams,
): Promise<{ items: ImportedVenue[]; summary: VenueImportProviderSummary }> {
  try {
    const items = await fn(params);
    return {
      items,
      summary: { count: items.length, enabled: true },
    };
  } catch (error) {
    return {
      items: [],
      summary: {
        count: 0,
        enabled: true,
        error: error instanceof Error ? error.message : `${source} import failed`,
      },
    };
  }
}

export async function importVenues(params: VenueImportParams): Promise<VenueImportResult> {
  const tasks = await Promise.all([
    runProvider("google", importGoogleVenues, params),
    runProvider("foursquare", importFoursquareVenues, params),
    runProvider("yelp", importYelpVenues, params),
  ]);

  return {
    venues: dedupeVenues(tasks.flatMap((task) => task.items)),
    providers: {
      google: tasks[0].summary,
      foursquare: tasks[1].summary,
      yelp: tasks[2].summary,
    },
  };
}
