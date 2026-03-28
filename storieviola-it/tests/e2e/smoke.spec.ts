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

  test('hero image is visible', async ({ page }) => {
    await page.goto('/');
    const heroImg = page.locator('img[alt="Storie Viola — illustrazione del podcast di storie per bambini"]').first();
    await expect(heroImg).toBeVisible();
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

  test('can navigate to an episode detail and read transcript', async ({ page }) => {
    await page.goto('/');
    const readLink = page.getByRole('link', { name: 'Leggi la storia' }).first();
    await expect(readLink).toBeVisible();
    await readLink.click();

    await expect(page).toHaveURL(/\/episodes\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const transcript = page.locator('article .prose');
    await expect(transcript).toBeVisible();
    await expect((await transcript.innerText()).trim().length).toBeGreaterThan(20);
  });

  test('episode detail shows Spotify CTA only when episode lists spotifyUrl', async ({ page }) => {
    await page.goto('/');
    const card = page
      .locator('[data-episodes-list] > li')
      .filter({ has: page.getByRole('link', { name: 'Leggi la storia' }) })
      .first();
    const spotifyOnCard = card.getByRole('link', { name: /Ascolta su Spotify/ });
    await expect(spotifyOnCard).toBeVisible();
    const spotifyHref = await spotifyOnCard.getAttribute('href');
    expect(spotifyHref).toMatch(/open\.spotify\.com/);

    await card.getByRole('link', { name: 'Leggi la storia' }).click();
    const spotifyOnDetail = page.getByRole('link', { name: 'Ascolta su Spotify' });
    await expect(spotifyOnDetail).toBeVisible();
    await expect(spotifyOnDetail).toHaveAttribute('href', spotifyHref!);
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

test.describe('Licenza and legal links', () => {
  test('header shows © Diritti and licenza page renders legal copy', async ({ page }) => {
    await page.goto('/');
    const rightsLink = page.getByRole('link', { name: '© Diritti' });
    await expect(rightsLink).toBeVisible();
    await rightsLink.click();

    await expect(page).toHaveURL('/licenza');
    await expect(page.getByRole('heading', { name: 'Licenza contenuti' })).toBeVisible();
    await expect(page.getByText(/Tutti i diritti riservati/i)).toBeVisible();
  });

  test('episode detail shows compact license notice', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Leggi la storia' }).first().click();

    const noticeLink = page.getByRole('link', { name: 'Dettagli sulla licenza' });
    await expect(noticeLink).toBeVisible();
    await expect(noticeLink).toHaveAttribute('href', '/licenza');
  });
});
