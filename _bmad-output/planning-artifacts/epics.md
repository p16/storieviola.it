---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
---

# storieviola.it - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for storieviola.it, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Creator can add a new episode with title, description, cover image reference, Spotify link, and tags.
FR2: Creator can update an existing episode's title, description, cover image reference, Spotify link, or tags.
FR3: Visitor can see a list of all episodes (optionally filtered by tag).
FR4: Visitor can see each episode's title, description, cover image, and tags in the list.
FR5: Visitor can follow a link from the site to open the episode on Spotify (one-click path to listen).
FR18: Visitor can filter the episode list by tag (e.g. All, Featured, or topic tags).
FR6: Creator can edit the content that describes the project's origin and how the stories are made.
FR7: Visitor can read the project's origin and how the stories are made (about/origin content).
FR8: Creator can publish content changes so the live site reflects updated episodes and about content.
FR9: Episode and about content can be maintained as structured data or files (no runtime CMS required for MVP).
FR10: The site can be discovered via search for relevant queries (e.g. "storie per bambini", "storie viola").
FR11: The site exposes basic metadata (e.g. title, description) for search engines and link previews.
FR12: Key pages have stable, shareable URLs (e.g. homepage, about).
FR13: Product owner can see evidence that the site is reachable and that visitors can discover it (e.g. lightweight analytics or equivalent).
FR14: The site is usable on mobile and desktop (responsive layout).
FR15: The episode list and links to listen are easy to scan and use (clear hierarchy and structure).
FR16: Links to external destinations (e.g. Spotify) are clearly indicated and operable (e.g. keyboard and pointer).
FR17: Creator can add and update all episode and about content through the repository (e.g. edit data/files and push) without using a separate admin UI or CMS.

### NonFunctional Requirements

NFR-P1: The homepage (including the episode list) loads and becomes usable within a few seconds on typical home broadband and 4G.
NFR-P2: The episode list remains usable (e.g. scroll, tap links) when it contains hundreds of episodes (e.g. 400+). If the list is paginated or virtualized, that choice is an implementation detail; the requirement is that the list does not become unusably slow or heavy.
NFR-S1: The system supports an episode catalog that can grow from ~10 to hundreds of episodes without requiring a different content workflow (e.g. still manageable via repository/file-based content only; no separate admin UI required).
NFR-S2: Build and deploy complete in a reasonable time (e.g. within several minutes) at expected catalog size (hundreds of episodes), so the creator's "push → live" workflow remains practical.
NFR-A1: Text is readable (contrast, size) and structure is clear (headings, list semantics) so visitors can scan and choose episodes.
NFR-A2: Links (including "Listen on Spotify") are focusable and activatable via keyboard and pointer so visitors can open episodes without mouse-only interaction.
NFR-R1: The site is served from a hosting environment (e.g. GitHub Pages or equivalent) with high availability so storieviola.it is reachable when users search or follow links.
NFR-SEC1: No sensitive or personal data is collected or processed by the site beyond what is required for lightweight analytics (if any); any such analytics must be privacy-aware and minimal.

### Additional Requirements

- **Starter template (Epic 1 Story 1):** Initialise Astro project with minimal template and Tailwind: `npm create astro@latest . -- --template minimal --install --no-git` then `npx astro add tailwind`. This is the first implementation story.
- **Content model:** Astro Content Collections for episodes (title, description, cover, spotifyUrl, tags) and about content; schema validation at build time in `src/content/config.ts`.
- **Episode schema:** Fields title, description, cover (image path or URL), spotifyUrl, tags (array of strings). CamelCase for all content fields; collection folder `src/content/episodes/`.
- **About content:** Single document in `src/content/about.md` or `src/content/about/index.md`; no database or CMS.
- **Deployment:** GitHub Pages via GitHub Actions using official Astro action (`withastro/action`); `site` and `base` in `astro.config.mjs`.
- **Tag filtering:** Client-side only; one approach project-wide (Alpine.js preferred or vanilla JS). Episodes have data-tags; filter toggles show/hide; accessible (e.g. aria-pressed).
- **Testing (mandatory):** Vitest for unit/component tests (schema, helpers, optional component tests); Playwright for E2E (homepage, tag filter, about, "Listen on Spotify" flow, basic a11y). Add during initial implementation.
- **Naming:** Components PascalCase, one per file (e.g. EpisodeCard.astro, TagFilter.astro); pages index.astro, about.astro; utilities camelCase in src/lib/.
- **Project structure:** src/pages/, src/layouts/, src/components/ (flat), src/content/, src/lib/; public/ for static assets; tests/unit/ and tests/e2e/.

