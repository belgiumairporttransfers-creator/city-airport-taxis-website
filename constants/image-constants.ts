/**
 * Site image paths. Add files under public/assets/images/ (matching paths below).
 */
export const IMAGES = {
    /** Home page — public/assets/images/home/ */
    WHY_CHOOSE_US: "/assets/images/home/why-choose-us.png",
    CORPORATE_TRANSPORTATION: "/assets/images/home/corporate-transportation.png",
    SAFETY_RELIABILITY: "/assets/images/home/safety-reliability.png",
    BOOK_AIRPORT_TRANSFER: "/assets/images/home/book-airport-transfer.png",
    PAYMENT_METHODS: "/assets/images/home/payment-methods.png",
    CTA_BANNER: "/assets/images/home/cta-banner.png",

    SERVICES: {
        AIRPORT_TRANSFERS: "/assets/images/home/services/airport-transfers.png",
        HOURLY_TAXI: "/assets/images/home/services/hourly-taxi.png",
        EVENT_TRANSPORT: "/assets/images/home/services/event-transport.png",
        CORPORATE_TRANSFERS: "/assets/images/home/services/corporate-transfers.png",
        EMBASSY_DELEGATION: "/assets/images/home/services/embassy-delegation.png",
    },

    DESTINATIONS: {
        BRUSSELS: "/assets/images/home/destinations/brussels.png",
        CHARLEROI: "/assets/images/home/destinations/charleroi.png",
        ANTWERP: "/assets/images/home/destinations/antwerp.png",
        LIEGE: "/assets/images/home/destinations/liege.png",
        OSTEND: "/assets/images/home/destinations/ostend.png",
    },

    CITIES: {
        PARIS: "/assets/images/home/cities/paris.png",
        LUXEMBOURG: "/assets/images/home/cities/luxembourg.png",
        ANTWERP: "/assets/images/home/cities/antwerp.png",
        BRUSSELS: "/assets/images/home/cities/brussels.png",
        GHENT: "/assets/images/home/cities/ghent.png",
        LIEGE: "/assets/images/home/cities/liege.png",
    },

    PARTNERS: {
        GBTA: "/assets/images/home/partners/gbta.png",
        TRAVEL_AWARDS: "/assets/images/home/partners/travel-awards.png",
        EVENTS: "/assets/images/home/partners/events.png",
        NLA: "/assets/images/home/partners/nla.png",
        GNET: "/assets/images/home/partners/gnet.png",
    },

    /** About page — public/assets/images/about/ */
    ABOUT: {
        BANNER: "/assets/images/about/banner.png",
        STORY: "/assets/images/about/story.png",
        DRIVERS_PANEL: "/assets/images/about/drivers-panel.png",
        NATIONWIDE_COVERAGE: "/assets/images/about/nationwide-coverage.png",
    },

    /** Contact page — public/assets/images/contact/ */
    CONTACT: {
        BANNER: "/assets/images/contact/banner.png",
        SERVICE_LOCATIONS: "/assets/images/contact/service-locations.png",
    },
} as const;
