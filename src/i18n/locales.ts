export const languages = {
  'zh-hans': '简体中文',
  'en': 'English',
} as const;

export type Lang = keyof typeof languages;

export const htmlLangTags: Record<Lang, string> = {
  'zh-hans': 'zh-Hans',
  'en': 'en',
};

export const supportedLangs = Object.keys(languages) as Lang[];
export const defaultLang: Lang = 'zh-hans';
export const fallbackLang: Lang = 'en';

export function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages;
}
