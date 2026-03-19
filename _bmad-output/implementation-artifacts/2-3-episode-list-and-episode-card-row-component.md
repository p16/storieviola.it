# Story 2.3: Episode list and Episode card/row component

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to see all episodes with cover, title, description, tags and one "Listen on Spotify" link per episode**,
so that **I can choose an episode and open it on Spotify in one tap**.

## Acceptance Criteria

1. **Given** at least one episode in the episodes content collection, **when** I open the homepage, **then** the page shows the **full** episode list (not only the first two). Each episode shows **cover**, **title**, **short description**, **tags**, and **exactly one** primary **“Ascolta su Spotify”** (or **“Listen on Spotify”**) link pointing to that episode’s **`spotifyUrl`** (UX-DR4, UX-DR9, UX-DR13). FR3, FR4, FR5.
2. **And** the list layout is **responsive**: **card-style grid** at or above **768px** (`md:`), **single-column list row** below (UX-DR7, Direction B / C). **One Astro component** implements both variants via responsive Tailwind (same markup; layout changes by breakpoint) — use **`EpisodeCard.astro`**; do **not** add a separate `EpisodeRow.astro` unless you later split for maintenance (architecture lists both names historically; **epic + UX prefer a single component**).
3. **And** the Spotify link has **visible keyboard focus**, **≥ ~44px** touch target height (padding/`min-h`), and opens the **correct** `episode.data.spotifyUrl`. Prefer **same tab** as the rest of the site for consistency and mobile Spotify app handoff (UX-DR13); if you use `target="_blank"`, add **`rel="noopener noreferrer"`**.
4. **And** structure is **semantic**: wrapping **`<ul>`** / **`<li>`** for the list; **one** primary outbound link per episode (the Spotify CTA — do not also wrap the title in a duplicate link); cover **`<img alt={title}>`** (or equivalent descriptive alt) (UX-DR14). Section keeps **`<h2>`** for “Episodi” (or equivalent); episode titles may be **`<h3>`** inside each item for a sensible heading outline under the page **`<h1>`** in `Hero`.
5. **And** when there are **zero** episodes, keep the existing **empty state** behaviour from Story 2.2 (message under “Episodi”).
6. **And** **`data-tags` prep for Story 2.4:** each episode root element (e.g. the `<li>`) exposes tags for client-side filtering — use a **machine-readable attribute** on that node, e.g. **`data-tags`** with **comma-separated** tag values (document in `CONTENT.md` that tag strings must not contain commas for MVP), so Alpine/vanilla in 2.4 can read them without refactoring card markup.

## Tasks / Subtasks

