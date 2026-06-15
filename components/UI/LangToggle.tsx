'use client';
import { useState } from 'react';

/** Language toggle EN/TR — matches index.html #langToggle */
export function LangToggle() {
  const [lang, setLang] = useState<'en' | 'tr'>('en');

  const toggle = () => setLang(l => l === 'en' ? 'tr' : 'en');

  return (
    <div id="langToggle" onClick={toggle} role="button" aria-label="Toggle language">
      <span className={`lang-opt${lang === 'en' ? ' active' : ''}`} data-lang="en">EN</span>
      <span className="lang-sep">/</span>
      <span className={`lang-opt${lang === 'tr' ? ' active' : ''}`} data-lang="tr">TR</span>
    </div>
  );
}
