# Content guide — storieviola.it

How to add episodes and edit about content (FR1, FR2, FR6). All content is file-based; the build validates frontmatter and fails if required fields are missing.

## Adding an episode

1. **Create a new file** in `src/content/episodes/` (e.g. `episode-01.md`, `la-volpe-e-luva.md`). Use `.md` or `.mdx`.
2. **Use camelCase for all frontmatter fields.** Required frontmatter:

   | Field           | Type     | Required | Description                                      |
   | --------------- | -------- | -------- | ------------------------------------------------ |
   | `title`         | string   | Yes      | Episode title                                    |
   | `description`   | string   | Yes      | Short description                                |
   | `cover`         | string   | Yes      | Image path (e.g. `/episodes/cover.jpg`) or URL   |
   | `spotifyUrl`    | string   | Yes      | Full Spotify **episode** URL for this episode   |
   | `publishDate`   | date     | Yes      | Publication date (ISO or YAML date); used for sort |
   | `tags`          | string[] | Yes      | Array of tags; `featured` sorts first on homepage |

   **Tag values and filtering (homepage):** Each episode row/card exposes a `data-tags` attribute on the list item with **comma-separated** tag names for client-side filtering (Story 2.4). **Do not use commas inside a single tag string** in MVP (e.g. use `favole-popolari` instead of `favole, popolari`).

3. **Example**

   ```yaml
   ---
   title: La volpe e l'uva
   description: Una volpe e un grappolo troppo alto.
   cover: /episodes/volpe-uva.jpg
   spotifyUrl: https://open.spotify.com/episode/xxxxx
   publishDate: 2026-03-01
   tags:
     - featured
     - favole
   ---
   Optional markdown body (e.g. transcript or notes).
   ```

4. **Run `npm run build`** from the app root (`storieviola-it/`). If a required field is missing or invalid, the build fails with a clear schema error.

**Cover images:** Put files in `public/episodes/` and reference as `/episodes/filename.jpg`, or use a full URL in `cover`.

## Homepage hero image

- **File:** `public/images/hero.svg` (or replace with `hero.webp` / `hero.jpg` if you prefer a photo).
- **Usage:** The homepage `Hero` uses this asset for the compact bar next to the title. Swap the file and keep the path, or change `imageSrc` in `src/pages/index.astro` if you use another name.
- **Alt text:** Update the `imageAlt` prop in `index.astro` if you change the visual so screen readers stay accurate.

## Spotify show URL (hero CTA)

The **“Ascolta su Spotify”** button on the homepage points to the **podcast show**, not a single episode.

- **Default:** `src/lib/site.ts` uses the [Storie Viola show on Spotify](https://open.spotify.com/show/6Ny4Eh3xfB2sKR82J99cZQ?si=61907bca4a6b4c3f) when the env var is not set.
- **Override:** set **`PUBLIC_SPOTIFY_SHOW_URL`** in `.env` (local) or in your host’s environment variables if the show link changes.

## Episode order on the homepage

The full episode list uses: **tag `featured` first** (case-insensitive), then **`publishDate` descending** (newest first). Ties use the file id. Each episode is shown with cover, title, short description, tags, and one **“Ascolta su Spotify”** link to that episode’s `spotifyUrl`.

## Listing with no episodes

If there are no episode files, the homepage shows a short empty state under “Episodi” instead of an empty list.

## Updating an episode

Edit the same file in `src/content/episodes/`: change `title`, `description`, `cover`, `spotifyUrl`, `publishDate`, or `tags` as needed. Keep all required fields and camelCase. Build to validate.

## Editing about content

- **File:** `src/content/about/index.md`
- **Frontmatter:** Optional (can be empty `---` or omitted).
- **Body:** Markdown. This is the “Chi siamo” / About page content (origin, how stories are made). Edit the markdown and run `npm run build` to verify.

## Validation

- `npm run build` validates all episode frontmatter. Missing or invalid required fields cause the build to fail with an error pointing to the file and field.
- Do not remove required fields or use different field names (e.g. snake_case); the schema expects camelCase only.
