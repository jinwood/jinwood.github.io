import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getSortedPosts } from '../utils/getSortedPosts'
import { siteConfig } from '../siteConfig'

export async function GET(context: APIContext) {
  const posts = getSortedPosts(await getCollection('blog'))
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date ?? new Date(),
      description: post.data.summary,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-gb</language>`,
  })
}
