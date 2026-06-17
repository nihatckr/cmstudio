import type { Metadata } from 'next';
import { getTeamMembers, getSiteMetadata } from '@/lib/actions';

export async function generateMetadata(): Promise<Metadata> {
  const siteMetadata = await getSiteMetadata();
  
  return {
    title: 'People',
    description: 'Meet the 18-person team behind City Marin Studio. Architects, interior designers, structural engineers, and sustainability specialists. Based in Istanbul, working globally.',
    openGraph: {
      title: 'People — City Marin Studio',
      description: 'Meet our 18-person team of architects, designers, and sustainability specialists.',
      url: `${siteMetadata?.siteUrl}/people`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'People — City Marin Studio',
      description: 'Meet our 18-person team of architects, designers, and sustainability specialists.',
    },
  };
}

export default async function PeoplePage() {
  const members = await getTeamMembers();
  
  // Group members by section
  const sections = members.reduce((acc, member) => {
    if (!acc[member.sectionName]) {
      acc[member.sectionName] = [];
    }
    acc[member.sectionName].push(member);
    return acc;
  }, {} as Record<string, typeof members>);

  const totalCount = members.length;

  return (
    <div className="people-page">
      <div className="people-header">
        <div className="ph-eyebrow">The studio · {totalCount} people</div>
        <h1 className="people-h1">People</h1>
        <div className="ph-lede">Architects, interior designers, engineers and sustainability specialists who care deeply about craft and the people who will live with the spaces we make.</div>
      </div>

      {/* Team sections */}
      {Object.entries(sections).map(([sectionName, sectionMembers]) => (
        <div className="team-section" key={sectionName}>
          <div className="ts-head">
            <div className="ts-eyebrow">{sectionName}</div>
            <div className="ts-count">{sectionMembers.length}</div>
          </div>
          <div className="team-grid">
            {sectionMembers.map((m) => (
              <div className="team-member" key={m.id}>
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
