import { socialLinks } from '../data/social';
import { htmlLangTags, languages, supportedLangs, type Lang } from '../i18n/locales';
import { siteName } from './site';

const profiles: Record<Lang, { slogan: string; description: string }> = {
  'zh-hans': {
    slogan: '用爱发电',
    description: '非营利、开源的字幕社区，连接观众、译者、开发者与影视工作者，共同构建开放、透明的字幕生态。',
  },
  en: {
    slogan: 'Powered by Love ❤',
    description: 'A nonprofit, open-source subtitle community that connects viewers, translators, developers and filmmakers.',
  },
};

const localize = (lang: Lang | undefined, field: 'slogan' | 'description') =>
  lang
    ? profiles[lang][field]
    : supportedLangs.map((code) => ({ '@language': htmlLangTags[code], '@value': profiles[code][field] }));

export function buildOrganization(siteURL: URL, lang?: Lang) {
  return {
    '@type': 'Organization',
    '@id': `${siteURL.href}#organization`,
    name: siteName,
    alternateName: '蒙太奇字幕社区',
    slogan: localize(lang, 'slogan'),
    description: localize(lang, 'description'),
    url: siteURL.href,
    logo: {
      '@type': 'ImageObject',
      url: new URL('/android-chrome-512x512.png', siteURL).href,
      width: 512,
      height: 512,
    },
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function buildWebSite(siteURL: URL) {
  return {
    '@type': 'WebSite',
    '@id': `${siteURL.href}#website`,
    name: siteName,
    url: siteURL.href,
    inLanguage: supportedLangs.map((code) => htmlLangTags[code]),
    publisher: { '@id': `${siteURL.href}#organization` },
  };
}

export function buildLanguageGateway(siteURL: URL, description: string) {
  const editions = supportedLangs.map((code, index) => {
    const url = new URL(`/${code}/`, siteURL).href;
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: languages[code],
        inLanguage: htmlLangTags[code],
        isPartOf: { '@id': `${siteURL.href}#website` },
      },
    };
  });

  return [
    {
      '@type': ['WebPage', 'CollectionPage'],
      '@id': `${siteURL.href}#webpage`,
      url: siteURL.href,
      name: siteName,
      description,
      isPartOf: { '@id': `${siteURL.href}#website` },
      about: { '@id': `${siteURL.href}#organization` },
      mainEntity: { '@id': `${siteURL.href}#languages` },
    },
    {
      '@type': 'ItemList',
      '@id': `${siteURL.href}#languages`,
      name: 'Select Language',
      numberOfItems: editions.length,
      itemListElement: editions,
    },
  ];
}
