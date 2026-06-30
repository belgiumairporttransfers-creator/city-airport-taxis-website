import { Inter } from "next/font/google";
import "../globals.css";
import Script from "next/script";
import Providers from "@/providers/query-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const locales: readonly string[] = routing.locales;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://city-airport-taxis.be';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'City Airport Taxis',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
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
    verification: {
      google:
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google54d71b7881544',
    },
  };
}


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
        
        {/* Google Maps API - Enterprise Loading */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
