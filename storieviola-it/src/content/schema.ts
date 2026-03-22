/**
 * Zod schemas for content collections — shared with `content.config.ts` and unit tests.
 */
import { z } from 'astro/zod';

export const episodeEntrySchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string(),
  spotifyUrl: z.string(),
  publishDate: z.coerce.date(),
  tags: z.array(z.string()),
  hidden: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export const aboutEntrySchema = z.object({}).optional();
