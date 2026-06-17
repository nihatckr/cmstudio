# 🚀 Deployment Guide

**City Marin Studio - Production Deployment Documentation**

Complete guide to deploying the project to production environments.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Vercel Deployment](#-vercel-deployment-recommended)
- [Manual Deployment](#-manual-deployment)
- [Environment Variables](#-environment-variables)
- [Pre-Deployment Checklist](#-pre-deployment-checklist)
- [Build Configuration](#-build-configuration)
- [Performance Optimization](#-performance-optimization)
- [Monitoring](#-monitoring)
- [Troubleshooting](#-troubleshooting)
- [Rollback Strategy](#-rollback-strategy)

---

## 🎯 Overview

### **Deployment Options**

| Platform | Recommended | Difficulty | Features |
|----------|-------------|------------|----------|
| **Vercel** | ✅ Yes | Easy | Auto-deploy, Edge, Analytics |
| **Netlify** | ✅ Yes | Easy | Auto-deploy, Edge, Forms |
| **AWS** | ❌ No | Hard | Full control, Complex setup |
| **Docker** | ⚠️ Advanced | Medium | Portable, Self-hosted |

### **Current Setup**

- **Framework:** Next.js 16.2.9
- **Build Time:** ~1.5 seconds
- **Static Pages:** 28 pre-rendered
- **API Routes:** 1 (contact form)
- **Middleware:** Proxy configuration

---

## ▲ Vercel Deployment (Recommended)

### **Why Vercel?**

✅ **Benefits:**
- Automatic deployments from Git
- Zero configuration required
- Global CDN (Edge Network)
- Instant rollbacks
- Preview deployments for PRs
- Built-in analytics
- Optimized for Next.js

### **Quick Deploy**

**Method 1: Web Interface**

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `nihatckr/cmstudio` repository
   - Click "Deploy"

2. **Done!** 🎉
   - Production URL: `https://cmstudio.vercel.app`
   - Auto-deploys on push to `main`

**Method 2: CLI**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy to production
vercel --prod
```

### **Configuration**

**Vercel automatically detects:**
- Next.js 16 project
- Build command: `npm run build`
- Output directory: `.next`
- Install command: `npm install`

**Custom Settings (vercel.json - optional):**

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### **Environment Variables (Vercel)**

**Via Web Interface:**
1. Go to Project Settings
2. Click "Environment Variables"
3. Add variables:
   - `NODE_ENV` = `production`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`

**Via CLI:**

```bash
vercel env add NODE_ENV
# Enter: production

vercel env add NEXT_PUBLIC_SITE_URL
# Enter: https://your-domain.com
```

### **Custom Domain**

**Add Domain:**

1. Go to Project Settings → Domains
2. Add your domain: `cmstudio.com`
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-60 minutes)

### **Auto-Deploy Setup**

**Already configured automatically:**

- ✅ Push to `main` → Production deploy
- ✅ Push to any branch → Preview deploy
- ✅ Pull Request → Preview deploy with unique URL

**Disable auto-deploy (if needed):**

Project Settings → Git → Uncheck "Production Branch"

---

## 🌐 Manual Deployment

### **Prerequisites**

- Node.js 20+ installed
- Server with SSH access
- Domain with DNS access
- SSL certificate (Let's Encrypt recommended)

### **Build for Production**

```bash
# 1. Clean previous builds
rm -rf .next

# 2. Install dependencies
npm ci --production

# 3. Build project
npm run build

# 4. Output
# .next/ folder contains built application
```

### **Deploy to Server**

**Method 1: PM2 (Process Manager)**

```bash
# 1. Install PM2
npm install -g pm2

# 2. Start application
pm2 start npm --name "cmstudio" -- start

# 3. Save PM2 configuration
pm2 save

# 4. Setup auto-restart on reboot
pm2 startup
```

**Method 2: Systemd Service**

```bash
# 1. Create service file
sudo nano /etc/systemd/system/cmstudio.service
```

```ini
[Unit]
Description=City Marin Studio
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/cmstudio
ExecStart=/usr/bin/npm start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
# 2. Enable and start service
sudo systemctl enable cmstudio
sudo systemctl start cmstudio

# 3. Check status
sudo systemctl status cmstudio
```

### **Nginx Configuration**

```nginx
server {
    listen 80;
    server_name cmstudio.com www.cmstudio.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cmstudio.com www.cmstudio.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/cmstudio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cmstudio.com/privkey.pem;
    
    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static files cache
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx
```

### **SSL Certificate (Let's Encrypt)**

```bash
# 1. Install Certbot
sudo apt install certbot python3-certbot-nginx

# 2. Obtain certificate
sudo certbot --nginx -d cmstudio.com -d www.cmstudio.com

# 3. Auto-renewal (already setup by Certbot)
sudo certbot renew --dry-run
```

---

## 🔐 Environment Variables

### **Required Variables**

| Variable | Value | Usage |
|----------|-------|-------|
| `NODE_ENV` | `production` | Environment mode |
| `NEXT_PUBLIC_SITE_URL` | `https://cmstudio.com` | Base site URL |

### **Optional Variables**

| Variable | Value | Usage |
|----------|-------|-------|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Google Analytics |
| `ANALYZE` | `true` | Bundle analysis |

### **Setup (.env.production)**

```bash
# Create production environment file
cat > .env.production << EOF
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://cmstudio.com
EOF
```

**Security:**
- ✅ Never commit `.env` files
- ✅ Use environment variables in CI/CD
- ✅ Rotate secrets regularly
- ❌ Never expose secrets in client code

---

## ✅ Pre-Deployment Checklist

### **Code Quality**

```bash
# 1. Run linter
npm run lint
# Expected: 0 warnings

# 2. Build production
npm run build
# Expected: Build successful, 28 pages generated

# 3. Check TypeScript
# (automatically checked in build)
```

### **Content Verification**

- [ ] All pages load correctly
- [ ] All images display
- [ ] All links work (internal & external)
- [ ] Forms submit successfully
- [ ] Dark mode toggle works
- [ ] No console errors

### **Performance**

```bash
# Run bundle analyzer
npm run build:analyze

# Check for:
# - Large bundles (>500KB)
# - Duplicate dependencies
# - Unused code
```

### **SEO Checks**

- [ ] Meta tags present on all pages
- [ ] OpenGraph images set
- [ ] Sitemap.xml generates
- [ ] Robots.txt accessible
- [ ] Structured data (JSON-LD) valid

**Validation Tools:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### **Accessibility**

- [ ] WCAG 2.1 Level AA compliant
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient (4.5:1+)

**Test with:**
- Chrome Lighthouse (Accessibility score 90+)
- WAVE browser extension
- axe DevTools

### **Browser Testing**

Test in:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

Test responsive:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1440px)

### **Security**

- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] No exposed secrets in code
- [ ] Dependencies up to date (no critical vulnerabilities)

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (if possible)
npm audit fix
```

---

## ⚙️ Build Configuration

### **next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Output standalone build
  output: 'standalone',
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Powered by header (hide for security)
  poweredByHeader: false,
  
  // Generate ETags
  generateEtags: true,
};

export default nextConfig;
```

### **Build Optimization**

**Enabled automatically:**
- ✅ Code splitting per route
- ✅ Tree shaking
- ✅ Minification
- ✅ Image optimization
- ✅ Font optimization
- ✅ CSS extraction

**Additional optimizations:**

```typescript
// Enable SWC minifier (faster)
const nextConfig: NextConfig = {
  swcMinify: true,
};
```

---

## 📊 Performance Optimization

### **Lighthouse Targets**

| Metric | Target | Current |
|--------|--------|---------|
| Performance | 90+ | 95+ |
| Accessibility | 90+ | 100 |
| Best Practices | 90+ | 100 |
| SEO | 90+ | 100 |

### **Core Web Vitals**

| Metric | Target | Description |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | <2.5s | Loading performance |
| FID (First Input Delay) | <100ms | Interactivity |
| CLS (Cumulative Layout Shift) | <0.1 | Visual stability |

### **Monitoring Performance**

**Vercel Analytics:**
- Automatically enabled on Vercel
- Real User Monitoring (RUM)
- Core Web Vitals tracking

**Google Lighthouse:**

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://cmstudio.com --view
```

---

## 📈 Monitoring

### **Health Checks**

**Endpoint:** `https://cmstudio.com/api/health` (create if needed)

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

### **Error Tracking**

**Options:**
- [Sentry](https://sentry.io/) - Error tracking
- [LogRocket](https://logrocket.com/) - Session replay
- [Datadog](https://www.datadoghq.com/) - Full observability

**Sentry Setup (example):**

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### **Analytics**

**Google Analytics 4:**

```typescript
// app/layout.tsx
{process.env.NODE_ENV === 'production' && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
    <script dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `
    }} />
  </>
)}
```

---

## 🐛 Troubleshooting

### **Build Fails**

**Problem:** Build fails with errors

**Solutions:**

```bash
# 1. Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build

# 2. Check Node version
node --version  # Should be 20+

# 3. Check for TypeScript errors
npx tsc --noEmit
```

### **Pages Not Loading**

**Problem:** Pages return 404

**Solutions:**

1. Check `app/` directory structure
2. Verify file naming (`page.tsx`, not `index.tsx`)
3. Check middleware configuration
4. Clear browser cache

### **Slow Performance**

**Problem:** Site loads slowly

**Solutions:**

```bash
# 1. Analyze bundle
npm run build:analyze

# 2. Check for large dependencies
npm ls --depth=0

# 3. Optimize images
# Use Next.js Image component

# 4. Enable caching
# Configure CDN/Edge caching
```

### **Environment Variables Not Working**

**Problem:** `process.env.VARIABLE` is undefined

**Solutions:**

1. Prefix client variables with `NEXT_PUBLIC_`
2. Restart dev server after adding variables
3. Check variable is set in deployment platform
4. Verify no typos in variable name

---

## ⏪ Rollback Strategy

### **Vercel Rollback**

**Instant rollback to previous deployment:**

1. Go to Deployments tab
2. Find previous working deployment
3. Click three dots → "Promote to Production"
4. Done! (Rollback in seconds)

### **Manual Rollback**

```bash
# 1. Revert to previous commit
git revert HEAD
git push origin main

# 2. Or checkout previous tag
git checkout v1.0.0
npm install
npm run build

# 3. Restart application
pm2 restart cmstudio
# or
sudo systemctl restart cmstudio
```

---

## 📋 Deployment Summary

### **Quick Start**

```bash
# Vercel (recommended)
vercel --prod

# Manual
npm ci --production
npm run build
pm2 start npm --name "cmstudio" -- start
```

### **Post-Deployment**

1. ✅ Verify all pages load
2. ✅ Test forms submit
3. ✅ Check Lighthouse score
4. ✅ Monitor error logs
5. ✅ Test dark mode
6. ✅ Verify analytics tracking

---

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Web.dev Performance](https://web.dev/performance/)

---

<div align="center">

**Deployment Guide**  
*Last Updated: June 17, 2026*

[Back to Documentation Hub](../README.md)

</div>
