# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal site for atarrh.io: blog, photo gallery, about/resume, contact. Static Astro 7 site with MDX, RSS, and sitemap integrations. `compressHTML: true` in `astro.config.mjs` is deliberate: the Astro 7 default (`'jsx'`) drops whitespace at line breaks next to tags, which merges words (it rendered "speaking.I" on the About page). `README.md` is still the Astro starter text and does not describe this project.

## Commands

- `npm run dev` — dev server (also the VS Code launch config)
- `npm run build` — static build to `dist/`; this is the main correctness check
- `npm run preview` — serve the built `dist/`
- `npm run check` — `astro check` type-check, including client `<script>` blocks

There are no tests and no linter. CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run check`, and `npm run build` on every PR and on pushes to `main`. `.nvmrc` sets the Node version for CI and Netlify.

## Architecture

- **Layouts:** every page wraps `SiteLayout` (`src/components/layout/`). It renders `BaseHead` (meta, OG/Twitter tags, RSS link), `Header`, and `Footer`. Props: `title`, `description`, `image` (OG image; defaults to the headshot), `type` (`website` | `article`), and `mainClass` (`contained` by default; the home page uses `fullbleed`). `PortraitLayout` wraps `SiteLayout` for the About page.
- **Site defaults:** `src/consts.ts` holds `SITE_TITLE` and `SITE_DESCRIPTION`. They feed the RSS feed, the RSS `<link>` title, and `SiteLayout` defaults.
- **Blog:** the `blog` collection is defined in `src/content.config.ts` (Markdown/MDX in `src/content/blog/`). Frontmatter: `title`, `description`, `pubDate`, optional `updatedDate`, `heroImage`, `tags`, and `draft`. Every `getCollection('blog', …)` call must pass `isPublished` from `src/utils/posts.ts`: the home page, index, RSS, `[id].astro`, and `tags/[tag].astro` all do this. In dev it shows every post; in production it hides drafts and posts with a future `pubDate`. If one call misses it, a hidden post is listed but has no page.
- **Scheduled publishing:** `.github/workflows/scheduled-deploy.yml` calls a Netlify build hook daily at 14:00 UTC, so future-dated posts go live on their date. It needs the `NETLIFY_BUILD_HOOK` repo secret.
- **Landscape images:** `src/assets/landscapes/` is the shared photo pool. It is globbed once in `src/utils/landscapes.ts`. The photo page shows all of them. Blog posts get a stable hero from that pool via `pickLandscape` (rendezvous hashing in `src/utils/hashUtils.ts`), so adding a photo moves few post heroes. The `heroImage` frontmatter field is not used for rendering at the moment.
- **Images:** put photos in `src/assets/` so Astro optimizes them (`<Image>` / `getImage()`). Files in `public/` are served as-is. The photo lightbox uses `getImage()` copies capped at 2000px wide.
- **Styles:** global tokens and shared classes (`.prose`, `.contained`, `.u-animlink`, `.sr-only`) are in `src/styles/global.css`. Component styles are scoped with `data-astro-cid` attributes, so a parent's scoped selector does not reach elements inside a child component. Anchor it on the parent's own element with `:global(...)`, as `Header`/`Footer` do for `SocialLinks`.
- **Path alias:** `@/*` → `src/*` (from `tsconfig.json`).
- **Nav and projects:** nav links are one `links` array in `Header.astro`, used by both the desktop row and the mobile dropdown (below 640px). The Projects page renders `src/data/projects.ts` with `ProjectCard`; edit the data file to change entries. Private repos get no links.
- **Contact form:** `src/pages/contact.astro` uses Netlify Forms attributes (`data-netlify`, honeypot field). There is no backend code.
