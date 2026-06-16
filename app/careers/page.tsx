import type { Metadata } from 'next';
import Link from 'next/link';
import { jobs, careersLocations, careersApplicationEmail, careersMeta, siteMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join our award-winning Istanbul studio. Open positions for architects, interior designers, sustainability consultants and interns. Flexible hours, health insurance, design budget.',
  openGraph: {
    title: 'Careers — City Marin Studio',
    description: 'Join our award-winning Istanbul studio. Open positions for architects and designers.',
    url: `${siteMetadata.siteUrl}/careers`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Careers — City Marin Studio',
    description: 'Join our award-winning Istanbul studio. Open positions for architects and designers.',
  },
};

export default function CareersPage() {
  return (
    <div className="careers-page">
      <div className="careers-hero">
        <div className="careers-eyebrow">{careersMeta.eyebrow}</div>
        <h1 className="careers-h1">{careersMeta.title}</h1>
        <div className="careers-lede">{careersMeta.lede}</div>
      </div>

      <div className="careers-listing">
        <div className="careers-col-head">
          <span>{careersMeta.jobsListingLabel}</span>
          <span>{careersLocations}</span>
        </div>
        <div className="careers-jobs">
          {jobs.map((job, i) => (
            <div className="careers-job" key={i}>
              <div className="cj-meta"><span>{job.dept}</span><span>{job.loc}</span></div>
              <div>
                <div className="cj-title">{job.title}</div>
                <div className="cj-desc">{job.desc}</div>
              </div>
              <div className="cj-cta">Apply <span className="cj-arrow">→</span></div>
            </div>
          ))}
        </div>
        <div className="careers-foot">
          <div className="careers-foot-row">
            <div className="cf-label">{careersMeta.generalApplicationsLabel}</div>
            <Link className="cf-link" href={`mailto:${careersApplicationEmail}`}>{careersApplicationEmail}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
