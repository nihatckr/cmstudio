# 🎨 Styling Architecture Guide

**City Marin Studio - SCSS Design System Documentation**

Complete guide to the SCSS architecture, token system, and styling conventions.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Token System](#-token-system)
- [Responsive Design](#-responsive-design)
- [Dark Mode](#-dark-mode)
- [CSS Modules](#-css-modules)
- [Animation System](#-animation-system)
- [Best Practices](#-best-practices)
- [Common Patterns](#-common-patterns)
- [Troubleshooting](#-troubleshooting)

---

## 🎯 Overview

### **Design System Stats**

| Metric | Value |
|--------|-------|
| Total SCSS Files | 42 |
| Design Tokens | 80+ |
| Color Palette | 50+ colors (light/dark) |
| Breakpoints | 6 responsive sizes |
| Components | 13 styled components |
| Animation Utilities | 6 GSAP helpers |
| WCAG Compliance | Level AA (4.5:1+) |

### **Philosophy**

**Token-First Approach:**
- All design values defined as tokens
- No magic numbers
- Consistent spacing, colors, typography
- Theme-aware (light/dark mode)

**7-Layer Architecture (ITCSS):**
```
1. Tokens    → Design values (variables)
2. Tools     → Mixins & functions
3. Base      → Global styles
4. Layout    → Structure
5. Utilities → Helper classes
6. Components → UI components
7. Pages     → Page-specific
```

---

## 🏗️ Architecture

### **Folder Structure**

```
styles/
│
├── main.scss              ← Entry point (imports all layers)
├── _nightshift.scss       ← Dark mode overrides
│
├── tokens/                ← Layer 1: Design Tokens
│   ├── _colors.scss          # 80+ color tokens
│   ├── _typography.scss      # Font system
│   ├── _spacing.scss         # Spacing scale
│   ├── _motion.scss          # Animation timings
│   └── _breakpoints.scss     # Responsive breakpoints
│
├── tools/                 ← Layer 2: Mixins & Functions
│   ├── _mixins.scss          # Reusable mixins
│   └── _functions.scss       # SCSS functions
│
├── base/                  ← Layer 3: Global Styles
│   ├── _reset.scss           # CSS reset
│   ├── _typography.scss      # Base text styles
│   └── _globalAnimations.scss # Global keyframes
│
├── layout/                ← Layer 4: Structure
│   ├── _grid.scss            # Grid system
│   ├── _flex.scss            # Flexbox utilities
│   └── _containers.scss      # Content containers
│
├── utilities/             ← Layer 5: Helper Classes
│   ├── _spacing.scss         # Margin/padding utils
│   ├── _text.scss            # Text utilities
│   └── _display.scss         # Display utilities
│
├── components/            ← Layer 6: Component Styles
│   ├── _button.scss
│   ├── _card.scss
│   ├── _header.scss
│   ├── _footer.scss
│   └── ... (13 components)
│
└── pages/                 ← Layer 7: Page-Specific
    ├── _home.scss
    ├── _about.scss
    ├── _contact.scss
    └── ...
```

### **Import Order**

**File:** `styles/main.scss`

```scss
// 1. Tokens (variables first)
@use 'tokens/colors';
@use 'tokens/typography';
@use 'tokens/spacing';
@use 'tokens/motion';
@use 'tokens/breakpoints';

// 2. Tools (mixins & functions)
@use 'tools/mixins';
@use 'tools/functions';

// 3. Base (global styles)
@use 'base/reset';
@use 'base/typography';
@use 'base/globalAnimations';

// 4. Layout (structure)
@use 'layout/grid';
@use 'layout/flex';
@use 'layout/containers';

// 5. Utilities (helpers)
@use 'utilities/spacing';
@use 'utilities/text';
@use 'utilities/display';

// 6. Components (UI)
@use 'components/button';
@use 'components/card';
// ... all components

// 7. Pages (page-specific)
@use 'pages/home';
@use 'pages/about';
// ... all pages

// 8. Dark Mode (last)
@use 'nightshift';
```

---

## 🎨 Token System

### **1. Colors**

**File:** `styles/tokens/_colors.scss`

**Structure:**
```scss
:root {
  // ── Brand Colors ──
  --color-primary: #0ea5e9;        // Sky blue
  --color-primary-dark: #0284c7;
  --color-primary-light: #38bdf8;
  
  // ── Neutral Colors ──
  --color-black: #0a0a0a;
  --color-white: #ffffff;
  --color-grey: #757575;           // WCAG AA (4.61:1)
  
  // ── Semantic Colors ──
  --color-success: #008048;        // WCAG AA (5.02:1)
  --color-error: #dc2626;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
  
  // ── Background Colors ──
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e5e5e5;
  
  // ── Text Colors ──
  --text-primary: #1a1a1a;
  --text-secondary: #525252;
  --text-tertiary: #737373;
  --text-inverse: #ffffff;
  
  // ── Border Colors ──
  --border-primary: #e5e5e5;
  --border-secondary: #d4d4d4;
  --border-focus: #0ea5e9;
}

// Dark Mode (html.nightshift)
html.nightshift {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2a2a2a;
  
  --text-primary: #e5e5e5;
  --text-secondary: #a3a3a3;
  --text-tertiary: #737373;
  --text-inverse: #0a0a0a;
  
  --border-primary: #2a2a2a;
  --border-secondary: #3a3a3a;
}
```

**Usage:**
```scss
.button {
  background: var(--color-primary);
  color: var(--text-inverse);
  border: 1px solid var(--border-primary);
}
```

**Color Contrast (WCAG AA):**
✅ All text colors: 4.5:1+ contrast ratio  
✅ Large text: 3:1+ contrast ratio  
✅ Interactive elements: 3:1+ contrast ratio  

---

### **2. Typography**

**File:** `styles/tokens/_typography.scss`

```scss
:root {
  // ── Font Families ──
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  // ── Font Sizes ──
  --text-xs: 0.75rem;    // 12px
  --text-sm: 0.875rem;   // 14px
  --text-base: 1rem;     // 16px
  --text-lg: 1.125rem;   // 18px
  --text-xl: 1.25rem;    // 20px
  --text-2xl: 1.5rem;    // 24px
  --text-3xl: 1.875rem;  // 30px
  --text-4xl: 2.25rem;   // 36px
  --text-5xl: 3rem;      // 48px
  
  // ── Font Weights ──
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  // ── Line Heights ──
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  // ── Letter Spacing ──
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

**Usage:**
```scss
h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}
```

---

### **3. Spacing**

**File:** `styles/tokens/_spacing.scss`

**8px Base Scale:**
```scss
:root {
  --space-0: 0;
  --space-1: 0.25rem;   // 4px
  --space-2: 0.5rem;    // 8px
  --space-3: 0.75rem;   // 12px
  --space-4: 1rem;      // 16px
  --space-5: 1.25rem;   // 20px
  --space-6: 1.5rem;    // 24px
  --space-8: 2rem;      // 32px
  --space-10: 2.5rem;   // 40px
  --space-12: 3rem;     // 48px
  --space-16: 4rem;     // 64px
  --space-20: 5rem;     // 80px
  --space-24: 6rem;     // 96px
  --space-32: 8rem;     // 128px
}
```

**Usage:**
```scss
.card {
  padding: var(--space-6);      // 24px
  margin-bottom: var(--space-8); // 32px
  gap: var(--space-4);           // 16px
}
```

---

### **4. Motion**

**File:** `styles/tokens/_motion.scss`

```scss
:root {
  // ── Durations ──
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
  
  // ── Easings ──
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  // ── Transitions ──
  --transition-all: all var(--duration-base) var(--ease-in-out);
  --transition-colors: color var(--duration-base) var(--ease-in-out),
                       background-color var(--duration-base) var(--ease-in-out),
                       border-color var(--duration-base) var(--ease-in-out);
  --transition-transform: transform var(--duration-base) var(--ease-out);
}

// Respect user preference
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
  }
}
```

**Usage:**
```scss
.button {
  transition: var(--transition-colors);
  
  &:hover {
    transform: translateY(-2px);
    transition: var(--transition-transform);
  }
}
```

---

### **5. Breakpoints**

**File:** `styles/tokens/_breakpoints.scss`

**Mobile-First Approach:**
```scss
:root {
  --bp-xs: 320px;   // Extra small
  --bp-sm: 640px;   // Small (mobile)
  --bp-md: 768px;   // Medium (tablet)
  --bp-lg: 1024px;  // Large (desktop)
  --bp-xl: 1280px;  // Extra large
  --bp-2xl: 1536px; // 2X large
}
```

**Mixin Usage:**
```scss
@use '../tokens/breakpoints' as bp;

.container {
  padding: var(--space-4);
  
  @media (min-width: bp.$md) {
    padding: var(--space-8);
  }
  
  @media (min-width: bp.$lg) {
    padding: var(--space-12);
    max-width: 1200px;
  }
}
```

---

## 📱 Responsive Design

### **Mobile-First Strategy**

**Base styles for mobile, enhance for larger screens:**

```scss
.hero {
  // Mobile (default)
  font-size: var(--text-2xl);
  padding: var(--space-6);
  
  // Tablet
  @media (min-width: 768px) {
    font-size: var(--text-3xl);
    padding: var(--space-10);
  }
  
  // Desktop
  @media (min-width: 1024px) {
    font-size: var(--text-5xl);
    padding: var(--space-16);
  }
}
```

### **Responsive Typography**

```scss
h1 {
  font-size: clamp(2rem, 5vw, 4rem); // 32px → 64px
  line-height: var(--leading-tight);
}

p {
  font-size: clamp(1rem, 2vw, 1.125rem); // 16px → 18px
}
```

### **Container Queries** (future)

```scss
.card {
  container-type: inline-size;
  
  .card-title {
    font-size: var(--text-lg);
    
    @container (min-width: 400px) {
      font-size: var(--text-2xl);
    }
  }
}
```

---

## 🌙 Dark Mode

### **Implementation**

**Toggle Mechanism:**
```javascript
// Toggle dark mode
document.documentElement.classList.toggle('nightshift');
localStorage.setItem('theme', isDark ? 'dark' : 'light');
```

**CSS Structure:**
```scss
// Light mode (default)
:root {
  --bg-primary: #ffffff;
  --text-primary: #0a0a0a;
}

// Dark mode
html.nightshift {
  --bg-primary: #0a0a0a;
  --text-primary: #e5e5e5;
}

// Component uses tokens
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

### **Dark Mode Best Practices**

**1. Use CSS Variables (not color directly):**
```scss
// ❌ Bad
.button {
  background: #0ea5e9;
}

// ✅ Good
.button {
  background: var(--color-primary);
}
```

**2. Test Both Modes:**
- Check color contrast in both modes
- Verify all components look good
- Test transitions between modes

**3. System Preference Detection:**
```scss
// Detect OS dark mode preference
@media (prefers-color-scheme: dark) {
  :root:not(.nightshift) {
    // Optional: Auto dark mode
  }
}
```

---

## 🎯 CSS Modules

### **Why CSS Modules?**

✅ **Benefits:**
- Scoped styles (no conflicts)
- Type-safe class names (TypeScript)
- Automatic code splitting
- Tree shaking (unused styles removed)

### **File Naming**

```
ComponentName.tsx        → React component
ComponentName.module.scss → CSS Module styles
```

### **Usage Pattern**

**Component File:**
```typescript
// components/Card/Card.tsx
import styles from './Card.module.scss';

export function Card({ title, children }: CardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
```

**Styles File:**
```scss
// components/Card/Card.module.scss
@use '@/styles/tokens' as *;

.card {
  background: var(--bg-secondary);
  padding: var(--space-6);
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-4px);
    transition: var(--transition-transform);
  }
}

.title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
}

.content {
  color: var(--text-secondary);
}
```

### **Global Selectors in CSS Modules**

```scss
// Escape to global scope
:global(.nightshift) .card {
  border-color: var(--border-primary);
}

// Or wrap entire selector
:global {
  body.modal-open {
    overflow: hidden;
  }
}
```

### **Composing Styles**

```scss
.button {
  padding: var(--space-4);
  border-radius: 6px;
}

.primaryButton {
  composes: button;
  background: var(--color-primary);
  color: white;
}

.secondaryButton {
  composes: button;
  background: transparent;
  border: 1px solid var(--border-primary);
}
```

---

## 🎬 Animation System

### **CSS Animations**

**Global Keyframes:**
```scss
// styles/base/_globalAnimations.scss
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

**Usage:**
```scss
.hero {
  animation: fadeIn var(--duration-slow) var(--ease-out);
}

.loadingDot {
  animation: pulse 1.5s var(--ease-in-out) infinite;
}
```

### **GSAP Animations**

**Utility Functions:**
```typescript
// lib/animations.ts
import gsap from 'gsap';

export const fadeIn = (element: HTMLElement) => {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out'
  });
};

export const slideIn = (element: HTMLElement, direction: 'left' | 'right') => {
  return gsap.from(element, {
    x: direction === 'left' ? -100 : 100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
};
```

**Usage in Components:**
```typescript
'use client';
import { useEffect, useRef } from 'react';
import { fadeIn } from '@/lib/animations';

export function AnimatedCard() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      fadeIn(ref.current);
    }
  }, []);
  
  return <div ref={ref}>Content</div>;
}
```

### **Reduced Motion**

**Respect User Preference:**
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ✅ Best Practices

### **1. Use Design Tokens**

```scss
// ❌ Bad: Magic numbers
.card {
  padding: 24px;
  margin-bottom: 32px;
  color: #0a0a0a;
}

// ✅ Good: Tokens
.card {
  padding: var(--space-6);
  margin-bottom: var(--space-8);
  color: var(--text-primary);
}
```

### **2. Kebab-Case for CSS Classes**

```scss
// ❌ Bad
.cardContainer { }
.card_title { }

// ✅ Good
.card-container { }
.card-title { }
```

### **3. BEM for Global Classes**

```scss
// Block Element Modifier
.card { }
.card__title { }
.card__content { }
.card--featured { }
.card--small { }
```

### **4. Avoid Deep Nesting**

```scss
// ❌ Bad: Too deep (>3 levels)
.card {
  .header {
    .title {
      .icon {
        color: red;
      }
    }
  }
}

// ✅ Good: Flat structure
.card { }
.card-header { }
.card-title { }
.card-icon {
  color: var(--color-error);
}
```

### **5. Mobile-First Media Queries**

```scss
// ❌ Bad: Desktop-first
.hero {
  font-size: var(--text-5xl);
  
  @media (max-width: 768px) {
    font-size: var(--text-2xl);
  }
}

// ✅ Good: Mobile-first
.hero {
  font-size: var(--text-2xl);
  
  @media (min-width: 768px) {
    font-size: var(--text-5xl);
  }
}
```

### **6. Organize Imports**

```scss
// Component file
@use '@/styles/tokens' as *;        // Tokens first
@use '@/styles/tools/mixins' as mx; // Tools second
@use 'sass:math';                   // Sass built-ins last

.component {
  // Styles
}
```

---

## 🔧 Common Patterns

### **1. Centered Container**

```scss
.container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-6);
}
```

### **2. Flexbox Center**

```scss
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### **3. Grid Layout**

