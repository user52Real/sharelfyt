import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
        404 - Page Not Found
      </h2>
      <p className="mt-4 text-gray-400 sm:text-xl">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go back home</Link>
      </Button>
    </MaxWidthWrapper>
  );
}
