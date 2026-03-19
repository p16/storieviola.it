/**
 * Spotify **show** (podcast) URL for the homepage hero CTA — not per-episode links.
 * Set `PUBLIC_SPOTIFY_SHOW_URL` in `.env` or the host env to override.
 */
export function getSpotifyShowUrl(): string {
  const fromEnv = import.meta.env.PUBLIC_SPOTIFY_SHOW_URL;
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return 'https://open.spotify.com/show/6Ny4Eh3xfB2sKR82J99cZQ?si=61907bca4a6b4c3f';
}
