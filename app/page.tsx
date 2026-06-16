'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { projects, subfilters, homepageMeta } from '@/lib/data';
import { ArchSVG } from '@/components/UI/ArchSVG';
import ProjectImage from '@/components/UI/ProjectImage';
import { StaggerList } from '@/components/animations/StaggerList';

// Lazy load ProjectDetail - only loads when a project is opened
const ProjectDetail = dynamic(() => import('@/components/UI/ProjectDetail').then(mod => ({ default: mod.ProjectDetail })), {
  ssr: false,
});

type Filter = 'all' | 'hospitality' | 'residential' | 'commercial';
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = useMemo(() => projects.filter(p => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  }), [activeFilter]);

  const currentSubfilters = activeFilter !== 'all'
    ? subfilters[activeFilter] : null;

  const handleFilter = (f: Filter) => {
    setActiveFilter(f);
    setActiveSubItem(null);
    setOpenIdx(null);
  };

  const toggleProject = (origIdx: number) => {
    setOpenIdx(prev => prev === origIdx ? null : origIdx);
    setTimeout(() => {
      const el = document.querySelector<HTMLElement>(`[data-idx="${origIdx}"]`);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
    }, 80);
  };

  const navProject = (dir: 1 | -1) => {
    if (openIdx === null) return;
    const cur = filtered.findIndex(p => projects.indexOf(p) === openIdx);
    if (cur === -1) return;
    const next = cur + dir;
    if (next < 0 || next >= filtered.length) return;
    toggleProject(projects.indexOf(filtered[next]));
  };

  const total = filtered.length;
  const openProject = openIdx !== null ? projects[openIdx] : null;
  const openPosInFiltered = openProject ? filtered.findIndex(p => p.code === openProject.code) : -1;

  return (
    <div id="page-projects">
      {/* Visually hidden h1 for SEO and screen readers */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        City Marin Studio — Architecture & Design Portfolio
      </h1>

      {/* Project mini-header — appears when a project is open */}
      <div className={`project-mini-header${openProject ? ' show' : ''}`}>
        <div className="pmh-left">
          <span className="pmh-num">
            {openPosInFiltered >= 0
              ? `${String(openPosInFiltered + 1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`
              : ''}
          </span>
          <span className="pmh-title">{openProject?.title ?? '—'}</span>
          <span className="pmh-loc">{openProject?.location ?? '—'}</span>
        </div>
        <div className="pmh-right">
          <span
            className="pmh-nav"
            onClick={() => navProject(-1)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navProject(-1); } }}
            role="button"
            tabIndex={openPosInFiltered <= 0 ? -1 : 0}
            aria-label="Previous project"
            aria-disabled={openPosInFiltered <= 0}
            style={{ opacity: openPosInFiltered <= 0 ? 0.25 : undefined, pointerEvents: openPosInFiltered <= 0 ? 'none' : undefined }}
          >
            ← PREV PROJECT
          </span>
          <span
            className="pmh-nav"
            onClick={() => navProject(1)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navProject(1); } }}
            role="button"
            tabIndex={openPosInFiltered >= total - 1 ? -1 : 0}
            aria-label="Next project"
            aria-disabled={openPosInFiltered >= total - 1}
            style={{ opacity: openPosInFiltered >= total - 1 ? 0.25 : undefined, pointerEvents: openPosInFiltered >= total - 1 ? 'none' : undefined }}
          >
            NEXT PROJECT →
          </span>
          <span 
            className="pmh-close" 
            onClick={() => setOpenIdx(null)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenIdx(null); } }}
            role="button"
            tabIndex={0}
            aria-label="Close project"
          >
            CLOSE <span className="pmh-close-x" />
          </span>
        </div>
      </div>
      {/* Sub-bar */}
      {currentSubfilters && (
        <div className="sub-bar open" style={{ position:'fixed', top:'var(--bar-h)', left:0, right:0, zIndex:9997 }}>
          {currentSubfilters.map(sub => (
            <div 
              key={sub} 
              className={`sub-item${activeSubItem === sub ? ' active' : ''}`}
              onClick={() => setActiveSubItem(sub)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveSubItem(sub); } }}
              role="button"
              tabIndex={0}
              aria-label={`Filter by ${sub}`}
            >
              {sub}
            </div>
          ))}
        </div>
      )}

      {/* Project list */}
      <div className="project-list" style={currentSubfilters ? { paddingTop:'calc(var(--bar-h) + 38px)' } : {}}>

        {filtered.length === 0 ? (
          <div className="projects-empty">
            <div className="pe-empty-mark">✦</div>
            <div className="pe-empty-title">{homepageMeta.emptyTitle}</div>
            <div className="pe-empty-desc">{homepageMeta.emptyDesc}</div>
            <div className="pe-empty-cta" onClick={() => handleFilter('all')} role="button">{homepageMeta.emptyCTA}</div>
          </div>
        ) : (
          <StaggerList stagger={0.08} y={20}>
          {filtered.map((p, i) => {
            const origIdx = projects.indexOf(p);
            const isOpen = openIdx === origIdx;
            return (
              <div
                key={p.code}
                className={`project-entry${isOpen ? ' open' : ''}`}
                data-idx={origIdx}
                data-type={p.type}
              >
                {/* Closed row */}
                <div className="pe-row" onClick={() => toggleProject(origIdx)} style={{ cursor:'pointer' }}>
                  <div className="pe-meta-col">
                    <div className="pe-logo-row">
                      <div className="pe-logo">
                        <svg viewBox="0 0 236.89 111.58" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="97.63 55.79 97.63 111.58 125.53 111.58 125.53 27.9 97.63 55.79"/>
                          <polygon points="236.88 0 208.98 0 181.32 27.67 181.32 0 153.42 0 125.53 27.9 153.42 27.9 153.42 111.58 181.32 111.58 181.32 27.9 208.99 27.9 208.99 111.58 236.88 83.68 236.89 0"/>
                          <polygon points="27.9 83.68 55.79 111.58 83.68 111.58 83.68 83.68 27.9 83.68"/>
                          <polygon points="83.68 0 55.79 0 27.9 27.9 83.68 27.9 83.68 0"/>
                          <polygon points="27.9 27.9 0 55.79 0 83.68 27.9 83.68 27.9 27.9"/>
                        </svg>
                      </div>
                      <div className="pe-index">{String(i+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
                    </div>
                    <div className="pe-text-block">
                      <div className="pe-title">
                        <Link href={`/projects/${p.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {p.title}
                        </Link>
                      </div>
                      <div className="pe-subtitle">{p.location} · {p.typology} · {p.year}</div>
                    </div>
                    <div className="pe-bottom">
                      <span>{p.client}</span>
                      <span className="pe-toggle"><span>{isOpen ? homepageMeta.toggleOpen : homepageMeta.toggleClosed}</span><span className="pe-toggle-icon"/></span>
                    </div>
                  </div>
                  <div className="pe-cover">
                    {p.images && p.images.length > 0 ? (
                      <ProjectImage 
                        images={p.images} 
                        title={p.title} 
                        hue={p.hue} 
                        featured={p.featured}
                        className="pe-cover-image"
                      />
                    ) : (
                      <ArchSVG hue={p.hue} label={p.code} />
                    )}
                  </div>
                </div>

                {/* Detail gallery — horizontal scroll */}
                {isOpen && (
                  <ProjectDetail
                    project={p}
                    idx={origIdx}
                    total={projects.length}
                    onClose={() => setOpenIdx(null)}
                  />
                )}
              </div>
            );
          })}
          </StaggerList>
        )}
      </div>

      {/* Project detail modal */}
      {openIdx !== null && (
        <ProjectDetail 
          project={projects[openIdx]} 
          idx={openIdx}
          total={projects.length}
          onClose={() => setOpenIdx(null)} 
        />
      )}
    </div>
  );
}
