import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="nf-wrap">
        <div className="nf-code">404</div>
        <div className="nf-msg">This page could not be found.</div>
        <div className="nf-actions">
          <Link href="/" className="nf-link">View projects →</Link>
          <Link href="/contact" className="nf-link">Contact the studio →</Link>
        </div>
      </div>
    </div>
  );
}
