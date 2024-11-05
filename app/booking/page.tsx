import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CalendlyWidget from "@/components/CalendlyWidget";

export default function BookingPage() {
  return (
    <MaxWidthWrapper className="py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Schedule a Meeting
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Choose a convenient time for us to discuss your project.
        </p>
        <div className="mt-10">
          <CalendlyWidget url="https://calendly.com/your-username" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
