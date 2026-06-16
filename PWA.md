# Progressive Web App (PWA) Documentation

## Overview

City Marin Studio has been enhanced with Progressive Web App capabilities, enabling users to install the website as a native-like app on their devices with offline support.

## Implemented Features

### 1. Web App Manifest
**Files:** 
- `app/manifest.ts` - TypeScript manifest (Next.js 16 convention)
- `public/manifest.json` - Static JSON fallback

**Configuration:**
- **Name:** City Marin Studio
- **Short Name:** CMS
- **Display Mode:** standalone (full-screen, no browser UI)
- **Theme Color:** #1b1b1b (matches brand)
- **Background Color:** #ffffff
- **Orientation:** portrait-primary
- **Categories:** business, design, architecture

### 2. App Icons
**Location:** `public/icons/` (TODO: Generate actual icons)

**Required Sizes:**
- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px (Apple Touch Icon)
- 192x192px (Android home screen)
- 384x384px
- 512x512px (Android splash screen)

**Purpose:** `any maskable` - Works on all platforms including adaptive icons

### 3. Apple Touch Icons
**Meta Tags Added:**
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="CMS" />
<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
```

### 4. Offline Page
**File:** `app/offline/page.tsx`

**Features:**
- Friendly offline message
- "Try Again" reload button
- Links to cached pages (homepage, about, contact)
- Responsive design with dark mode support

### 5. Theme Color
**Meta Tag:**
```html
<meta name="theme-color" content="#1b1b1b" />
```

**Effect:** 
- Changes browser UI color on mobile (address bar, status bar)
- Matches brand identity

### 6. Manifest Shortcuts
**Quick Actions:**
- Projects - `/projects`
- Contact - `/contact`

**Usage:** Long-press app icon on Android to access shortcuts

## Installation Experience

### Desktop (Chrome/Edge)
1. Visit site at `https://cmstudio.com`
2. Click install icon in address bar (⊕)
3. Click "Install" in prompt
4. App opens in standalone window

### iOS (Safari)
1. Visit site at `https://cmstudio.com`
2. Tap Share button (⬆️)
3. Tap "Add to Home Screen"
4. Tap "Add"
5. App appears on home screen

### Android (Chrome)
1. Visit site at `https://cmstudio.com`
2. Tap "Add to Home Screen" banner
3. Or: Menu → "Install app"
4. App appears on home screen

## Service Worker (TODO)

For full offline support, implement service worker:

**File:** `public/sw.js`

```javascript
// Service Worker for offline caching
const CACHE_NAME = 'cms-v1';
const OFFLINE_URL = '/offline';

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/about',
  '/contact',
  '/styles/main.css',
  '/fonts/everett-regular-webfont.woff2',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    // Network-first for pages
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    // Cache-first for assets
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

**Registration:** Add to `app/layout.tsx`:

```typescript
useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}, []);
```

## Testing PWA

### Chrome DevTools
1. Open DevTools (F12)
2. Go to "Application" tab
3. Check:
   - **Manifest:** Verify all fields display correctly
   - **Service Workers:** Check registration status
   - **Cache Storage:** Verify cached assets
   - **Offline:** Toggle to test offline behavior

### Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Run PWA audit
lighthouse https://cmstudio.com --only-categories=pwa --view
```

**Target Scores:**
- [ ] Installable: Pass
- [ ] PWA Optimized: Pass
- [ ] Offline: Pass (requires service worker)

### PWA Checklist
- [x] manifest.json with all required fields
- [x] Icons (72px, 192px, 512px minimum)
- [x] Apple touch icons
- [x] Theme color meta tag
- [x] Viewport meta tag
- [x] HTTPS deployment (required for PWA)
- [ ] Service worker registered
- [ ] Offline fallback page cached
- [ ] Install prompt working

## Creating App Icons

### Using ImageMagick
```bash
# Create icons from logo SVG
convert city-marin-logo.svg -resize 72x72 public/icons/icon-72x72.png
convert city-marin-logo.svg -resize 96x96 public/icons/icon-96x96.png
convert city-marin-logo.svg -resize 128x128 public/icons/icon-128x128.png
convert city-marin-logo.svg -resize 144x144 public/icons/icon-144x144.png
convert city-marin-logo.svg -resize 152x152 public/icons/icon-152x152.png
convert city-marin-logo.svg -resize 192x192 public/icons/icon-192x192.png
convert city-marin-logo.svg -resize 384x384 public/icons/icon-384x384.png
convert city-marin-logo.svg -resize 512x512 public/icons/icon-512x512.png
```

### Online Tools
- **PWA Asset Generator:** https://www.pwabuilder.com/imageGenerator
- **Real Favicon Generator:** https://realfavicongenerator.net/
- **Maskable.app:** https://maskable.app/ (for adaptive icons)

### Icon Guidelines
- Use solid background color (brand color)
- Center logo with padding (safe zone: 80% of icon size)
- Export as PNG with transparency
- Optimize file size (<10KB per icon)

## Manifest Screenshots (Optional)

Add screenshots to manifest for richer install prompts (Chrome 90+):

```typescript
screenshots: [
  {
    src: '/screenshots/desktop-home.png',
    sizes: '1280x720',
    type: 'image/png',
    form_factor: 'wide', // Desktop
  },
  {
    src: '/screenshots/mobile-home.png',
    sizes: '750x1334',
    type: 'image/png',
    form_factor: 'narrow', // Mobile
  },
]
```

## Browser Support

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Manifest | ✅ | ✅ | ✅ | ✅ |
| Install Prompt | ✅ | ✅ (Add to Home Screen) | ❌ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |
| Offline | ✅ | ✅ | ✅ | ✅ |
| Shortcuts | ✅ | ❌ | ❌ | ✅ |
| Maskable Icons | ✅ | ✅ | ❌ | ✅ |

## Production Deployment

### Requirements
1. **HTTPS:** PWA requires secure context
2. **Valid manifest:** Must be accessible at `/manifest.json`
3. **Service worker:** Must be registered from root
4. **Icons:** All sizes must exist

### Verification
```bash
# Test manifest
curl https://cmstudio.com/manifest.json

# Test icons
curl -I https://cmstudio.com/icons/icon-192x192.png

# Test offline page
curl https://cmstudio.com/offline
```

## TODO Items

- [ ] Generate all app icon sizes (72px - 512px)
- [ ] Create maskable icon with safe zone padding
- [ ] Implement service worker (`public/sw.js`)
- [ ] Add service worker registration to layout
- [ ] Test install prompt on all platforms
- [ ] Create app screenshots for enhanced install prompt
- [ ] Run Lighthouse PWA audit (target 100 score)
- [ ] Test offline functionality
- [ ] Verify HTTPS deployment
- [ ] Submit to PWA directories (optional)

## References

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: PWA Checklist](https://web.dev/pwa-checklist/)
- [Next.js: Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [PWABuilder](https://www.pwabuilder.com/)
