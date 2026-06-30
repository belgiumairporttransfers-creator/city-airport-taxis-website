"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleAmenitiesProps {
    amenities?: string[];
}

const DEFAULT_AMENITIES = [
    "Complimentary bottle of water",
    "Complimentary in-vehicle WiFi",
    "Tissues and sanitizer",
    "Android and iPhone chargers",
];

export default function VehicleAmenities({ amenities = DEFAULT_AMENITIES }: VehicleAmenitiesProps) {
    const [isOpen, setIsOpen] = useState(false);
    const hasAmenities = amenities.length > 0;

    return (
        <div>
            <button
                onClick={() => {
                    if (!hasAmenities) return;
                    setIsOpen((prev) => !prev);
                }}
                className={cn(
                    "w-full flex items-center justify-between px-3 md:px-4 py-2 transition-colors focus:outline-none",
                    hasAmenities ? "cursor-pointer" : "cursor-default"
                )}
            >
                <span className="text-sm font-semibold text-gray-900">Included Amenities</span>
                {hasAmenities ? (
                    isOpen ? (
                        <ChevronUp size={16} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0 ml-2" />
                    ) : (
                        <ChevronDown size={16} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0 ml-2" />
                    )
                ) : null}
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                    <ul className="space-y-1">
                        {amenities.map((amenity) => (
                            <li key={amenity} className="flex items-center justify-start gap-2 text-sm text-foreground/80">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mb-0.5"></div>
                                <span className="text-sm">{amenity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
