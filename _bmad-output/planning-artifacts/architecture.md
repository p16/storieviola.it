---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - product-brief-storieviola.it-2026-03-14.md
  - prd.md
  - ux-design-specification.md
workflowType: 'architecture'
project_name: 'storieviola.it'
user_name: 'Filippo'
date: '2026-03-15'
lastStep: 8
status: 'complete'
completedAt: '2026-03-15'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- **Episode catalog:** Episode data per item: title, description, cover image reference, Spotify link, and **tags**. Creator can add/update episodes with this data; visitors see a list of all episodes and can filter by tag. Content maintained as structured data or files in repo (no runtime CMS).
- **About/project info:** Editable origin and "how it's made" content; visitor-facing about page.
- **Content & deployment:** Publish via push → build → publish; episode and about content as repo-managed data/files; no separate admin UI (FR17).
- **Discoverability:** SEO (meta, stable URLs), basic analytics to confirm reach and discoverability.
- **Presentation:** Responsive (mobile + desktop), clear hierarchy and one primary "Listen on Spotify" CTA per episode; links clearly indicated and operable (keyboard and pointer).

**Non-Functional Requirements:**
- **Performance:** Homepage usable within a few seconds; episode list performant with hundreds of episodes (NFR-P1, P2).
- **Scalability:** Catalog scales from ~10 to hundreds of episodes without changing content workflow; build/deploy complete in reasonable time (NFR-S1, S2).
- **Accessibility:** Readable text, clear structure, focusable/activatable links; WCAG-oriented (NFR-A1, A2).
- **Reliability:** High-availability static hosting (e.g. GitHub Pages) (NFR-R1).
- **Security:** No sensitive/personal data beyond minimal, privacy-aware analytics (NFR-SEC1).

**Scale & Complexity:**
- **Primary domain:** Static web (content, build, deploy, hosting).
- **Complexity level:** Low — greenfield, single maintainer, file-based content, no backend or auth.
- **Architectural components:** Content source (data/files), build pipeline, static output, hosting, optional analytics integration.

### Technical Constraints & Dependencies

- **Runtime:** Static site only; no application server. Build produces static assets (HTML/CSS/JS).
- **Content source:** Episodes and about content as repo-managed data (e.g. Markdown, JSON, or both). **Episode records include:** title, description, cover image ref, Spotify link, and tags (for filtering). Built into static pages at build time.
- **Deployment:** Push (or trigger) → build → publish to static host (e.g. GitHub Pages). No server-side runtime.
- **UX stack:** Utility-first CSS (e.g. Tailwind); custom components (header, hero, episode card/row, tag filter, about). Responsive: card grid ≥768px, single column below; hero + first episodes visible without scrolling.
- **Browser:** Modern browsers (desktop and mobile). No legacy or enterprise browser support required.

### Cross-Cutting Concerns Identified

- **SEO:** Meta tags, semantic structure, stable URLs for homepage and about.
- **Accessibility:** WCAG 2.1 AA (contrast, focus, keyboard, semantics, touch targets).
- **Responsive design:** Single breakpoint (~768px); mobile-first; same content, layout adapts.
- **Tag/filter model:** Episodes have tags; filter UI (e.g. "All", "Featured", topic tags) affects data shape and build-time or client-side filtering.
- **Deploy pipeline:** Repo → build → publish must stay simple and repeatable for the creator.
- **Analytics:** Lightweight, privacy-aware integration to confirm reach and discoverability.

## Starter Template Evaluation

### Primary Technology Domain

Static web (content-driven) — based on project context: static site, file-based episode and about content, Tailwind, GitHub Pages deployment.

### Starter Options Considered

- **Astro:** Content Collections (Markdown/JSON, type-safe), official Tailwind integration, zero-JS-by-default, official GitHub Pages deploy. Best fit for episode data + tags + static output.
- **Eleventy (11ty):** Mature, flexible, Tailwind possible; content and tag/filter logic more manual; no built-in content collections.
- **Vite + HTML + Tailwind:** Minimal control; no content or routing layer — would require custom build for episode list and filtering.

### Selected Starter: Astro (minimal template + Tailwind)

