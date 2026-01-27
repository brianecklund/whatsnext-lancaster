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
  key: string; // uid if present else id (used for selection)
  uid?: string | null;
  title?: string | null;
  artists?: string | null;
  description?: string | null;
  start_datetime?: string | null;
  end_datetime?: string | null;
  event_type?: string | null;
  location?: LocationLite | null;
};
