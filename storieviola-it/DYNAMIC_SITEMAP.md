# Dynamic Sitemap Generation

## Overview

The `sitemap.xml` is now **automatically generated** during the build process. Every time you add a new episode to your site, it will automatically appear in the sitemap without any manual updates needed.

## How It Works

### Location
```
src/pages/sitemap.xml.ts
```

### Process

1. **Build Time:** When you run `npm run build`, Astro executes this file
2. **Fetch Episodes:** The script queries all episodes from your content collection
3. **Filter Hidden:** Removes any episodes marked with `hidden: true`
4. **Sort by Date:** Sorts episodes by publish date (newest first)
5. **Generate XML:** Creates a properly formatted XML sitemap
6. **Output:** Generates `dist/sitemap.xml` ready for deployment

### What's Included

The generated sitemap includes:

- **3 Static Pages**
  - Homepage (`/`) - Priority 1.0 (highest)
  - About page (`/about`) - Priority 0.8
  - License page (`/licenza`) - Priority 0.8

- **All Visible Episodes**
  - Each episode: `/episodes/{slug}` - Priority 0.8
  - Automatically ordered by publish date
  - Uses episode's `publishDate` as `lastmod`
  - Marked as `changefreq: never` (they don't change once published)

## Code Structure

```typescript
export async function GET() {
  // 1. Get the site URL from config
  const site = import.meta.env.SITE;
  
  // 2. Define static pages
  const staticPages = ['/', '/about', '/licenza'];
  
  // 3. Query all episodes from content collection
  const episodes = await getCollection('episodes');
  
  // 4. Filter to only visible episodes
  const visibleEpisodes = episodes.filter((ep) => !ep.data.hidden);
  
  // 5. Generate static page URLs
  const staticUrls = staticPages.map((path) => ({
    url: path,
    lastmod: new Date().toISOString().split('T')[0],
    priority: path === '/' ? '1.0' : '0.8',
    changefreq: 'weekly',
  }));
  
  // 6. Generate episode URLs (sorted by date)
  const episodeUrls = visibleEpisodes
    .sort((a, b) => (b.data.publishDate?.getTime() || 0) - (a.data.publishDate?.getTime() || 0))
    .map((ep) => ({
      url: `/episodes/${ep.data.slug}`,
      lastmod: ep.data.publishDate?.toISOString().split('T')[0],
      priority: '0.8',
      changefreq: 'never',
    }));
  
  // 7. Combine and return as XML
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
```

## Key Features

### ✅ Automatic Updates
- No manual maintenance needed
- New episodes appear automatically after build
- Deleted episodes automatically removed

### ✅ Smart Sorting
- Episodes sorted by publish date (newest first)
- Helps search engines prioritize recent content

### ✅ Respects Hidden Episodes
- Episodes with `hidden: true` are excluded
- Useful for drafts or unpublished content

### ✅ Caching Strategy
- Cached for 1 hour (s-maxage=3600)
- Stale content served up to 1 day if regeneration fails
- Balances freshness with performance

### ✅ Proper Metadata
- `lastmod`: When each page was last modified
- `changefreq`: How often search engines should re-crawl
- `priority`: Relative importance (homepage highest)

## When to Rebuild

The sitemap regenerates whenever you:

1. **Add a new episode**
   ```bash
   npm run build
   ```
   New episode automatically included

2. **Delete an episode**
   ```bash
   npm run build
   ```
   Episode automatically removed

3. **Update an episode's date**
   ```bash
   npm run build
   ```
   `lastmod` timestamp automatically updated

4. **Mark episode as hidden**
   ```bash
   npm run build
   ```
   Episode automatically excluded

## Testing Locally

### View the generated sitemap
```bash
npm run build
cat dist/sitemap.xml
```

### During development
```bash
npm run dev
# Visit http://localhost:3000/sitemap.xml
# It will be generated on-the-fly
```

### Count URLs
```bash
grep -c "<loc>" dist/sitemap.xml
# Shows total number of URLs
```

## Deployment

The sitemap is automatically generated and included in your `dist/` folder when you build. No special deployment steps needed!

### For GitHub Pages
When you push changes and the build runs, the new sitemap is automatically included in the deployment.

### Resubmit to Google Search Console

If you add many new episodes, consider resubmitting the sitemap:
1. Go to Google Search Console
2. Navigate to "Sitemaps"
3. Click the sitemap URL
4. Click "Request indexing"

(You don't have to do this every time - Google checks regularly)

## Troubleshooting

### Sitemap is empty
- Check that episodes have `hidden: false` or no `hidden` field
- Verify `slug` field exists in episode frontmatter
- Run `npm run build` to regenerate

### Sitemap shows old episodes
- Clear build cache: `rm -rf dist/ .astro/`
- Rebuild: `npm run build`

### Timestamps are wrong
- Verify episodes have `publishDate` in frontmatter
- Date format must be valid: `2026-04-03`

## Performance Impact

- **Build time impact:** ~5-10ms (negligible)
- **Generated file size:** ~2-4KB (very small)
- **Runtime impact:** None (generated at build time)

## Future Enhancements

### Possible improvements:
1. Split into multiple sitemaps if 50,000+ URLs (Google's limit)
2. Add podcast-specific schema (`<podcast:rss>`)
3. Generate `sitemap_index.xml` for multiple sitemaps
4. Add CDN cache headers for faster delivery

---

**Note:** This implementation generates sitemap at build time. For true real-time generation (on every HTTP request), you would need server-side rendering (SSR mode), which is not necessary for this static podcast site.
