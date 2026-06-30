"use client";

import Image from "next/image";
import {
    Car,
    ClipboardCheck,
    MapPinned,
    MoveRight,
    ShieldCheck,
    Sparkles,
    Wrench,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { IMAGES } from "@/constants/image-constants";
import { useTranslations } from "next-intl";

const FEATURE_ICONS = [ShieldCheck, Wrench, Sparkles, MapPinned, Car, ClipboardCheck] as const;

export default function SafetyReliabilitySection() {
    const t = useTranslations("home.safety_reliability");

    const features = FEATURE_ICONS.map((_, index) => t(`features.${index}`));

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 lg:order-1">
                    <span className="mb-4 inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase">
                            {t("badge")}
                        </span>
                        <h2 className="mb-4 text-2xl font-bold leading-tight text-primary md:text-4xl">
                            {t("title")}
                        </h2>
                        <p className="mb-8 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
                            {t("description")}
                        </p>

                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {features.map((label, index) => {
                                const Icon = FEATURE_ICONS[index];

                                return (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3.5"
                                    >
                                        <Icon
                                            className="h-5 w-5 shrink-0 text-primary"
                                            strokeWidth={1.75}
                                            aria-hidden
                                        />
                                        <span className="text-sm font-medium leading-snug text-primary">
                                            {label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-black p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                            <p className="text-sm leading-relaxed text-white/95 sm:max-w-md md:text-base">
                                {t("cta.text")}
                            </p>
                            <Link
                                href="/"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-primary transition-opacity hover:opacity-90"
                            >
                                {t("cta.button")}
                                <MoveRight className="h-4 w-4" aria-hidden />
                            </Link>
                        </div>
                    </div>

                    <div className="relative order-1 mx-auto w-full max-w-xl lg:order-2 lg:max-w-none">
                        <div
                            className="pointer-events-none absolute -bottom-4 -right-4 z-0 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-2xl border-2 border-secondary"
                            aria-hidden
                        />
                        <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-2xl md:aspect-[1.05/1]">
                            <Image
                                src={IMAGES.SAFETY_RELIABILITY}
                                alt={t("image_alt")}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
