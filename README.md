# horz — frontend

The production website for **horz** — the modular backend for everything around
your business. _Scale Horizontally. Focus Vertically._

Built phase-by-phase against a locked design system. This repository is the app
only; the design system, content, and roadmap live outside it.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** (`@theme inline`, design tokens in `src/app/globals.css`)
- **Framer Motion** + **Lenis** (motion + smooth scroll)
- **next/font** — self-hosted **Fraunces** / **Schibsted Grotesk** / **Spline
  Sans Mono** (the open, metric-matched fallbacks for the ship-target
  GT Sectra + ABC Diatype pairing)
- **pnpm**

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Script         | Does                          |
| -------------- | ----------------------------- |
| `pnpm dev`     | dev server (Turbopack)        |
| `pnpm build`   | production build              |
| `pnpm start`   | serve the production build    |
| `pnpm lint`    | ESLint                        |

## The design foundation

Two surfaces — dark **"blue hour"** is home, light **"day station"** is
secondary — switched by `data-theme` on `<html>` and persisted to
`localStorage`. Every colour, type step, space unit, radius, and ease is a
token in `src/app/globals.css`, mapped into Tailwind utilities via `@theme
inline` so the utilities themselves flip with the theme.

The full token survey lives at **`/_tokens`** (internal, `noindex`).

## Structure

```
src/
  app/
    globals.css      # the entire token foundation (colour · type · space · motion)
    layout.tsx       # fonts, default theme, no-FOUC script, grain
    page.tsx         # home (Phase-0 holding page; real homepage is Phase 3)
    fonts.ts         # next/font setup → --font-* variables
    %5Ftokens/       # the /_tokens survey sheet
  components/
    brand.tsx        # the Section glyph + wordmark
    theme-toggle.tsx # day/night switch
  lib/
    theme.ts         # theme constants + pre-paint init script
```
