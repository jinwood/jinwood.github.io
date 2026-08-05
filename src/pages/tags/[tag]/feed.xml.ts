import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { getSortedPosts } from '../../../utils/getSortedPosts'
import { kebabCase } from '../../../utils/kebabCase'
import { siteConfig } from '../../../siteConfig'

export async function getStaticPaths() {
  const posts = getSortedPosts(await getCollection('blog'))
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))]
  return tags.map((tag) => ({ params: { tag: kebabCase(tag) } }))
}

export async function GET(context: APIContext) {
  const tag = context.params.tag!
  const posts = getSortedPosts(await getCollection('blog')).filter((post) =>
    post.data.tags.some((t) => kebabCase(t) === tag)
  )
  return rss({
    title: `${tag} posts | ${siteConfig.title}`,
    description: `${tag} tags - ${siteConfig.author}`,
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
