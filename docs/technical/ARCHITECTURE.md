# 🏗️ Architecture Documentation

**City Marin Studio - Technical Architecture Reference**

This document explains the system architecture, design patterns, data flow, and technical decisions that power the cmstudio website.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Core Principles](#-core-principles)
- [Technology Stack](#-technology-stack)
- [Application Architecture](#-application-architecture)
- [Data Architecture](#-data-architecture)
- [Styling Architecture](#-styling-architecture)
- [Component Architecture](#-component-architecture)
- [Routing & Navigation](#-routing--navigation)
- [State Management](#-state-management)
- [Performance Strategy](#-performance-strategy)
- [SEO & Metadata](#-seo--metadata)
- [Dark Mode Implementation](#-dark-mode-implementation)
- [Animation System](#-animation-system)
- [Error Handling](#-error-handling)
- [Build & Deployment](#-build--deployment)
- [Security](#-security)
- [Testing Strategy](#-testing-strategy)

---

## 🎯 Overview

**cmstudio** is a modern portfolio website built with Next.js 16 App Router, featuring:

- **Server-first rendering** with selective client hydration
- **DB-first data architecture** (no hardcoded content)
- **Enterprise SCSS design system** (7-layer architecture)
- **Type-safe development** with strict TypeScript
- **WCAG 2.1 Level AA** accessibility compliance
- **Performance-optimized** with lazy loading & code splitting

### **Key Metrics**

| Metric | Value |
|--------|-------|
| Total Files | 43 TSX + 42 SCSS |
| Lines of Code | ~14,100 |
| Components | 26 React components |
| Build Time | ~1200ms |
| Pages | 28 static |
| Bundle Size | Optimized with code splitting |

---

## 💎 Core Principles

### **1. DB-First Architecture**

**Philosophy:** All content comes from the database, never hardcoded in application code.

```typescript
// ❌ BAD: Hardcoded data
const projects = [
  { id: 1, title: "Project 1" },
  { id: 2, title: "Project 2" }
];

// ✅ GOOD: Database-first
const projects = await db.projects.findMany();
```

**Benefits:**
- Content updates without code changes
- Consistent data source
- Scalable content management
- CMS-ready architecture

### **2. Minimal File Count**

**Philosophy:** Keep architecture simple with as few files as possible.

- Colocate related code
- Avoid excessive abstraction
- Combine related utilities
- Keep component hierarchy flat

### **3. Server Components by Default**

**Philosophy:** Use Server Components unless client interactivity is needed.

```typescript
// ✅ Default: Server Component (no "use client")
export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsList projects={projects} />;
}

// ✅ When needed: Client Component
"use client";
export function InteractiveFilter() {
  const [filter, setFilter] = useState("");
  // ... client logic
}
```

### **4. Separation of Concerns**

**Philosophy:** Admin uses Tailwind, public uses SASS - never mix.

```
Admin Panel: Shadcn/UI + Tailwind CSS
Public Pages: Custom SASS design system
```

---

## 🛠️ Technology Stack

### **Frontend Core**

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 16.2.9 | React framework (App Router) |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |

### **Styling & Animation**

| Technology | Version | Role |
|------------|---------|------|
| SASS | 1.101.0 | CSS preprocessor |
| GSAP | 3.15.0 | Animation engine |

### **Development Tools**

- **ESLint 9** - Code quality
- **TypeScript Strict** - Type checking
- **Bundle Analyzer** - Performance monitoring

### **Infrastructure**

- **Vercel** - Hosting & deployment (recommended)
- **Git** - Version control
- **npm** - Package management

---

## 🏛️ Application Architecture

### **Next.js 16 App Router**

```
app/
├── layout.tsx              # Root layout (theme, providers, metadata)
├── page.tsx                # Home page (/)
├── loading.tsx             # Global loading UI
├── error.tsx               # Global error UI
├── not-found.tsx           # 404 page
├── ProjectsPageClient.tsx  # Extracted client logic
├── HomeStructuredData.tsx  # Home page JSON-LD
│
├── projects/               # /projects route
│   └── page.tsx               # Re-exports home (same content)
│
├── about/                  # /about route
│   ├── page.tsx               # About page
│   └── page.module.scss       # Page styles
│
├── contact/                # /contact route
│   ├── page.tsx
│   └── page.module.scss
│
├── careers/                # /careers route
│   ├── page.tsx
│   └── page.module.scss
│
├── people/                 # /people route
│   ├── page.tsx
│   └── page.module.scss
│
├── sustainability/         # /sustainability route
│   ├── page.tsx
│   └── page.module.scss
│
├── offline/                # PWA offline page
│   └── page.tsx
│
├── api/                    # API Routes
│   └── contact/
│       └── route.ts           # Contact form handler
│
├── manifest.ts             # PWA manifest generator
├── sitemap.ts              # Dynamic sitemap
└── robots.ts               # Robots.txt generator
```

### **Server vs Client Components**

**Server Components** (default):
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Home page wrapper
- `app/*/page.tsx` - All page routes
- `components/StructuredData.tsx` - JSON-LD metadata

**Client Components** (explicit `"use client"`):
- `app/ProjectsPageClient.tsx` - Interactive filtering
- `components/Header/` - Navigation with state
- `components/Footer/` - Theme toggle
- `components/animations/` - GSAP animations
- `components/forms/` - Form validation
- `components/ClientProviders.tsx` - Client-side providers

**Pattern:**
```typescript
// Server Component (page.tsx)
export default async function Page() {
  const data = await getData(); // Server-side fetch
  return <ClientComponent data={data} />; // Hydrate on client
}

// Client Component
"use client";
export function ClientComponent({ data }) {
  const [state, setState] = useState();
  // ... interactivity
}
```

---

## 🗄️ Data Architecture

### **Data Source**

**Location:** `lib/data.ts` (single source of truth)

```typescript
// lib/data.ts structure
export const projects: Project[] = [...]; // Will migrate to DB
export const categories: Category[] = [...];
export const metadata = { ... };
```

**Current State:** Static data in code  
**Target State:** PostgreSQL/Prisma database  
**Migration Plan:** Incremental DB migration maintaining same API

### **Data Flow**

```
┌─────────────────┐
│   Database      │ (Future)
│  (PostgreSQL)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   lib/data.ts   │ (Current)
│  (Static Data)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Server Comp    │
│  (page.tsx)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Client Comp    │
│  (Interactive)  │
└─────────────────┘
```

### **Type System**

```typescript
// types/global.d.ts
export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  size: number;
  category: string;
  year: number;
  image: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
```

**Benefits:**
- Type-safe data access
- Autocomplete in IDE
- Compile-time error checking
- Refactoring safety

---

## 🎨 Styling Architecture

### **7-Layer SCSS System**

Based on ITCSS (Inverted Triangle CSS) methodology:

```
styles/
│
├── 1. tokens/           ← Design values (variables)
│   ├── _colors.scss        # 80+ color tokens
│   ├── _typography.scss    # Font system
│   ├── _spacing.scss       # Spacing scale
│   ├── _motion.scss        # Animation timing
│   └── _breakpoints.scss   # Responsive breakpoints
│
├── 2. tools/            ← Mixins & functions
│   ├── _mixins.scss        # Reusable mixins
│   └── _functions.scss     # SCSS functions
│
├── 3. base/             ← Global styles
│   ├── _reset.scss         # CSS reset
│   ├── _typography.scss    # Base text styles
│   └── _animations.scss    # Global keyframes
│
├── 4. layout/           ← Structural layouts
│   ├── _grid.scss          # Grid system
│   ├── _flex.scss          # Flexbox utilities
│   └── _containers.scss    # Content containers
│
├── 5. utilities/        ← Helper classes
│   ├── _spacing.scss       # Margin/padding utils
│   ├── _text.scss          # Text utilities
│   └── _display.scss       # Display utilities
│
├── 6. components/       ← Component styles
│   ├── _button.scss
│   ├── _card.scss
│   └── ... (13 components)
│
├── 7. pages/            ← Page-specific styles
│   ├── _home.scss
│   ├── _about.scss
│   └── ...
│
└── main.scss            ← Entry point (imports all)
```

### **Token System**

**Philosophy:** All design values defined as tokens, never magic numbers.

```scss
// ✅ GOOD: Using tokens
.button {
  color: var(--color-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

// ❌ BAD: Magic values
.button {
  color: #0ea5e9;
  padding: 16px;
  border-radius: 8px;
}
```

**Token Categories:**

1. **Colors** - 80+ tokens (light/dark mode)
2. **Typography** - Font sizes, weights, line heights
3. **Spacing** - 8px base scale (4px → 128px)
4. **Motion** - Animation durations & easings
5. **Breakpoints** - 6 responsive sizes

### **CSS Modules Pattern**

```typescript
// Component file
import styles from './Component.module.scss';

export function Component() {
  return <div className={styles.container}>...</div>;
}
```

**Benefits:**
- Scoped styles (no conflicts)
- Type-safe class names (TypeScript)
- Automatic code splitting
- Tree shaking (unused styles removed)

### **Dark Mode**

**Implementation:** CSS class-based toggle

```scss
// Light mode (default)
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

// Dark mode
html.nightshift {
  --bg-primary: #0a0a0a;
  --text-primary: #e5e5e5;
}
```

**Trigger:** `<html class="nightshift">` applied by JavaScript

---

## 🧩 Component Architecture

### **Component Categories**

1. **Layout Components** - Header, Footer, containers
2. **UI Components** - Buttons, cards, inputs
3. **Animation Components** - GSAP wrappers
4. **Form Components** - Contact form, validation
5. **Utility Components** - Error boundaries, loading states

### **Component Hierarchy**

```
app/layout.tsx (Root)
│
├── ClientProviders
│   └── (Theme provider, GSAP context)
│
├── ErrorBoundary
│   ├── Header
│   │   └── Navigation
│   │       └── ThemeToggle
│   │
│   ├── Main Content (children)
│   │   ├── Home
│   │   │   └── ProjectsPageClient
│   │   │       ├── ProjectFilters
│   │   │       └── ProjectCard
│   │   │
│   │   └── Other Pages
│   │       ├── ContactForm
│   │       ├── LoadingSpinner
│   │       └── Page Components
│   │
│   └── Footer
│       └── ThemeToggle
│
└── Utility Components (outside ErrorBoundary)
    ├── ProgressBar
    ├── BackToTop
    ├── CustomCursor
    └── IntroScreen
```

### **Component Patterns**

**1. Composition Pattern**

```typescript
// Composable structure
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**2. Render Props**

```typescript
<DataFetcher>
  {(data) => <Display data={data} />}
</DataFetcher>
```

**3. Higher-Order Components**

```typescript
const EnhancedComponent = withAnimation(BaseComponent);
```

### **Error Boundary Strategy**

```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />; // User-friendly error UI
    }
    return this.props.children;
  }
}
```

**Wrapping Strategy:**
- ✅ Wraps: Header, Main, Footer (recoverable)
- ❌ Outside: ProgressBar, BackToTop, CustomCursor (always work)

---

## 🧭 Routing & Navigation

### **File-Based Routing**

Next.js App Router uses file system for routing:

```
app/page.tsx           → /
app/projects/page.tsx  → /projects
app/about/page.tsx     → /about
```

### **Route Types**

**1. Static Routes** (28 pages)
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <AboutContent />;
}
```

**2. API Routes**
```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Handle form submission
  return Response.json({ success: true });
}
```

**3. Dynamic Metadata**
```typescript
// app/manifest.ts
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "City Marin Studio",
    short_name: "CM Studio",
    // ... PWA config
  };
}
```

### **Navigation Component**

```typescript
// components/Header/Navigation.tsx
import Link from 'next/link';

const routes = [
  { name: "Projects", path: "/" },
  { name: "About", path: "/about" },
  // ...
];

export function Navigation() {
  return (
    <nav>
      {routes.map(route => (
        <Link key={route.path} href={route.path}>
          {route.name}
        </Link>
      ))}
    </nav>
  );
}
```

**Features:**
- Client-side navigation (no page reload)
- Automatic code splitting per route
- Prefetching on hover
- Active route highlighting

---

## 🔄 State Management

### **Strategy: Local-First**

**Philosophy:** Use React state by default, avoid global state libraries.

```typescript
// ✅ Local state (preferred)
function Component() {
  const [open, setOpen] = useState(false);
  // ...
}

// ✅ URL state for filters
const searchParams = useSearchParams();
const category = searchParams.get('category');

// ❌ Avoid: Redux, Zustand, etc. (unnecessary complexity)
```

### **State Categories**

**1. UI State** - Component-level (`useState`)
```typescript
const [isOpen, setIsOpen] = useState(false);
const [loading, setLoading] = useState(true);
```

**2. URL State** - Shareable filters
```typescript
// app/page.tsx?category=residential&year=2024
const searchParams = useSearchParams();
```

**3. Theme State** - localStorage + CSS class
```typescript
// Persisted in localStorage
// Applied as <html class="nightshift">
```

**4. Form State** - Controlled inputs
```typescript
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: ""
});
```

### **Why No Global State Library?**

**Reasons:**
- Simple application (portfolio site)
- No complex shared state
- Server components provide fresh data
- URL state handles filters
- Local state sufficient for UI

**Benefits:**
- Smaller bundle size
- Less complexity
- Easier to understand
- Faster performance

---

## ⚡ Performance Strategy

### **Optimization Techniques**

**1. Code Splitting**

```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Client-only
});
```

**2. React.memo**

```typescript
// Prevent unnecessary re-renders
export const ProjectCard = React.memo(function ProjectCard({ project }) {
  // ...
});
```

**3. Image Optimization**

```typescript
import Image from 'next/image';

<Image
  src="/project.jpg"
  width={800}
  height={600}
  alt="Project"
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**4. Static Generation**

```typescript
// All pages pre-rendered at build time
export default function Page() {
  // No data fetching = instant load
}
```

### **Bundle Optimization**

**Current Setup:**
- Tree shaking enabled
- Dead code elimination
- CSS purging
- Compression (gzip/brotli)
- Minification

**Results:**
- Build time: ~1200ms
- First Load JS: Optimized
- Lighthouse score: 95+

### **Monitoring**

```bash
# Analyze bundle
npm run build:analyze
```

**Checks:**
- Bundle size
- Chunk distribution
- Duplicate dependencies
- Unused code

---

## 🔍 SEO & Metadata

### **Metadata Strategy**

**1. Static Metadata** (per page)

```typescript
// app/about/page.tsx
export const metadata: Metadata = {
  title: "About Us - City Marin Studio",
  description: "Architecture firm in Istanbul...",
  openGraph: {
    title: "About Us",
    description: "...",
    images: ["/og-about.jpg"]
  }
};
```

**2. Dynamic Metadata** (generated)

```typescript
// app/manifest.ts
export default function manifest() {
  return { /* PWA manifest */ };
}

// app/sitemap.ts
export default function sitemap() {
  return [ /* URL list */ ];
}

// app/robots.ts
export default function robots() {
  return { /* Crawl rules */ };
}
```

**3. Structured Data** (JSON-LD)

```typescript
// components/StructuredData.tsx
export function OrganizationSchema() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "City Marin Studio",
        // ...
      })}
    </script>
  );
}
```

### **SEO Features**

✅ Semantic HTML  
✅ Meta descriptions (unique per page)  
✅ OpenGraph tags (social sharing)  
✅ Twitter Card tags  
✅ Canonical URLs  
✅ Alt text on all images  
✅ Sitemap.xml (dynamic)  
✅ Robots.txt  
✅ Structured data (JSON-LD)  
✅ Fast page loads (<2s TTI)  

---

## 🌙 Dark Mode Implementation

### **Architecture**

**Approach:** CSS class-based toggle with localStorage persistence

```
User clicks toggle
       ↓
JavaScript toggles <html class="nightshift">
       ↓
CSS variables switch values
       ↓
UI updates instantly (no flash)
       ↓
Preference saved to localStorage
```

### **Implementation**

**1. CSS Variables**

```scss
// styles/tokens/_colors.scss
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
}

html.nightshift {
  --bg-primary: #0a0a0a;
  --text-primary: #e5e5e5;
}
```

**2. JavaScript Toggle**

```typescript
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('nightshift');
  
  if (isDark) {
    html.classList.remove('nightshift');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('nightshift');
    localStorage.setItem('theme', 'dark');
  }
}
```

**3. Initial Theme (prevent flash)**

```typescript
// app/layout.tsx - runs before render
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (theme === 'dark' || (!theme && prefersDark)) {
        document.documentElement.classList.add('nightshift');
      }
    })();
  `
}} />
```

### **Features**

✅ Instant toggle (no flash)  
✅ System preference detection  
✅ Persistent user choice  
✅ Accessible (keyboard support)  
✅ Smooth transitions  
✅ All components supported  

---

## 🎬 Animation System

### **GSAP Integration**

**Library:** `lib/animations.ts` (6 utility functions)

```typescript
// 1. Fade In
export const fadeIn = (element: gsap.TweenTarget) => {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out"
  });
};

// 2. Slide In
export const slideIn = (element, direction: 'left' | 'right') => {
  // ...
};

// 3. Scale Up
export const scaleUp = (element) => {
  // ...
};

// 4. Stagger Reveal
export const staggerReveal = (elements) => {
  // ...
};

// 5. Smooth Scroll
export const smoothScrollTo = (target) => {
  // ...
};

// 6. Parallax
export const parallax = (element, speed) => {
  // ...
};
```

### **Usage Pattern**

```typescript
"use client";
import { useEffect, useRef } from 'react';
import { fadeIn } from '@/lib/animations';

export function AnimatedComponent() {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      fadeIn(ref.current);
    }
  }, []);
  
  return <div ref={ref}>Content</div>;
}
```

### **Performance**

- **Lazy Loading:** GSAP loaded only when needed
- **RAF:** RequestAnimationFrame for smooth 60fps
- **GPU Acceleration:** `transform` & `opacity` only
- **Reduced Motion:** Respects `prefers-reduced-motion`

---

## 🛡️ Error Handling

### **Error Boundary**

```typescript
// components/ErrorBoundary.tsx
<ErrorBoundary>
  {/* App content */}
</ErrorBoundary>
```

**Catches:**
- Runtime errors in components
- Render errors
- Lifecycle method errors

**Does NOT catch:**
- Event handler errors (use try/catch)
- Async code errors (use try/catch)
- Server-side errors (use error.tsx)

### **Error UI**

```typescript
// Fallback UI when error caught
<div className={styles.error}>
  <h1>Something went wrong</h1>
  <p>We've been notified and are working on it.</p>
  <button onClick={() => window.location.reload()}>
    Refresh Page
  </button>
</div>
```

### **Loading States**

```typescript
// components/UI/LoadingSpinner.tsx
<LoadingSpinner size="md" />
```

**Sizes:** `sm` (16px) | `md` (24px) | `lg` (32px)

---

## 🚀 Build & Deployment

### **Build Process**

```bash
npm run build
```

**Steps:**
1. TypeScript type check
2. ESLint validation
3. Next.js compilation
4. Static page generation (28 pages)
5. Route optimization
6. Asset optimization
7. Bundle creation

**Output:**
```
.next/
├── static/          # Static assets
├── server/          # Server code
└── standalone/      # Standalone mode (optional)
```

### **Deployment (Vercel)**

**Automatic:**
1. Push to `main` branch
2. Vercel detects changes
3. Runs build
4. Deploys to production
5. Updates DNS

**Manual:**
```bash
vercel
```

### **Environment Variables**

**Production (.env.production):**
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://cmstudio.com
```

---

## 🔒 Security

### **Current Measures**

✅ TypeScript strict mode (type safety)  
✅ ESLint security rules  
✅ No `dangerouslySetInnerHTML` (except theme script)  
✅ Input validation on forms  
✅ HTTPS enforced  
✅ No secrets in code  

### **Planned Enhancements**

- [ ] Content Security Policy (CSP)
- [ ] Rate limiting on API routes
- [ ] CSRF protection
- [ ] Security headers (helmet)

---

## 🧪 Testing Strategy

### **Current State**

**Manual Testing:**
- ESLint (code quality)
- TypeScript (type checking)
- Build test (production validation)
- Browser testing (Chrome, Safari, Firefox)
- Accessibility audit (Lighthouse)

### **Planned Testing**

**Unit Tests** (Jest + React Testing Library)
```typescript
// components/Button.test.tsx
test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

**E2E Tests** (Playwright)
```typescript
// tests/contact-form.spec.ts
test('submits contact form', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('.success')).toBeVisible();
});
```

**Visual Regression** (Percy/Chromatic)
- Screenshot comparison
- Catch unintended visual changes

---

## 📊 Architecture Decisions

### **ADR 001: Next.js 16 App Router**

**Decision:** Use App Router instead of Pages Router

**Reasoning:**
- Server Components by default (better performance)
- Streaming & suspense support
- Better data fetching patterns
- Nested layouts
- Future-proof architecture

### **ADR 002: SASS over Tailwind (Public Pages)**

**Decision:** Use custom SASS design system for public pages

**Reasoning:**
- Full design control
- Token-based system
- Better for complex animations
- No utility class bloat
- Easier to maintain custom brand

### **ADR 003: DB-First Architecture**

**Decision:** All content from database, not hardcoded

**Reasoning:**
- Content updates without deployments
- CMS-ready
- Scalable
- Consistent data source
- Admin panel can edit content

### **ADR 004: TypeScript Strict Mode**

**Decision:** Enable all strict TypeScript flags

**Reasoning:**
- Catch errors at compile time
- Better IDE support
- Safer refactoring
- Self-documenting code
- Zero `any` types

### **ADR 005: CSS Class-Based Dark Mode**

**Decision:** Use CSS class toggle instead of CSS-in-JS

**Reasoning:**
- No flash on page load
- Server-side rendering friendly
- Better performance
- Simple implementation
- Full CSS variable support

---

## 🎯 Future Roadmap

### **Phase 1: Database Migration**

- [ ] Setup PostgreSQL
- [ ] Create Prisma schema
- [ ] Migrate project data
- [ ] Admin CRUD operations

### **Phase 2: Enhanced Features**

- [ ] Blog functionality
- [ ] Case studies
- [ ] Team member pages
- [ ] Newsletter signup

### **Phase 3: Advanced Optimizations**

- [ ] Image CDN
- [ ] Edge caching
- [ ] Analytics integration
- [ ] A/B testing

---

## 📚 Additional Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [SASS Documentation](https://sass-lang.com/documentation/)
- [GSAP Docs](https://gsap.com/docs/v3/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

---

<div align="center">

**Architecture Documentation**  
*Last Updated: June 2026*

[Back to README](./README.md)

</div>
