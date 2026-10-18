import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { supportedLangs } from './src/i18n/locales.ts';

const SITE_URL = 'https://montagesubs.github.io';

export default defineConfig({
  site: SITE_URL,

  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => supportedLangs.includes(new URL(page).pathname.split('/')[1]),
    }),
  ],

  output: 'static',
});
