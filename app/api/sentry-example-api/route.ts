// app/api/sentry-example-api/route.ts
import { APIError } from "@/lib/error-handling/api-error";
import { apiHandler } from "@/lib/error-handling/error-handler";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return apiHandler(async () => {
    throw APIError.Internal("Sentry Example API Route Error");
  });
}

