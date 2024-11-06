// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://438d241e9cb0cd79c71d12ca61beb1a1@o4508219811889152.ingest.de.sentry.io/4508242500124752",
  

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
