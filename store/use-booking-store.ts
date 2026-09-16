import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// =============== TYPES ===============

export type BookingCategory = 'one-way' | 'hourly' | 'return-trip';

export type PricingBreakdown = {
    totalVehicleFare: number;
    airportPickupPrice: number;
};

export type Pricing = {
    total: number;
    breakdown: PricingBreakdown;
};

export interface BookingStep1PersistedData {
    pickupAddress: string;
    deliveryAddress: string;
    pickupDate: string;
    pickupTime: string;
    returnDate?: string;
    returnTime?: string;
    passengers: number;
}

export interface BookingRouteData {
    distance?: number;
    durationMinutes?: number;
    estTime?: string;
    isAirportSelected?: boolean;
    duration?: unknown;
}

export interface BookingStep2Data {
    categoryId: string;
    category: {
        name: string;
        image?: string;
        vehicles: string[];
        requestForQuote: boolean;
    };
    priceBreakdown: {
        totalPrice: number;
        includedDistance?: number;
        extraDistancePrice?: number;
    };
    passengers: number;
    luggage: number;
}

export interface BookingStep3Data {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isAirportPickup: boolean;
    flightNumber?: string;
    notes?: string;
    handLuggage: number;
    smallCheckedCase: number;
    largeCheckedCase: number;
    paymentMethod: 'mollie' | 'pay_onboard';
}

export interface BookingSettingsSnapshot {
    airportPickup?: number;
}

// =============== STATE ===============

interface BookingState {
    category: BookingCategory;
    step1: BookingStep1PersistedData | null;
    routeData: BookingRouteData | null;
    step2: BookingStep2Data | null;
    step3: BookingStep3Data | null;
    bookingSettings: Partial<BookingSettingsSnapshot> | null;

    setCategory: (category: BookingCategory) => void;
    setStep1Data: (data: BookingStep1PersistedData) => void;
    setRouteData: (data: BookingRouteData | null) => void;
    setStep2Data: (data: BookingStep2Data | null) => void;
    setStep3Data: (data: BookingStep3Data | null) => void;
    setBookingSettings: (settings: Partial<BookingSettingsSnapshot>) => void;

    clearStep1: () => void;
    clearRouteData: () => void;
    resetAll: () => void;
}

type PersistedBookingState = Pick<
    BookingState,
    'category' | 'step1' | 'routeData' | 'step2' | 'step3' | 'bookingSettings'
>;

const BOOKING_STORAGE_VERSION = 2;

const isSameStep1Trip = (
    current: BookingStep1PersistedData | null,
    next: BookingStep1PersistedData
) =>
    Boolean(
        current &&
            current.pickupAddress === next.pickupAddress &&
            current.deliveryAddress === next.deliveryAddress &&
            current.pickupDate === next.pickupDate &&
            current.pickupTime === next.pickupTime &&
            current.returnDate === next.returnDate &&
            current.returnTime === next.returnTime &&
            current.passengers === next.passengers
    );

const isSameRouteQuote = (
    current: BookingRouteData | null,
    next: BookingRouteData | null
) => {
    if (!current && !next) return true;
    if (!current || !next) return false;

    return (
        current.distance === next.distance &&
        current.durationMinutes === next.durationMinutes &&
        JSON.stringify(current.duration ?? null) === JSON.stringify(next.duration ?? null)
    );
};

// =============== STORE ===============

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            category: 'one-way',
            step1: null,
            routeData: null,
            step2: null,
            step3: null,
            bookingSettings: null,

            setCategory: (category) =>
                set((state) => {
                    const preserveBooking =
                        state.step1 &&
                        (state.category === 'one-way' ||
                            state.category === 'return-trip') &&
                        (category === 'one-way' || category === 'return-trip');

                    if (preserveBooking) {
                        // Trip type change still invalidates vehicle quote/price.
                        return { category, step2: null, step3: null };
                    }

                    return {
                        category,
                        step1: null,
                        routeData: null,
                        step2: null,
                        step3: null,
                    };
                }),

            setStep1Data: (data) =>
                set((state) => {
                    if (isSameStep1Trip(state.step1, data)) {
                        return { step1: data };
                    }

                    return {
                        step1: data,
                        step2: null,
                        step3: null,
                    };
                }),

            setRouteData: (data) =>
                set((state) => {
                    if (isSameRouteQuote(state.routeData, data)) {
                        return { routeData: data };
                    }

                    return {
                        routeData: data,
                        step2: null,
                        step3: null,
                    };
                }),

            setStep2Data: (data) =>
                set((state) => ({
                    step2: data,
                    // Keep passenger details when only refreshing the same vehicle quote.
                    step3:
                        data && state.step2?.categoryId === data.categoryId
                            ? state.step3
                            : null,
                })),

            setStep3Data: (data) => set({ step3: data }),

            setBookingSettings: (settings) =>
                set((state) => ({
                    bookingSettings: {
                        ...(state.bookingSettings ?? {}),
                        ...settings,
                    },
                })),

            clearStep1: () => set({ step1: null }),

            clearRouteData: () => set({ routeData: null }),

            resetAll: () =>
                set({
                    category: 'one-way',
                    step1: null,
                    routeData: null,
                    step2: null,
                    step3: null,
                    bookingSettings: null,
                }),
        }),
        {
            name: 'city-airport-taxi-booking-storage',
            version: BOOKING_STORAGE_VERSION,
            storage: createJSONStorage(() => localStorage),

            partialize: (state): PersistedBookingState => ({
                category: state.category,
                step1: state.step1,
                routeData: state.routeData,
                step2: state.step2,
                step3: state.step3,
                bookingSettings: state.bookingSettings,
            }),

            migrate: (persistedState, version) => {
                const state = (persistedState ?? {}) as Partial<PersistedBookingState>;

                // Drop stale vehicle quotes so the sidebar never shows an old total.
                if (version < BOOKING_STORAGE_VERSION) {
                    return {
                        category: state.category ?? 'one-way',
                        step1: state.step1 ?? null,
                        routeData: state.routeData ?? null,
                        step2: null,
                        step3: null,
                        bookingSettings: state.bookingSettings ?? null,
                    };
                }

                return {
                    category: state.category ?? 'one-way',
                    step1: state.step1 ?? null,
                    routeData: state.routeData ?? null,
                    step2: state.step2 ?? null,
                    step3: state.step3 ?? null,
                    bookingSettings: state.bookingSettings ?? null,
                };
            },
        }
    )
);

// =============== PRICE ENGINE ===============

export const calculatePricing = (state: BookingState): Pricing | null => {
    const { step2, bookingSettings, step1, step3 } = state;

    if (!step2 || !bookingSettings || !step1) return null;

    const totalVehicleFare = step2.priceBreakdown.totalPrice ?? 0;
    const airportPickupPrice =
        step3?.isAirportPickup && (bookingSettings.airportPickup || 0) > 0
            ? bookingSettings.airportPickup || 0
            : 0;

    return {
        total: totalVehicleFare + airportPickupPrice,
        breakdown: {
            totalVehicleFare,
            airportPickupPrice,
        },
    };
};

// =============== SELECTORS ===============

export const selectBookingPricing = (state: BookingState) => calculatePricing(state);

export const useTotalPrice = () =>
    useBookingStore((state) => calculatePricing(state)?.total ?? null);

export const useBookingPricing = () => useBookingStore(selectBookingPricing);

export const useIsBookingReady = () =>
    useBookingStore((state) =>
        Boolean(state.step1 && state.step2 && state.step3)
    );
