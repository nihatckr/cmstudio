# Design System Tokens Reference

**City Marin Studio - Complete Token Values & Specifications**

Version: 1.0  
Last Updated: 2026-06-15

---

## 📋 Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Motion](#motion)
5. [Z-Index](#z-index)
6. [Layout](#layout)
7. [How to Use](#how-to-use)

---

## 🎨 Colors

### **Core Palette**

```scss
// Primary colors
$color-white         #ffffff  // Pure white
$color-black         #1b1b1b  // Deep black

// Grey Scale
$color-lighter-grey  #c4c4c4  // Lighter grey
$color-light-grey    #969696  // Light grey
$color-grey          #898989  // Standard grey
$color-mid-grey      #6b6b6b  // Mid grey (menu inactive)
$color-dark-grey     #797979  // Dark grey (secondary text)

// Special
$color-bg-project    #f7f7f7  // Project image placeholder
$color-bg-map        #cccccc  // Map tile placeholder
```

### **Semantic Foreground Colors**

```scss
$fg-primary          // Foreground primary (black) - main text
$fg-secondary        // Foreground secondary (grey) - secondary text
$fg-tertiary         // Foreground tertiary (mid-grey) - tertiary text
$fg-disabled         // Foreground disabled (lighter-grey) - disabled state
$fg-inverted         // Foreground inverted (white) - on dark
```

### **Semantic Background Colors**

```scss
$bg-page             // Page background (white)
$bg-menu             // Menu background (white)
$bg-overlay          // Overlay background (white)
$bg-project-card     // Card background (#f7f7f7)
$bg-nightshift       // Dark mode background (#000000)
$bg-nightshift-card  // Dark mode card (#101010)
```

### **Dark Mode (Nightshift) Colors**

When `body.nightshift` class is active:

| Light Mode | Dark Mode | Usage |
|-----------|-----------|-------|
| `$color-white` | `$bg-nightshift` (#000000) | Main background |
| `$color-black` | `$color-white` | Main text |
| `$color-light-grey` | `$color-dark-grey` | Secondary text |
| `$fg-primary` (black) | `$color-white` | Foreground |
| `$bg-project-card` | `$bg-nightshift-card` (#101010) | Card background |

**Usage in SCSS:**
```scss
.component {
  color: $color-black;
  
  @include nightshift(color, $color-white);
}
```

---

## 🔤 Typography

### **Font Family**

```scss
$font-standard  'Everett', 'Helvetica Neue', Arial, sans-serif
$font-fallback  -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
```

### **Font Size Scale**

All sizes in pixels (px):

| Token | Size | Usage |
|-------|------|-------|
| `$text-xs` | 11px | Meta labels, icon titles |
| `$text-sm` | 12px | Navigation items, footer, captions |
| `$text-md` | 13px | News captions |
| `$text-body` | 14px | Base body text (default) |
| `$text-lg` | 16px | Intro body text |
| `$text-xl` | 18px | Small headlines |
| `$text-2xl` | 21px | Intro headline desktop |
| `$text-3xl` | 28px | Letter animation |
| `$text-4xl` | 40px | People names mobile |
| `$text-5xl` | 55px | H1 mobile |
| `$text-6xl` | 60px | H1 tablet |
| `$text-7xl` | 70px | H1 desktop |
| `$text-8xl` | 100px | Large H1 / news H1 |

### **Line Heights**

```scss
$lh-tight    1.2      // Headlines, tight spacing
$lh-body     1.3125   // Body text, standard
$lh-relaxed  1.5      // Relaxed paragraphs, loose
```

### **Letter Spacing**

```scss
$tracking-menu   0.04em  // Navigation items
$tracking-upper  0.06em  // Uppercase labels
```

### **Font Weight**

```scss
$font-weight-normal  400  // Standard weight
```

---

## 📏 Spacing

### **Spacing Scale (Base: 4px)**

| Token | Size | Usage |
|-------|------|-------|
| `$space-1` | 4px | Tight spacing |
| `$space-2` | 8px | Small gap |
| `$space-3` | 12px | Small padding |
| `$space-4` | 16px | Standard padding |
| `$space-5` | 20px | Medium padding |
| `$space-6` | 24px | Large padding |
| `$space-7` | 28px | Extra large |
| `$space-8` | 32px | Extra large padding |
| `$space-9` | 36px | Large spacing |
| `$space-10` | 40px | Extra large spacing |
| `$space-11` | 44px | Large spacing |
| `$space-12` | 48px | Extra large spacing |
| `$space-13` | 52px | Large spacing |
| `$space-14` | 56px | Extra large spacing |
| `$space-15` | 60px | Maximum spacing (or 150px for gaps) |

### **Global Padding**

```scss
$global-padding          30px   // Desktop page padding
$global-padding-mobile   20px   // Mobile page padding
```

### **Container & Max Width**

```scss
$max-width  1200px  // Maximum content width
```

---

## 🎬 Motion

### **Durations**

```scss
$duration-fast   0.2s    // Micro interactions (hover, focus)
$duration-base   0.3s    // Standard transitions
$duration-slow   0.5s    // Image fades, longer transitions
$duration-page   250ms   // Page transitions
```

**When to use each:**
- `$duration-fast` → Button hover, icon animations
- `$duration-base` → Color transitions, opacity changes
- `$duration-slow` → Image reveal, scroll animations
- `$duration-page` → Page enter/exit transitions

### **Easing Functions**

```scss
$ease-out-quad   cubic-bezier(0.25, 0.46, 0.45, 0.94)  // Entrance animations
$ease-in-out     ease-in-out                            // Standard transitions
```

**When to use:**
- `$ease-out-quad` → Entrance animations (slide up, fade in)
- `$ease-in-out` → Smooth transitions (color, opacity)

### **Built-in Keyframes**

Location: `/styles/base/_animations.scss`

| Name | Purpose | Duration |
|------|---------|----------|
| `slideUp` | Fade in + translate up | 0.6s |
| `slideDown` | Fade out + translate down | 0.6s |
| `slideInLeft` | Slide from left | 0.6s |
| `slideInRight` | Slide from right | 0.6s |
| `fadeIn` | Simple fade in | varies |
| `fadeOut` | Simple fade out | varies |
| `scaleIn` | Pop effect | 0.3s |
| `scaleOut` | Pop reverse | 0.3s |
| `rotate360` | Full rotation | varies |
| `pulse` | Scale pulse | 2s |
| `bounce` | Bounce effect | varies |

### **Advanced Motion Patterns**

Location: `/styles/base/_motion-advanced.scss`

| Name | Pattern | Duration | Usage |
|------|---------|----------|-------|
| `revealUp` | Fade + translateY(28px) | 0.8s | Reveal on scroll |
| `countUp` | Number counter | 1.2s | Count animations |
| `imageLoad` | Skeleton fade → image | 0.52s | Image loading |
| `bulletScale` | Scale(0→1) | 0.3s | Bullet dots |
| `projectSkeletonFade` | Skeleton fade | 0.52s | Project loading |

---

## 📍 Z-Index

### **Semantic Z-Index Values**

```scss
$z-case      1      // Stacking context for nested elements
$z-dropdown  100    // Dropdown menus
$z-sticky    500    // Sticky elements (headers, etc)
$z-overlay   100000 // Overlays, tooltips
$z-modal     999999 // Modals, maximum z-index
$z-menu      9999   // Navigation menus
$z-nav-sub   10000  // Submenu items
```

**Hierarchy (lowest to highest):**
1. `$z-case` (1) - Base stacking
2. `$z-dropdown` (100) - Dropdowns
3. `$z-sticky` (500) - Sticky elements
4. `$z-menu` (9999) - Main navigation
5. `$z-nav-sub` (10000) - Sub navigation
6. `$z-overlay` (100000) - Overlays
7. `$z-modal` (999999) - Modals (top)

---

## 📐 Layout

### **Breakpoints**

Mobile-first approach. Base styles are mobile, override at larger screens.

```scss
$breakpoint-xs   320px   // Extra small phones
$breakpoint-sm   640px   // Small phones
$breakpoint-md   768px   // Tablets
$breakpoint-lg   1024px  // Tablets landscape
$breakpoint-xl   1280px  // Desktops
$breakpoint-2xl  1536px  // Large desktops
```

**Usage:**
```scss
.component {
  font-size: $text-sm;  // Mobile
  
  @include respond-to('md') {
    font-size: $text-base;  // Tablet
  }
  
  @include respond-to('lg') {
    font-size: $text-lg;  // Desktop
  }
}
```

### **Grid System**

```scss
// 12-column grid
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

// Column utilities (1-6 columns)
.grid-1  { grid-template-columns: repeat(1, 1fr); }
.grid-2  { grid-template-columns: repeat(2, 1fr); }
.grid-3  { grid-template-columns: repeat(3, 1fr); }
.grid-4  { grid-template-columns: repeat(4, 1fr); }
.grid-5  { grid-template-columns: repeat(5, 1fr); }
.grid-6  { grid-template-columns: repeat(6, 1fr); }
```

---

## 🚀 How to Use Tokens

### **In SCSS Components**

```scss
@use '../tokens/colors' as *;
@use '../tokens/typography' as *;
@use '../tokens/spacing' as *;
@use '../tokens/motion' as *;

.component {
  // Colors
  color: $fg-primary;
  background-color: $bg-page;
  border-color: rgba($color-black, 0.1);
  
  // Typography
  font-size: $text-lg;
  line-height: $lh-body;
  letter-spacing: $tracking-menu;
  
  // Spacing
  padding: $space-4 $space-6;
  margin-bottom: $space-8;
  gap: $space-3;
  
  // Motion
  @include transition(all, $duration-base, $ease-in-out);
}

// Dark mode
@include nightshift(color, $color-white);
@include nightshift(background-color, $bg-nightshift);

// Responsive
@include respond-to('md') {
  padding: $space-6 $space-8;
}
```

### **Token Import Order**

**Always follow this order:**

```scss
1. @use '../tokens/colors' as *;
2. @use '../tokens/typography' as *;
3. @use '../tokens/spacing' as *;
4. @use '../tokens/motion' as *;
5. @use '../tokens/z-index' as *;
6. @use '../tools/mixins' as *;
```

---

## ✅ Validation

All tokens are:
- ✅ Centralized in `/styles/tokens/`
- ✅ Consistently named (camelCase with prefix)
- ✅ Type-safe (SCSS variables)
- ✅ Semantic where applicable
- ✅ Responsive-ready (breakpoint tokens)
- ✅ Dark mode compatible (nightshift variants)

---

**For practical examples, see [USAGE.md](./DESIGN_SYSTEM_USAGE.md)**  
**For complete standards, see [STANDARDS.md](./DESIGN_SYSTEM_STANDARDS.md)**
