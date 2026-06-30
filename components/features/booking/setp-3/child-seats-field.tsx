import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useBookingStore } from "@/store/use-booking-store";
import {
  ChildSeatsSelector,
  type ChildSeatSelection,
} from "./child-seats-selector";

interface ChildSeatsFieldProps {
  mode?: "outbound" | "return";
}

export const ChildSeatsField = ({
  mode = "outbound",
}: ChildSeatsFieldProps) => {
  const form = useFormContext();
  const bookingSettings = useBookingStore((state) => state.bookingSettings);
  const isReturnMode = mode === "return";
  const seatsName = isReturnMode ? "returnChildSeats" : "childSeats";

  // const childSeatOptions =
  //   bookingSettings?.childSeats
  //     ?.filter((seat) => seat?.isActive)
  //     .map((seat) => ({
  //       _id: seat._id,
  //       name: seat.name,
  //       price: seat.price,
  //       description: seat.description,
  //     })) ?? [];

  const selectedSeats = (useWatch({ control: form.control, name: seatsName }) || []) as ChildSeatSelection[];

  const handleSeatQuantityChange = (seatId: string, quantity: number) => {
    const currentSeats = (form.getValues(seatsName) as ChildSeatSelection[]) || [];
    const seatsWithoutCurrent = currentSeats.filter((seat) => seat.seatId !== seatId);

    form.setValue(
      seatsName,
      quantity > 0
        ? [...seatsWithoutCurrent, { seatId, quantity }]
        : seatsWithoutCurrent,
      { shouldDirty: true }
    );
  };

  // if (childSeatOptions.length === 0) return null;

  return (
    <div className="">
      <ChildSeatsSelector
        options={[]}
        selections={selectedSeats}
        onQuantityChange={handleSeatQuantityChange}
      />
    </div>
  );
};
