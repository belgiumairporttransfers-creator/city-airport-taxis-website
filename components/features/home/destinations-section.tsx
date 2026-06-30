"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { IMAGES } from "@/constants/image-constants";
import DestinationCard, { DestinationCardData } from "../destinations/destination-card";
import { useTranslations } from "next-intl";

const BELGIAN_AIRPORTS = [
    { key: "brussels", image: IMAGES.DESTINATIONS.BRUSSELS },
    { key: "charleroi", image: IMAGES.DESTINATIONS.CHARLEROI },
    { key: "antwerp", image: IMAGES.DESTINATIONS.ANTWERP },
    { key: "liege", image: IMAGES.DESTINATIONS.LIEGE },
    { key: "ostend", image: IMAGES.DESTINATIONS.OSTEND },
] as const;

export default function DestinationsSection() {
    const t = useTranslations("home.destinations");

    const destinations: DestinationCardData[] = BELGIAN_AIRPORTS.map(({ key, image }) => ({
        name: t(`items.${key}.name`),
        subtitle: t(`items.${key}.subtitle`),
        image,
        href: "/#book-ride-form",
        tags: [
            t(`items.${key}.tags.0`),
            t(`items.${key}.tags.1`),
            t(`items.${key}.tags.2`),
            t(`items.${key}.tags.3`),
        ],
    }));

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                    <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase">
                        {t("badge")}
                    </span>
                    <h2 className="text-2xl font-bold text-primary md:text-4xl">{t("title")}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base">
                        {t("description")}
                    </p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={destinations.length > 1}
                        autoplay={
                            destinations.length > 1
                                ? {
                                      delay: 5000,
                                      disableOnInteraction: false,
                                      pauseOnMouseEnter: true,
                                  }
                                : false
                        }
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2.5 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="destinations-swiper !-m-4 !p-4 !pb-12"
                    >
                        {destinations.map((destination) => (
                            <SwiperSlide key={destination.name} className="!flex !h-auto">
                                <DestinationCard destination={destination} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
