import type { Metadata } from 'next';
import { sustainabilityPrinciples, sustainabilityStats, certifications, sustainabilityMeta } from '@/lib/data';
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

      {/* Featured initiative */}
      <div className="sustain-featured">
        <div className="sf-image" style={{position:'relative',overflow:'hidden',height:'60vw',maxHeight:620}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}}>
            <rect width="900" height="620" fill="hsl(140,8%,88%)"/>
            <rect x="0" y="310" width="900" height="310" fill="hsl(140,8%,80%)" opacity="0.5"/>
            <text x="32" y="595" fontFamily="Helvetica Neue,Arial,sans-serif" fontSize="11" letterSpacing="3" fill="hsla(140,12%,38%,0.45)">{sustainabilityMeta.featuredSVGLabel}</text>
          </svg>
        </div>
        <div className="sf-text">
          <div className="sf-eyebrow">{sustainabilityMeta.featuredInitiativeEyebrow}</div>
          <div className="sf-title">{sustainabilityMeta.featuredInitiativeTitle}</div>
          <div className="sf-body">{sustainabilityMeta.featuredInitiativeBody}</div>
          <div className="sf-metrics">
            {sustainabilityMeta.featuredMetrics.map((metric, i) => (
              <div className="sf-metric" key={i}><span className="sf-metric-num">{metric.num}</span><span className="sf-metric-k">{metric.label}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="sustain-certs">
        <div className="sc-eyebrow">Certifications &amp; frameworks we work with</div>
        <div className="sc-grid">
          {certifications.map(c => (
            <div className="sc-cell" key={c.label}>
              <div className="sc-label">{c.label}</div>
              <div className="sc-meta">{c.meta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment statement */}
      <div className="sustain-commit">
        <div className="sc-mark" />
        <div className="sc-text">By 2030, every new project leaving the studio will be designed for <em>operational net-zero</em>, with embodied carbon measured from the first sketch and reduced project by project. That is the bar we hold ourselves to.</div>
      </div>
    </div>
  );
}
