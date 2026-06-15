'use client';
import { useState, useEffect } from 'react';
import { cookieBannerMeta } from '@/lib/data';

/** Cookie banner — matches index.html .cookie-banner */
export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ack = localStorage.getItem('cms_cookies');
    if (!ack) setTimeout(() => setShow(true), 1500);
  }, []);

  const accept = (val: boolean) => {
    localStorage.setItem('cms_cookies', val ? 'accepted' : 'declined');
    setShow(false);
  };

  return (
    <div className={`cookie-banner${show ? ' show' : ''}`} aria-hidden={!show}>
      <div className="cookie-eyebrow">{cookieBannerMeta.eyebrow}</div>
      <div className="cookie-text">{cookieBannerMeta.text}</div>
      <div className="cookie-actions">
        <button className="cookie-btn primary" onClick={() => accept(true)}>{cookieBannerMeta.acceptLabel}</button>
        <button className="cookie-btn" onClick={() => accept(false)}>{cookieBannerMeta.declineLabel}</button>
      </div>
    </div>
  );
}
