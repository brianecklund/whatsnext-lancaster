export type VenueSource = "google" | "foursquare" | "yelp";

export type ImportedVenue = {
  source: VenueSource;
  externalId: string;
  name: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  website?: string | null;
  phone?: string | null;
  rating?: number | null;
  category?: string | null;
  rawCategories?: string[];
  description?: string | null;
};

export type VenueImportParams = {
  query?: string;
  location?: string;
  radiusMeters?: number;
  lat?: number;
  lng?: number;
  limit?: number;
};
