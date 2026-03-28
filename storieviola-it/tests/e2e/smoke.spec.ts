import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

/** Vertical stacking tolerance (px) for subpixel / DPR in grid layout checks */
const EPISODE_STACK_Y_TOLERANCE = 8;

/** Home → first list card that has a Spotify CTA (episode defines `spotifyUrl`). */
async function openEpisodeWithSpotifyFromHome(page: Page) {
  await page.goto('/');
  const card = page.locator('[data-episodes-list] > li').filter({
    has: page.getByRole('link', { name: /Ascolta su Spotify/ }),
  }).first();
  await expect(card).toBeVisible();
  await card.getByRole('link', { name: 'Leggi la storia', exact: true }).click();
}

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

  test('episode list is single column below md', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    await page.goto('/');
    const list = page.locator('[data-episodes-list]');
    await expect(list).toHaveCount(1);
    const itemCount = await list.locator(':scope > li').count();
    expect(itemCount, 'fixture needs ≥2 episodes for stacking check').toBeGreaterThanOrEqual(2);

    await expect(list).toHaveClass(/grid-cols-1/);
    const first = list.locator(':scope > li').first();
    const second = list.locator(':scope > li').nth(1);
    const box0 = await first.boundingBox();
    const box1 = await second.boundingBox();
    expect(box0 && box1).toBeTruthy();
    expect(box1!.y).toBeGreaterThanOrEqual(
      box0!.y + box0!.height - EPISODE_STACK_Y_TOLERANCE,
    );
  });

  test('episode list uses four columns at xl (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const list = page.locator('[data-episodes-list]');
    await expect(list).toHaveCount(1);
    await expect(list).toHaveClass(/xl:grid-cols-4/);
    const items = list.locator(':scope > li');
    const itemCount = await items.count();
    expect(itemCount, 'fixture needs ≥4 episodes for xl grid check').toBeGreaterThanOrEqual(4);

    const tops = await items.evaluateAll((els) =>
      els.slice(0, 4).map((el) => el.getBoundingClientRect().top),
    );
    const maxTop = Math.max(...tops);
    const minTop = Math.min(...tops);
    expect(maxTop - minTop).toBeLessThanOrEqual(4);
    const fourth = items.nth(3);
    const first = items.first();
    const b0 = await first.boundingBox();
    const b3 = await fourth.boundingBox();
    expect(b0 && b3).toBeTruthy();
    expect(b3!.x).toBeGreaterThan(b0!.x + b0!.width * 0.5);
  });

  test('tag filter toggles selection', async ({ page }) => {
    await page.goto('/');
    const filter = page.locator('[data-tag-filter]');
    await expect(filter).toBeVisible();
    await expect(page.getByRole('button', { name: 'Tutti' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    const topic = page.locator(
      'button[data-filter-button][data-filter-tag]:not([data-filter-tag="all"]):not([data-filter-tag="featured"])',
    ).first();
    await expect(topic).toBeVisible();
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
    const readLink = page
      .getByRole('link', { name: 'Leggi la storia', exact: true })
      .first();
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
    const cardsWithSpotify = page.locator('[data-episodes-list] > li').filter({
      has: page.getByRole('link', { name: /Ascolta su Spotify/ }),
    });
    expect(await cardsWithSpotify.count(), 'fixture needs ≥1 episode with spotifyUrl').toBeGreaterThan(
      0,
    );
    const card = cardsWithSpotify.first();
    const spotifyOnCard = card.getByRole('link', { name: /Ascolta su Spotify/ });
    await expect(spotifyOnCard).toBeVisible();
    const spotifyHref = await spotifyOnCard.getAttribute('href');
    expect(spotifyHref).toMatch(/open\.spotify\.com/);

    await card
      .getByRole('link', { name: 'Leggi la storia', exact: true })
      .click();
    const spotifyOnDetail = page.getByRole('link', { name: 'Ascolta su Spotify' });
    await expect(spotifyOnDetail).toBeVisible();
    await expect(spotifyOnDetail).toHaveAttribute('href', spotifyHref!);
  });
});

test.describe('Episode detail desktop reading-first (Story 8.2)', () => {
  test('uses compact header: cover narrower than article at desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page
      .getByRole('link', { name: 'Leggi la storia', exact: true })
      .first()
      .click();

    const article = page.locator('article');
    const cover = page.locator('[data-episode-detail-header] img').first();
    await expect(cover).toBeVisible();
    const articleBox = await article.boundingBox();
    const coverBox = await cover.boundingBox();
    expect(articleBox && coverBox).toBeTruthy();
    expect(coverBox!.width).toBeLessThan(articleBox!.width * 0.55);
  });

  test('shows back link to episode list and text-style Spotify on desktop', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await openEpisodeWithSpotifyFromHome(page);

    const back = page.locator('[data-back-to-episodes]');
    await expect(back).toBeVisible();
    await expect(back).toHaveAttribute('href', '/#episodes-heading');

    const desktopSpotify = page.locator('[data-detail-spotify-desktop]');
    const mobileSpotify = page.locator('[data-detail-spotify-mobile]');
    await expect(desktopSpotify).toBeVisible();
    await expect(mobileSpotify).toBeHidden();
    await expect(desktopSpotify).not.toHaveClass(/bg-cta/);
  });

  test('back link and desktop Spotify link are keyboard-focusable', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await openEpisodeWithSpotifyFromHome(page);

    const back = page.locator('[data-back-to-episodes]');
    await back.evaluate((el) => (el as HTMLElement).focus());
    await expect(back).toBeFocused();

    const desktopSpotify = page.locator('[data-detail-spotify-desktop]');
    await desktopSpotify.evaluate((el) => (el as HTMLElement).focus());
    await expect(desktopSpotify).toBeFocused();
  });
});

test.describe('Episode detail mobile short hero (Story 8.3)', () => {
  test('caps cover height, stacks listen CTA, no redundant list-style read buttons', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openEpisodeWithSpotifyFromHome(page);
    await expect(page).toHaveURL(/\/episodes\/.+/);

    const cover = page.locator('[data-detail-cover]');
    await expect(cover).toBeVisible();
    const viewportH = 844;
    const coverBox = await cover.boundingBox();
    expect(coverBox).toBeTruthy();
    expect(coverBox!.height).toBeLessThan(viewportH * 0.5);

    await expect(
      page.getByRole('link', { name: 'Leggi la storia', exact: true }),
    ).toHaveCount(0);
    await expect(page.getByRole('button', { name: /continua a leggere/i })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /continua a leggere/i })).toHaveCount(0);

    await expect(page.locator('#storia[data-episode-transcript]')).toBeVisible();

    const mobileSpotify = page.locator('[data-detail-spotify-mobile]');
    const desktopSpotify = page.locator('[data-detail-spotify-desktop]');
    await expect(mobileSpotify).toBeVisible();
    await expect(desktopSpotify).toBeHidden();
    await expect(mobileSpotify).toHaveClass(/w-full/);
    await expect(mobileSpotify).toHaveClass(/bg-cta/);
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
    await page
      .getByRole('link', { name: 'Leggi la storia', exact: true })
      .first()
      .click();

    const noticeLink = page.getByRole('link', { name: 'Dettagli sulla licenza' });
    await expect(noticeLink).toBeVisible();
    await expect(noticeLink).toHaveAttribute('href', '/licenza');
  });
});
