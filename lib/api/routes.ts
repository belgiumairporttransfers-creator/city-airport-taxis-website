export const API_ROUTES = {
    AUTH_REGISTER: `/api/auth/register`,
    AUTH_LOGIN: `/api/auth/login`,
    AUTH_LOGOUT: `/api/auth/logout`,
    AUTH_FORGOT_PASSWORD: `/api/auth/forgot-password`,
    AUTH_RESET_PASSWORD: `/api/auth/reset-password`,
    AUTH_REFRESH: `/api/auth/refresh`,
    AUTH_ME: `/api/auth/me`,
    AUTH_LOGOUT_ALL: `/api/auth/logout-all`,
    PUBLIC_SETTINGS: `/api/settings/public`,
    NEWSLETTER_SUBSCRIBE: `/api/newsletter`,
    QUOTE: `/api/vehicle-pricing/quote`,
    VEHICLE_CATEGORIES: `/api/vehicle-categories`,
    BOOKINGS: `/api/bookings`,
    PAYMENTS: `/api/payments`,
    CHECKOUT_SESSION: `/api/bookings`,
    UPLOAD: `/api/upload`,
} as const;
export default API_ROUTES;