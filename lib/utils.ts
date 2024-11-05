import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Redis } from "@upstash/redis";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const redis = new Redis({
  url: process.env.REDIS_URL || "",
  token: process.env.REDIS_TOKEN || "",
});

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60,
) {
  const key = `ratelimit:${identifier}`;
  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, window);
  }

  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
  };
}
