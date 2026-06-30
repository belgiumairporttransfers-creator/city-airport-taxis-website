"use client";

import { MapPin, Car, CreditCard, MoveRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";

export interface ProcessStep {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface ProcessSectionProps {
    topText?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    steps?: ProcessStep[];
    buttonText?: string;
    buttonLink?: string;
}

export default function ProcessSection({
    topText,
    title,
    description,
    steps,
    buttonText,
    buttonLink = "/",
}: ProcessSectionProps = {}) {
    const t = useTranslations("home.process");

    const defaultSteps: ProcessStep[] = [
        {
            id: t("steps.step1.id"),
            title: t("steps.step1.title"),
            description: t("steps.step1.description"),
            icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-secondary" strokeWidth={1.5} />,
        },
        {
            id: t("steps.step2.id"),
            title: t("steps.step2.title"),
            description: t("steps.step2.description"),
            icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-secondary" strokeWidth={1.5} />,
        },
        {
            id: t("steps.step3.id"),
            title: t("steps.step3.title"),
            description: t("steps.step3.description"),
            icon: <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-secondary" strokeWidth={1.5} />,
        },
    ];

    const displayTitle = title || t("title");
    const displayDescription = description || t("description");
    const displaySteps = steps || defaultSteps;
    const displayButtonText = buttonText || t("button");

    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-4xl">
                        {topText && (
                            <span className="text-secondary font-bold text-xs tracking-wider uppercase mb-3 block">
                                {topText}
                            </span>
                        )}
                        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
                            {displayTitle}
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                            {displayDescription}
                        </p>
                    </div>
                    <div className="md:pb-2 hidden md:block">
                        {displayButtonText && buttonLink && (
                            <Link
                                href={buttonLink}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                {displayButtonText}
                                <MoveRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-[56px] left-0 right-0 h-[1px] border-t border-dashed border-gray-200 z-0" />

                    <div className="relative z-10 w-full">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 0,
                                    allowTouchMove: false
                                },
                            }}
                            className="process-swiper"
                        >
                            {displaySteps.map((step, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div className="flex flex-col items-center text-center group md:px-4 py-4">
                                            {/* Icon Container */}
                                            <div className="relative mb-10">
                                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center border border-gray-100 relative z-10 transform transition-all duration-500 group-hover:border-secondary/20 group-hover:scale-105 shadow-sm">
                                                    {step.icon}
                                                </div>
                                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm z-20">
                                                    <span className="text-[10px] md:text-xs font-bold text-primary whitespace-nowrap">
                                                        {step.id}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-xl font-bold text-primary mb-3 tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-[320px]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
