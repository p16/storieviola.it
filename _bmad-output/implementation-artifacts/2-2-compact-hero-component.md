# Story 2.2: Compact Hero component

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to see what the podcast is as soon as I land**,
so that **I understand "what this is" and "who it's for" without scrolling a full-screen hero**.

## Acceptance Criteria

1. **Given** the homepage, **when** the page loads, **then** a compact Hero shows image, title, and 1–2 sentences; desktop uses a horizontal bar layout (Direction B), mobile uses stacked centred layout (Direction C) per UX-DR3 and UX-DR7 (`min-width` ≥768px for desktop layout).
2. **And** the hero and the start of the episode list (or list area) are visible in the first viewport — no hero-only first screen (UX-DR8). **Interpretation for this story:** At least **one–two episodes** must be visible below the hero (minimal preview is acceptable: e.g. small cover + title and/or short line of text). Full **EpisodeCard** layout, grid/list responsive variants, and **“Listen on Spotify”** per episode are **Story 2.3** — do not implement those here.
3. **And** the hero uses a single page-level **`<h1>`** for the podcast/show title; the hero image has **non-empty `alt`** text; any optional hero CTA link uses **visible focus** styles (e.g. `focus-visible:ring-*` consistent with `Header.astro`).
4. **And** optional podcast-level CTA in the hero (e.g. “Listen on Spotify” for the **show**) is allowed (UX spec: optional podcast-level CTA). If present: one primary CTA in the hero block only; use `rel="noopener"` if `target="_blank"`. If omitted, document prop as optional.

## Tasks / Subtasks

