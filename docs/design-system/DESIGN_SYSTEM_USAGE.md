# DESIGN SYSTEM USAGE GUIDE

**City Marin Studio - Practical Implementation Guide for Developers**

---

## 📖 Table of Contents

1. [Quick Start](#quick-start)
2. [Using Tokens](#using-tokens)
3. [Creating Components](#creating-components)
4. [Responsive Design](#responsive-design)
5. [Motion & Animation](#motion--animation)
6. [Dark Mode](#dark-mode)
7. [Common Patterns](#common-patterns)
8. [Utilities Reference](#utilities-reference)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### **Project Structure**

```
cmstudio/
├── styles/                    ← All SCSS files
│   ├── tokens/               ← Design values
│   ├── tools/                ← Mixins & functions
│   ├── base/                 ← Global styles
│   ├── layout/               ← Grid, flex, container
│   ├── utilities/            ← Auto-generated utilities
│   ├── components/           ← UI components
│   └── main.scss             ← Central import
├── app/                       ← Next.js pages
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.scss
└── components/               ← React components (future)
```

### **Styling Any Element**

```tsx
// Option 1: Use global utilities (easiest)
<div className="flex-center gap-4 p-8 bg-white text-black rounded-lg">
  Content
</div>

// Option 2: Create custom component SCSS
// styles/components/_mycomponent.scss
.my-component {
  @include flex-center;
  gap: $space-4;
  padding: $space-8;
  background-color: $color-white;
  color: $color-black;
}

// Then use
<div className="my-component">Content</div>
```

---

## 🎨 Using Tokens

### **Colors**

**Available Color Tokens:**

```scss
// Core palette (use these)
$color-white         // #ffffff
$color-black         // #1b1b1b
$color-light-grey    // #969696
$color-grey          // #898989
$color-mid-grey      // #6b6b6b
$color-dark-grey     // #797979
$color-lighter-grey  // #c4c4c4

// Semantic colors (preferred)
$fg-primary          // Foreground primary (black)
$fg-secondary        // Secondary text (grey)
$fg-tertiary         // Tertiary text (mid-grey)
$bg-page             // Page background (white)
$bg-menu             // Menu background (white)
$bg-overlay          // Overlay background (white)
$bg-project-card     // Card background (#f7f7f7)
$bg-nightshift       // Dark mode background (#000000)
```

**Usage:**

```scss
// ✅ CORRECT - Use semantic colors
.card {
  background-color: $bg-project-card;
  color: $fg-primary;
  border-color: rgba($color-black, 0.1);
}

// ❌ INCORRECT - No hardcoded hex
.card {
  background-color: #f7f7f7;  // Wrong
  color: #1b1b1b;              // Wrong
}
```

### **Typography**

**Font Size Scale:**

```scss
$text-xs   // 11px  - Meta labels, icon titles
$text-sm   // 12px  - Nav items, footer, captions
$text-md   // 13px  - News captions
$text-body // 14px  - Base body text
$text-lg   // 16px  - Intro body
$text-xl   // 18px  - Small headlines
$text-2xl  // 21px  - Intro headline desktop
$text-3xl  // 28px  - Letter animation
$text-4xl  // 40px  - People names mobile
$text-5xl  // 55px  - H1 mobile
$text-6xl  // 60px  - H1 tablet
$text-7xl  // 70px  - H1 desktop
$text-8xl  // 100px - Large H1 / news H1
```

**Line Heights:**

```scss
$lh-tight   // 1.2   - Headlines
$lh-body    // 1.3125 - Body text
$lh-relaxed // 1.5   - Relaxed paragraphs
```

**Letter Spacing:**

```scss
$tracking-menu  // 0.04em - Navigation items
$tracking-upper // 0.06em - Uppercase labels
```

**Usage:**

```scss
// ✅ Using type-style mixin (recommended)
.heading {
  @include type-style($text-5xl, $lh-tight);
  
  @include respond-to('md') {
    @include type-style($text-6xl, $lh-tight);
  }
}

// ✅ Using individual tokens
.body-text {
  font-size: $text-body;
  line-height: $lh-body;
  letter-spacing: $tracking-menu;
}

// ❌ INCORRECT
.heading {
  font-size: 55px;
  line-height: 1.2;
}
```

### **Spacing**

**Spacing Scale (4px base):**

```scss
$space-1  // 4px
$space-2  // 8px
$space-3  // 12px
$space-4  // 16px
$space-5  // 20px
$space-6  // 24px
$space-7  // 28px
$space-8  // 32px
$space-9  // 36px
$space-10 // 40px
$space-11 // 44px
$space-12 // 48px
$space-13 // 52px
$space-14 // 56px
$space-15 // 60px (also 150px for large gaps)
```

**Global Padding:**

```scss
$global-padding        // 30px (desktop)
$global-padding-mobile // 20px (mobile)
```

**Usage:**

```scss
// ✅ CORRECT - Use spacing scale
.component {
  padding: $space-4 $space-6;
  margin-bottom: $space-8;
  gap: $space-3;
}

// Using responsive padding mixin
.container {
  @include responsive-padding($space-8, $space-4);
  // Desktop: 32px, Mobile: 16px
}

// ❌ INCORRECT
.component {
  padding: 16px 24px;
  gap: 12px;
}
```

### **Motion**

**Durations:**

```scss
$duration-fast   // 0.2s  - Micro interactions (hover, focus)
$duration-base   // 0.3s  - Standard transitions
$duration-slow   // 0.5s  - Image fades
$duration-page   // 250ms - Page transitions
```

**Easing Functions:**

```scss
$ease-out-quad // cubic-bezier(0.25, 0.46, 0.45, 0.94) - Entrance
$ease-in-out   // ease-in-out - Smooth transitions
```

**Usage:**

```scss
// ✅ CORRECT
.button {
  @include transition(all, $duration-fast, $ease-in-out);
  
  &:hover {
    background-color: $color-grey;
  }
}

// For animations
.hero__title__word {
  animation: slideUp 0.8s $ease-out-quad forwards;
}

// ❌ INCORRECT
.button {
  transition: all 0.3s ease-in-out;
}
```

### **Z-Index**

**Semantic Z-Index Values:**

```scss
$z-case      // 1    - Stacking context
$z-dropdown  // 100  - Dropdowns
$z-sticky    // 500  - Sticky elements
$z-overlay   // 100000 - Overlays
$z-modal     // 999999 - Modals
$z-menu      // 9999 - Navigation menu
$z-nav-sub   // 10000 - Submenu
```

**Usage:**

```scss
// ✅ CORRECT
.modal {
  position: fixed;
  z-index: $z-modal;
}

.compare-tray {
  z-index: $z-overlay;
}

// ❌ INCORRECT
.modal {
  z-index: 999999;
}
```

---

## 🧩 Creating Components

### **Step 1: Plan Component**

Before writing code, decide:
- Component name (BEM block name)
- Elements (child selectors)
- Modifiers (variants/states)
- Responsive behavior
- Dark mode support needed?

**Example - New "Modal" Component:**

```
Component: .modal
Elements:
  .modal__header
  .modal__body
  .modal__footer
  .modal__close

States:
  .modal.open (visible)
  .modal.loading (loading state)

Modifiers:
  .modal--sm (small)
  .modal--lg (large)

Responsive:
  Mobile: full screen
  Desktop: centered, max-width
```

### **Step 2: Create Component File**

Create `/styles/components/_modal.scss`:

```scss
// components/_modal.scss
// 
// Component: Modal
// Purpose: Overlay dialog for important content
// 
// States:
//   .modal.open     - Modal visible
//   .modal.loading  - Loading state
// 
// Modifiers:
//   .modal--sm      - Small modal
//   .modal--lg      - Large modal
// 
// Responsive:
//   Mobile: Full screen, bottom-slide
//   Desktop: Centered, fixed width
// 
// Dark Mode: Supported
// 
// Usage:
//   <div class="modal open">
//     <div class="modal__header">Title</div>
//     <div class="modal__body">Content</div>
//     <button class="modal__close">×</button>
//   </div>

@use '../tokens/colors' as *;
@use '../tokens/typography' as *;
@use '../tokens/spacing' as *;
@use '../tokens/motion' as *;
@use '../tokens/z-index' as *;
@use '../tools/mixins' as *;

// ============================================================================
// MODAL OVERLAY
// ============================================================================

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color-black, 0.5);
  z-index: $z-modal;
  @include flex-center;
  @include transition(opacity, $duration-base, $ease-in-out);

  @include nightshift(background-color, rgba($color-white, 0.1));

  // Show modal
  &.open {
    display: flex;
    animation: fadeIn $duration-base $ease-in-out forwards;
  }

  @include respond-to('sm') {
    align-items: flex-end;
  }
}

// ============================================================================
// MODAL CONTAINER
// ============================================================================

.modal__container {
  background-color: $color-white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  @include transition(all, $duration-base, $ease-in-out);
  box-shadow: 0 10px 40px rgba($color-black, 0.2);

  @include nightshift(background-color, $bg-nightshift);
  @include nightshift(box-shadow, 0 10px 40px rgba($color-white, 0.1));

  // Modifiers
  &.modal--sm {
    max-width: 400px;
  }

  &.modal--lg {
    max-width: 800px;
  }

  // Mobile responsive
  @include respond-to('sm') {
    width: calc(100% - $space-4);
    border-radius: 16px 16px 0 0;
    max-height: 80vh;
  }
}

// ============================================================================
// MODAL SECTIONS
// ============================================================================

.modal__header {
  padding: $space-6;
  border-bottom: 1px solid rgba($color-black, 0.1);
  @include flex-between;
  align-items: center;

  @include nightshift(border-bottom-color, rgba($color-white, 0.1));
}

.modal__title {
  @include type-style($text-2xl, $lh-tight);
  color: $fg-primary;
  margin: 0;

  @include nightshift(color, $color-white);
}

.modal__body {
  padding: $space-6;
  color: $fg-secondary;

  @include nightshift(color, $color-light-grey);
}

.modal__footer {
  padding: $space-6;
  border-top: 1px solid rgba($color-black, 0.1);
  @include flex-between;
  gap: $space-4;

  @include nightshift(border-top-color, rgba($color-white, 0.1));

  @include respond-to('sm') {
    flex-direction: column-reverse;
  }
}

// ============================================================================
// MODAL CLOSE BUTTON
// ============================================================================

.modal__close {
  @include flex-center;
  width: $space-6;
  height: $space-6;
  border: none;
  background-color: transparent;
  color: $fg-secondary;
  font-size: $text-xl;
  cursor: pointer;
  @include transition(color);

  @include nightshift(color, $color-light-grey);

  &:hover {
    color: $fg-primary;

    @include nightshift(color, $color-white);
  }

  &:focus-visible {
    outline: 2px solid $fg-primary;
    outline-offset: 2px;
  }
}

// ============================================================================
// MODAL STATES
// ============================================================================

.modal.loading {
  .modal__body {
    opacity: 0.6;
    pointer-events: none;
  }
}

// ============================================================================
// REDUCED MOTION
// ============================================================================

@media (prefers-reduced-motion: reduce) {
  .modal,
  .modal__container {
    animation: none;
    transition: none;
  }
}
```

### **Step 3: Register Component**

Update `/styles/components/index.scss`:

```scss
// components/index.scss

@use './modal';  // Add this line
```

### **Step 4: Use in React (Future)**

```tsx
// components/Modal.tsx
'use client';

import { useState } from 'react';

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal__container">
          <div className="modal__header">
            <h2 className="modal__title">Modal Title</h2>
            <button
              className="modal__close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="modal__body">
            Content goes here
          </div>

          <div className="modal__footer">
            <button className="btn btn--secondary">Cancel</button>
            <button className="btn btn--primary">Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
}
```

---

## 📱 Responsive Design

### **Mobile-First Principle**

Always write mobile-first styles:

```scss
// ✅ CORRECT - Base is mobile

.card {
  padding: $space-4;           // Mobile: 16px
  font-size: $text-sm;          // Mobile: 12px
  columns: 1;                   // Mobile: 1 column

  // Override at larger screens
  @include respond-to('md') {
    padding: $space-6;          // Tablet: 24px
    font-size: $text-base;      // Tablet: 14px
    columns: 2;                 // Tablet: 2 columns
  }

  @include respond-to('lg') {
    padding: $space-8;          // Desktop: 32px
    columns: 3;                 // Desktop: 3 columns
  }
}

// ❌ INCORRECT - Desktop-first

.card {
  padding: $space-8;

  @media (max-width: 768px) {   // Wrong approach
    padding: $space-4;
  }
}
```

### **Using Responsive Mixin**

```scss
// For common responsive patterns, use mixins

.hero__content {
  @include responsive-padding($space-8, $space-4);
  // Desktop: 32px, Mobile: 16px

  @include responsive-type($text-5xl, $text-6xl, $text-7xl);
  // Mobile: 55px, Tablet: 60px, Desktop: 70px
}
```

### **Breakpoint Reference**

| Name | Width | Device |
|------|-------|--------|
| `xs` | 320px | Small phones |
| `sm` | 640px | Phones landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Tablets landscape |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

---

## 🎬 Motion & Animation

### **Transitions**

```scss
// Using transition mixin (recommended)
.button {
  @include transition(all);                    // Uses $duration-base
  @include transition(color, $duration-fast);  // Custom duration
  @include transition(opacity, $duration-slow, $ease-out-quad);
}

// Alternative: Direct declaration
.button {
  @include transition(background-color, $duration-base, $ease-in-out);
}
```

### **Animations**

**Using Built-in Keyframes:**

```scss
// Reveal on scroll
.section {
  @include reveal-on-scroll;  // fadeIn + translateY(28px), 0.8s
  
  &.reveal-delay-1 { animation-delay: 70ms; }
  &.reveal-delay-2 { animation-delay: 140ms; }
}

// Fade in image
.image {
  animation: imageLoad 0.52s ease-out forwards;
}

// Parallax effect
.parallax-element {
  transform: translateY(calc(var(--scroll, 0) * var(--speed, 0.15) * 100px));
}
```

**Custom Animation:**

```scss
// Define animation
@keyframes customPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

// Use animation
.element {
  animation: customPulse 2s ease-in-out infinite;
}
```

### **Reduced Motion Support**

Always include:

```scss
.component {
  animation: slideUp 0.8s ease-out forwards;
}

// Accessibility: Respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  .component {
    animation: none;
    transition: none;
  }
}
```

---

## 🌙 Dark Mode

### **Applying Dark Mode Styles**

Use `@include nightshift()` mixin:

```scss
.card {
  background-color: $color-white;
  color: $fg-primary;
  border: 1px solid rgba($color-black, 0.1);

  // Dark mode variants
  @include nightshift(background-color, $bg-nightshift-card);
  @include nightshift(color, $color-white);
  @include nightshift(border-color, rgba($color-white, 0.1));
}

// ❌ INCORRECT - Don't use body.nightshift
body.nightshift .card {
  background-color: #101010;
}
```

### **Dark Mode Color Mapping**

| Light | Dark | Purpose |
|-------|------|---------|
| `$color-white` | `$bg-nightshift` | Background |
| `$color-black` | `$color-white` | Text |
| `$color-light-grey` | `$color-dark-grey` | Secondary text |
| `$fg-primary` | `$color-white` | Foreground |
| `$bg-project-card` | `$bg-nightshift-card` | Card bg |

### **Testing Dark Mode**

In browser console:
```javascript
// Enable dark mode
document.body.classList.add('nightshift');

// Disable dark mode
document.body.classList.remove('nightshift');
```

---

## 🎯 Common Patterns

### **Centered Content**

```scss
// Using flex mixin
.container {
  @include flex-center;
  min-height: 100vh;
}

// Manual
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### **Button Group**

```scss
.btn-group {
  @include flex-center;
  gap: $space-2;

  .btn {
    flex: 1;
  }
}
```

### **Card Layout**

```scss
.card {
  background-color: $bg-project-card;
  border-radius: 8px;
  overflow: hidden;
  @include transition(all);

  .card__image {
    width: 100%;
    aspect-ratio: 3/2;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card__content {
    padding: $space-6;
  }

  &:hover {
    transform: translateY(-4px);
  }
}
```

### **Grid Layout**

```scss
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: $space-6;

  @include respond-to('md') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('lg') {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### **Navigation Bar**

```scss
.navbar {
  @include flex-between;
  @include responsive-padding($space-4 $global-padding, $space-3 $global-padding-mobile);
  background-color: $bg-menu;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-menu;
}

.navbar__links {
  @include flex-center;
  gap: $space-6;
  list-style: none;

  a {
    color: $fg-secondary;
    text-decoration: none;
    @include transition(color);

    &:hover,
    &.active {
      color: $fg-primary;
    }
  }
}
```

---

## 🛠️ Utilities Reference

### **Available Utility Classes**

**Display Utilities:**
```html
<div class="flex">                    <!-- display: flex -->
<div class="flex-center">            <!-- flex + align-center + justify-center -->
<div class="flex-between">           <!-- flex + space-between -->
<div class="block">                  <!-- display: block -->
<div class="inline-block">           <!-- display: inline-block -->
<div class="hidden">                 <!-- display: none -->
<div class="show-md">                <!-- hidden by default, show at md -->
<div class="hidden-md">              <!-- visible by default, hide at md -->
```

**Spacing Utilities:**
```html
<!-- Padding: p-{space} -->
<div class="p-4">                   <!-- padding: 16px -->
<div class="p-8">                   <!-- padding: 32px -->
<div class="px-4 py-8">             <!-- padding-x: 16px, padding-y: 32px -->

<!-- Margin: m-{space} -->
<div class="m-4">                   <!-- margin: 16px -->
<div class="mx-auto">               <!-- margin-left: auto, margin-right: auto -->
<div class="mb-8">                  <!-- margin-bottom: 32px -->

<!-- Gap: gap-{space} -->
<div class="flex gap-4">            <!-- gap: 16px -->
<div class="gap-8">                 <!-- gap: 32px -->
```

**Text Utilities:**
```html
<div class="text-center">          <!-- text-align: center -->
<div class="text-left">             <!-- text-align: left -->
<div class="text-right">            <!-- text-align: right -->
<div class="text-justify">          <!-- text-align: justify -->
<div class="uppercase">             <!-- text-transform: uppercase -->
<div class="lowercase">             <!-- text-transform: lowercase -->
<div class="capitalize">            <!-- text-transform: capitalize -->
```

**Color Utilities:**
```html
<!-- Background colors: bg-{color} -->
<div class="bg-black">              <!-- background-color: #1b1b1b -->
<div class="bg-white">              <!-- background-color: #ffffff -->
<div class="bg-grey">               <!-- background-color: #898989 -->

<!-- Text colors: text-{color} -->
<div class="text-black">            <!-- color: #1b1b1b -->
<div class="text-white">            <!-- color: #ffffff -->
<div class="text-grey">             <!-- color: #898989 -->
```

**Opacity Utilities:**
```html
<div class="opacity-50">            <!-- opacity: 0.5 -->
<div class="opacity-75">            <!-- opacity: 0.75 -->
<div class="opacity-100">           <!-- opacity: 1 -->
```

---

## 🐛 Troubleshooting

### **Problem: Styles Not Applied**

**Solution 1: Check SCSS Import Order**
```scss
// ✅ CORRECT ORDER
@use '../tokens/colors' as *;        // 1. Tokens first
@use '../tools/mixins' as *;         // 2. Tools/mixins
// 3. Then styles using tokens

// ❌ INCORRECT ORDER
@use '../tools/mixins' as *;         // Wrong - uses before defined
@use '../tokens/colors' as *;
```

**Solution 2: Verify Token Variable Exists**
```scss
// Check tokens/_colors.scss
// ✅ Exists
$color-black: #1b1b1b;

// ❌ Doesn't exist - will error
color: $color-wrong;
```

**Solution 3: Component Not Registered**
```scss
// Make sure in components/index.scss:
@use './mycomponent';  // Add this line

// Then import in main.scss
@use './components';   // This imports all
```

### **Problem: Responsive Breakpoints Not Working**

```scss
// ✅ CORRECT - Use @include respond-to()
@include respond-to('md') {
  font-size: $text-lg;
}

// ❌ INCORRECT - Hardcoded media query
@media (min-width: 768px) {
  font-size: 16px;
}

// ❌ INCORRECT - Using non-existent breakpoint
@include respond-to('medium') {  // Should be 'md'
}
```

### **Problem: Dark Mode Not Working**

```scss
// ✅ CORRECT
@include nightshift(color, $color-white);

// ❌ INCORRECT - Direct selector
body.nightshift & {
  color: $color-white;
}

// Also check: body element has class="nightshift"
```

### **Problem: Animations Too Fast/Slow**

```scss
// Use correct duration tokens:
// $duration-fast (0.2s) - hover effects
// $duration-base (0.3s) - standard
// $duration-slow (0.5s) - image fades

// ✅ CORRECT
.button:hover {
  @include transition(background-color, $duration-fast);
}

// ❌ INCORRECT - Too slow for hover
.button:hover {
  @include transition(background-color, $duration-slow);
}
```

### **Problem: Component File Too Large**

If component SCSS > 400 lines:

```scss
// Split related variants into separate files:
// _button.scss           (base + primary/secondary)
// _button-sizes.scss     (sm/lg/xl sizes)
// _button-states.scss    (disabled/loading/error)

// Then import all in components/index.scss
@use './button';
@use './button-sizes';
@use './button-states';
```

---

## 📋 Component Checklist

Before committing new component:

- [ ] SCSS file created in `/styles/components/_name.scss`
- [ ] File imports tokens in correct order
- [ ] All colors use `$color-*` or `$fg-*` tokens
- [ ] All sizes use `$text-*` or `$space-*` tokens
- [ ] All transitions use `$duration-*` and `$ease-*`
- [ ] All z-index uses `$z-*` tokens
- [ ] Responsive using `@include respond-to()`
- [ ] Dark mode using `@include nightshift()`
- [ ] Reduced motion support included
- [ ] BEM naming convention followed
- [ ] File ≤ 400 lines
- [ ] Header documentation complete
- [ ] Registered in `components/index.scss`

---

## 📚 Additional Resources

- `DESIGN_SYSTEM_STANDARDS.md` - Rules and guidelines
- `DESIGN_SYSTEM_TOKENS.md` - Token reference
- `DESIGN_SYSTEM_AUDIT.md` - Consistency audit
- `styles/components/` - Existing component examples
- `styles/tools/_mixins.scss` - Available mixins

---

**Questions? Check existing components or DESIGN_SYSTEM_STANDARDS.md for patterns.**
