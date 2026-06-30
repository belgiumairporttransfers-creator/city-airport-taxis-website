"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";
import FleetCard from "../fleet/fleet-card";
import FleetSkeleton from "../skeletons/fleet-skeleton";
import { useFleetCategories } from "@/hooks/queries/use-fleet";
import { toFleetCardData } from "@/lib/api/fleets";

export default function FleetSection() {
    const t = useTranslations("home.fleet");
    const { data: categories, isLoading } = useFleetCategories();
    const fleets = (categories ?? []).map(toFleetCardData);

    return (
        <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden rounded-3xl bg-black px-4 py-10 md:px-8 md:py-14">
                    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                        <h2 className="text-2xl font-bold text-white md:text-4xl">{t("title")}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
                            {t("description")}
                        </p>
                    </div>

                    <div className="relative">
                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={!isLoading && fleets.length > 1}
                            autoplay={
                                !isLoading && fleets.length > 1
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
                            className="fleets-swiper swiper-dark !-m-4 !p-4"
                        >
                            {isLoading
                                ? Array.from({ length: 3 }).map((_, index) => (
                                      <SwiperSlide key={`skeleton-${index}`} className="!flex !h-auto">
                                          <FleetSkeleton />
                                      </SwiperSlide>
                                  ))
                                : fleets.map((fleet) => (
                                      <SwiperSlide key={fleet.id} className="!flex !h-auto">
                                          <FleetCard fleet={fleet} />
                                      </SwiperSlide>
                                  ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
