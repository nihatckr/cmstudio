'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { animConfig } from '@/lib/animations';

type HoverScaleProps = {
  children: React.ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
};

export function HoverScale({ children, scale = 1.05, duration = 0.3, className = '' }: HoverScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseEnter = () => {
      gsap.to(element, { scale, duration, ease: animConfig.ease.smooth });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, { scale: 1, duration, ease: animConfig.ease.smooth });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale, duration]);
  
  return <div ref={ref} className={className}>{children}</div>;
}
