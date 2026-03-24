import { isItemVisibleForTag, parseTagsAttribute } from './tagFiltering';

type FilterButtonLike = {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  classList: {
    toggle(token: string, force?: boolean): boolean;
  };
};

type FilterItemLike = {
  getAttribute(name: string): string | null;
  hidden: boolean;
};

export function getInitialSelectedTag(buttons: FilterButtonLike[]): string {
  const selectedInitial =
    buttons.find((btn) => btn.getAttribute('aria-pressed') === 'true') ??
    buttons[0];

  return selectedInitial?.getAttribute('data-filter-tag') ?? 'all';
}

export function getActiveStateForButton(
  buttonTag: string | null,
  selectedTag: string,
): boolean {
  const normalizedButtonTag = (buttonTag ?? 'all').toLowerCase();
  return normalizedButtonTag === selectedTag.toLowerCase();
}

export function applyFilterToItems(
  selectedTag: string,
  items: FilterItemLike[],
): number {
  let matchCount = 0;

  items.forEach((li) => {
    const liTags = parseTagsAttribute(li.getAttribute('data-tags'));
    const matches = isItemVisibleForTag(selectedTag, liTags);

    li.hidden = !matches;
    if (matches) {
      matchCount += 1;
    }
  });

  return matchCount;
}

export function updateFilterButtonUi(
  buttons: FilterButtonLike[],
  nextTag: string,
): void {
  buttons.forEach((btn) => {
    const active = getActiveStateForButton(
      btn.getAttribute('data-filter-tag'),
      nextTag,
    );
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');

    // Keep classes in sync with TagFilter.astro.
    btn.classList.toggle('bg-brand-200', active);
    btn.classList.toggle('border-brand-500', active);
    btn.classList.toggle('text-brand-950', active);

    btn.classList.toggle('bg-surface', !active);
    btn.classList.toggle('border-brand-300', !active);
    btn.classList.toggle('text-brand-800', !active);
  });
}

export function updateClearButtonState(
  clearButton: { setAttribute(name: string, value: string): void } | null,
  selectedTag: string,
): void {
  if (!clearButton) {
    return;
  }

  clearButton.setAttribute(
    'aria-pressed',
    selectedTag.toLowerCase() === 'all' ? 'true' : 'false',
  );
}

export function initTagFilter(): void {
  document.addEventListener('DOMContentLoaded', () => {
    const filterRoot = document.querySelector('[data-tag-filter]');
    if (!filterRoot) return;

    const buttons = Array.from(
      filterRoot.querySelectorAll<HTMLElement>('[data-filter-button]'),
    );
    const list = document.querySelector('[data-episodes-list]');
    const items = list
      ? Array.from(list.querySelectorAll<HTMLElement>('[data-tags]'))
      : [];
    const emptyState = document.querySelector<HTMLElement>('[data-episodes-empty]');
    const clearButton = emptyState?.querySelector<HTMLElement>(
      '[data-clear-filter]',
    );

    let selectedTag = getInitialSelectedTag(buttons);

    updateFilterButtonUi(buttons, selectedTag);
    updateClearButtonState(clearButton ?? null, selectedTag);

    const initialMatchCount = applyFilterToItems(selectedTag, items);
    if (emptyState) {
      emptyState.hidden = initialMatchCount > 0;
    }

    if (clearButton) {
      clearButton.addEventListener('click', () => {
        selectedTag = 'all';
        updateFilterButtonUi(buttons, selectedTag);
        updateClearButtonState(clearButton, selectedTag);

        const matchCount = applyFilterToItems(selectedTag, items);
        if (emptyState) {
          emptyState.hidden = matchCount > 0;
        }
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextTag = btn.getAttribute('data-filter-tag') ?? 'all';
        selectedTag = nextTag;
        updateFilterButtonUi(buttons, selectedTag);
        updateClearButtonState(clearButton ?? null, selectedTag);

        const matchCount = applyFilterToItems(selectedTag, items);
        if (emptyState) {
          emptyState.hidden = matchCount > 0;
        }
      });
    });
  });
}
