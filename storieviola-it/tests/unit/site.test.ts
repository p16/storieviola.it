import { afterEach, describe, expect, it, vi } from 'vitest';
import { getSpotifyShowUrl } from '../../src/lib/site';

const DEFAULT_SHOW_URL =
  'https://open.spotify.com/show/6Ny4Eh3xfB2sKR82J99cZQ?si=61907bca4a6b4c3f';

describe('getSpotifyShowUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns a Spotify show URL', () => {
    const url = getSpotifyShowUrl();
    expect(url).toMatch(/^https:\/\/open\.spotify\.com\/show\//);
  });

  it('returns env override when PUBLIC_SPOTIFY_SHOW_URL is set', () => {
    vi.stubEnv(
      'PUBLIC_SPOTIFY_SHOW_URL',
      ' https://open.spotify.com/show/custom-show ',
    );

    expect(getSpotifyShowUrl()).toBe('https://open.spotify.com/show/custom-show');
  });

  it('falls back to default when env override is blank', () => {
    vi.stubEnv('PUBLIC_SPOTIFY_SHOW_URL', '   ');
    expect(getSpotifyShowUrl()).toBe(DEFAULT_SHOW_URL);
  });
});
