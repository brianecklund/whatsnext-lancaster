# What's Next Lancaster — v4 Fixed (no @prismicio/helpers)

## What’s fixed
- Removes any import of `@prismicio/helpers` (so `npm run build` won’t fail on that).
- Uses `images.remotePatterns` (Next warning removed).
- Includes split-view home + hover highlight on rows.
- Caches imported Google venue data and reuses it for the current day so the site does not hit the API on every request.

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

Supported provider:
- Google Places via `GOOGLE_MAPS_API_KEY`

Example:

```
GET /api/venues/import?location=Lancaster,%20PA&query=music%20venues%20bars%20coffee%20shops&limit=20
```

The endpoint stores the normalized results in `data/venue-cache.json` and will keep serving that cache for the current day unless you pass `refresh=true`.

## Cached venue importing

This repo stores imported directory venues in `data/venue-cache.json`.

### Refresh locally

```bash
GOOGLE_MAPS_API_KEY=...
npm run refresh:venues
```

### Refresh daily with GitHub Actions

A scheduled workflow lives at `.github/workflows/refresh-venues.yml`.
Set these in GitHub:

- Repository Secrets: `GOOGLE_MAPS_API_KEY`
- Repository Variables: `VENUE_IMPORT_LOCATION`, `VENUE_IMPORT_QUERY`, `VENUE_IMPORT_LIMIT`
- Optional Repository Variable: `VENUE_CACHE_TIME_ZONE` (defaults to `America/New_York`)

The Directory page reads from `data/venue-cache.json`, so imported venues are persisted in the repo and deployed with the site.
