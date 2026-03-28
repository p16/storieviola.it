# Story 8.2: Episode detail — desktop reading-first layout

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **a calm reading layout on desktop with Spotify easy to reach**,
so that **I can read the transcript without a huge hero pushing content below the fold**.

## Acceptance Criteria

1. **Given** an episode detail page (Epic 7), **when** viewed on a **desktop-class viewport** (use project/layout convention: typically `md` or `lg` and up — align with UX “Direction B” / tablet-as-desktop note in UX spec), **then** the page follows **reading-first · small cover** (UX-DR17):
   - **Back link to the episode list** (e.g. `/` or `/#episodes-heading`) is visible in the page chrome — UX places this with “site header” context; implement in a way consistent with existing `Header.astro` (e.g. secondary row or prominent link in the article header) without breaking global nav.
   - **Small cover** sits **beside or adjacent to** the **title** (thumbnail scale, not full-bleed width).
   - A **short meta line** includes **“Ascolta su Spotify” as a text link** when `spotifyUrl` is set — clearly tappable, **min ~44px touch/focus target** or equivalent padding, **visible `:focus-visible` ring** (not only a full-width primary button as the sole affordance on desktop).
2. The **story body (transcript)** is the **dominant** main content; there is **no** large full-width hero image dominating the first screen on desktop.
3. **WCAG 2.1 AA** contrast and focus expectations still apply (Epic 5 / Story 5.2).

## Tasks / Subtasks

- [x] Redesign `[slug].astro` header for **md+** (AC: 1, 2)
  - [x] Replace full-width hero image layout with a **horizontal or compact block**: small cover + title + description/meta row.
  - [x] Add **text-style** (or inline) Spotify link in the meta area for desktop; keep keyboard focus and contrast.
- [x] Add **back to episode list** navigation (AC: 1)
  - [x] Prefer accessible text e.g. “Tutti gli episodi” or “← Episodi” linking to `/` or `#episodes-heading` on homepage; avoid duplicating confusing labels.
- [x] Preserve transcript `<section>` with `prose` and `LicenseNotice` footer (AC: 2)
  - [x] Ensure heading order remains logical (`h1` for episode title).
- [x] Coordinate with Story 8.3 (AC: 1–3)
  - [x] Use responsive utilities so **mobile** layout can follow 8.3 (short hero, stacked) without conflicting rules; single `[slug].astro` implementation covering both is acceptable.
- [x] Tests (AC: 1–3)
  - [x] Playwright: at desktop viewport, assert absence of full-width hero class pattern or assert compact header structure; assert Spotify link exists when fixture episode has URL.
  - [x] Keyboard: tab to back link and Spotify text link, visible focus.

## Dev Notes

### Developer Context

- Current implementation (`storieviola-it/src/pages/episodes/[slug].astro`): full-width cover, `h1`, description, **block-level button** for Spotify, then prose body. This **does not** meet UX-DR17 for desktop.
- Global `Header.astro` already links home; epic asks for explicit **back to list** — implement on the **detail page** (or layout slot) so visitors on `/episodes/...` can return to the catalog in one click.
- **Normative UX:** `_bmad-output/planning-artifacts/ux-design-specification.md` — *Episode detail page – desktop*. **Mock:** `ux-design-directions.html` — *Mock: episode page*, Reading-first tab.

### Architecture Compliance Requirements

- Astro static pages; no new dependencies.
- Reuse design tokens / focus rings consistent with `EpisodeCard` and `Hero` (e.g. `focus-visible:ring-*` patterns).

### File Structure Requirements

- Primary: `storieviola-it/src/pages/episodes/[slug].astro`
- Optional small component e.g. `EpisodeDetailHeader.astro` if markup grows large.
- Tests: `storieviola-it/tests/e2e/smoke.spec.ts` or new spec for detail layout.

### Library / Framework Requirements

- Tailwind responsive classes; `@tailwindcss/typography` prose for body unchanged unless spacing needs tweak.

### Testing Requirements

- **E2E:** Detail page at ≥1024px (or project’s chosen desktop breakpoint): compact header, text/link Spotify affordance, back link present.
- **A11y:** No regression on landmarks; links not `div` buttons.

### Previous Story Intelligence (Epic 7)

- Schema: `slug`, optional `spotifyUrl`, body/transcript via `render(entry)` — see `7-1-episode-detail-page-with-transcript.md`.
- Collection entry point: `src/content.config.ts` + `schema.ts`.
- **Do not** remove `LicenseNotice` or SEO props on `BaseLayout`.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 8, Story 8.2)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (UX-DR17)
- `_bmad-output/implementation-artifacts/7-1-episode-detail-page-with-transcript.md`

## Change Log

- **2026-03-28:** Implemented reading-first episode detail for `md+`: compact cover + title row, “Tutti gli episodi” → `/#episodes-heading`, desktop underlined text Spotify link with `focus-visible` ring; mobile keeps capped-height cover and full-width Spotify CTA for Story 8.3 alignment. Playwright coverage in `smoke.spec.ts`.

## Dev Agent Record

### Agent Model Used

Cursor agent

### Debug Log References

- N/A

### Completion Notes List

- `[slug].astro`: responsive header — below `md`, `max-h-48` cover and stacked layout; from `md`, flex row with `md:w-44 md:aspect-video` cover, text-style Spotify (`data-detail-spotify-desktop`) with `min-h-11` / ring; mobile Spotify remains `bg-cta` button (`data-detail-spotify-mobile`). Back link uses `data-back-to-episodes`, `href="/#episodes-heading"`. Transcript `<section class="prose …">` and `LicenseNotice` unchanged; `h1` preserved.
- E2E: new describe “Episode detail desktop reading-first (Story 8.2)” — compact cover width vs article, back href, desktop vs mobile Spotify visibility, `focus()` on back + desktop Spotify.

### File List

- `storieviola-it/src/pages/episodes/[slug].astro`
- `storieviola-it/tests/e2e/smoke.spec.ts`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/8-2-episode-detail-desktop-reading-first-layout.md`