```scss
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}
```

### **4. Aspect Ratio**

```scss
.image-wrapper {
  aspect-ratio: 16 / 9;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
```

### **5. Truncate Text**

```scss
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### **6. Focus Styles**

```scss
.button {
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
```

---

## 🐛 Troubleshooting

### **Issue: Styles Not Applying**

**Solution:**
1. Check import order in `main.scss`
2. Verify CSS Module file naming (`*.module.scss`)
3. Clear `.next` cache: `rm -rf .next`
4. Restart dev server

### **Issue: Dark Mode Not Working**

**Solution:**
1. Check `html.nightshift` class is applied
2. Verify CSS variables defined in both `:root` and `html.nightshift`
3. Check component uses `var(--token)` not hardcoded colors

### **Issue: Responsive Breakpoint Not Working**

**Solution:**
1. Use `min-width` not `max-width` (mobile-first)
2. Check breakpoint value imported correctly
3. Verify media query syntax

### **Issue: Animation Not Smooth**

**Solution:**
1. Use `transform` and `opacity` (GPU-accelerated)
2. Avoid animating `width`, `height`, `top`, `left`
3. Add `will-change: transform` for complex animations
4. Check for JavaScript conflicts

---

## 📚 Additional Resources

- [SASS Documentation](https://sass-lang.com/documentation/)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [ITCSS Architecture](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [BEM Naming](http://getbem.com/naming/)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

<div align="center">

**Styling Architecture Guide**  
*Last Updated: June 17, 2026*

[Back to Documentation Hub](../README.md)

</div>
