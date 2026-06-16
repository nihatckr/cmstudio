// lib/structuredData.ts
// JSON-LD structured data generators for rich snippets

import { siteMetadata } from './data';
import type { Project } from './data';

// Organization Schema - Company information
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}/icons/icon-512x512.png`,
    description: siteMetadata.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bankalar Caddesi No: 35/2',
      addressLocality: 'Karaköy',
      addressRegion: 'Istanbul',
      addressCountry: 'TR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@citymarin.com',
      availableLanguage: ['en', 'tr'],
    },
    sameAs: [
      'https://instagram.com/citymarinstudio',
      // Add other social media URLs
    ],
  };
}

// WebSite Schema - Site-wide search
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// BreadcrumbList Schema - Navigation breadcrumbs
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteMetadata.siteUrl}${item.url}`,
    })),
  };
}

// Article Schema - For project pages
export function generateArticleSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.description || `${project.typology} project in ${project.city}, ${project.country}`,
    image: project.images && project.images.length > 0 
      ? project.images[0] 
      : `${siteMetadata.siteUrl}/api/placeholder?hue=${project.hue}&w=1200&h=630`,
    datePublished: project.createdAt,
    dateModified: project.updatedAt,
    author: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
      url: siteMetadata.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}/icons/icon-512x512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMetadata.siteUrl}/projects/${project.slug}`,
    },
    keywords: project.tags.join(', '),
  };
}

// CreativeWork Schema - Alternative for architecture projects
export function generateCreativeWorkSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description || `${project.typology} in ${project.city}`,
    image: project.images && project.images.length > 0 
      ? project.images[0] 
      : `${siteMetadata.siteUrl}/api/placeholder?hue=${project.hue}`,
    creator: {
      '@type': 'Organization',
      name: siteMetadata.siteName,
    },
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    keywords: project.tags.join(', '),
    spatialCoverage: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.city,
        addressCountry: project.country,
      },
    },
  };
}

// LocalBusiness Schema - For contact/about pages
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteMetadata.siteName,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}/icons/icon-512x512.png`,
    description: siteMetadata.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bankalar Caddesi No: 35/2',
      addressLocality: 'Karaköy',
      addressRegion: 'Istanbul',
      postalCode: '34420',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0245,
      longitude: 28.9744,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@citymarin.com',
      availableLanguage: ['en', 'tr'],
    },
    priceRange: '$$$$',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Turkey',
      },
      {
        '@type': 'Country',
        name: 'UAE',
      },
    ],
  };
}

// ItemList Schema - For project listings
export function generateItemListSchema(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteMetadata.siteUrl}/projects/${project.slug}`,
      name: project.title,
      image: project.images && project.images.length > 0 
        ? project.images[0] 
        : `${siteMetadata.siteUrl}/api/placeholder?hue=${project.hue}`,
    })),
  };
}
