'use client';
import { useEffect, useRef } from 'react';
import { fadeIn, scrollTriggerAnimation } from '@/lib/animations';

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function GSAPScrollReveal({ children, delay = 0, y = 30, className = '' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    const element = ref.current;
    
    // Set initial state only on client
    element.style.opacity = '0';
    element.style.transform = `translateY(${y}px)`;
    
    const trigger = scrollTriggerAnimation(element, {
      start: 'top 85%',
      onEnter: () => fadeIn(element, { delay, y }),
    });
    
    return () => trigger.kill();
  }, [delay, y]);
  
  return <div ref={ref} className={className}>{children}</div>;
}
