# WhatsNext Lancaster

This version keeps the directory API/cache driven and simplifies the Prismic connection layer.

## Venue workflow

Use the cached venue feed as the source of truth for directory listings. In Prismic, events and custom location pages store:

- `venue_name`
- `venue_place_id`
- `location_page` (events only, optional)

Use the helper page below to find a venue in the cached feed:

- `/admin/venue-search`

Paste the copied values into Prismic. The frontend resolves venue details from the cached API data at render time.

## Useful routes

- `/api/venues`
- `/api/venues/search?q=west`
- `/api/venues/refresh`
- `/api/venues/status`
- `/admin/venue-search`

## Local development

```bash
npm install
npm run dev
```

## Environment variables

- `PRISMIC_REPO_NAME`
- `PRISMIC_ACCESS_TOKEN` (if repo is private)
- `GOOGLE_PLACES_API_KEY` or `GOOGLE_MAPS_API_KEY`
