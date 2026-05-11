# Talosix EDC Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a minimal, light-theme marketing landing page for Talosix EDC using Next.js + Tailwind CSS, showcasing EDC, eTMF, CTMS, eCOA, and RTSM/IRT in a bento-grid layout with a "Request Demo" CTA.

**Architecture:** Static Next.js App Router page composed of five independent server components (Navbar, Hero, BentoGrid, ModuleCard, FooterCTA). Tailwind extended with brand/neutral tokens from `tokens.json`. No backend or state management required.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Lucide React, next/font (Inter), Jest + React Testing Library, Vercel

---

## File Map

| File | Responsibility |
|---|---|
| `public/logo.svg` | Talosix logo asset |
| `tailwind.config.ts` | Token-extended color/font config |
| `src/app/globals.css` | Tailwind base + reset |
| `src/app/layout.tsx` | Root layout — Inter font, metadata |
| `src/app/page.tsx` | Landing page — composes all sections |
| `src/components/Navbar.tsx` | Logo + centered nav links + right actions |
| `src/components/Hero.tsx` | Badge + headline + subtext + CTA row |
| `src/components/ModuleCard.tsx` | Reusable module card (icon, title, desc, tag) |
| `src/components/BentoGrid.tsx` | Grid container + EDC featured card + 4 ModuleCards |
| `src/components/FooterCTA.tsx` | Bottom CTA band |
| `jest.config.ts` | Jest config for Next.js App Router |
| `jest.setup.ts` | @testing-library/jest-dom matchers |
| `src/components/__tests__/Navbar.test.tsx` | Smoke test: logo + links + actions present |
| `src/components/__tests__/Hero.test.tsx` | Smoke test: headline + CTA buttons |
| `src/components/__tests__/ModuleCard.test.tsx` | Smoke test: props render correctly |
| `src/components/__tests__/BentoGrid.test.tsx` | Smoke test: all 5 modules present |
| `src/components/__tests__/FooterCTA.test.tsx` | Smoke test: CTA text present |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Run create-next-app in existing repo directory**

From `/Users/user/learning-new-prototype-workflow`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```
When prompted about overwriting existing files (`README.md`, etc.), accept. Accept all other defaults.

- [ ] **Step 2: Install Lucide React**
```bash
npm install lucide-react
```

- [ ] **Step 3: Verify dev server starts**
```bash
npm run dev
```
Open http://localhost:3000 — default Next.js page appears. Stop server (Ctrl+C).

- [ ] **Step 4: Commit**
```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind + Lucide"
```

---

## Task 2: Configure Tailwind tokens + copy logo

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `public/logo.svg`

- [ ] **Step 1: Copy logo to public**
```bash
cp T6-Logo-Full-Colored.svg public/logo.svg
```

- [ ] **Step 2: Replace `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#d6ddff',
          200: '#adbbff',
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
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Replace `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}
```

- [ ] **Step 4: Commit**
```bash
git add tailwind.config.ts src/app/globals.css public/logo.svg
git commit -m "chore: extend Tailwind with design tokens, copy logo"
```

---

## Task 3: Root layout with Inter font

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Talosix EDC — Run Smarter Clinical Trials',
  description:
    'Talosix unifies your trial data across EDC, eTMF, CTMS, and eCOA — one platform to capture, manage, and analyze with confidence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**
```bash
npx tsc --noEmit
```
Expected: no output.

- [ ] **Step 3: Commit**
```bash
git add src/app/layout.tsx
git commit -m "feat: root layout with Inter font and metadata"
```

---

## Task 4: Set up Jest + React Testing Library

**Files:**
- Create: `jest.config.ts`, `jest.setup.ts`
- Modify: `package.json` (test script)

