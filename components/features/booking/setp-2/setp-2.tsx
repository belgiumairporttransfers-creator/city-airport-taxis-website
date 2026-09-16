"use client";

import React from "react";
import { useRouter } from "@/i18n/routing";
import { useBookingStore } from "@/store/use-booking-store";
import VehicleCard from "./VehicleCard";
import { VehicleCardSkeleton } from "../../skeletons/VehicleCardSkeleton";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useQuote } from "@/hooks/queries/use-quote";
import type { PublicQuote } from "@/lib/api/quote";

const resolveSelectedDuration = (duration: unknown): number | null => {
    if (!duration || typeof duration !== "object") return null;
    const value = Number((duration as { duration?: unknown }).duration);
    return Number.isFinite(value) && value > 0 ? value : null;
};

function Step2() {
    const hasHydrated = useHasHydrated();
    const router = useRouter();
    const { step1, routeData, step2, setStep2Data, category } = useBookingStore();
    const distance = routeData?.distance ?? 0;
    const passengers = step1?.passengers ?? 1;
    const duration = resolveSelectedDuration(routeData?.duration);
    const isHourly = category === "hourly";
    const [loadingCategoryId, setLoadingCategoryId] = React.useState<string | null>(null);

    const pickupDate = step1?.pickupDate ?? "";
    const pickupTime = step1?.pickupTime ?? "";

    const quoteParams = React.useMemo(
        () =>
            isHourly
                ? {
                      passengers,
                      category,
                      duration: duration ?? undefined,
                      pickupDate,
                      pickupTime,
                  }
                : {
                      distance,
                      passengers,
                      category,
                      pickupDate,
                      pickupTime,
                  },
        [isHourly, distance, passengers, category, duration, pickupDate, pickupTime]
    );

    const canFetchQuotes =
        Boolean(pickupDate && pickupTime) && (!isHourly || duration !== null);
    const { data: quotes, isLoading } = useQuote(quoteParams, canFetchQuotes);

    const quoteFingerprint = React.useMemo(
        () =>
            quotes
                ?.map(
                    (quote) =>
                        `${quote.categoryId}:${quote.priceBreakdown.totalPrice}:${quote.passengers}:${quote.luggage}`
                )
                .join("|") ?? "",
        [quotes]
    );

    // Always bind selection to the latest quotes: default first vehicle, never keep a stale total.
    React.useEffect(() => {
        if (!quotes?.length || isLoading) return;

        const firstSelectable =
            quotes.find((quote) => !quote.category.requestForQuote) ?? quotes[0];

        if (firstSelectable.category.requestForQuote) return;

        const matched = step2
            ? quotes.find(
                  (quote) =>
                      quote.categoryId === step2.categoryId && !quote.category.requestForQuote
              )
            : undefined;

        // Prefer first vehicle when nothing valid is selected yet.
        const nextQuote = matched ?? firstSelectable;

        if (
            !step2 ||
            step2.categoryId !== nextQuote.categoryId ||
            step2.priceBreakdown.totalPrice !== nextQuote.priceBreakdown.totalPrice ||
            step2.passengers !== nextQuote.passengers ||
            step2.luggage !== nextQuote.luggage ||
            step2.category.name !== nextQuote.category.name ||
            step2.category.image !== nextQuote.category.image
        ) {
            setStep2Data(nextQuote);
        }
    }, [quoteFingerprint, isLoading, quotes, step2, setStep2Data]);

    const handleContinue = (quote: PublicQuote) => {
        if (loadingCategoryId) return;
        setLoadingCategoryId(quote.categoryId);
        setStep2Data(quote);
        router.push("/book-ride/passenger-details");
    };

    if (!hasHydrated) return null;

    return (
        <div className="w-full flex flex-col gap-2 md:gap-4">
            {isLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                    <VehicleCardSkeleton key={`vehicle-skeleton-${index}`} isExpanded={index === 0} />
                ))}

            {!isLoading &&
                quotes?.map((quote) => (
                    <VehicleCard
                        key={quote.categoryId}
                        quote={quote}
                        isHourly={isHourly}
                        isSelected={step2?.categoryId === quote.categoryId}
                        isLoading={loadingCategoryId === quote.categoryId}
                        onContinue={handleContinue}
                    />
                ))}
        </div>
    );
}

export default Step2;
