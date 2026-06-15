'use client';

import { useEffect } from 'react';
import { keyboardShortcuts, keyboardHelpMeta } from '@/lib/data';

interface Props {
  onClose: () => void;
}

export function KeyboardHelp({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="kshelp open" onClick={onClose} role="dialog" aria-modal="true" aria-label={keyboardHelpMeta.title}>
      <div className="kshelp-card" onClick={(e) => e.stopPropagation()}>
        <div className="kshelp-eyebrow">{keyboardHelpMeta.eyebrow}</div>
        <div className="kshelp-title">{keyboardHelpMeta.title}</div>
        <div className="kshelp-list">
          {keyboardShortcuts.map((s) => (
            <div className="kshelp-row" key={s.key}>
              <span>{s.label}</span>
              <span className="kshelp-key">{s.key}</span>
            </div>
          ))}
        </div>
        <div className="kshelp-close" onClick={onClose} role="button">
          {keyboardHelpMeta.closeLabel} <span className="pmh-close-x" />
        </div>
      </div>
    </div>
  );
}
