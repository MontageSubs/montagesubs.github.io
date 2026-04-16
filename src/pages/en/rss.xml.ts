import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog', ({ data }) =>
    data.lang === 'en' && !data.draft
  );

  return rss({
    title: 'MontageSubs Blog',
    description: 'Translation notes, technical research, subtitle industry insights',
    site: context.site ?? 'https://montagesubs.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? '',
      author: post.data.author,
      link: `/en/learn/blog/${post.slug.replace('en/', '')}/`,
    })),
    customData: '<language>en</language>',
  });
};
