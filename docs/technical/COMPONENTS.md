# 🧩 Component Library Reference

**City Marin Studio - Complete Component Documentation**

This document catalogs all React components in the project with usage examples, props documentation, and best practices.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Component Categories](#-component-categories)
- [Layout Components](#-layout-components)
- [UI Components](#-ui-components)
- [Animation Components](#-animation-components)
- [Form Components](#-form-components)
- [Utility Components](#-utility-components)
- [Usage Guidelines](#-usage-guidelines)
- [Component Patterns](#-component-patterns)
- [Best Practices](#-best-practices)

---

## 🎯 Overview

### **Component Stats**

| Category | Count | Purpose |
|----------|-------|---------|
| Layout | 2 | Header, Footer |
| UI | 16 | Reusable interface elements |
| Animation | 4 | GSAP animation wrappers |
| Forms | 1 | Contact form with validation |
| Utility | 3 | Error boundaries, providers, metadata |

**Total Components:** 26

### **Component Architecture**

```
components/
├── Layout Components
│   ├── Header/           # Navigation & branding
│   └── Footer/           # Site footer & theme toggle
│
├── UI Components
│   └── UI/               # 16 reusable UI elements
│
├── Animation Components
│   └── animations/       # GSAP wrappers
│
├── Form Components
│   └── forms/            # Form components
│
└── Utility Components
    ├── ClientProviders.tsx    # Client-side providers
    ├── ErrorBoundary.tsx      # Error recovery
    └── StructuredData.tsx     # JSON-LD metadata
```

---

## 📐 Layout Components

### **Header**

**File:** `components/Header/Header.tsx`

**Purpose:** Site navigation, branding, and theme toggle

**Features:**
- Responsive navigation menu
- Active route highlighting
- Dark mode toggle
- Smooth scroll to top on logo click
- Keyboard accessible (Tab, Enter, Escape)
- Mobile menu support

**Usage:**

```typescript
import { Header } from '@/components/Header/Header';

<Header />
```

**Props:** None (uses hardcoded navigation data)

**Navigation Routes:**
- Home (/)
- About (/about)
- Projects (/)
- People (/people)
- Sustainability (/sustainability)
- Careers (/careers)
- Contact (/contact)

**Styling:** `components/Header/Header.module.scss`

---

### **Footer**

**File:** `components/Footer/Footer.tsx`

**Purpose:** Site footer with links, social media, and copyright

**Features:**
- Contact information
- Social media links
- Theme toggle (duplicate of header)
- Responsive layout
- Accessibility compliant

**Usage:**

```typescript
import { Footer } from '@/components/Footer/Footer';

<Footer />
```

**Props:** None

**Styling:** `components/Footer/Footer.module.scss`

---

## 🎨 UI Components

### **1. LoadingSpinner**

**File:** `components/UI/LoadingSpinner.tsx`

**Purpose:** Animated loading indicator

**Features:**
- 3 sizes (sm, md, lg)
- Accessible (aria-label, role="status")
- Pure SVG animation
- No external dependencies

**Usage:**

```typescript
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';

// Small spinner
<LoadingSpinner size="sm" />

// Medium spinner (default)
<LoadingSpinner size="md" />

// Large spinner
<LoadingSpinner size="lg" />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spinner size |

**Sizes:**
- `sm`: 16px × 16px
- `md`: 24px × 24px
- `lg`: 32px × 32px

---

### **2. OptimizedImage**

**File:** `components/UI/OptimizedImage.tsx`

**Purpose:** Next.js Image wrapper with loading states

**Features:**
- Automatic optimization
- Responsive sizes
- Loading skeleton
- Error fallback
- Blur placeholder support

**Usage:**

```typescript
import { OptimizedImage } from '@/components/UI/OptimizedImage';

<OptimizedImage
  src="/images/project.jpg"
  alt="Project title"
  width={800}
  height={600}
  priority={false}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | ✅ | Image source |
| `alt` | `string` | ✅ | Alt text (accessibility) |
| `width` | `number` | ✅ | Image width |
| `height` | `number` | ✅ | Image height |
| `priority` | `boolean` | ❌ | Load eagerly (for above fold) |
| `sizes` | `string` | ❌ | Responsive sizes |

---

### **3. BackToTop**

**File:** `components/UI/BackToTop.tsx`

**Purpose:** Scroll-to-top button

**Features:**
- Appears after scrolling 300px
- Smooth scroll animation
- Keyboard accessible
- ARIA labeled

**Usage:**

```typescript
import { BackToTop } from '@/components/UI/BackToTop';

<BackToTop />
```

**Props:** None

**Behavior:**
- Hidden until user scrolls down 300px
- Smooth scroll to top on click
- Fades in/out with CSS transitions

---

### **4. ProgressBar**

**File:** `components/UI/ProgressBar.tsx`

**Purpose:** Reading progress indicator

**Features:**
- Tracks scroll progress
- Top of viewport indicator
- Smooth updates
- Lightweight (no libraries)

**Usage:**

```typescript
import { ProgressBar } from '@/components/UI/ProgressBar';

<ProgressBar />
```

**Props:** None

**Styling:** CSS custom properties for color

---

### **5. IntroScreen**

**File:** `components/UI/IntroScreen.tsx`

**Purpose:** Landing animation screen

**Features:**
- First-visit animation
- LocalStorage persistence
- Respects `prefers-reduced-motion`
- GSAP powered
- Auto-dismisses after animation

**Usage:**

```typescript
import { IntroScreen } from '@/components/UI/IntroScreen';

<IntroScreen />
```

**Props:** None

**Behavior:**
- Shows only on first visit (localStorage flag)
- Animates logo/branding
- Fades out after 2s
- Skips animation if `prefers-reduced-motion: reduce`

---

### **6. Lightbox**

**File:** `components/UI/Lightbox.tsx`

**Purpose:** Full-screen image viewer

**Features:**
- Full-screen overlay
- Keyboard navigation (Escape to close)
- Click outside to close
- Zoom support
- Accessible (focus trap)

**Usage:**

```typescript
import { Lightbox } from '@/components/UI/Lightbox';

const [open, setOpen] = useState(false);
const [image, setImage] = useState('');

<Lightbox
  open={open}
  image={image}
  alt="Image description"
  onClose={() => setOpen(false)}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | ✅ | Lightbox visibility |
| `image` | `string` | ✅ | Image URL |
| `alt` | `string` | ✅ | Image alt text |
| `onClose` | `() => void` | ✅ | Close handler |

---

### **7. SearchOverlay**

**File:** `components/UI/SearchOverlay.tsx`

**Purpose:** Full-screen search interface

**Features:**
- Keyboard shortcut (Cmd/Ctrl + K)
- Live filtering
- Escape to close
- Focus trap
- Accessible

**Usage:**

```typescript
import { SearchOverlay } from '@/components/UI/SearchOverlay';

const [open, setOpen] = useState(false);

<SearchOverlay
  open={open}
  onClose={() => setOpen(false)}
  projects={allProjects}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | ✅ | Overlay visibility |
| `onClose` | `() => void` | ✅ | Close handler |
| `projects` | `Project[]` | ✅ | Searchable projects |

---

### **8. ProjectDetail**

**File:** `components/UI/ProjectDetail.tsx`

**Purpose:** Project detail modal/page

**Features:**
- Image gallery
- Project metadata
- Responsive layout
- Accessible

**Usage:**

```typescript
import { ProjectDetail } from '@/components/UI/ProjectDetail';

<ProjectDetail project={projectData} />
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `project` | `Project` | ✅ | Project data object |

---

### **9. ProjectImage**

**File:** `components/UI/ProjectImage.tsx`

**Purpose:** Project thumbnail with hover effects

**Usage:**

```typescript
import { ProjectImage } from '@/components/UI/ProjectImage';

<ProjectImage
  src="/images/project.jpg"
  alt="Project name"
  onClick={() => console.log('clicked')}
/>
```

---

### **10. KeyboardHelp**

**File:** `components/UI/KeyboardHelp.tsx`

**Purpose:** Keyboard shortcuts overlay

**Features:**
- Shows all keyboard shortcuts
- Toggles with `?` key
- Accessible
- Responsive

**Shortcuts:**
- `?` - Show/hide help
- `Cmd/Ctrl + K` - Search
- `Escape` - Close overlays
- Arrow keys - Navigate

---

### **11. GlobalKeyboard**

**File:** `components/UI/GlobalKeyboard.tsx`

**Purpose:** Global keyboard event handler

**Features:**
- Registers global shortcuts
- Prevents conflicts
- Accessible

**Usage:**

```typescript
import { GlobalKeyboard } from '@/components/UI/GlobalKeyboard';

<GlobalKeyboard />
```

---

### **12. LangToggle**

**File:** `components/UI/LangToggle.tsx`

**Purpose:** Language switcher (placeholder)

**Note:** Currently a placeholder for future i18n

---

### **13. ReloadButton**

**File:** `components/UI/ReloadButton.tsx`

**Purpose:** Manual page reload button

**Usage:**

```typescript
import { ReloadButton } from '@/components/UI/ReloadButton';

<ReloadButton />
```

---

### **14. ScrollReveal (CSS-based)**

**File:** `components/UI/ScrollReveal.tsx`

**Purpose:** IntersectionObserver-based reveal animations

**Features:**
- No external dependencies
- Adds `.in-view` class on scroll
- Works with CSS animations
- Fallback for no IntersectionObserver

**Usage:**

```typescript
import { ScrollReveal } from '@/components/UI/ScrollReveal';

// Add to layout
<ScrollReveal />

// Elements with .reveal class will animate
<div className="reveal">Content</div>
```

---

### **15. StudioTour**

**File:** `components/UI/StudioTour.tsx`

**Purpose:** Interactive studio tour component

---

### **16. ArchSVG**

**File:** `components/UI/ArchSVG.tsx`

**Purpose:** Architectural SVG icon/illustration

---

## 🎬 Animation Components

### **1. GSAPScrollReveal**

**File:** `components/animations/ScrollReveal.tsx`

**Purpose:** GSAP-powered scroll reveal animations

**Features:**
- Fade in on scroll
- Customizable delay & distance
- ScrollTrigger integration
- Cleanup on unmount

**Usage:**

```typescript
import { GSAPScrollReveal } from '@/components/animations/ScrollReveal';

<GSAPScrollReveal delay={0.2} y={50}>
  <div>Content animates on scroll</div>
</GSAPScrollReveal>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to animate |
| `delay` | `number` | `0` | Animation delay (seconds) |
| `y` | `number` | `30` | Vertical offset (pixels) |
| `className` | `string` | `''` | Additional CSS class |

---

### **2. HoverScale**

**File:** `components/animations/HoverScale.tsx`

**Purpose:** Scale animation on hover

**Usage:**

```typescript
import { HoverScale } from '@/components/animations/HoverScale';

<HoverScale scale={1.05}>
  <div>Scales on hover</div>
</HoverScale>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to scale |
| `scale` | `number` | `1.1` | Scale factor |
| `duration` | `number` | `0.3` | Animation duration |

---

### **3. StaggerList**

**File:** `components/animations/StaggerList.tsx`

**Purpose:** Stagger animation for list items

**Usage:**

```typescript
import { StaggerList } from '@/components/animations/StaggerList';

<StaggerList stagger={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerList>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | List items |
| `stagger` | `number` | `0.1` | Delay between items |

---

### **4. ParallaxSection**

**File:** `components/animations/ParallaxSection.tsx`

**Purpose:** Parallax scrolling effect

**Usage:**

```typescript
import { ParallaxSection } from '@/components/animations/ParallaxSection';

<ParallaxSection speed={0.5}>
  <div>Parallax content</div>
</ParallaxSection>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to parallax |
| `speed` | `number` | `0.5` | Parallax speed (0-1) |

---

## 📝 Form Components

### **ContactForm**

**File:** `components/forms/ContactForm.tsx`

**Purpose:** Contact form with validation

**Features:**
- Client-side validation
- Loading states (with LoadingSpinner)
- Success/error messages
- Accessible (ARIA labels, roles)
- Email validation
- Required field validation

**Usage:**

```typescript
import { ContactForm } from '@/components/forms/ContactForm';

<ContactForm />
```

**Props:** None

**Fields:**
- Name (required)
- Email (required, validated)
- Subject (required)
- Message (required)

**Validation Rules:**
- Name: min 2 characters
- Email: valid email format
- Subject: min 3 characters
- Message: min 10 characters

**API Endpoint:** `POST /api/contact`

**States:**
- Idle - Form ready
- Submitting - LoadingSpinner visible
- Success - Green success message
- Error - Red error message

---

## 🛠️ Utility Components

### **1. ClientProviders**

**File:** `components/ClientProviders.tsx`

**Purpose:** Wrap client-only providers

**Features:**
- Theme provider
- GSAP context provider
- Analytics (future)
- Client-side only (`"use client"`)

**Usage:**

```typescript
import { ClientProviders } from '@/components/ClientProviders';

<ClientProviders>
  {children}
</ClientProviders>
```

**Used in:** `app/layout.tsx`

---

### **2. ErrorBoundary**

**File:** `components/ErrorBoundary.tsx`

**Purpose:** React error boundary for error recovery

**Features:**
- Catches runtime errors
- User-friendly fallback UI
- Refresh button
- Error details in dev mode
- Logs errors to console

**Usage:**

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | ✅ | Content to protect |

**Fallback UI:**
- Error icon
- "Something went wrong" message
- Refresh button
- Error details (dev only)

**Lifecycle Methods:**
- `getDerivedStateFromError` - Update state on error
- `componentDidCatch` - Log error & info

---

### **3. StructuredData**

**File:** `components/StructuredData.tsx`

**Purpose:** JSON-LD structured data for SEO

**Features:**
- Organization schema
- WebSite schema
- Type-safe schema generation
- Server-side rendering

**Usage:**

```typescript
import { OrganizationSchema, WebSiteSchema } from '@/components/StructuredData';

<OrganizationSchema />
<WebSiteSchema />
```

**Schemas:**
- Organization (company info)
- WebSite (site search)
- BreadcrumbList (navigation)
- Article (blog posts)

---

## 📖 Usage Guidelines

### **Server vs Client Components**

**Server Components (default):**
```typescript
// No "use client" directive
export function ServerComponent() {
  // Can fetch data, no interactivity
}
```

**Client Components (interactive):**
```typescript
'use client';
export function ClientComponent() {
  const [state, setState] = useState();
  // Can use hooks, event handlers
}
```

### **When to Use Client Components**

✅ Use `"use client"` when you need:
- `useState`, `useEffect`, hooks
- Event handlers (onClick, onChange)
- Browser APIs (window, localStorage)
- GSAP animations
- Form state

❌ Don't use `"use client"` for:
- Static content
- Data fetching (use Server Components)
- Metadata generation
- SEO components

---

## 🎯 Component Patterns

### **1. Composition Pattern**

```typescript
// Parent provides context
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### **2. Controlled Components**

```typescript
// Parent controls state
function Parent() {
  const [value, setValue] = useState('');
  return <Input value={value} onChange={setValue} />;
}
```

### **3. Render Props**

```typescript
<DataFetcher>
  {(data, loading) => (
    loading ? <Spinner /> : <Display data={data} />
  )}
</DataFetcher>
```

### **4. HOC (Higher-Order Component)**

```typescript
const Enhanced = withAnimation(BaseComponent);
```

---

## ✅ Best Practices

### **Component Structure**

```typescript
'use client'; // Only if needed

import React from 'react';
import styles from './Component.module.scss';

type ComponentProps = {
  // Props with TypeScript
  title: string;
  optional?: boolean;
};

export function Component({ title, optional = false }: ComponentProps) {
  // Component logic
  
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}
```

### **Naming Conventions**

- **Files:** `PascalCase.tsx` (e.g., `LoadingSpinner.tsx`)
- **Components:** `PascalCase` (e.g., `LoadingSpinner`)
- **Props Types:** `ComponentNameProps` (e.g., `LoadingSpinnerProps`)
- **CSS Modules:** `Component.module.scss`

### **Props Best Practices**

✅ **Do:**
- Use TypeScript for all props
- Provide default values
- Document complex props
- Keep props minimal

❌ **Don't:**
- Pass entire objects when only 1 field needed
- Use `any` type
- Have >10 props (refactor instead)

### **Performance Tips**

**1. Use React.memo for heavy components:**
```typescript
export const HeavyComponent = React.memo(function HeavyComponent(props) {
  // Expensive rendering
});
```

**2. Lazy load heavy components:**
```typescript
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <LoadingSpinner />
});
```

**3. Avoid inline functions in JSX:**
```typescript
// ❌ Bad
<button onClick={() => doSomething()}>

// ✅ Good
const handleClick = useCallback(() => doSomething(), []);
<button onClick={handleClick}>
```

### **Accessibility Checklist**

✅ All interactive elements have:
- Keyboard support (Enter, Space)
- ARIA labels
- Focus indicators
- Screen reader text

✅ All images have:
- Alt text
- Proper aspect ratios

✅ All forms have:
- Labels
- Error messages
- Validation feedback

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/rendering)
- [Accessibility Guide](https://www.w3.org/WAI/WCAG21/quickref/)
- [GSAP Docs](https://gsap.com/docs/v3/)

---

<div align="center">

**Component Library Reference**  
*Last Updated: June 17, 2026*

[Back to Documentation Hub](../README.md)

</div>
