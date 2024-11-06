import { Metadata } from 'next'

const defaultMetadata: Metadata = {
  metadataBase: new URL('https://shareflyt.xyz'),
  title: {
    default: 'ShareFlyt - Professional Web Development & Digital Solutions',
    template: '%s | ShareFlyt'
  },
  description: 'Expert web development, mobile app development, and cloud solutions in Amsterdam. Custom software development with modern technologies like React, Next.js, and Cloud Services.',
  keywords: [
    'web development',
    'mobile app development',
    'cloud solutions',
    'React developer',
    'Next.js development',
    'Amsterdam web developer',
    'custom software development',
    'professional web services',
    'digital solutions',
    'IT consulting'
  ],
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
    title: 'ShareFlyt - Professional Web Development & Digital Solutions',
    description: 'Expert web development and digital solutions in Amsterdam. Specializing in custom software, mobile apps, and cloud services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShareFlyt - Web Development Solutions'
      }
    ]
  },  
  alternates: {
    canonical: 'https://shareflyt.xyz',
    languages: {
      'en-US': 'https://shareflyt.xyz',
      'nl-NL': 'https://shareflyt.xyz/nl'
    }
  },
  verification: {
    google: 'qlvYdqcefjASHWfvGkw4CMp_dL0hIm5ohc5AOkQaWZk',
  }
}

export default defaultMetadata


