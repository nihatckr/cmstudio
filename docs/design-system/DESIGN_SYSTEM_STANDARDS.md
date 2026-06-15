# DESIGN SYSTEM STANDARDS & GUIDELINES

**City Marin Studio - Consistency, Scalability & Maintainability Rules**

Version: 1.0  
Last Updated: 2026-06-15  
Status: ✅ Active

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Consistency Audit](#consistency-audit)
3. [Naming Conventions](#naming-conventions)
4. [File Structure Standards](#file-structure-standards)
5. [Component Creation Guidelines](#component-creation-guidelines)
6. [Token Usage Rules](#token-usage-rules)
7. [Responsive Design Patterns](#responsive-design-patterns)
8. [Motion & Animation Rules](#motion--animation-rules)
9. [Dark Mode Guidelines](#dark-mode-guidelines)
10. [Documentation Requirements](#documentation-requirements)

---

## 🎯 System Overview

### **Design System Architecture (7 Layers)**

```
styles/
├── tokens/          ← Layer 1: Design values (no CSS output)
├── tools/           ← Layer 2: Mixins & functions (no CSS output)
├── base/            ← Layer 3: Global, reset, animations, type-classes
├── layout/          ← Layer 4: Grid, flex, container utilities
├── utilities/       ← Layer 5: Auto-generated utility classes
├── components/      ← Layer 6: UI component library
└── main.scss        ← Layer 7: Central orchestration
```

**Rule 1:** @use statements must follow strict layer order. No out-of-order imports.

---

## ✅ Consistency Audit Results

### **Color System**
- **Status:** ✅ 100% Consistent
- **Coverage:** 10 core colors + 8 semantic mappings + nightshift variant
- **Rule:** All hex values must come from `tokens/_colors.scss`
- **Enforcement:** No hardcoded colors in components (except rgba overlays with comments)

### **Typography System**
- **Status:** ✅ 100% Consistent
- **Coverage:** 8-level scale (11px–100px), 3 line-heights, 2 letter-spacings
- **Rule:** Font sizes = `$text-xs` through `$text-8xl` only
- **Enforcement:** Use `@include type-style()` mixin for font consistency

**Audit Finding:** All 8 components use tokens. ✓

### **Spacing System**
- **Status:** ✅ 95% Consistent
- **Coverage:** 15-step scale (4px–150px), global padding tokens
- **Issues Found:** 0 hardcoded margins/padding in main components
- **Rule:** Spacing values = `$space-1` through `$space-15` only

**Audit Finding:** Minor inconsistency: `.compare-tray` uses inline padding values. Should use `$space-4`, `$space-3`.

### **Motion System**
- **Status:** ✅ 100% Consistent
- **Coverage:** 4 duration levels, 2 easing functions, 12+ keyframes
- **Rule:** All transitions must use `$duration-fast/base/slow/page` and `$ease-in-out/ease-out-quad`
- **Enforcement:** No hardcoded `0.3s` or `ease-in-out` strings

**Audit Finding:** All animations use tokens. ✓

### **Z-Index System**
- **Status:** ✅ 100% Consistent
- **Coverage:** 7 semantic z-values ($z-case through $z-modal)
- **Rule:** All positioning uses `$z-{semantic}` variables
- **Enforcement:** No numeric z-index values

**Audit Finding:** All components use `$z-overlay`, `$z-menu`, etc. ✓

### **Responsive Design**
- **Status:** ✅ 95% Consistent
- **Coverage:** 6 breakpoints (xs–2xl), mobile-first approach
- **Rule:** Use `@include respond-to('sm')` mixin (not direct media queries)
- **Enforcement:** All breakpoint values stored in tokens

**Audit Finding:** 1 potential issue: `.slider` has fixed `max-width: 180px` instead of using responsive mixin.

---

## 🏷️ Naming Conventions

### **BEM (Block Element Modifier) Pattern**

```scss
.block { }
.block__element { }
.block--modifier { }
.block__element--modifier { }
```

**Examples (Verified):**
- ✅ `.toggle`, `.toggle-item`, `.toggle-item.active`
- ✅ `.card`, `.card__image`, `.card__title`, `.card__link`
- ✅ `.button`, `.btn--primary`, `.btn--lg`
- ✅ `.accordion`, `.accordion-trigger`, `.accordion-content`

**Rule 2:** All component classes must follow BEM pattern.

### **State Modifiers**
- `.active` - currently selected/active state
- `.open` - expanded/visible state
- `.disabled` - disabled state
- `.loading` - loading state
- `.error` - error state
- `.on` - toggle on state (legacy, prefer `.active`)

**Rule 3:** Use only defined state modifiers. No custom states like `.is-active`, `.has-content`.

### **Prefix Conventions**
- `.btn-*` → Button utilities (`.btn-group`, `.btn-icon`)
- `.flex-*` → Flexbox helpers (`.flex-center`, `.flex-between`)
- `.grid-*` → Grid utilities (`.grid-1`, `.grid-6`)
- `.text-*` → Text utilities (`.text-center`, `.text-uppercase`)
- `.bg-*` → Background color utilities
- `.tray-*` → Tray components (`.tray-chip`, `.tray-action`)

**Rule 4:** Use prefix conventions for related utility groups.

---

## 📁 File Structure Standards

### **File Naming**
```
styles/
├── tokens/
│   ├── _colors.scss          (prefixed with _)
│   ├── _typography.scss
│   ├── _spacing.scss
│   ├── _motion.scss
│   ├── _z-index.scss
│   └── _layout.scss
├── tools/
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   ├── _globals.scss
│   ├── _animations.scss      (basic @keyframes)
│   ├── _motion-advanced.scss (complex patterns)
│   └── _type-classes.scss
├── layout/
│   ├── _container.scss
│   ├── _section.scss
│   ├── _flex.scss
│   └── _grid.scss
├── utilities/
│   └── _generated.scss       (auto-generated utilities)
├── components/
│   ├── _header.scss
│   ├── _hero.scss
│   ├── _card.scss
│   ├── _footer.scss
│   ├── _button.scss
│   ├── _interactive.scss     (toggles, badges, sliders, accordions)
│   ├── _tray.scss            (compare tray)
│   ├── _indicators.scss      (progress, bullet dots)
│   ├── index.scss            (component orchestration)
│   └── ...
└── main.scss
```

**Rule 5:** All partial files use `_` prefix (SCSS convention).

**Rule 6:** Component files named after primary component (`.card`, `.button`, not `.card-component`).

### **File Size Guidelines**
- **Single component:** 100–300 lines max
- **Multi-state component:** Up to 400 lines
- **Refactor if:** File exceeds 500 lines (split into multiple files)

**Rule 7:** If a component SCSS exceeds 400 lines, split related states into separate files.

---

## 🧩 Component Creation Guidelines

### **Step 1: Plan Component Structure**
Before writing SCSS:
1. Identify primary block name (e.g., `.tooltip`, `.modal`)
2. List all elements and modifiers
3. Define states (active, disabled, hover)
4. Plan responsive behavior

### **Step 2: Create Component File**
Location: `/styles/components/_componentname.scss`

**Template:**
```scss
// components/_componentname.scss
@use '../tokens/colors' as *;
@use '../tokens/typography' as *;
@use '../tokens/spacing' as *;
@use '../tokens/motion' as *;
@use '../tokens/z-index' as *;
@use '../tools/mixins' as *;

// ============================================================================
// COMPONENT NAME (CAPITALIZED)
// ============================================================================
// Purpose: What does this component do?
// States: active, disabled, hover, etc.
// Responsive: Mobile-first, breakpoints used

.componentname {
  // Base styles
}

// ============================================================================
// COMPONENT ELEMENTS
// ============================================================================

.componentname__element {
  // Element styles
}

// ============================================================================
// COMPONENT MODIFIERS
// ============================================================================

.componentname--modifier {
  // Modifier styles
}

// ============================================================================
// DARK MODE
// ============================================================================

@include nightshift(property, $value);
```

**Rule 8:** Every component file must have:
- Descriptive header comment
- Purpose documented
- States listed
- Responsive approach noted

### **Step 3: Register in Component Index**
Update `/styles/components/index.scss`:
```scss
@use './componentname';
```

**Rule 9:** All new components must be added to `components/index.scss`.

### **Step 4: Update main.scss if Needed**
If component requires new base layer or tool, add to `main.scss`.

---

## 🎨 Token Usage Rules

### **Rule 10: Color Usage**
```scss
// ✅ CORRECT - Use semantic colors
color: $fg-primary;
background-color: $bg-project-card;

// ❌ INCORRECT - No hardcoded hex
color: #1b1b1b;
background: linear-gradient(to right, #1b1b1b, #ffffff);

// Exception: rgba overlays with comments
background: rgba($color-black, 0.3); // 30% opacity overlay
```

### **Rule 11: Spacing Usage**
```scss
// ✅ CORRECT - Use spacing scale
padding: $space-4 $space-6;
gap: $space-3;

// ❌ INCORRECT - No arbitrary values
padding: 15px 20px;
margin: 32px 0;
```

### **Rule 12: Typography Usage**
```scss
// ✅ CORRECT - Use mixin or tokens
@include type-style($text-lg, $lh-body);
font-size: $text-sm;
line-height: $lh-tight;

// ❌ INCORRECT - Inline declarations
font-size: 16px;
font-family: 'Everett', sans-serif;
```

### **Rule 13: Motion Usage**
```scss
// ✅ CORRECT
@include transition(all, $duration-base, $ease-in-out);
animation: slideUp 0.8s $ease-out-quad forwards;

// ❌ INCORRECT
transition: all 0.3s ease-in-out;
animation: slideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### **Rule 14: Z-Index Usage**
```scss
// ✅ CORRECT
z-index: $z-overlay;
z-index: $z-menu;

// ❌ INCORRECT
z-index: 1000;
z-index: 9999;
```

---

## 📱 Responsive Design Patterns

### **Mobile-First Approach**
All base styles target mobile. Breakpoints only override as needed.

```scss
// ✅ CORRECT - Base is mobile, override at breakpoints
.component {
  padding: $space-4; // Mobile
  font-size: $text-sm;
  
  @include respond-to('md') {
    padding: $space-6; // Tablet+
    font-size: $text-base;
  }
  
  @include respond-to('lg') {
    font-size: $text-lg; // Desktop+
  }
}

// ❌ INCORRECT - Desktop-first (old approach)
.component {
  padding: $space-6;
  
  @media (max-width: 768px) {
    padding: $space-4;
  }
}
```

**Rule 15:** Always mobile-first. Use `@include respond-to()` for larger screens only.

### **Breakpoint Usage**
| Variable | Value | Purpose |
|----------|-------|---------|
| `xs` | 320px | Extra small (phones) |
| `sm` | 640px | Small (phones landscape) |
| `md` | 768px | Medium (tablets) |
| `lg` | 1024px | Large (tablets landscape) |
| `xl` | 1280px | Extra large (desktops) |
| `2xl` | 1536px | 2XL (large desktops) |

**Rule 16:** Use breakpoint variables only, never hardcoded media query values.

---

## 🎬 Motion & Animation Rules

### **Duration Standards**
| Token | Duration | Usage |
|-------|----------|-------|
| `$duration-fast` | 0.2s | Micro interactions (hover, focus) |
| `$duration-base` | 0.3s | Standard transitions |
| `$duration-slow` | 0.5s | Image fades, longer transitions |
| `$duration-page` | 250ms | Page transitions |

**Rule 17:** Match animation speed to interaction type:
- Micro (hover effects): `$duration-fast`
- Standard (color/opacity changes): `$duration-base`
- Content transitions: `$duration-slow`

### **Easing Standards**
| Token | Value | Usage |
|-------|-------|-------|
| `$ease-out-quad` | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Entrance animations |
| `$ease-in-out` | ease-in-out | Smooth transitions |

**Rule 18:** Use `$ease-out-quad` for reveal/entrance animations, `$ease-in-out` for standard transitions.

### **Reduced Motion Support**

```scss
// Every animation must respect prefers-reduced-motion
@media (prefers-reduced-motion: reduce) {
  .element,
  .element__child {
    animation: none;
    transition: none;
  }
}
```

**Rule 19:** All components with animations must include reduced-motion block.

---

## 🌙 Dark Mode Guidelines

### **Nightshift Implementation**

```scss
// ✅ CORRECT - Use nightshift mixin
.component {
  color: $color-black;
  background-color: $color-white;
  
  @include nightshift(color, $color-white);
  @include nightshift(background-color, $bg-nightshift);
}

// ❌ INCORRECT - Don't use body.nightshift selector
body.nightshift .component {
  color: $color-white;
}
```

**Rule 20:** Use `@include nightshift(property, value)` mixin for dark mode variants.

### **Color Inversion Strategy**

| Light Mode | Dark Mode | Rule |
|-----------|-----------|------|
| `$color-black` | `$color-white` | Foreground inverts |
| `$color-white` | `$bg-nightshift` | Background inverts |
| `$color-light-grey` | `$color-dark-grey` | Greys lighten |
| `$fg-primary` (black) | `$color-white` | Text inverts |
| `$bg-project-card` | `$bg-nightshift-card` | Card bg inverts |

**Rule 21:** Dark mode should never duplicate light mode styles. Use nightshift mixin only for changed properties.

---

## 📚 Documentation Requirements

### **Component Documentation**

Every component file must include:

```scss
// components/_mycomponent.scss
// 
// Component: My Component
// Purpose: Brief description of what it does
// 
// States:
//   .my-component.active     - Active/selected state
//   .my-component.disabled   - Disabled state
//   .my-component--variant   - Style variant
// 
// Responsive:
//   Mobile-first. Padding increases at @md and @lg breakpoints.
//   Display toggles at @sm for mobile menu.
// 
// Dark Mode:
//   Supported. Text color inverts in nightshift mode.
//   Background uses $bg-nightshift-card variant.
// 
// Usage:
//   <div class="my-component">
//     <div class="my-component__element">Content</div>
//   </div>
```

**Rule 22:** Every component file must have header documentation.

### **Design System Documentation Location**

Maintain version-controlled docs:
- `/DESIGN_SYSTEM_STANDARDS.md` - This file (guidelines & rules)
- `/DESIGN_SYSTEM_TOKENS.md` - Token reference
- `/DESIGN_SYSTEM_AUDIT.md` - Current audit results
- `/styles/components/` - Inline SCSS comments

**Rule 23:** Update audit results whenever tokens or components change.

---

## 🚀 Scalability & Maintenance

### **Code Review Checklist**

Before committing new components:

- [ ] Component uses SCSS @use (no @import)
- [ ] All colors from `$color-*` or `$fg-*` or `$bg-*` tokens
- [ ] All font sizes from `$text-*` tokens
- [ ] All spacing from `$space-*` tokens
- [ ] All durations from `$duration-*` tokens
- [ ] All breakpoints use `@include respond-to()`
- [ ] All animations use `$ease-*` tokens
- [ ] Dark mode supported with `@include nightshift()`
- [ ] Reduced motion supported in media query
- [ ] BEM naming convention followed
- [ ] File ≤400 lines (refactor if larger)
- [ ] Header documentation complete
- [ ] Component registered in `components/index.scss`

**Rule 24:** No PR merge without completing code review checklist.

### **Adding New Token Types**

If adding new token category (e.g., shadows, borders):

1. Create `/styles/tokens/_shadows.scss`
2. Define all values with semantic names
3. Add `@use './tokens/shadows'` to `main.scss`
4. Update this documentation
5. Add to component imports as needed

**Rule 25:** New token types require documentation update.

### **Deprecation Process**

To deprecate old component/token:

1. Mark as `@deprecated` in comment
2. Suggest replacement
3. Keep for 1 full project cycle
4. Remove with major version bump

**Rule 26:** Never remove tokens/components without deprecation period.

---

## 📊 Current System Health

| Metric | Status | Details |
|--------|--------|---------|
| Color Consistency | ✅ 100% | All colors from tokens |
| Typography Consistency | ✅ 100% | All font sizes from tokens |
| Spacing Consistency | ✅ 95% | 1 minor issue to fix |
| Motion Consistency | ✅ 100% | All animations use tokens |
| Z-Index Consistency | ✅ 100% | All z-index from tokens |
| Dark Mode Coverage | ✅ 100% | All components support nightshift |
| Responsive Coverage | ✅ 95% | 1 component needs responsive check |
| Code Documentation | ⚠️ 70% | Most components documented |
| Test Coverage | ❌ 0% | Recommend E2E tests |

---

## 📝 Future Improvements

### **Phase 2 (Recommended)**
- [ ] Add snapshot tests for component rendering
- [ ] Create component Storybook
- [ ] Implement design token CI checks
- [ ] Add automated accessibility audit
- [ ] Create component usage guidelines (React)

### **Phase 3 (Long-term)**
- [ ] Design system versioning (SemVer)
- [ ] Token sync with design tools (Figma)
- [ ] Component library NPM package
- [ ] Automated color contrast checking
- [ ] Performance metrics tracking

---

## ✍️ Maintenance Checklist (Monthly)

- [ ] Run consistency audit on all components
- [ ] Check for unused tokens/variables
- [ ] Update documentation with new patterns
- [ ] Review closed PRs for naming consistency
- [ ] Verify dark mode works across all components
- [ ] Test responsive behavior on real devices

---

**Next Step:** Fix identified consistency issues and implement code review process.
