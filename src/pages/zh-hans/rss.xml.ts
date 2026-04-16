import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog', ({ data }) =>
    data.lang === 'zh-hans' && !data.draft
  );

  return rss({
    title: '蒙太奇字幕社区博客',
    description: '翻译笔记、技术研究、字幕行业见解',
    site: context.site ?? 'https://montagesubs.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description ?? '',
      author: post.data.author,
      link: `/zh-hans/learn/blog/${post.slug.replace('zh-hans/', '')}/`,
    })),
    customData: '<language>zh-hans</language>',
  });
};
