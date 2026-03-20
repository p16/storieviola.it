# Story 4.2: GA4 analytics with consent

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->
## Story

As a product owner,
I want GA4 tracking enabled only after explicit user consent,
so that I can see evidence that the site is reachable and discoverable while keeping analytics privacy-aware.

## Acceptance Criteria

1. **Given** GA4 is configured with Measurement ID `G-3D7DV5DLT1`,
   **And** the site shows an Italian cookie/consent banner with `Accetta analytics` and `Rifiuta` actions only,
   **When** a visitor first loads the site,
   **Then** analytics is disabled by default and no GA4 analytics events are sent before consent.
2. **When** the visitor clicks `Accetta analytics`,
   **Then** GA4 is initialized and the current page view is tracked.
   **And** outbound `Listen on Spotify` clicks are tracked as GA4 events.
   **And** tag filter selections are tracked as GA4 events.
3. **When** the visitor clicks `Rifiuta`,
   **Then** GA4 analytics remains disabled and no GA4 analytics events are sent.
4. **And** the consent decision persists across page loads.
5. **And** the consent UI is keyboard accessible with visible focus and clear labels.

## Tasks / Subtasks

- [x] Add client-side consent + GA4 module `storieviola-it/src/lib/analytics-client.ts`
  - [x] Constants: Measurement ID `G-3D7DV5DLT1`, `localStorage` key for consent (`accepted` | `rejected`)
  - [x] No gtag script or events until consent is `accepted`
  - [x] On `accepted`: inject gtag.js, run `gtag('config', ...)` with page view
  - [x] Register delegated click handlers for Spotify outbound links and tag filter buttons (only after GA ready)
- [x] Add `storieviola-it/src/components/ConsentBanner.astro` (Italian copy; only `Accetta analytics` / `Rifiuta`)
  - [x] `role="region"`, `lang="it"`, visible focus styles on buttons, clear labels
  - [x] Hide banner when consent already stored; show on first visit
- [x] Wire `ConsentBanner` + init script in `storieviola-it/src/layouts/BaseLayout.astro`
- [x] Run `npm run build` and smoke-check: no GA script in HTML before user consent path (initial HTML has no gtag load until client accepts)

## Dev Notes

- Do not load `googletagmanager.com/gtag/js` until after explicit accept.
- Reuse existing `[data-filter-button]` / `data-filter-tag` and Spotify `a[href*="spotify.com"]` for events.
- FR13 / NFR-SEC1: minimal analytics, consent-gated.

### References

- `_bmad-output/planning-artifacts/epics.md` — Story 4.2
- `storieviola-it/src/layouts/BaseLayout.astro`

## Dev Agent Record

### Agent Model Used

(composer)

### Debug Log References

- `npm run build` (pass)
- Verified static HTML has no `<script src="https://www.googletagmanager.com/gtag/js">` in `<head>`; gtag loads only after consent via client `injectGtag()`.

### Completion Notes List

- Added `analytics-client.ts` with consent key `storieviola_analytics_consent`, GA4 ID `G-3D7DV5DLT1`, deferred gtag.js injection and `gtag('config')` only after **Accetta analytics**.
- Added Italian `ConsentBanner` with only **Accetta analytics** / **Rifiuta**, keyboard focus to accept on first show, `focus-visible` rings, `role="region"` + `aria-label`.
- Delegated events: `spotify_click` for `a[href*="spotify.com"]`, `tag_filter` for `[data-filter-button]` after analytics active.
- Reject path: no gtag, no outbound listeners that send GA (listeners only registered via `activateAnalytics()` after accept).

### File List

- `storieviola-it/src/lib/analytics-client.ts`
- `storieviola-it/src/components/ConsentBanner.astro`
- `storieviola-it/src/layouts/BaseLayout.astro`
- `_bmad-output/implementation-artifacts/4-2-ga4-analytics-with-consent.md`

### Change Log

- 2026-03-20: Implemented Story 4.2 — consent-gated GA4, Italian banner, Spotify + tag filter events, persisted consent.
