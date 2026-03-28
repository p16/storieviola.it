# Content guide — storieviola.it

How to add episodes and edit about content (FR1, FR2, FR6). All content is file-based; the build validates frontmatter and fails if required fields are missing.

## Adding an episode

1. **Create a new file** in `src/content/episodes/` (e.g. `episode-01.md`, `la-volpe-e-luva.md`). Use `.md` or `.mdx`.
2. **Use camelCase for all frontmatter fields.** Required frontmatter:

   | Field           | Type     | Required | Description                                      |
   | --------------- | -------- | -------- | ------------------------------------------------ |
   | `title`         | string   | Yes      | Episode title                                    |
   | `slug`          | string   | Yes      | URL segment for `/episodes/[slug]` (non-empty)     |
   | `description`   | string   | Yes      | Short description                                |
   | `cover`         | string   | Yes      | Image path (e.g. `/episodes/cover.jpg`) or URL   |
   | `spotifyUrl`    | string   | No*      | Full Spotify **episode** (or show) URL           |
   | `publishDate`   | date     | Yes      | Publication date (ISO or YAML date); used for sort |
   | `tags`          | string[] | Yes      | Array of tags; `featured` sorts first on homepage |
   | `hidden`        | boolean  | No       | If `true`, episode is omitted from the homepage list (detail URL may still exist) |
   | `featured`      | boolean  | No       | Featured episodes sort first on the homepage      |

   \*Each episode must have **at least one** of: a non-empty `spotifyUrl`, **or** non-empty Markdown **below** the frontmatter (transcript / story text), **or** optional frontmatter `body` (string). The build fails if both Spotify and transcript are missing.

**Tag values and filtering (homepage):** Each episode row/card exposes a `data-tags` attribute on the list item with **comma-separated** tag names for client-side filtering (Story 2.4).

The homepage includes a tag filter UI (`Tutti`, optional `In evidenza`, and one button per unique topic tag). Buttons use `aria-pressed` for selection state and filter the list by hiding/showing episodes whose `data-tags` includes the selected tag. If the selected tag matches zero episodes, the homepage shows a short empty message (while `Tutti` remains available to clear the filter).

**Do not use commas inside a single tag string** in MVP (e.g. use `favole-popolari` instead of `favole, popolari`).

3. **Example (with Spotify and transcript)**

   ```yaml
   ---
   title: La volpe e l'uva
   slug: la-volpe-e-luva
   description: Una volpe e un grappolo troppo alto.
   cover: /episodes/volpe-uva.jpg
   spotifyUrl: https://open.spotify.com/episode/xxxxx
   publishDate: 2026-03-01
   tags:
     - featured
     - favole
   ---
   Testo della storia o trascrizione sotto il frontmatter (consigliato se pubblichi la pagina “Leggi la storia”).
   ```

   **Example (transcript only, no Spotify):** omit `spotifyUrl` and put the full story in Markdown under the closing `---`.

4. **Run `npm run build`** from the app root (`storieviola-it/`). If a required field is missing or invalid, the build fails with a clear schema error.

**Cover images:** Put files in `public/episodes/` and reference as `/episodes/filename.jpg`, or use a full URL in `cover`.

## Homepage hero image

- **File:** `public/images/hero.svg` (or replace with `hero.webp` / `hero.jpg` if you prefer a photo).
- **Usage:** The homepage `Hero` uses this asset for the compact bar next to the title. Swap the file and keep the path, or change `imageSrc` in `src/pages/index.astro` if you use another name.
- **Alt text:** Update the `imageAlt` prop in `index.astro` if you change the visual so screen readers stay accurate.

## Social preview image (Open Graph / Twitter)

- **File:** `public/images/og.png` — **raster** (e.g. 1200×630) used for `og:image` / `twitter:image`. Social platforms generally expect PNG or JPEG, not SVG.
- **Usage:** Default in `BaseLayout.astro`; homepage and about pass `ogImage="/images/og.png"`. Replace the file to change link previews without editing code, or override `ogImage` / `ogImageAlt` per page.

## Favicon and browser icons

