'use client';
import { useEffect, useRef } from 'react';
import { staggerFadeIn, scrollTriggerAnimation } from '@/lib/animations';

type StaggerListProps = {
  children: React.ReactNode;
  stagger?: number;
  y?: number;
  className?: string;
};

export function StaggerList({ children, stagger = 0.1, y = 30, className = '' }: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const container = ref.current;
    const items = Array.from(container.children) as HTMLElement[];
    
    if (items.length === 0) return;
    
    // Set initial state only on client
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = `translateY(${y}px)`;
    });
    
    const trigger = scrollTriggerAnimation(container, {
      start: 'top 85%',
      onEnter: () => staggerFadeIn(items, { stagger, y }),
    });
    
    return () => trigger.kill();
  }, [stagger, y]);
  
  return <div ref={ref} className={className}>{children}</div>;
}
