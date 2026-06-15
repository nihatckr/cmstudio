'use client';
import { useEffect, useState } from 'react';

/** Back to top button — matches index.html #bttBtn */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="bttBtn"
      className={show ? 'show' : ''}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
        <path d="M0.52 4.64L4.16 1L7.79 4.64" stroke="currentColor"/>
        <path d="M4.16 1V9.31" stroke="currentColor"/>
      </svg>
      <span>TOP</span>
    </button>
  );
}
