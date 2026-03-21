import { describe, expect, it } from 'vitest';
import { getSpotifyShowUrl } from '../../src/lib/site';

describe('getSpotifyShowUrl', () => {
  it('returns a Spotify show URL', () => {
    const url = getSpotifyShowUrl();
    expect(url).toMatch(/^https:\/\/open\.spotify\.com\/show\//);
  });
});
