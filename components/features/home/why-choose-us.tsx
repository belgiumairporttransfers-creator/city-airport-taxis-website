"use client";

import Image from "next/image";
import { Car, Check, Handshake, Plane, Radar } from "lucide-react";
import { IMAGES } from "@/constants/image-constants";
import { useTranslations } from "next-intl";

export default function WhyChooseUs() {
    const t = useTranslations("home.why_choose_us");

    const meetGreetItems = [0, 1, 2, 3].map((i) => t(`meet_greet.items.${i}`));

    const standardCards = [
        {
            key: "airport_transport",
            icon: Plane,
        },
        {
            key: "professional_drivers",
            icon: Car,
        },
        {
            key: "flight_tracking",
            icon: Radar,
        },
    ] as const;

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
                            <h2 className="mb-4 text-2xl font-bold leading-tight text-primary md:text-4xl">
                                {t("title")}
                            </h2>
                            <p className="max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
                                {t.rich("description", {
                                    highlight: (chunks) => (
                                        <span className="font-semibold text-secondary">{chunks}</span>
                                    ),
                                })}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Featured — Meet & Greet */}
                            <div className="flex flex-col rounded-2xl bg-black p-5 text-white sm:p-6">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <Handshake className="h-5 w-5 shrink-0 text-secondary" strokeWidth={2} />
                                    <h3 className="text-base font-bold leading-snug md:text-lg">
                                        {t("meet_greet.title")}
                                    </h3>
                                </div>
                                <ul className="flex flex-col gap-3">
                                    {meetGreetItems.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2.5">
                                            <Check
                                                className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                                                strokeWidth={2.5}
                                                aria-hidden
                                            />
                                            <span className="text-sm leading-snug text-white/95">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {standardCards.map(({ key, icon: Icon }) => (
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
