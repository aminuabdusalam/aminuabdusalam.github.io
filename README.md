# Aminu Abdusalam

Source for [aminuabdusalam.github.io](https://aminuabdusalam.github.io), my personal portfolio and writing site.

The site brings together selected product, engineering, data, and applied AI work alongside side projects, writing, and the experiences that shaped how I build.

## Built with

- [Astro](https://astro.build)
- TypeScript
- Content collections for projects and writing
- GitHub Pages and GitHub Actions

## Local development

This project requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:4321`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
public/
  projects/       Project imagery
src/
  components/     Shared interface components
  content/        Project and writing entries
  layouts/        Shared page layouts
  pages/          Site routes
  styles/         Design tokens and global styles
```

## Deployment

Merges to `main` deploy automatically to GitHub Pages through `.github/workflows/deploy.yml`.
