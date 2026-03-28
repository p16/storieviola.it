// Content Collections schema for storieviola.it
// Episodes: slug, title, description, cover, optional spotifyUrl, tags, etc. (camelCase); see CONTENT.md
// About: single document, body Markdown, frontmatter optional

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { aboutEntrySchema, episodeEntrySchema } from './content/schema';
import { episodesLoader } from './content/episodes-loader';

const episodes = defineCollection({
  loader: episodesLoader,
  schema: episodeEntrySchema,
});

const about = defineCollection({
  loader: glob({
    base: './src/content/about',
    pattern: '**/*.{md,mdx}',
  }),
  schema: aboutEntrySchema,
});

export const collections = {
  episodes,
  about,
};
