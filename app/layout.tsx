import type { Metadata, Viewport } from "next";
import { siteMetadata } from "@/lib/data";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { ProgressBar } from "@/components/UI/ProgressBar";
import { BackToTop } from "@/components/UI/BackToTop";
import { LangToggle } from "@/components/UI/LangToggle";
import { SearchOverlay } from "@/components/UI/SearchOverlay";
import { ScrollReveal } from "@/components/UI/ScrollReveal";
 
import { GlobalKeyboard } from "@/components/UI/GlobalKeyboard";
import { IntroScreen } from "@/components/UI/IntroScreen";
import "../styles/main.scss";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
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
      </head>
      <body suppressHydrationWarning>
        {/* Synchronous inline script — body exists here, runs before paint.
            Adds body.nightshift immediately so all 250+ component CSS rules fire. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{
              const stored=localStorage.getItem('cms_nightshift');
              if(stored===null){
                // No user preference stored - check prefers-color-scheme
                if(window.matchMedia('(prefers-color-scheme:dark)').matches){
                  document.body.classList.add('nightshift');
                  localStorage.setItem('cms_nightshift','true');
                }
              } else if(stored==='true'){
                document.body.classList.add('nightshift');
              }
            }catch(e){}`,
          }}
          suppressHydrationWarning
        />
        <a href="#mainContent" className="skip-link">Skip to content</a>
        <Header />
        <span id="mainContent" />
        {children}
        <Footer />
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
