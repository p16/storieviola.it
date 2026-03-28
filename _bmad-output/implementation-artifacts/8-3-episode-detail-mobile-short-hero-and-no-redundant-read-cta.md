# Story 8.3: Episode detail — mobile short hero and no redundant read CTA

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **a short header and obvious listen action on my phone**,
so that **I reach the story without extra noise or duplicate buttons**.

## Acceptance Criteria

1. **Given** an episode detail page on a **mobile viewport** (below desktop breakpoint used in 8.2, typically `< md` or `< lg`), **then** the layout uses a **short hero** (UX-DR18): cover height is **capped** (not a tall full-bleed image consuming the viewport); primary actions are **stacked vertically**.
2. There is **no** separate primary-style **“Continua a leggere ↓”** (or equivalent) button — scrolling to the transcript is the expected pattern.
3. If an anchor shortcut is needed, it must be a single **in-page text link** (e.g. “Vai alla storia”) to the content anchor, **not** an extra primary button.
4. **One** full-width **“Ascolta su Spotify”** (or locale equivalent) is available on mobile when `spotifyUrl` is set, **without** a redundant second “read the story” primary CTA on this page. **List cards** may still use “Leggi la storia” per Epic 7 — that rule applies to **cards**, not the detail page header.

## Tasks / Subtasks

- [x] Mobile header in `[slug].astro` (AC: 1, 4)
  - [x] Cap cover height with `max-h-*`, `object-cover`, and/or aspect constraints; avoid viewport-tall hero on small screens.
  - [x] Stack: cover → title/description → full-width Spotify CTA (when URL present).
- [x] Audit and remove any **redundant read** CTAs on detail page (AC: 2, 3, 4)
  - [x] Do not introduce “Continua a leggere”; if something similar exists from earlier work, remove or demote to plain text link per AC3.
- [x] Optional anchor (AC: 3)
  - [x] Add `id` on transcript section; only add “Vai alla storia” if usability requires it — styled as **text link**, not `bg-cta` button.
- [x] Align with Story 8.2 breakpoints (AC: 1)
  - [x] Ensure `md:`/`lg:` desktop layout from 8.2 does not leak full-width hero styles into mobile and vice versa.
- [x] Tests (AC: 1–4)
  - [x] Playwright mobile viewport: assert no duplicate primary read buttons; assert Spotify full-width or stacked pattern when applicable.
  - [x] Visual check: cover is visibly “short” vs previous full-width tall image.

## Dev Notes

### Developer Context

- **Normative UX:** `_bmad-output/planning-artifacts/ux-design-specification.md` — *Episode detail page – mobile* (UX-DR18). **Mock:** `ux-design-directions.html` — *Short hero + stack*.
- Detail page is **the article**; users scrolled or navigated here to read — do not duplicate list-card “Leggi la storia” pattern in the hero.
- Spotify on **desktop** (8.2) may be a text link; on **mobile** UX explicitly allows **one full-width** listen CTA — implement with responsive classes so both specs hold.

### Architecture Compliance Requirements

- Maintain WCAG: focus rings, contrast on CTA, semantic structure.
- Single page component preferred; avoid duplicating episode data fetching.

### File Structure Requirements

- Primary: `storieviola-it/src/pages/episodes/[slug].astro` (shared with 8.2)
- Tests: `storieviola-it/tests/e2e/smoke.spec.ts`

### Library / Framework Requirements

- Tailwind responsive utilities only.

### Testing Requirements

- **E2E:** iPhone-sized viewport — short hero, single prominent Spotify when URL exists, transcript visible on scroll.
- **Negative:** No second primary button whose label implies “keep reading” or duplicates navigation to same page content.

### Previous Story Intelligence

- Implement **after or together with** `8-2-episode-detail-desktop-reading-first-layout.md` to avoid merge conflicts on `[slug].astro`.
- `EpisodeCard.astro` **should keep** “Leggi la storia” — do not remove list CTAs (AC4 explicitly allows list behaviour).

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 8, Story 8.3)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (UX-DR18)
- `_bmad-output/implementation-artifacts/8-2-episode-detail-desktop-reading-first-layout.md`

## Dev Agent Record

### Agent Model Used

Cursor agent (Claude)

### Debug Log References

### Completion Notes List

- Mobile cover uses `max-h-[min(12rem,42vh)]` with `data-detail-cover` for a capped hero; desktop keeps Story 8.2 side-by-side layout via `md:` overrides.
- Transcript section has `id="storia"` and `data-episode-transcript`; mobile-only underlined text link “Vai alla storia” (`data-skip-to-story`, `md:hidden`) — not a primary button.
- E2E: Story 8.3 describe block asserts short cover, no “Leggi la storia” / continua CTAs on detail, full-width `bg-cta` Spotify when present, skip link not primary-styled, desktop hides skip link.

### File List

- `storieviola-it/src/pages/episodes/[slug].astro`
- `storieviola-it/tests/e2e/smoke.spec.ts`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/8-3-episode-detail-mobile-short-hero-and-no-redundant-read-cta.md`

### Change Log

- 2026-03-28: Story 8.3 — mobile short hero, transcript anchor + optional text skip link, Playwright coverage.
