'use client';

import { useEffect, useState } from 'react';

/**
 * IntroScreen — sayfa ilk yüklendiğinde gösterilen loading ekranı
 *
 * CSS animasyonları design/index.html'den birebir:
 *   - Logo: opacity 0 → 1, 0.5s delay 0.2s
 *   - Wordmark: opacity 0 → 0.55, 0.6s delay 0.8s
 *   - 1800ms sonra .out class eklenir (opacity: 0, transition: 0.7s)
 *   - 750ms sonra unmount
 *
 * sessionStorage ile sadece ilk ziyarette gösterilir (yeniden yükleme = tekrar)
 * Respects prefers-reduced-motion: instantly exits for users who prefer reduced motion
 */
export function IntroScreen() {
  const [state, setState] = useState<'visible' | 'out' | 'gone'>('visible');

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // If user prefers reduced motion, skip to 'out' state immediately (50ms)
    // Otherwise use original timing (1800ms for out, 2550ms for gone)
    const outDelay = prefersReducedMotion ? 50 : 1800;
    const goneDelay = prefersReducedMotion ? 100 : 1800 + 750;

    const outTimer = setTimeout(() => {
      setState('out');
    }, outDelay);

    const goneTimer = setTimeout(() => {
      setState('gone');
    }, goneDelay);

    return () => {
      clearTimeout(outTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (state === 'gone') return null;

  return (
    <div id="intro" className={state === 'out' ? 'out' : ''} aria-hidden="true">
      <div className="intro-logo-wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 236.89 111.58"
          width="60"
          height="34"
          aria-hidden="true"
        >
          <polygon fill="white" points="97.63 55.79 97.63 111.58 125.53 111.58 125.53 27.9 97.63 55.79"/>
          <polygon fill="white" points="236.88 0 208.98 0 181.32 27.67 181.32 0 153.42 0 125.53 27.9 153.42 27.9 153.42 111.58 181.32 111.58 181.32 27.9 208.99 27.9 208.99 111.58 236.88 83.68 236.89 0"/>
          <polygon fill="white" points="27.9 83.68 55.79 111.58 83.68 111.58 83.68 83.68 27.9 83.68"/>
          <polygon fill="white" points="83.68 0 55.79 0 27.9 27.9 83.68 27.9 83.68 0"/>
          <polygon fill="white" points="27.9 27.9 0 55.79 0 83.68 27.9 83.68 27.9 27.9"/>
        </svg>
      </div>
      <div className="intro-wordmark">City Marin Studio</div>
    </div>
  );
}
