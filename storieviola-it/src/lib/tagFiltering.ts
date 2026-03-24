export function normalizeTags(tags: string[]):string[] {
  return tags.map((tag) => tag.trim()).filter(Boolean);
}

export function getUniqueFilterTags(tags: string[]): string[] {
  return Array.from(
    new Set(
      normalizeTags(tags).map((tag) => tag.toLowerCase()),
    ),
  )
    .filter((tag) => tag !== 'featured')
    .sort((a, b) => a.localeCompare(b));
}

export function parseTagsAttribute(value: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((tag) => tag.toLowerCase())
    .filter(Boolean);
}

export function isItemVisibleForTag(
  selectedTag: string,
  itemTags: string[],
): boolean {
  const normalizedSelectedTag = selectedTag.toLowerCase();
  return normalizedSelectedTag === 'all'
    ? true
    : itemTags.includes(normalizedSelectedTag);
}
