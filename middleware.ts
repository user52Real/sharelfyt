import { NextResponse, type NextRequest } from 'next/server';

function generateNonce(): string {
  return crypto.randomUUID();
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const isProd = process.env.NODE_ENV === 'production';
  
  // Add nonce to headers for use in _document.tsx
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const cspHeader = `
    default-src 'self';
    script-src 'self' ${isProd ? `'nonce-${nonce}'` : "'unsafe-inline' 'unsafe-eval'"} https:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data: https:;
    connect-src 'self' ws: wss: https:;
    media-src 'self';
    frame-src 'self';
    worker-src 'self' blob:;
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add security headers
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /manifest.webmanifest (static files)
     */
    '/((?!api|_next|fonts|icons|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};