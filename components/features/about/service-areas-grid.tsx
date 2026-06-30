"use client";
import React from "react";
import { LucideIcon } from "lucide-react";
import { ICON_COMPONENTS, IconName } from "@/constants/icon-constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ServiceAreaItem {
    icon?: IconName | LucideIcon;
    title: string;
    points: string[];
}

interface ServiceAreasGridProps {
    topText?: string;
    title: string;
    description?: string;
    items: ServiceAreaItem[];
    className?: string;
}

export default function ServiceAreasGrid({
    topText,
    title,
    description,
    items,
    className = "",
}: ServiceAreasGridProps) {
    return (
        <section className={`py-16 bg-white overflow-hidden ${className}`}>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    {topText && (
                        <span className="text-secondary font-semibold text-base mb-2 block">
                            {topText}
                        </span>
                    )}
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="service-areas-swiper !pb-20"
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index} className="!h-auto flex">
                                <div className="bg-white border border-gray-100 rounded-xl p-8 w-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300 group">
                                    <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                                        {item.icon && (
                                            <div className="text-gray-400 group-hover:text-secondary transition-colors shrink-0">
                                                {typeof item.icon === "string" ? (
                                                    (() => {
                                                        const Icon = ICON_COMPONENTS[item.icon as IconName];
                                                        return <Icon className="w-4 h-4" />;
                                                    })()
                                                ) : (
                                                    <item.icon className="w-4 h-4" />
                                                )}
                                            </div>
                                        )}
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-secondary transition-colors truncate">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <ul className="space-y-3 flex-grow">
                                        {item.points.map((point, pIndex) => (
                                            <li key={pIndex} className="flex items-start gap-3">
                                                <div className="w-1 h-1 rounded-full bg-secondary mt-2 shrink-0" />
                                                <span className="text-[10px] md:text-[11px] text-gray-500 font-bold tracking-wide uppercase leading-relaxed">
                                                    {point}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
