"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";
import { useTranslations } from "next-intl";

const SERVICE_TAG_COUNT = 6;
const BOTTOM_FEATURE_COUNT = 4;

export default function CorporateTransportationSection() {
    const t = useTranslations("home.corporate_transportation");

    const serviceTags = Array.from({ length: SERVICE_TAG_COUNT }, (_, i) => t(`service_tags.${i}`));
    const bottomFeatures = Array.from({ length: BOTTOM_FEATURE_COUNT }, (_, i) =>
        t(`bottom_features.${i}`),
    );

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="relative min-h-[520px] overflow-hidden rounded-3xl md:min-h-[580px]">
                    <div className="absolute inset-0">
                        <Image
                            src={IMAGES.CORPORATE_TRANSPORTATION}
                            alt={t("image_alt")}
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/80" />
                    </div>

                    <div className="relative px-5 pb-28 pt-12 text-center md:px-10 md:pb-32 md:pt-16 lg:px-14">
                        <span className="mb-5 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-primary">
                            {t("badge")}
                        </span>
                        <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-tight text-white md:text-4xl lg:text-[2.5rem]">
                            {t("title")}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
                            {t("description")}
                        </p>

                        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5 md:gap-3">
                            {serviceTags.map((tag, index) => (
                                <li key={index}>
                                    <span className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm md:text-sm">
                                        {tag}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 md:px-6 md:pb-6">
                        <ul className="grid grid-cols-1 gap-4 rounded-2xl bg-black px-5 py-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:px-8 lg:py-6">
                            {bottomFeatures.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2.5 text-left"
                                >
                                    <CheckCircle2
                                        className="h-5 w-5 shrink-0 text-secondary"
                                        strokeWidth={1.75}
                                        aria-hidden
                                    />
                                    <span className="text-xs font-medium leading-snug text-white md:text-sm">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
