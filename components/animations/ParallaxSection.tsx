'use client';
import { useEffect, useRef } from 'react';
import { parallax } from '@/lib/animations';

type ParallaxSectionProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

export function ParallaxSection({ children, speed = 0.3, className = '' }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const animation = parallax(element, { speed });
    return () => animation.scrollTrigger?.kill();
  }, [speed]);
  
  return <div ref={ref} className={className}>{children}</div>;
}
