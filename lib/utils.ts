import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Function to merge className values with Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Memory-based rate limiting fallback
class MemoryRateLimit {
  private storage: Map<string, { count: number; timestamp: number }>;
  private readonly windowMs: number;
  private readonly limit: number;

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.storage = new Map();
    this.windowMs = windowMs;
    this.limit = limit;
  }

  async isRateLimited(key: string): Promise<boolean> {
    const now = Date.now();
    const record = this.storage.get(key);

    // Clean up expired records
    if (record && now - record.timestamp > this.windowMs) {
      this.storage.delete(key);
    }

    if (!record) {
      this.storage.set(key, { count: 1, timestamp: now });
      return false;
    }

    if (record.count >= this.limit) {
      return true;
    }

    record.count += 1;
    return false;
  }
}

// Create rate limiter based on environment
let rateLimiter: Ratelimit | MemoryRateLimit;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  // Use Redis rate limiting in production
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60s"),
    analytics: true,
    prefix: "api_rate_limit",
  });
} else {
  // Use in-memory rate limiting for development
  rateLimiter = new MemoryRateLimit(10, 60000); // 10 requests per minute
}

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): Promise<{ success: boolean; remaining: number }> {
  try {
    if (rateLimiter instanceof Ratelimit) {
      // Redis-based rate limiting
      const result = await rateLimiter.limit(identifier);
      return {
        success: !result.deniedValue,
        remaining: result.remaining,
      };
    } else {
      // Memory-based rate limiting
      const isLimited = await rateLimiter.isRateLimited(identifier);
      return {
        success: !isLimited,
        remaining: isLimited ? 0 : 1, // Simplified remaining count for memory implementation
      };
    }
  } catch (error) {
    console.error("Rate limiting error:", error);
    // Fail open - allow the request in case of errors
    return {
      success: true,
      remaining: 1,
    };
  }
}
