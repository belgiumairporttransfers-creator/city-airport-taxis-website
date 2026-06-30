"use client";

import React from "react";
import { useRouter } from "@/i18n/routing";
import { useBookingStore } from "@/store/use-booking-store";
import VehicleCard from "./VehicleCard";
import { VehicleCardSkeleton } from "../../skeletons/VehicleCardSkeleton";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { useQuote } from "@/hooks/queries/use-quote";
import type { PublicQuote } from "@/lib/api/quote";

function Step2() {
    const hasHydrated = useHasHydrated();
    const router = useRouter();
    const { step1, routeData, step2, setStep2Data, category } = useBookingStore();
    const distance = routeData?.distance ?? 0;
    const passengers = step1?.passengers ?? 1;
    const [loadingCategoryId, setLoadingCategoryId] = React.useState<string | null>(null);

    const { data: quotes, isLoading } = useQuote({ distance, passengers, category });

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
                        isSelected={step2?.categoryId === quote.categoryId}
                        isLoading={loadingCategoryId === quote.categoryId}
                        onContinue={handleContinue}
                    />
                ))}
        </div>
    );
}

export default Step2;
