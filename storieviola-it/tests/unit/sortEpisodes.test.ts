import type { CollectionEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import {
  compareEpisodesForListing,
  sortEpisodesForPreview,
} from '../../src/lib/sortEpisodes';

function fakeEpisode(
  id: string,
  data: {
    title: string;
    description: string;
    cover: string;
    spotifyUrl: string;
    publishDate: Date;
    tags: string[];
  },
): CollectionEntry<'episodes'> {
  return {
    id,
    collection: 'episodes',
    data,
    body: '',
    slug: id,
  } as CollectionEntry<'episodes'>;
}

describe('sortEpisodesForPreview', () => {
  it('places featured before non-featured', () => {
    const a = fakeEpisode('a', {
      title: 'A',
      description: '',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/a',
      publishDate: new Date('2026-01-02'),
      tags: [],
    });
    const b = fakeEpisode('b', {
      title: 'B',
      description: '',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/b',
      publishDate: new Date('2026-01-01'),
      tags: ['featured'],
    });
    const sorted = sortEpisodesForPreview([a, b]);
    expect(sorted[0].id).toBe('b');
  });

  it('sorts by publishDate descending when both featured or both not', () => {
    const older = fakeEpisode('old', {
      title: 'Old',
      description: '',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/o',
      publishDate: new Date('2025-01-01'),
      tags: [],
    });
    const newer = fakeEpisode('new', {
      title: 'New',
      description: '',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/n',
      publishDate: new Date('2026-06-01'),
      tags: [],
    });
    const sorted = sortEpisodesForPreview([older, newer]);
    expect(sorted[0].id).toBe('new');
  });
});

describe('compareEpisodesForListing', () => {
  it('tie-breaks by id', () => {
    const a = fakeEpisode('b', {
      title: 'X',
      description: '',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/x',
      publishDate: new Date('2026-01-01'),
      tags: [],
    });
    const b = fakeEpisode('a', {
      title: 'Y',
      description: '',
      cover: '/x',
      spotifyUrl: 'https://open.spotify.com/episode/y',
      publishDate: new Date('2026-01-01'),
      tags: [],
    });
    expect(compareEpisodesForListing(a, b)).toBeGreaterThan(0);
  });
});
