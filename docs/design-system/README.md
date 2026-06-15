# Design System Documentation

**City Marin Studio - Complete Design System Reference**

---

## 📚 Documentation Structure

This folder contains comprehensive documentation for the City Marin Studio design system.

### **Files Overview**

| File | Purpose | For | Length |
|------|---------|-----|--------|
| **README.md** | This file - Navigation & overview | Everyone | - |
| **STANDARDS.md** | 26 Rules, guidelines, consistency audit, scalability rules | Tech Leads, QA | 600+ lines |
| **USAGE.md** | Practical developer guide, patterns, examples, troubleshooting | Developers | 800+ lines |
| **TOKENS.md** | Complete token reference (colors, typography, spacing, motion) | Everyone | 200+ lines |
| **AUDIT.md** | Consistency audit results, health metrics, identified issues | QA, Leads | 400+ lines |
| **DESIGN_ALIGNMENT_AUDIT.md** | Design file vs system alignment report (95% aligned) | QA, Designers | 300+ lines |

---

## 🎯 Quick Navigation

### **I'm a Developer - Where Do I Start?**

1. Read **[USAGE.md](./DESIGN_SYSTEM_USAGE.md)** - Practical implementation guide
   - Token usage with examples
   - Creating components step-by-step
   - Common patterns (button, card, grid)
   - Responsive design approach
   - Troubleshooting section

2. Reference **[TOKENS.md](./DESIGN_SYSTEM_TOKENS.md)** - Available values
   - Color palette
   - Typography scale
   - Spacing system
   - Motion tokens
   - Z-index system

3. Check examples in `styles/components/` for real code

---

### **I'm a Tech Lead/QA - Where Do I Check?**

1. Read **[STANDARDS.md](./DESIGN_SYSTEM_STANDARDS.md)** - Rules & guidelines
   - 26 architectural rules
   - Naming conventions
   - File structure standards
   - Component creation guidelines
   - Code review checklist

2. Review **[AUDIT.md](./DESIGN_SYSTEM_AUDIT.md)** - Current status
   - Consistency metrics (100%)
   - System health dashboard
   - Identified issues & fixes
   - Performance data

---

### **I Need to Add a New Component**

1. **Plan:** Define block, elements, modifiers, responsive behavior
2. **Implement:** Follow pattern in USAGE.md Step 2
3. **Check:** Use code review checklist in STANDARDS.md
4. **Register:** Add to `/styles/components/index.scss`

→ See **USAGE.md - Creating Components**

---

### **Design System Has an Issue - What Do I Do?**

1. Check **AUDIT.md** for known issues
2. If new issue, verify against **STANDARDS.md** rules
3. Run consistency audit
4. Document issue and fix in AUDIT.md
5. Update STANDARDS.md if new rule needed

---

## 📊 System Overview

### **Architecture (7 Layers)**

```
styles/
├── tokens/          ← Design values (colors, spacing, motion)
├── tools/           ← Mixins & functions
├── base/            ← Global, reset, animations
├── layout/          ← Grid, flex, container
├── utilities/       ← Auto-generated utilities
├── components/      ← UI component library
└── main.scss        ← Central orchestration
```

### **Current Status**

| Aspect | Coverage | Health |
|--------|----------|--------|
| **Components** | 13 total (5 basic + 8 interactive) | ✅ 100% |
| **Consistency** | All metrics | ✅ 100% |
| **Dark Mode** | All components | ✅ 100% |
| **Responsive** | 6 breakpoints | ✅ 100% |
| **Documentation** | Full coverage | ✅ 100% |

---

## 🚀 Getting Started

### **For Writing SCSS**

```scss
// Always follow this import order:
@use '../tokens/colors' as *;
@use '../tokens/typography' as *;
@use '../tokens/spacing' as *;
@use '../tokens/motion' as *;
@use '../tokens/z-index' as *;
@use '../tools/mixins' as *;

// ✅ Use tokens
.component {
  color: $fg-primary;           // Token color
  padding: $space-4;            // Token spacing
  font-size: $text-lg;          // Token typography
  @include transition(all);     // Token motion
  z-index: $z-overlay;          // Token z-index
}
```

### **For Using Utilities**

```html
<!-- Spacing utilities -->
<div class="p-4 m-8 gap-6">

<!-- Layout utilities -->
<div class="flex flex-center gap-4">

<!-- Text utilities -->
<div class="text-center uppercase">

<!-- Color utilities -->
<div class="bg-black text-white">

<!-- Responsive utilities -->
<div class="hidden-sm show-md">
```

---

## 📖 Documentation Quick Links

- **[Full Standards Document](./DESIGN_SYSTEM_STANDARDS.md)** - Rules, guidelines, future improvements
- **[Developer Usage Guide](./DESIGN_SYSTEM_USAGE.md)** - Practical examples, patterns, troubleshooting
- **[Token Reference](./DESIGN_SYSTEM_TOKENS.md)** - Color, typography, spacing, motion values
- **[Consistency Audit](./DESIGN_SYSTEM_AUDIT.md)** - Health metrics, identified issues, results

---

## 🔧 Common Tasks

### **Add a New Color Token**

1. Edit `/styles/tokens/_colors.scss`
2. Add `$color-newname: #hexvalue;`
3. Update **TOKENS.md**
4. Update **STANDARDS.md** if semantic mapping changed

### **Create a New Component**

1. Create `/styles/components/_componentname.scss`
2. Follow template in **USAGE.md - Step 2**
3. Use code review checklist in **STANDARDS.md**
4. Register in `/styles/components/index.scss`

### **Fix Consistency Issue**

1. Identify violation in component code
2. Reference rule number in **STANDARDS.md**
3. Apply fix following USAGE.md pattern
4. Update **AUDIT.md** with resolution
5. Run `npm run build` to verify

### **Debug Styling Problem**

1. Check **USAGE.md - Troubleshooting** section
2. Verify tokens are imported correctly
3. Check BEM naming convention
4. Verify responsive using `@include respond-to()`
5. Check dark mode with `@include nightshift()`

---

## 📋 Design System Health

**Last Audit:** 2026-06-15

| Metric | Result | Status |
|--------|--------|--------|
| Color Consistency | 100% | ✅ |
| Typography Consistency | 100% | ✅ |
| Spacing Consistency | 100% | ✅ |
| Motion Consistency | 100% | ✅ |
| Z-Index Consistency | 100% | ✅ |
| Responsive Coverage | 100% | ✅ |
| Dark Mode Coverage | 100% | ✅ |
| Documentation | 100% | ✅ |
| **TOTAL** | **100%** | **✅** |

---

## 🎓 Learning Resources

### **New to Design Systems?**

1. Read "Quick Start" section in **USAGE.md**
2. Check "Common Patterns" section
3. Review existing component examples in `/styles/components/`
4. Try creating a simple component (button, badge)

### **Want to Contribute?**

1. Read **STANDARDS.md** (understand rules)
2. Read **USAGE.md** (learn patterns)
3. Check component examples
4. Follow code review checklist before commit
5. Update **AUDIT.md** with new additions

### **Need Help?**

- **Styling Question:** Check USAGE.md Troubleshooting
- **Token Value:** Look in TOKENS.md
- **Pattern Example:** Search in USAGE.md Common Patterns
- **Rule Reference:** Find rule number in STANDARDS.md

---

## 📞 Contact & Support

For questions or issues:
1. Check documentation files first
2. Review existing components for patterns
3. Run consistency audit (`AUDIT.md`)
4. Reference code review checklist (`STANDARDS.md`)

---

**Last Updated:** 2026-06-15  
**Status:** ✅ Complete & Production Ready  
**Version:** 1.0
