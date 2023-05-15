---
title: Building a blog with Deno
summary: Deno is a new JavaScript runtime that is gaining popularity among developers due to its speed, security, and simplicity. In this blog post, I will show you how to build a simple blog site using Deno and Fresh, a popular web framework for Deno.
tags: [deno, blog, typescript]
date: '2023-01-12'
---

[Deno](https://deno.land) is a relatively new JavaScript and TypeScript runtime
that has been making waves in the development community. It's built on the same
V8 JavaScript engine that powers Google Chrome and is designed to be a modern,
secure, and performant alternative to Node.js. But, what makes Deno stand out is
that it doesn't use package managers like npm and yarn, but instead, it lets you
import modules directly from a URL. I've been interested in trying it out since
its release back in May 2020 and decided to take the plunge this week and
actually build something.

Rather than build absolutely everything from scratch, I'm utilising
[Fresh](https://fresh.deno.dev), a next-generation web framework which has some
really cool features like island hydration, server-side rendering and an
extremely lightweight runtime (no JavaScript shipped OOTB).

This is not going to be an exhaustive guide, more a high-level overview of the
changes you'll need to make to get features like Markdown rendering.

So, to get started, make sure you have a recent version of Deno installed and
then run the following command:

```bash
deno run -A -r https://fresh.deno.dev my-fresh-blog
```

This will create a new directory called `my-fresh-blog`. `cd` into it and run
`deno task start` and your new app will be up and running.

## Reading Markdown files

You can leave the default directories and files if you like, the most important
thing is to create a new module somewhere for all your markdown concerns. In my
project, this is in `utils/posts.ts`. This file will contain two functions,
`getPosts` and `getPost`. No prizes for guessing what each of them does.

```ts
import { extract } from 'https://deno.land/std@0.171.0/encoding/front_matter.ts'
import { join } from '$std/path/mod.ts'

export interface Post {
  slug: string
  title: string
  publishedAt: Date
  draft: boolean
  content: string
  snippet: string
}

export async function getPosts(): Promise<Post[]> {
  const files = await Deno.readDir('./posts')
  const promises = []

  for await (const file of files) {
    const slug = file.name.replace('.md', '')
    console.log(slug)
    promises.push(getPost(slug))
  }

  const posts = (await Promise.all(promises)).filter(
    (post) => post?.publishedAt instanceof Date && !isNaN(post.publishedAt.getTime())
  ) as Post[]
  posts.sort((a, b) => a.publishedAt.getTime() - b.publishedAt.getTime())
  return posts
}

export async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(join('posts/', `${slug}.md`))
  const { attrs, body } = extract<Post>(text)
  return {
    slug,
    title: attrs.title,
    draft: attrs.draft,
    publishedAt: new Date(attrs.publishedAt),
    content: body,
    snippet: attrs.snippet,
  }
}
```

`getPosts` reads all the files in the `posts` directory and return an array of
`Post`s. `getPost` takes a slug (url fragment) and returns a single `Post` based
off that slug.

## Rendering posts on the homepage

In a typical blog, the index route will list posts in chronological order. Lets
modify the `index.tsx` file to do just that.

First, add a handler to get the posts.

```tsx
// index.tsx
export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts()
    return ctx.render(posts)
  },
}
```

Then add a `PostItem` component to render each post.

```tsx
// index.tsx
export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data
  return (
    <main class="mx-auto max-w-screen-md px-4 pt-16">
      <h1 class="text-5xl font-bold">Blog</h1>
      <div class="mt-8">
        {posts.map((post) => (
          <PostItem post={post} />
        ))}
      </div>
    </main>
  )
}

function PostItem(props: { post: Post }) {
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

## Rendering a single post

In your `routes` directory, create a new file called `[slug].tsx`. This will be
entry point for our blog posts. If your boilerplate project includes a
`[names].tsx` file, you will need to remove this or it will intercept requests
and generally get in the way.

We then need a handler function that will read treat the slug as a parameter and
return the matching post. You can read more about routing in Fresh
[here](https://fresh.deno.dev/docs/concepts/routing).

```ts
// [slug].tsx
// import getPost from your posts module
import { Handlers, PageProps } from 'https://deno.land/x/fresh@1.1.2/server.ts'

export const handler: Handlers = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug)
    if (!post) return ctx.renderNotFound()
    return ctx.render(post)
  },
}
```

Finally, we will need a Post page to render the post.

```tsx
// [slug].tsx
export default function PostPage(props: PageProps<Post>) {
  const post = props.data
  return (
    <main class="mx-auto max-w-screen-md px-4 pt-16">
      <h1 class="text-5xl font-bold">{post.title}</h1>
      <time class="text-gray-500">
        {new Date(post.publishedAt).toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <div class="mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  )
}
```

In your `posts`, create a new file called `first-post.md` and add the following
content:

```md
---
title: First post
publishedAt: 2021-01-08
snippet: This is the first post
---

Hello world! **This is my first post**.
```

Now, run `deno task start` and visit `http://localhost:8000/` to see your
homepage along with a preview of your first post. Click the post title to
navigate to the full post.

You will notice an issue, the markdown is not being parsed. We will fix this in
the next section.

## Parsing markdown

We will utilize the module `gfm` to parse our posts.

In `routes/[slug].tsx`, import both `CSS` and `render` functions from `gfm`,
along with `Head` from `fresh`.

```tsx
import { CSS, render } from 'https://deno.land/x/gfm@0.1.26/mod.ts'
import { Head } from 'https://deno.land/x/fresh@1.1.2'
```

Update our `PostPage` component to use `render` to parse the markdown.

```tsx
export default function PostPage(props: PageProps) {
  const post = props.data
  return (
    <>
      <Head>
        <style>{CSS}</style>
        <style>
          {`
					// put your custom styles here
          .markdown-body a{
            color: #0070f3;
          `}
        </style>
      </Head>

      <main class="mx-auto max-w-screen-md px-4 pt-16">
        <h1 class="text-5xl font-bold">{post.title}</h1>
        <time class="text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <div class="">
          <div
            class="markdown-body mt-8"
            dangerouslySetInnerHTML={{ __html: render(post.content) }}
          />
        </div>
      </main>
    </>
  )
}
```

Reload your page and you should be able to see your post with proper markdown
styling!

That's it for now. If you want to deploy your new blog, I'd strongly recommend
checking out deno edge. It's free and extremely easy to use. Check it out
[here](https://dash.deno.com/login?redirect=%2Fprojects).

I'll be adding more features to this project in the future, so stay tuned!
