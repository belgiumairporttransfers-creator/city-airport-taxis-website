import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";
import type {
    BookingCategory,
    BookingRouteData,
    BookingStep1PersistedData,
    BookingStep2Data,
    BookingStep3Data,
    Pricing,
} from "@/store/use-booking-store";

export type CreateCheckoutSessionPayload = {
    category: BookingCategory;
    step1: BookingStep1PersistedData;
    routeData: BookingRouteData | null;
    step2: BookingStep2Data;
    step3: BookingStep3Data;
    pricing: Pricing;
};

export type CreateCheckoutSessionResponse = {
    bookingId: string;
    checkoutUrl?: string;
    amount: number;
};

export const createCheckoutSession = async (payload: CreateCheckoutSessionPayload) => {
    return api.post<CreateCheckoutSessionResponse>(API_ROUTES.CHECKOUT_SESSION, payload);
};
