# Talosix EDC Landing Page — Design Spec
Date: 2026-05-11

## Overview

A minimal, light-theme marketing landing page for Talosix EDC built with Next.js + Tailwind CSS. Introduces the platform and its core modules (EDC, eTMF, CTMS, eCOA, RTSM/IRT) via a bento-grid layout. Single primary CTA: **Request Demo**.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Font | Inter (Google Fonts / next/font) |
| Deployment | Vercel |
| Repo | github.com/dnguyen247/learning-new-prototype-workflow |

---

## Design Tokens (from `tokens.json`)

### Colors — Light Theme

| Token | Value | Usage |
|---|---|---|
| `brand500` | `#3355ff` | Primary brand, CTA buttons, links |
| `brand100` | `#d6ddff` | Badge backgrounds, subtle accents |
| `contentPrimary` | `#0f172a` | Headings |
| `contentSecondary` | `#334155` | Body text |
| `contentTertiary` | `#475569` | Muted/secondary text |
| `neutral50` | `#f8fafc` | Featured card bg, footer bg |
| `neutral100` | `#f1f5f9` | Page background (outer) |
| `neutral200` | `#e2e8f0` | Borders, dividers |
| `neutral400` | `#94a3b8` | Placeholder/disabled text |

### Spacing Scale

`4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 72 px`

### Border Radius

| Context | Value |
|---|---|
| Cards | `12px` (radiusL = 6 × 2) |
| Buttons | `7px` |
| Icon wraps | `10px` (featured), `9px` (module) |
| Tags | `4px` |
| Badge | `9999px` (pill) |

### Typography — Inter

| Element | Size | Weight | Letter-spacing |
|---|---|---|---|
| Hero H1 | 44px | 800 | -1px |
| Section H2 | 22px | 700 | -0.3px |
| Card H3 (featured) | 20px | 700 | -0.3px |
| Card H3 (module) | 15px | 700 | -0.2px |
| Body / nav links | 13–16px | 400–500 | 0 |
| Tags / badge | 10–12px | 600 | +0.06em uppercase |

---

## Page Structure

```
<Navbar>
<Hero>
<BentoGrid>
<FooterCTA>
```

### 1. Navbar

Layout: `grid-cols-[1fr_auto_1fr]` — logo left, links centered, actions right.

- **Logo**: `T6-Logo-Full-Colored.svg` (119 × 27), height 24px in nav
- **Nav links** (centered): Products · Solutions · Customers · Pricing
- **Right actions**:
  - "Login to EDC" — outlined button (`border border-neutral-200 text-neutral-600`)
  - "Request Demo" — primary button (`bg-brand500 text-white`)
- Height: `60px`, border-bottom: `1px solid #e2e8f0`

### 2. Hero Section

Centered, max-width 720px, padding `72px 0 48px`.

- **Badge**: pill shape, `bg-brand100 text-brand500`, dot + label "Clinical Data Management Platform"
- **H1**: "Run Smarter / Clinical Trials" — "Clinical Trials" in `text-brand500`
- **Subtext**: single paragraph, 16px, `text-contentTertiary`
- **CTA row** (centered, gap-3):
  - Primary: "Request Demo" (icon + text)
  - Secondary: "Watch Overview" (play icon + text, outlined)

### 3. Bento Grid

Grid: `grid-cols-[1.55fr_1fr_1fr]`, 2 rows, gap `12px`. Padding `0 40px 64px`. Max-width 1000px centered.

#### Card: EDC (featured — spans 2 rows)

- Background: `#f8fafc` (neutral50), border `#e2e8f0`
- Icon wrap: `bg-brand500`, 40×40px, 10px radius
- Icon: Lucide `Grid2X2` (white)
- Title: "Electronic Data Capture", 20px/700
- Description: compliance + eCRF copy
- **Mini UI mock** (bottom, flex-1): white card with light-theme data rows (colored dots + bars + pastel badges), mock action buttons

#### Module Cards (4 cards, 2 rows × 2 cols right side)

| Module | Icon (Lucide) | Accent color | Tag label |
|---|---|---|---|
| eTMF | `FileText` | purple `#7733ff` / bg `#e4d6ff` | Document Management |
| CTMS | `Clock` | green `#009933` / bg `#ccebd6` | Trial Management |
| eCOA | `ClipboardList` | orange `#cc6600` / bg `#fff5cc` | Patient Outcomes |
| RTSM/IRT | `Hexagon` | cyan `#0088cc` / bg `#cceeff` | Randomization |

Each module card: white bg, border `#e2e8f0`, 12px radius, 24px padding. Icon wrap 36×36, title 15px/700, description 12px, colored tag pill at bottom.

### 4. Footer CTA Section

Background `#f8fafc`, border-top `#e2e8f0`, centered, padding `40px`.

- H2: "Ready to modernize your clinical trials?"
- Subtext: "Join 200+ sponsors, CROs, and sites already running on Talosix."
- CTA row: "Request Demo" (primary) + "Talk to Sales" (outlined)

---

## File Structure (Next.js App Router)

```
/
├── public/
│   └── logo.svg                  # T6-Logo-Full-Colored.svg
├── src/
│   └── app/
│       ├── layout.tsx            # Root layout — Inter font, metadata
│       ├── page.tsx              # Landing page (composes sections)
│       └── globals.css           # Tailwind base + CSS custom properties
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── BentoGrid.tsx
│       ├── ModuleCard.tsx        # reusable module card
│       └── FooterCTA.tsx
├── tailwind.config.ts            # extend colors from tokens.json
├── tokens.json
└── ...
```

---

## Tailwind Token Extension

Extend `tailwind.config.ts` with semantic aliases from `tokens.json`:

```ts
colors: {
  brand: {
    100: '#d6ddff',
    500: '#3355ff',
    600: '#2944cc',
    700: '#1f3399',
  },
  neutral: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
}
```

---

## Deployment

1. Push to `github.com/dnguyen247/learning-new-prototype-workflow`
2. Connect repo to Vercel → auto-deploy on push to `main`
3. No environment variables required for this static landing page

---

## Out of Scope

- Mobile responsive breakpoints (desktop-first for now)
- Dark mode toggle
- Analytics / tracking scripts
- Contact form backend
- Animation / transitions beyond CSS hover states
