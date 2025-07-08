import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || 'en';
  const messages = (await import(`../locales/${currentLocale}.json`)).default;
  return {
    locale: currentLocale,
    messages,
    getMessage: (key: string) => messages[key],
  };
});
