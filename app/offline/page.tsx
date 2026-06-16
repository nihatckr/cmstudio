// app/offline/page.tsx
// Offline fallback page for PWA

import type { Metadata } from 'next';
import Link from 'next/link';
import { ReloadButton } from '@/components/UI/ReloadButton';

export const metadata: Metadata = {
  title: 'Offline',
  description: 'You are currently offline',
};

export default function OfflinePage() {
  return (
    <div className="offline-page">
      <div className="offline-container">
        <div className="offline-icon">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="2" opacity="0.2" />
            <path d="M30 60h60M60 30v60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <circle cx="60" cy="60" r="8" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        
        <h1 className="offline-title">You&apos;re offline</h1>
        <p className="offline-description">
          It looks like you&apos;ve lost your internet connection. Some content may not be available right now.
        </p>
        
        <div className="offline-actions">
          <ReloadButton />
          <Link href="/" className="offline-button secondary">
            Go to Homepage
          </Link>
        </div>
        
        <div className="offline-cached">
          <p className="offline-cached-title">You can still browse:</p>
          <ul className="offline-cached-list">
            <li><Link href="/">Homepage</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
