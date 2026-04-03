import type { CollectionEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';

/**
 * Mock implementation of the GET function from src/pages/sitemap.xml.ts
 * This allows us to test the logic without Astro's full build context
 */
async function sitemapGET(episodes: CollectionEntry<'episodes'>[], site: string) {
  const staticPages = ['/', '/about', '/licenza'];

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
      lastmod:
        ep.data.publishDate && !isNaN(ep.data.publishDate.getTime())
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

  return xml;
}

/**
 * Helper function to create mock episode entries for testing
 */
function fakeEpisode(
  id: string,
  data: {
    title: string;
    description: string;
    slug: string;
    cover: string;
    spotifyUrl: string;
    publishDate: Date;
    tags: string[];
    hidden?: boolean;
  },
): CollectionEntry<'episodes'> {
  return {
    id,
    collection: 'episodes',
    data,
    body: '',
  } as CollectionEntry<'episodes'>;
}

describe('Sitemap Generation (sitemap.xml.ts)', () => {
  const testSite = 'https://storieviola.it';

  describe('Basic Structure', () => {
    it('generates valid XML with correct declaration and namespace', async () => {
      const xml = await sitemapGET([], testSite);

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(xml).toContain('</urlset>');
    });

    it('includes all required URL fields', async () => {
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode',
        description: 'Test',
        slug: 'test-episode',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/123',
        publishDate: new Date('2026-04-03'),
        tags: [],
      });

      const xml = await sitemapGET([episode], testSite);

      expect(xml).toContain('<url>');
      expect(xml).toContain('</url>');
      expect(xml).toContain('<loc>');
      expect(xml).toContain('</loc>');
      expect(xml).toContain('<lastmod>');
      expect(xml).toContain('</lastmod>');
      expect(xml).toContain('<changefreq>');
      expect(xml).toContain('</changefreq>');
      expect(xml).toContain('<priority>');
      expect(xml).toContain('</priority>');
    });

    it('properly closes all XML tags', async () => {
      const xml = await sitemapGET([], testSite);

      // Count opening and closing tags
      const urlOpenCount = (xml.match(/<url>/g) || []).length;
      const urlCloseCount = (xml.match(/<\/url>/g) || []).length;
      expect(urlOpenCount).toBe(urlCloseCount);

      const locOpenCount = (xml.match(/<loc>/g) || []).length;
      const locCloseCount = (xml.match(/<\/loc>/g) || []).length;
      expect(locOpenCount).toBe(locCloseCount);
    });
  });

  describe('Static Pages', () => {
    it('includes all three static pages', async () => {
      const xml = await sitemapGET([], testSite);

      expect(xml).toContain('https://storieviola.it/');
      expect(xml).toContain('https://storieviola.it/about');
      expect(xml).toContain('https://storieviola.it/licenza');
    });

    it('sets homepage priority to 1.0', async () => {
      const xml = await sitemapGET([], testSite);

      // Find the home URL entry
      const homeMatch = xml.match(
        /<url>\s*<loc>https:\/\/storieviola\.it\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/,
      );
      expect(homeMatch?.[1]).toBe('1.0');
    });

    it('sets other static pages priority to 0.8', async () => {
      const xml = await sitemapGET([], testSite);

      // Check about page
      const aboutMatch = xml.match(
        /<url>\s*<loc>https:\/\/storieviola\.it\/about<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/,
      );
      expect(aboutMatch?.[1]).toBe('0.8');

      // Check license page
      const licenseMatch = xml.match(
        /<url>\s*<loc>https:\/\/storieviola\.it\/licenza<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/,
      );
      expect(licenseMatch?.[1]).toBe('0.8');
    });

    it('sets static pages changefreq to weekly', async () => {
      const xml = await sitemapGET([], testSite);

      // Find all changefreq values for static pages
      const homeMatch = xml.match(
        /<url>\s*<loc>https:\/\/storieviola\.it\/<\/loc>[\s\S]*?<changefreq>(\w+)<\/changefreq>/,
      );
      expect(homeMatch?.[1]).toBe('weekly');
    });
  });

  describe('Episode Pages', () => {
    it('includes all visible episodes', async () => {
      const episodes = [
        fakeEpisode('ep1', {
          title: 'Episode 1',
          description: 'Test',
          slug: 'episode-1',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/1',
          publishDate: new Date('2026-01-01'),
          tags: [],
        }),
        fakeEpisode('ep2', {
          title: 'Episode 2',
          description: 'Test',
          slug: 'episode-2',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/2',
          publishDate: new Date('2026-02-01'),
          tags: [],
        }),
      ];

      const xml = await sitemapGET(episodes, testSite);

      expect(xml).toContain('https://storieviola.it/episodes/episode-1');
      expect(xml).toContain('https://storieviola.it/episodes/episode-2');
    });

    it('excludes hidden episodes', async () => {
      const episodes = [
        fakeEpisode('ep1', {
          title: 'Visible Episode',
          description: 'Test',
          slug: 'visible-episode',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/1',
          publishDate: new Date('2026-01-01'),
          tags: [],
        }),
        fakeEpisode('ep2', {
          title: 'Hidden Episode',
          description: 'Test',
          slug: 'hidden-episode',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/2',
          publishDate: new Date('2026-02-01'),
          tags: [],
          hidden: true,
        }),
      ];

      const xml = await sitemapGET(episodes, testSite);

      expect(xml).toContain('visible-episode');
      expect(xml).not.toContain('hidden-episode');
    });

    it('sets episode priority to 0.8', async () => {
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode',
        description: 'Test',
        slug: 'test-episode',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/1',
        publishDate: new Date('2026-01-01'),
        tags: [],
      });

      const xml = await sitemapGET([episode], testSite);

      const match = xml.match(
        /<loc>https:\/\/storieviola\.it\/episodes\/test-episode<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/,
      );
      expect(match?.[1]).toBe('0.8');
    });

    it('sets episode changefreq to never', async () => {
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode',
        description: 'Test',
        slug: 'test-episode',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/1',
        publishDate: new Date('2026-01-01'),
        tags: [],
      });

      const xml = await sitemapGET([episode], testSite);

      const match = xml.match(
        /<loc>https:\/\/storieviola\.it\/episodes\/test-episode<\/loc>[\s\S]*?<changefreq>(\w+)<\/changefreq>/,
      );
      expect(match?.[1]).toBe('never');
    });

    it('uses episode publishDate as lastmod', async () => {
      const publishDate = new Date('2026-03-15');
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode',
        description: 'Test',
        slug: 'test-episode',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/1',
        publishDate,
        tags: [],
      });

      const xml = await sitemapGET([episode], testSite);

      // Check that the date is in the sitemap
      expect(xml).toContain('2026-03-15');
    });

    it('sorts episodes by publishDate descending (newest first)', async () => {
      const episodes = [
        fakeEpisode('ep1', {
          title: 'Old Episode',
          description: 'Test',
          slug: 'old-episode',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/1',
          publishDate: new Date('2026-01-01'),
          tags: [],
        }),
        fakeEpisode('ep2', {
          title: 'New Episode',
          description: 'Test',
          slug: 'new-episode',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/2',
          publishDate: new Date('2026-03-01'),
          tags: [],
        }),
        fakeEpisode('ep3', {
          title: 'Medium Episode',
          description: 'Test',
          slug: 'medium-episode',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/3',
          publishDate: new Date('2026-02-01'),
          tags: [],
        }),
      ];

      const xml = await sitemapGET(episodes, testSite);

      // Extract episode URLs in order from the XML
      const episodeMatches = xml.match(/\/episodes\/[\w-]+/g) || [];

      expect(episodeMatches.length).toBeGreaterThanOrEqual(3);
      expect(episodeMatches[0]).toContain('new-episode');
      expect(episodeMatches[1]).toContain('medium-episode');
      expect(episodeMatches[2]).toContain('old-episode');
    });
  });

  describe('URL Formatting', () => {
    it('correctly formats URLs with domain', async () => {
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode',
        description: 'Test',
        slug: 'test-episode',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/1',
        publishDate: new Date('2026-01-01'),
        tags: [],
      });

      const xml = await sitemapGET([episode], testSite);

      expect(xml).toContain('https://storieviola.it/episodes/test-episode');
    });

    it('handles episode slugs with special characters', async () => {
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode with Dashes',
        description: 'Test',
        slug: 'episode-with-italian-characters-è-à',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/1',
        publishDate: new Date('2026-01-01'),
        tags: [],
      });

      const xml = await sitemapGET([episode], testSite);

      // URLs with special characters get percent-encoded in URLs
      // so we check that the episode is included (it will be URL-encoded)
      expect(xml).toContain('/episodes/');
      expect(xml).toMatch(/\/episodes\/episode-with-italian-characters/);
    });

    it('includes all static pages in correct order', async () => {
      const xml = await sitemapGET([], testSite);

      const homePos = xml.indexOf('https://storieviola.it/');
      const aboutPos = xml.indexOf('https://storieviola.it/about');
      const licensePos = xml.indexOf('https://storieviola.it/licenza');

      expect(homePos).toBeLessThan(aboutPos);
      expect(aboutPos).toBeLessThan(licensePos);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty episode list', async () => {
      const xml = await sitemapGET([], testSite);

      // Should still have the 3 static pages
      expect(xml).toContain('https://storieviola.it/');
      expect(xml).toContain('https://storieviola.it/about');
      expect(xml).toContain('https://storieviola.it/licenza');

      // Count total URLs
      const urlCount = (xml.match(/<url>/g) || []).length;
      expect(urlCount).toBe(3);
    });

    it('handles episodes without publishDate', async () => {
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode',
        description: 'Test',
        slug: 'test-episode',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/1',
        publishDate: new Date(NaN), // Invalid date
        tags: [],
      });

      // Should not throw - it should fallback to today's date
      const xml = await sitemapGET([episode], testSite);
      expect(xml).toContain('<url>');
      expect(xml).toContain('test-episode');
    });

    it('handles mixed hidden and visible episodes', async () => {
      const episodes = [
        fakeEpisode('ep1', {
          title: 'Visible 1',
          description: 'Test',
          slug: 'visible-1',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/1',
          publishDate: new Date('2026-01-01'),
          tags: [],
        }),
        fakeEpisode('ep2', {
          title: 'Hidden 1',
          description: 'Test',
          slug: 'hidden-1',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/2',
          publishDate: new Date('2026-02-01'),
          tags: [],
          hidden: true,
        }),
        fakeEpisode('ep3', {
          title: 'Visible 2',
          description: 'Test',
          slug: 'visible-2',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/3',
          publishDate: new Date('2026-03-01'),
          tags: [],
        }),
        fakeEpisode('ep4', {
          title: 'Hidden 2',
          description: 'Test',
          slug: 'hidden-2',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/4',
          publishDate: new Date('2026-04-01'),
          tags: [],
          hidden: true,
        }),
      ];

      const xml = await sitemapGET(episodes, testSite);

      // Visible episodes should be included
      expect(xml).toContain('visible-1');
      expect(xml).toContain('visible-2');

      // Hidden episodes should not be included
      expect(xml).not.toContain('hidden-1');
      expect(xml).not.toContain('hidden-2');

      // Count: 3 static pages + 2 visible episodes = 5
      const urlCount = (xml.match(/<url>/g) || []).length;
      expect(urlCount).toBe(5);
    });

    it('handles large number of episodes', async () => {
      const episodes = Array.from({ length: 100 }, (_, i) =>
        fakeEpisode(`ep${i}`, {
          title: `Episode ${i}`,
          description: 'Test',
          slug: `episode-${i}`,
          cover: '/test.jpg',
          spotifyUrl: `https://open.spotify.com/episode/${i}`,
          publishDate: new Date(`2026-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`),
          tags: [],
        }),
      );

      const xml = await sitemapGET(episodes, testSite);

      // Should have all episodes
      const urlCount = (xml.match(/<url>/g) || []).length;
      expect(urlCount).toBe(103); // 3 static + 100 episodes
    });
  });

  describe('Date Handling', () => {
    it('formats dates in ISO 8601 YYYY-MM-DD format', async () => {
      const episode = fakeEpisode('ep1', {
        title: 'Test Episode',
        description: 'Test',
        slug: 'test-episode',
        cover: '/test.jpg',
        spotifyUrl: 'https://open.spotify.com/episode/1',
        publishDate: new Date('2026-03-15'),
        tags: [],
      });

      const xml = await sitemapGET([episode], testSite);

      // Check that date is in correct format
      expect(xml).toMatch(/\d{4}-\d{2}-\d{2}/);
      expect(xml).toContain('2026-03-15');
    });

    it('uses consistent date for static pages (today)', async () => {
      const xml = await sitemapGET([], testSite);

      // Extract all lastmod dates for static pages
      const matches = xml.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g);
      expect(matches).toBeDefined();

      // All static page dates should be the same (today)
      if (matches) {
        const firstDate = matches[0];
        expect(matches[1]).toBe(firstDate); // About page
        expect(matches[2]).toBe(firstDate); // License page
      }
    });
  });

  describe('Integration Scenarios', () => {
    it('generates valid sitemap with realistic episode data', async () => {
      const episodes = [
        fakeEpisode('ep1', {
          title: 'Il Pupazzo di Neve',
          description: 'Una bellissima storia di neve',
          slug: 'il-pupazzo-di-neve',
          cover: '/episodes/snow.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/123abc',
          publishDate: new Date('2026-03-22'),
          tags: ['inverno', 'bambini'],
        }),
        fakeEpisode('ep2', {
          title: 'Gigino e i Topi',
          description: 'Un gatto e i topi',
          slug: 'gigino-e-i-topi',
          cover: '/episodes/cat.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/456def',
          publishDate: new Date('2026-04-03'),
          tags: ['animali', 'avventura'],
        }),
      ];

      const xml = await sitemapGET(episodes, testSite);

      // Verify it's valid XML structure
      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

      // Verify all expected URLs
      expect(xml).toContain('https://storieviola.it/');
      expect(xml).toContain('https://storieviola.it/about');
      expect(xml).toContain('https://storieviola.it/licenza');
      expect(xml).toContain('https://storieviola.it/episodes/il-pupazzo-di-neve');
      expect(xml).toContain('https://storieviola.it/episodes/gigino-e-i-topi');

      // Verify episode ordering (newest first)
      const indexOfFirst = xml.indexOf('gigino-e-i-topi');
      const indexOfSecond = xml.indexOf('il-pupazzo-di-neve');
      expect(indexOfFirst).toBeLessThan(indexOfSecond);
    });

    it('generates valid XML that can be parsed', async () => {
      const episodes = [
        fakeEpisode('ep1', {
          title: 'Test',
          description: 'Test',
          slug: 'test-1',
          cover: '/test.jpg',
          spotifyUrl: 'https://open.spotify.com/episode/1',
          publishDate: new Date('2026-01-01'),
          tags: [],
        }),
      ];

      const xml = await sitemapGET(episodes, testSite);

      // Create a JSDOM instance to parse XML
      const { window } = new JSDOM(xml, { contentType: 'text/xml' });
      const { DOMParser: JSDOMParser } = window;

      // This will throw if XML is malformed
      const parsed = new JSDOMParser().parseFromString(xml, 'text/xml');

      // Verify structure
      const urlset = parsed.documentElement;
      expect(urlset.tagName).toBe('urlset');
      expect(urlset.getAttribute('xmlns')).toBe('http://www.sitemaps.org/schemas/sitemap/0.9');
    });
  });
});
