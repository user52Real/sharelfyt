import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomChat from "@/components/CustomChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SpeedInsights } from '@vercel/speed-insights/next';
import defaultMetadata from './metadata'

export const metadata: Metadata = defaultMetadata


// export const metadata: Metadata = {
//   title: "Shareflyt",
//   description: "Professional web development services",
//   manifest: "/manifest.json",
//   icons: {
//     icon: [
//       { url: "/icons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
//       { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
//       { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
//     ],
//     apple: [
//       { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
//     ],
//   },
// };

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black font-sans antialiased",
          GeistSans.className,
        )}
      >
        <ErrorBoundary>          
          <Navbar />
          <main className="flex-1" id="main-content" tabIndex={-1}>{children} <SpeedInsights /></main>
          <CustomChat />
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
