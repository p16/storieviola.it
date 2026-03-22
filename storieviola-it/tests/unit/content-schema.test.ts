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
      tags: [],
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

  // hidden field tests (story 6.2)
  it('accepts hidden: true', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T',
      description: 'D',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: [],
      hidden: true,
    });
    expect(parsed.hidden).toBe(true);
  });

  it('accepts hidden: false', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T',
      description: 'D',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: [],
      hidden: false,
    });
    expect(parsed.hidden).toBe(false);
  });

  it('accepts omitted hidden (defaults to undefined)', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T',
      description: 'D',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: [],
    });
    expect(parsed.hidden).toBeUndefined();
  });

  it('rejects non-boolean hidden', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T',
        description: 'D',
        cover: '/x',
        spotifyUrl: 'https://open.spotify.com/episode/abc',
        publishDate: new Date('2026-01-01'),
        tags: [],
        hidden: 'yes',
      }),
    ).toThrow();
  });

  // featured field tests (story 6.3)
  it('accepts featured: true', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T',
      description: 'D',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: [],
      featured: true,
    });
    expect(parsed.featured).toBe(true);
  });

  it('accepts featured: false', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T',
      description: 'D',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: [],
      featured: false,
    });
    expect(parsed.featured).toBe(false);
  });

  it('accepts omitted featured (defaults to undefined)', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T',
      description: 'D',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: [],
    });
    expect(parsed.featured).toBeUndefined();
  });

  it('rejects non-boolean featured', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T',
        description: 'D',
        cover: '/x',
        spotifyUrl: 'https://open.spotify.com/episode/abc',
        publishDate: new Date('2026-01-01'),
        tags: [],
        featured: 'yes',
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
