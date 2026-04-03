import { getCollection } from 'astro:content';

/**
 * Dynamic sitemap.xml generation
 * This endpoint automatically includes all visible episodes without manual updates.
 * When you add a new episode, it will automatically appear in the sitemap.
 */
export async function GET() {
  const site = import.meta.env.SITE;
  const staticPages = ['/', '/about', '/licenza'];

  // Fetch all episodes from content collection
  const episodes = await getCollection('episodes');
  
  // Filter out hidden episodes (only include visible ones)
  const visibleEpisodes = episodes.filter((ep) => !ep.data.hidden);

  // Generate XML entries for static pages (homepage, about, license)
  const staticUrls = staticPages.map((path) => ({
    url: path,
    lastmod: new Date().toISOString().split('T')[0],
    priority: path === '/' ? '1.0' : '0.8',
    changefreq: 'weekly',
  }));

  // Generate XML entries for episodes
  // Sorted by publish date (newest first) so recent episodes get higher priority in search
  const episodeUrls = visibleEpisodes
    .sort((a, b) => (b.data.publishDate?.getTime() || 0) - (a.data.publishDate?.getTime() || 0))
    .map((ep) => ({
      url: `/episodes/${ep.data.slug}`,
      // Use episode's publish date as lastmod, fallback to today if not set
      lastmod: ep.data.publishDate 
        ? ep.data.publishDate.toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0],
      priority: '0.8',
      changefreq: 'never', // Episodes don't change once published
    }));

  // Combine static pages and episodes
  const allUrls = [...staticUrls, ...episodeUrls];

  // Generate XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${new URL(page.url, site).toString()}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Return XML with appropriate headers
  // Cache for 1 hour, with stale content served up to 1 day if regeneration fails
  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