### UX Design Requirements

UX-DR1: Implement design tokens for color (background, text, primary CTA accent), typography scale (site title, episode titles, body), and spacing (consistent base unit and scale) via Tailwind config or CSS variables.
UX-DR2: Implement Header component: site identity (link to home), link to About; semantic `<header>` and `<nav>`; visible focus styles on links; no dropdown or mega-menu.
UX-DR3: Implement compact Hero component: image, title, 1–2 sentences, optional podcast-level CTA; desktop = horizontal bar, mobile = stacked centered; semantic `<h1>`, image alt text, visible focus on CTA.
UX-DR4: Implement Episode card/row component (one component, two layout variants): cover, title, short description, tags, one "Listen on Spotify" link; desktop = card in grid, mobile = single-column list row; visible focus and min ~44px touch target on CTA.
UX-DR5: Implement Tag filter component: "All" (or "Featured") plus list of tags; one active selection; selected state clearly distinct; buttons/links with aria-pressed or equivalent; keyboard navigable with visible focus.
UX-DR6: Implement About page content block: single column, max-width for readability; semantic headings and paragraphs; same header as rest of site.
UX-DR7: Responsive layout: Direction B (compact hero bar + card grid) at or above breakpoint 768px; Direction C (centered hero + single-column list) below 768px; mobile-first with min-width media queries.
UX-DR8: Ensure hero and at least 1–2 episodes are visible on first load without scrolling (no hero-only first screen) on both desktop and mobile.
UX-DR9: One primary CTA per episode only ("Listen on Spotify"); single accent color for CTA; no competing primary actions on same card or hero.
UX-DR10: WCAG 2.1 AA: contrast 4.5:1 normal text, 3:1 large text/UI; visible focus ring on all interactive elements (header links, CTA, tag filter); logical tab order, no focus trap.
UX-DR11: Touch targets: minimum ~44px height or padding for primary CTA and tag filter on touch devices; adequate spacing between tappable elements.
UX-DR12: Empty state for tag filter: when filter has no results, show short message (e.g. "No episodes with this tag") and way to clear filter (e.g. "All" or "Show all").
UX-DR13: Links to Spotify: clear label "Listen on Spotify" (or locale); open in same tab (for mobile app open) or new tab consistently; use rel="noopener" if target="_blank".
UX-DR14: Semantic structure: `<header>`, `<nav>`, `<main>`, headings, list markup for episodes; one primary link per episode; image alt (e.g. episode title); tag filter selection state exposed to screen readers.

### FR Coverage Map

FR1: Epic 2 - Creator add episode (incl. tags)
FR2: Epic 2 - Creator update episode (incl. tags)
FR3: Epic 2 - Visitor see list (optionally filtered)
FR4: Epic 2 - Visitor see title, description, cover, tags per episode
FR5: Epic 2 - Visitor one-click to Spotify
FR6: Epic 3 - Creator edit about content
FR7: Epic 3 - Visitor read about content
FR8: Epic 1 - Creator publish content changes
FR9: Epic 1 - Content as structured data/files
FR10: Epic 4 - Discoverable via search
FR11: Epic 4 - Basic metadata for SEO/previews
FR12: Epic 4 - Stable URLs (home, about)
FR13: Epic 4 - Evidence of reach/discoverability
FR14: Epic 5 - Responsive (mobile + desktop)
FR15: Epic 5 - Clear hierarchy and structure
FR16: Epic 5 - Links indicated and operable
FR17: Epic 1 - Content via repo, no admin UI
FR18: Epic 2 - Visitor filter by tag

