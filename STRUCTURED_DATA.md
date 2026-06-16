# Structured Data (JSON-LD) Implementation

Comprehensive structured data implementation for rich snippets in Google search results.

## 🎯 Purpose

Structured data helps search engines understand your content better, enabling:
- Rich snippets in search results
- Enhanced search appearance
- Better click-through rates (CTR)
- Improved SEO performance

## 📦 Files Created

### Core Files
- **`lib/structuredData.ts`** - Schema generators for all page types
- **`components/StructuredData.tsx`** - React component for rendering JSON-LD
- **`app/HomeStructuredData.tsx`** - Client-side structured data for homepage

## 📊 Implemented Schemas

### 1. Organization Schema (Global - Root Layout)
```typescript
{
  "@type": "Organization",
  "name": "City Marin Studio",
  "url": "https://citymarin.com",
  "logo": "https://citymarin.com/icons/icon-512x512.png",
  "description": "...",
  "address": { /* Karaköy office */ },
  "contactPoint": { /* Customer service */ }
}
```

**Pages**: All pages (via root layout)  
**Benefits**: Knowledge panel, business info in SERPs

### 2. WebSite Schema (Global - Root Layout)
```typescript
{
  "@type": "WebSite",
  "name": "City Marin Studio",
  "url": "https://citymarin.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://citymarin.com/?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**Pages**: All pages (via root layout)  
**Benefits**: Google search box in results

### 3. Article Schema (Project Pages)
```typescript
{
  "@type": "Article",
  "headline": "Project Title",
  "description": "...",
  "image": "...",
  "datePublished": "2024-01-01T00:00:00Z",
  "dateModified": "2024-06-15T00:00:00Z",
  "author": { "@type": "Organization", "name": "City Marin Studio" },
  "keywords": "hospitality, interior, istanbul"
}
```

**Pages**: `/projects/[slug]`  
**Benefits**: Article rich snippets, news carousel eligibility

### 4. BreadcrumbList Schema (Navigation)
```typescript
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "..." },
    { "@type": "ListItem", "position": 2, "name": "Projects", "item": "..." },
    { "@type": "ListItem", "position": 3, "name": "Project Title", "item": "..." }
  ]
}
```

**Pages**: All content pages  
**Benefits**: Breadcrumb navigation in search results

### 5. LocalBusiness Schema (About/Contact)
```typescript
{
  "@type": "ProfessionalService",
  "name": "City Marin Studio",
  "address": { /* Karaköy office */ },
  "geo": { "@type": "GeoCoordinates", "latitude": 41.0245, "longitude": 28.9744 },
  "openingHoursSpecification": [ /* Mon-Fri 09:00-18:00 */ ],
  "priceRange": "$$$$",
  "areaServed": [ "Turkey", "UAE" ]
}
```

**Pages**: `/about`, `/contact`  
**Benefits**: Local business panel, maps integration, opening hours

### 6. CreativeWork Schema (Alternative)
For architecture projects as creative works (alternative to Article).

### 7. ItemList Schema (Homepage)
Client-side injected schema for project listings.

## 🔍 Implementation Details

### Server Components (Most Pages)
```tsx
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structuredData';
import { StructuredData } from '@/components/StructuredData';

export default function Page() {
  return (
    <>
      <StructuredData data={[
        generateArticleSchema(project),
        generateBreadcrumbSchema(breadcrumbs)
      ]} />
      {/* Page content */}
    </>
  );
}
```

### Client Components (Homepage)
Homepage is a Client Component (`'use client'`), so we use a client-side injection approach:
```tsx
// app/page.tsx
import { HomeStructuredData } from './HomeStructuredData';

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      {/* Page content */}
    </>
  );
}
```

### Root Layout (Global Schemas)
```tsx
// app/layout.tsx
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structuredData';
import { StructuredData } from '@/components/StructuredData';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <StructuredData data={[
          generateOrganizationSchema(),
          generateWebSiteSchema()
        ]} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## ✅ Testing Structured Data

### 1. Google Rich Results Test
**URL**: https://search.google.com/test/rich-results

1. Enter page URL or paste HTML
2. Click "Test URL" or "Test Code"
3. View detected schemas and validation errors
4. Check "Preview" for how it appears in search

