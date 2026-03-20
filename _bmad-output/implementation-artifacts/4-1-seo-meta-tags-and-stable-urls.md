# Story 4.1: SEO meta tags and stable URLs

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->
## Story

As a visitor or search engine,
I want basic SEO meta tags (title, description, canonical, Open Graph/Twitter) and stable URLs for the homepage and about page,
so that the site can be discovered for relevant queries and shared with correct previews.

## Acceptance Criteria

1. **Given** the site has a homepage and an about page,
   **When** a crawler or user visits the site,
   **Then** each key page has appropriate meta (title, description) for SEO and link previews (FR11).
2. **And** homepage and about have stable, shareable URLs (e.g. `/` and `/about`) (FR12).
3. **And** pages use semantic structure (headings, links) to support discoverability (FR10).

## Tasks / Subtasks

- [x] Add SEO/link-preview meta support to `storieviola-it/src/layouts/BaseLayout.astro`
  - [x] Extend `interface Props` to accept optional metadata props (keep backward-compatible defaults):
    - `description?: string`
    - `canonicalPath?: string` (e.g. `/` or `/about`)
    - `ogImage?: string` (default to `/images/hero.svg`)
    - `ogImageAlt?: string` (default to the existing hero alt or a safe fallback)
  - [x] Add `<meta name="description" ...>` to `<head>`
  - [x] Add `<link rel="canonical" ...>` to `<head>`, computed as an absolute URL using `Astro.site` + `canonicalPath`
  - [x] Add Open Graph tags to `<head>`:
    - `og:title`, `og:description`, `og:url`, `og:type` (= `website`)
    - `og:image`, `og:image:alt`
  - [x] Add Twitter card tags to `<head>`:
    - `twitter:card` (= `summary_large_image`)
    - Mirror `twitter:title`, `twitter:description`, `twitter:image`
  - [x] Keep head tags server-rendered by Astro (do not rely on client-side JS to populate them)
- [x] Update `storieviola-it/src/pages/index.astro` to pass metadata to `BaseLayout`
  - [x] Pass `title="Storie Viola"` (or keep the current one consistent)
  - [x] Pass `description` using the same copy as the homepage hero intro
  - [x] Pass `canonicalPath="/"` and `ogImage="/images/hero.svg"` and the matching `ogImageAlt`
- [x] Update `storieviola-it/src/pages/about.astro` to pass metadata to `BaseLayout`
  - [x] Pass `title="About — Storie Viola"` (or choose a consistent wording and keep it stable)
  - [x] Pass a concise 1-sentence `description` summarizing origin/how-it's-made
  - [x] Pass `canonicalPath="/about"` and reuse `ogImage="/images/hero.svg"` (unless an about-specific image is added)
- [x] Confirm stable URLs and preview URLs match exactly
  - [x] Ensure the canonical URL paths match the routes exactly: homepage `/`, about `/about`
  - [x] Ensure the app uses root-relative links for these routes (home + about are `href="/"` and `href="/about"`)
- [x] Smoke-check link-preview correctness after build
  - [x] Run `npm run build`
  - [x] Verify rendered HTML for `/` and `/about` includes: `title`, `meta name="description"`, `link rel="canonical"`, and Open Graph/Twitter tags (no missing values)

## Dev Notes

- Technical context (current repo state):
  - `BaseLayout.astro` currently only sets charset, viewport, icons, generator, and `<title>`; it does not yet set SEO description/canonical/open-graph/twitter meta tags.
  - `astro.config.mjs` already declares `site: 'https://storieviola.it'` and `base: '/'`, which should be used to generate absolute canonical URLs.
  - Homepage and about routes are already correctly file-based (`src/pages/index.astro`, `src/pages/about.astro`) and the header links already target `/` and `/about`.
- Implementation guardrails:
  - Do not duplicate SEO head blocks per page. Centralize SEO head logic in `BaseLayout.astro` and pass per-page metadata via props.
  - Avoid introducing new dependencies for SEO meta tags; use plain Astro/HTML head tags.
  - Ensure that `og:image` is an absolute or root-relative URL that will resolve in production; for MVP reuse the existing `public/images/hero.svg`.
  - Keep semantic structure intact:
    - Homepage already has a single `<h1>` via the `Hero` component.
    - About page relies on the Markdown content headings (e.g. `# Origin`, `## How it's made`).
- Success is “crawler-visible head metadata is present and stable”:
  - Title/description/canonical and social meta are visible in the initial HTML response (not after client-side hydration).

### Project Structure Notes

- Touch only these files for this story:
  - `storieviola-it/src/layouts/BaseLayout.astro`
  - `storieviola-it/src/pages/index.astro`
  - `storieviola-it/src/pages/about.astro`
- Do not create a second head component or a second layout. Keep the existing layout as the single source of truth for `<head>`.

### References

- [Source: `_bmad-output/planning-artifacts/epics.md#Epic 4 → Story 4.1: SEO meta tags and stable URLs`]
- [Source: `_bmad-output/planning-artifacts/prd.md#Discoverability (SEO & URLs)`]
- [Source: `_bmad-output/planning-artifacts/architecture.md#SEO & discoverability (FR10–FR12)`]
- [Source: `storieviola-it/src/layouts/BaseLayout.astro`]
- [Source: `storieviola-it/src/pages/index.astro`]
- [Source: `storieviola-it/src/pages/about.astro`]
- [Source: `storieviola-it/astro.config.mjs`]
- [Source: `storieviola-it/CONTENT.md#Homepage hero image`]

## Dev Agent Record

### Agent Model Used

GPT-5.4 Nano

### Debug Log References

- `npm run build` (pass)
- Verified rendered metadata in:
  - `storieviola-it/dist/index.html`
  - `storieviola-it/dist/about/index.html`

### Completion Notes List

- Added centralized SEO/link-preview metadata support in `BaseLayout.astro` with backward-compatible defaults.
- Added `description`, canonical, Open Graph, and Twitter card tags rendered server-side in Astro head.
- Computed canonical and social URLs from `Astro.site` and route-specific `canonicalPath` values.
- Updated homepage and about pages to pass stable metadata (`/` and `/about`) and consistent social preview image/alt text.
- Built the site and verified generated HTML includes required title/description/canonical/Open Graph/Twitter tags on both routes.

### File List

- `storieviola-it/src/layouts/BaseLayout.astro`
- `storieviola-it/src/pages/index.astro`
- `storieviola-it/src/pages/about.astro`

### Change Log

- 2026-03-20: Implemented Story 4.1 SEO metadata and stable canonical URLs for homepage/about; validated with production build output.

