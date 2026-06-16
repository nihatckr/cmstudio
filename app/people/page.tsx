import type { Metadata } from 'next';
import { teams, siteMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: 'People',
  description: 'Meet the 18-person team behind City Marin Studio. Architects, interior designers, structural engineers, and sustainability specialists. Based in Istanbul, working globally.',
  openGraph: {
    title: 'People — City Marin Studio',
    description: 'Meet our 18-person team of architects, designers, and sustainability specialists.',
    url: `${siteMetadata.siteUrl}/people`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'People — City Marin Studio',
    description: 'Meet our 18-person team of architects, designers, and sustainability specialists.',
  },
};

export default function PeoplePage() {
  return (
    <div className="people-page">
      <div className="people-header">
        <div className="ph-eyebrow">The studio · 18 people</div>
        <h1 className="people-h1">People</h1>
        <div className="ph-lede">Architects, interior designers, engineers and sustainability specialists who care deeply about craft and the people who will live with the spaces we make.</div>
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
                <div 
                  className="tm-avatar" 
                  style={{ '--tm-h': m.hue } as React.CSSProperties & { '--tm-h': number }}
                />
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
