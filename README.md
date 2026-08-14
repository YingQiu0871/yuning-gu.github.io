# Yuning Gu — Academic Portfolio

Bilingual academic portfolio built with Next.js, statically exported, and deployed
to a self-hosted VPS with Caddy at [yingqiu.me](https://yingqiu.me).
The blog is a **separate site** at [blog.yingqiu.me](https://blog.yingqiu.me)
(own repository, own deployment). 中文部署文档见 [`deploy/DEPLOY.md`](deploy/DEPLOY.md)。

## Content structure

- `src/lib/site-content.ts` — shared profile, education, experience, publication, and homepage content
- `src/components/home` — homepage sections
- `src/components/layout` — navigation, theme, and site frame
- `src/app/[lang]` — English and Chinese routes
- `src/app/globals.css` — responsive visual system and light/dark themes
- `deploy/` — Caddyfile (both sites), one-shot server setup script, Docker alternative, and the deployment guide

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static site is generated in `out/`. Pushes to `main` build in GitHub Actions and
rsync `out/` to the server — see [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
and [`deploy/DEPLOY.md`](deploy/DEPLOY.md).

## Site URL

The canonical domain comes from `NEXT_PUBLIC_SITE_URL` at build time
(fallback: `https://yingqiu.me`, editable in `src/lib/site-content.ts`):

```bash
NEXT_PUBLIC_SITE_URL=https://yingqiu.me npm run build
```
