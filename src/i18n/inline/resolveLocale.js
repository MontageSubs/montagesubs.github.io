function resolveLocale({ supported, storageKey }) {
  const traditionalRegions = ['tw', 'hk', 'mo'];

  const parse = (tag) => {
    const [language, ...subtags] = tag.split(';')[0].trim().replace(/_/g, '-').toLowerCase().split('-');
    const region = subtags.find((subtag) => /^([a-z]{2}|\d{3})$/.test(subtag));
    const script =
      subtags.find((subtag) => /^[a-z]{4}$/.test(subtag)) ||
      (language === 'zh' ? (traditionalRegions.includes(region) ? 'hant' : 'hans') : undefined);
    return { language, script, region };
  };

  const match = (tag) => {
    const wanted = parse(tag);
    const family = supported.filter((code) => parse(code).language === wanted.language);
    return (
      family.find((code) => wanted.script && parse(code).script === wanted.script) ||
      family.find((code) => wanted.region && parse(code).region === wanted.region) ||
      family[0]
    );
  };

  try {
    const saved = localStorage.getItem(storageKey);
    if (supported.includes(saved)) return saved;
  } catch (error) {}

  const preferences = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
  for (const tag of preferences) {
    const resolved = tag && match(tag);
    if (resolved) return resolved;
  }
  return undefined;
}
