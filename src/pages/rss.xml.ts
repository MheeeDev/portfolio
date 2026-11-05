import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { categoryLabel, getPosts, url } from '../lib';
import { site } from '../site';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  return rss({
    title: `${site.name} — Blog`,
    description: 'Articles on PLC, SCADA, OT/IT integration and AI tools for automation work.',
    site: context.site!,
    trailingSlash: true,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: url(`blog/${p.id}/`),
      categories: [categoryLabel(p.data.category), ...p.data.tags],
    })),
    customData: '<language>th</language>',
  });
}
