import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

export function mirrorSitemapIndex(): AstroIntegration {
  return {
    name: 'mirror-sitemap-index',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await copyFile(
          fileURLToPath(new URL('sitemap-index.xml', dir)),
          fileURLToPath(new URL('sitemap.xml', dir)),
        );
      },
    },
  };
}
