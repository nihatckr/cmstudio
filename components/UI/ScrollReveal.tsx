'use client';
import { useEffect } from 'react';

/**
 * ScrollReveal — matches index.html initScrollReveals() + IntersectionObserver
 * Adds .in-view to .reveal, .reveal-stagger, .dbar-fill, .dcol-bar etc.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-stagger, [data-reveal]').forEach(
        el => el.classList.add('in-view')
      );
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    );

    const selectors = [
      // reveal classes
      '.reveal', '.reveal-stagger',
      // about page
      '.about-body-section', '.about-values', '.about-stats',
      '.about-process', '.studio-tour',
      // people
      '.founder-block', '.team-section',
      // news
      '.news-featured', '.news-list-head', '.news-item',
      // sustainability
      '.sustain-intro-grid', '.sustain-stats',
      // careers
      '.careers-listing', '.careers-job', '.faq-section',
      // contact
      '.contact-grid', '.contact-map',
      // project entries
      '.project-entry',
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('reveal');
        io.observe(el);
      });
    });

    // Also observe in-view triggers for dashboard charts
    const chartIo = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            chartIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    ['.dash-bars', '.dash-cols', '.dash-donut', '.about-stats'].forEach(sel => {
      document.querySelectorAll(sel).forEach(el => chartIo.observe(el));
    });

    return () => { io.disconnect(); chartIo.disconnect(); };
  }, []);

  return null;
}