## Epic List

### Epic 1: Project foundation and deploy
Creator (and developers) can run the project locally, add content as files, and publish to the web via push → build → deploy.
**FRs covered:** FR8, FR9, FR17

### Epic 2: Homepage and episode experience
Visitor can land on the site, see what Storie Viola is (hero), see the episode list with cover, title, description, and tags, filter by tag, and open an episode on Spotify in one tap. Creator can add and update episodes (including tags) as content files.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR18

### Epic 3: About and trust
Visitor can read who is behind the podcast and how the stories are made. Creator can edit that content via the repo.
**FRs covered:** FR6, FR7

### Epic 4: Discoverability and analytics
Site can be found via search for relevant queries; key pages have stable URLs and basic meta; product owner can see evidence of reach and discoverability (e.g. lightweight analytics).
**FRs covered:** FR10, FR11, FR12, FR13

### Epic 5: Quality, accessibility and performance
Site is responsive, readable, and usable on mobile and desktop; links and controls are keyboard- and pointer-friendly and meet WCAG 2.1 AA; homepage loads quickly and the episode list stays usable with many episodes; tests guard behaviour and a11y.
**FRs covered:** FR14, FR15, FR16

---

## Epic 1: Project foundation and deploy

Creator (and developers) can run the project locally, add content as files, and publish to the web via push → build → deploy. **FRs covered:** FR8, FR9, FR17.

### Story 1.1: Initialise Astro project with minimal template and Tailwind

As a **creator/developer**,
I want **a runnable Astro project with Tailwind**,
So that **I can build the site locally and add content and components**.

**Acceptance Criteria:**

**Given** a new or existing repo at project root,
**When** I run `npm create astro@latest . -- --template minimal --install --no-git` and then `npx astro add tailwind`,
**Then** the project builds with `npm run build`, runs with `npm run dev`, and Tailwind is configured (e.g. `tailwind.config.mjs`).
**And** the project structure includes `src/pages/`, `src/layouts/`, `src/components/`, `public/` and no unnecessary blog/theme assumptions.

### Story 1.2: Define Content Collections schema for episodes and about

As a **creator**,
I want **episode and about content defined as validated collections**,
So that **I can add episodes and about text as files and the build fails if required fields are missing**.

**Acceptance Criteria:**

**Given** the Astro project from 1.1,
**When** I add `src/content/config.ts` with schema for episodes (title, description, cover, spotifyUrl, tags) and for about content,
**And** create `src/content/episodes/` and `src/content/about.md` (or `about/index.md`),
**Then** `npm run build` validates frontmatter; build fails if a required episode field is missing or invalid.
**And** episode fields use camelCase; collection folder names are lowercase plural per Architecture.
**And** README or CONTENT.md documents how to add an episode file and edit about content (FR1, FR2, FR6).

### Story 1.3: Configure GitHub Actions and GitHub Pages deployment

As a **creator**,
I want **the site to deploy to GitHub Pages on push**,
So that **content changes go live without manual deploy steps**.

**Acceptance Criteria:**

**Given** the Astro project and content schema from 1.1–1.2,
**When** I add a GitHub Actions workflow (e.g. `.github/workflows/deploy.yml`) using `withastro/action`,
**And** set `site` and `base` in `astro.config.mjs` for the target URL (e.g. storieviola.it or github.io),
**Then** pushing to the configured branch triggers build and publish to GitHub Pages.
**And** the live site is reachable at the configured URL (NFR-R1).

---

## Epic 2: Homepage and episode experience

