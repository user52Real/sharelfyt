// lib/rate-limit.ts
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { NextResponse } from 'next/server';

const limiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 60, // Per 60 seconds
});

export async function withRateLimit(
  request: Request,
  handler: () => Promise<NextResponse>
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    await limiter.consume(ip);
    return await handler();
  } catch (error) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }
}