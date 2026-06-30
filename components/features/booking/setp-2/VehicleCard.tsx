"use client";

import Image from "next/image";
import { Users, Luggage, ChevronRight } from "lucide-react";
import type { PublicQuote } from "@/lib/api/quote";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CURRENCY_CODE } from "@/constants/app-default";
import { useTranslations } from "next-intl";

interface VehicleCardProps {
  quote: PublicQuote;
  isSelected?: boolean;
  isLoading: boolean;
  onContinue: (quote: PublicQuote) => void;
}

export default function VehicleCard({
  quote,
  isSelected = false,
  isLoading,
  onContinue,
}: VehicleCardProps) {
  const t = useTranslations("booking.select_vehicle.vehicle_card");
  const totalPrice = quote.priceBreakdown.totalPrice;
  const vehicleSubtitle = quote.category.vehicles.join(", ");

  return (
    <div
      className={cn(
        "group relative overflow-visible rounded-sm border transition-all duration-300 bg-gray-50 border-border",
        isSelected && "bg-white shadow-sm"
      )}
    >
      <div className="flex items-stretch gap-2 sm:gap-3 md:gap-4 md:p-4 p-2">
        <div className="relative flex-shrink-0 w-28 sm:w-32 md:w-36 lg:w-40 flex items-center justify-center bg-gray/10 rounded-md overflow-hidden p-1 md:p-1.5 min-h-[3.5rem] md:min-h-0">
          {quote.category.image ? (
            <Image
              src={quote.category.image}
              alt={quote.category.name}
              className="object-contain w-full h-auto max-h-14 md:max-h-full md:h-full md:w-auto"
              width={180}
              height={120}
            />
          ) : (
            <div className="w-full h-full min-h-[3rem] md:min-h-0 bg-gray-200 rounded" />
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex justify-between items-stretch gap-2">
            <div className="flex-1 min-w-0 flex flex-col space-y-0.5 md:space-y-1">
              <h3 className="text-sm md:text-xl font-bold leading-snug md:leading-tight">
                {quote.category.name}
              </h3>

              <div className="flex flex-wrap items-center gap-x-1.5 md:gap-x-2 gap-y-0 text-xs md:text-sm text-slate-600">
                <span className="font-medium">{t("up_to")}</span>
                <span className="font-semibold">{quote.passengers}</span>
                <Users className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" strokeWidth={2} />
                <span className="font-semibold">{quote.luggage}</span>
                <Luggage className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" strokeWidth={2} />
              </div>

              {vehicleSubtitle ? (
                <p className="text-[11px] md:text-sm text-gray-500 line-clamp-1">
                  {vehicleSubtitle}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-end justify-end flex-shrink-0 text-right">
              <span className="inline-flex items-baseline gap-1 leading-none text-foreground">
                <span className="text-xs md:text-base font-medium text-gray-700">
                  {CURRENCY_CODE}
                </span>
                <span className="text-base md:text-2xl font-bold">
                  {Number(totalPrice ?? 0).toFixed(2)}
                </span>
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">{t("total_price")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-border mx-4" />
      <div className="md:px-4 px-2 py-2">
        <Button
          loading={isLoading}
          className="rounded-sm w-full h-8.5 text-xs sm:text-sm"
          onClick={() => onContinue(quote)}
        >
          {t("continue")}
          <ChevronRight
            size={14}
            strokeWidth={4}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </Button>
      </div>
    </div>
  );
}
