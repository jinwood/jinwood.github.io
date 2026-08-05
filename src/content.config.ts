import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    summary: z.string().default(''),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    images: z.array(z.string()).default([]),
  }),
})

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    occupation: z.string(),
    company: z.string(),
    email: z.string().email(),
    linkedin: z.string().url(),
    github: z.string().url(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    imgSrc: z.string().optional(),
    href: z.string().optional(),
    images: z.array(z.object({ url: z.string(), alt: z.string() })).default([]),
    featured: z.boolean().default(false),
  }),
})

export const collections = { blog, authors, projects }
