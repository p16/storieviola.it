// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Custom domain on GitHub Pages (storieviola.it) with base '/' so internal links
  // can use root-relative paths (href="/", href="/about") and assets use /_astro/...
  site: 'https://storieviola.it',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress Astro internal unused-import warning (astro/dist/assets/utils)
          if (
            warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
            typeof warning.message === 'string' &&
            warning.message.includes('@astrojs/internal-helpers/remote')
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});