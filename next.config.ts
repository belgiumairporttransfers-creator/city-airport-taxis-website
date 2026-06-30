import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './i18n/request.ts'
);

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      ...(["lh3", "lh4", "lh5", "lh6"] as const).map((sub) => ({
        protocol: "https" as const,
        hostname: `${sub}.googleusercontent.com`,
        pathname: "/**",
      })),
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
