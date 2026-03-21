import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads with title and main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Storie Viola/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'Storie Viola' }),
    ).toBeVisible();
  });

  test('header home link includes logo image', async ({ page }) => {
    await page.goto('/');
    const home = page.getByRole('navigation', { name: 'Main' }).getByRole('link', {
      name: /Storie Viola/i,
    });
    await expect(home.locator('img')).toBeVisible();
  });

  test('Spotify links use open.spotify.com hrefs', async ({ page }) => {
    await page.goto('/');
    const spotify = page.locator('a[href*="open.spotify.com"]').first();
    await expect(spotify).toHaveAttribute('href', /open\.spotify\.com/);
  });

  test('tag filter toggles selection', async ({ page }) => {
    await page.goto('/');
    const filter = page.locator('[data-tag-filter]');
    if (!(await filter.isVisible())) {
      test.skip();
      return;
    }
    await expect(page.getByRole('button', { name: 'Tutti' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    const topic = page.locator(
      'button[data-filter-button][data-filter-tag]:not([data-filter-tag="all"]):not([data-filter-tag="featured"])',
    ).first();
    if ((await topic.count()) === 0) return;
    await topic.click();
    await expect(topic).toHaveAttribute('aria-pressed', 'true');
    await page.getByRole('button', { name: 'Tutti' }).click();
    await expect(page.getByRole('button', { name: 'Tutti' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('homepage passes axe (no serious/critical violations)', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(serious, JSON.stringify(serious, null, 2)).toHaveLength(0);
  });
});

test.describe('About', () => {
  test('loads with Origin heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: 'Origin' })).toBeVisible();
  });

  test('about passes axe (no serious/critical violations)', async ({ page }) => {
    await page.goto('/about');
    const results = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(serious, JSON.stringify(serious, null, 2)).toHaveLength(0);
  });
});
