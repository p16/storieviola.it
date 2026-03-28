/**
 * Wraps the default glob loader so Zod can see whether the Markdown file has a non-empty
 * body after frontmatter (Astro only passes frontmatter into `data` by default).
 */
import { readFile } from 'node:fs/promises';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { glob } from 'astro/loaders';

const baseLoader = glob({
  base: './src/content/episodes',
  pattern: '**/*.{md,mdx}',
});

export const episodesLoader = {
  name: 'episodes-glob-with-body-flag',
  load: async (context: Parameters<(typeof baseLoader)['load']>[0]) => {
    const { parseData } = context;
    return baseLoader.load({
      ...context,
      parseData: async ({ id, data, filePath }) => {
        let markdownBodyPresent = false;
        if (filePath) {
          try {
            const contents = await readFile(filePath, 'utf-8');
            const { content } = parseFrontmatter(contents);
            markdownBodyPresent = content.trim().length > 0;
          } catch {
            /* parseData / schema will surface read errors if needed */
          }
        }
        return parseData({
          id,
          data: { ...data, __markdownBodyPresent: markdownBodyPresent },
          filePath,
        });
      },
    });
  },
};
