// app/api/placeholder/route.ts
// Dynamic placeholder image generator for projects without images

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hue = parseInt(searchParams.get('hue') || '200', 10);
  const width = parseInt(searchParams.get('w') || '800', 10);
  const height = parseInt(searchParams.get('h') || '600', 10);

  // Generate SVG placeholder with project's hue color
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue}, 70%, 20%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(${hue}, 60%, 15%);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)"/>
      <text
        x="50%"
        y="50%"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="24"
        fill="rgba(255,255,255,0.3)"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        CITY MARIN STUDIO
      </text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
