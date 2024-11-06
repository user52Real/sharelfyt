declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    RESEND_API_KEY: string;
    CONTACT_EMAIL: string;
    CRISP_WEBSITE_ID: string;
    CALENDLY_URL: string;
    REDIS_URL: string;
    REDIS_TOKEN: string;
    // Add other env variables here
  }
}