Visitor can land on the site, see what Storie Viola is (hero), see the episode list with cover, title, description, and tags, filter by tag, and open an episode on Spotify in one tap. Creator can add and update episodes (including tags) as content files. **FRs covered:** FR1, FR2, FR3, FR4, FR5, FR18.

### Story 2.1: Base layout and Header component

As a **visitor**,
I want **a consistent layout and header on every page**,
So that **I can recognise the site and reach the homepage or About**.

**Acceptance Criteria:**

**Given** the Astro project and content from Epic 1,
**When** I open any page,
**Then** a BaseLayout wraps content and includes a Header with site identity (link to home) and a link to About.
**And** the header uses semantic `<header>` and `<nav>`; links have visible focus styles (UX-DR2).

### Story 2.2: Compact Hero component

As a **visitor**,
I want **to see what the podcast is as soon as I land**,
So that **I understand "what this is" and "who it's for" without scrolling a full-screen hero**.

**Acceptance Criteria:**

**Given** the homepage,
**When** the page loads,
**Then** a compact Hero shows image, title, and 1–2 sentences; desktop uses a horizontal bar layout, mobile uses stacked centred layout (Direction B/C per UX).
**And** the hero and the start of the episode list (or list area) are visible in the first viewport — no hero-only first screen (UX-DR3, UX-DR8).
**And** the hero uses a semantic heading (e.g. `<h1>`) and image has alt text; any CTA link has visible focus.

### Story 2.3: Episode list and Episode card/row component

As a **visitor**,
I want **to see all episodes with cover, title, description, tags and one "Listen on Spotify" link per episode**,
So that **I can choose an episode and open it on Spotify in one tap**.

**Acceptance Criteria:**

**Given** at least one episode in the episodes content collection,
**When** I open the homepage,
**Then** the page shows an episode list; each episode shows cover, title, short description, tags, and exactly one primary "Listen on Spotify" link (UX-DR4, UX-DR9, UX-DR13).
**And** the list layout is responsive: card grid at or above 768px, single-column list below (UX-DR7).
**And** the Spotify link opens the correct episode (or podcast) URL; link is clearly labelled and has visible focus and at least ~44px touch target (UX-DR11, UX-DR14).
**And** structure is semantic (e.g. list markup, one primary link per episode, image alt e.g. episode title). FR3, FR4, FR5.

### Story 2.4: Tag filter component and client-side filtering

As a **visitor**,
I want **to filter the episode list by tag (e.g. All, Featured, or topic tags)**,
So that **I can quickly find episodes that match what I want**.

**Acceptance Criteria:**

**Given** episodes have a `tags` array and the homepage shows the episode list,
**When** I am on the homepage,
**Then** a tag filter shows "All" (or "Featured") and one option per unique tag; one selection is active at a time (UX-DR5).
**And** selecting a tag filters the list to episodes that have that tag; selecting "All" shows all episodes. FR18.
**And** the filter uses buttons or links with selection state exposed to assistive tech (e.g. aria-pressed); keyboard navigable with visible focus.
**And** when the selected tag has no matching episodes, an empty state shows a short message (e.g. "No episodes with this tag") and a way to clear the filter (e.g. "All") (UX-DR12).

---

## Epic 3: About and trust

Visitor can read who is behind the podcast and how the stories are made. Creator can edit that content via the repo. **FRs covered:** FR6, FR7.

### Story 3.1: About page and About content block

As a **visitor**,
I want **to read the project's origin and how the stories are made**,
So that **I can trust who is behind the podcast and for whom it's made**.

**Acceptance Criteria:**

**Given** about content exists in the content collection (e.g. `src/content/about.md`),
**When** I navigate to the about page (e.g. /about),
**Then** the page displays the origin and "how it's made" content in a single column with max-width for readability (UX-DR6).
**And** the page uses the same Header as the rest of the site; structure is semantic (headings, paragraphs). FR6, FR7.

---

## Epic 4: Discoverability and analytics

