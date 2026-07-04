"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/pagination";
import { IMAGES } from "@/constants/image-constants";
import ServiceCard, { type ServiceCardItem } from "./ServiceCard";

const HOME_SERVICES = [
    { key: "airport_transfers", image: IMAGES.SERVICES.AIRPORT_TRANSFERS, path: "/airport-transfers" },
    { key: "hourly_taxi", image: IMAGES.SERVICES.HOURLY_TAXI, path: "/hourly-transfers" },
    { key: "event_transport", image: IMAGES.SERVICES.EVENT_TRANSPORT, path: "/event-transfers" },
    { key: "corporate_transfers", image: IMAGES.SERVICES.CORPORATE_TRANSFERS, path: "/corporate-transfers" },
    { key: "embassy_delegation", image: IMAGES.SERVICES.EMBASSY_DELEGATION, path: "/diplomatic-embassy-transfers" },
] as const;

export default function Services() {
    const t = useTranslations("home.servicesSection");

    const services: ServiceCardItem[] = HOME_SERVICES.map(({ key, image, path }) => ({
        id: key,
        image,
        path,
        category: t(`cards.${key}.category`),
        title: t(`cards.${key}.title`),
        description: t(`cards.${key}.description`),
    }));

    return (
        <section id="services" className="bg-white py-14 md:py-20">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden rounded-3xl bg-black px-4 py-10 md:px-8 md:py-14">
                    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
                        <h2 className="text-2xl font-bold leading-tight text-white md:text-4xl">
                            {t("heading")}{" "}
                            <span className="text-secondary">{t("headingHighlight")}</span>{" "}
                            {t("suffix")}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
                            {t("subtitle")}
                        </p>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.1}
                        loop={services.length > 1}
                        autoplay={
                            services.length > 1
                                ? {
                                      delay: 5000,
                                      disableOnInteraction: false,
                                      pauseOnMouseEnter: true,
                                  }
                                : false
                        }
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="services-swiper swiper-dark !-m-1 !p-1 !pb-10"
                    >
                        {services.map((service) => (
                            <SwiperSlide key={service.id} className="!h-auto">
                                <ServiceCard service={service} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
