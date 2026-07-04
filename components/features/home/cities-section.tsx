"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import "swiper/css";
import { IMAGES } from "@/constants/image-constants";
import CityCard, { type CityCardData } from "../cities/city-card";

const MAJOR_CITIES = [
    { key: "brussels", image: IMAGES.CITIES.BRUSSELS, href: "/brussels-city" },
    { key: "antwerp", image: IMAGES.CITIES.ANTWERP, href: "/antwerp-city" },
    { key: "ghent", image: IMAGES.CITIES.GHENT, href: "/ghent-city" },
    { key: "bruges", image: IMAGES.CITIES.BRUGES, href: "/bruges-city" },
    { key: "amsterdam", image: IMAGES.CITIES.AMSTERDAM, href: "/amsterdam-city" },
    { key: "paris", image: IMAGES.CITIES.PARIS, href: "/paris-city" },
    { key: "luxembourg", image: IMAGES.CITIES.LUXEMBOURG, href: "/luxembourg-city" },
    { key: "maastricht", image: IMAGES.CITIES.MAASTRICHT, href: "/brussels-to-maastricht" },
] as const;

export default function CitiesSection() {
    const t = useTranslations("home.cities");
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    const cities: CityCardData[] = MAJOR_CITIES.map(({ key, image, href }) => ({
        name: t(`items.${key}.name`),
        image,
        href,
    }));

    return (
        <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden rounded-3xl bg-black px-4 py-10 md:px-8 md:py-14">
                    <div className="mb-8 flex flex-col gap-6 md:mb-10 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <h2 className="text-2xl font-bold leading-tight text-white md:text-4xl">
                                {t("heading")}{" "}
                                <span className="text-secondary">{t("headingHighlight")}</span>{" "}
                                {t("suffix")}
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
                                {t("description")}
                            </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 self-end lg:self-auto">
                            <button
                                type="button"
                                onClick={() => swiper?.slidePrev()}
                                aria-label={t("prev")}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-secondary hover:text-secondary"
                            >
                                <ChevronLeft className="h-5 w-5" aria-hidden />
                            </button>
                            <button
                                type="button"
                                onClick={() => swiper?.slideNext()}
                                aria-label={t("next")}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-secondary hover:text-secondary"
                            >
                                <ChevronRight className="h-5 w-5" aria-hidden />
                            </button>
                        </div>
                    </div>

                    <Swiper
                        onSwiper={setSwiper}
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.1}
                        loop={cities.length > 1}
                        autoplay={
                            cities.length > 1
                                ? {
                                      delay: 5000,
                                      disableOnInteraction: false,
                                      pauseOnMouseEnter: true,
                                  }
                                : false
                        }
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="cities-swiper swiper-dark !-m-1 !p-1"
                    >
                        {cities.map((city, index) => (
                            <SwiperSlide key={MAJOR_CITIES[index].key} className="!h-auto">
                                <CityCard city={city} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
