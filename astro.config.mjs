import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://montagesubs.github.io';

export default defineConfig({
  site: SITE_URL,

  integrations: [
    tailwind(),
    sitemap(),
  ],

  output: 'static',
});
