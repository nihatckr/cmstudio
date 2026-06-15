'use client';
import { useEffect, useState } from 'react';

/** Scroll progress bar — bottom of page, matches index.html #progressBar */
export function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setWidth(dh > 0 ? (st / dh) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      id="progressBar"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}
