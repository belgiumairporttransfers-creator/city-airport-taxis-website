"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IMAGES } from "@/constants/image-constants";
import DestinationCard from "../destinations/destination-card";
import { useTranslations } from "next-intl";

export default function CitiesSection() {
    const t = useTranslations("home.cities");

    const cities = [
        {
            name: t("items.karachi.name"),
            description: t("items.karachi.description"),
            image: IMAGES.CITIES.KARACHI,
            href: "/",
        },
        {
            name: t("items.lahore.name"),
            description: t("items.lahore.description"),
            image: IMAGES.CITIES.LAHORE,
            href: "/",
        },
        {
            name: t("items.islamabad.name"),
            description: t("items.islamabad.description"),
            image: IMAGES.CITIES.ISLAMABAD,
            href: "/",
        },
        {
            name: t("items.rawalpindi.name"),
            description: t("items.rawalpindi.description"),
            image: IMAGES.CITIES.RAWALPINDI,
            href: "/",
        },
    ];

    return (
        <section className="bg-primary py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                            {t("title")}
                        </h2>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                            {t("description")}
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="cities-swiper swiper-dark !p-1"
                    >
                        {cities.map((city, index) => (
                            <SwiperSlide key={index} className="!h-auto !flex">
                                <DestinationCard destination={city} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
