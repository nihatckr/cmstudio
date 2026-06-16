// Client-side only components wrapper
// Lazy loads heavy interactive components to reduce initial bundle size
'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy interactive components - not critical for first paint
// These are only needed after user interaction (keyboard shortcuts, search, etc.)
export const SearchOverlay = dynamic(
  () => import('@/components/UI/SearchOverlay').then(mod => ({ default: mod.SearchOverlay })),
  { ssr: false }
);

export const GlobalKeyboard = dynamic(
  () => import('@/components/UI/GlobalKeyboard').then(mod => ({ default: mod.GlobalKeyboard })),
  { ssr: false }
);

export const IntroScreen = dynamic(
  () => import('@/components/UI/IntroScreen').then(mod => ({ default: mod.IntroScreen })),
  { ssr: false }
);
