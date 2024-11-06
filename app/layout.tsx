// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomChat from "@/components/CustomChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "ShareFlyt",
  description: "Professional web development services",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3B82F6',
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