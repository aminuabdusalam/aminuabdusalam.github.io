# aminuabdusalam.com - Implementation Plan

Living plan for the personal website. Update as decisions are made.

---

## Stack

- **Framework**: Astro 5 (minimal TS template)
- **Styling**: Vanilla CSS with design tokens (no Tailwind)
- **Content**: Astro Content Collections (typed markdown for blog + projects)
- **Hosting**: `aminuabdusalam.github.io` on personal GH account, later custom domain
- **Deploy**: GitHub Actions -> GitHub Pages

---

## Site Architecture

```
src/
├── layouts/
│   └── BaseLayout.astro          # HTML shell, meta, dark mode default
├── components/
│   ├── Nav.astro                 # Top nav
│   ├── Footer.astro              # Social links, copyright
│   ├── Hero.astro                # Landing splash
│   ├── ProjectCard.astro
│   ├── ExperienceItem.astro
│   └── PostCard.astro
├── content/
│   ├── config.ts                 # Zod-typed collection schemas
│   ├── projects/                 # Markdown, one per project
│   └── writing/                  # Markdown, one per post
├── pages/
│   ├── index.astro               # Hero + featured projects + latest posts
│   ├── about.astro               # Long-form bio, timeline
│   ├── projects/index.astro      # All projects grid
│   ├── writing/index.astro       # Blog list
│   ├── writing/[slug].astro      # Post template
│   └── 404.astro                 # Playful custom 404
├── styles/
│   ├── global.css                # Reset, typography
│   └── tokens.css                # Colors, spacing, fonts
```

---

## Design System

- **Palette**: Dark mode default. Bg `#0a0e1a`, text `#c8d0e0`, accent TBD
- **Typography**: Inter (body) + JetBrains Mono (accents/code)
- **Micro-interactions**: Cursor spotlight (Brittany Chiang), subtle hover glow, magnetic buttons
- **Inspiration**: brittanychiang.com (portfolio-first) + josh.wcomeau.com (playful)

---

## Content Sections

- **Nav**: Home / About / Projects / Writing
- **Home**: Hero splash, 3 featured projects, 3 latest posts
- **About**: Bio (from elevator-pitch.md), career timeline (Fisk -> Vanderbilt -> Zune-era? -> Microsoft), interests
- **Projects**: Grid of projects across college + Microsoft + side projects
- **Writing**: Long-form posts, short-form ramblings, thoughts on tech/life

---

## Design Decisions

| Decision | Status | Value |
|---|---|---|
| Accent color | ✅ | Viridian `#40826D` |
| Hero tone | ✅ | Hybrid: conversational headline + terminal-styled "currently" block below |
| Blog section name | ✅ | "Writing" |
| Personal git email | ✅ | aminuabdusalam2019@gmail.com |
| Local project path | ✅ | C:\Users\aabdusalam\personal\website |
| Custom domain | Later | Start with .github.io, add domain via CNAME later |

---

## Build Phases (see todos table for live status)

1. ✅ **Foundation** - Design tokens, BaseLayout, Nav, Footer, global styles
2. ✅ **Home page** - Hero, featured projects preview, latest posts preview
3. ✅ **About page** - Bio + career timeline
4. ✅ **Content collections** - Schemas for `projects/` and `writing/` (Astro v6 loader-based)
5. ✅ **Projects page** - Grid of all projects
6. ✅ **Writing pages** - Blog list + post template, seed 1 sample post
7. ✅ **404 page** - Playful terminal-style page
8. ✅ **GH Actions deploy** - `.github/workflows/deploy.yml`
9. 🚧 **Local git init + personal account config** - IN PROGRESS
10. ⏳ **Populate content** - Real experience from resume, real projects from GitHub
11. ⏳ **Later** - Custom domain, OG image generation, RSS feed, analytics

---

## Personal GitHub Account Setup

Corp browser sign-in doesn't affect git CLI. For this repo specifically:

```powershell
cd C:\Users\aabdusalam\personal\website
git init
git config user.name "Aminu Abdusalam"
git config user.email "aminuabdusalam2019@gmail.com"
```

Then create `aminuabdusalam.github.io` on personal GH account (via web, incognito or logged out of corp).
Auth options:
- **HTTPS + PAT**: Simplest. Generate token at github.com/settings/tokens (Classic, `repo` scope).
- **SSH**: Cleaner long-term. Separate SSH key for personal account, alias via `~/.ssh/config`.

---

## Commands

```bash
npm run dev       # local dev server at http://localhost:4321
npm run build     # production build to ./dist
npm run preview   # serve built site locally
```

---

## Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) builds site on push to `main` and deploys `./dist` to GitHub Pages.
Enable Pages in repo settings: Source = GitHub Actions.
