import resolveLocaleSource from './inline/resolveLocale.js?raw';
import { fallbackLang, supportedLangs } from './locales';
import { LOCALE_STORAGE_KEY } from './storage';

const resolverCall = `(${resolveLocaleSource})(${JSON.stringify({ supported: supportedLangs, storageKey: LOCALE_STORAGE_KEY })})`;

export function renderGatewayScript(subPath: string): string {
  return `(function () {
  var locale = ${resolverCall};
  if (locale) location.replace('/' + locale + '/' + ${JSON.stringify(subPath)} + location.search + location.hash);
})();`;
}

export function renderNotFoundScript(): string {
  return `(function () {
  var supported = ${JSON.stringify(supportedLangs)};
  var prefix = location.pathname.split('/')[1];
  var locale = supported.indexOf(prefix) !== -1 ? prefix : ${resolverCall};
  if (locale && locale !== prefix) {
    location.replace('/' + locale + location.pathname + location.search + location.hash);
    return;
  }
  var active = locale || ${JSON.stringify(fallbackLang)};
  document.querySelectorAll('[data-locale-block]').forEach(function (block) {
    var current = block.dataset.localeBlock === active;
    block.hidden = !current;
    if (current) {
      document.documentElement.lang = block.lang;
      document.title = block.dataset.title;
    }
  });
})();`;
}
