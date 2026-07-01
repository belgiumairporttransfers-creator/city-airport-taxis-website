export const API_ROUTES = {
    AUTH_REGISTER: `/auth/register`,
    AUTH_LOGIN: `/auth/login`,
    AUTH_LOGOUT: `/auth/logout`,
    AUTH_FORGOT_PASSWORD: `/auth/forgot-password`,
    AUTH_RESET_PASSWORD: `/auth/reset-password`,
    AUTH_REFRESH: `/auth/refresh`,
    AUTH_ME: `/auth/me`,
    AUTH_LOGOUT_ALL: `/auth/logout-all`,
    PUBLIC_SETTINGS: `/settings/public`,
    NEWSLETTER_SUBSCRIBE: `/newsletter`,
    QUOTE: `/vehicle-pricing/quote`,
    VEHICLE_CATEGORIES: `/vehicle-categories`,
    BOOKINGS: `/bookings`,
    PAYMENTS: `/payments`,
    CHECKOUT_SESSION: `/bookings`,
    UPLOAD: `/upload`,
} as const;
export default API_ROUTES;