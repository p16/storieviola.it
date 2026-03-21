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

  it('accepts hidden: true', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], hidden: true,
    });
    expect(parsed.hidden).toBe(true);
  });

  it('accepts hidden: false', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], hidden: false,
    });
    expect(parsed.hidden).toBe(false);
  });

  it('accepts omitted hidden (optional)', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [],
    });
    expect(parsed.hidden).toBeUndefined();
  });

  it('rejects hidden as a non-boolean', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
        publishDate: new Date('2026-01-01'), tags: [], hidden: 'yes',
      })
    ).toThrow();
  });

  it('accepts featured: true', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], featured: true,
    });
    expect(parsed.featured).toBe(true);
  });

  it('accepts featured: false', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [], featured: false,
    });
    expect(parsed.featured).toBe(false);
  });

  it('accepts omitted featured (optional)', () => {
    const parsed = episodeEntrySchema.parse({
      title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'), tags: [],
    });
    expect(parsed.featured).toBeUndefined();
  });

  it('rejects featured as non-boolean', () => {
    expect(() =>
      episodeEntrySchema.parse({
        title: 'T', description: 'D', cover: '/x', spotifyUrl: 'https://open.spotify.com/episode/x',
        publishDate: new Date('2026-01-01'), tags: [], featured: 'yes',
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
