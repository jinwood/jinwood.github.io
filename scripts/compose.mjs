import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const title = process.argv.slice(2).join(' ')
if (!title) {
  console.error('Usage: bun compose "My post title"')
  process.exit(1)
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

const date = new Date().toISOString().slice(0, 10)

const frontmatter = `---
title: ${title}
summary: ''
tags: []
date: '${date}'
draft: true
---

`

const dir = join(process.cwd(), 'src/content/blog')
mkdirSync(dir, { recursive: true })
const file = join(dir, `${slug}.md`)
writeFileSync(file, frontmatter, 'utf8')
console.log(`Created ${file}`)