- **Source artwork:** `public/brand-logo.png` (full-resolution logo). Regenerate derived assets from it when updating the brand mark.
- **Derived files:** `public/favicon.svg` (raster embedded for broad SVG favicon support), `public/favicon.ico` (16/32/48), `public/favicon-16.png`, `public/favicon-32.png`, `public/apple-touch-icon.png` (180×180 for iOS home screen).
- **Head links:** `BaseLayout.astro` — SVG and PNG sizes first, then `.ico`, then `apple-touch-icon`.

## Spotify show URL (hero CTA)

The **“Ascolta su Spotify”** button on the homepage points to the **podcast show**, not a single episode.

- **Default:** `src/lib/site.ts` uses the [Storie Viola show on Spotify](https://open.spotify.com/show/6Ny4Eh3xfB2sKR82J99cZQ?si=61907bca4a6b4c3f) when the env var is not set.
- **Override:** set **`PUBLIC_SPOTIFY_SHOW_URL`** in `.env` (local) or in your host’s environment variables if the show link changes.

## Episode order on the homepage

The full episode list uses: **tag `featured` first** (case-insensitive), then **`publishDate` descending** (newest first). Ties use the file id. Each episode is shown with cover, title, short description, tags, **“Leggi la storia”** (episode page), and **“Ascolta su Spotify”** only when `spotifyUrl` is set.

## Listing with no episodes

If there are no episode files, the homepage shows a short empty state under “Episodi” instead of an empty list.

## Updating an episode

Edit the same file in `src/content/episodes/`: change `title`, `slug`, `description`, `cover`, `spotifyUrl`, `publishDate`, `tags`, `hidden`, or `featured` as needed. Keep required fields and camelCase. Build to validate.

## Design tokens (Tailwind v4 `@theme`)

Single source of truth: `src/styles/global.css` inside `@theme { ... }`. Tailwind maps `--color-*` names to utilities (e.g. `--color-background` → `bg-background`, `text-foreground`).

| Token prefix (CSS variable) | Typical utilities | Role |
| -------------------------- | ------------------- | ---- |
| `--color-background` | `bg-background` | Page backdrop |
| `--color-foreground` | `text-foreground` | Primary text |
| `--color-muted`, `--color-muted-strong` | `text-muted`, `text-muted-strong` | Secondary / tertiary text |
| `--color-border`, `--color-border-subtle` | `border-border`, … | Dividers, card edges |
| `--color-surface`, `--color-subtle` | `bg-surface`, `bg-subtle` | Cards, chips |
| `--color-code-text` | `text-code-text` | Inline `code` |
| `--color-ring`, `--color-ring-accent` | `ring-ring`, `ring-ring-accent` | Focus-visible rings |
| `--color-brand` … `--color-brand-950` | `bg-brand-700`, `text-brand-800`, … | Violet accent / filters |
| `--color-cta`, `--color-cta-hover` | `bg-cta`, `hover:bg-cta-hover` | Primary green CTA (Spotify, etc.) |
| `--font-size-display`, `--font-size-display-md`, `--font-size-lead` | `text-[length:var(--font-size-display)]`, … | Hero / intro scale |

**Breakpoint:** `md:` is the standard **768px** breakpoint (Tailwind default). Extend tokens only in `global.css` unless you intentionally split themes.

## Editing about content

- **File:** `src/content/about/index.md`
- **Frontmatter:** Optional (can be empty `---` or omitted).
- **Body:** Markdown. This is the “Chi siamo” / About page content (origin, how stories are made). Edit the markdown and run `npm run build` to verify.

## Validation

- `npm run build` validates episode frontmatter and the rule above (Spotify and/or non-empty Markdown body). Missing or invalid required fields cause the build to fail with an error pointing to the file and field.
- `npm run validate:about` runs a production build, then checks that the About markdown and built HTML include the expected Italian section headings (*Origini*, *Come viene realizzato*) and that the empty-state fallback is not present (see `src/lib/validate-about-content.mjs`).
- Do not remove required fields or use different field names (e.g. snake_case); the schema expects camelCase only.
