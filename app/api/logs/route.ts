import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { APIError } from "@/lib/error-handling/api-error";

// Initialize Sentry with your configuration
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

// Add type checking for the log object
interface LogEvent {
  message: string;
  level: 'info' | 'warn' | 'error';
  error?: Error;
  context?: Record<string, unknown>;
  [key: string]: unknown;
}

// Utility function to validate log event
function isValidLogEvent(log: unknown): log is LogEvent {
  if (!log || typeof log !== 'object') return false;
  const logEvent = log as LogEvent;
  return (
    typeof logEvent.message === 'string' &&
    ['info', 'warn', 'error'].includes(logEvent.level)
  );
}

export async function POST(request: Request) {
  try {
    const log = await request.json();  

    if (!isValidLogEvent(log)) {
      throw APIError.BadRequest('Invalid log format');
    }

    if (process.env.NODE_ENV === "production") {
      // Create a new Sentry event
      const eventId = Sentry.captureEvent({
        message: log.message,
        level: log.level as Sentry.SeverityLevel,
        extra: {
          ...log,
          timestamp: new Date().toISOString(),
        },
        tags: {
          source: 'api-logs',
          environment: process.env.NODE_ENV
        }
      });

      // If there's an error object, capture it separately
      if (log.error) {
        Sentry.captureException(log.error, {
          extra: {
            message: log.message,
            level: log.level,
            context: log.context || {},
          },
        });
      }

      // Ensure all events are sent
      await Sentry.flush(2000);

      return NextResponse.json({ 
        success: true, 
        eventId 
      });
    }

    // In development, just log to console
    console.log(`[${log.level.toUpperCase()}] ${log.message}`, {
      ...log,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the error to Sentry
    Sentry.captureException(error, {
      tags: {
        source: 'api-logs-error',
        environment: process.env.NODE_ENV
      }
    });

    console.error("Failed to process log:", error);
    
    return NextResponse.json(
      { error: "Failed to process log" },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';