'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="error-boundary">
      <div className="error-content">
        <div className="error-icon">⚠</div>
        <h1 className="error-title">Something went wrong</h1>
        <p className="error-message">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>
        
        {error.digest && (
          <p className="error-digest">Error ID: {error.digest}</p>
        )}

        <div className="error-actions">
          <button
            onClick={reset}
            className="error-btn error-btn-primary"
          >
            Try Again
          </button>
          <Link href="/" className="error-btn error-btn-secondary">
            Go Home
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="error-details">
            <summary>Technical Details (Development Only)</summary>
            <pre className="error-stack">{error.stack}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
