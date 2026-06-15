'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { contactData, footerMeta } from '@/lib/data';

type FooterColKey = 'email' | 'offices' | 'social' | 'legal';

export function Footer() {
  const [openCols, setOpenCols] = useState<Set<FooterColKey>>(new Set());
  const [nightshift, setNightshift] = useState(() => {
    // Initialize from localStorage on mount
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cms_nightshift') === 'true';
  });

  // Apply nightshift classes when state changes
  useEffect(() => {
    document.documentElement.classList.toggle('nightshift', nightshift);
    document.body.classList.toggle('nightshift', nightshift);
  }, [nightshift]);

  const toggle = (key: FooterColKey) => {
    setOpenCols(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const isOpen = (key: FooterColKey) => openCols.has(key);

  const handleNightshift = () => {
    const next = !nightshift;
    setNightshift(next);
    document.documentElement.classList.toggle('nightshift', next);
    document.body.classList.toggle('nightshift', next);
    try { localStorage.setItem('cms_nightshift', String(next)); } catch {}
  };

  // Listen for keyboard shortcut N → nightshift toggle
  useEffect(() => {
    const handler = () => handleNightshift();
    window.addEventListener('cms:nightshift-toggle', handler);
    return () => window.removeEventListener('cms:nightshift-toggle', handler);
  });

  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* EMAIL */}
        <div className="footer-col">
          <div className={`footer-btn${isOpen('email') ? ' open' : ''}`} onClick={() => toggle('email')} role="button">
            {footerMeta.sections.email} <span className="footer-plus">+</span>
          </div>
          <div className={`footer-content${isOpen('email') ? ' open' : ''}`}>
            <div className="footer-row">
              {contactData.inquiries.map((inquiry: typeof contactData.inquiries[number]) => (
                <div key={inquiry.label}>
                  <span className="footer-key">{inquiry.label.toUpperCase()}</span>
                  <span className="footer-value">{inquiry.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OFFICES */}
        <div className="footer-col">
          <div className={`footer-btn${isOpen('offices') ? ' open' : ''}`} onClick={() => toggle('offices')} role="button">
            {footerMeta.sections.offices} <span className="footer-plus">+</span>
          </div>
          <div className={`footer-content${isOpen('offices') ? ' open' : ''}`}>
            <div className="footer-row">
              <span className="footer-key">{contactData.studio.place.split(', ')[1].toUpperCase()}</span>
              <span className="footer-value">{contactData.studio.address.replace(/\n/g, '<br />')}</span>
            </div>
            <div className="footer-row">
              <span className="footer-key">ISTANBUL</span>
              <span className="footer-value">Cevizli, Istanbul<br />Turkey<br />mail@citymarinstudio.com</span>
            </div>
          </div>
        </div>
 
        { /*  SOCIAL */}
        <div className="footer-col">
          <div className={`footer-btn${isOpen('social') ? ' open' : ''}`} onClick={() => toggle('social')} role="button">
            {footerMeta.sections.social} <span className="footer-plus">+</span>
          </div>
          <div className={`footer-content${isOpen('social') ? ' open' : ''}`}>
            <Link href="https://www.instagram.com/citymarinstudio/" target="_blank" rel="noopener noreferrer" className="footer-social">
              {footerMeta.socialLabel}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 1H9V8" stroke="currentColor" />
                <path d="M9 1L1 9" stroke="currentColor" />
              </svg>
            </Link>
          </div>
        </div>

        {/* LEGAL */}
        <div className="footer-col">
          <div className={`footer-btn${isOpen('legal') ? ' open' : ''}`} onClick={() => toggle('legal')} role="button">
            {footerMeta.sections.legal} <span className="footer-plus">+</span>
          </div>
          <div className={`footer-content${isOpen('legal') ? ' open' : ''}`}>
            {footerMeta.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="footer-legal">{link.label}</Link>
            ))}
          </div>
        </div>

      </div>

      {/* footer-bottom — nightshift toggle */}
      <div
        className="footer-bottom"
        onClick={handleNightshift}
        role="button"
        suppressHydrationWarning
        aria-label={nightshift ? 'Switch to dayshift' : 'Switch to nightshift'}
      >
        <div className="ns-dot" suppressHydrationWarning />
        <span suppressHydrationWarning>{nightshift ? 'DAYSHIFT' : 'NIGHTSHIFT'}</span>
      </div>
    </footer>
  );
}
