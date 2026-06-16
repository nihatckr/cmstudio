import type { Metadata } from 'next';
import Link from 'next/link';
import { contactData, contactMeta, siteMetadata } from '@/lib/data';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/structuredData';
import { StructuredData } from '@/components/StructuredData';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with City Marin Studio. Istanbul office: Bankalar Caddesi No: 35/2, Karaköy, Istanbul. Email: info@citymarin.com',
  openGraph: {
    title: 'Contact — City Marin Studio',
    description: 'Get in touch with City Marin Studio in Istanbul.',
    url: `${siteMetadata.siteUrl}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact — City Marin Studio',
    description: 'Get in touch with City Marin Studio in Istanbul.',
  },
};

export default function ContactPage() {
  // Use general email instead of hardcoded index
  const generalInquiry = contactData.inquiries.find(inq => inq.label === 'General') || contactData.inquiries[0];
  const addressLines = contactData.studio.address.split('\n');
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ];
  
  return (
    <div className="contact-page">
      {/* Structured Data - JSON-LD */}
      <StructuredData data={[
        generateLocalBusinessSchema(),
        generateBreadcrumbSchema(breadcrumbs)
      ]} />
      
      <div className="contact-hero">
        <div className="contact-eyebrow">{contactMeta.eyebrow}</div>
        <h1 className="contact-h1">{contactMeta.title}</h1>
      </div>

      <div className="contact-grid">
        <div className="contact-col">
          <div className="cc-label">{contactMeta.studioLabel}</div>
          <div className="cc-block">
            <div className="cc-place">{contactData.studio.place}</div>
            <div className="cc-addr">{addressLines.map((line: string, i: number) => (
              <span key={i}>{line}{i < addressLines.length - 1 && <br/>}</span>
            ))}</div>
            <Link className="cc-mail" href={`mailto:${generalInquiry.email}`}>{generalInquiry.email}</Link>
          </div>
        </div>
        <div className="contact-col">
          <div className="cc-label">{contactMeta.inquiriesLabel}</div>
          <div className="cc-block">
            {contactData.inquiries.map((inq: typeof contactData.inquiries[0], i: number) => (
              <div className="cc-row" key={i}><span className="cc-k">{inq.label}</span><Link className="cc-v" href={`mailto:${inq.email}`}>{inq.email}</Link></div>
            ))}
          </div>
        </div>
        <div className="contact-col">
          <div className="cc-label">{contactMeta.followLabel}</div>
          <div className="cc-block">
            {contactData.social.map((s: typeof contactData.social[0], i:number) => (
              <Link key={i} className="cc-social" href={s.url} target={s.url !== '#' ? '_blank' : undefined} rel={s.url !== '#' ? 'noopener noreferrer' : undefined}>{s.name} <span>→</span></Link>
            ))}
          </div>
        </div>
        <div className="contact-col">
          <div className="cc-label">{contactMeta.hoursLabel}</div>
          <div className="cc-block">
            {contactData.hours.map((h: typeof contactData.hours[0], i: number) => (
              <div className="cc-row" key={i}><span className="cc-k">{h.day}</span><span className="cc-v">{h.time}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-map">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 460" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:460,display:'block'}}>
          <rect width="1440" height="460" fill="#1a1a1a"/>
          <line x1="120" y1="0" x2="120" y2="460" stroke="rgba(255,255,255,0.06)"/>
          <line x1="360" y1="0" x2="360" y2="460" stroke="rgba(255,255,255,0.06)"/>
          <line x1="600" y1="0" x2="600" y2="460" stroke="rgba(255,255,255,0.06)"/>
          <line x1="840" y1="0" x2="840" y2="460" stroke="rgba(255,255,255,0.06)"/>
          <line x1="1080" y1="0" x2="1080" y2="460" stroke="rgba(255,255,255,0.06)"/>
          <line x1="1320" y1="0" x2="1320" y2="460" stroke="rgba(255,255,255,0.06)"/>
          <line x1="0" y1="115" x2="1440" y2="115" stroke="rgba(255,255,255,0.06)"/>
          <line x1="0" y1="230" x2="1440" y2="230" stroke="rgba(255,255,255,0.06)"/>
          <line x1="0" y1="345" x2="1440" y2="345" stroke="rgba(255,255,255,0.06)"/>
          <circle cx="720" cy="230" r="6" fill="#fff"/>
          <circle cx="720" cy="230" r="14" fill="none" stroke="#fff" strokeOpacity="0.4"/>
          <circle cx="720" cy="230" r="26" fill="none" stroke="#fff" strokeOpacity="0.15"/>
          <text x="720" y="270" textAnchor="middle" fontFamily="Helvetica Neue,Arial,sans-serif" fontSize="10" letterSpacing="3" fill="rgba(255,255,255,0.55)">{contactData.mapLabel}</text>
        </svg>
      </div>

      <ContactForm />
    </div>
  );
}