- [x] Create `Hero.astro` (AC: #1, #3, #4)
  - [x] Add `storieviola-it/src/components/Hero.astro` — PascalCase, one file per component [Source: architecture.md]
  - [x] Props (suggested): `imageSrc: string`, `imageAlt: string`, `title: string`, `intro: string` (1–2 sentences; single string or two lines via markup), optional `ctaHref?: string`, `ctaLabel?: string`
  - [x] **Mobile-first:** default = stacked, centred (Direction C); from `md:` (768px) = horizontal bar: image + text (+ optional CTA) in a row (Direction B)
  - [x] Semantic **`<h1>`** inside hero for `title`; `<img>` with `imageAlt`; optional CTA as `<a>` with same focus-visible pattern as header links
  - [x] Do **not** use full viewport height for the hero (no `min-h-screen` on hero); keep vertical footprint **compact** so list area fits in first viewport on typical laptop and mobile heights
- [x] Wire homepage (AC: #1–#3)
  - [x] Update `storieviola-it/src/pages/index.astro`: remove duplicate page `<h1>` / placeholder hero copy; compose `<BaseLayout>` → `<Hero ... />` → episode **preview** section
  - [x] Provide hero image: add a real asset under `storieviola-it/public/` (e.g. `images/hero.webp` or `.jpg`) **or** use an existing committed public asset with meaningful alt; document in `CONTENT.md` or README if creators must replace the file
- [x] Minimal episode preview for first viewport (AC: #2)
  - [x] Use `getCollection('episodes')` from `astro:content` in `index.astro` (or a tiny helper in `src/lib/` if logic grows)
  - [x] Render **at least 1–2** episodes below the hero in a **simple** block (e.g. `<section aria-labelledby="episodes-preview-heading">`, `<h2 id="episodes-preview-heading" class="...">` for “Episodi” or similar — **`<h2>`** for this section so the page keeps a single `<h1>` in the hero)
  - [x] Minimal row: e.g. thumbnail (`<img>` with `alt` = episode title) + title + optional truncated description; **no** Spotify link yet (Story 2.3)
  - [x] Keep layout compact so **hero + start of this block** fit without scrolling on common viewports (tune padding/gaps; avoid oversized images)
- [x] Verify build and manual check (AC: #1–#4)
  - [x] `npm run build` from `storieviola-it/`
  - [x] Manual: resize around 768px; tab to optional hero CTA; confirm one `<h1>`, image alts, first viewport shows hero + episode preview

## Dev Notes

- **Epic context:** Epic 2 — homepage experience. **2.1** delivered `BaseLayout` + `Header`. **2.2** = compact Hero + homepage structure that satisfies UX-DR8 with minimal episode visibility. **2.3** = full episode list, `EpisodeCard`/row variants, Spotify CTA per episode.
- **Scope guard:** Do **not** add `TagFilter`, Alpine.js, or full card grid (2.4 / 2.3). Do **not** add Vitest/Playwright (Epic 5). Do **not** change `Header`/`BaseLayout` unless required for hero slot (prefer no layout changes).

### Technical Requirements

- **App root:** All paths under `storieviola-it/` [Source: 2-1 story, architecture.md].
- **Images:** Use normal `<img src={...}>` for hero and episode covers if URLs/paths are external or under `public/`; prefer width/height or `max-h-*` classes to avoid layout shift. Episode `cover` may be `/path` or full URL per schema.
- **Typography:** Use Tailwind utilities consistent with existing `index.astro` / `BaseLayout` (gray scale OK; full design tokens are Story 5.1).
- **Language:** Site copy may be Italian or bilingual; align with existing placeholder content where sensible.

### Architecture Compliance

- [Source: architecture.md] Components: `storieviola-it/src/components/Hero.astro` (flat `components/`).
- [Source: architecture.md] Pages: `storieviola-it/src/pages/index.astro`; Tailwind for layout; mobile-first, breakpoint **768px** (`md:` in Tailwind v4).
- [Source: architecture.md] Content: episodes from `getCollection('episodes')`; camelCase fields unchanged.

### Library / Framework Requirements

- **Astro ^6**, **Tailwind ^4** (existing `package.json`). No new dependencies for this story.
- **No client-side framework** for the hero (static markup + Tailwind).

### File Structure Requirements

- **Create:** `storieviola-it/src/components/Hero.astro`; optionally `storieviola-it/public/images/*` for hero asset.
- **Modify:** `storieviola-it/src/pages/index.astro`; optionally `storieviola-it/CONTENT.md` (or README) for hero image documentation.
- **Do not create:** `EpisodeCard.astro`, `TagFilter.astro`, or test suites in this story.

### Testing Requirements

- Manual only: viewport check at mobile and ≥768px; keyboard focus on optional hero CTA; validate heading order (`h1` → `h2`). Automated tests deferred to Epic 5.

### Previous Story Intelligence

- [Source: `2-1-base-layout-and-header-component.md`] `BaseLayout.astro` wraps `<slot />` in `<main>` after `<Header />`; global CSS in `src/styles/global.css`; default page chrome uses `bg-gray-50`, `max-w-4xl` patterns in header.
- [Source: `2-1-base-layout-and-header-component.md`] `Header.astro` uses `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2` — **reuse the same pattern** on hero CTA links.
- [Source: `2-1-base-layout-and-header-component.md`] `about.astro` already uses collections; follow same `getCollection` / `render` import style if rendering MD bodies (not required for episode preview if only frontmatter is used).
- **Current `index.astro`:** Contains placeholder `<h1>` and paragraph inside `BaseLayout` — replace with `Hero` + episode section to avoid duplicate `<h1>`.

### Latest Tech Information

- **Astro Content Collections:** `getCollection('episodes')` returns entries with `data` (title, description, cover, spotifyUrl, tags). [Astro Content collections](https://docs.astro.build/en/guides/content-collections/)
- **Tailwind v4:** Breakpoint `md` = 768px by default; mobile-first utilities apply below `md`.

### Project Context Reference

- No `project-context.md` in repo. Use `architecture.md`, `ux-design-specification.md` (sections **Hero (compact)**, **Responsive Strategy**), and `epics.md` Epic 2 Story 2.2.

### UX Traceability

| Requirement | Implementation hint |
|-------------|---------------------|
| UX-DR3 | Compact hero; image + title + 1–2 sentences; horizontal bar desktop, stacked mobile |
| UX-DR7 | Direction B at ≥768px, Direction C below |
| UX-DR8 | Hero not full-screen; 1–2 episode rows visible under hero (minimal preview OK) |
| UX-DR9 | One primary CTA **per episode** in 2.3; hero may have **at most one** podcast-level CTA |
| UX-DR10 | Visible focus on hero CTA (and any interactive preview — prefer none in 2.3 preview) |

## Dev Agent Record

### Agent Model Used

Composer (Cursor agent)

### Debug Log References

- `npm run build` (storieviola-it): success, 2 pages.

### Completion Notes List

- Added `Hero.astro`: compact hero, `md:` horizontal bar, single `<h1>`, optional Spotify CTA, `min-h-11` / `min-w-[44px]`; white focus ring + green offset on CTA (UX-DR10); no full-viewport hero height.
- Added `public/images/hero.svg`; homepage documents replacement in `CONTENT.md`.
- `index.astro`: `Hero` + episode preview (sorted: `featured` first, then `publishDate` desc, slice 2); thumbnail, title, `line-clamp-2` description; no per-episode Spotify link (Story 2.3). Show CTA via `getSpotifyShowUrl()` (`src/lib/site.ts`), default [Storie Viola show](https://open.spotify.com/show/6Ny4Eh3xfB2sKR82J99cZQ); optional `PUBLIC_SPOTIFY_SHOW_URL`.
- `publishDate` on episode schema; `src/lib/sortEpisodes.ts`; empty-episodes message on homepage.
- Code review follow-ups applied. Story marked **done** after acceptance.
- Verified one `<h1>` in built `dist/index.html`. Automated tests not added per story scope (Epic 5).

### File List

- storieviola-it/src/components/Hero.astro (new)
- storieviola-it/public/images/hero.svg (new)
- storieviola-it/src/lib/site.ts (new)
- storieviola-it/src/lib/sortEpisodes.ts (new)
- storieviola-it/src/pages/index.astro (modified)
- storieviola-it/src/content.config.ts (modified)
- storieviola-it/src/content/episodes/placeholder-episode.md (modified)
- storieviola-it/CONTENT.md (modified)
- storieviola-it/.env.example (new)

### Change Log

- 2026-03-19: Story 2.2 — compact Hero, homepage wiring, episode preview block, hero asset + CONTENT.md note.
- 2026-03-20: Code review fixes — show URL helper, `publishDate` + sort, empty state, CTA focus; default Spotify show URL; story status **done**.