### 2. Schema.org Validator
**URL**: https://validator.schema.org/

1. Paste page URL or JSON-LD code
2. Review validation results
3. Fix any warnings or errors

### 3. Manual Inspection (Browser DevTools)
```javascript
// In browser console
const scripts = document.querySelectorAll('script[type="application/ld+json"]');
scripts.forEach((script, i) => {
  console.log(`Schema ${i + 1}:`, JSON.parse(script.textContent));
});
```

### 4. View Page Source
```bash
curl https://citymarin.com/projects/ela-quality-resort | grep -A 50 'application/ld+json'
```

## 📄 Pages with Structured Data

| Page | Schemas | Benefits |
|------|---------|----------|
| **All pages** | Organization, WebSite | Site-wide search, business info |
| **Homepage** | ItemList | Project listings |
| **Project pages** | Article, BreadcrumbList | Rich snippets, navigation |
| **About page** | LocalBusiness, BreadcrumbList | Business panel, maps |
| **Contact page** | LocalBusiness, BreadcrumbList | Contact info, location |

## 🎯 Expected Results

### In Google Search:
1. **Organization Knowledge Panel** (right side)
   - Logo, name, description
   - Address and contact info
   - Social media links

2. **Breadcrumb Navigation** (below title)
   ```
   citymarin.com › projects › ela-quality-resort
   ```

3. **Rich Snippets** (project pages)
   - Publication date
   - Author
   - Thumbnail image
   - Description

4. **Sitelinks Search Box** (homepage)
   - Search box directly in Google results
   - Quick access to site search

5. **Local Business Panel** (About/Contact)
   - Map with location
   - Opening hours
   - Contact button

## 🔧 Customization

### Adding New Schemas

1. **Add generator to `lib/structuredData.ts`**:
```typescript
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
```

2. **Use in page component**:
```tsx
<StructuredData data={generateFAQSchema(faqs)} />
```

### Updating Schema Data

All schema data comes from `lib/data.ts`:
- `siteMetadata` - URLs, descriptions, social handles
- Project data - Title, description, dates, images
- Contact data - Address, email, phone

Update data in one place, schemas auto-update everywhere.

## 📚 Schema.org Resources

- **Main site**: https://schema.org/
- **Organization**: https://schema.org/Organization
- **WebSite**: https://schema.org/WebSite
- **Article**: https://schema.org/Article
- **BreadcrumbList**: https://schema.org/BreadcrumbList
- **LocalBusiness**: https://schema.org/LocalBusiness
- **CreativeWork**: https://schema.org/CreativeWork

## 🚀 Production Checklist

- [x] Organization schema with real logo
- [x] WebSite schema with search action
- [x] Article schema on all project pages
- [x] BreadcrumbList on all content pages
- [x] LocalBusiness with real address and coordinates
- [ ] Update logo URL (after icon generation)
- [ ] Update siteUrl with production domain
- [ ] Test all pages with Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor search appearance in GSC

## 📊 Performance Impact

- **Minimal**: JSON-LD scripts are lightweight (<2KB per schema)
- **No layout shift**: Scripts in `<head>`, don't affect rendering
- **SEO only**: Not rendered visually, only for search engines
- **Build time**: No impact (static generation)

## 🐛 Troubleshooting

### Schema Not Detected
1. Check page source - is JSON-LD present?
2. Validate JSON syntax - use validator.schema.org
3. Check `@context` and `@type` fields
4. Ensure siteUrl is absolute (not relative)

### Lint Warnings (Unused Imports)
ESLint may show warnings for imports used in JSX. This is a cache issue:
```bash
# Clear ESLint cache
rm -rf .next
npm run build
```

### Duplicate Schemas
- Root layout adds Organization + WebSite to all pages (intentional)
- Each page adds its own specific schemas
- Multiple schemas per page are valid and encouraged

## 📝 Notes

- JSON-LD is Google's recommended format (over microdata or RDFa)
- Multiple schemas per page are allowed and beneficial
- Schemas are additive - each adds specific context
- Search appearance may take weeks to update after deployment
- Regular schema validation is recommended (use GSC)
