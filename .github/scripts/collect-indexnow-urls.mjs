import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [distDir, outputFile] = process.argv.slice(2);
if (!distDir || !outputFile) {
  console.error('usage: collect-indexnow-urls.mjs <dist-dir> <output-file>');
  process.exit(1);
}

const unescapeXml = (text) =>
  text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");

const readLocations = (file) =>
  [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => unescapeXml(match[1].trim()));

const builtSitemaps = readLocations(join(distDir, 'sitemap-index.xml'))
  .map((location) => join(distDir, new URL(location).pathname))
  .filter(existsSync);
const urls = [...new Set(builtSitemaps.flatMap(readLocations))];

if (!urls.length) {
  console.error('indexnow: the built sitemaps list no URLs');
  process.exit(1);
}

writeFileSync(outputFile, `${urls.join('\n')}\n`);
console.log(`indexnow: collected ${urls.length} URLs from ${builtSitemaps.length} built sitemap(s)`);
