export const siteConfig = {
    name: 'Shareflyt',
    description: 'Your site description',
    urls: {
      home: '/',
      about: '/about',
      contact: '/contact',
    },
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      endpoints: {
        contact: '/api/contact',
        auth: '/api/auth',
      },
    },
    theme: {
      colors: {
        primary: '#0070f3',
        secondary: '#00f7ff',
      },
      spacing: {
        page: {
          x: 'px-4 sm:px-6 lg:px-8',
          y: 'py-6 sm:py-8 lg:py-12',
        },
      },
    },
} as const;
  
export type SiteConfig = typeof siteConfig;[6]