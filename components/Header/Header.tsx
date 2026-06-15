'use client';

import { useState } from 'react';
import Link from 'next/link';
import { headerFilters, headerSubfilters, headerLeftNav, headerRightNav, headerMeta } from '@/lib/data';

/**
 * Header — City Marin Studio
 * Birebir /design/design_handoff_citymarin_site/index.html
 *
 * Global class'ları kullanır: styles/components/_header.scss
 * CSS Module yok — design system'ın global class'ları geçerli.
 */

interface HeaderProps {
  filterCount?: number;
  savedCount?:  number;
  onFilterChange?: (value: string) => void;
}

export function Header({
  filterCount   = 13,
  savedCount    = 0,
  onFilterChange,
}: HeaderProps) {
  const [activeFilter,  setActiveFilter]  = useState('all');
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const [leftOpen,      setLeftOpen]      = useState(false);
  const [rightOpen,     setRightOpen]     = useState(false);

  const subItems = headerSubfilters[activeFilter] ?? null;

  const handleFilter = (value: string) => {
    setActiveFilter(value);
    setActiveSubItem(null);
    onFilterChange?.(value);
  };

  const closeAll = () => { setLeftOpen(false); setRightOpen(false); };

  return (
    <>
      {/* ── .main-menu ────────────────────────────────────── */}
      <nav className="main-menu">

        {/* .menu-bg */}
        <div className="menu-bg" />

        {/* .menu-row */}
        <div className="menu-row">

          {/* .menu-logo — hover=burger, is-open=X, click=left side-nav */}
          <div
            className={`menu-logo${leftOpen ? ' is-open' : ''}`}
            onClick={() => { setLeftOpen(v => !v); setRightOpen(false); }}
            role="button"
            aria-label={leftOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={leftOpen}
          >
            {/* .ml-mark — inline SVG so CSS fill works in nightshift */}
            <span className="ml-mark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236.89 111.58" aria-label="City Marin Studio">
                <polygon points="97.63 55.79 97.63 111.58 125.53 111.58 125.53 27.9 97.63 55.79"/>
                <polygon points="236.88 0 208.98 0 181.32 27.67 181.32 0 153.42 0 125.53 27.9 153.42 27.9 153.42 111.58 181.32 111.58 181.32 27.9 208.99 27.9 208.99 111.58 236.88 83.68 236.89 0"/>
                <polygon points="27.9 83.68 55.79 111.58 83.68 111.58 83.68 83.68 27.9 83.68"/>
                <polygon points="83.68 0 55.79 0 27.9 27.9 83.68 27.9 83.68 0"/>
                <polygon points="27.9 27.9 0 55.79 0 83.68 27.9 83.68 27.9 27.9"/>
              </svg>
            </span>

            {/* .ml-burger — 3 equal spans → X when is-open */}
            <span className="ml-burger" aria-hidden="true">
              <span /><span /><span />
            </span>
          </div>

          {/* .menu-nav — portfolio category filters (absolute center) */}
          <div className="menu-nav">
            {headerFilters.map((f) => (
              <div
                key={f.value}
                className={[
                  'mf-item',
                  activeFilter === f.value ? 'active' : '',
                  f.isSaved ? 'mf-saved-item' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleFilter(f.value)}
                role="button"
              >
                {f.label}
                {f.isSaved && (
                  <span className="mf-saved-badge">{savedCount}</span>
                )}
              </div>
            ))}
          </div>

          {/* .menu-contact — search + mobile burger */}
          <div className="menu-contact">
            <span
              className="search-wrap"
              onClick={() => window.dispatchEvent(new Event('cms:search-open'))}
              role="button"
              aria-label="Open search"
            >
              <span className="search-count">{filterCount}</span>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <circle cx="7.5" cy="5.5" r="4.5" stroke="currentColor" />
                <path d="M4 9L1 12" stroke="currentColor" />
              </svg>
            </span>

            {/* .ml-burger-right — mobile only, opens right side-nav */}
            <span
              className={`ml-burger-right${rightOpen ? ' is-open' : ''}`}
              onClick={() => { setRightOpen(v => !v); setLeftOpen(false); }}
              role="button"
              aria-label={rightOpen ? 'Close filters' : 'Open filters'}
            >
              <span /><span /><span />
            </span>
          </div>
        </div>

        {/* .sub-bar — height 0 → 38px */}
        <div className={`sub-bar${subItems ? ' open' : ''}`}>
          {subItems?.map((sub) => (
            <div
              key={sub}
              className={`sub-item${activeSubItem === sub ? ' active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setActiveSubItem(sub); }}
              role="button"
            >
              {sub}
            </div>
          ))}
        </div>
      </nav>

      {/* .side-nav-backdrop */}
      <div
        className={`side-nav-backdrop${(leftOpen || rightOpen) ? ' show' : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />

      {/* .side-nav.side-nav-left — page links */}
      <aside
        className={`side-nav side-nav-left${leftOpen ? ' open' : ''}`}
        aria-hidden={!leftOpen}
      >
        <div className="side-nav-header">
          <span className="side-nav-label">Menu</span>
          <span className="side-nav-close" onClick={() => setLeftOpen(false)} role="button">
            CLOSE <span className="pmh-close-x" />
          </span>
        </div>

        <div className="side-nav-links">
          {headerLeftNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`side-link${link.secondary ? ' side-link-secondary' : ''}`}
              onClick={() => setLeftOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="side-nav-foot">
          <div>{headerMeta.studioName}</div>
          <div>{headerMeta.studioLocation}</div>
        </div>
      </aside>

      {/* .side-nav.side-nav-right — portfolio filters (mobile) */}
      <aside
        className={`side-nav side-nav-right${rightOpen ? ' open' : ''}`}
        aria-hidden={!rightOpen}
      >
        <div className="side-nav-header">
          <span className="side-nav-label">Portfolio</span>
          <span className="side-nav-close" onClick={() => setRightOpen(false)} role="button">
            CLOSE <span className="pmh-close-x" />
          </span>
        </div>

        <div className="side-nav-links">
          {headerRightNav.map((cat) => (
            <div key={cat.value} className={cat.subItems.length ? 'side-cat' : ''}>
              <div
                className={`side-link side-mf${activeFilter === cat.value ? ' active' : ''}`}
                onClick={() => { handleFilter(cat.value); setRightOpen(false); }}
                role="button"
              >
                {cat.label}
              </div>

              {cat.subItems.length > 0 && (
                <div className="side-sub-list">
                  {cat.subItems.map((sub) => (
                    <div key={sub} className="side-sub-item" role="button">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="side-nav-foot">
          <div>{filterCount} {headerMeta.projectsLabel}</div>
        </div>
      </aside>
    </>
  );
}
