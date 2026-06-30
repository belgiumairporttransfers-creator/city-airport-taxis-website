import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getPublicSettings } from "./lib/api/settings";

const intlMiddleware = createMiddleware(routing);

function getLocaleFromPathname(pathname: string) {
  const segment = pathname.split("/")[1];

  return routing.locales.includes(segment as (typeof routing.locales)[number])
    ? segment
    : routing.defaultLocale;
}

function isMaintenancePath(pathname: string) {
  return routing.locales.some((locale) => {
    const path = `/${locale}/maintinance`;
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

function isComingSoonPath(pathname: string) {
  return routing.locales.some((locale) => {
    const path = `/${locale}/comming-soon`;
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

const MAINTENANCE_ALLOWED_SEGMENTS = [
  "maintinance",
  "contact-us",
  "privacy-policy",
  "help-desk",
];

function isAllowedDuringMaintenance(pathname: string) {
  if (isMaintenancePath(pathname)) {
    return true;
  }

  return routing.locales.some((locale) =>
    MAINTENANCE_ALLOWED_SEGMENTS.some((segment) => {
      const path = `/${locale}/${segment}`;
      return pathname === path || pathname.startsWith(`${path}/`);
    })
  );
}

const MAINTENANCE_FALLBACK = {
  maintenanceMode: true,
  comingSoonMode: false,
} as const;

async function loadSettings() {
  try {
    const settings = await getPublicSettings();
    if (!settings) {
      return MAINTENANCE_FALLBACK;
    }

    return {
      maintenanceMode: settings.maintenanceMode ?? false,
      comingSoonMode: settings.comingSoonMode ?? false,
    };
  } catch {
    return MAINTENANCE_FALLBACK;
  }
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPathname(pathname);
  const onMaintenancePage = isMaintenancePath(pathname);
  const onComingSoonPage = isComingSoonPath(pathname);
  const settings = await loadSettings();

  if (settings.maintenanceMode && !isAllowedDuringMaintenance(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/maintinance`;
    return NextResponse.redirect(url);
  }

  if (
    settings.comingSoonMode &&
    !settings.maintenanceMode &&
    !onComingSoonPage
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/comming-soon`;
    return NextResponse.redirect(url);
  }

  if (!settings.maintenanceMode && onMaintenancePage) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  if (
    !settings.comingSoonMode &&
    !settings.maintenanceMode &&
    onComingSoonPage
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|static|.*\\..*).*)"],
};
