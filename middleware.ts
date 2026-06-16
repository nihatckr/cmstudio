// middleware.ts
// Security headers and request handling middleware

import { NextResponse } from 'next/server';

export function middleware() {
  // Clone the response
  const response = NextResponse.next();

  // ──── Security Headers ─────────────────────────────────────────────────

  // 1. Content Security Policy (CSP)
  // Prevents XSS attacks by controlling which resources can be loaded
  const isDev = process.env.NODE_ENV === 'development';
  
  const cspDirectives = [
    "default-src 'self'",
    // Allow scripts from self, inline scripts (for Next.js), and unsafe-eval in dev mode only
    isDev 
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" 
      : "script-src 'self' 'unsafe-inline'",
    // Allow styles from self and inline styles (for CSS-in-JS)
    "style-src 'self' 'unsafe-inline'",
    // Allow images from self, data URIs (for inline images), and blob URIs
    "img-src 'self' data: blob:",
    // Allow fonts from self and data URIs
    "font-src 'self' data:",
    // Allow connections to self (for API calls)
    "connect-src 'self'",
    // Disallow frames from other origins
    "frame-ancestors 'none'",
    // Base URI restrictions
    "base-uri 'self'",
    // Form action restrictions
    "form-action 'self'",
    // Upgrade insecure requests to HTTPS
    "upgrade-insecure-requests",
  ];

  response.headers.set(
    'Content-Security-Policy',
    cspDirectives.join('; ')
  );

  // 2. HTTP Strict Transport Security (HSTS)
  // Forces browsers to only use HTTPS connections
  // max-age=31536000 (1 year), includeSubDomains, preload
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // 3. X-Frame-Options
  // Prevents clickjacking attacks by disallowing embedding in iframes
  response.headers.set('X-Frame-Options', 'DENY');

  // 4. X-Content-Type-Options
  // Prevents MIME-sniffing attacks
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 5. X-XSS-Protection
  // Legacy XSS protection (modern browsers use CSP instead)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // 6. Referrer-Policy
  // Controls how much referrer information is shared
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 7. Permissions-Policy (formerly Feature-Policy)
  // Controls which browser features and APIs can be used
  const permissionsPolicy = [
    'camera=()',         // Disable camera access
    'microphone=()',     // Disable microphone access
    'geolocation=()',    // Disable geolocation
    'interest-cohort=()', // Disable FLoC (privacy protection)
    'payment=()',        // Disable payment request API
    'usb=()',            // Disable USB access
  ];

  response.headers.set(
    'Permissions-Policy',
    permissionsPolicy.join(', ')
  );

  // 8. X-DNS-Prefetch-Control
  // Controls DNS prefetching for better privacy
  response.headers.set('X-DNS-Prefetch-Control', 'off');

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, robots.txt, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
};
