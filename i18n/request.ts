import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // You can get the locale from a cookie, header, or user settings
  const locale = 'en'; // Default locale
  
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});