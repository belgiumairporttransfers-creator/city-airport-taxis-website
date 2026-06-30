"use client";

import type { ReactNode } from "react";
import { Car, Check, Clock, Map, MoveRight, Plane, Sparkles, Tag, UserCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BookTransferSidebar, {
    type BookTransferFeatureItem,
} from "@/components/shared/book-transfer/book-transfer-sidebar";
import { CompassIcon } from "@/components/icons/compass-icon";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const SIDEBAR_ICONS = [Clock, UserCheck, Car, Plane, Tag, Map] as const;

export interface WhyChooseSidebarData {
    badge?: string;
    title: string;
    subtitle: string;
    features: string[];
    buttonText: string;
    buttonHref?: string;
}

export interface WhyChooseHighlightData {
    tagText?: string;
    title: string;
    description: string;
    listTitle?: string;
    listItems?: string[];
    ctaText?: string;
    ctaHref?: string;
}

export interface WhyChooseSectionProps {
    className?: string;
    sidebar: WhyChooseSidebarData;
    title: string;
    description: ReactNode;
    reasons: string[];
    highlight: WhyChooseHighlightData;
}

function HighlightCard({ highlight }: { highlight: WhyChooseHighlightData }) {
    const hasList = Boolean(highlight.listItems?.length);
    const useCompass = Boolean(highlight.tagText);

    return (
        <div className="relative h-full min-h-[220px] overflow-hidden rounded-2xl bg-secondary md:min-h-[260px] md:rounded-3xl">
            <div
                className="absolute right-0 top-0 h-[4.5rem] w-[4.5rem] rounded-bl-[1.75rem] bg-primary md:h-20 md:w-20 md:rounded-bl-[2rem]"
                aria-hidden
            />
            {useCompass ? (
                <CompassIcon
                    width={24}
                    height={24}
                    className="absolute right-4 top-4 z-10 text-primary md:right-5 md:top-5 md:h-6 md:w-6"
                />
            ) : (
                <Sparkles
                    className="absolute right-4 top-4 z-10 h-5 w-5 text-secondary md:right-5 md:top-5 md:h-6 md:w-6"
                    strokeWidth={1.5}
                    aria-hidden
                />
            )}

            <div
                className={cn(
                    "relative z-[1] flex h-full flex-col p-7 pr-8 md:p-9 md:pr-10 lg:p-10",
                    hasList ? "justify-start py-7 md:py-8" : "justify-between",
                )}
            >
                <div>
                    {highlight.tagText ? (
                        <p className="text-sm font-bold text-primary md:text-base">{highlight.tagText}</p>
                    ) : null}
                    <h3
                        className={cn(
                            "max-w-[16rem] text-xl font-bold leading-tight text-primary md:text-2xl",
                            highlight.tagText && "mt-2",
                        )}
                    >
                        {highlight.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-primary/90 md:text-[15px] md:leading-7">
                        {highlight.description}
                    </p>
                    {hasList && (
                        <div className="mt-4">
                            {highlight.listTitle && (
                                <p className="text-sm font-semibold text-primary md:text-[15px]">
                                    {highlight.listTitle}
                                </p>
                            )}
                            <ul className="mt-2.5 space-y-1.5">
                                {highlight.listItems!.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 text-xs leading-relaxed text-primary/90 md:text-sm"
                                    >
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {highlight.ctaText ? (
                    <Link
                        href={highlight.ctaHref ?? "/"}
                        className="mt-6 inline-flex items-center gap-2 self-end text-sm font-bold text-primary transition-opacity hover:opacity-80 md:text-base"
                    >
                        {highlight.ctaText}
                        <MoveRight className="h-4 w-4" aria-hidden />
                    </Link>
                ) : null}
            </div>
        </div>
    );
}

function buildSidebarFeatures(labels: string[]): BookTransferFeatureItem[] {
    return labels.map((label, index) => ({
        label,
        icon: SIDEBAR_ICONS[index] ?? Clock,
    }));
}

export default function WhyChooseSection({
    className,
    sidebar,
    title,
    description,
    reasons,
    highlight,
}: WhyChooseSectionProps) {
    return (
        <section className={cn("bg-white py-16 md:py-20", className)}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-6">
                    <div className="w-full shrink-0 lg:w-1/3">
                        <BookTransferSidebar
                            badge={sidebar.badge}
                            title={sidebar.title}
                            subtitle={sidebar.subtitle}
                            features={buildSidebarFeatures(sidebar.features)}
                            buttonText={sidebar.buttonText}
                            buttonHref={sidebar.buttonHref ?? "/"}
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">{title}</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
                                {description}
                            </p>
                        </div>

                        <div className="overflow-hidden rounded-3xl bg-primary md:rounded-[2rem]">
                            <div className="grid grid-cols-1 items-stretch gap-6 p-6 md:gap-8 md:p-8 lg:grid-cols-[1fr_minmax(280px,42%)] lg:gap-10 lg:p-10">
                                <ul className="flex flex-col justify-center space-y-3 md:space-y-3.5">
                                    {reasons.map((reason, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <Check
                                                className="mt-0.5 h-4 w-4 shrink-0 text-secondary md:h-5 md:w-5"
                                                strokeWidth={2.5}
                                                aria-hidden
                                            />
                                            <span className="text-sm font-medium text-white md:text-[15px]">
                                                {reason}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <HighlightCard highlight={highlight} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
