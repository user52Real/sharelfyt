import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  title: {
    default: 'ShareFlyt - Web Development Solutions',
    template: '%s | ShareFlyt'
  },
  description: 'Professional web development and IT consulting services in Amsterdam',
  keywords: ['web development', 'IT consulting', 'Next.js', 'React', 'Amsterdam'],
  authors: [{ name: 'ShareFlyt' }],
  creator: 'ShareFlyt',
  publisher: 'ShareFlyt',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shareflyt.xyz',
    siteName: 'ShareFlyt',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShareFlyt - Web Development Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shareflyt',
    creator: '@shareflyt'
  },
  verification: {
    google: 'your-google-verification-code',
  }
}

export default defaultMetadata