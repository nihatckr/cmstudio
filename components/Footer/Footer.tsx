'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { contactData, footerMeta } from '@/lib/data';

type FooterColKey = 'email' | 'offices' | 'social' | 'legal';

export function Footer() {
  const [openCols, setOpenCols] = useState<Set<FooterColKey>>(new Set());
  const [nightshift, setNightshift] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cms_nightshift');
    const isNightshift = stored === 'true' || stored === '"nightshift"' || stored === 'nightshift';
    
    // Only update DOM, don't call setNightshift here to avoid cascade
    if (isNightshift) {
      document.body.classList.add('nightshift');
    }
    
    // Update state after initial render
    setTimeout(() => setNightshift(isNightshift), 0);
  }, []);

  // Listen to keyboard shortcut event from GlobalKeyboard
  useEffect(() => {
    const handleToggle = () => {
      setNightshift(prev => {
        const newValue = !prev;
        localStorage.setItem('cms_nightshift', String(newValue));
        document.body.classList.toggle('nightshift', newValue);
        return newValue;
      });
    };
    
    window.addEventListener('cms:nightshift-toggle', handleToggle);
    return () => window.removeEventListener('cms:nightshift-toggle', handleToggle);
  }, []);

  const handleNightshift = () => {
    setNightshift(prev => {
      const newValue = !prev;
      localStorage.setItem('cms_nightshift', String(newValue));
      document.body.classList.toggle('nightshift', newValue);
      return newValue;
    });
  };

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

  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* EMAIL */}
        <div className="footer-col">
          <div 
            className={`footer-btn${isOpen('email') ? ' open' : ''}`} 
            onClick={() => toggle('email')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle('email'); } }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen('email')}
            aria-label="Toggle email contacts"
          >
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
          <div 
            className={`footer-btn${isOpen('offices') ? ' open' : ''}`} 
            onClick={() => toggle('offices')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle('offices'); } }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen('offices')}
            aria-label="Toggle office locations"
          >
            {footerMeta.sections.offices} <span className="footer-plus">+</span>
          </div>
          <div className={`footer-content${isOpen('offices') ? ' open' : ''}`}>
            <div className="footer-row">
              <span className="footer-key">{contactData.studio.place.split(', ')[1]?.toUpperCase() || 'TURKEY'}</span>
              <span className="footer-value">
                {contactData.studio.address.split('\n').map((line, idx, arr) => (
                  <span key={idx}>{line}{idx < arr.length - 1 && <br />}</span>
                ))}
              </span>
            </div>
            <div className="footer-row">
              <span className="footer-key">ISTANBUL</span>
              <span className="footer-value">
                Cevizli, Istanbul<br />
                Turkey<br />
                mail@citymarinstudio.com
              </span>
            </div>
          </div>
        </div>
 
        { /*  SOCIAL */}
        <div className="footer-col">
          <div 
            className={`footer-btn${isOpen('social') ? ' open' : ''}`} 
            onClick={() => toggle('social')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle('social'); } }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen('social')}
            aria-label="Toggle social media links"
          >
            {footerMeta.sections.social} <span className="footer-plus">+</span>
          </div>
          <div className={`footer-content${isOpen('social') ? ' open' : ''}`}>
            <a 
              href="https://www.instagram.com/citymarinstudio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social"
            >
              {footerMeta.socialLabel}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 1H9V8" stroke="currentColor" />
                <path d="M9 1L1 9" stroke="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* LEGAL */}
        <div className="footer-col">
          <div 
            className={`footer-btn${isOpen('legal') ? ' open' : ''}`} 
            onClick={() => toggle('legal')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle('legal'); } }}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen('legal')}
            aria-label="Toggle legal information"
          >
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
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNightshift(); } }}
        role="button"
        tabIndex={0}
        suppressHydrationWarning
        aria-label={nightshift ? 'Switch to dayshift' : 'Switch to nightshift'}
      >
        <div className="ns-dot" suppressHydrationWarning />
        <span suppressHydrationWarning>{nightshift ? 'DAYSHIFT' : 'NIGHTSHIFT'}</span>
      </div>
    </footer>
  );
}
