// components/UI/OptimizedImage.tsx
// Next.js Image wrapper with blur placeholder and lazy loading

'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Shimmer placeholder data URL (lightweight base64)
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#1a1a1a" offset="20%" />
          <stop stop-color="#2a2a2a" offset="50%" />
          <stop stop-color="#1a1a1a" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#1a1a1a" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  // Fallback placeholder image (1x1 pixel gray)
  const placeholderSrc = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;

  // Handle error case
  if (hasError) {
    return (
      <div
        className={`optimized-image-fallback ${className}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          backgroundColor: 'var(--color-bg-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      priority={priority}
      className={`optimized-image ${isLoading ? 'loading' : 'loaded'} ${className}`}
      sizes={sizes}
      style={{
        objectFit,
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoading ? 0.6 : 1,
      }}
      placeholder="blur"
      blurDataURL={placeholderSrc}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setIsLoading(false);
        setHasError(true);
      }}
      quality={85}
    />
  );
}
