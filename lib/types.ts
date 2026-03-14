export type LocationLite = {
  id: string;
  key?: string;
  uid?: string | null;
  name?: string | null;
  address?: string | null;
  category?: string | null;
  website?: string | null;
  description?: string | null;
  phone?: string | null;
  rating?: number | null;
  venue_external_id?: string | null;
  source?: string | null;
  customPageUid?: string | null;
  customPageUrl?: string | null;
};

export type EventLite = {
  id: string;
  key: string;
  uid?: string | null;

  title?: string | null;
  summary?: string | null;
  description?: string | null;
  descriptionText?: string | null;

  start_datetime?: string | null;
  end_datetime?: string | null;
  all_day?: boolean | null;

  event_type?: string | null;
  status?: 'Scheduled' | 'Cancelled' | 'Postponed' | string | null;
  featured?: boolean | null;

  cost?: string | null;
  age_restriction?: 'All ages' | '18+' | '21+' | string | null;

  website_url?: string | null;
  tickets_url?: string | null;

  image_url?: string | null;
  imageUrl?: string | null;
  tags?: string[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_blocks?: any[] | null;

  locationName?: string | null;
  address?: string | null;
  locationUrl?: string | null;
  venue_external_id?: string | null;
  location_page_uid?: string | null;

  location?: LocationLite | null;
};
