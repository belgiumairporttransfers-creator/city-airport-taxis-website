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

const POPULAR_DESTINATIONS = [
    { key: "brussels_city_centre", image: IMAGES.POPULAR_DESTINATIONS.BRUSSELS_CITY_CENTRE, href: "/" },
    { key: "european_quarter", image: IMAGES.POPULAR_DESTINATIONS.EUROPEAN_QUARTER, href: "/" },
    { key: "grand_place", image: IMAGES.POPULAR_DESTINATIONS.GRAND_PLACE, href: "/" },
    { key: "avenue_louise", image: IMAGES.POPULAR_DESTINATIONS.AVENUE_LOUISE, href: "/" },
    { key: "brussels_expo", image: IMAGES.POPULAR_DESTINATIONS.BRUSSELS_EXPO, href: "/" },
    { key: "atomium", image: IMAGES.POPULAR_DESTINATIONS.ATOMIUM, href: "/" },
    { key: "bruges", image: IMAGES.POPULAR_DESTINATIONS.BRUGES, href: "/" },
    { key: "ghent", image: IMAGES.POPULAR_DESTINATIONS.GHENT, href: "/" },
    { key: "antwerp", image: IMAGES.POPULAR_DESTINATIONS.ANTWERP, href: "/" },
    { key: "leuven", image: IMAGES.POPULAR_DESTINATIONS.LEUVEN, href: "/" },
    { key: "waterloo", image: IMAGES.POPULAR_DESTINATIONS.WATERLOO, href: "/" },
    { key: "namur", image: IMAGES.POPULAR_DESTINATIONS.NAMUR, href: "/" },
    { key: "liege", image: IMAGES.POPULAR_DESTINATIONS.LIEGE, href: "/" },
    { key: "charleroi", image: IMAGES.POPULAR_DESTINATIONS.CHARLEROI, href: "/" },
    { key: "amsterdam", image: IMAGES.POPULAR_DESTINATIONS.AMSTERDAM, href: "/" },
    { key: "paris", image: IMAGES.POPULAR_DESTINATIONS.PARIS, href: "/" },
    { key: "luxembourg_city", image: IMAGES.POPULAR_DESTINATIONS.LUXEMBOURG_CITY, href: "/" },
] as const;

export default function CitiesSection() {
    const t = useTranslations("home.cities");
    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    const destinations: CityCardData[] = POPULAR_DESTINATIONS.map(({ key, image, href }) => ({
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
                                {t("title")}
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
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="cities-swiper swiper-dark !-m-1 !p-1"
                    >
                        {destinations.map((destination, index) => (
                            <SwiperSlide key={POPULAR_DESTINATIONS[index].key} className="!h-auto">
                                <CityCard city={destination} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
