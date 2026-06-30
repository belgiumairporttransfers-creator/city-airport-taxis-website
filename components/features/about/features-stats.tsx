"use client";

import React from "react";
import { Sparkles, Clock, Armchair, ShieldCheck, Calendar, Users, Plane, MapPin, LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
    sparkles: Sparkles,
    clock: Clock,
    armchair: Armchair,
    shieldCheck: ShieldCheck,
    calendar: Calendar,
    users: Users,
    plane: Plane,
    mapPin: MapPin,
};

interface StatItem {
    icon: string | LucideIcon;
    title: string;
    description: string;
}

interface FeaturesStatsProps {
    items?: StatItem[];
    className?: string;
}

const DEFAULT_STATS: StatItem[] = [
    { icon: "sparkles", title: "Excellence", description: "In Every Detail" },
    { icon: "clock", title: "Reliability", description: "Always On Time" },
    { icon: "armchair", title: "Comfort", description: "First Class Experience" },
    { icon: "shieldCheck", title: "Privacy", description: "Guaranteed Discretion" },
];

export default function FeaturesStats({ items = DEFAULT_STATS, className = "" }: FeaturesStatsProps) {
    return (
        <section className={`bg-[#0A0A0A] py-8 sm:py-10 border-b border-white/5 ${className}`}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {items.map((item, index) => {
                        const IconComponent = typeof item.icon === "string" ? ICON_MAP[item.icon] || Sparkles : item.icon;
                        
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center lg:flex-row lg:items-center gap-3 lg:gap-4 group cursor-default"
                            >
                                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-14 lg:h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-secondary/40 group-hover:bg-secondary/5">
                                    <IconComponent className="w-6 h-6 text-secondary transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <h3 className="text-white font-bold text-base sm:text-lg lg:text-lg leading-tight text-center lg:text-left transition-colors duration-300 group-hover:text-secondary/90">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm  font-semibold mt-1 text-center lg:text-left">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}