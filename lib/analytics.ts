// lib/analytics.ts
// Google Analytics 4 Integration

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// Check if GA is enabled (production + GA_ID exists)
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const isAnalyticsEnabled = !!GA_MEASUREMENT_ID && process.env.NODE_ENV === 'production';

/**
 * Send page view to Google Analytics
 */
export const pageview = (url: string) => {
  if (!isAnalyticsEnabled || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Send custom event to Google Analytics
 */
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (!isAnalyticsEnabled || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string, label?: string) => {
  event({
    action: 'click',
    category: 'outbound_link',
    label: label || url,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  event({
    action: success ? 'submit_success' : 'submit_error',
    category: 'form',
    label: formName,
  });
};

/**
 * Track file download
 */
export const trackDownload = (fileName: string, fileType: string) => {
  event({
    action: 'download',
    category: 'file',
    label: `${fileName} (${fileType})`,
  });
};

/**
 * Track search query
 */
export const trackSearch = (query: string, resultsCount?: number) => {
  event({
    action: 'search',
    category: 'search',
    label: query,
    value: resultsCount,
  });
};

/**
 * Track user engagement (time on page)
 */
export const trackEngagement = (pageName: string, timeInSeconds: number) => {
  event({
    action: 'engagement',
    category: 'user_engagement',
    label: pageName,
    value: Math.round(timeInSeconds),
  });
};

/**
 * Track project view
 */
export const trackProjectView = (projectId: string, projectName: string) => {
  event({
    action: 'view',
    category: 'project',
    label: `${projectId}: ${projectName}`,
  });
};

/**
 * Track filter usage
 */
export const trackFilterChange = (filterType: string, filterValue: string) => {
  event({
    action: 'filter_change',
    category: 'interaction',
    label: `${filterType}: ${filterValue}`,
  });
};

/**
 * Track theme toggle
 */
export const trackThemeToggle = (theme: 'light' | 'dark') => {
  event({
    action: 'theme_toggle',
    category: 'interaction',
    label: theme,
  });
};

/**
 * Track error
 */
export const trackError = (errorMessage: string, errorType: string) => {
  event({
    action: 'error',
    category: 'error',
    label: `${errorType}: ${errorMessage}`,
  });
};
