// components/UI/ProjectImage.tsx
// Project-specific image component with lazy loading and fallback

'use client';

import OptimizedImage from './OptimizedImage';

interface ProjectImageProps {
  images: string[];
  title: string;
  hue: number;
  featured?: boolean;
  className?: string;
}

export default function ProjectImage({
  images,
  title,
  hue,
  featured = false,
  className = '',
}: ProjectImageProps) {
  // Use first image or fallback to generated placeholder
  const hasImage = images && images.length > 0;
  const imageSrc = hasImage ? images[0] : `/api/placeholder?hue=${hue}`;

  return (
    <div className={`project-image-wrapper ${className}`}>
      <OptimizedImage
        src={imageSrc}
        alt={`${title} - Project Image`}
        fill
        priority={featured} // Prioritize featured project images
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        objectFit="cover"
        className="project-image"
      />
    </div>
  );
}