Site can be found via search for relevant queries; key pages have stable URLs and basic meta; product owner can see evidence of reach and discoverability. **FRs covered:** FR10, FR11, FR12, FR13.

### Story 4.1: SEO meta tags and stable URLs

As a **visitor or search engine**,
I want **the site to have basic meta and stable URLs**,
So that **the site can be discovered for relevant queries and shared with correct previews**.

**Acceptance Criteria:**

**Given** the site has a homepage and about page,
**When** a crawler or user visits the site,
**Then** each key page has appropriate meta (title, description) for SEO and link previews (FR11).
**And** homepage and about have stable, shareable URLs (e.g. / and /about) (FR12).
**And** pages use semantic structure (headings, links) to support discoverability (FR10).

### Story 4.2: Lightweight analytics (optional)

As a **product owner**,
I want **minimal, privacy-aware analytics**,
So that **I can see evidence that the site is reachable and discoverable**.

**Acceptance Criteria:**

**Given** the product owner wants reach/discoverability evidence,
**When** analytics is configured (e.g. minimal script or server-side logs),
**Then** the integration is privacy-aware and minimal; no sensitive or personal data is collected beyond what is required (NFR-SEC1). FR13.
**And** configuration is optional so the site works without it.

---

## Epic 5: Quality, accessibility and performance

Site is responsive, readable, and usable on mobile and desktop; links and controls are keyboard- and pointer-friendly and meet WCAG 2.1 AA; homepage loads quickly and the episode list stays usable with many episodes; tests guard behaviour and a11y. **FRs covered:** FR14, FR15, FR16.

### Story 5.1: Design tokens and responsive behaviour

As a **visitor**,
I want **consistent typography, color and spacing and a layout that works on my device**,
So that **the site feels clear and works on mobile and desktop**.

**Acceptance Criteria:**

**Given** the UX design foundation (color, typography, spacing),
**When** the site is implemented,
**Then** design tokens are defined (e.g. via Tailwind config or CSS variables) for background, text, primary CTA accent, type scale, and spacing scale (UX-DR1).
**And** the layout is responsive: breakpoint at 768px; mobile-first; hero and at least 1–2 episodes visible on first load on typical mobile and desktop viewports (FR14, UX-DR7, UX-DR8).

### Story 5.2: Accessibility (WCAG 2.1 AA)

As a **visitor using keyboard or assistive tech**,
I want **all interactive elements to be focusable, visible and correctly announced**,
So that **I can navigate and open episodes without mouse-only interaction**.

**Acceptance Criteria:**

**Given** any page with links and the tag filter,
**When** I use keyboard only (Tab, Enter, Space) or a screen reader,
**Then** all interactive elements (header links, "Listen on Spotify", tag filter) are focusable and activatable; focus is visible (e.g. focus ring); tab order is logical and there is no focus trap (UX-DR10, UX-DR14).
**And** text and UI meet WCAG 2.1 AA contrast (4.5:1 normal text, 3:1 large text/UI) (NFR-A1).
**And** primary CTA and tag filter have at least ~44px touch target and adequate spacing (UX-DR11, NFR-A2). FR15, FR16.

### Story 5.3: Automated tests (Vitest and Playwright)

As a **developer/maintainer**,
I want **unit and E2E tests that guard schema, key flows and basic a11y**,
So that **changes don't break the episode list, filter, about page or Listen on Spotify flow**.

**Acceptance Criteria:**

**Given** the codebase after Epics 1–4 (and 5.1–5.2 as applicable),
**When** I run the test suite,
**Then** Vitest runs unit/component tests for content schema and helpers (and optional component tests) in `tests/unit/` or `src/**/*.test.ts`.
**And** Playwright runs E2E tests in `tests/e2e/` covering: homepage loads, tag filter behaviour, about page, "Listen on Spotify" flow, and basic accessibility checks.
**And** tests are mandatory per Architecture; CI can run both suites. NFR-P1, NFR-P2, NFR-S1 supported by tests and implementation.
