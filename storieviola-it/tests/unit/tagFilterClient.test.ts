import { describe, expect, it } from 'vitest';
import {
  applyFilterToItems,
  getActiveStateForButton,
  getInitialSelectedTag,
  updateClearButtonState,
  updateFilterButtonUi,
} from '../../src/lib/tagFilterClient';

function createButton(tag: string, ariaPressed = 'false') {
  const classes = new Set<string>();
  const attributes = new Map<string, string>([
    ['data-filter-tag', tag],
    ['aria-pressed', ariaPressed],
  ]);

  return {
    getAttribute(name: string) {
      return attributes.get(name) ?? null;
    },
    setAttribute(name: string, value: string) {
      attributes.set(name, value);
    },
    classList: {
      toggle(token: string, force?: boolean) {
        const shouldHaveClass = force ?? !classes.has(token);
        if (shouldHaveClass) {
          classes.add(token);
        } else {
          classes.delete(token);
        }
        return classes.has(token);
      },
    },
    hasClass(token: string) {
      return classes.has(token);
    },
  };
}

function createItem(dataTags: string | null) {
  return {
    hidden: false,
    getAttribute(name: string) {
      return name === 'data-tags' ? dataTags : null;
    },
  };
}

describe('getInitialSelectedTag', () => {
  it('prefers the button with aria-pressed true', () => {
    const buttons = [
      createButton('all', 'false'),
      createButton('kids', 'true'),
      createButton('stories', 'false'),
    ];
    expect(getInitialSelectedTag(buttons)).toBe('kids');
  });

  it('falls back to first button then all', () => {
    expect(getInitialSelectedTag([createButton('all')])).toBe('all');
    expect(getInitialSelectedTag([])).toBe('all');
  });
});

describe('getActiveStateForButton', () => {
  it('matches tags case-insensitively', () => {
    expect(getActiveStateForButton('KiDs', 'kids')).toBe(true);
    expect(getActiveStateForButton('stories', 'kids')).toBe(false);
  });

  it('treats null button tag as all', () => {
    expect(getActiveStateForButton(null, 'all')).toBe(true);
    expect(getActiveStateForButton(null, 'kids')).toBe(false);
  });
});

describe('applyFilterToItems', () => {
  it('returns visible count and updates hidden flags', () => {
    const items = [createItem('kids,stories'), createItem('music'), createItem(null)];
    const matchCount = applyFilterToItems('kids', items);

    expect(matchCount).toBe(1);
    expect(items[0].hidden).toBe(false);
    expect(items[1].hidden).toBe(true);
    expect(items[2].hidden).toBe(true);
  });

  it('shows all items for all filter', () => {
    const items = [createItem('kids'), createItem(null)];
    const matchCount = applyFilterToItems('all', items);

    expect(matchCount).toBe(2);
    expect(items[0].hidden).toBe(false);
    expect(items[1].hidden).toBe(false);
  });
});

describe('updateFilterButtonUi', () => {
  it('updates aria-pressed and active classes for selected tag', () => {
    const all = createButton('all');
    const kids = createButton('kids');
    updateFilterButtonUi([all, kids], 'kids');

    expect(all.getAttribute('aria-pressed')).toBe('false');
    expect(kids.getAttribute('aria-pressed')).toBe('true');
    expect(kids.hasClass('bg-brand-200')).toBe(true);
    expect(kids.hasClass('border-brand-500')).toBe(true);
    expect(all.hasClass('bg-surface')).toBe(true);
  });
});

describe('updateClearButtonState', () => {
  it('sets aria-pressed based on selected tag', () => {
    const attrs = new Map<string, string>();
    const clearButton = {
      setAttribute(name: string, value: string) {
        attrs.set(name, value);
      },
    };

    updateClearButtonState(clearButton, 'all');
    expect(attrs.get('aria-pressed')).toBe('true');

    updateClearButtonState(clearButton, 'kids');
    expect(attrs.get('aria-pressed')).toBe('false');
  });

  it('is safe when clear button is null', () => {
    expect(() => updateClearButtonState(null, 'all')).not.toThrow();
  });
});
