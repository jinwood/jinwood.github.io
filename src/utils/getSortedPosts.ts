import type { CollectionEntry } from 'astro:content'

export type BlogPost = CollectionEntry<'blog'>

export function getSortedPosts(posts: BlogPost[]): BlogPost[] {
  return posts
    .filter((post) => !post.data.draft && post.data.date)
    .sort((a, b) => (a.data.date! < b.data.date! ? 1 : -1))
}
