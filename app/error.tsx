"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { logger } from "@/lib/logger";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Application error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Something went wrong!
      </h2>
      <p className="mt-4 text-gray-400 sm:text-xl">
        An unexpected error occurred. We&apos;ve been notified and are working
        to fix it.
      </p>
      <div className="mt-8 flex space-x-4">
        <Button onClick={reset}>Try again</Button>
        <Button asChild variant="outline">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}
