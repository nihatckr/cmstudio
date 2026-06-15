/**
 * ArchSVG — architectural grid placeholder
 *
 * Used everywhere real photography hasn't arrived yet.
 * Swap-ready: replace the <svg> with <Image> when photos are available
 * without touching any consuming component.
 *
 * Props:
 *   hue   — colour hue (0–360), matches project.hue in lib/data.ts
 *   label — optional caption rendered bottom-left (e.g. "ELA · COVER")
 *   vb    — viewBox dimensions [width, height], default 900×600
 */

import type { CSSProperties } from 'react';

interface ArchSVGProps {
  hue: number;
  label?: string;
  vb?: [number, number];
  style?: CSSProperties;
  className?: string;
}

const FILL_STYLE: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'block',
  width: '100%',
  height: '100%',
};

export function ArchSVG({ hue, label, vb = [900, 600], style, className }: ArchSVGProps) {
  const [w, h] = vb;
  const mid = Math.round(h / 2);

  const bg    = `hsl(${hue},6%,88%)`;
  const bg2   = `hsl(${hue},6%,80%)`;
  const line  = `hsla(${hue},10%,52%,0.22)`;
  const txt   = `hsla(${hue},8%,42%,0.42)`;

  // Grid column x positions (thirds of width)
  const x1 = Math.round(w * 0.124);
  const x2 = Math.round(w * 0.5);
  const x3 = Math.round(w * 0.876);

  // Grid row y positions (thirds of height)
  const y1 = Math.round(h * 0.333);
  const y2 = Math.round(h * 0.667);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ ...FILL_STYLE, ...style }}
      className={className}
      aria-hidden="true"
    >
      {/* Background */}
      <rect width={w} height={h} fill={bg} />
      <rect x={0} y={mid} width={w} height={mid} fill={bg2} opacity={0.5} />

      {/* Grid lines — verticals */}
      <line x1={x1} y1={0} x2={x1} y2={h} stroke={line} strokeWidth={1} />
      <line x1={x2} y1={0} x2={x2} y2={h} stroke={line} strokeWidth={1} />
      <line x1={x3} y1={0} x2={x3} y2={h} stroke={line} strokeWidth={1} />

      {/* Grid lines — horizontals */}
      <line x1={0} y1={y1} x2={w} y2={y1} stroke={line} strokeWidth={1} />
      <line x1={0} y1={y2} x2={w} y2={y2} stroke={line} strokeWidth={1} />

      {/* Optional caption */}
      {label && (
        <text
          x={24}
          y={h - 18}
          fontFamily="Helvetica Neue,Arial,sans-serif"
          fontSize={11}
          letterSpacing={3}
          fill={txt}
        >
          {label.toUpperCase()}
        </text>
      )}
    </svg>
  );
}

/**
 * archSVGString — returns the same placeholder as an HTML string.
 * Used by ProjectDetail which injects slides via dangerouslySetInnerHTML.
 */
export function archSVGString(hue: number, label?: string): string {
  const w = 900; const h = 600;
  const mid = 300;
  const bg    = `hsl(${hue},6%,88%)`;
  const bg2   = `hsl(${hue},6%,80%)`;
  const line  = `hsla(${hue},10%,52%,0.22)`;
  const txt   = `hsla(${hue},8%,42%,0.42)`;

  const caption = label
    ? `<text x="24" y="582" font-family="Helvetica Neue,Arial,sans-serif" font-size="11" letter-spacing="3" fill="${txt}">${label.toUpperCase()}</text>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;display:block;width:100%;height:100%" aria-hidden="true">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <rect x="0" y="${mid}" width="${w}" height="${mid}" fill="${bg2}" opacity="0.5"/>
  <line x1="112" y1="0" x2="112" y2="${h}" stroke="${line}" stroke-width="1"/>
  <line x1="450" y1="0" x2="450" y2="${h}" stroke="${line}" stroke-width="1"/>
  <line x1="788" y1="0" x2="788" y2="${h}" stroke="${line}" stroke-width="1"/>
  <line x1="0" y1="200" x2="${w}" y2="200" stroke="${line}" stroke-width="1"/>
  <line x1="0" y1="400" x2="${w}" y2="400" stroke="${line}" stroke-width="1"/>
  ${caption}
</svg>`;
}
