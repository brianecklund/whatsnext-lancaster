export type VenueSource = "google" | "foursquare" | "yelp";

export type ImportedVenue = {
  source: VenueSource;
  externalId: string;
  name: string;
  slug: string;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  website?: string | null;
  phone?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  category?: string | null;
  rawCategories?: string[];
  description?: string | null;
  hoursText?: string[] | null;
  imageUrl?: string | null;
  importRank?: number | null;
};

export type VenueImportParams = {
  query?: string;
  location?: string;
  radiusMeters?: number;
  lat?: number;
  lng?: number;
  limit?: number;
};

export type VenueImportProviderSummary = {
  count: number;
  enabled: boolean;
  error?: string;
};

export type VenueImportResult = {
  venues: ImportedVenue[];
  providers: Record<VenueSource, VenueImportProviderSummary>;
};
