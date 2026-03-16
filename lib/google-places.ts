
import "server-only";

export type PlacePhoto = {
  name: string;
  widthPx?: number | null;
  heightPx?: number | null;
  authorAttributions?: Array<{
    displayName?: string;
    uri?: string;
    photoUri?: string;
  }>;
};

export type PlaceDetailsLite = {
  placeId: string;
  displayName?: string | null;
  formattedAddress?: string | null;
  websiteUri?: string | null;
  nationalPhoneNumber?: string | null;
  googleMapsUri?: string | null;
  rating?: number | null;
  openNow?: boolean | null;
  weekdayDescriptions: string[];
  photos: PlacePhoto[];
  coverImageUrl?: string | null;
  galleryImageUrls: string[];
  photoAttributions: string[];
};

type GooglePlaceDetailsResponse = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  googleMapsUri?: string;
  rating?: number;
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
  };
  currentOpeningHours?: {
    openNow?: boolean;
    weekdayDescriptions?: string[];
  };
  photos?: PlacePhoto[];
};

const DETAILS_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "websiteUri",
  "nationalPhoneNumber",
  "googleMapsUri",
  "rating",
  "regularOpeningHours",
  "currentOpeningHours",
  "photos",
].join(",");

function getApiKey(): string {
  const key = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    throw new Error("Missing GOOGLE_PLACES_API_KEY or GOOGLE_MAPS_API_KEY");
  }
  return key;
}

export function buildPlacePhotoProxyUrl(name: string, maxWidthPx = 1600) {
  const params = new URLSearchParams({
    name,
    maxWidthPx: String(maxWidthPx),
  });
  return `/api/places/photo?${params.toString()}`;
}

export function normalizePlaceDetails(data: GooglePlaceDetailsResponse | null | undefined): PlaceDetailsLite | null {
  const placeId = data?.id?.trim();
  if (!placeId) return null;

  const photos = Array.isArray(data?.photos)
    ? data!.photos
        .filter((photo): photo is PlacePhoto => Boolean(photo?.name))
        .slice(0, 10)
    : [];

  const coverImageUrl = photos[0]?.name ? buildPlacePhotoProxyUrl(photos[0].name, 1800) : null;
  const galleryImageUrls = photos.slice(1, 7).map((photo) => buildPlacePhotoProxyUrl(photo.name, 1400));
  const weekdayDescriptions =
    data?.regularOpeningHours?.weekdayDescriptions ||
    data?.currentOpeningHours?.weekdayDescriptions ||
    [];
  const photoAttributions = Array.from(
    new Set(
      photos
        .flatMap((photo) => photo.authorAttributions || [])
        .map((item) => item?.displayName?.trim())
        .filter((value): value is string => Boolean(value))
    )
  );

  return {
    placeId,
    displayName: data?.displayName?.text?.trim() || null,
    formattedAddress: data?.formattedAddress?.trim() || null,
    websiteUri: data?.websiteUri?.trim() || null,
    nationalPhoneNumber: data?.nationalPhoneNumber?.trim() || null,
    googleMapsUri: data?.googleMapsUri?.trim() || null,
    rating: typeof data?.rating === "number" ? data.rating : null,
    openNow: typeof data?.currentOpeningHours?.openNow === "boolean" ? data.currentOpeningHours.openNow : null,
    weekdayDescriptions,
    photos,
    coverImageUrl,
    galleryImageUrls,
    photoAttributions,
  };
}

export async function fetchPlaceDetails(placeId: string): Promise<PlaceDetailsLite | null> {
  const trimmedId = placeId?.trim();
  if (!trimmedId) return null;

  const apiKey = getApiKey();
  const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(trimmedId)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": DETAILS_FIELD_MASK,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Google Place Details failed (${response.status} ${response.statusText}): ${message}`);
  }

  const data = (await response.json()) as GooglePlaceDetailsResponse;
  return normalizePlaceDetails(data);
}
