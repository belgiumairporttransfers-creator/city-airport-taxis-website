"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Plane } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/features/form/Input";
import { Switch } from "@/components/features/form/switch";
import { useBookingStore, type BookingStep3Data } from "@/store/use-booking-store";
import { formatPrice } from "@/lib/utils";

export const AirportPickupField = () => {
    const t = useTranslations("booking.passenger_details.step3");
    const { control, setValue, getValues } = useFormContext();
    const setStep3Data = useBookingStore((state) => state.setStep3Data);
    const airportPickupPrice = useBookingStore(
        (state) => state.bookingSettings?.airportPickup ?? 0
    );

    const isAirportPickup = useWatch({ control, name: "isAirportPickup" });

    const syncAirportPickup = React.useCallback(
        (checked: boolean) => {
            setStep3Data({ ...(getValues() as BookingStep3Data), isAirportPickup: checked });
        },
        [getValues, setStep3Data]
    );

    React.useEffect(() => {
        syncAirportPickup(Boolean(isAirportPickup));
    }, [isAirportPickup, syncAirportPickup]);

    React.useEffect(() => {
        if (!isAirportPickup) {
            setValue("flightNumber", "", { shouldDirty: true });
        }
    }, [isAirportPickup, setValue]);

    return (
        <div className="mt-4 rounded-md border border-border bg-gray-50/50 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                            {t("airport_pickup_label")}
                        </p>
                        {airportPickupPrice > 0 && (
                            <span className="text-sm font-medium text-primary">
                                +{formatPrice(airportPickupPrice)}
                            </span>
                        )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {t("airport_pickup_description")}
                    </p>
                </div>
                <Switch
                    checked={Boolean(isAirportPickup)}
                    onCheckedChange={(checked) =>
                        setValue("isAirportPickup", checked, { shouldDirty: true })
                    }
                />
            </div>

            {isAirportPickup && (
                <div className="mt-3">
                    <Input
                        icon={<Plane size={16} className="text-gray-400" />}
                        name="flightNumber"
                        type="text"
                        placeholder="e.g. LH1868"
                        required
                    />
                </div>
            )}
        </div>
    );
};
