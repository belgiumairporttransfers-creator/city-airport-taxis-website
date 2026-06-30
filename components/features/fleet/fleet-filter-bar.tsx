"use client";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

interface FleetFilterBarProps {
    categories: { id: string; name: string }[];
    selectedCategoryId: string;
    onCategoryChange: (id: string) => void;
}

export default function FleetFilterBar({
    categories,
    selectedCategoryId,
    onCategoryChange
}: FleetFilterBarProps) {
    return (
        <div className="flex items-center justify-between gap-6 mb-12 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 w-full sm:w-auto">
                {categories?.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap cursor-pointer",
                            selectedCategoryId === category.id
                                ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                                : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                        )}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors shrink-0">
                <SlidersHorizontal className="w-5 h-5" />
            </button>
        </div>
    );
}
