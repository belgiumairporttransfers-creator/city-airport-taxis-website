"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Briefcase, Luggage } from "lucide-react";
import { useBookingStore } from "@/store/use-booking-store";
import { Counter } from "@/components/ui/counter";
import { useTranslations } from "next-intl";

export const LuggageDetailsField = () => {
    const t = useTranslations("booking.passenger_details.step3");
    const { control, setValue } = useFormContext();
    const step2 = useBookingStore((state) => state.step2);

    const handLuggage = useWatch({ control, name: "handLuggage" }) || 0;
    const smallCheckedCase = useWatch({ control, name: "smallCheckedCase" }) || 0;
    const largeCheckedCase = useWatch({ control, name: "largeCheckedCase" }) || 0;

    const maxSuitcases = step2?.luggage || 0;
    return (
        <div className="space-y-2 mt-6">
            <div className="px-1">
                <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    {t("luggage_details_title")}
                </h3>
                {step2 != null && (
                <p className="pt-1 text-sm text-muted-foreground leading-relaxed">
                    {t("luggage_capacity_notice", { count: maxSuitcases })}
                </p>
            )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className=" p-3 rounded-md border border-border">
                    <Counter
                        label="Hand Luggage"
                        icon={<Briefcase size={16} className="text-primary" />}
                        value={handLuggage}
                        min={0}
                        onChange={(v) => setValue("handLuggage", v)}
                        className="w-full justify-between"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                        Hand bags, backpack
                    </p>
                </div>

                <div className=" p-3 rounded-md border border-border">
                    <Counter
                        label="Small Case"
                        icon={<Luggage size={16} className="text-primary" />}
                        value={smallCheckedCase}
                        min={0}
                        max={Math.max(0, maxSuitcases - largeCheckedCase)}
                        onChange={(v) => setValue("smallCheckedCase", v)}
                        className="w-full justify-between"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                        54cm x 45cm x 25cm
                    </p>
                </div>

                <div className=" p-3 rounded-md border border-border">
                    <Counter
                        label="Large Case"
                        icon={<Luggage size={16} className="text-primary" />}
                        value={largeCheckedCase}
                        min={0}
                        max={Math.max(0, maxSuitcases - smallCheckedCase)}
                        onChange={(v) => setValue("largeCheckedCase", v)}
                        className="w-full justify-between"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                        85cm x 55cm x 35cm
                    </p>
                </div>
            </div>


        </div>
    );
};
