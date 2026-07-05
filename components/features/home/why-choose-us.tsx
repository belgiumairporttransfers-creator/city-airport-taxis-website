"use client";

import Image from "next/image";
import { Car, Clock, Handshake, Radar, Tag, Users } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";
import { useTranslations } from "next-intl";

const FEATURE_CARDS = [
    { key: "flight_monitoring", icon: Radar },
    { key: "meet_greet", icon: Handshake },
    { key: "fixed_rates", icon: Tag },
    { key: "professional_chauffeurs", icon: Users },
    { key: "premium_mercedes_fleet", icon: Car },
    { key: "available_24_7", icon: Clock },
] as const;

export default function WhyChooseUs() {
    const t = useTranslations("home.why_choose_us");

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Image — left on desktop */}
                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        <div
                            className="pointer-events-none absolute -bottom-4 -left-4 z-0 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-2xl border-2 border-secondary"
                            aria-hidden
                        />
                        <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[1.05/1]">
                            <Image
                                src={IMAGES.WHY_CHOOSE_US}
                                alt={t("image_alt")}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Content — right on desktop */}
                    <div>
                        <div className="mb-8 md:mb-10">
                            <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase">
                                {t("badge")}
                            </span>
                            <h2 className="text-2xl font-bold leading-tight text-primary md:text-4xl">
                                {t("title")}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {FEATURE_CARDS.map(({ key, icon: Icon }) => (
                                <div
                                    key={key}
                                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6"
                                >
                                    <div className="mb-3 flex items-center gap-2.5">
                                        <Icon className="h-5 w-5 shrink-0 text-secondary" strokeWidth={2} />
                                        <h3 className="text-base font-bold leading-snug text-primary md:text-lg">
                                            {t(`${key}.title`)}
                                        </h3>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {t(`${key}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
