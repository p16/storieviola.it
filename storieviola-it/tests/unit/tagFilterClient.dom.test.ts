// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { initTagFilter } from '../../src/lib/tagFilterClient';

function dispatchDomReady() {
  document.dispatchEvent(new Event('DOMContentLoaded'));
}

describe('initTagFilter (DOM)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('applies initial selected filter on DOMContentLoaded', () => {
    document.body.innerHTML = `
      <div data-tag-filter>
        <button data-filter-button data-filter-tag="all" aria-pressed="false" class="bg-surface border-brand-300 text-brand-800"></button>
        <button data-filter-button data-filter-tag="kids" aria-pressed="true" class="bg-surface border-brand-300 text-brand-800"></button>
      </div>
      <p data-episodes-empty hidden>
        <button data-clear-filter aria-pressed="false"></button>
      </p>
      <ul data-episodes-list>
        <li data-tags="kids"></li>
        <li data-tags="stories"></li>
      </ul>
    `;

    initTagFilter();
    dispatchDomReady();

    const items = Array.from(document.querySelectorAll('[data-tags]')) as HTMLElement[];
    const allBtn = document.querySelector('[data-filter-tag="all"]') as HTMLElement;
    const kidsBtn = document.querySelector('[data-filter-tag="kids"]') as HTMLElement;
    const emptyState = document.querySelector('[data-episodes-empty]') as HTMLElement;

    expect(items[0].hidden).toBe(false);
    expect(items[1].hidden).toBe(true);
    expect(emptyState.hidden).toBe(true);
    expect(kidsBtn.getAttribute('aria-pressed')).toBe('true');
    expect(allBtn.getAttribute('aria-pressed')).toBe('false');
    expect(kidsBtn.classList.contains('bg-brand-200')).toBe(true);
  });

  it('changes selected tag on button click', () => {
    document.body.innerHTML = `
      <div data-tag-filter>
        <button data-filter-button data-filter-tag="all" aria-pressed="true" class="bg-surface border-brand-300 text-brand-800"></button>
        <button data-filter-button data-filter-tag="kids" aria-pressed="false" class="bg-surface border-brand-300 text-brand-800"></button>
      </div>
      <p data-episodes-empty hidden>
        <button data-clear-filter aria-pressed="true"></button>
      </p>
      <ul data-episodes-list>
        <li data-tags="kids"></li>
        <li data-tags="stories"></li>
      </ul>
    `;

    initTagFilter();
    dispatchDomReady();

    const kidsBtn = document.querySelector('[data-filter-tag="kids"]') as HTMLButtonElement;
    kidsBtn.click();

    const clearBtn = document.querySelector('[data-clear-filter]') as HTMLElement;
    const items = Array.from(document.querySelectorAll('[data-tags]')) as HTMLElement[];
    expect(kidsBtn.getAttribute('aria-pressed')).toBe('true');
    expect(clearBtn.getAttribute('aria-pressed')).toBe('false');
    expect(items[0].hidden).toBe(false);
    expect(items[1].hidden).toBe(true);
  });

  it('shows empty state and clear resets to all', () => {
    document.body.innerHTML = `
      <div data-tag-filter>
        <button data-filter-button data-filter-tag="all" aria-pressed="true" class="bg-surface border-brand-300 text-brand-800"></button>
        <button data-filter-button data-filter-tag="kids" aria-pressed="false" class="bg-surface border-brand-300 text-brand-800"></button>
        <button data-filter-button data-filter-tag="music" aria-pressed="false" class="bg-surface border-brand-300 text-brand-800"></button>
      </div>
      <p data-episodes-empty hidden>
        <button data-clear-filter aria-pressed="true"></button>
      </p>
      <ul data-episodes-list>
        <li data-tags="kids"></li>
        <li data-tags="stories"></li>
      </ul>
    `;

    initTagFilter();
    dispatchDomReady();

    const musicBtn = document.querySelector('[data-filter-tag="music"]') as HTMLButtonElement;
    const clearBtn = document.querySelector('[data-clear-filter]') as HTMLButtonElement;
    const emptyState = document.querySelector('[data-episodes-empty]') as HTMLElement;

    musicBtn.click();
    expect(emptyState.hidden).toBe(false);
    expect(clearBtn.getAttribute('aria-pressed')).toBe('false');

    clearBtn.click();
    expect(emptyState.hidden).toBe(true);
    expect(clearBtn.getAttribute('aria-pressed')).toBe('true');
  });

  it('returns early when filter root is missing', () => {
    document.body.innerHTML = `<div>No filter</div>`;
    initTagFilter();
    expect(() => dispatchDomReady()).not.toThrow();
  });

  it('handles missing list/empty-state/clear-button safely', () => {
    document.body.innerHTML = `
      <div data-tag-filter>
        <button data-filter-button data-filter-tag="all" aria-pressed="true" class="bg-surface border-brand-300 text-brand-800"></button>
        <button data-filter-button aria-pressed="false" class="bg-surface border-brand-300 text-brand-800"></button>
      </div>
    `;

    initTagFilter();
    dispatchDomReady();

    const buttons = Array.from(
      document.querySelectorAll('[data-filter-button]'),
    ) as HTMLButtonElement[];
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');

    // second button has no data-filter-tag: fallback should be "all" branch
    buttons[1].click();
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
  });
});
