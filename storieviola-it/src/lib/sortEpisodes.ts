import type { CollectionEntry } from 'astro:content';

/** Featured episodes first, then newest `publishDate` first; tie-break by id. */
export function compareEpisodesForListing(
  a: CollectionEntry<'episodes'>,
  b: CollectionEntry<'episodes'>,
): number {
  const aFeat = a.data.featured === true;
  const bFeat = b.data.featured === true;
  if (aFeat !== bFeat) return aFeat ? -1 : 1;

  const ad = a.data.publishDate.getTime();
  const bd = b.data.publishDate.getTime();
  if (bd !== ad) return bd - ad;

  return a.id.localeCompare(b.id);
}

export function sortEpisodesForPreview(entries: CollectionEntry<'episodes'>[]): CollectionEntry<'episodes'>[] {
  return [...entries].sort(compareEpisodesForListing);
}
