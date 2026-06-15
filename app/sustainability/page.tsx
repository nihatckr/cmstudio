import type { Metadata } from 'next';
import { sustainabilityPrinciples, sustainabilityStats, sustainabilityMeta } from '@/lib/data';
export const metadata: Metadata = { title: 'Sustainability — City Marin Studio' };

export default function SustainabilityPage() {
  return (
    <div className="sustain-page">
      <div className="sustain-hero">
        <div className="sh-eyebrow">{sustainabilityMeta.eyebrow}</div>
        <h1 className="sustain-h1">{sustainabilityMeta.title}</h1>
        <div className="sustain-intro-grid">
          <div className="sustain-intro-col">{sustainabilityMeta.intro1}</div>
          <div className="sustain-intro-col">{sustainabilityMeta.intro2}</div>
        </div>
      </div>

      {/* Principles */}
      <div className="sustain-principles">
        <div className="sp-head">
          <div className="sp-eyebrow">{sustainabilityMeta.principlesEyebrow}</div>
          <h2 className="sp-title">{sustainabilityMeta.principlesTitle}</h2>
        </div>
        <div className="sp-grid">
          {sustainabilityPrinciples.map(p => (
            <div className="sp-card" key={p.num}>
              <div className="sp-num">{p.num}</div>
              <div className="sp-name">{p.name}</div>
              <div className="sp-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sustain-stats">
        {sustainabilityStats.map(s => (
          <div className="stat-col" key={s.label}><div className="stat-num">{s.num}</div><div className="stat-label">{s.label}</div><div className="stat-desc">{s.desc}</div></div>
        ))}
      </div>
    </div>
  );
}