**Rationale for Selection:**
- Content Collections map directly to episode records (title, description, cover, Spotify link, tags) and about content; schema validation keeps data consistent.
- UX spec calls for utility-first CSS (Tailwind); Astro's official Tailwind integration is supported and current.
- Static output and GitHub Pages align with PRD; official deploy action keeps push → live simple.
- Minimal template avoids blog/theme assumptions; we add only what the product needs.

**Initialization Command:**

```bash
npm create astro@latest . -- --template minimal --install --no-git
```

Then add Tailwind:

```bash
npx astro add tailwind
```

(Use a project folder name instead of `.` if creating in a new directory, e.g. `npm create astro@latest storieviola-it -- --template minimal --install --no-git`.)

**Architectural Decisions Provided by Starter:**

**Language & Runtime:** Node.js; TypeScript supported in Astro (optional for strict typing). No runtime beyond static files.

**Styling Solution:** Tailwind added via `astro add tailwind`; configure in `tailwind.config.mjs` / Tailwind v4 as per Astro docs.

**Build Tooling:** Vite-based build; static prerender by default; optimised production output.

**Testing:** Mandatory. Vitest for unit/component tests (content schema, helpers, optional component tests); Playwright for browser/E2E (homepage, tag filter, about, "Listen on Spotify" flow, basic a11y). Add during initial implementation.

**Code Organization:** `src/pages/` (routes), `src/layouts/`, `src/components/`, `src/content/` (content collections); `public/` for static assets.

**Development Experience:** `npm run dev` (hot reload), `npm run build` (static build), `npm run preview` (local preview of build).

**Note:** Project initialization using the commands above should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Content model: Astro Content Collections for episodes (title, description, cover, Spotify link, tags) and about content; schema validation at build time.
- Deployment: GitHub Pages via GitHub Actions using official Astro action; `site` and `base` configured in `astro.config.mjs`.

**Important Decisions (Shape Architecture):**
- Tag filtering: Client-side only. Prefer Alpine.js for declarative filter state and accessibility (e.g. aria-pressed); vanilla JS allowed if zero-dependency is preferred. One approach project-wide — no mixing.
- Analytics: Lightweight, privacy-aware only (e.g. minimal script or server-side logs); no sensitive data (NFR-SEC1).

**Deferred Decisions (Post-MVP):**
- Staging environment; formal monitoring beyond "site is reachable."

### Data Architecture

