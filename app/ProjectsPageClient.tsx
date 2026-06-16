'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { projects, subfilters } from '@/lib/data';
import ProjectImage from '@/components/UI/ProjectImage';
import { StaggerList } from '@/components/animations/StaggerList';

// Lazy load ProjectDetail - only loads when a project is opened
const ProjectDetail = dynamic(() => import('@/components/UI/ProjectDetail').then(mod => ({ default: mod.ProjectDetail })), {
  ssr: false,
});

type Filter = 'all' | 'hospitality' | 'residential' | 'commercial';
export default function ProjectsPageClient() {
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

  const openProject = openIdx !== null ? projects[openIdx] : null;

  return (
    <div id="page-projects">
      {/* Visually hidden h1 for SEO and screen readers */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        City Marin Studio — Architecture & Design Portfolio
      </h1>

      {/* Filter bar */}
      <div className="filter-bar">
        <button
          className={`fb-pill${activeFilter === 'all' ? ' active' : ''}`}
          onClick={() => handleFilter('all')}
        >
          All<span className="fb-count">{projects.length}</span>
        </button>
        <button
          className={`fb-pill${activeFilter === 'hospitality' ? ' active' : ''}`}
          onClick={() => handleFilter('hospitality')}
        >
          Hospitality<span className="fb-count">{projects.filter(p => p.type === 'hospitality').length}</span>
        </button>
        <button
          className={`fb-pill${activeFilter === 'residential' ? ' active' : ''}`}
          onClick={() => handleFilter('residential')}
        >
          Residential<span className="fb-count">{projects.filter(p => p.type === 'residential').length}</span>
        </button>
        <button
          className={`fb-pill${activeFilter === 'commercial' ? ' active' : ''}`}
          onClick={() => handleFilter('commercial')}
        >
          Commercial<span className="fb-count">{projects.filter(p => p.type === 'commercial').length}</span>
        </button>
      </div>

      {/* Subfilter bar (visible when filter !== 'all') */}
      {currentSubfilters && (
        <div className="subfilter-bar">
          {currentSubfilters.map(sub => (
            <button
              key={sub}
              className={`sfb-item${activeSubItem === sub ? ' active' : ''}`}
              onClick={() => setActiveSubItem(prev => prev === sub ? null : sub)}
            >
              {sub}<span className="sfb-icon">{activeSubItem === sub ? '×' : '+'}</span>
            </button>
          ))}
        </div>
      )}

      {/* Projects grid */}
      <StaggerList className="projects-grid">
        {filtered.map((p, relIdx) => {
          const origIdx = projects.indexOf(p);
          const isOpen = origIdx === openIdx;
          return (
            <div
              className={`project-card${isOpen ? ' open' : ''}`}
              key={p.code}
              data-idx={origIdx}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="project-card-link"
                onClick={(e) => {
                  e.preventDefault();
                  toggleProject(origIdx);
                }}
              >
                <ProjectImage
                  images={p.images}
                  title={p.title}
                  hue={p.hue}
                  featured={relIdx === 0}
                  typology={p.typology}
                  location={p.location}
                />
                <div className="project-info">
                  <span className="project-num">{String(relIdx + 1).padStart(2, '0')}</span>
                  <span className="project-title">{p.title}</span>
                  <span className="project-loc">{p.location}</span>
                </div>
              </Link>
              {isOpen && openProject && (
                <ProjectDetail 
                  project={openProject} 
                  idx={origIdx}
                  total={projects.length}
                  onClose={() => setOpenIdx(null)} 
                />
              )}
            </div>
          );
        })}
      </StaggerList>
    </div>
  );
}
