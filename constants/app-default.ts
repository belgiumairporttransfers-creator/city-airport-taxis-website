export const DEFAULT_PHONE_COUNTRY = "be";
export const DEFAULT_TIMEZONE = "Europe/Brussels";
export const CURRENCY_SYMBOL = "€";
export const CURRENCY_CODE = "EUR";

export const COMPANY_NAME = "City Airport Taxis";
export const COMPANY_DESCRIPTION =
  "Elite airport transfer service in Belgium. Available 24/7 for your convenience.";

export const COMPANY_PHONE = "+32 2 520 75 26";
export const COMPANY_PHONE_HREF = "tel:+3225207526";

export const COMPANY_EMAIL = "info@cityairporttaxis.be";
export const COMPANY_EMAIL_HREF = `mailto:${COMPANY_EMAIL}`;

export const COMPANY_WHATSAPP = "32489498492";
export const COMPANY_WHATSAPP_DISPLAY = "+32 489 49 84 92";
export const COMPANY_WHATSAPP_HREF = `https://wa.me/${COMPANY_WHATSAPP}`;
export const COMPANY_REGISTRATION = "0791634024";
export const COMPANY_NTN = "BE 0791634024";

export const COMPANY_ADDRESS = "Brussels Airport, 1930 Zaventem, Belgium";

export const COMPANY_OPERATING_HOURS = "24 / 7 / 365";

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  trustpilot: "https://www.trustpilot.com/review/cityairporttaxis.be",
};

const DEFAULT_DRIVER_PORTAL_URL =
  process.env.NODE_ENV === "production"
    ? "https://driver.city-airport-taxis.be"
    : "http://localhost:3002";

export const DRIVER_PORTAL_URL = (
  process.env.NEXT_PUBLIC_DRIVER_PORTAL_URL || DEFAULT_DRIVER_PORTAL_URL
).replace(/\/$/, "");

export const DRIVER_PORTAL_LOGIN_URL = `${DRIVER_PORTAL_URL}/auth/login`;
