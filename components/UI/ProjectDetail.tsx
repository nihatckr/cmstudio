'use client';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@prisma/client';
import { archSVGString } from '@/components/UI/ArchSVG';
import { Lightbox, type LightboxImage } from '@/components/UI/Lightbox';

interface Props { project: Project; idx: number; total: number; onClose: () => void; }

export function ProjectDetail({ project: p, idx, total, onClose }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [lbImages, setLbImages] = useState<LightboxImage[] | null>(null);
  const [lbStart, setLbStart] = useState(0);

  // Wheel → horizontal scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onWheel = (e: WheelEvent) => {
      if (track.scrollWidth <= track.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 0;
      const atEnd = track.scrollLeft >= max - 1;
      if ((atStart && e.deltaY < 0) || (atEnd && e.deltaY > 0)) return;
      track.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    track.addEventListener('wheel', onWheel, { passive: false });
    return () => track.removeEventListener('wheel', onWheel);
  }, []);

  // Progress bar
  useEffect(() => {
    const track = trackRef.current;
    const bar = progressRef.current;
    if (!track || !bar) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      bar.style.width = max > 0 ? `${(track.scrollLeft / max) * 100}%` : '0%';
    };
    track.addEventListener('scroll', update);
    return () => track.removeEventListener('scroll', update);
  }, []);

  const slides = [
    { type: 'image', caption: `01 · ${p.title}`, kind: 'cover', width: 'pdb-w-wide' },
    { type: 'text',  eyebrow: 'Concept', body: `${p.title} responds to its setting through carefully calibrated proportions, material restraint, and a deep reading of local context.`, width: 'pdb-w-text' },
    { type: 'image', caption: '02 · Site aerial', kind: 'aerial', width: 'pdb-w-med' },
    { type: 'image', caption: '03 · Ground floor plan', kind: 'plan', width: 'pdb-w-wide' },
    { type: 'meta',  width: 'pdb-w-meta' },
    { type: 'image', caption: '04 · Longitudinal section', kind: 'section', width: 'pdb-w-wide' },
    { type: 'text',  eyebrow: 'Materiality', body: 'Local stone, brushed concrete and weathered timber define the palette. Surfaces are honed rather than polished, allowing the buildings to settle into their context with age and weather.', width: 'pdb-w-text' },
    { type: 'image', caption: '05 · West façade', kind: 'elevation', width: 'pdb-w-wide' },
    { type: 'image', caption: '06 · Lobby', kind: 'interior', width: 'pdb-w-med' },
    { type: 'end',   width: 'pdb-w-meta' },
  ];

  const imageSlides = slides.filter(s => s.type === 'image');

  const openLightbox = (clickedIdx: number) => {
    const imgs: LightboxImage[] = imageSlides.map((s) => ({
      svg: archSVGString(p.hue, s.kind),
      caption: s.caption ?? '',
      meta: `${p.code} · ${p.title}`,
    }));
    setLbImages(imgs);
    setLbStart(clickedIdx);
  };

  return (
    <>
    <div className="pe-detail" style={{ height: `calc(90vh - var(--bar-h) - 36px)` }}>
      <div className="pe-detail-grid" ref={trackRef}>

        {/* Title block — first slide */}
        <div className="pdb pdb-titleblock">
          <div>
            <div className="pdb-tb-eyebrow">{String(idx + 1).padStart(2,'0')} / {String(total).padStart(2,'0')} · {p.typology}</div>
            <div className="pdb-tb-title">{p.title}</div>
            <div className="pdb-tb-loc">{p.location}</div>
          </div>
          <div className="pdb-tb-meta">
            {[['Client', p.client], ['Typology', p.typology], ['Size', p.size], ['Status', p.status], ['Year', p.year]].map(([k, v]) => (
              <div className="pdb-tb-row" key={k}><span className="pdb-tb-k">{k}</span><span className="pdb-tb-v">{v}</span></div>
            ))}
          </div>
        </div>

        {/* Dynamic slides */}
        {slides.map((s, i) => {
          if (s.type === 'image') {
            const imgIdx = imageSlides.indexOf(s);
            return (
            <div key={i} className={`pdb pdb-image ${s.width}`} onClick={() => openLightbox(imgIdx)}>
              <div dangerouslySetInnerHTML={{ __html: archSVGString(p.hue, s.kind) }} />
              <div className="pdb-caption">{s.caption}</div>
            </div>
            );
          }
          if (s.type === 'text') return (
            <div key={i} className={`pdb pdb-text ${s.width}`}>
              <div className="pdb-text-eyebrow">{s.eyebrow}</div>
              <div className="pdb-text-body">{s.body}</div>
            </div>
          );
          if (s.type === 'meta') return (
            <div key={i} className={`pdb pdb-meta ${s.width}`}>
              {[['Client', p.client], ['Typology', p.typology], ['Size', p.size], ['Status', p.status], ['Year', p.year], ['Location', p.location]].map(([k, v]) => (
                <div className="pdb-meta-row" key={k}><span className="pdb-meta-k">{k}</span><span className="pdb-meta-v">{v}</span></div>
              ))}
            </div>
          );
          if (s.type === 'end') return (
            <div key={i} className={`pdb pdb-end ${s.width}`}>
              <div>
                <div className="pdb-end-eyebrow">END</div>
                <div className="pdb-end-title">{p.title}</div>
                <div className="pdb-end-eyebrow" style={{ opacity: 0.6 }}>{p.location} · {p.year}</div>
              </div>
              <div className="pdb-end-actions">
                <span className="pdb-end-link" onClick={onClose}>CLOSE ✕</span>
              </div>
            </div>
          );
          return null;
        })}
      </div>

      <div className="pe-detail-progress">
        <div className="pe-detail-progress-bar" ref={progressRef} />
      </div>
    </div>

    {lbImages && (
      <Lightbox
        images={lbImages}
        startIndex={lbStart}
        onClose={() => setLbImages(null)}
      />
    )}
    </>
  );
}
