import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Plus, X, Edit3 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/store/use-booking-store";
import { useTranslations } from "next-intl";

interface BookingOptionsButtonsProps {
    mode?: "outbound" | "return";
}

export const BookingOptionsButtons = ({ mode = "outbound" }: BookingOptionsButtonsProps) => {
    const { control, setValue } = useFormContext();
    const isReturn = mode === "return";

    const childSeatsKey = isReturn ? "returnChildSeatsEnabled" : "childSeatsEnabled";
    const notesKey = isReturn ? "returnNotesEnabled" : "notesEnabled";

    // Watch current states
    const childSeatsEnabled = useWatch({ control, name: childSeatsKey });
    const notesEnabled = useWatch({ control, name: notesKey });

    const { bookingSettings } = useBookingStore();
    const t = useTranslations("booking.passenger_details.step3");

    const hasActiveChildSeats = Boolean(
        // bookingSettings?.childSeats?.some((seat) => seat?.isActive)
    );

    return (
        <div className={cn("grid grid-cols-1 gap-3 mb-4", hasActiveChildSeats && "sm:grid-cols-2")}>
            {hasActiveChildSeats && (
                <Button
                    type="button"
                    variant={childSeatsEnabled ? "default" : "outline"}
                    onClick={() => setValue(childSeatsKey, !childSeatsEnabled, { shouldDirty: true })}
                    className={cn(
                        "flex items-center justify-center gap-2 rounded-full text-sm font-bold w-full h-auto py-2 transition-all",
                        childSeatsEnabled
                            ? "bg-black text-white hover:bg-black/90 border-transparent shadow-sm"
                            : "text-gray-700 bg-gray-100 border-transparent hover:bg-gray-200"
                    )}
                >
                    {childSeatsEnabled ? <X size={16} /> : <Plus size={16} />}
                    <span>{t("child_seats_toggle_label", { defaultValue: "Need a child or booster seat?" })}</span>
                </Button>
            )}

            <Button
                type="button"
                variant={notesEnabled ? "default" : "outline"}
                onClick={() => setValue(notesKey, !notesEnabled, { shouldDirty: true })}
                className={cn(
                    "flex items-center justify-center gap-2 rounded-full text-sm font-bold w-full h-auto py-2 transition-all",
                    notesEnabled
                        ? "bg-black text-white hover:bg-black/90 border-transparent shadow-sm"
                        : "text-gray-700 bg-gray-100 border-transparent hover:bg-gray-200"
                )}
            >
                {notesEnabled ? <X size={16} /> : <Plus size={16} />}
                <span>{t("add_notes_toggle_label", { defaultValue: "Add notes for the driver" })}</span>
            </Button>
        </div>
    );
};
