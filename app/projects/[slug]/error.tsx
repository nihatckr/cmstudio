'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Project page error:', error);
  }, [error]);

  return (
    <div className="project-error">
      <div className="project-error-content">
        <h1>Unable to Load Project</h1>
        <p>We couldn&apos;t load this project. The project may have been removed or is temporarily unavailable.</p>
        
        <div className="project-error-actions">
          <button onClick={reset} className="error-btn error-btn-primary">
            Try Again
          </button>
          <Link href="/projects" className="error-btn error-btn-secondary">
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
