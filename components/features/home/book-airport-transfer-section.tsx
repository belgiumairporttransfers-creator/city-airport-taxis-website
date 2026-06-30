"use client";

import { Car, Clock, Map, Plane, Tag, UserCheck } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";
import BookTransferHero from "@/components/shared/book-transfer/book-transfer-hero";
import BookTransferSidebar from "@/components/shared/book-transfer/book-transfer-sidebar";
import { useTranslations } from "next-intl";

const FEATURE_ICONS = [Clock, UserCheck, Car, Plane, Tag, Map] as const;

export default function BookAirportTransferSection() {
    const t = useTranslations("home.book_airport_transfer");

    const features = FEATURE_ICONS.map((icon, index) => ({
        label: t(`features.${index}`),
        icon,
    }));

    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch lg:gap-5">
                    <BookTransferSidebar
                        className="lg:col-span-1 lg:h-full"
                        title={t("title")}
                        subtitle={t("subtitle")}
                        features={features}
                        buttonText={t("button")}
                        buttonHref="/#book-ride-form"
                    />

                    <BookTransferHero
                        className="lg:col-span-2"
                        image={IMAGES.BOOK_AIRPORT_TRANSFER}
                        imageAlt={t("hero.image_alt")}
                        badge={t("hero.badge")}
                        title={t("hero.title")}
                        description={t.rich("hero.description", {
                            brussels: (chunks) => (
                                <span className="font-semibold text-secondary">{chunks}</span>
                            ),
                            charleroi: (chunks) => (
                                <span className="font-semibold text-secondary">{chunks}</span>
                            ),
                            antwerp: (chunks) => (
                                <span className="font-semibold text-secondary">{chunks}</span>
                            ),
                            liege: (chunks) => (
                                <span className="font-semibold text-secondary">{chunks}</span>
                            ),
                        })}
                    />
                </div>
            </div>
        </section>
    );
}
