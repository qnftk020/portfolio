# Yeonghwan Shin — Research Portfolio

**HCI Researcher · AI Experience Design · Human-AI Interaction**

Built with Next.js 14 (App Router) + Tailwind CSS, statically exported for GitHub Pages.

---

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Fonts**: Cormorant Garamond, IBM Plex Mono, DM Sans (Google Fonts)
- **Deployment**: GitHub Pages via static export

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Build & Export

```bash
npm run build
# Outputs static site to ./out/
```

## GitHub Pages Deployment

### 1. Automatic (GitHub Actions)
Push to `main` → GitHub Actions automatically builds and deploys.

**Setup:**
1. Go to repo → **Settings** → **Pages**
2. Set Source to **GitHub Actions**
3. Push your code — done! 🎉

### 2. Manual
```bash
npm run build
touch out/.nojekyll
# Upload ./out/ to your gh-pages branch
```

### Custom domain vs. repo subdirectory
If deploying to `https://username.github.io/repo-name/`, uncomment these lines in `next.config.js`:

```js
basePath: '/repo-name',
assetPrefix: '/repo-name/',
```

If deploying to `https://username.github.io/` (user/org page), leave them commented out.

---

## Content Updates

All content lives in **`lib/data.ts`**. Edit this file to update:
- Profile bio
- Education history
- Work experience  
- Publications (international & domestic)
- Awards
- Skills

---

## File Structure

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions auto-deploy
├── app/
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles + animations
├── components/
│   ├── Nav.tsx                 # Fixed navigation
│   ├── Hero.tsx                # Landing hero section
│   ├── Section.tsx             # Reusable section wrapper
│   ├── About.tsx               # Education + research focus
│   ├── Experience.tsx          # Work experience timeline
│   ├── Publications.tsx        # Publications list
│   ├── Awards.tsx              # Awards + exhibitions
│   ├── Skills.tsx              # Skills grid
│   └── Footer.tsx              # Footer
├── lib/
│   └── data.ts                 # ← All content lives here
├── next.config.js              # Static export config
├── tailwind.config.ts
└── tsconfig.json
```
