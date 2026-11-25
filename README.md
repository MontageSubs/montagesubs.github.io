# MontageSubs

<div align="right">

**[中文](./README.zh-hans.md) | English**

</div>

The official website of MontageSubs, a nonprofit, open-source subtitle community that connects viewers, translators, developers and filmmakers.

🌐 Live: <https://subs.js.org>

---

## Tech Stack

- [Astro 4](https://astro.build/) + TypeScript (static site generation)
- [Tailwind CSS 3](https://tailwindcss.com/) (styling)
- [Pagefind](https://pagefind.app/) (site search, injected after the build)
- Deployment: GitHub Pages, built automatically by GitHub Actions (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml))

---

## Local Development

Requires Node 20+.

```bash
npm install
npm run dev          # start the dev server (http://localhost:4321 by default)
npm run build        # build to dist/
npm run preview      # preview the build output
```

---

## Project Structure

```
src/
├── pages/
│   ├── zh-hans/             Simplified Chinese pages (default language)
│   └── en/                  English pages
├── components/              Shared components (Header / Footer / Hero / ...)
├── layouts/
│   ├── BaseLayout.astro     Site-wide shell: head / announcement bar / Header / Footer / motion
│   └── LocaleGateway.astro  Language selection page for paths without a language prefix
├── content/
│   ├── config.ts            Content collection schema (Zod)
│   └── blog/                Blog markdown, one folder per language
├── config/
│   ├── icons.ts             Icon URL version (bump it whenever the icons change)
│   ├── indexNowKey.js       IndexNow key format shared by the build and the submit script
│   ├── indexing.ts          Routes excluded from search indexing
│   └── structuredData.ts    JSON-LD builders (Organization / WebSite / language gateway)
├── integrations/
│   ├── emitIndexNowKey.ts   Emits the IndexNow key file when INDEXNOW_KEY is set
│   └── mirrorSitemapIndex.ts  Copies sitemap-index.xml to sitemap.xml after build
├── data/
│   ├── projects.ts          Subtitle project data
│   ├── tools.ts             Tool data
│   ├── community.ts         Member data
│   └── social.ts            Social platforms and external links
├── i18n/
│   ├── index.ts             Bilingual key map (flat structure)
│   ├── locales.ts           Language list with default and fallback languages
│   ├── storage.ts           Browser storage key namespace (montagesubs:)
│   ├── routes.ts            Route enumeration for the language gateway pages
│   ├── inlineScripts.ts     Inline script rendering for the gateway and 404 pages
│   └── inline/              Inline script sources (language resolution)
├── styles/
│   └── global.css           Global styles and animation primitives
└── env.d.ts

public/                      Static assets (favicons, platform icons, robots.txt, llms.txt)
.github/workflows/deploy.yml Deployment pipeline
.github/scripts/             IndexNow URL collection and submission
astro.config.mjs             Astro configuration (including the sitemap; sitemap.xml mirrors sitemap-index.xml)
tailwind.config.mjs          Design tokens (colours / type sizes / spacing)
```

---

## Adding Content

### Writing a Blog Post

Create a markdown file under `src/content/blog/zh-hans/` (or `en/`):

```markdown
---
title: Post title
date: 2026-05-02
lang: en
author: your-id
has_translation: false
tags: [tag1, tag2]
description: Summary (used for RSS and Open Graph)
draft: false
---

Body…
```

The file path decides the URL: `src/content/blog/en/hello-world.md` → `/en/learn/blog/hello-world/`

---

## Enabling IndexNow

Set the repository variable `INDEXNOW_KEY` (Settings → Secrets and variables → Actions → Variables) to a string of 8–128 letters, digits or dashes. While it is empty, IndexNow stays off. Once set, every deploy publishes `/<key>.txt` and then submits the pages listed in this repository's own sitemap; the sitemaps of the other tools under the same domain are not included.

---

## Updating the Icons

The icons are generated from the flat logo in the [brand assets](https://github.com/MontageSubs/brand-assets). After replacing the files in `public/`, bump `iconVersion` in `src/config/icons.ts` so browsers and search engines fetch the new files instead of reusing cached ones.

---

<div align="center">

**MontageSubs**  
Powered by Love ❤

</div>
