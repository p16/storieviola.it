import { describe, expect, it } from 'vitest';
import { aboutEntrySchema, episodeEntrySchema } from '../../src/content/schema';

describe('episodeEntrySchema', () => {
  it('accepts a valid episode frontmatter object', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'Test',
      slug: 'test-slug',
      description: 'Desc',
      cover: '/episodes/x.jpg',
      spotifyUrl: 'https://open.spotify.com/episode/abc',
      publishDate: new Date('2026-01-01'),
      tags: ['featured'],
    });
    expect(parsed.title).toBe('Test');
  });

  it('accepts hidden: true', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], hidden: true,
    });
    expect(parsed.hidden).toBe(true);
  });

  it('accepts hidden: false', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], hidden: false,
    });
    expect(parsed.hidden).toBe(false);
  });

  it('accepts omitted hidden (optional)', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [],
    });
    expect(parsed.hidden).toBeUndefined();
  });

  it('rejects hidden as a non-boolean', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
        publishDate: new Date('2026-01-01'), tags: [], hidden: 'yes',
      })
    ).toThrow();
  });

  it('accepts featured: true', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], featured: true,
    });
    expect(parsed.featured).toBe(true);
  });

  it('accepts featured: false', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], featured: false,
    });
    expect(parsed.featured).toBe(false);
  });

  it('accepts omitted featured (optional)', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [],
    });
    expect(parsed.featured).toBeUndefined();
  });

  it('rejects featured as non-boolean', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T', slug: 't', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
        publishDate: new Date('2026-01-01'), tags: [], featured: 'yes',
      })
    ).toThrow();
  });

  it('accepts omitted spotifyUrl when transcript body exists', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T',
      slug: 't',
      description: 'D',
      cover: '/x',
      publishDate: new Date('2026-01-01'),
      tags: [],
      body: 'Once upon a time',
    });
    expect(parsed.spotifyUrl).toBeUndefined();
  });

  it('rejects when both spotifyUrl and body are missing/empty', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T',
        slug: 't',
        description: 'D',
        cover: '/x',
        publishDate: new Date('2026-01-01'),
        tags: [],
      })
    ).toThrow(/spotifyUrl or a non-empty markdown body/i);
  });

  it('rejects empty slug', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T',
        slug: '',
        description: 'D',
        cover: '/x',
        spotifyUrl: 'https://open.spotify.com/episode/x',
        publishDate: new Date('2026-01-01'),
        tags: [],
      })
    ).toThrow();
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
