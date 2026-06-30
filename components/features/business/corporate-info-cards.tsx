"use client";

import React from "react";
import { Briefcase, CreditCard, Shield, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";

export default function CorporateInfoCards() {
    const t = useTranslations("business");

    const CORPORATE_CARDS = [
        {
            icon: Briefcase,
            title: t("corporate.cards.executive.title"),
            description: t("corporate.cards.executive.description"),
            value: t("corporate.cards.executive.value"),
            href: "#corporate-form",
            cta: t("corporate.cards.executive.cta")
        },
        {
            icon: CreditCard,
            title: t("corporate.cards.invoicing.title"),
            description: t("corporate.cards.invoicing.description"),
            value: t("corporate.cards.invoicing.value"),
            href: "#corporate-form",
            cta: t("corporate.cards.invoicing.cta")
        },
        {
            icon: Shield,
            title: t("corporate.cards.support.title"),
            description: t("corporate.cards.support.description"),
            value: t("corporate.cards.support.value"),
            href: "#corporate-form",
            cta: t("corporate.cards.support.cta")
        }
    ];

    return (
        <section className="py-16 relative z-30">
            <div className="container mx-auto px-4">
                <div className="relative">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 4500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="partner-info-swiper !p-4 !-m-4"
                    >
                        {CORPORATE_CARDS.map((card, index) => (
                            <SwiperSlide key={index} className="!h-auto !flex">
                                <div className="bg-white p-4 md:p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col w-full h-full cursor-pointer space-y-2">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                        <card.icon className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">{card.title}</h3>
                                    <p className="text-sm text-gray-500 font-semibold lowercase">
                                        {card.description}
                                    </p>
                                    <p className="text-gray-900 font-bold text-lg">{card.value}</p>
                                    <Link
                                        href={card.href}
                                        className="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:gap-3 transition-all duration-300 mt-auto pt-4"
                                    >
                                        {card.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
