"use client";

import { MapPin, Check, FileCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const ICON_MAP = {
    MapPin,
    Check,
    FileCheck,
} as const;

const STEP_KEYS = [
    { number: 1, key: "enterLocation", iconKey: "MapPin" },
    { number: 2, key: "chooseVehicle", iconKey: "Check" },
    { number: 3, key: "confirmBook", iconKey: "FileCheck" },
] as const;

type StepData = {
    number: number;
    key: string;
    iconKey: keyof typeof ICON_MAP;
    title: string;
    description: string;
};

function StepCard({ step, isLast }: { step: StepData; isLast: boolean }) {
    const Icon = ICON_MAP[step.iconKey];

    return (
        <div className="relative flex flex-1 flex-col items-center">
            <div className="z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary sm:mb-6 sm:h-12 sm:w-12 sm:text-xl">
                {step.number}
            </div>

            {!isLast && (
                <div className="absolute top-5 -z-0 hidden h-0.5 w-[80%] bg-secondary lg:block sm:top-6 left-[60%]" />
            )}

            <div className="w-full rounded-xl border border-gray-100 bg-white p-5 shadow-lg sm:p-6">
                <div className="mb-4 w-fit rounded-lg bg-black p-3 ring-2 ring-secondary ring-offset-2 ring-offset-white">
                    <Icon className="h-6 w-6 text-secondary sm:h-7 sm:w-7" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-black sm:text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{step.description}</p>
            </div>
        </div>
    );
}

export default function HowItWorks() {
    const t = useTranslations("home.howItWorks");

    const steps: StepData[] = STEP_KEYS.map((step) => ({
        ...step,
        title: t(`steps.${step.key}.title`),
        description: t(`steps.${step.key}.description`),
    }));

    return (
        <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden rounded-3xl bg-black px-4 py-10 md:px-8 md:py-14">
                    <div className="mb-10 text-center sm:mb-12 md:mb-14">
                        <h2 className="mb-3 text-2xl font-bold text-white md:text-4xl">
                            {t("heading")}{" "}
                            <span className="text-secondary">{t("headingHighlight")}</span>
                        </h2>
                        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
                            {t("subtitle")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 lg:gap-10">
                        {steps.map((step, index) => (
                            <StepCard
                                key={step.number}
                                step={step}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
