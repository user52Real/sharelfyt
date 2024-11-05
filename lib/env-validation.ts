import { z } from "zod";

const envSchema = z.object({
  // Server-side variables
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  RESEND_API_KEY: z.string().min(1),
  CONTACT_EMAIL: z.string().email(),
  ALLOWED_ORIGINS: z.string(),
  
  // Public variables
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_WEBSOCKET_URL: z.string().url(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url()
});

export function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export const env = validateEnv();[13][8]