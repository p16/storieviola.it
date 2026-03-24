const BASE_CLASS =
  'inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-accent focus-visible:ring-offset-2';

const SELECTED_CLASS = 'bg-brand-200 border-brand-500 text-brand-950';
const UNSELECTED_CLASS =
  'border-brand-300 bg-surface text-brand-800 hover:bg-brand-50';

export function getTagFilterButtonClass(active: boolean): string {
  return `${BASE_CLASS} ${active ? SELECTED_CLASS : UNSELECTED_CLASS}`;
}
