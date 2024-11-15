import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomChat from "@/components/CustomChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cookies, headers } from 'next/headers';
import { NonceProvider } from '@/components/providers/NonceProvider';
import { getMessages, getLocale, getNow, getTimeZone } from 'next-intl/server';
import IntlProvider from '@/components/providers/IntlProvider';

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

export type Locale = 'en' | 'nl';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nonce = headers().get('x-nonce') || '';
  const locale = await getLocale();
  const messages = await getMessages();
  const now = await getNow();
  const timeZone = await getTimeZone();

  return (
    <html lang={locale} className='dark'>     
      <head>
        <meta name="google-site-verification" content="qlvYdqcefjASHWfvGkw4CMp_dL0hIm5ohc5AOkQaWZk" />
      </head>
      <body
        className={cn(
          "min-h-screen flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black font-sans antialiased",
          GeistSans.className,
        )}
      >
        <IntlProvider 
          locale={locale} 
          messages={messages as any}
          timeZone={timeZone}
          now={now}
        >
          <NonceProvider nonce={process.env.NONCE || ''}>
            <ErrorBoundary>          
              <div className="fixed left-0 right-0 top-0 z-[100]">
                <Navbar />
              </div>
              <main className="flex-1 pt-16" id="main-content" tabIndex={-1}>
                {children}
              </main>
              <CustomChat />
              <Footer />
            </ErrorBoundary>
          </NonceProvider>
        </IntlProvider>        
      </body>
    </html>
  );
}