import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://city-airport-taxis.be';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/bookings/',
        '/payments/',
        '/statements/',
        '/profile/',
        '/settings/',
        '/auth/',
        '/*/dashboard/',
        '/*/bookings/',
        '/*/payments/',
        '/*/statements/',
        '/*/profile/',
        '/*/settings/',
        '/*/auth/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
