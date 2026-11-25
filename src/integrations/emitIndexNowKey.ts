import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { INDEXNOW_KEY_PATTERN } from '../config/indexNowKey.js';

export function emitIndexNowKey(): AstroIntegration {
  return {
    name: 'emit-indexnow-key',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const key = process.env.INDEXNOW_KEY?.trim();
        if (!key) return;
        if (!INDEXNOW_KEY_PATTERN.test(key)) {
          logger.warn('INDEXNOW_KEY must be 8-128 characters of letters, digits or dashes; the key file was not emitted');
          return;
        }
        await writeFile(fileURLToPath(new URL(`${key}.txt`, dir)), key);
      },
    },
  };
}
