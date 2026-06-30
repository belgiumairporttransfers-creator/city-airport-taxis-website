"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ServiceCard, { ServiceCardData } from "../services/service-card";
import { useTranslations } from "next-intl";

export default function ServicesSection() {
    const t = useTranslations("home.services");

    const services: ServiceCardData[] = [
        {
            title: t("items.airport_pickups.title"),
            audiences: t.raw("items.airport_pickups.audiences") as string[],
        },
        {
            title: t("items.airport_drop_off.title"),
            audiences: t.raw("items.airport_drop_off.audiences") as string[],
        },
        {
            title: t("items.executive_transportation.title"),
            audiences: t.raw("items.executive_transportation.audiences") as string[],
        },
        {
            title: t("items.luxury_chauffeur.title"),
            audiences: t.raw("items.luxury_chauffeur.audiences") as string[],
        },
    ];

    const perfectForLabel = t("perfect_for");

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                    <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase text-primary">
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
                        loop
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4, allowTouchMove: false },
                        }}
                        className="services-swiper !p-1 !pb-12"
                    >
                        {services.map((service, index) => (
                            <SwiperSlide key={index} className="!flex !h-auto">
                                <ServiceCard service={service} perfectForLabel={perfectForLabel} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
