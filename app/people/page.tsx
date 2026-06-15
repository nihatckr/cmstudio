import type { Metadata } from 'next';
import { teams, founderQuote } from '@/lib/data';
export const metadata: Metadata = { title: 'People — City Marin Studio' };

type WithCustomProperty = React.CSSProperties & { '--tm-h': number };

export default function PeoplePage() {
  return (
    <div className="people-page">
      <div className="people-header">
        <div className="ph-eyebrow">The studio · 18 people</div>
        <h1 className="people-h1">People</h1>
        <div className="ph-lede">Architects, interior designers, engineers and sustainability specialists who care deeply about craft and the people who will live with the spaces we make.</div>
      </div>

      {/* Founder block */}
      <div className="founder-block">
        <div className="fb-image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%',display:'block'}}>
            <rect width="600" height="720" fill="#1a1a1a"/>
            <line x1="100" y1="0" x2="100" y2="720" stroke="rgba(255,255,255,0.06)"/>
            <line x1="300" y1="0" x2="300" y2="720" stroke="rgba(255,255,255,0.06)"/>
            <line x1="500" y1="0" x2="500" y2="720" stroke="rgba(255,255,255,0.06)"/>
            <line x1="0" y1="240" x2="600" y2="240" stroke="rgba(255,255,255,0.06)"/>
            <line x1="0" y1="480" x2="600" y2="480" stroke="rgba(255,255,255,0.06)"/>
            <ellipse cx="300" cy="280" rx="100" ry="120" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
            <text x="40" y="690" fontFamily="Helvetica Neue,Arial,sans-serif" fontSize="10" letterSpacing="3" fill="rgba(255,255,255,0.4)">PORTRAIT · MARIN CAKIR</text>
          </svg>
        </div>
        <div className="fb-text">
          <div className="fb-eyebrow">Founder</div>
          <div className="fb-name">Marin Cakir</div>
          <div className="fb-role">Founder &amp; Principal Architect</div>
          <div className="fb-bio">Marin founded City Marin Studio with a vision for architecture that responds deeply to place and culture. Over fourteen years of practice, he has led the studio&apos;s growth across Turkey, the UAE, and the Mediterranean, while remaining personally involved in every project&apos;s design.</div>
          <div className="fb-meta">
            <div className="fb-meta-row"><span className="fb-k">Based in</span><span className="fb-v">{founderQuote.basedIn}</span></div>
            <div className="fb-meta-row"><span className="fb-k">Education</span><span className="fb-v">{founderQuote.education}</span></div>
            <div className="fb-meta-row"><span className="fb-k">Joined</span><span className="fb-v">{founderQuote.joined}</span></div>
          </div>
        </div>
      </div>

      {/* Team sections */}
      {teams.map((team) => (
        <div className="team-section" key={team.section}>
          <div className="ts-head">
            <div className="ts-eyebrow">{team.section}</div>
            <div className="ts-count">{team.count}</div>
          </div>
          <div className="team-grid">
            {team.members.map((m, i) => (
              <div className="team-member" key={i}>
                <div className="tm-avatar" style={{ '--tm-h': m.hue } as WithCustomProperty} />
                <div className="tm-name">{m.name}</div>
                <div className="tm-role">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
