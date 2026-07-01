"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { IMAGES } from "@/constants/image-constants";
import ServiceCard, { type ServiceCardItem } from "./ServiceCard";

const AUTOPLAY_DELAY = 3000;

const HOME_SERVICES = [
    { key: "airport_transfers", image: IMAGES.SERVICES.AIRPORT_TRANSFERS, path: "/airport-transfer" },
    { key: "hourly_taxi", image: IMAGES.SERVICES.HOURLY_TAXI, path: "/city-ride" },
    { key: "event_transport", image: IMAGES.SERVICES.EVENT_TRANSPORT, path: "/airline-crew-transportation" },
    { key: "corporate_transfers", image: IMAGES.SERVICES.CORPORATE_TRANSFERS, path: "/corporate-travel-solutions" },
    { key: "embassy_delegation", image: IMAGES.SERVICES.EMBASSY_DELEGATION, path: "/corporate-travel-solutions" },
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
        <section id="services" className="bg-white">
            <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24">
                <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:mb-12 lg:mb-14 lg:flex-row lg:items-center lg:justify-between">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-3 text-4xl font-bold text-black md:text-5xl">
                            {t("heading")}{" "}
                            <span className="text-secondary">{t("headingHighlight")}</span>{" "}
                            {t("suffix")}
                        </h2>
                        <p className="mx-auto max-w-4xl text-base text-gray-600 sm:text-lg lg:mx-0">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>

                <div className="hidden items-start gap-4 md:gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-3">
                    <div className="col-span-7 row-span-2 row-start-1">
                        <ServiceCard service={services[0]} isLarge />
                    </div>
                    <div className="col-span-5 col-start-8 row-start-1">
                        <ServiceCard service={services[1]} />
                    </div>
                    <div className="col-span-5 col-start-8 row-start-2">
                        <ServiceCard service={services[2]} />
                    </div>
                    <div className="col-span-6 col-start-1 row-start-3">
                        <ServiceCard service={services[3]} />
                    </div>
                    <div className="col-span-6 col-start-7 row-start-3">
                        <ServiceCard service={services[4]} />
                    </div>
                </div>

                <div className="relative lg:hidden">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={16}
                        slidesPerView={1}
                        loop
                        autoplay={{
                            delay: AUTOPLAY_DELAY,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        touchEventsTarget="container"
                        allowTouchMove
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                        }}
                        className="services-swiper !pb-12"
                    >
                        {services.map((service) => (
                            <SwiperSlide key={service.id}>
                                <ServiceCard service={service} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
