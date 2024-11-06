import { NextResponse, type NextRequest } from 'next/server';

function generateNonce(): string {
  return crypto.randomUUID();
}

export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const isProd = process.env.NODE_ENV === 'production';
  const isDev = process.env.NODE_ENV === 'development';
  
  // Add nonce to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const knownScriptHashes = [
    "'sha256-5+YTmTcBwCYdJ8Jetbr6kyjGp0Ry/H7ptpoun6CrSwQ='",
    "'sha256-xAeXB7K9i+JFHV4K4Mh9i/YhUHICt7LXJkYaXOsR1Y='",
    "'sha256-CJB4kJHPeyGZgXoTZoWuVrPH3TgNQ/ZyI1GRwT8jAyA='"
  ];

  const scriptSources = [
    "'self'",
    `'nonce-${nonce}'`,
    "'unsafe-eval'",
    ...knownScriptHashes,
    "https:",
    "blob:"
  ];

  if (isDev) {
    scriptSources.push("'unsafe-inline'");
  }

  // Fixed CSP header
  const cspHeader = `
    default-src 'self';
    script-src ${scriptSources.join(' ')};
    script-src-elem ${scriptSources.join(' ')};
    style-src 'self' 'unsafe-inline' vercel.live *.vercel.live;
    style-src-elem 'self' 'unsafe-inline' vercel.live *.vercel.live;
    font-src 'self' data: vercel.live *.vercel.live;
    img-src 'self' blob: data: https: http:;
    connect-src 'self' 
      ws://ws-us3.pusher.com
      wss://ws-us3.pusher.com
      https://sockjs-us3.pusher.com
      wss://ws.pusherapp.com
      https://stats.pusher.com
      https://vercel.live 
      *.vercel.live 
      ws://localhost:*
      wss://*.vercel.live
      https://*.vercel.app
      https://*.shareflyt.xyz
      ws://*.shareflyt.xyz
      wss://*.shareflyt.xyz;
    media-src 'self' https:;
    frame-src 'self' https: vercel.live *.vercel.live;
    worker-src 'self' blob:;
    manifest-src 'self';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' vercel.live *.vercel.live;
    object-src 'none';
  `.replace(/\s{2,}/g, ' ').trim();

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add security headers
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy', 
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()'
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|fonts|images|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
};