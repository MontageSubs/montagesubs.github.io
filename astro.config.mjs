import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { supportedLangs } from './src/i18n/locales.ts';
import { isUnindexedPath } from './src/config/indexing.ts';
import { tools } from './src/data/tools.ts';

const SITE_URL = 'https://subs.js.org';

const toolSitemaps = tools
  .filter((tool) => tool.type === 'online' && tool.url)
  .map((tool) => new URL('sitemap.xml', tool.url).href);

const isListedPage = (page) => {
  const { pathname } = new URL(page);
  if (pathname === '/') return true;
  return supportedLangs.includes(pathname.split('/')[1]) && !isUnindexedPath(pathname);
};

export default defineConfig({
  site: SITE_URL,

  integrations: [
    tailwind(),
    sitemap({
      filter: isListedPage,
      customSitemaps: toolSitemaps,
    }),
  ],

  output: 'static',
});
