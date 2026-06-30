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
    };
    priceBreakdown: {
        totalPrice: number;
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
}

export interface BookingSettingsSnapshot {
    stopFee?: number;
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
                        return { category };
                    }

                    return {
                        category,
                        step1: null,
                        routeData: null,
                        step2: null,
                        step3: null,
                    };
                }),

            setStep1Data: (data) => set({ step1: data }),

            setRouteData: (data) => set({ routeData: data }),

            setStep2Data: (data) =>
                set({
                    step2: data,
                    step3: null,
                }),

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
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({
                category: state.category,
                step1: state.step1,
                routeData: state.routeData,
                step2: state.step2,
                step3: state.step3,
                bookingSettings: state.bookingSettings,
            }),
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
    useBookingStore((state) => calculatePricing(state)?.total ?? 0);

export const useBookingPricing = () => useBookingStore(selectBookingPricing);

export const useIsBookingReady = () =>
    useBookingStore((state) =>
        Boolean(state.step1 && state.step2 && state.step3)
    );
