---
title: Deno Blog - Adding Tags
summary: Tags are a great way to organize your blog posts. In this post, we'll add tags to our blog.
tags: [deno, blog, typescript]
date: '2023-01-16'
---

So, we have our shiny new Deno blog up and running. But, we're missing one key
feature: tags. Tags are a great way to organize your blog posts.

The plan is pretty straightforward, we need to:

- Add a `tags` field to our `Post` type
- Add a `tags` field to our `Post` data
- Update our `getPosts` to filter posts by tag on the homepage
- Add markup to our `PostItem` component to display tags

Lets get to it!

## Adding tags to Posts

Firstly, we need to add a `tags` field to our `Post` type. We'll also add a
`tags` field to our `Post` data.

```md
## // posts/my-first-post.md

---

title: My First Post snippet: This is my first post on my new Deno blog.
publishedAt: 2020-12-01 tags: [deno, blog, TypeScript]

---
```

```tsx
// types.ts
export interface Post {
  slug: string
  title: string
  publishedAt: Date
  draft: boolean
  content: string
  snippet: string
  tags: string[]
}
```

## Filtering posts by tag

Next, we need to update our `getPost` function include tags in the `Post` data.
We'll also update our `getPosts` function to filter posts by tag on the
homepage.

```tsx
// utils/posts.ts
export async function getPosts(tag?: string): Promise<Post[]> {
  const files = await Deno.readDir('./posts')
  const promises = []

  for await (const file of files) {
    const slug = file.name.replace('.md', '')
    promises.push(getPost(slug))
  }

  const posts = (await Promise.all(promises)).filter(
    (post) => post?.publishedAt instanceof Date && !isNaN(post.publishedAt.getTime())
  ) as Post[]

  posts.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime())

  if (tag) {
    return posts.filter((post) => post.tags.includes(tag))
  }

  return posts
}
```

## Displaying tags

Finally, we need to add markup to our `PostItem` component to display tags.

```tsx
// components/PostCard.tsx
export function PostCard(props: { post: Post }) {
  const { post } = props

  return (
    <div class="border(t gray-200) py-8">
      <a class="sm:col-span-2" href={`/${post.slug}`}>
        <h3 class="text(3xl gray-900) font-bold">{post.title}</h3>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <div class="mt-4 text-gray-900">{post.snippet}</div>
      </a>
    </div>
  )
}
```
