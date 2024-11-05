import { z } from "zod";

const ConfigSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  CONTACT_EMAIL: z.string().email(),
  CALENDLY_URL: z.string().url(),
});

export type Config = z.infer<typeof ConfigSchema>;

export function validateConfig() {
  try {
    const config = ConfigSchema.parse({
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
      CALENDLY_URL: process.env.CALENDLY_URL,
    });
    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((issue) => issue.path.join("."));
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}`,
      );
    }
    throw error;
  }
}
