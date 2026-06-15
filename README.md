# City Marin Studio

A modern, design-system-driven Next.js website with production-ready SCSS architecture.

---

## 📚 Design System Documentation

**Complete design system reference is available in the [`/docs/design-system/`](./docs/design-system/README.md) folder.**

### **Quick Links**

| Document | Purpose | Audience |
|----------|---------|----------|
| [`README.md`](./docs/design-system/README.md) | Navigation & overview | Everyone |
| [`USAGE.md`](./docs/design-system/DESIGN_SYSTEM_USAGE.md) | Developer guide & patterns | Developers |
| [`STANDARDS.md`](./docs/design-system/DESIGN_SYSTEM_STANDARDS.md) | Rules & guidelines | Tech Leads/QA |
| [`TOKENS.md`](./docs/design-system/DESIGN_SYSTEM_TOKENS.md) | Token reference | Everyone |
| [`AUDIT.md`](./docs/design-system/DESIGN_SYSTEM_AUDIT.md) | Consistency audit & metrics | QA/Leads |

### **Start Here**

- **🚀 Developers:** Read [`USAGE.md`](./docs/design-system/DESIGN_SYSTEM_USAGE.md)
- **📋 Tech Leads:** Read [`STANDARDS.md`](./docs/design-system/DESIGN_SYSTEM_STANDARDS.md)
- **🔍 Need Token Values?** Check [`TOKENS.md`](./docs/design-system/DESIGN_SYSTEM_TOKENS.md)

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## 📂 Project Structure

```
cmstudio/
├── app/              ← Next.js app directory
├── components/       ← React components (in development)
├── styles/           ← SCSS architecture (7-layer system)
│   ├── tokens/       ← Design values (colors, spacing, typography, etc)
│   ├── tools/        ← Mixins & functions
│   ├── base/         ← Global, reset, animations
│   ├── layout/       ← Grid, flex, container
│   ├── utilities/    ← Generated utility classes
│   └── components/   ← UI component styles
├── public/           ← Static assets
├── docs/             ← Documentation
│   └── design-system/  ← Design system docs (see above)
└── design/           ← Design files & references

Root Files:
├── README.md         ← This file
├── AGENTS.md         ← VS Code agent customization (Next.js 16 rules)
├── CLAUDE.md         ← Project instructions reference
├── package.json      ← Dependencies
├── tsconfig.json     ← TypeScript config
├── next.config.ts    ← Next.js config
└── eslint.config.mjs ← Linter config
```

---

## 🎨 Design System Status

✅ **100% Complete & Production Ready**

- **Architecture:** 7-layer SCSS system
- **Components:** 13 total (5 basic + 8 interactive)
- **Consistency:** 100%
- **Documentation:** Full coverage
- **Dark Mode:** All components supported
- **Responsive:** 6 breakpoints (mobile-first)

**For full status, see [`AUDIT.md`](./docs/design-system/DESIGN_SYSTEM_AUDIT.md)**

---

## 📖 Learn More

### **Next.js**

- [Next.js Documentation](https://nextjs.org/docs) - Features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial

### **Design System**

Start with [`/docs/design-system/README.md`](./docs/design-system/README.md) for complete documentation and guides.

---

## 🛠️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Lint SCSS
npm run lint:scss
```

---

## 📝 License

This project is part of City Marin Studio.
