/**
 * Zod schemas for content collections — shared with `content.config.ts` and unit tests.
 */
import { z } from 'astro/zod';

export const episodeEntrySchema = z.object({
  title: z.string(),
  slug: z.string().min(1, 'slug is required'),
  description: z.string(),
  cover: z.string(),
  spotifyUrl: z.string().optional(),
  publishDate: z.coerce.date(),
  tags: z.array(z.string()),
  hidden: z.boolean().optional(),
  featured: z.boolean().optional(),
  body: z.string().optional(),
}).superRefine((value, ctx) => {
  const hasSpotifyUrl = typeof value.spotifyUrl === 'string' && value.spotifyUrl.trim().length > 0;
  const hasTranscriptBody = typeof value.body === 'string' && value.body.trim().length > 0;

  if (!hasSpotifyUrl && !hasTranscriptBody) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Each episode must provide at least one of: spotifyUrl or a non-empty markdown body.',
      path: ['spotifyUrl'],
    });
  }
});

export const aboutEntrySchema = z.object({}).optional();
