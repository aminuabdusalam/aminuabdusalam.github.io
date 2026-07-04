# Deployment Notes

How this site gets built and shipped, and how other infra options compare.

## Mental model

Astro is a **static site generator** — it turns `.astro` and `.md` files into plain HTML/CSS/JS. Two separate jobs are needed:

1. **Build** — run `npm run build`, which produces a `dist/` folder full of static files.
2. **Host** — serve those files from a public URL.

We use two GitHub services for those two jobs.

---

## 1. GitHub Actions (the build robot)

When `git push` hits `main`, GitHub spins up a **fresh Ubuntu VM** and runs `.github/workflows/deploy.yml`:

```
- actions/checkout@v4        → clone the repo into the VM
- withastro/action@v3        → install Node 22, run `npm ci`, run `astro build`
                             → package the resulting `dist/` folder as a "Pages artifact"
- actions/deploy-pages@v4    → hand that artifact to GitHub Pages
```

The VM is destroyed after each run. Every push builds from scratch — nothing is cached in the deploy pipeline unless we explicitly opt in.

**Why we pinned `node-version: 22`**: Astro 7+ requires Node ≥22.12. The `withastro/action@v3` default of Node 20 caused the first deploy to fail.

## 2. GitHub Pages (the file host)

A dumb CDN with a fancy name. It takes the artifact from Actions, distributes it to edge servers globally, and serves `index.html` when a browser hits your URL. No servers, no runtime, no database. Just files.

**The `.github.io` naming rule**: A repo named `<username>.github.io` is auto-hosted at that exact hostname. Any other repo (e.g. `my-blog`) would get served at `<username>.github.io/my-blog` — which is why `astro.config.mjs` has a `base` field (kept as `/` since this is the user-page repo).

---

## How other infra would compare

| Platform | Build step | Hosting | What changes for us |
|---|---|---|---|
| **GitHub Pages + Actions** (this repo) | GH Actions | GH CDN | Free forever, GitHub-native, workflow lives in repo |
| **Vercel** | Vercel's auto-detecting builder | Vercel edge | Delete `deploy.yml`, connect repo in Vercel dashboard, done. Faster builds. Free tier can rate-limit |
| **Netlify** | Netlify's builder | Netlify CDN | Same as Vercel. `netlify.toml` optional. Preview URLs per PR |
| **Cloudflare Pages** | CF builder | CF edge (biggest CDN) | Same pattern. Fastest global performance, best free tier |
| **AWS S3 + CloudFront** | BYO CI | S3 (files) + CloudFront (CDN) | Way more setup: `aws s3 sync`, invalidation, IAM, cert manager. Cheap at scale, painful to bootstrap |
| **Azure Static Web Apps** | Azure builder | Azure CDN | Similar to Vercel. Auto-provisions API routes. Enterprise-friendly |
| **Fly.io / Render / Railway** | Docker/buildpack | Their platform | Overkill for static — these are for apps that run servers |
| **Self-hosted (nginx on a VPS)** | Cron or manual | Your box | `rsync dist/ user@host:/var/www/`. Full control, full pain |

**What stays the same everywhere**: the Astro build (`npm run build` → `dist/`) is identical. Content is portable — migrating to any host is an afternoon of work.

---

## Serverless functions (why they'd matter)

A **serverless function** is a small chunk of backend code that only runs when called, then goes back to sleep. The platform spins up a temporary runtime for a few milliseconds, executes your code, returns a response, and shuts down. You pay per invocation (usually pennies per million calls).

**On a personal site, they enable things like:**

- **Contact form** — visitor submits `/api/contact`, function emails via SendGrid/Resend
- **Newsletter signup** — function writes to Mailchimp/Buttondown/ConvertKit
- **Comment system** — read/write from a lightweight DB (Turso, Neon, Supabase)
- **Guestbook** — same shape as comments
- **Full-text search over posts** — function hits a search index
- **Rate-limited or auth-gated endpoints** — anything that needs a secret API key you can't expose in the browser

**GitHub Pages can't do this.** It's static hosting only. If we ever want a contact form or a comment section, that's the migration moment — Vercel, Netlify, and Cloudflare Pages all offer serverless functions natively.

---

## Migration path if we outgrow GitHub Pages

1. Point `aminuabdusalam.com` (if bought) at Vercel/Netlify/Cloudflare instead of GitHub Pages.
2. Delete `.github/workflows/deploy.yml` (they auto-detect Astro).
3. Add serverless functions under `src/pages/api/*.ts` (Astro has first-class support).
4. Everything else — components, content, styles — stays exactly the same.

## When we'd actually switch

- We want **preview URLs per PR** → Vercel/Netlify (best-in-class)
- We add **any dynamic feature** (form, comments, search) → Vercel/Netlify/CF Pages
- We want **fastest global performance** → Cloudflare Pages (largest CDN edge network)

Until then, GitHub Pages is the right pick: free, zero maintenance, keeps everything in one place.
