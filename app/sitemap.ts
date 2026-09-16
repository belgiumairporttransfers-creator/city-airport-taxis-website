import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://city-airport-taxis.be';

const airportRoutes = [
  '/airport-transfers',
  '/brussels-city',
  '/antwerp-city',
  '/ghent-city',
  '/bruges-city',
  '/brussels-to-maastricht',
  '/amsterdam-city',
  '/paris-city',
  '/luxembourg-city',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/contact-us',
    '/fleets',
    '/help-desk',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer',
    '/partner-with-us',
    '/corporate-travel-solutions',
    '/airline-crew',
    '/airport-transfer',
    '/cargo-crew-transportation',
    '/city-rides',
    '/hourly-ride',
    '/private-jet-transfer',
    ...airportRoutes,
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      alternates[locale] = `${baseUrl}/${locale}${route}`;
    }

    alternates['x-default'] = `${baseUrl}/${routing.defaultLocale}${route}`;

    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route.includes('transfer') || route.includes('ride') ? 0.8 : 0.5,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