- **Content store:** File-based only. Episodes and about content live in `src/content/` as Astro Content Collections (Markdown frontmatter or JSON).
- **Episode schema:** `title`, `description`, `cover` (image path or URL), `spotifyUrl`, `tags` (array of strings). Validated via collection schema (Zod or Astro's built-in schema).
- **About content:** Single collection or one Markdown file in `src/content/about`; no database or CMS.
- **Migration:** N/A — greenfield; new episodes added as new files.

### Authentication & Security

- **Authentication:** None — public static site; no login or user accounts.
- **Security:** No sensitive or personal data processed; analytics minimal and privacy-aware (NFR-SEC1). No server-side processing; static hosting only.

### API & Communication Patterns

- **API:** None — no server-side API. External integration: outbound links to Spotify only (no server-to-server calls).
- **Error handling:** Standard HTML/HTTP; no custom API error contracts.

### Frontend Architecture

- **State management:** No global store. Tag filter: local state only. Use Alpine.js (recommended) or vanilla JS; one approach project-wide. Selected tag drives show/hide of episode nodes (data-tags on each episode block).
- **Component architecture:** Astro components in `src/components/` (Header, Hero, EpisodeCard/EpisodeRow, TagFilter, About content); Tailwind for layout and styling; one primary CTA per episode (UX spec).
- **Routing:** Astro file-based (`src/pages/index.astro`, `src/pages/about.astro`); stable URLs for home and about (SEO).
- **Performance:** Static prerender; images via Astro's Image or responsive `srcset`; Tailwind purge for minimal CSS.
- **Accessibility:** WCAG 2.1 AA (contrast, focus, keyboard, semantics, touch targets ~44px) per UX spec.

### Infrastructure & Deployment

- **Hosting:** GitHub Pages (or equivalent static host). Custom domain storieviola.it configured at DNS/host.
- **CI/CD:** GitHub Actions workflow using `withastro/action`; build on push (e.g. main); deploy to GitHub Pages. No separate staging for MVP.
- **Environment:** `site` and `base` in `astro.config.mjs` for correct asset and canonical URLs (e.g. `https://storieviola.it` or `https://<user>.github.io/<repo>`).
- **Scaling:** Static hosting; no scaling decisions. Catalog size handled at build time (hundreds of episodes per NFR-S1).

### Decision Impact Analysis

**Implementation sequence:** (1) Initialise Astro project (minimal + Tailwind). (2) Define Content Collections and episode schema. (3) Implement layout and components (Header, Hero, Episode card/row, Tag filter, About). (4) Homepage and about page; tag filter behaviour (Alpine.js or vanilla). (5) Add Vitest (unit/component) and Playwright (E2E); cover schema, homepage, tag filter, about, Listen on Spotify, basic a11y. (6) GitHub Actions workflow and GitHub Pages config. (7) SEO (meta, canonical) and optional analytics.

**Cross-component dependencies:** Content schema drives component props; Tailwind and breakpoint (~768px) drive responsive layout (Direction B/C); deploy config depends on final site URL and repo structure.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical conflict points identified:** Naming (content + code), project structure, content schema shape, and minimal process rules so AI agents produce consistent, compatible output.

### Naming Patterns

**Content / collection field naming:**
- Use **camelCase** for all Content Collection and frontmatter fields: `title`, `description`, `cover`, `spotifyUrl`, `tags`. Same in JSON and Markdown frontmatter.
- Collection folder names: **lowercase, plural** for the content type (e.g. `src/content/episodes/`). One convention project-wide.

**Code naming:**
- **Components:** PascalCase, one component per file: `EpisodeCard.astro`, `TagFilter.astro`, `SiteHeader.astro`. File name matches component name.
- **Layouts:** PascalCase: `BaseLayout.astro`, `AboutLayout.astro`.
- **Pages:** Astro default — file name = route: `index.astro`, `about.astro` (lowercase).
- **Utilities/helpers:** camelCase functions in `src/lib/` or `src/utils/`: e.g. `getUniqueTags.ts`. Place in one place and stick to it.
- **CSS/Tailwind:** Prefer Tailwind utilities; custom class names **kebab-case** if needed: `.episode-card`, `.tag-filter-active`.

### Structure Patterns

**Project organization:**
- **Pages:** `src/pages/` — `index.astro` (home), `about.astro`. No extra nesting for MVP.
- **Components:** `src/components/` — flat: `Header.astro`, `Hero.astro`, `EpisodeCard.astro`, `EpisodeRow.astro`, `TagFilter.astro`. Do not split by route (e.g. avoid `components/home/` vs `components/about/`) unless the tree grows large.
- **Content:** `src/content/config.ts` (schema); `src/content/episodes/` (one file per episode); `src/content/about.md` or `src/content/about/index.md` for about. Single source of truth per content type.
- **Layouts:** `src/layouts/BaseLayout.astro`. Shared `<head>`, nav, and Tailwind in base layout.
- **Static assets:** `public/` for favicon, robots, etc.; episode cover images in `public/` or referenced by URL — one convention for covers.
- **Config:** `astro.config.mjs`, `tailwind.config.mjs` at repo root.

**File structure:**
- One component per file; filename = component name (PascalCase).
- Content: one entry per episode file; naming convention (e.g. `episode-01.md` or slug) documented in README or architecture.

### Format Patterns

**Content collection schema:**
- Episode schema: `title`, `description`, `cover`, `spotifyUrl`, `tags` (array of strings). Required fields enforced in `src/content/config.ts` so build fails on invalid content.
- About: single document; frontmatter optional; body = Markdown.
- No API; no shared JSON response wrapper.

**Data (if client-side filter):**
- Episode data passed to client matches collection shape: camelCase; `tags` as string array.

### Communication Patterns

**State:**
- Tag filter: local state only. Prefer Alpine.js for selected tag and filtered list (declarative, a11y-friendly); vanilla JS allowed. One pattern project-wide; episodes get data-tags, filter toggles show/hide. Tag filter: local state only (e.g. Alpine.js or vanilla JS). One pattern project-wide for “selected tag” and filtered list.

### Process Patterns

**Error handling:**
- **Build:** Invalid or missing required fields → schema validation fails build. Fix content or schema; do not silently default required fields.
- **Runtime:** No server; broken links are a content bug. 404 handled by host.

**Loading:**
- Content is static; no data-fetch loading states. If client-side filter is added, optional brief “filtering” state; one pattern only.

### Enforcement Guidelines

**All AI agents MUST:**
- Use the same Content Collection schema and field names (camelCase) for episodes and about.
- Place new components under `src/components/` with PascalCase file names matching the component name.
- Use the same layout (BaseLayout) and Tailwind approach unless the architecture doc explicitly allows an exception.
- Add new episodes as new files under the chosen content folder and naming convention; do not invent a second content shape or location.
- Add and maintain tests: Vitest for unit/component (schema, helpers); Playwright for E2E (homepage, tag filter, about, Listen on Spotify, basic a11y). Tests are mandatory.

**Pattern enforcement:**
- Schema in `src/content/config.ts` is source of truth; run `npm run build` to verify.
- Document one-off exceptions in the architecture doc or README.

### Pattern Examples

**Good:** Episode frontmatter: `title`, `spotifyUrl`, `tags: ['kids', 'avventura']`. Component: `src/components/EpisodeCard.astro` with `<EpisodeCard episode={...} />`. Single layout: `BaseLayout.astro` with `<slot />`.

**Avoid:** Mixing snake_case and camelCase in content. Two files for the same component concept. Adding a second “episodes” source alongside Content Collections.

## Project Structure & Boundaries

### Complete Project Directory Structure

```
storieviola.it/
├── README.md
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── .gitignore
├── .github/
│   └── workflows/
│       └── deploy.yml          # Astro GitHub Pages action
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── episodes/                # optional: local cover images
├── src/
│   ├── content/
│   │   ├── config.ts            # Content Collections schema (episodes + about)
│   │   ├── episodes/
│   │   │   ├── episode-01.md
│   │   │   └── ...
│   │   └── about.md             # or about/index.md
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── EpisodeCard.astro
│   │   ├── EpisodeRow.astro
│   │   ├── TagFilter.astro
│   │   └── (shared UI as needed)
│   ├── pages/
│   │   ├── index.astro          # Home: hero + episode list + tag filter
│   │   └── about.astro
│   ├── lib/                     # optional utilities
│   │   └── getUniqueTags.ts
│   └── styles/
│       └── global.css            # if any global Tailwind/overrides
├── tests/
│   ├── unit/                    # Vitest: schema, helpers, components
│   └── e2e/                     # Playwright: homepage, tag filter, about, a11y
└── _bmad-output/                # BMAD planning artifacts (existing)
```

### Architectural Boundaries

**API boundaries:** None — static site; no server API. External: outbound links to Spotify only.

**Component boundaries:** Pages (`src/pages`) fetch content via `getCollection()` and pass data to layout and components. Layout provides shell (nav, footer); components are presentational (props in, markup out). Tag filter state is local to the page or one wrapper component (Alpine or vanilla).

**Service boundaries:** No backend services. Build-time only: Astro content layer and Vite build.

**Data boundaries:** Content lives in `src/content/`; schema in `src/content/config.ts`. No runtime DB; `public/` for static assets. Episode covers: either under `public/episodes/` or external URLs in frontmatter — one convention project-wide.

### Requirements to Structure Mapping

**Episode catalog (FR1–FR5, tag filter):**
- Content: `src/content/episodes/*.md` (schema in `src/content/config.ts`)
- UI: `src/pages/index.astro`, `src/components/Hero.astro`, `EpisodeCard.astro`, `EpisodeRow.astro`, `TagFilter.astro`
- Helpers: `src/lib/getUniqueTags.ts` if used for filter options

**About / project info (FR6–FR7):**
- Content: `src/content/about.md` (or `about/index.md`)
- UI: `src/pages/about.astro`, `BaseLayout.astro`

**Content management & deploy (FR8, FR9, FR17):**
- Edit files in `src/content/` and `public/`; deploy via GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages

**SEO & discoverability (FR10–FR12):**
- Meta and structure in `BaseLayout.astro` and per-page frontmatter; stable URLs via `src/pages/` file names

**Analytics (FR13):**
- Optional script or integration in `BaseLayout.astro` or a dedicated component; config via env if needed

### Integration Points

**Internal:** Pages → get content (getCollection) → pass to Layout and components. No shared state store; filter state local to homepage.

**External:** Spotify links in content and rendered as `<a href={spotifyUrl}>`. No server-to-server calls.

**Data flow:** Content Collections (Markdown/JSON) → build → static HTML. Client: only tag filter state (if implemented) and link navigation.

### File Organization Patterns

**Config:** `astro.config.mjs`, `tailwind.config.mjs`, `tsconfig.json` at repo root. `site` and `base` in `astro.config.mjs` for GitHub Pages. Env via `import.meta.env`; secrets in GitHub Actions, not in repo.

**Source:** `src/pages` (routes), `src/layouts` (shell), `src/components` (flat), `src/content` (collections + schema), `src/lib` (pure helpers). One component per file; PascalCase.

**Tests:** Mandatory. Vitest: unit/component tests in `src/**/*.test.ts` or `tests/unit/`. Playwright: E2E in `tests/e2e/` (or `e2e/`). Cover content schema, helpers, homepage, tag filter, about page, and "Listen on Spotify" flow; include basic a11y checks in E2E.

**Assets:** `public/` for static files; episode covers in `public/episodes/` or referenced by URL in frontmatter.

### Development Workflow Integration

**Dev:** `npm run dev` — Astro dev server; edit `src/content` and components; hot reload.

**Build:** `npm run build` — Vite build; Content Collections validated at build; output to `dist/`.

**Deploy:** Push to main (or chosen branch) → GitHub Actions runs `withastro/action` → build and publish to GitHub Pages. Structure supports this with no extra deploy-time paths.

## Architecture Validation Results

### Coherence Validation ✅

**Decision compatibility:** Astro (minimal + Tailwind), Content Collections, static build, and GitHub Pages align. Naming (camelCase content, PascalCase components), structure (flat components, `src/content/episodes/` + about), tag filter (client-side, Alpine.js preferred or vanilla), and mandatory testing (Vitest + Playwright) are consistent.

**Pattern consistency:** Implementation patterns support the stack; tests are mandatory; tag filter uses one approach project-wide.

**Structure alignment:** Directory tree supports content, layouts, components, pages, tests, and deploy.

### Requirements Coverage Validation ✅

All FRs and NFRs have architectural support. Episode catalog, about, content/deploy, SEO, analytics, and presentation are mapped. Testing is required (Vitest + Playwright).

### Implementation Readiness Validation ✅

Decisions, patterns, structure, and testing requirements are documented. AI agents can implement consistently.

### Gap Analysis Results

No critical gaps. Tag filter approach specified (Alpine.js preferred, vanilla allowed). Tests are mandatory.

### Architecture Completeness Checklist

**✅ Requirements analysis** — Context, scale, constraints, cross-cutting concerns mapped.

**✅ Architectural decisions** — Starter, content model, deployment, frontend, infra, testing (Vitest + Playwright mandatory), tag filter (client-side, one approach).

**✅ Implementation patterns** — Naming, structure, communication, process, enforcement.

**✅ Project structure** — Directory tree, boundaries, requirements mapping, tests/ structure.

### Architecture Readiness Assessment

**Overall status:** READY FOR IMPLEMENTATION

**Confidence level:** High — static scope, clear stack, full mapping, mandatory tests, tag filter specified.

**Key strengths:** Single coherent stack; clear content model and schema; simple deploy path; mandatory Vitest + Playwright; tag filter (Alpine or vanilla) defined.

### Implementation Handoff

**AI agent guidelines:**
- Follow this document and implementation patterns exactly.
- Use the same Content Collection schema and component/layout conventions.
- Implement and maintain Vitest (unit/component) and Playwright (E2E) tests.
- Use one tag-filter approach project-wide (Alpine.js recommended or vanilla).

**First implementation priority:** Initialise Astro project, then Content Collections and episode schema:

```bash
npm create astro@latest . -- --template minimal --install --no-git
npx astro add tailwind
```
