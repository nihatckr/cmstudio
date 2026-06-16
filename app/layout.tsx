import type { Metadata, Viewport } from "next";
import { siteMetadata } from "@/lib/data";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/structuredData";
import { StructuredData } from "@/components/StructuredData";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ProgressBar } from "@/components/UI/ProgressBar";
import { BackToTop } from "@/components/UI/BackToTop";
import { LangToggle } from "@/components/UI/LangToggle";
import { ScrollReveal } from "@/components/UI/ScrollReveal";
import { SearchOverlay, GlobalKeyboard, IntroScreen } from "@/components/ClientProviders";
import "../styles/main.scss";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s — ${siteMetadata.siteName}`,
  },
  description: siteMetadata.description,
  keywords: [
    'architecture',
    'design',
    'interior design',
    'Istanbul',
    'Turkey',
    'hospitality',
    'residential',
    'commercial',
    'luxury',
    'resort',
    'hotel',
    'villa',
  ],
  authors: [{ name: siteMetadata.siteName }],
  creator: siteMetadata.siteName,
  publisher: siteMetadata.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: siteMetadata.ogImage.url,
        width: siteMetadata.ogImage.width,
        height: siteMetadata.ogImage.height,
        alt: siteMetadata.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
    creator: siteMetadata.twitterHandle,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/everett-regular-webfont.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1b1b1b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CMS" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        
        {/* Structured Data - JSON-LD */}
        <StructuredData data={[
          generateOrganizationSchema(),
          generateWebSiteSchema()
        ]} />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('cms_nightshift');
                const isNightshift = stored === 'true' || stored === '"nightshift"' || stored === 'nightshift';
                if (isNightshift) {
                  document.documentElement.classList.add('nightshift');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
          <a href="#mainContent" className="skip-link">Skip to content</a>
          <Header />
          <main id="mainContent">
            {children}
          </main>
          <Footer />
          <ProgressBar />
          <BackToTop />
          <ProgressBar />
          <BackToTop />
        
          <LangToggle />
          <SearchOverlay />
          <ScrollReveal />
          <GlobalKeyboard />
          <IntroScreen />
      </body>
    </html>
  );
}
