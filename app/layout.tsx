import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomChat from "@/components/CustomChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import { NonceProvider } from '@/components/providers/NonceProvider';

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
  const nonce = headers().get('x-nonce') || '';

  return (
    <html lang="en" className="dark">
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.__NONCE__ = "${nonce}";`,
          }}
        />
        <script 
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {}
            `
          }} 
        />
      </head>      */}
      <body
        className={cn(
          "flex min-h-screen flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black font-sans antialiased",
          GeistSans.className,
        )}
      >
        <NonceProvider nonce={nonce}>
          <ErrorBoundary>          
            <Navbar />
            <main className="flex-1" id="main-content" tabIndex={-1}>
              {children}
              {/* <SpeedInsights /> */}
            </main>
            <CustomChat />
            <Footer />
          </ErrorBoundary>
        </NonceProvider>        
      </body>
    </html>
  );
}