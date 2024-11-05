import { NextResponse } from 'next/server';
import { APIError } from './api-error';
import * as Sentry from '@sentry/nextjs';

export async function apiHandler(handler: () => Promise<NextResponse>) {
  try {
    return await handler();
  } catch (error) {
    if (error instanceof APIError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          errors: error.errors,
        },
        { status: error.statusCode }
      );
    }

    Sentry.captureException(error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}