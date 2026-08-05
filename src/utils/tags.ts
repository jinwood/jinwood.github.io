import type { CollectionEntry } from 'astro:content'

export function getPostsByTag(posts: CollectionEntry<'blog'>[], tag: string) {
  return posts.filter((post) =>
    post.data.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(posts: CollectionEntry<'blog'>[]) {
  const tags = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags.set(tag, (tags.get(tag) ?? 0) + 1)
    }
  }
  return [...tags.entries()].sort((a, b) => b[1] - a[1])
}
