// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { headers } from 'next/headers';

function generateNonce() {
  const uuid = crypto.randomUUID();
  return Buffer.from(uuid).toString('base64');
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const isDev = process.env.NODE_ENV === 'development';
  
  // Add nonce to headers for use in _document.tsx
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: ${isDev ? "'unsafe-eval'" : ''} ${isDev ? "'unsafe-inline'" : ''};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com data:;
    img-src 'self' data: blob: https:;
    media-src 'self';
    connect-src 'self' ${isDev ? 'ws:' : ''} https:;
    worker-src 'self' blob:;
    manifest-src 'self';
    frame-ancestors 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
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
    '/((?!api|_next|_static|_vercel|favicon.ico|manifest.webmanifest).*)',
  ],
};