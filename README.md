# What's Next Lancaster — v4 Fixed (no @prismicio/helpers)

## What’s fixed
- Removes any import of `@prismicio/helpers` (so `npm run build` won’t fail on that).
- Uses `images.remotePatterns` (Next warning removed).
- Includes split-view home + hover highlight on rows.

## Setup
1) Create `.env.local` in the project root:
   PRISMIC_REPO_NAME=whatsnext-lancaster
   # If private:
   # PRISMIC_ACCESS_TOKEN=YOUR_TOKEN

2) Install + run:
   npm install
   npm run dev

3) Build:
   npm run build

## If Next says “multiple lockfiles”
That’s caused by an unrelated `package-lock.json` somewhere above your project folder.
Make sure you run commands from *inside* this project folder (where this package.json lives).


## Automatic venue importing

This repo includes a server-side venue import endpoint at `app/api/venues/import/route.ts`.

Supported providers:
- Google Places via `GOOGLE_MAPS_API_KEY`
- Foursquare Places via `FOURSQUARE_API_KEY`
- Yelp via `YELP_API_KEY`

Example:

```
GET /api/venues/import?location=Lancaster,%20PA&query=music%20venues%20bars%20coffee%20shops&limit=20
```

The endpoint dedupes providers and normalizes categories into the site taxonomy used by the directory.


## Live venue import

This repo can automatically enrich the Directory page with live venue data from Google Places, Foursquare, and Yelp.

### Required environment variables

- `ENABLE_LIVE_VENUE_IMPORT=true`
- `GOOGLE_MAPS_API_KEY=...`
- `FOURSQUARE_API_KEY=...`
- `YELP_API_KEY=...`

### Optional import tuning

- `VENUE_IMPORT_LOCATION=Lancaster, PA`
- `VENUE_IMPORT_QUERY=restaurants bars coffee shops music venues event spaces theaters stores businesses`
- `VENUE_IMPORT_LIMIT=30`
- `VENUE_IMPORT_RADIUS_METERS=12000`

### Test the importer

Open:

`/api/venues/import`

You can also pass query params, for example:

`/api/venues/import?location=Lancaster,%20PA&query=coffee%20shops%20bars&limit=15`

When `ENABLE_LIVE_VENUE_IMPORT=true`, the Directory page merges imported venues with your Prismic locations at request time.
