import type { CollectionEntry } from 'astro:content';

function hasFeaturedTag(tags: string[]): boolean {
  return tags.some((t) => t.toLowerCase() === 'featured');
}

/** Featured episodes first, then newest `publishDate` first; tie-break by id. */
export function compareEpisodesForListing(
  a: CollectionEntry<'episodes'>,
  b: CollectionEntry<'episodes'>,
): number {
  const aFeat = hasFeaturedTag(a.data.tags);
  const bFeat = hasFeaturedTag(b.data.tags);
  if (aFeat !== bFeat) return aFeat ? -1 : 1;

  const ad = a.data.publishDate.getTime();
  const bd = b.data.publishDate.getTime();
  if (bd !== ad) return bd - ad;

  return a.id.localeCompare(b.id);
}

export function sortEpisodesForPreview(entries: CollectionEntry<'episodes'>[]): CollectionEntry<'episodes'>[] {
  return [...entries].sort(compareEpisodesForListing);
}
