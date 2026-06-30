"use client";

import React, { useMemo, useState } from "react";
import { useFleetCategories } from "@/hooks/queries/use-fleet";
import { toFleetCardData } from "@/lib/api/fleets";
import FleetCard from "./fleet-card";
import FleetFilterBar from "./fleet-filter-bar";
import FleetSkeleton from "../skeletons/fleet-skeleton";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function FleetListSection() {
    const t = useTranslations("fleets");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("All");

    const { data: categories, isLoading } = useFleetCategories();

    const filterCategories = useMemo(() => {
        const cats = (categories ?? []).map((category) => ({
            id: category.id,
            name: category.name,
        }));
        return [{ id: "All", name: "All" }, ...cats];
    }, [categories]);

    const fleets = useMemo(() => {
        const items = (categories ?? []).map(toFleetCardData);
        if (selectedCategoryId === "All") {
            return items;
        }
        return items.filter((fleet) => fleet.id === selectedCategoryId);
    }, [categories, selectedCategoryId]);

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <FleetFilterBar
                    categories={filterCategories}
                    selectedCategoryId={selectedCategoryId}
                    onCategoryChange={setSelectedCategoryId}
                />
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <FleetSkeleton key={`fleet-skeleton-${index}`} />
                        ))}
                    </div>
                ) : fleets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {fleets.map((fleet) => (
                            <FleetCard key={fleet.id} fleet={fleet} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <SlidersHorizontal className="w-8 h-8 text-gray-200" />
                        </div>
                        <h3 className="text-xl font-bold text-[#003048] mb-2">{t("list.no_vehicles")}</h3>
                        <p className="text-gray-500 max-w-sm mb-8">{t("list.no_vehicles_desc")}</p>
                        <Button
                            variant="outline"
                            onClick={() => setSelectedCategoryId("All")}
                            className="rounded-xl border-gray-200"
                        >
                            {t("list.reset_filters")}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
