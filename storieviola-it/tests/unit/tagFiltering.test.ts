import { describe, expect, it } from 'vitest';
import {
  getUniqueFilterTags,
  isItemVisibleForTag,
  normalizeTags,
  parseTagsAttribute,
} from '../../src/lib/tagFiltering';
import { getTagFilterButtonClass } from '../../src/lib/tagFilterStyles';

describe('normalizeTags', () => {
  it('trims and removes empty tags', () => {
    expect(normalizeTags([' kids ', '', '  featured  ', '   '])).toEqual([
      'kids',
      'featured',
    ]);
  });
});

describe('getUniqueFilterTags', () => {
  it('deduplicates, lowercases, removes featured, and sorts', () => {
    const tags = ['Kids', 'featured', ' stories ', 'kids', 'Aventura'];
    expect(getUniqueFilterTags(tags)).toEqual(['aventura', 'kids', 'stories']);
  });
});

describe('parseTagsAttribute', () => {
  it('parses comma-separated values to lowercase tags', () => {
    expect(parseTagsAttribute('Kids,Stories,FEATURED')).toEqual([
      'kids',
      'stories',
      'featured',
    ]);
  });

  it('returns empty array for null/empty', () => {
    expect(parseTagsAttribute(null)).toEqual([]);
    expect(parseTagsAttribute('')).toEqual([]);
  });
});

describe('isItemVisibleForTag', () => {
  it('always matches for all', () => {
    expect(isItemVisibleForTag('all', ['kids'])).toBe(true);
  });

  it('matches only when tag exists', () => {
    expect(isItemVisibleForTag('kids', ['stories', 'kids'])).toBe(true);
    expect(isItemVisibleForTag('music', ['stories', 'kids'])).toBe(false);
  });
});

describe('getTagFilterButtonClass', () => {
  it('returns selected styles for active buttons', () => {
    expect(getTagFilterButtonClass(true)).toContain('bg-brand-200');
    expect(getTagFilterButtonClass(true)).toContain('border-brand-500');
  });

  it('returns unselected styles for inactive buttons', () => {
    expect(getTagFilterButtonClass(false)).toContain('bg-surface');
    expect(getTagFilterButtonClass(false)).toContain('border-brand-300');
  });
});
