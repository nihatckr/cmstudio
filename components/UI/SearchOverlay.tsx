'use client';
import { useState, useEffect } from 'react';
import { projects, searchMeta } from '@/lib/data';

/** Search overlay — matches index.html .search-overlay + toggleSearch() */
export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Cmd+K / Ctrl+K shortcut + custom event from Header search-wrap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('cms:search-open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('cms:search-open', onOpen);
    };
  }, []);

  // Auto-focus on open
  useEffect(() => {
    if (open) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 80);
    }
  }, [open]);

  const matched = query.trim()
    ? projects.filter(p =>
        [p.title, p.location, p.typology, p.code, p.client, p.type]
          .some(s => s.toLowerCase().includes(query.toLowerCase()))
      )
    : projects;

  const highlight = (text: string) => {
    if (!query.trim()) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
    return text.replace(re, '<mark class="sr-hl">$1</mark>');
  };

  return (
    <>
      {/* Search trigger — shown in Header via search-wrap but also keyboard */}
      <div
        className={`search-overlay${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        <div className="search-head">
          <div className="search-input-row">
            <svg width="20" height="20" viewBox="0 0 13 13" fill="none">
              <circle cx="7.5" cy="5.5" r="4.5" stroke="currentColor"/>
              <path d="M4 9L1 12" stroke="currentColor"/>
            </svg>
            <input
              id="searchInput"
              type="text"
              placeholder={searchMeta.placeholder}
              autoComplete="off"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="search-close" onClick={() => { setOpen(false); setQuery(''); }} role="button">
            {searchMeta.closeLabel} <span className="pmh-close-x" />
          </div>
        </div>

        <div className="search-results">
          <div className="search-results-head">
            {query
              ? `${matched.length} ${searchMeta.ofLabel} ${projects.length} ${searchMeta.projectsLabel} · "${query}"`
              : `${searchMeta.startTyping} · All ${projects.length} ${searchMeta.projectsLabel}`}
          </div>
          <div>
            {matched.map(p => (
              <div
                key={p.code}
                className="search-result"
                onClick={() => { setOpen(false); setQuery(''); }}
              >
                <div className="sr-code">{p.code}</div>
                <div
                  className="sr-title"
                  dangerouslySetInnerHTML={{ __html: highlight(p.title) }}
                />
                <div
                  className="sr-loc"
                  dangerouslySetInnerHTML={{ __html: highlight(p.location) }}
                />
                <div className="sr-tag">{p.typology}</div>
              </div>
            ))}
            {matched.length === 0 && (
              <div className="sr-empty">No matching projects.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
