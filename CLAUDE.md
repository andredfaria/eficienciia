# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun dev          # Start dev server (uses Bun as runtime)
bun run build    # Production build (Next.js SSR mode)
bun run lint     # ESLint (note: ignoreDuringBuilds is true, so lint issues won't block builds)

# Static export (for CDN/static hosting)
bun run export   # Swaps in next.config.static.js, builds with output: 'export'
```

There are no test scripts configured.

## Architecture

This is a **Next.js 13 App Router** marketing site for Eficienci IA — an AI automation services company targeting Brazilian businesses.

### Page structure

- `app/page.tsx` — Main landing page, assembles section components top-to-bottom: `Header → HeroSection → ServicesSection → MethodologySection → ProblemSolutionSection → ContactSection → Footer`
- `app/blog/` — Blog pages that fetch content from an external n8n webhook API (`https://n8n.eficienciia.com.br/webhook/list-blog`), with 1-hour ISR revalidation
- `app/valores/` and `app/project/` — Additional inner pages

### Component layout

- `components/sections/` — Page sections (hero, services, methodology, etc.) — use `framer-motion` for scroll-triggered animations
- `components/ui/` — shadcn/ui component library (Radix UI primitives + Tailwind styling)
- `components/seo/` — SEO utilities: `GoogleAnalytics`, `StructuredData`, `OptimizedImage`, `InternalLinking`
- `components/header.tsx` — Site header with navigation

### Data & integrations

- **Blog**: Posts fetched from n8n at runtime via `lib/blog.ts`. Slugs are generated from post titles client-side via `generateSlug()`. No local content files.
- **Contact form**: POSTs to `https://n8n.eficienciia.com.br/webhook/salva-formulario` — no backend code in this repo.
- **Analytics**: Dual tracking — Google Analytics (via `components/seo/GoogleAnalytics.tsx`) and Ackee (self-hosted, injected as script in root layout).

### Styling

- **Always dark mode** — `<html>` has `class="dark"` hardcoded; there is no theme toggle.
- Design tokens use CSS variables (`--primary`, `--background`, etc.) defined in `app/globals.css`, mapped through Tailwind config.
- Primary color: neon cyan (`hsl(190, 95%, 62%)`).
- Custom utility class `tech-grid` (defined in globals.css) used as decorative background overlay.

### Two build modes

`next.config.js` (SSR/default) vs `next.config.static.js` (static export). The `export` script swaps the config file before building. Do not enable `output: 'export'` in the default config — it breaks middleware and dynamic routes like the blog.

### Path aliases

`@/` maps to the project root (configured in tsconfig).
