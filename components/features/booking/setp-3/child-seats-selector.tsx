import { cn } from "@/lib/utils";
import { Baby, Car, AlertCircle, Info } from "lucide-react";
import { Counter } from "../../form/counter";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export interface ChildSeatSelection {
  seatId: string;
  quantity: number;
}

export interface ChildSeatOption {
  _id: string;
  name: string;
  price: number;
  description?: string;
}

interface ChildSeatsSelectorProps {
  options: ChildSeatOption[];
  selections: ChildSeatSelection[];
  onQuantityChange: (seatId: string, quantity: number) => void;
  className?: string;
}

export const ChildSeatsSelector = ({
  options,
  selections,
  onQuantityChange,
  className,
}: ChildSeatsSelectorProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {options.map((seat) => {
        const selectedSeat = selections.find((item) => item.seatId === seat._id);
        const quantity = selectedSeat?.quantity ?? 0;
        const isBooster = seat.name.toLowerCase().includes("booster");

        return (
          <div
            key={seat._id}
            className="rounded-sm border border-border flex flex-col md:flex-row md:items-center justify-between overflow-hidden bg-white"
          >
            <div className="flex items-center gap-3 p-3 md:p-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                <span className="text-xl">{isBooster ? "💺" : "👶"}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 leading-none">{seat.name}</span>
                  {seat.price === 0 ? (
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                      FREE
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-secondary">
                      ({formatPrice(seat.price)})
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-tight">
                  {seat.description || "Age-appropriate safety seat for your journey."}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto md:p-3">
              <Counter
                value={quantity}
                onChange={(val) => onQuantityChange(seat._id, val)}
                min={0}
                max={5}
                className="h-10 w-full md:w-[120px] rounded-none rounded-b-sm border-x-0 border-b-0 md:border md:rounded-sm"
              />
            </div>
          </div>

        );
      })}

      <div className=" space-y-2">
        <div className="bg-orange-50 border border-orange-100 rounded-sm p-2 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-orange-800 leading-relaxed">
            You can select a maximum of 5 child/booster seats per booking. If you need more, please{" "}
            <Link href="/contact-us" className="font-bold underline cursor-pointer">contact our customer service</Link> after booking.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 px-1">
          <Info className="w-4 h-4 text-gray-400" />
          <span>Please note age & weight in "driver notes" for proper equipment.</span>
        </div>
      </div>
    </div>
  );
};
