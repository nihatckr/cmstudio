'use client';
import { useState, useEffect, useMemo } from 'react';
import { projects, searchMeta } from '@/lib/data';

/** Search overlay — matches index.html .search-overlay + toggleSearch() */
export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 52000]);

  // Cmd+K / Ctrl+K shortcut + custom event from Header search-wrap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
        setSelectedTags([]);
        setSelectedCity('');
        setAreaRange([0, 52000]);
      }
    };
    const handleSearchOpen = () => setOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('cms:search-open', handleSearchOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('cms:search-open', handleSearchOpen);
    };
  }, []);

  // Auto-focus on open
  useEffect(() => {
    if (open) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 80);
    }
  }, [open]);

  // Extract unique tags and cities
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const allCities = useMemo(() => {
    const cities = new Set<string>();
    projects.forEach(p => cities.add(p.city));
    return Array.from(cities).sort();
  }, []);

  // Advanced filtering logic
  const matched = useMemo(() => {
    return projects.filter(p => {
      // Text search
      const textMatch = !query.trim() || 
        [p.title, p.location, p.typology, p.code, p.client, p.type]
          .some(s => s.toLowerCase().includes(query.toLowerCase()));
      
      // Tag filter
      const tagMatch = selectedTags.length === 0 || 
        selectedTags.some(tag => p.tags.includes(tag));
      
      // City filter
      const cityMatch = !selectedCity || p.city === selectedCity;
      
      // Area filter
      const areaMatch = p.area >= areaRange[0] && p.area <= areaRange[1];
      
      return textMatch && tagMatch && cityMatch && areaMatch;
    });
  }, [query, selectedTags, selectedCity, areaRange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedTags([]);
    setSelectedCity('');
    setAreaRange([0, 52000]);
  };

  const hasActiveFilters = query.trim() || selectedTags.length > 0 || 
    selectedCity || areaRange[0] > 0 || areaRange[1] < 52000;

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
              aria-label="Search projects"
            />
          </div>
          <div 
            className="search-close" 
            onClick={() => { setOpen(false); clearFilters(); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(false); clearFilters(); } }}
            role="button"
            tabIndex={0}
            aria-label="Close search"
          >
            {searchMeta.closeLabel} <span className="pmh-close-x" />
          </div>
        </div>

        {/* Filter Panel */}
        <div className="search-filters">
          {/* Tags */}
          <div className="search-filter-group">
            <div className="search-filter-label">Tags</div>
            <div className="search-filter-tags">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`search-tag-chip${selectedTags.includes(tag) ? ' active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* City */}
          <div className="search-filter-group">
            <div className="search-filter-label">City</div>
            <select 
              value={selectedCity} 
              onChange={e => setSelectedCity(e.target.value)}
              className="search-filter-select"
            >
              <option value="">All Cities</option>
              {allCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Area Range */}
          <div className="search-filter-group">
            <div className="search-filter-label">
              Area: {areaRange[0].toLocaleString()} - {areaRange[1].toLocaleString()} m²
            </div>
            <div className="search-filter-range">
              <input
                type="range"
                min="0"
                max="52000"
                step="1000"
                value={areaRange[0]}
                onChange={e => setAreaRange([Math.min(+e.target.value, areaRange[1]), areaRange[1]])}
                className="search-range-input"
              />
              <input
                type="range"
                min="0"
                max="52000"
                step="1000"
                value={areaRange[1]}
                onChange={e => setAreaRange([areaRange[0], Math.max(+e.target.value, areaRange[0])])}
                className="search-range-input"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button onClick={clearFilters} className="search-clear-filters">
              Clear All Filters
            </button>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="search-active-chips">
            {query.trim() && (
              <div className="search-chip">
                Text: &ldquo;{query}&rdquo;
                <button 
                  onClick={() => setQuery('')} 
                  className="search-chip-close"
                  aria-label="Clear search text"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            {selectedTags.map(tag => (
              <div key={tag} className="search-chip">
                Tag: {tag}
                <button 
                  onClick={() => toggleTag(tag)} 
                  className="search-chip-close"
                  aria-label={`Remove tag: ${tag}`}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            ))}
            {selectedCity && (
              <div className="search-chip">
                City: {selectedCity}
                <button 
                  onClick={() => setSelectedCity('')} 
                  className="search-chip-close"
                  aria-label={`Remove city filter: ${selectedCity}`}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            {(areaRange[0] > 0 || areaRange[1] < 52000) && (
              <div className="search-chip">
                Area: {areaRange[0].toLocaleString()}-{areaRange[1].toLocaleString()} m²
                <button 
                  onClick={() => setAreaRange([0, 52000])} 
                  className="search-chip-close"
                  aria-label="Clear area range filter"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div className="search-results">
          <div className="search-results-head">
            {hasActiveFilters
              ? `${matched.length} ${searchMeta.ofLabel} ${projects.length} ${searchMeta.projectsLabel} · Filtered`
              : `${searchMeta.startTyping} · All ${projects.length} ${searchMeta.projectsLabel}`}
          </div>
          <div>
            {matched.map(p => (
              <div
                key={p.code}
                className="search-result"
                onClick={() => { setOpen(false); clearFilters(); }}
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
                <div className="sr-area">{p.area.toLocaleString()} m²</div>
              </div>
            ))}
            {matched.length === 0 && (
              <div className="sr-empty">No matching projects found. Try adjusting your filters.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
