"use client";

import {
    Car,
    Clock,
    Headset,
    Map,
    Plane,
    ShieldPlus,
    Tag,
    ThumbsUp,
    UserCheck,
    Wrench,
    type LucideIcon,
} from "lucide-react";
import BookTransferSidebar, {
    type BookTransferFeatureItem,
} from "@/components/shared/book-transfer/book-transfer-sidebar";
import { cn } from "@/lib/utils";

const WHY_CHOOSE_ICONS = [Clock, UserCheck, Car, Plane, Tag, Map] as const;

const SAFETY_ICONS: Record<string, LucideIcon> = {
    UserCheck,
    Wrench,
    Car,
    ShieldPlus,
    Headset,
    ThumbsUp,
};

export interface SafetyFeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface WhyChooseSafetySectionProps {
    whyChoose: {
        title: string;
        subtitle: string;
        features: string[];
    };
    safety: {
        title: string;
        subtitle: string;
        features: SafetyFeatureItem[];
    };
    className?: string;
}

function buildWhyChooseFeatures(labels: string[]): BookTransferFeatureItem[] {
    return labels.map((label, index) => ({
        label,
        icon: WHY_CHOOSE_ICONS[index] ?? Clock,
    }));
}

function SafetyFeatureCard({ feature }: { feature: SafetyFeatureItem }) {
    const Icon = SAFETY_ICONS[feature.icon] ?? ShieldPlus;

    return (
        <article className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08]">
                <Icon className="h-5 w-5 text-secondary" strokeWidth={1.75} aria-hidden />
            </div>
            <div>
                <h3 className="text-sm font-bold text-white md:text-base">{feature.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55 md:text-sm">
                    {feature.description}
                </p>
            </div>
        </article>
    );
}

export default function WhyChooseSafetySection({
    whyChoose,
    safety,
    className,
}: WhyChooseSafetySectionProps) {
    const topFeatures = safety.features.slice(0, 3);
    const bottomFeatures = safety.features.slice(3, 5);

    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-6">
                    <div className="w-full shrink-0 lg:w-[34%]">
                        <BookTransferSidebar
                            title={whyChoose.title}
                            subtitle={whyChoose.subtitle}
                            features={buildWhyChooseFeatures(whyChoose.features)}
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex h-full flex-col rounded-3xl bg-primary p-6 md:p-8 lg:p-10">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-xl font-bold text-white md:text-2xl lg:text-[1.65rem]">
                                    {safety.title}
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-[15px]">
                                    {safety.subtitle}
                                </p>
                                <div
                                    className="mx-auto mt-5 h-1 w-14 rounded-full bg-secondary"
                                    aria-hidden
                                />
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
                                {topFeatures.map((feature, index) => (
                                    <SafetyFeatureCard key={index} feature={feature} />
                                ))}
                            </div>

                            {bottomFeatures.length > 0 && (
                                <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-10 lg:gap-x-10">
                                    {bottomFeatures.map((feature, index) => (
                                        <SafetyFeatureCard key={index} feature={feature} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
