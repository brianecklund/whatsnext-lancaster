# What's Next Lancaster

This copy removes build artifacts and Finder metadata, keeps only the fonts/assets the app is using, and keeps the same site behavior.

## Venue workflow
1. In an `event` document, enter `Venue Search / Name`.
2. Optionally add `Google Place ID` for an exact match.
3. A Prismic webhook can call `/api/prismic-webhooks/event-published` when an event is published.
4. The matched venue is added to `data/venue-cache.json`, so it appears in the Directory and stays in the cached refresh flow.

The event page also falls back to `venue_name` / `venue_address` when no linked `location` document is selected.

## Helpful routes
- `/api/venues/search?q=zoetropolis`
- `/api/venues/status`
- `/api/venues/refresh`
- `/api/prismic-webhooks/event-published`
