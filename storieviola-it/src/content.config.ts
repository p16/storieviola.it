// Content Collections schema for storieviola.it
// Episodes: title, description, cover, spotifyUrl, tags (camelCase)
// About: single document, body Markdown, frontmatter optional

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { aboutEntrySchema, episodeEntrySchema } from './content/schema';

const episodes = defineCollection({
  loader: glob({
    base: './src/content/episodes',
    pattern: '**/*.{md,mdx}',
  }),
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
