import { readFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { INDEXNOW_KEY_PATTERN } from '../../src/config/indexNowKey.js';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10000;
const KEY_CHECK_ATTEMPTS = 6;
const KEY_CHECK_DELAY_MS = 5000;
const ACCEPTED_STATUSES = new Set([200, 202]);

const fail = (message) => {
  console.error(`indexnow: ${message}`);
  process.exit(1);
};

const key = process.env.INDEXNOW_KEY?.trim() ?? '';
const [urlFile] = process.argv.slice(2);
if (!urlFile) fail('usage: INDEXNOW_KEY=<key> submit-indexnow.mjs <url-file>');
if (!INDEXNOW_KEY_PATTERN.test(key)) fail('INDEXNOW_KEY must be 8-128 characters of letters, digits or dashes');

const urls = readFileSync(urlFile, 'utf8').split('\n').filter(Boolean);
if (!urls.length) fail('the URL file is empty');

const { origin, host } = new URL(urls[0]);
const urlList = urls.filter((url) => new URL(url).origin === origin);
const keyLocation = `${origin}/${key}.txt`;

async function keyIsPublished() {
  for (let attempt = 0; attempt < KEY_CHECK_ATTEMPTS; attempt++) {
    const response = await fetch(keyLocation, { cache: 'no-store' }).catch(() => null);
    if (response?.ok && (await response.text()).trim() === key) return true;
    await delay(KEY_CHECK_DELAY_MS);
  }
  return false;
}

if (!(await keyIsPublished())) fail('the key file is not reachable at the published key location');

for (let start = 0; start < urlList.length; start += BATCH_SIZE) {
  const batch = urlList.slice(start, start + BATCH_SIZE);
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
  });
  if (!ACCEPTED_STATUSES.has(response.status)) {
    const reason = (await response.text().catch(() => '')).slice(0, 300);
    fail(`submission rejected with HTTP ${response.status} ${reason}`.trim());
  }
  console.log(`indexnow: submitted ${batch.length} URLs (HTTP ${response.status})`);
}
