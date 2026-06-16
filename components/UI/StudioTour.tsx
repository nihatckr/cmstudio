'use client';

/**
 * StudioTour — 360° studio placeholder
 * Click toggles 'playing' class — CSS handles scale + overlay fade.
 * From /design/design_handoff_citymarin_site/index.html .studio-tour
 */
export function StudioTour() {
  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('playing');
  };

  return (
    <div className="studio-tour" onClick={handleToggle}>
      <svg
        className="st-bg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <rect className="st-bg-base" width="1440" height="720"/>
        <line className="st-grid-line" x1="160"  y1="0"   x2="160"  y2="720"/>
        <line className="st-grid-line" x1="400"  y1="0"   x2="400"  y2="720"/>
        <line className="st-grid-line st-grid-center" x1="720"  y1="0"   x2="720"  y2="720"/>
        <line className="st-grid-line" x1="1040" y1="0"   x2="1040" y2="720"/>
        <line className="st-grid-line" x1="1280" y1="0"   x2="1280" y2="720"/>
        <line className="st-grid-line" x1="0"    y1="240" x2="1440" y2="240"/>
        <line className="st-grid-line" x1="0"    y1="480" x2="1440" y2="480"/>
        {/* perspective room */}
        <polygon className="st-room-outline" points="480,160 960,160 1120,560 320,560"/>
        <polygon className="st-room-wall" points="480,160 320,560 0,640 0,120"/>
        <polygon className="st-room-wall" points="960,160 1120,560 1440,640 1440,120"/>
        <line className="st-room-divider" x1="720" y1="160" x2="720" y2="560"/>
      </svg>

      <div className="st-overlay">
        <div className="st-eyebrow">Istanbul Studio</div>
        <div className="st-title">Step inside our space</div>
        <button
          className="st-play"
          aria-label="Play 360 tour"
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
            <circle className="st-play-ring" cx="32" cy="32" r="31"/>
            <path className="st-play-icon" d="M26 22 L44 32 L26 42 Z"/>
          </svg>
        </button>
        <div className="st-hint">360° virtual tour · Cevizli, Istanbul</div>
      </div>

      <div className="st-badge">
        <span className="st-badge-dot"></span>360°
      </div>
    </div>
  );
}
