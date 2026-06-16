# Security Headers Documentation

## Implemented Security Headers

### 1. Content Security Policy (CSP)
**Purpose:** Prevents XSS attacks by controlling which resources can be loaded.

**Directives:**
- `default-src 'self'` - Only allow resources from same origin
- `script-src 'self' 'unsafe-inline'` - Allow scripts from self and inline (for Next.js)
- `style-src 'self' 'unsafe-inline'` - Allow styles from self and inline (for CSS-in-JS)
- `img-src 'self' data: blob:` - Allow images from self, data URIs, and blobs
- `font-src 'self' data:` - Allow fonts from self and data URIs
- `connect-src 'self'` - Allow API connections to same origin only
- `frame-ancestors 'none'` - Disallow embedding in iframes
- `base-uri 'self'` - Restrict base tag URLs
- `form-action 'self'` - Restrict form submissions to same origin
- `upgrade-insecure-requests` - Auto-upgrade HTTP to HTTPS

**Note:** Development mode allows `'unsafe-eval'` for hot reload support.

### 2. HTTP Strict Transport Security (HSTS)
**Value:** `max-age=31536000; includeSubDomains; preload`

**Purpose:** Forces browsers to only use HTTPS connections for 1 year.
- `max-age=31536000` - 1 year cache duration
- `includeSubDomains` - Apply to all subdomains
- `preload` - Enable HSTS preload list inclusion

### 3. X-Frame-Options
**Value:** `DENY`

**Purpose:** Prevents clickjacking by disallowing the site from being embedded in iframes.

### 4. X-Content-Type-Options
**Value:** `nosniff`

**Purpose:** Prevents MIME-sniffing, forcing browser to respect declared content types.

### 5. X-XSS-Protection
**Value:** `1; mode=block`

**Purpose:** Legacy XSS filter (modern browsers rely on CSP instead).

### 6. Referrer-Policy
**Value:** `strict-origin-when-cross-origin`

**Purpose:** Controls referrer information sharing:
- Same-origin: Full URL
- Cross-origin HTTPS→HTTPS: Origin only
- HTTPS→HTTP: No referrer

### 7. Permissions-Policy
**Value:** Disabled features:
- `camera=()` - No camera access
- `microphone=()` - No microphone access
- `geolocation=()` - No location access
- `interest-cohort=()` - No FLoC tracking
- `payment=()` - No payment API
- `usb=()` - No USB access

**Purpose:** Restricts browser features and APIs for privacy and security.

### 8. X-DNS-Prefetch-Control
**Value:** `off`

**Purpose:** Disables DNS prefetching for better privacy.

## Testing Security Headers

### Local Testing (Development)
```bash
npm run dev
curl -I http://localhost:3000/
```

### Production Testing
```bash
npm run build
npm start
curl -I http://localhost:3000/
```

### Online Security Scanners
1. **Mozilla Observatory:** https://observatory.mozilla.org/
2. **Security Headers:** https://securityheaders.com/
3. **CSP Evaluator:** https://csp-evaluator.withgoogle.com/

## CSP Nonce Implementation (Future Enhancement)

For even stricter CSP without `'unsafe-inline'`, implement nonce-based CSP:

```typescript
// middleware.ts
import { nanoid } from 'nanoid';

const nonce = nanoid();
response.headers.set(
  'Content-Security-Policy',
  `script-src 'self' 'nonce-${nonce}'`
);
```

Then add nonce to script tags in layout:
```tsx
<script nonce={nonce}>...</script>
```

## Known CSP Considerations

1. **Next.js inline scripts:** Require `'unsafe-inline'` or nonce-based approach
2. **Third-party scripts:** Add domains to `script-src` when needed (e.g., analytics)
3. **External fonts:** Add to `font-src` if using Google Fonts, etc.
4. **CDN images:** Add domains to `img-src` when added

## Updating for Third-Party Services

When adding services like Google Analytics, update CSP:

```typescript
const cspDirectives = [
  // ...
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "connect-src 'self' https://www.google-analytics.com",
  "img-src 'self' data: blob: https://www.google-analytics.com",
  // ...
];
```

## Security Audit Checklist

- [ ] Test all pages with CSP enabled
- [ ] Verify no console CSP violations
- [ ] Test forms submission
- [ ] Test image loading (project images, placeholders)
- [ ] Test search overlay functionality
- [ ] Test dark mode toggle (localStorage)
- [ ] Run Mozilla Observatory scan
- [ ] Run Security Headers scan
- [ ] Verify HSTS header in production
- [ ] Test iframe embedding (should be blocked)
