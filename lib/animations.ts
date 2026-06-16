// lib/animations.ts
// GSAP animation utilities and configurations

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation configurations
export const animConfig = {
  // Duration presets
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    verySlow: 1.5,
  },
  
  // Easing presets
  ease: {
    smooth: 'power2.out',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'back.out(1.7)',
    linear: 'none',
    inOut: 'power2.inOut',
  },
  
  // Stagger configurations
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
};

// Fade in animation
export function fadeIn(
  element: HTMLElement | string,
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    ease?: string;
    onComplete?: () => void;
  } = {}
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: options.y || 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || animConfig.duration.normal,
      delay: options.delay || 0,
      ease: options.ease || animConfig.ease.smooth,
      onComplete: options.onComplete,
    }
  );
}

// Slide in animation
export function slideIn(
  element: HTMLElement | string,
  options: {
    duration?: number;
    delay?: number;
    x?: number;
    ease?: string;
  } = {}
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x: options.x || 50,
    },
    {
      opacity: 1,
      x: 0,
      duration: options.duration || animConfig.duration.normal,
      delay: options.delay || 0,
      ease: options.ease || animConfig.ease.smooth,
    }
  );
}

// Scale animation
export function scaleIn(
  element: HTMLElement | string,
  options: {
    duration?: number;
    delay?: number;
    scale?: number;
    ease?: string;
  } = {}
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: options.scale || 0.9,
    },
    {
      opacity: 1,
      scale: 1,
      duration: options.duration || animConfig.duration.normal,
      delay: options.delay || 0,
      ease: options.ease || animConfig.ease.bounce,
    }
  );
}

// Stagger fade in for lists
export function staggerFadeIn(
  elements: HTMLElement[] | string,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    ease?: string;
  } = {}
) {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: options.y || 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || animConfig.duration.normal,
      stagger: options.stagger || animConfig.stagger.normal,
      ease: options.ease || animConfig.ease.smooth,
    }
  );
}

// Scroll-triggered animation
export function scrollTriggerAnimation(
  element: HTMLElement | string,
  options: {
    trigger?: HTMLElement | string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    animation?: gsap.core.Tween | gsap.core.Timeline;
    onEnter?: () => void;
    onLeave?: () => void;
  } = {}
) {
  return ScrollTrigger.create({
    trigger: options.trigger || element,
    start: options.start || 'top 80%',
    end: options.end || 'bottom 20%',
    scrub: options.scrub || false,
    markers: options.markers || false,
    animation: options.animation,
    onEnter: options.onEnter,
    onLeave: options.onLeave,
  });
}

// Parallax effect
export function parallax(
  element: HTMLElement | string,
  options: {
    speed?: number;
    start?: string;
    end?: string;
  } = {}
) {
  const speed = options.speed || 0.5;
  
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: animConfig.ease.linear,
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: true,
    },
  });
}

// Hover animation
export function hoverScale(
  element: HTMLElement | string,
  options: {
    scale?: number;
    duration?: number;
  } = {}
) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return () => {}; // Return noop cleanup if element not found
  
  const scale = options.scale || 1.05;
  const duration = options.duration || animConfig.duration.fast;
  
  const handleMouseEnter = () => {
    gsap.to(el, { scale, duration, ease: animConfig.ease.smooth });
  };
  
  const handleMouseLeave = () => {
    gsap.to(el, { scale: 1, duration, ease: animConfig.ease.smooth });
  };

  el.addEventListener('mouseenter', handleMouseEnter);
  el.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function to remove listeners
  return () => {
    el.removeEventListener('mouseenter', handleMouseEnter);
    el.removeEventListener('mouseleave', handleMouseLeave);
  };
}

// Page transition animation
export function pageTransition(
  onComplete?: () => void
) {
  const timeline = gsap.timeline({
    onComplete,
  });
  
  timeline
    .to('body', {
      opacity: 0,
      duration: animConfig.duration.fast,
      ease: animConfig.ease.smooth,
    })
    .set('body', { opacity: 1 });
  
  return timeline;
}

// Cleanup all ScrollTriggers
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// Refresh ScrollTrigger (after dynamic content loads)
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
