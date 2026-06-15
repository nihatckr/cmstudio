'use client';
import { useState } from 'react';
import Link from 'next/link';
import { jobs, faqs, careersLocations, careersApplicationEmail, careersMeta } from '@/lib/data';

export default function CareersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      <div className="faq-section">
        <div className="faq-head">
          <div className="faq-eyebrow">{careersMeta.faqEyebrow}</div>
          <h2 className="faq-title">{careersMeta.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q"><span>{faq.q}</span><span className="faq-plus">+</span></div>
              <div className="faq-a"><div className="faq-a-inner">{faq.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
