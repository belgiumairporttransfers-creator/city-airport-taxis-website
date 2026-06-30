"use client";

import { useForm } from "react-hook-form";
import { Mail, User } from "lucide-react";
import {
    BookingStep3Data,
    selectBookingPricing,
    useBookingStore,
    useTotalPrice,
} from "@/store/use-booking-store";
import { useCreateCheckoutSession } from "@/hooks/queries/use-checkout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/features/form/form";
import { Input } from "@/components/features/form/Input";
import { DriverNotesField } from "./driver-notes-field";
import { LuggageDetailsField } from "./luggage-details-field";
import { AirportPickupField } from "./airport-pickup-field";
import { formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import toast from "react-hot-toast";

type PassengerDetailsFormValues = BookingStep3Data;

function Step3() {
    const hasHydrated = useHasHydrated();
    const t = useTranslations("booking.passenger_details.step3");
    const { setStep3Data, routeData, step3 } = useBookingStore();
    const { mutateAsync: createCheckoutSession, isPending } = useCreateCheckoutSession();

    const isAirportRoute = routeData?.isAirportSelected ?? false;

    const form = useForm<PassengerDetailsFormValues>({
        defaultValues: {
            firstName: step3?.firstName ?? "",
            lastName: step3?.lastName ?? "",
            phone: step3?.phone ?? "",
            email: step3?.email ?? "",
            isAirportPickup: step3?.isAirportPickup ?? isAirportRoute,
            flightNumber: step3?.flightNumber ?? "",
            notes: step3?.notes ?? "",
            handLuggage: step3?.handLuggage ?? 0,
            smallCheckedCase: step3?.smallCheckedCase ?? 0,
            largeCheckedCase: step3?.largeCheckedCase ?? 0,
        },
    });
    const totalPrice = useTotalPrice();

    const handleSubmit = async (data: PassengerDetailsFormValues) => {
        setStep3Data(data);

        const state = useBookingStore.getState();
        const pricing = selectBookingPricing(state);

        if (!state.step1 || !state.step2) {
            toast.error("Please complete your trip and vehicle selection first.");
            return;
        }

        if (!pricing) {
            toast.error("Unable to calculate booking price. Please try again.");
            return;
        }

        const bookingPayload = {
            category: state.category,
            step1: state.step1,
            routeData: state.routeData,
            step2: state.step2,
            step3: data,
            pricing,
        };

        await createCheckoutSession(bookingPayload);
    };

    if (!hasHydrated) return null;

    return (
        <div className="flex flex-col animate-in fade-in duration-500 md:border border-border rounded-lg md:shadow-md p-2 md:p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col">
                    <div className="">
                        <h3 className="text-xl font-semibold text-gray-900 tracking-tight px-1 mb-3">
                            {t("your_details")}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                            <Input
                                name="firstName"
                                placeholder={t("first_name")}
                                icon={<User size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="lastName"
                                placeholder={t("last_name")}
                                icon={<User size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder={t("email")}
                                icon={<Mail size={16} className="text-gray-400" />}
                                required
                            />
                            <Input
                                name="phone"
                                type="phone"
                                placeholder={t("phone")}
                                required
                            />
                        </div>

                        {isAirportRoute && <AirportPickupField />}
                    </div>

                    <LuggageDetailsField />

                    <div className="mt-4">
                        <DriverNotesField />
                    </div>

                    <Button type="submit" className="mt-4" disabled={isPending}>
                        {t("proceed_to_pay")} — {formatPrice(totalPrice)}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Step3;
