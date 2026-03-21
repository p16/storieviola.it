import { describe, expect, it } from 'vitest';
import { aboutEntrySchema, episodeEntrySchema } from '../../src/content/schema';

describe('episodeEntrySchema', () => {
  it('accepts a valid episode frontmatter object', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'Test',
      description: 'Desc',
      cover: '/episodes/x.jpg',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: ['featured'],
    });
    expect(parsed.title).toBe('Test');
  });

  it('rejects missing required fields', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'Test',
      }),
    ).toThrow();
  });
});

describe('aboutEntrySchema', () => {
  it('allows empty object', () => {
    expect(aboutEntrySchema.parse({})).toEqual({});
  });

  it('allows undefined (optional)', () => {
    expect(aboutEntrySchema.parse(undefined)).toBeUndefined();
  });
});
