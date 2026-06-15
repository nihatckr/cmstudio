'use client';

/**
 * StudioTour — 360° studio placeholder
 * Click toggles 'playing' class — CSS handles scale + overlay fade.
 * From /design/design_handoff_citymarin_site/index.html .studio-tour
 */
export function StudioTour() {
  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('playing');
  };

  return (
    <div className="studio-tour" onClick={toggle}>
      <svg
        className="st-bg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="1440" height="720" fill="#161616"/>
        <line x1="160"  y1="0"   x2="160"  y2="720" stroke="rgba(255,255,255,0.05)"/>
        <line x1="400"  y1="0"   x2="400"  y2="720" stroke="rgba(255,255,255,0.05)"/>
        <line x1="720"  y1="0"   x2="720"  y2="720" stroke="rgba(255,255,255,0.06)"/>
        <line x1="1040" y1="0"   x2="1040" y2="720" stroke="rgba(255,255,255,0.05)"/>
        <line x1="1280" y1="0"   x2="1280" y2="720" stroke="rgba(255,255,255,0.05)"/>
        <line x1="0"    y1="240" x2="1440" y2="240" stroke="rgba(255,255,255,0.05)"/>
        <line x1="0"    y1="480" x2="1440" y2="480" stroke="rgba(255,255,255,0.05)"/>
        {/* perspective room */}
        <polygon points="480,160 960,160 1120,560 320,560"   fill="none"                      stroke="rgba(255,255,255,0.14)"/>
        <polygon points="480,160 320,560 0,640 0,120"        fill="rgba(255,255,255,0.03)"    stroke="rgba(255,255,255,0.1)"/>
        <polygon points="960,160 1120,560 1440,640 1440,120" fill="rgba(255,255,255,0.03)"    stroke="rgba(255,255,255,0.1)"/>
        <line x1="720" y1="160" x2="720" y2="560" stroke="rgba(255,255,255,0.08)"/>
      </svg>

      <div className="st-overlay">
        <div className="st-eyebrow">Istanbul Studio</div>
        <div className="st-title">Step inside our space</div>
        <button
          className="st-play"
          aria-label="Play 360 tour"
          onClick={(e) => e.stopPropagation()}
        >
          <svg viewBox="0 0 64 64" width="64" height="64">
            <circle cx="32" cy="32" r="31" fill="none" stroke="rgba(255,255,255,0.5)"/>
            <path className="st-play-icon" d="M26 22 L44 32 L26 42 Z" fill="#fff"/>
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
