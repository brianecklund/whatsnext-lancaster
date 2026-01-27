# What's Next Lancaster (v3) — Split View (Filter Munich-style)

## What you asked for
- Sticky nav bar
- Sticky filter bar under nav
- Full-width listings
- Split layout with two scrollable panes:
  - Left: listings
  - Right: detail content (event/location)

This build implements that on:
- /calendar  (events + filters)
- /locations (locations list + details)

## 1) Environment variables

Create `.env.local` in the project root:

PRISMIC_REPO_NAME=whatsnext-lancaster
# If private:
# PRISMIC_ACCESS_TOKEN=your-token

Restart dev server after changing env vars.

## 2) Run locally

npm install
npm run dev

## 3) How selection works
- Calendar selection is stored in the URL:
  - /calendar?event=<uid-or-id>&types=...
- Location selection is stored in the URL:
  - /locations?loc=<location-uid>

This makes the split view shareable.

## 4) Notes
- On small screens, the layout collapses to a single column for usability.
- If you want the right panel to be a real route (e.g. /calendar/<uid>), we can do that in v4.
