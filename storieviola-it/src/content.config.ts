// Content Collections schema for storieviola.it
// Episodes: title, description, cover, spotifyUrl, tags (camelCase)
// About: single document, body Markdown, frontmatter optional

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const episodes = defineCollection({
  loader: glob({
    base: './src/content/episodes',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(), // image path or URL
    spotifyUrl: z.string(),
    /** Publication date; used for ordering (newest first after featured). ISO date or YAML date. */
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

const about = defineCollection({
  loader: glob({
    base: './src/content/about',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({}).optional(), // frontmatter optional per architecture
});

export const collections = {
  episodes,
  about,
};