- [ ] **Step 1: Install test dependencies**
```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 2: Create `jest.config.ts`**

```ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)
```

- [ ] **Step 3: Create `jest.setup.ts`**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Add test script to `package.json`**

In `package.json`, add to the `"scripts"` block:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 5: Create test directory**
```bash
mkdir -p src/components/__tests__
```

- [ ] **Step 6: Verify Jest runs (no tests yet)**
```bash
npm test -- --passWithNoTests
```
Expected: `No test suites ran` or passes with 0 tests.

- [ ] **Step 7: Commit**
```bash
git add jest.config.ts jest.setup.ts package.json
git commit -m "chore: configure Jest and React Testing Library"
```

---

## Task 5: Navbar component (TDD)

**Files:**
- Create: `src/components/Navbar.tsx`
- Create: `src/components/__tests__/Navbar.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/__tests__/Navbar.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders the Talosix logo image', () => {
    render(<Navbar />)
    expect(screen.getByAltText('Talosix')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Solutions')).toBeInTheDocument()
    expect(screen.getByText('Customers')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
  })

  it('renders right-side actions', () => {
    render(<Navbar />)
    expect(screen.getByText('Login to EDC')).toBeInTheDocument()
    expect(screen.getByText('Request Demo')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**
```bash
npm test -- Navbar
```
Expected: FAIL — `Cannot find module '../Navbar'`

- [ ] **Step 3: Create `src/components/Navbar.tsx`**

```tsx
import Image from 'next/image'

const navLinks = ['Products', 'Solutions', 'Customers', 'Pricing']

export default function Navbar() {
  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-8 h-[60px] border-b border-neutral-200 bg-white">
      {/* Left: Logo */}
      <div className="flex items-center">
        <a href="/">
          <Image
            src="/logo.svg"
            alt="Talosix"
            width={119}
            height={27}
            priority
            className="h-6 w-auto"
          />
        </a>
      </div>

      {/* Center: Nav links */}
      <div className="flex items-center gap-7">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[13px] font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5 justify-end">
        <a
          href="#"
          className="text-[13px] font-medium text-neutral-600 px-3.5 py-[7px] rounded-[6px] border border-neutral-200 hover:bg-neutral-50 transition-colors whitespace-nowrap"
        >
          Login to EDC
        </a>
        <a
          href="#request-demo"
          className="text-[13px] font-semibold text-white bg-brand-500 px-4 py-[7px] rounded-[6px] hover:bg-brand-600 transition-colors whitespace-nowrap"
        >
          Request Demo
        </a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**
```bash
npm test -- Navbar
```
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**
```bash
git add src/components/Navbar.tsx src/components/__tests__/Navbar.test.tsx
git commit -m "feat: add Navbar with centered links and dual actions"
```

---

## Task 6: Hero component (TDD)

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/__tests__/Hero.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/__tests__/Hero.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders the platform badge', () => {
    render(<Hero />)
    expect(screen.getByText('Clinical Data Management Platform')).toBeInTheDocument()
  })

  it('renders the headline', () => {
    render(<Hero />)
    expect(screen.getByText('Run Smarter')).toBeInTheDocument()
    expect(screen.getByText('Clinical Trials')).toBeInTheDocument()
  })

  it('renders both CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByText('Request Demo')).toBeInTheDocument()
    expect(screen.getByText('Watch Overview')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**
```bash
npm test -- Hero
```
Expected: FAIL — `Cannot find module '../Hero'`

- [ ] **Step 3: Create `src/components/Hero.tsx`**

```tsx
import { Plus, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center pt-[72px] pb-12 px-10 max-w-[720px] mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-500 bg-brand-100 rounded-full px-3 py-1 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        Clinical Data Management Platform
      </div>

      {/* Headline */}
      <h1 className="text-[44px] font-extrabold leading-[1.15] tracking-[-0.05em] text-neutral-900 mb-4">
        Run Smarter{' '}
        <span className="text-brand-500">Clinical Trials</span>
      </h1>

      {/* Subtext */}
      <p className="text-base text-neutral-600 leading-relaxed max-w-[560px] mb-8">
        Talosix EDC unifies your trial data across EDC, eTMF, CTMS, and eCOA —
        giving your team one platform to capture, manage, and analyze with
        confidence.
      </p>

      {/* CTA row */}
      <div className="flex items-center gap-3">
        <a
          href="#request-demo"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-white bg-brand-500 px-6 py-[11px] rounded-[7px] hover:bg-brand-600 transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          Request Demo
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-neutral-700 border border-neutral-200 px-5 py-[11px] rounded-[7px] hover:bg-neutral-50 transition-colors"
        >
          <Play size={14} fill="#334155" strokeWidth={0} />
          Watch Overview
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**
```bash
npm test -- Hero
```
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**
```bash
git add src/components/Hero.tsx src/components/__tests__/Hero.test.tsx
git commit -m "feat: add Hero section with badge, headline, and CTA row"
```

---

## Task 7: ModuleCard component (TDD)

**Files:**
- Create: `src/components/ModuleCard.tsx`
- Create: `src/components/__tests__/ModuleCard.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/__tests__/ModuleCard.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { FileText } from 'lucide-react'
import ModuleCard from '../ModuleCard'

const props = {
  icon: FileText,
  iconBg: '#e4d6ff',
  iconColor: '#7733ff',
  title: 'eTMF',
  description: 'Digital Trial Master File.',
  tagLabel: 'Document Management',
  tagBg: '#f1d6ff',
  tagColor: '#7733ff',
}

describe('ModuleCard', () => {
  it('renders the title', () => {
    render(<ModuleCard {...props} />)
    expect(screen.getByText('eTMF')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ModuleCard {...props} />)
    expect(screen.getByText('Digital Trial Master File.')).toBeInTheDocument()
  })

  it('renders the tag label', () => {
    render(<ModuleCard {...props} />)
    expect(screen.getByText('Document Management')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**
```bash
npm test -- ModuleCard
```
Expected: FAIL — `Cannot find module '../ModuleCard'`

- [ ] **Step 3: Create `src/components/ModuleCard.tsx`**

```tsx
import { LucideIcon } from 'lucide-react'

interface ModuleCardProps {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
  tagLabel: string
  tagBg: string
  tagColor: string
}

export default function ModuleCard({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  tagLabel,
  tagBg,
  tagColor,
}: ModuleCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 overflow-hidden">
      <div
        className="w-9 h-9 rounded-[9px] flex items-center justify-center mb-3"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={18} color={iconColor} strokeWidth={1.5} />
      </div>
      <h3 className="text-[15px] font-bold text-neutral-900 mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-[12px] text-neutral-500 leading-relaxed">
        {description}
      </p>
      <span
        className="inline-block mt-2.5 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
        style={{ backgroundColor: tagBg, color: tagColor }}
      >
        {tagLabel}
      </span>
    </div>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**
```bash
npm test -- ModuleCard
```
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**
```bash
git add src/components/ModuleCard.tsx src/components/__tests__/ModuleCard.test.tsx
git commit -m "feat: add reusable ModuleCard component"
```

---

## Task 8: BentoGrid component (TDD)

**Files:**
- Create: `src/components/BentoGrid.tsx`
- Create: `src/components/__tests__/BentoGrid.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/__tests__/BentoGrid.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import BentoGrid from '../BentoGrid'

describe('BentoGrid', () => {
  it('renders the EDC featured card', () => {
    render(<BentoGrid />)
    expect(screen.getByText('Electronic Data Capture')).toBeInTheDocument()
  })

  it('renders all 4 module cards', () => {
    render(<BentoGrid />)
    expect(screen.getByText('eTMF')).toBeInTheDocument()
    expect(screen.getByText('CTMS')).toBeInTheDocument()
    expect(screen.getByText('eCOA')).toBeInTheDocument()
    expect(screen.getByText('RTSM / IRT')).toBeInTheDocument()
  })

  it('renders the EDC compliance description', () => {
    render(<BentoGrid />)
    expect(screen.getByText(/FDA 21 CFR Part 11/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**
```bash
npm test -- BentoGrid
```
Expected: FAIL — `Cannot find module '../BentoGrid'`

- [ ] **Step 3: Create `src/components/BentoGrid.tsx`**

```tsx
import { HeartPulse, FileText, FlaskConical, Stethoscope, PackageOpen } from 'lucide-react'
import ModuleCard from './ModuleCard'

const modules = [
  {
    icon: FileText,
    iconBg: '#e4d6ff',
    iconColor: '#7733ff',
    title: 'eTMF',
    description:
      'Digital Trial Master File aligned to DIA Reference Model. Automated completeness tracking with role-based access.',
    tagLabel: 'Document Management',
    tagBg: '#f1d6ff',
    tagColor: '#7733ff',
  },
  {
    icon: FlaskConical,
    iconBg: '#ccebd6',
    iconColor: '#009933',
    title: 'CTMS',
    description:
      'Track sites, subjects, visits, and milestones. Real-time enrollment dashboards and budget management.',
    tagLabel: 'Trial Management',
    tagBg: '#ccebd6',
    tagColor: '#007a29',
  },
  {
    icon: Stethoscope,
    iconBg: '#fff5cc',
    iconColor: '#cc6600',
    title: 'eCOA',
    description:
      'Patient and clinician-reported outcomes on any device. Offline support and multilingual questionnaires.',
    tagLabel: 'Patient Outcomes',
    tagBg: '#fff5cc',
    tagColor: '#994d00',
  },
  {
    icon: PackageOpen,
    iconBg: '#cceeff',
    iconColor: '#0088cc',
    title: 'RTSM / IRT',
    description:
      'Randomization and trial supply management integrated with your EDC data for end-to-end trial control.',
    tagLabel: 'Randomization',
    tagBg: '#cceeff',
    tagColor: '#006699',
  },
]

const mockRows = [
  { dot: '#3355ff', badgeBg: '#d6ddff', width: '55%' },
  { dot: '#009933', badgeBg: '#ccebd6', width: '70%' },
  { dot: '#ff7f00', badgeBg: '#ffe6cc', width: '40%' },
  { dot: '#94a3b8', badgeBg: '#f1f5f9', width: '62%' },
]

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-[1.55fr_1fr_1fr] grid-rows-2 gap-3 px-10 pb-16 max-w-[1000px] mx-auto">
      {/* Featured: EDC — spans 2 rows */}
      <div className="row-span-2 bg-neutral-50 border border-neutral-200 rounded-xl p-6 flex flex-col gap-3">
        <div className="w-10 h-10 bg-brand-500 rounded-[10px] flex items-center justify-center">
          <HeartPulse size={20} color="white" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
          Electronic Data Capture
        </h3>
        <p className="text-[13px] text-neutral-600 leading-relaxed">
          Build and deploy eCRFs in minutes. Real-time data validation, query
          management, and audit trails built for FDA 21 CFR Part 11 compliance.
        </p>
        {/* Mini UI mock */}
        <div className="mt-auto flex-1 bg-white border border-neutral-200 rounded-lg p-3 flex flex-col gap-2">
          <p className="text-[9px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">
            Subject Data — Visit 2
          </p>
          {mockRows.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: row.dot }} />
              <div className="h-1.5 rounded bg-neutral-200 flex-1" style={{ maxWidth: row.width }} />
              <span className="w-9 h-3.5 rounded flex-shrink-0" style={{ backgroundColor: row.badgeBg }} />
            </div>
          ))}
          <div className="flex gap-1.5 mt-2 pt-2 border-t border-neutral-200">
            <div className="w-14 h-6 bg-brand-500 rounded-md" />
            <div className="w-10 h-6 border border-neutral-200 rounded-md" />
          </div>
        </div>
      </div>

      {/* 4 module cards */}
      {modules.map((mod) => (
        <ModuleCard key={mod.title} {...mod} />
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**
```bash
npm test -- BentoGrid
```
Expected: PASS — 3 tests passing.

- [ ] **Step 5: Commit**
```bash
git add src/components/BentoGrid.tsx src/components/__tests__/BentoGrid.test.tsx
git commit -m "feat: add BentoGrid with EDC featured card and 4 module cards"
```

---

## Task 9: FooterCTA component (TDD)

**Files:**
- Create: `src/components/FooterCTA.tsx`
- Create: `src/components/__tests__/FooterCTA.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/__tests__/FooterCTA.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import FooterCTA from '../FooterCTA'

describe('FooterCTA', () => {
  it('renders the headline', () => {
    render(<FooterCTA />)
    expect(screen.getByText('Ready to modernize your clinical trials?')).toBeInTheDocument()
  })

  it('renders both action buttons', () => {
    render(<FooterCTA />)
    expect(screen.getByText('Request Demo')).toBeInTheDocument()
    expect(screen.getByText('Talk to Sales')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to confirm it fails**
```bash
npm test -- FooterCTA
```
Expected: FAIL — `Cannot find module '../FooterCTA'`

- [ ] **Step 3: Create `src/components/FooterCTA.tsx`**

```tsx
export default function FooterCTA() {
  return (
    <section
      id="request-demo"
      className="bg-neutral-50 border-t border-neutral-200 text-center px-10 py-10"
    >
      <h2 className="text-[22px] font-bold text-neutral-900 mb-2 tracking-tight">
        Ready to modernize your clinical trials?
      </h2>
      <p className="text-[14px] text-neutral-500 mb-5">
        Join 200+ sponsors, CROs, and sites already running on Talosix.
      </p>
      <div className="flex items-center gap-3 justify-center">
        <a
          href="#"
          className="inline-flex items-center text-[14px] font-semibold text-white bg-brand-500 px-6 py-[11px] rounded-[7px] hover:bg-brand-600 transition-colors"
        >
          Request Demo
        </a>
        <a
          href="#"
          className="inline-flex items-center text-[14px] font-medium text-neutral-700 border border-neutral-200 px-5 py-[11px] rounded-[7px] hover:bg-neutral-50 transition-colors"
        >
          Talk to Sales
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to confirm it passes**
```bash
npm test -- FooterCTA
```
Expected: PASS — 2 tests passing.

- [ ] **Step 5: Commit**
```bash
git add src/components/FooterCTA.tsx src/components/__tests__/FooterCTA.test.tsx
git commit -m "feat: add FooterCTA section"
```

---

## Task 10: Compose page.tsx + full build verification

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx`**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BentoGrid from '@/components/BentoGrid'
import FooterCTA from '@/components/FooterCTA'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BentoGrid />
      <FooterCTA />
    </main>
  )
}
```

- [ ] **Step 2: Run all tests**
```bash
npm test
```
Expected: all 14 tests PASS across 5 test suites.

- [ ] **Step 3: Run production build**
```bash
npm run build
```
Expected: `✓ Compiled successfully`, no TypeScript or ESLint errors.

- [ ] **Step 4: Visually verify dev server**
```bash
npm run dev
```
Open http://localhost:3000. Confirm visually:
- [ ] Talosix logo in navbar (left)
- [ ] Products / Solutions / Customers / Pricing centered
- [ ] "Login to EDC" outlined + "Request Demo" blue (right)
- [ ] Badge + headline + subtext + CTA buttons in hero
- [ ] EDC card (HeartPulse icon) spans 2 rows on left
- [ ] eTMF (FileText), CTMS (FlaskConical), eCOA (Stethoscope), RTSM/IRT (PackageOpen) visible
- [ ] Footer CTA at bottom

Stop server (Ctrl+C).

- [ ] **Step 5: Commit**
```bash
git add src/app/page.tsx
git commit -m "feat: compose landing page from all section components"
```

---

## Task 11: Push to GitHub and deploy on Vercel

- [ ] **Step 1: Push all commits to GitHub**
```bash
git remote add origin https://github.com/dnguyen247/learning-new-prototype-workflow.git
git branch -M main
git push -u origin main
```
Expected: all commits pushed successfully.

- [ ] **Step 2: Add `.vercel` to `.gitignore`**
```bash
echo ".vercel" >> .gitignore
git add .gitignore
git commit -m "chore: ignore .vercel directory"
git push
```

- [ ] **Step 3: Deploy via Vercel CLI**
```bash
npx vercel --yes
```
Follow prompts — Vercel auto-detects Next.js. When preview deploy completes, promote to production:
```bash
npx vercel --prod
```
Expected: `✓ Production: https://<project>.vercel.app`

- [ ] **Step 4: Verify live URL**

Open the production URL from the output. Confirm the full landing page renders correctly in production.
