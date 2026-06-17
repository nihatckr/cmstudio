// components/GoogleAnalytics.tsx
// Google Analytics 4 Script Component

'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_MEASUREMENT_ID, isAnalyticsEnabled, pageview } from '@/lib/analytics';

/**
 * Internal tracking component wrapped in Suspense
 */
function GoogleAnalyticsTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Analytics 4 Component
 * 
 * Automatically tracks page views on route changes.
 * Only loads in production when GA_MEASUREMENT_ID is set.
 * 
 * Usage in app/layout.tsx:
 * <GoogleAnalytics />
 */
export function GoogleAnalytics() {

  // Don't render anything if analytics disabled
  if (!isAnalyticsEnabled) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true,
            });
          `,
        }}
      />
      {/* Track page views with Suspense boundary */}
      <Suspense fallback={null}>
        <GoogleAnalyticsTracking />
      </Suspense>
    </>
  );
}
