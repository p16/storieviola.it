import { defineConfig, devices } from '@playwright/test';

const previewPort = process.env.PLAYWRIGHT_PREVIEW_PORT ?? '4321';
const previewHost = '127.0.0.1';
const previewOrigin = `http://${previewHost}:${previewPort}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list']],
  use: {
    baseURL: previewOrigin,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run build && npm run preview -- --host ${previewHost} --port ${previewPort}`,
    url: previewOrigin,
    // Reuse a running preview/dev on 4321 (e.g. `npm run dev`) so local runs do not fail when CI=1 is set in the shell.
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
