"use client";

import { useEffect } from "react";
import Script from "next/script";

interface CalendlyWidgetProps {
  url: string;
}

export default function CalendlyWidget({ url }: CalendlyWidgetProps) {
  useEffect(() => {
    // Ensure Calendly is loaded
    if ((window as any).Calendly) {
      (window as any).Calendly.initInlineWidget({
        url,
        parentElement: document.getElementById("calendly-inline-widget"),
      });
    }
  }, [url]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div
        id="calendly-inline-widget"
        className="h-[700px] min-w-[320px]"
        data-auto-load="false"
      />
    </>
  );
}
