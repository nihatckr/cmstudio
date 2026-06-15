/**
 * NightshiftInit — <head> script
 * Adds `nightshift` class to <html> before first paint.
 * This covers the globals.scss `html.nightshift body { background:#000 }` rule.
 * `body.nightshift` is handled by the inline script in layout.tsx <body>.
 *
 * Priority:
 * 1. Check localStorage for explicit user preference ('cms_nightshift')
 * 2. Check prefers-color-scheme: dark media query
 * 3. Default to light mode
 */
export function NightshiftInit() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try{
          const stored=localStorage.getItem('cms_nightshift');
          if(stored===null){
            // No user preference stored - check prefers-color-scheme
            if(window.matchMedia('(prefers-color-scheme:dark)').matches){
              document.documentElement.classList.add('nightshift');
              localStorage.setItem('cms_nightshift','true');
            }
          } else if(stored==='true'){
            document.documentElement.classList.add('nightshift');
          }
        }catch(e){}`,
      }}
      suppressHydrationWarning
    />
  );
}
