import type { Metadata } from 'next';
import { 
  aboutValues, aboutStats, processSteps,
  studioBio, aboutHero, aboutSectionMeta
} from '@/lib/data';
import { StudioTour } from '@/components/UI/StudioTour';
export const metadata: Metadata = { title: 'About — City Marin Studio' };

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <svg style={{position:'absolute',inset:'-12% 0',width:'100%',height:'124%',willChange:'transform'}} viewBox="0 0 1440 680" preserveAspectRatio="xMidYMid slice">
          <rect width="1440" height="680" fill="#111"/>
          {[120,240,360,480,600,720,840,960,1080,1200,1320].map(x=><line key={x} x1={x} y1="0" x2={x} y2="680" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)}
          {[97,194,291,388,485,582].map(y=><line key={y} x1="0" y1={y} x2="1440" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>)}
          <line x1="576" y1="0" x2="1296" y2="680" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        </svg>
        <div className="about-hero-text">
          {aboutHero.heading.split(/\\|<br\/>/g).map((part, i) => (
            <span key={i}>
              {part === '<em>&</em>' ? <em>&amp;</em> : part}
              {i < aboutHero.heading.split(/\\|<br\/>/g).length - 1 && <br/>}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="about-body-section">
        <div className="about-col"><div className="about-col-label">Studio</div>{studioBio.studio}</div>
        <div className="about-col"><div className="about-col-label">Approach</div>{studioBio.approach}</div>
      </div>

      {/* Values */}
      <div className="about-values">
        {aboutValues.map(v => (
          <div className="value-col" key={v.label}>
            <div className="value-label">{v.label}</div>
            <div className="value-text">{v.text}</div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="about-stats">
        {aboutStats.map(s=>(
          <div className="ast-col" key={s.label}><div className="ast-num">{s.num}</div><div className="ast-label">{s.label}</div></div>
        ))}
      </div> 
      {/* 360° Studio tour */}
      <StudioTour />
 

      {/* Process */}
      <div className="about-process">
        <div className="ap-head">
          <div className="ap-eyebrow">{aboutSectionMeta.process.eyebrow}</div>
          <h2 className="ap-title">{aboutSectionMeta.process.title}</h2>
        </div>
        <div className="ap-track">
          {processSteps.map(s=>(
            <div className="ap-step" key={s.num}>
              <div className="ap-num">{s.num}</div>
              <div className="ap-marker"></div>
              <div className="ap-name">{s.name}</div>
              <div className="ap-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
 
    </div>
  );
}
