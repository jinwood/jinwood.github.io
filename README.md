# jinwood.github.io

Personal site and blog, built with [Astro](https://astro.build), Tailwind CSS 4, and TypeScript. Deployed as a static site to GitHub Pages.

## Stack

- [Astro](https://astro.build) 5 — static output
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- TypeScript (checked with `astro check`)
- MDX + content collections for all content
- Shiki syntax highlighting
- `@astrojs/rss` for feeds, `@astrojs/sitemap` for sitemaps

## Development

```bash
bun install
bun run dev        # local dev server
bun run build      # build static site to dist/
bun run preview    # serve the built site
bun run check      # typecheck + content schema validation
```

## Writing a post

```bash
bun run compose "My new post"
```

This scaffolds `src/content/blog/<slug>.md` with a `draft: true` frontmatter. Drafts are excluded from the build until you remove the flag.

## Content

All content lives in `src/content/` as Astro content collections, validated by `src/content.config.ts`:

| Collection | Path | Frontmatter |
| --- | --- | --- |
| Blog posts | `src/content/blog/*.md` | `title`, `date`, `summary`, `tags[]`, `draft`, `images[]` |
| Author / CV | `src/content/authors/*.md` | `name`, `avatar`, `occupation`, `company`, `email`, `linkedin`, `github` |
| Projects | `src/content/projects/*.md` | `title`, `description`, `imgSrc`, `href`, `images[]`, `featured` |

## Deployment

GitHub Actions (`.github/workflows/astro.yml`) builds on push to `master` and deploys `dist/` to GitHub Pages.

## Layout

- `src/pages/` — routes (home, about, projects, blog, tags)
- `src/layouts/` — page layouts (Base, Post, About, List)
- `src/components/` — Header, Footer, theme toggle, project cards
- `src/utils/` — sorting, tag helpers, date formatting