- [x] Create `EpisodeCard.astro` (AC: #1–#4, #6)
  - [x] Add `storieviola-it/src/components/EpisodeCard.astro` (PascalCase, one file) [Source: architecture.md, epics 2.3]
  - [x] Accept props from a collection entry or a small props object: `title`, `description`, `cover`, `spotifyUrl`, `tags: string[]` (camelCase; match `src/content.config.ts`)
  - [x] Render: cover image, title, truncated/clamped description (e.g. `line-clamp-2` or `line-clamp-3`), tag chips (non-link **badges** in this story — Story 2.4 adds filter UI), single **Spotify** anchor with clear label
  - [x] Responsive layout: **mobile-first** narrow column / row layout; from **`md:`** grid-friendly card (e.g. parent uses `md:grid md:grid-cols-2` with gap, or card is full-width of cell)
  - [x] Apply **`data-tags`** on the outer wrapper you will repeat in the list (see AC #6)
  - [x] Spotify CTA: align focus treatment with accessible patterns used elsewhere (e.g. white ring on green button like `Hero.astro`, or visible ring on a link-styled CTA — must meet UX-DR10 / UX-DR11)
- [x] Wire homepage full list (AC: #1, #2, #5)
  - [x] Update `storieviola-it/src/pages/index.astro`: **remove** `slice(0, 2)` preview-only logic; render **all** episodes after sorting with **`sortEpisodesForPreview`** from `src/lib/sortEpisodes.ts` (featured first, `publishDate` desc — **do not change** sort rules)
  - [x] Replace inline preview `<li>` markup with **`<EpisodeCard />`** inside **`<ul>`** / **`<li>`** (or render `EpisodeCard` as the sole content of each `li`)
  - [x] Preserve **`<Hero />`**, **`getSpotifyShowUrl()`** hero CTA, and **empty state** when `sortedEpisodes.length === 0`
- [x] Docs (AC: #6)
  - [x] Update `CONTENT.md`: note **`data-tags`** convention (comma-separated, no commas inside tag values for MVP); optional note on full list vs old preview
- [x] Verify (AC: #1–#5)
  - [x] `npm run build` from `storieviola-it/`
  - [x] Manual: ≥768px grid/list behaviour; tab to each episode’s Spotify control; confirm one Spotify link per episode and correct URLs; **no** `TagFilter` / Alpine yet (Story 2.4)

## Dev Notes

- **Epic context:** Epic 2 — homepage. **2.1** layout/header; **2.2** hero + minimal preview + sort helpers + `publishDate`. **2.3** replaces preview with **full list** + **EpisodeCard**. **2.4** tag filter + client show/hide (use `data-tags` from this story).
- **Scope guard:** Do **not** implement **TagFilter**, Alpine.js, or client-side filtering (Story 2.4). Do **not** add Vitest/Playwright (Epic 5). Do **not** change episode **schema** unless you discover a gap (current fields are sufficient).

### Technical Requirements

- **App root:** `storieviola-it/` only.
- **Sorting:** `import { sortEpisodesForPreview } from '../lib/sortEpisodes'`; `const sorted = sortEpisodesForPreview(await getCollection('episodes'))`.
- **Images:** `<img>` with `width`/`height` or constrained classes; `alt` = episode title (UX-DR14).
- **Tags UI:** Display only (e.g. rounded pills). No `aria-pressed` on tags until 2.4 if tags become filter controls.

### Architecture Compliance

- [Source: architecture.md] Flat components: `storieviola-it/src/components/EpisodeCard.astro`.
- [Source: architecture.md] Tag filter later: **data-tags** (or equivalent) on episode blocks for show/hide — implement attribute in this story.
- [Source: architecture.md] One primary Spotify CTA per episode; camelCase content fields.

### Library / Framework Requirements

- **Astro ^6**, **Tailwind ^4** — no new runtime dependencies for this story.

### File Structure Requirements

- **Create:** `storieviola-it/src/components/EpisodeCard.astro`
- **Modify:** `storieviola-it/src/pages/index.astro`, `storieviola-it/CONTENT.md` (tags / data-tags note)
- **Do not create:** `TagFilter.astro`, `EpisodeRow.astro` (unless you deliberately split later), test suites

### Testing Requirements

- Manual + `npm run build` only (Epic 5 adds automation).

### Previous Story Intelligence

- [Source: `2-2` completion] `index.astro` currently imports `getSpotifyShowUrl`, `sortEpisodesForPreview`, uses `previewEpisodes = sortedEpisodes.slice(0, 2)` — **remove slice** and swap in `EpisodeCard` for **all** `sortedEpisodes`.
- [Source: `Hero.astro`] Green Spotify CTA uses `focusCta` (white ring + `ring-offset-[#1DB954]`). **Reuse or mirror** for per-episode CTA for consistent a11y on green buttons.
- [Source: `Header.astro`] Text links use gray `focus-visible:ring-gray-900` — use for non-button links if CTA is link-styled instead of green button.
- **Empty state:** Already implemented in Italian in `index.astro` — retain when collection is empty.

### Latest Tech Information

- [Astro — Content Collections](https://docs.astro.build/en/guides/content-collections/) — `getCollection`, `entry.data.*`
- **Tailwind v4:** `md:` = 768px default

### Project Context Reference

- No `project-context.md`. Use `ux-design-specification.md` (**Episode card / row**, **Button/CTA hierarchy**, **Links to Spotify**), `architecture.md`, `epics.md` Story 2.3.

### UX Traceability

| ID | Hint |
|----|------|
| UX-DR4 | Cover, title, short description, tags, one Listen on Spotify |
| UX-DR7 | Grid ≥768px, single column below |
| UX-DR9 | One primary CTA per episode; hero already has podcast CTA — episode card has only the episode link |
| UX-DR11 | ~44px min touch target on Spotify control |
| UX-DR13 | Clear label; same tab vs `blank` + `noopener` per choice |
| UX-DR14 | Semantic list, one primary link per episode, image alt |

### NFR Note (catalog size)

- NFR-P2 / hundreds of episodes: MVP is **static full list** in HTML. Pagination/virtualization is **out of scope** for 2.3; if build size or layout becomes an issue, track as a later story.

## Dev Agent Record

### Agent Model Used

Composer (Cursor agent)

### Debug Log References

(none)

### Completion Notes List

- Added `EpisodeCard.astro`: root `<li>` with `data-tags` (comma-separated), mobile row / `md:` card column, `h3` title, clamped description, tag badges, single green Spotify CTA mirroring `Hero` focus ring, `min-h-11`, same-tab link.
- `index.astro`: full `sortedEpisodes` list, `ul` with `md:grid md:grid-cols-2`, preserved Hero + empty state; section id `episodes-heading`.
- `CONTENT.md`: documented `data-tags` / no commas in tag values; homepage copy updated for full list.
- Verified with `npm run build` (pass).

### File List

- `storieviola-it/src/components/EpisodeCard.astro` (new)
- `storieviola-it/src/pages/index.astro`
- `storieviola-it/CONTENT.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `_bmad-output/implementation-artifacts/2-3-episode-list-and-episode-card-row-component.md`

### Change Log

- 2026-03-19 — Story 2.3: EpisodeCard, full homepage episode list, CONTENT.md data-tags note, sprint status → done.

## Dev Agent Record — Story completion status

**Status:** done  
**Note:** Implementation complete; reviewed and responsive layout + Spotify CTA focus verified (build passes).
