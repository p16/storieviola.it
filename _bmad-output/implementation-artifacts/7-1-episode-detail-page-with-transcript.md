# Story 7.1: Episode detail page with transcript

Status: review

## Story

As a **visitor**,
I want **to open a dedicated page for each episode where I can read the story transcript**,
so that **I can read a story aloud to my child even when we are not near a speaker**.

## Acceptance Criteria

1. **Given** an episode file with a `slug` field in frontmatter, **when** I open `/episodes/[slug]`, **then** the page renders cover image, title, description, and (if present) an "Ascolta su Spotify" CTA linking to `spotifyUrl`.
2. **Given** the episode has a markdown body, **when** the detail page renders, **then** transcript content is rendered below metadata.
3. **Given** an episode has neither `spotifyUrl` nor non-empty markdown body, **when** the site builds, **then** build fails with a clear validation error (at least one required).
4. **Given** an episode card on homepage, **when** I click title or "Leggi la storia", **then** I navigate to `/episodes/[slug]`.
5. `slug` is required in schema, `spotifyUrl` becomes optional, detail page uses `BaseLayout` and `Header`, and page includes proper title/description metadata.
6. License notice appears at bottom of episode page (Story 7.2 integration point).
7. Unit tests cover schema changes; at least one E2E test validates homepage -> detail -> transcript rendering.

## Tasks / Subtasks

- [x] Update episode schema for slug/body-or-url rule (AC: 1, 3, 5)
  - [x] Add required `slug: z.string().min(1)`
  - [x] Make `spotifyUrl` optional
  - [x] Add schema-level refinement for "spotifyUrl OR non-empty body"
- [x] Build episode detail route (AC: 1, 2, 5)
  - [x] Create `src/pages/episodes/[slug].astro`
  - [x] Resolve episode by `slug` from collection entries
  - [x] Render metadata + optional CTA + transcript body
- [x] Link homepage cards to detail route (AC: 4)
  - [x] Add title link and/or "Leggi la storia" link in episode card/list rendering
- [x] Add SEO metadata on detail page (AC: 5)
  - [x] Dynamic `<title>` as episode title + site name
  - [x] Dynamic `<meta name="description">` from episode description
- [x] Integrate license footer placeholder/component (AC: 6)
  - [x] Render reusable footer block at end of detail page
- [x] Add tests (AC: 7)
  - [x] Unit tests for schema rules
  - [x] E2E test for detail navigation and transcript rendering

## Dev Notes

### Developer Context

- App code is under `storieviola-it/`; do not create routes/components at repo root.
- Use existing shared shell: `BaseLayout` + `Header` already drive consistency across pages.
- Keep naming conventions already in use: camelCase content fields, PascalCase components, Astro file routing.

### Architecture Compliance Requirements

- Content schema source of truth is in `storieviola-it/src/content/` (currently split with schema module + config wiring).
- Keep static-site architecture: no server/API layer; resolve episodes at build time.
- Preserve accessibility standards already established (semantic headings, focus states, logical structure).
- Do not regress existing homepage list/filter behavior while adding detail navigation.

### File Structure Requirements

- Expected touched files:
  - `storieviola-it/src/content/schema.ts` (or equivalent schema module)
  - `storieviola-it/src/content/config.ts` (if collection definition needs update)
  - `storieviola-it/src/pages/episodes/[slug].astro` (new)
  - `storieviola-it/src/pages/index.astro` and/or `storieviola-it/src/components/EpisodeCard.astro`
  - `storieviola-it/tests/unit/content-schema.test.ts`
  - `storieviola-it/tests/e2e/*.spec.ts`

### Library / Framework Requirements

- Keep Astro-native content APIs (`getCollection`, `render` where needed) for detail rendering.
- Keep Tailwind/utilities and existing component structure; do not introduce new UI frameworks.
- Reuse existing test stack only: Vitest + Playwright.

### Testing Requirements

- Unit:
  - `slug` required and non-empty.
  - `spotifyUrl` optional.
  - Validation fails when both spotifyUrl and transcript body are missing/empty.
- E2E:
  - Start from homepage.
  - Open an episode detail page via title or explicit read link.
  - Assert transcript text is visible on page.
  - Assert CTA presence only when `spotifyUrl` exists.

### Integration Notes for Story 7.2

- Keep a stable insertion point at bottom of detail page for reusable license block.
- Prefer creating a small component (e.g. `LicenseNotice.astro`) that Story 7.2 can reuse on `/licenza` and episode pages.

### References

- Epic definition and ACs: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.1)
- Product requirements baseline: `_bmad-output/planning-artifacts/prd.md`
- Architecture constraints and structure: `_bmad-output/planning-artifacts/architecture.md`
- UX consistency and accessibility guidance: `_bmad-output/planning-artifacts/ux-design-specification.md`

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex-low (story prep); housekeeping sync 2026-03-28 (Cursor agent)

### Debug Log References

- N/A

### Completion Notes List

- Implementation present in repo: episode detail route, schema (`slug`, optional `spotifyUrl`, transcript-or-URL `superRefine`), `EpisodeCard` links, `LicenseNotice` on detail page, Vitest + Playwright coverage.
- Story status set to `review` pending optional `bmad-bmm-code-review` pass.
- Collection wiring lives in `src/content.config.ts` (not `src/content/config.ts`).

### File List

- `storieviola-it/src/content/schema.ts`
- `storieviola-it/src/content.config.ts`
- `storieviola-it/src/pages/episodes/[slug].astro`
- `storieviola-it/src/components/EpisodeCard.astro`
- `storieviola-it/src/components/LicenseNotice.astro` (footer; shared with 7.2)
- `storieviola-it/tests/unit/content-schema.test.ts`
- `storieviola-it/tests/e2e/smoke.spec.ts`
- `_bmad-output/implementation-artifacts/7-1-episode-detail-page-with-transcript.md`
