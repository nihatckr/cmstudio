'use client';

import { useEffect, useState } from 'react';
import { KeyboardHelp } from './KeyboardHelp';

/**
 * GlobalKeyboard — global klavye shortcut koordinatörü
 *
 * Shortcut'lar (design/index.html ile birebir):
 *   ?   → keyboard help overlay
 *   Esc → kapat / iptal
 *   ⌘K  → search (SearchOverlay'e event dispatch)
 *   M   → menu sidebar (Header'a event dispatch)
 *   N   → nightshift toggle (Footer ile aynı mantık)
 *   T   → back to top
 */
export function GlobalKeyboard() {
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      // Input/textarea'da shortcut'lar çalışmamalı
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case '?':
          e.preventDefault();
          setHelpOpen(v => !v);
          break;

        case 'Escape':
          setHelpOpen(false);
          break;

        case 'n':
        case 'N':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            window.dispatchEvent(new Event('cms:nightshift-toggle'));
          }
          break;

        case 'm':
        case 'M':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            window.dispatchEvent(new Event('cms:menu-toggle'));
          }
          break;

        case 't':
        case 'T':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!helpOpen) return null;
  return <KeyboardHelp onClose={() => setHelpOpen(false)} />;
}
