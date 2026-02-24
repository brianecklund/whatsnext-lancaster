export type LocationLite = {
  id: string;
  uid?: string | null;
  name?: string | null;
  address?: string | null;
  category?: string | null;
  website?: string | null;
  description?: string | null;
};

export type EventLite = {
  id: string;
  key: string;
  uid?: string | null;

  title?: string | null;
  summary?: string | null;
  description?: string | null;

  start_datetime?: string | null;
  end_datetime?: string | null;
  all_day?: boolean | null;

  event_type?: string | null;
  status?: "Scheduled" | "Cancelled" | "Postponed" | string | null;
  featured?: boolean | null;

  cost?: string | null;
  age_restriction?: "All ages" | "18+" | "21+" | string | null;

  website_url?: string | null;
  tickets_url?: string | null;

  image_url?: string | null;
  tags?: string[];

  /**
   * Optional Prismic Slice Zone for richer event content (gallery, video, embeds, etc.).
   * Stored as raw slice objects so the UI can render flexibly.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content_blocks?: any[] | null;

  location?: LocationLite | null;
};
