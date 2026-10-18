import { getCollection } from 'astro:content';

const pageFiles = Object.keys(import.meta.glob('../pages/*/**/*.astro'));
const PAGES_ROOT = '../pages/';

function toRoute(file: string): string {
  return file
    .slice(PAGES_ROOT.length)
    .split('/')
    .slice(1)
    .join('/')
    .replace(/\.astro$/, '')
    .replace(/(^|\/)index$/, '');
}

export async function listLocalizedRoutes(): Promise<string[]> {
  const pages = pageFiles.map(toRoute).filter((route) => !route.includes('['));
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const blogRoutes = posts.map((post) => `learn/blog/${post.slug.split('/').slice(1).join('/')}`);
  return [...new Set([...pages, ...blogRoutes])].sort();
}
