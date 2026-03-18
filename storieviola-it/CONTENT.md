# Content guide — storieviola.it

How to add episodes and edit about content (FR1, FR2, FR6). All content is file-based; the build validates frontmatter and fails if required fields are missing.

## Adding an episode

1. **Create a new file** in `src/content/episodes/` (e.g. `episode-01.md`, `la-volpe-e-luva.md`). Use `.md` or `.mdx`.
2. **Use camelCase for all frontmatter fields.** Required frontmatter:

   | Field        | Type     | Required | Description                                      |
   | ------------ | -------- | -------- | ------------------------------------------------ |
   | `title`      | string   | Yes      | Episode title                                    |
   | `description`| string   | Yes      | Short description                                |
   | `cover`      | string   | Yes      | Image path (e.g. `/episodes/cover.jpg`) or URL   |
   | `spotifyUrl` | string   | Yes      | Full Spotify episode or show URL                 |
   | `tags`       | string[] | Yes      | Array of tags, e.g. `['featured', 'avventura']`   |

3. **Example**

   ```yaml
   ---
   title: La volpe e l'uva
   description: Una volpe e un grappolo troppo alto.
   cover: /episodes/volpe-uva.jpg
   spotifyUrl: https://open.spotify.com/episode/xxxxx
   tags:
     - featured
     - favole
   ---
   Optional markdown body (e.g. transcript or notes).
   ```

4. **Run `npm run build`** from the app root (`storieviola-it/`). If a required field is missing or invalid, the build fails with a clear schema error.

**Cover images:** Put files in `public/episodes/` and reference as `/episodes/filename.jpg`, or use a full URL in `cover`.

## Updating an episode

Edit the same file in `src/content/episodes/`: change `title`, `description`, `cover`, `spotifyUrl`, or `tags` as needed. Keep all required fields and camelCase. Build to validate.

## Editing about content

- **File:** `src/content/about/index.md`
- **Frontmatter:** Optional (can be empty `---` or omitted).
- **Body:** Markdown. This is the “Chi siamo” / About page content (origin, how stories are made). Edit the markdown and run `npm run build` to verify.

## Validation

- `npm run build` validates all episode frontmatter. Missing or invalid required fields cause the build to fail with an error pointing to the file and field.
- Do not remove required fields or use different field names (e.g. snake_case); the schema expects camelCase only.
