# Story 1.2: Define Content Collections schema for episodes and about

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **creator**,
I want **episode and about content defined as validated collections**,
so that **I can add episodes and about text as files and the build fails if required fields are missing**.

## Acceptance Criteria

1. **Given** the Astro project from 1.1, **when** I add `src/content/config.ts` with schema for episodes (title, description, cover, spotifyUrl, tags) and for about content, **and** create `src/content/episodes/` and `src/content/about.md` (or `about/index.md`), **then** `npm run build` validates frontmatter; build fails if a required episode field is missing or invalid.
2. **And** episode fields use camelCase; collection folder names are lowercase plural per Architecture.
3. **And** README or CONTENT.md documents how to add an episode file and edit about content (FR1, FR2, FR6).

## Tasks / Subtasks

- [x] Add content config and schema (AC: #1, #2)
  - [x] Create `storieviola-it/src/content.config.ts` (Astro 6: config at src root) or `storieviola-it/src/content/config.ts` per your Astro version — see [Content collections](https://docs.astro.build/en/guides/content-collections) with `defineCollection` for episodes and about
  - [x] Episode schema: `title`, `description`, `cover`, `spotifyUrl`, `tags` (all camelCase; tags = array of strings); all required for episodes
  - [x] About: single document schema (body Markdown; frontmatter optional per architecture)
  - [x] Use Astro 6 content API: `defineCollection`, `z` from `astro:content`; `glob` from `astro/loaders` with correct `base` paths
- [x] Create collection folders and sample/stub content (AC: #1)
  - [x] Create `storieviola-it/src/content/episodes/` (lowercase plural)
  - [x] Create `storieviola-it/src/content/about.md` or `storieviola-it/src/content/about/index.md`
  - [x] Add at least one minimal valid episode file (e.g. placeholder) so build runs and validates
  - [x] Add minimal about content so about collection validates
- [x] Verify build validation (AC: #1)
  - [x] Run `npm run build` from `storieviola-it/`; build must succeed with valid content
  - [x] Remove a required episode field or break frontmatter and confirm build fails with clear error
- [x] Document for creator (AC: #3)
  - [x] Add README section or `CONTENT.md` in repo/app explaining: how to add an episode file (fields, camelCase, file location), how to edit about content

## Dev Notes

- **Epic context:** Epic 1 is Project foundation and deploy (FR8, FR9, FR17). This story establishes the content model so creators can add episodes and about as files; Story 1.3 adds deploy.
- **Scope:** Schema and folders only. Do **not** implement layout, Header, Hero, episode list UI, or deploy (later stories). Do **not** add Vitest/Playwright yet (Epic 5).
- **App root:** All implementation lives under `storieviola-it/` (see Previous Story Intelligence).

### Technical Requirements

- **Content Collections:** Astro Content Collections with build-time schema validation. Config file: `storieviola-it/src/content.config.ts` (Astro 6) or `storieviola-it/src/content/config.ts` — verify in Astro docs for your version. Episodes: `title`, `description`, `cover`, `spotifyUrl`, `tags` (array of strings). CamelCase for all frontmatter fields.
- **Collection paths:** `storieviola-it/src/content/episodes/` (one file per episode); about as single file `storieviola-it/src/content/about.md` or `storieviola-it/src/content/about/index.md`.
- **Validation:** Build must fail if a required episode field is missing or invalid. Use Zod schema via Astro's content API; do not silently default required fields.
- **Naming:** Content fields camelCase; collection folder names lowercase plural (epics, architecture).

### Architecture Compliance

- [Source: architecture.md] **Data architecture:** Content store file-based; episode schema `title`, `description`, `cover` (image path or URL), `spotifyUrl`, `tags` (array of strings). About: single document; frontmatter optional; body = Markdown.
- [Source: architecture.md] **Structure:** `storieviola-it/src/content/config.ts`, `storieviola-it/src/content/episodes/`, `storieviola-it/src/content/about.md` or `about/index.md`. Single source of truth per content type.
- [Source: architecture.md] **Format:** Episode schema required fields enforced in config; no API; no shared JSON response wrapper. Build invalid/missing → schema fails build.
- [Source: architecture.md] **Enforcement:** All agents must use same Content Collection schema and camelCase field names; place content under chosen folders; document one-off exceptions.

### Library / Framework Requirements

- **Astro 6:** Use `defineCollection` and `z` from `astro:content`; loaders from `astro/loaders` (e.g. `glob` with `base: './src/content/episodes'` and similar for about). Follow [Astro 6 Content Collections](https://v6.docs.astro.build/en/guides/content-collections) and API reference for exact signatures.
- **Zod:** Schema via Astro's built-in Zod (`z` from `astro:content`). Required string fields, `z.array(z.string())` for tags; `cover` can be string (path or URL); no extra runtime Zod dependency unless Astro requires it.

### File Structure Requirements

- **Must create:** `storieviola-it/src/content.config.ts` (or `src/content/config.ts` per Astro docs), `storieviola-it/src/content/episodes/` (with at least one valid episode file), `storieviola-it/src/content/about.md` or `storieviola-it/src/content/about/index.md`.
- **Do not create:** `src/content/config.ts` at repo root; app root is `storieviola-it/`. Do not add components, layouts, or deploy workflow in this story.
- **Covers:** Architecture allows episode covers in `public/episodes/` or URL in frontmatter; document one convention (e.g. path relative to public or full URL).

### Testing Requirements

- No test framework or test files in this story. Validation is via `npm run build` (schema fails build on invalid content). Epic 5 adds Vitest/Playwright.

### Previous Story Intelligence

- **Story 1.1** established: Astro 6.0.5 minimal template; project lives under **`storieviola-it/`** subfolder at repo root; Tailwind v4 via `@tailwindcss/vite` (no separate `tailwind.config` file; config in `astro.config.mjs` and `src/styles/global.css`). Commands: `npm run dev`, `npm run build`, `npm run preview` from `storieviola-it/`.
- **Files/structure:** `storieviola-it/package.json`, `storieviola-it/astro.config.mjs`, `storieviola-it/src/pages/index.astro`, `storieviola-it/src/styles/global.css`, `storieviola-it/src/layouts/`, `storieviola-it/src/components/`, `storieviola-it/public/`. **No `src/content/` yet** — this story creates it.
- **Convention:** All app code and config under `storieviola-it/`; Story 1.3 will use `path: ./storieviola-it` in GitHub Actions. Do not add content or config at repo root.

### Latest Tech Information

- **Astro 6 Content Collections:** Config at `src/content.config.ts` (Astro 6) or `src/content/config.ts` in older versions; verify in [Content collections](https://docs.astro.build/en/guides/content-collections). `defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/episodes' }), schema: z.object({ ... }) })`. Export `collections` object. Build-time validation; missing required field → build fails.
- **Zod in Astro:** Use `z` from `astro:content` (or `astro/zod` in older Astro; check current docs). For tags: `z.array(z.string())`. For optional frontmatter on about: `z.object({}).optional()` or omit required fields.
- **About collection:** Single document can be one file in `src/content/about.md` or `src/content/about/index.md`; use a collection with a single-file loader or equivalent so it's validated and queryable.

### Project Context Reference

- No `project-context.md` in repo. Follow architecture.md and epics.md.
- **Project:** storieviola.it — static site for Storie Viola podcast (episode list, about, Spotify links). Content as files; deploy in Story 1.3.

## Dev Agent Record

### Agent Model Used

(Set by dev agent)

### Debug Log References

- Build validated: `npm run build` succeeds with valid content; removing `spotifyUrl` from an episode yields `InvalidContentEntryDataError` with "spotifyUrl: Required".

### Completion Notes List

- Added `storieviola-it/src/content.config.ts` with `episodes` and `about` collections using Astro 6 API (`defineCollection`, `glob` from `astro/loaders`, `z` from `astro/zod`). Episode schema: title, description, cover, spotifyUrl, tags (camelCase, all required). About: optional frontmatter, body Markdown; loader base `./src/content/about`, pattern `**/*.{md,mdx}`.
- Created `storieviola-it/src/content/episodes/` with `placeholder-episode.md` and `storieviola-it/src/content/about/index.md` so build runs and validates both collections.
- Verified build fails when a required episode field is missing (clear schema error). CONTENT.md added with instructions for adding episodes (camelCase, required fields) and editing about content (FR1, FR2, FR6). No test framework added (per story scope; Epic 5).
- **CR follow-up:** Added `storieviola-it/astro.config.mjs` to File List (was in git diff, not documented). Updated CONTENT.md: "project root" → "app root (storieviola-it/)" for build command.

### File List

- storieviola-it/src/content.config.ts (new)
- storieviola-it/src/content/episodes/placeholder-episode.md (new)
- storieviola-it/src/content/about/index.md (new)
- storieviola-it/CONTENT.md (new)
- storieviola-it/astro.config.mjs (modified; in git diff — added to File List per CR)

---

## Senior Developer Review (AI)

**Reviewer:** Filippo  
**Date:** 2026-03-17  
**Outcome:** Approved after fixes (MEDIUM fixed: File List + CONTENT.md)

### Summary

- **Story:** 1-2-define-content-collections-schema-for-episodes-and-about.md  
- **Git vs Story discrepancies:** 1 (application source file modified but not in File List)  
- **Issues:** 0 High, 1 Medium, 0 Low  

### Acceptance criteria

- **AC1** (schema, collections, build validation): **Implemented.** `src/content.config.ts` defines `episodes` and `about` with Zod; `episodes/` and `about/index.md` exist; `npm run build` succeeds with valid content and fails with a clear `InvalidContentEntryDataError` ("spotifyUrl: Required") when a required episode field is missing. Verified by running build and then commenting out `spotifyUrl` and re-running build.
- **AC2** (camelCase, lowercase plural): **Implemented.** Schema uses `title`, `description`, `cover`, `spotifyUrl`, `tags`; folders are `episodes/` and `about/`.
- **AC3** (README or CONTENT.md): **Implemented.** `CONTENT.md` explains how to add an episode (fields, camelCase, location) and how to edit about content (FR1, FR2, FR6).

### Task audit

All tasks marked [x] were verified: content config and schema, collection folders and stub content, build validation, and creator documentation are present and correct. No tasks marked complete but not done.

### Findings

- **MEDIUM — File List vs git:** `storieviola-it/astro.config.mjs` is modified in git but not listed in the story File List. The current change (Tailwind plugin and Rollup `onwarn` suppression) looks like it could be from Story 1.1 or earlier. If any part of the change was made in this story, add `storieviola-it/astro.config.mjs` to the File List; otherwise no change needed.

### Code quality

- **content.config.ts:** Correct use of `defineCollection`, `glob` from `astro/loaders`, `z` from `astro/zod`; episode schema required and camelCase; about schema optional frontmatter. No security or performance concerns (build-time only).
- **placeholder-episode.md / about/index.md:** Valid frontmatter and structure.
- **CONTENT.md:** Clear, covers required fields and conventions. Optional clarification: "project root" could be read as repo root; saying "from the app root (`storieviola-it/`)" would match the story.

No CRITICAL or HIGH issues; one MEDIUM documentation item above.
