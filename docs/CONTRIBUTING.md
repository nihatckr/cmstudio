# 🤝 Contributing Guide

**City Marin Studio - Development Contribution Guidelines**

Welcome! This guide will help you contribute to the project effectively.

---

## 📋 Table of Contents

- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Code Standards](#-code-standards)
- [Commit Conventions](#-commit-conventions)
- [Pull Request Process](#-pull-request-process)
- [Branch Naming](#-branch-naming)
- [Testing](#-testing)
- [Code Review](#-code-review)
- [Architecture Rules](#-architecture-rules)
- [Common Tasks](#-common-tasks)

---

## 🚀 Getting Started

### **Prerequisites**

- **Node.js:** 20.x or higher
- **npm:** 10.x or higher
- **Git:** Latest version
- **Code Editor:** VS Code recommended

### **Initial Setup**

```bash
# 1. Clone repository
git clone https://github.com/nihatckr/cmstudio.git
cd cmstudio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

### **Verify Setup**

```bash
# Run all quality checks
npm run lint        # ESLint (should pass)
npm run build       # Production build (should succeed)
```

**Expected Results:**
- ✅ Lint: 0 warnings
- ✅ Build: Successful in ~1500ms
- ✅ 28 static pages generated

---

## 🔄 Development Workflow

### **Standard Workflow**

```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes
# ... edit files ...

# 3. Run quality checks
npm run lint
npm run build

# 4. Commit changes
git add .
git commit -m "feat: add new feature"

# 5. Push to remote
git push origin feature/your-feature-name

# 6. Create Pull Request on GitHub
```

### **Daily Development**

```bash
# Start dev server (with hot reload)
npm run dev

# In another terminal, run checks as you code
npm run lint        # Check code quality
```

### **Before Committing**

**Always run these checks:**

```bash
# 1. Lint check (must pass)
npm run lint

# 2. Production build (must succeed)
npm run build

# 3. Verify no TypeScript errors
# (automatically checked during build)
```

---

## 📏 Code Standards

### **TypeScript**

**Rules:**
- ✅ Strict mode enabled (no `any` types)
- ✅ All props must have types
- ✅ Use interfaces for objects, types for unions
- ✅ Export types when used in multiple files

**Examples:**

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// ❌ Bad
export function Button(props: any) {
  return <button>{props.label}</button>;
}
```

### **React**

**Rules:**
- ✅ Use Server Components by default
- ✅ Add `"use client"` only when needed (state, effects, browser APIs)
- ✅ Use functional components (no class components except ErrorBoundary)
- ✅ Prefer composition over props drilling
- ✅ Use React.memo for expensive components

**Server vs Client:**

```typescript
// ✅ Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <ClientComponent data={data} />;
}

// ✅ Client Component (interactive)
'use client';
export function ClientComponent({ data }) {
  const [state, setState] = useState();
  return <div onClick={() => setState('clicked')}>{state}</div>;
}
```

### **Styling**

**Rules:**
- ✅ Use CSS Modules for component styles (`*.module.scss`)
- ✅ Use design tokens (no magic numbers)
- ✅ Follow BEM naming for global classes
- ✅ Use kebab-case for CSS classes
- ✅ Mobile-first responsive design
- ❌ Never mix Tailwind with SASS in public pages

**Examples:**

```scss
// ✅ Good: Using tokens
.card {
  padding: var(--space-6);
  background: var(--bg-primary);
  border-radius: 8px;
}

// ❌ Bad: Magic numbers
.card {
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
}
```

### **File Organization**

**Rules:**
- ✅ Group related files in folders
- ✅ Use index files for barrel exports (when helpful)
- ✅ Keep components in `components/` directory
- ✅ Keep utilities in `lib/` directory
- ✅ Keep types in component files (not separate `/types`)

**Structure:**

```
components/
  ComponentName/
    ComponentName.tsx          # Component logic
    ComponentName.module.scss  # Component styles
    index.ts                   # Optional barrel export
```

---

## 📝 Commit Conventions

### **Commit Message Format**

```
<type>(<scope>): <subject>

<body>

<footer>
```

### **Types**

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add contact form validation` |
| `fix` | Bug fix | `fix: resolve dark mode flash` |
| `refactor` | Code restructure (no behavior change) | `refactor: extract form validation logic` |
| `docs` | Documentation only | `docs: update README with new setup` |
| `style` | Code formatting (no logic change) | `style: format code with prettier` |
| `perf` | Performance improvement | `perf: optimize image loading` |
| `test` | Add/update tests | `test: add unit tests for Button` |
| `build` | Build system changes | `build: update next.js to 16.2.10` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | Other changes (deps, config) | `chore: update dependencies` |
| `a11y` | Accessibility improvements | `a11y: improve keyboard navigation` |

### **Scope (Optional)**

Specify what part of the project:
- `components` - Component changes
- `styles` - Styling updates
- `api` - API changes
- `deps` - Dependency updates
- Page names: `home`, `about`, `contact`, etc.

### **Examples**

**Good commits:**

```bash
feat: add loading spinner to contact form

- Created LoadingSpinner component
- Integrated into ContactForm submit button
- Added 3 size variants (sm, md, lg)

feat(components): add error boundary for error recovery

- Created ErrorBoundary class component
- Added fallback UI with refresh button
- Wrapped main content in layout
- Error details shown in dev mode

fix(styles): resolve dark mode color contrast issues

- Updated Grey color to #757575 (4.61:1 WCAG AA)
- Updated Success color to #008048 (5.02:1 WCAG AA)
- All text now meets WCAG 2.1 Level AA standard

docs: add comprehensive architecture documentation

- Created ARCHITECTURE.md with full system overview
- Documented component patterns and data flow
- Added decision records for key choices
```

**Bad commits:**

```bash
# ❌ Too vague
update stuff

# ❌ No type
fixed the bug

# ❌ Not descriptive
feat: changes

# ❌ Multiple unrelated changes
feat: add button component, fix header bug, update readme
```

### **Commit Footer**

**Breaking Changes:**
```
BREAKING CHANGE: Button component now requires `label` prop
```

**Issue References:**
```
Closes #123
Fixes #456
```

**Co-authored commits:**
```
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

---

## 🌿 Branch Naming

### **Format**

```
<type>/<short-description>
```

### **Branch Types**

| Type | Purpose | Example |
|------|---------|---------|
| `feature/` | New feature | `feature/contact-form` |
| `fix/` | Bug fix | `fix/dark-mode-flash` |
| `refactor/` | Code refactor | `refactor/extract-validation` |
| `docs/` | Documentation | `docs/add-architecture` |
| `chore/` | Maintenance | `chore/update-deps` |
| `hotfix/` | Urgent production fix | `hotfix/broken-submit` |

### **Naming Rules**

- ✅ Use lowercase
- ✅ Use hyphens (not underscores or spaces)
- ✅ Be descriptive but concise
- ✅ Max 50 characters
- ❌ No generic names like `fixes`, `updates`, `changes`

### **Examples**

**Good branch names:**

```bash
feature/add-loading-spinner
feature/error-boundary
fix/color-contrast-wcag
refactor/scss-token-system
docs/component-documentation
chore/cleanup-folder-structure
```

**Bad branch names:**

```bash
fix-bug           # Too vague
my-changes        # Not descriptive
feature_new_stuff # Wrong separator
FEATURE/Something # Wrong case
```

---

## 🔀 Pull Request Process

### **1. Before Creating PR**

```bash
# Ensure clean state
npm run lint        # Must pass
npm run build       # Must succeed
git status          # No untracked files
```

### **2. Create PR**

**PR Title Format:**
```
<type>: <description>
```

**Example:**
```
feat: add loading states to contact form
fix: resolve dark mode color contrast
docs: add comprehensive documentation
```

### **3. PR Description Template**

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added LoadingSpinner component
- Integrated into ContactForm
- Updated styles for accessibility

## Testing Done
- [x] Lint passed
- [x] Build successful
- [x] Tested in Chrome, Safari, Firefox
- [x] Tested dark mode
- [x] Tested responsive (mobile, tablet, desktop)

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [x] Code follows project style guidelines
- [x] Self-reviewed code
- [x] Commented complex logic
- [x] Documentation updated (if needed)
- [x] No console errors
- [x] Accessibility tested
```

### **4. Review Process**

**As Author:**
1. Respond to all comments
2. Make requested changes
3. Re-request review after updates

**As Reviewer:**
1. Check code quality
2. Test locally if needed
3. Verify accessibility
4. Approve or request changes

### **5. Merge**

**Requirements:**
- ✅ All checks passed
- ✅ At least 1 approval
- ✅ No merge conflicts
- ✅ Branch up-to-date with main

**Merge Strategy:** Squash and merge (clean history)

---

## 🧪 Testing

### **Current Testing**

**Manual Testing:**
```bash
# 1. Lint (code quality)
npm run lint

# 2. Build (production validation)
npm run build

# 3. Visual testing (browser)
npm run dev
# Test in Chrome, Safari, Firefox
```

### **Testing Checklist**

**Before submitting PR:**

- [ ] **Lint passes** - `npm run lint` returns 0 warnings
- [ ] **Build succeeds** - `npm run build` completes
- [ ] **TypeScript compiles** - No type errors
- [ ] **Visual test** - Looks correct in browser
- [ ] **Dark mode** - Toggle works, looks good
- [ ] **Responsive** - Test mobile, tablet, desktop
- [ ] **Accessibility** - Keyboard navigation works
- [ ] **Forms** - Validation works, submission succeeds
- [ ] **Links** - All links work
- [ ] **Images** - All images load

### **Browser Testing**

**Required Browsers:**
- ✅ Chrome (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)

**Responsive Testing:**
- ✅ Mobile (375px)
- ✅ Tablet (768px)
- ✅ Desktop (1440px)

---

## 👀 Code Review

### **What to Review**

**Code Quality:**
- [ ] Follows TypeScript strict mode
- [ ] No `any` types
- [ ] Proper error handling
- [ ] No console.logs in production code
- [ ] No commented-out code

**Performance:**
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Code split appropriately
- [ ] No performance regressions

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Color contrast sufficient
- [ ] Focus indicators visible

**Styling:**
- [ ] Uses design tokens
- [ ] Responsive (mobile-first)
- [ ] Dark mode supported
- [ ] Follows naming conventions

### **Review Comments**

**Be constructive:**

✅ **Good comment:**
```
Consider using React.memo here since this component re-renders 
frequently. Example:

export const ExpensiveComponent = React.memo(function ExpensiveComponent() {
  // ...
});
```

❌ **Bad comment:**
```
This is wrong.
```

---

## 🏗️ Architecture Rules

### **Critical Rules (Never Break)**

**1. DB-First Architecture**
```typescript
// ❌ NEVER: Hardcoded data
const projects = [
  { id: 1, title: "Project" }
];

// ✅ ALWAYS: Database/API
const projects = await db.projects.findMany();
```

**2. Styling Separation**
```
Admin Panel: Shadcn/UI + Tailwind CSS
Public Pages: SASS design system

❌ NEVER mix these two approaches
```

**3. Server Components First**
```typescript
// ✅ DEFAULT: Server Component
export default function Page() {
  return <Content />;
}

// ✅ ONLY WHEN NEEDED: Client Component
'use client';
export function Interactive() {
  const [state] = useState();
  return <div>{state}</div>;
}
```

**4. Minimal Files**
- Avoid excessive abstraction
- Colocate related code
- Keep component hierarchy flat

### **TypeScript Rules**

- ✅ Strict mode always on
- ✅ Zero `any` types allowed
- ✅ All props typed
- ✅ Return types on functions (when not obvious)

### **Styling Rules**

- ✅ Use CSS Modules for components
- ✅ Use design tokens (no magic numbers)
- ✅ Mobile-first responsive
- ✅ Support dark mode

---

## 🛠️ Common Tasks

### **Adding a New Component**

```bash
# 1. Create component file
touch components/NewComponent/NewComponent.tsx

# 2. Create styles file
touch components/NewComponent/NewComponent.module.scss

# 3. Implement component
# See components/UI/LoadingSpinner.tsx for example

# 4. Test
npm run lint
npm run build
```

### **Adding a New Page**

```bash
# 1. Create page folder
mkdir app/new-page

# 2. Create page file
touch app/new-page/page.tsx

# 3. Create styles (if needed)
touch app/new-page/page.module.scss

# 4. Add to navigation (if needed)
# Edit components/Header/Header.tsx

# 5. Update sitemap
# app/sitemap.ts will auto-generate
```

### **Updating Dependencies**

```bash
# 1. Check outdated packages
npm outdated

# 2. Update specific package
npm install <package>@latest

# 3. Test everything
npm run lint
npm run build

# 4. Commit
git commit -m "chore: update <package> to vX.X.X"
```

### **Fixing Lint Errors**

```bash
# 1. Run lint to see errors
npm run lint

# 2. Fix errors manually or auto-fix
# (Manual fixes recommended)

# 3. Verify
npm run lint  # Should show 0 warnings
```

---

## 📚 Additional Resources

### **Documentation**

- [Architecture Guide](./technical/ARCHITECTURE.md)
- [Component Library](./technical/COMPONENTS.md)
- [Styling Guide](./technical/STYLING.md)
- [Design System](./design-system/README.md)

### **External Resources**

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ Getting Help

### **Questions?**

1. Check documentation first
2. Search existing issues on GitHub
3. Ask in team chat
4. Create issue if bug/feature request

### **Found a Bug?**

1. Check if already reported
2. Create detailed issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if visual)
   - Browser/OS info

---

## 🎉 Thank You!

Thank you for contributing to City Marin Studio! Your contributions help make this project better.

**Key Takeaways:**
- 🧪 Always test before committing
- 📝 Write clear commit messages
- 🎨 Follow design system
- ♿ Ensure accessibility
- 📖 Document complex logic

---

<div align="center">

**Contributing Guide**  
*Last Updated: June 17, 2026*

[Back to Documentation Hub](../README.md) • [Code of Conduct](../CODE_OF_CONDUCT.md)

</div>
