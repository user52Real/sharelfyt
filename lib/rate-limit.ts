import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { NextResponse } from 'next/server'
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Socket } from 'socket.io';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
})

const wsLimiter = new RateLimiterMemory({
  points: 100, // Number of connections allowed
  duration: 60, // Per 60 seconds
});


// Create a new ratelimiter that allows 5 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60s'),
  analytics: true,
  prefix: 'shareflyt-api',
})

export async function withRateLimit(
  request: Request,
  handler: () => Promise<NextResponse>
) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    `ratelimit_${ip}`
  )

  if (!success) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: 'Please try again later'
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      }
    )
  }

  return handler()
}

export const socketRateLimit = async (socket: Socket) => {
  try {
    await wsLimiter.consume(socket.handshake.address);
  } catch {
    socket.disconnect(true);
  }
};