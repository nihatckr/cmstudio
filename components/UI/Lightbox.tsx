'use client';

import { useEffect, useCallback, useState } from 'react';

export interface LightboxImage {
  svg: string;
  caption: string;
  meta: string;
}

interface LightboxProps {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(startIndex);

  const prev = useCallback(() => setIdx(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIdx(i => Math.min(images.length - 1, i + 1)), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      else if (e.key === 'ArrowLeft')  prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const cur = images[idx];
  const counter = `${String(idx + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;

  return (
    <div className="lightbox open" role="dialog" aria-modal="true" aria-label="Image viewer">
      {/* Head */}
      <div className="lightbox-head">
        <div className="lb-counter">{counter}</div>
        <div className="lb-close" onClick={onClose} role="button" aria-label="Close lightbox">
          CLOSE <span className="pmh-close-x" />
        </div>
      </div>

      {/* Body */}
      <div className="lightbox-body">
        <div
          className={`lb-nav${idx === 0 ? ' disabled' : ''}`}
          onClick={prev}
          role="button"
          aria-label="Previous image"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M18 6 L9 14 L18 22" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        <div
          className="lb-stage"
          key={idx}
          dangerouslySetInnerHTML={{ __html: cur.svg }}
        />

        <div
          className={`lb-nav${idx === images.length - 1 ? ' disabled' : ''}`}
          onClick={next}
          role="button"
          aria-label="Next image"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M10 6 L19 14 L10 22" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      {/* Foot */}
      <div className="lightbox-foot">
        <div className="lb-caption">{cur.caption}</div>
        <div className="lb-meta">{cur.meta}</div>
      </div>
    </div>
  );
}
