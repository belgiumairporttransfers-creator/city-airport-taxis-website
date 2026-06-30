import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      common: (await import(`../lang/${locale}/common.json`)).default,
      home: (await import(`../lang/${locale}/home.json`)).default,
      meta: (await import(`../lang/${locale}/meta.json`)).default,
      auth: (await import(`../lang/${locale}/auth.json`)).default,
      business: (await import(`../lang/${locale}/business.json`)).default,
      about: (await import(`../lang/${locale}/about.json`)).default,
      coverage: (await import(`../lang/${locale}/coverage.json`)).default,
      contact: (await import(`../lang/${locale}/contact.json`)).default,
      legal: (await import(`../lang/${locale}/legal.json`)).default,
      fleets: (await import(`../lang/${locale}/fleets.json`)).default,
      help: (await import(`../lang/${locale}/help.json`)).default,
      faqs: (await import(`../lang/${locale}/faqs.json`)).default,
      services: (await import(`../lang/${locale}/services.json`)).default,
      airports: (await import(`../lang/${locale}/airports.json`)).default,
      booking: (await import(`../lang/${locale}/booking.json`)).default,
      dashboard: (await import(`../lang/${locale}/dashboard.json`)).default,
    }
  };
});
