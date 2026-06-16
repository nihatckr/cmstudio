// app/HomeStructuredData.tsx
// Structured data for homepage (Client Component workaround)

'use client';

import { useEffect } from 'react';
import { siteMetadata } from '@/lib/data';

export function HomeStructuredData() {
  useEffect(() => {
    // Only run on client side, once
    if (typeof window === 'undefined') return;
    
    // Check if script already exists
    if (document.querySelector('script[data-home-structured-data]')) return;
    
    const itemListSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Featured Architecture Projects',
      description: 'Portfolio of architecture and interior design projects',
      url: siteMetadata.siteUrl,
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-home-structured-data', 'true');
    script.text = JSON.stringify(itemListSchema, null, 2);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[data-home-structured-data]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  
  return null; // This component doesn't render anything
}
