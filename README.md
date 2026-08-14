# Yuning Gu — Academic Portfolio & Blog

Bilingual academic portfolio and blog, built with Next.js, statically exported,
and deployed to a self-hosted VPS with Caddy. 中文部署文档见 [`deploy/DEPLOY.md`](deploy/DEPLOY.md)。

## Content structure

- `src/lib/site-content.ts` — shared profile, education, experience, publication, and homepage content
- `src/lib/blog.ts` — blog content pipeline (reads MDX posts)
- `content/blog/en` · `content/blog/zh` — blog posts, one MDX file per language (paired by filename)
- `src/components/home` — homepage sections
- `src/components/layout` — navigation, theme, and site frame
- `src/app/[lang]` — English and Chinese routes, including `/blog`
- `src/app/globals.css` — responsive visual system, light/dark themes, and blog typography
- `scripts/generate-feed.mjs` — generates `public/feed.xml` (RSS) before every build
- `deploy/` — Caddyfile, one-shot server setup script, Docker alternative, and the full deployment guide

## Writing a post

Create `content/blog/<en|zh>/<slug>.mdx` with YAML front matter
(`title`, `description`, `date`, optional `updated`, `tags`, `draft`).
Markdown + GFM tables, syntax-highlighted code blocks, and MDX components are supported.
The same filename in both language folders links the translations; a missing
translation shows a friendly fallback panel. See the on-site guide
*“Writing a post on this site”* for the full manual.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static site is generated in `out/`, and `public/feed.xml` is regenerated
automatically (prebuild hook). Pushes to `main` build in GitHub Actions and
rsync `out/` to the server — see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
and [`deploy/DEPLOY.md`](deploy/DEPLOY.md).

## Site URL

The canonical domain comes from `NEXT_PUBLIC_SITE_URL` at build time
(fallback: `https://yingqiu.me`, editable in `src/lib/site-content.ts`):

```bash
NEXT_PUBLIC_SITE_URL=https://yingqiu.me npm run build
```
