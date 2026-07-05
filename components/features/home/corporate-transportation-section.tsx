"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";
import { useTranslations } from "next-intl";

const SERVICE_TAG_COUNT = 4;
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
                <div className="relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0">
                        <Image
                            src={IMAGES.CORPORATE_TRANSPORTATION}
                            alt={t("image_alt")}
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85" />
                    </div>

                    <div className="relative flex flex-col gap-8 px-4 py-10 md:gap-10 md:px-10 md:py-14 lg:px-14">
                        <div className="text-center">
                            <span className="mb-5 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-primary">
                                {t("badge")}
                            </span>
                            <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-tight text-white md:text-4xl lg:text-[2.5rem]">
                                {t("title")}
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
                                {t("description")}
                            </p>

                            <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2 md:mt-8 md:gap-3">
                                {serviceTags.map((tag, index) => (
                                    <li key={index}>
                                        <span className="inline-block rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm md:px-4 md:text-sm">
                                            {tag}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <ul className="grid grid-cols-1 gap-4 rounded-2xl bg-black px-4 py-4 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-5 lg:grid-cols-4 lg:gap-6 lg:px-8 lg:py-6">
                            {bottomFeatures.map((feature, index) => (
                                <li key={index} className="flex w-full items-start gap-3">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary">
                                        <Check
                                            className="h-3 w-3 text-primary"
                                            strokeWidth={3}
                                            aria-hidden
                                        />
                                    </span>
                                    <span className="text-sm font-medium leading-snug text-white">
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
