// components/UI/ReloadButton.tsx
'use client';

export function ReloadButton() {
  return (
    <button 
      onClick={() => window.location.reload()} 
      className="offline-button primary"
    >
      Try Again
    </button>
  );
}
