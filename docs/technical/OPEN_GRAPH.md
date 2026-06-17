# Open Graph & Twitter Card Metadata Documentation

## Overview

Comprehensive Open Graph and Twitter Card metadata has been implemented across all pages to provide rich social media previews when shared on Facebook, Twitter, LinkedIn, and other platforms.

## Global Metadata (Root Layout)

**File:** `app/layout.tsx`

**Implemented:**
- Site title with template for child pages
- Meta description
- SEO keywords
- Open Graph tags (type, locale, url, siteName, images)
- Twitter Card tags (summary_large_image)
- Robots directives
- metadataBase for absolute URLs

## Page-Specific Metadata

### Homepage
**Default:** Uses root layout metadata
- Title: "City Marin Studio — Architecture & Design, Istanbul"
- Description: "Architecture and design studio based in Istanbul, Turkey."
- OG Image: `/og-image.png` (1200x630px)

### Project Detail Pages
**File:** `app/projects/[slug]/page.tsx`

**Dynamic metadata per project:**
- Title: `{project.title}`
- Description: Auto-generated from project data (typology, location, area, status)
- Keywords: Project-specific (typology, city, country, type, tags)
- OG Type: `article` (appropriate for individual project pages)
- OG Images: Uses project image or dynamic placeholder (`/api/placeholder?hue={hue}`)
- Published/Modified Time: Uses project createdAt/updatedAt
- Authors & Tags: Populated from project data

**Example:**
```typescript
{
  title: "Ela Quality Resort",
  description: "Hotel & Resort project in Antalya, Turkey. 12,000 m². COMPLETED — 2025.",
  keywords: ["Hotel & Resort", "Antalya", "Turkey", "hospitality", ...],
  openGraph: {
    type: "article",
    images: [{ url: "/project-image.jpg", width: 1200, height: 630 }],
    publishedTime: "2024-01-15T09:00:00Z",
    modifiedTime: "2025-01-15T14:30:00Z",
    tags: ["luxury", "resort", "mediterranean"],
  }
}
```

### About Page
- Title: "About"
- Description: Studio introduction
- OG Type: `website`
- Twitter Card: `summary_large_image`

### Contact Page
- Title: "Contact"
- Description: Office address and contact info
- OG Type: `website`
- Twitter Card: `summary`

### People Page
- Title: "People"
- Description: Team introduction
- OG Type: `website`

### Careers Page
- Title: "Careers"
- Description: Job opportunities
- OG Type: `website`

### Sustainability Page
- Title: "Sustainability"
- Description: Sustainability approach
- OG Type: `website`

## Open Graph Image System

### Current Implementation
1. **Default OG Image:** `/og-image.png` (1200x630px) - TODO: Create actual image
2. **Project Images:** Uses `project.images[0]` if available
3. **Dynamic Placeholder:** Falls back to `/api/placeholder?hue={hue}&w=1200&h=630`

### Creating OG Images

**Recommended specs:**
- Size: 1200x630px (Facebook/Twitter recommended)
- Format: PNG or JPEG
- Max file size: <8MB (most platforms)
- Content: Studio logo, project image, minimal text

**For project-specific OG images:**
```typescript
// In lib/data.ts, add images:
{
  id: 1,
  title: 'Ela Quality Resort',
  images: [
    '/images/projects/ela/og-image.jpg',  // 1200x630px
    '/images/projects/ela/hero.jpg',      // Other images
  ],
}
```

## Testing Social Media Metadata

### Facebook Debugger
**URL:** https://developers.facebook.com/tools/debug/

1. Enter page URL (e.g., `https://cmstudio.com/projects/ela-quality-resort`)
2. Click "Scrape Again" to refresh cache
3. Verify title, description, and image display correctly

### Twitter Card Validator
**URL:** https://cards-dev.twitter.com/validator

1. Enter page URL
2. Preview how card will appear
3. Check "Card preview" tab for rendering

### LinkedIn Post Inspector
**URL:** https://www.linkedin.com/post-inspector/

1. Enter page URL
2. Inspect and clear cache if needed

### Manual Testing
```bash
# Check HTML meta tags
curl https://cmstudio.com/ | grep -i "og:"
curl https://cmstudio.com/ | grep -i "twitter:"

# Test specific project page
curl https://cmstudio.com/projects/ela-quality-resort | grep -i "og:title"
```

## Metadata Best Practices

### Title Guidelines
- **Length:** 60-70 characters (truncates at ~60 on Google)
- **Format:** `{Page Title} — {Site Name}`
- **Example:** "Ela Quality Resort — City Marin Studio"

### Description Guidelines
- **Length:** 150-160 characters (truncates at ~155 on Google)
- **Content:** Actionable, descriptive, includes keywords
- **Example:** "Hotel & Resort project in Antalya, Turkey. 12,000 m². COMPLETED — 2025."

### Image Guidelines
- **Aspect Ratio:** 1.91:1 (1200x630px)
- **Fallback:** Always provide a default OG image
- **Alt Text:** Descriptive for accessibility
- **File Size:** Optimize for <100KB when possible

### URL Guidelines
- **Canonical:** Use absolute URLs with metadataBase
- **Consistency:** Ensure URLs match sitemap.xml
- **Protocol:** HTTPS only

## Configuration

### Site Metadata (lib/data.ts)
```typescript
export const siteMetadata = {
  title: "City Marin Studio — Architecture & Design, Istanbul",
  description: "Architecture and design studio based in Istanbul, Turkey.",
  siteUrl: 'https://cmstudio.com', // TODO: Update with real URL
  siteName: 'City Marin Studio',
  locale: 'en_US',
  type: 'website',
  twitterHandle: '@citymarinstudio', // TODO: Update
  ogImage: {
    url: '/og-image.png', // TODO: Create actual image
    width: 1200,
    height: 630,
    alt: 'City Marin Studio - Architecture & Design',
  },
};
```

### TODO Items
- [ ] Create default OG image (`/public/og-image.png`, 1200x630px)
- [ ] Update `siteUrl` with production domain
- [ ] Update `twitterHandle` with real Twitter/X handle
- [ ] Add project-specific images to `lib/data.ts`
- [ ] Test all pages with Facebook Debugger
- [ ] Test all pages with Twitter Card Validator
- [ ] Verify OG images display correctly on LinkedIn

## Advanced: Dynamic OG Image Generation

For automated OG image generation at build time, consider:

```typescript
// app/api/og/route.tsx (using @vercel/og)
import { ImageResponse } from '@vercel/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  
  return new ImageResponse(
    (
      <div style={{ display: 'flex', fontSize: 60, background: 'white' }}>
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

Then use: `ogImage: '/api/og?title=' + encodeURIComponent(project.title)`

## References

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters)
