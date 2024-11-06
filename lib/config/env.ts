import { z } from 'zod';

const envSchema = z.object({
  // Required in production, optional in development
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  
  // Other environment variables
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_EMAIL: z.string().email().optional(),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Environment validation warning:', error);
      return process.env;
    }
    throw error;
  }
}

export const env = validateEnv();