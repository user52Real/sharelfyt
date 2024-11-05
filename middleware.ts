// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next();
  
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

// Helper function to generate nonce using Web Crypto API
function generateNonce() {
    // Generate 16 random bytes
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    
    // Convert to base64
    return btoa(String.fromCharCode(...randomBytes));
}
  
// Configure middleware to run on specific paths
export const config = {
    matcher: [
      /*
       * Match all request paths except:
       * 1. /api/ (API routes)
       * 2. /_next/ (Next.js internals)
       * 3. /_static (static files)
       * 4. /_vercel (Vercel internals)
       * 5. /favicon.ico, /sitemap.xml (static files)
       */
      '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
    ],
}
