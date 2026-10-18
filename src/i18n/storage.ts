export const STORAGE_NAMESPACE = 'montagesubs';

export const storageKey = (name: string): string => `${STORAGE_NAMESPACE}:${name}`;

export const LOCALE_STORAGE_KEY = storageKey('locale');
