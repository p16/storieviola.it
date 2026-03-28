# Story 8.1: Homepage episode grid — `xl` four columns and progressive breakpoints

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **the episode list to use space well on large screens**,
so that **I can scan more episodes at once without cards feeling crushed**.

## Acceptance Criteria

1. **Given** the homepage episode list (Epic 2), **when** the viewport is at or above the `xl` Tailwind breakpoint (default 1280px), **then** the episode grid uses **4 columns** (UX-DR16 / `ux-design-specification.md` — *Homepage – episode list*).
2. **Below `xl`**, column count scales down progressively (e.g. 1 column default on small screens, 2 from `md`, optional 3 at `lg`) so the layout does not jump awkwardly; **`xl`+ must remain 4 columns**.
3. The Episodi section container is widened (`max-width`) if needed so four columns stay readable; card content (title, description, CTA row) must not feel crushed.
4. **Mobile** remains a **single column** (Direction C) per existing responsive strategy — no multi-column grid below `md`.

## Tasks / Subtasks

- [x] Adjust Episodi `<section>` wrapper on `index.astro` (AC: 1, 3, 4)
  - [x] Increase `max-width` at `xl`+ if current `max-w-4xl` is too narrow for four columns; keep horizontal padding aligned with hero/site where practical.
- [x] Update episode `<ul>` grid classes (AC: 1, 2, 4)
  - [x] Default: single column (list/stack as today or equivalent).
  - [x] `md`: 2 columns.
  - [x] Optional `lg`: 3 columns (if it improves progression to 4 at `xl`).
  - [x] `xl`: `grid-cols-4` (or equivalent explicit 4-column grid).
- [x] Verify `EpisodeCard.astro` still reads well at narrower column width (AC: 3)
  - [x] Tweak internal spacing, line clamps, or image aspect if cards feel crushed at `xl`.
- [x] Tests (AC: 1–4)
  - [x] Extend Playwright smoke/visual checks if present: viewport at `xl` asserts 4-column grid behaviour (e.g. count cards per row or CSS class expectations).
  - [x] Confirm tag filter + `data-episodes-list` still work with grid (no regression to Story 2.4).

## Dev Notes

### Developer Context

- App code lives under `storieviola-it/`. Homepage list is in `src/pages/index.astro`; list items use `EpisodeCard.astro`.
- Current grid: `md:grid md:grid-cols-2` on the `<ul>`; section uses `max-w-4xl`. Story requires **4 columns only from `xl`**, not from `md`.
- **Normative UX:** `_bmad-output/planning-artifacts/ux-design-specification.md` — section *UX decisions log – handoff to stories (2026-03-28)*, *Homepage – episode list (desktop)*. **Non-normative visual reference:** `ux-design-directions.html` tab *Mock: episode grid*.

### Architecture Compliance Requirements

- Static Astro + Tailwind; no new UI frameworks.
- Preserve client-side tag filtering (`initTagFilter`, `data-tags` on `<li>`) from Story 2.4.
- WCAG 2.1 AA: maintain focus styles, semantics, and touch targets on cards (Epic 5).

### File Structure Requirements

- Primary: `storieviola-it/src/pages/index.astro`
- Possibly: `storieviola-it/src/components/EpisodeCard.astro`
- Tests: `storieviola-it/tests/e2e/smoke.spec.ts` (or dedicated spec if clearer)

### Library / Framework Requirements

- Tailwind default breakpoints (`sm`/`md`/`lg`/`xl`) unless project overrides exist in `tailwind.config.*`.

### Testing Requirements

- **E2E:** At desktop-wide width (≥1280px), episode list shows four columns when multiple episodes exist; at mobile width, single column.
- **Manual:** Resize across `md` → `lg` → `xl` for smooth progression.
- **Regression:** Filter by tag still shows/hides cards correctly.

### References

- Epic 8 and Story 8.1: `_bmad-output/planning-artifacts/epics.md`
- UX handoff: `_bmad-output/planning-artifacts/ux-design-specification.md` (UX-DR16 — episode grid at `xl`)
- Prior list implementation: `_bmad-output/implementation-artifacts/2-3-episode-list-and-episode-card-row-component.md`
- Architecture: `_bmad-output/planning-artifacts/architecture.md`

## Dev Agent Record

### Agent Model Used

Cursor AI agent (dev-story workflow)

### Debug Log References

_(none)_

### Completion Notes List

- Episodi section: `max-w-4xl xl:max-w-7xl` with unchanged `px-4` to match hero horizontal padding; widens only from `xl` for a readable four-column row.
- Episode list: `grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4` on `[data-episodes-list]`; single column below `md`, progressive 2 → 3 → 4 columns.
- `EpisodeCard`: `xl:h-36` cover height and `xl:p-3` body padding so narrow `xl` columns stay balanced; line clamps unchanged.
- Playwright: two homepage tests assert `grid-cols-1` + stacked layout at 375px, and `xl:grid-cols-4` + first four cards aligned on one row at 1280px; full smoke suite and `astro build` pass.

### File List

- `storieviola-it/src/pages/index.astro`
- `storieviola-it/src/components/EpisodeCard.astro`
- `storieviola-it/tests/e2e/smoke.spec.ts`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log

- 2026-03-28: Story 8.1 implemented — homepage episode grid breakpoints, section max-width at `xl`, EpisodeCard `xl` density tweaks, Playwright coverage.
