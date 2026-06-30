import React from "react";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/animated-counter";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
    label: string;
    value: string;
}

interface FeatureCard {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface StoryImageBadge {
    value: string;
    label: string;
}

export interface StoryNumberedPoint {
    number: string;
    text: string;
}

interface StorySectionProps {
    image: string;
    imageAlt?: string;
    topText?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    paragraphs?: string[];
    intro?: string;
    numberedPoints?: StoryNumberedPoint[];
    closingParagraphs?: string[];
    points?: string[];
    pointsColumns?: 1 | 2;
    pointsTitle?: string;
    /** @deprecated Prefer `imageBadge` for the overlay card design */
    badgeText?: string;
    imageBadge?: StoryImageBadge;
    stats?: StatItem[];
    features?: FeatureCard[];
    imageSide?: "left" | "right";
    className?: string;
    pointsDescription?: string;
    children?: React.ReactNode;
}

const parseStatValue = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    return { num, suffix };
};

const parseBadgeValue = (value: string) => {
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) return null;
    const num = parseFloat(match[1]);
    if (Number.isNaN(num)) return null;
    return { num, suffix: match[2] };
};

function StoryImageColumn({
    image,
    imageAlt,
    badge,
}: {
    image: string;
    imageAlt: string;
    badge: StoryImageBadge | null;
}) {
    const animatedBadge = badge?.value ? parseBadgeValue(badge.value) : null;

    return (
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end">
            <div
                className="pointer-events-none absolute inset-0 z-0 translate-x-4 translate-y-4 rounded-xl border-2 border-secondary md:translate-x-6 md:translate-y-6"
                aria-hidden
            />

            <div className="relative z-10 min-h-[340px] overflow-hidden rounded-xl sm:min-h-[400px] md:min-h-[460px] lg:min-h-[500px]">
                <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>

            {badge && (
                <div className="absolute bottom-6 left-0 z-20 min-w-[168px] rounded-xl bg-primary px-6 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:min-w-[188px] sm:px-7 sm:py-8 md:-left-4 md:-bottom-6">
                    {badge.value && (
                        <p className="text-center text-3xl font-bold leading-none text-secondary tabular-nums sm:text-4xl">
                            {animatedBadge ? (
                                <AnimatedCounter
                                    end={animatedBadge.num}
                                    suffix={animatedBadge.suffix}
                                    decimals={animatedBadge.suffix.includes(".") ? 1 : 0}
                                    once
                                />
                            ) : (
                                badge.value
                            )}
                        </p>
                    )}
                    <p
                        className={cn(
                            "text-center text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-white sm:text-xs sm:tracking-[0.16em]",
                            badge.value && "mt-2",
                        )}
                    >
                        {badge.label}
                    </p>
                </div>
            )}
        </div>
    );
}

function StoryContentColumn({
    topText,
    title,
    description,
    paragraphs,
    intro,
    numberedPoints,
    closingParagraphs,
    points,
    pointsColumns = 1,
    pointsTitle,
    pointsDescription,
    stats,
    features,
    children,
}: Pick<
    StorySectionProps,
    | "topText"
    | "title"
    | "description"
    | "paragraphs"
    | "intro"
    | "numberedPoints"
    | "closingParagraphs"
    | "points"
    | "pointsColumns"
    | "pointsTitle"
    | "pointsDescription"
    | "stats"
    | "features"
    | "children"
>) {
    return (
        <div className="flex flex-col items-start">
            {topText && <span className="mb-2 text-base font-semibold text-secondary">{topText}</span>}
            {title && <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">{title}</h2>}
            {intro && (
                <p className="mb-5 text-sm leading-relaxed text-gray-500 md:text-base">{intro}</p>
            )}
            {numberedPoints && numberedPoints.length > 0 && (
                <ul className="mb-5 space-y-3">
                    {numberedPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-xs font-bold text-secondary md:h-10 md:w-10 md:text-sm">
                                {point.number}
                            </span>
                            <span className="pt-1.5 text-sm leading-relaxed text-gray-600 md:text-base">
                                {point.text}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            {closingParagraphs && closingParagraphs.length > 0 && (
                <div className="mb-4 space-y-4">
                    {closingParagraphs.map((paragraph, index) => (
                        <p key={index} className="text-sm leading-relaxed text-gray-500 md:text-base">
                            {paragraph}
                        </p>
                    ))}
                </div>
            )}
            {paragraphs && paragraphs.length > 0 && (
                <div className="mb-4 space-y-4">
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-sm leading-relaxed text-gray-500 md:text-base">
                            {paragraph}
                        </p>
                    ))}
                </div>
            )}
            {description && (
                <div className="mb-2 whitespace-pre-line text-sm leading-relaxed text-gray-500 md:text-base">
                    {description}
                </div>
            )}
            {points && points.length > 0 && (
                <div className="mb-10 w-full">
                    {pointsTitle && <h4 className="mb-4 mt-2 text-lg font-semibold text-gray-900">{pointsTitle}</h4>}
                    <ul
                        className={cn(
                            pointsColumns === 2
                                ? "grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2"
                                : "space-y-3",
                        )}
                    >
                        {points.map((point, index) => (
                            <li key={index} className="flex items-center gap-3 text-sm text-gray-600 md:text-base">
                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary md:h-6 md:w-6">
                                    <Check className="h-3 w-3 text-white md:h-3.5 md:w-3.5" />
                                </div>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                    {pointsDescription && (
                        <div className="mb-2 mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-500 md:text-base">
                            {pointsDescription}
                        </div>
                    )}
                </div>
            )}

            {stats && stats.length > 0 && (
                <div className="mt-4 grid w-full grid-cols-2 gap-8 border-t border-border pt-4">
                    {stats.map((stat, index) => {
                        const { num, suffix } = parseStatValue(stat.value);
                        return (
                            <div key={index} className="flex flex-col items-center md:items-start">
                                <span className="mb-1 text-3xl font-extrabold text-primary md:text-4xl">
                                    <AnimatedCounter end={num} suffix={suffix} />
                                </span>
                                <span className="text-xs font-medium text-gray-400 md:text-sm">{stat.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {features && features.length > 0 && (
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 rounded-xl border border-secondary/30 bg-white p-5"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary/20 bg-secondary/5 text-secondary">
                                {feature.icon}
                            </div>
                            <h3 className="mt-1 text-sm font-semibold text-gray-900">{feature.title}</h3>
                            <p className="text-xs leading-relaxed text-gray-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {children}
        </div>
    );
}

export default function StorySection({
    image,
    imageAlt = "Story image",
    topText,
    title,
    description,
    paragraphs,
    intro,
    numberedPoints,
    closingParagraphs,
    points,
    pointsColumns,
    pointsTitle,
    badgeText,
    imageBadge,
    stats,
    features,
    imageSide = "left",
    className = "",
    pointsDescription,
    children,
}: StorySectionProps) {
    const badge: StoryImageBadge | null = imageBadge
        ? imageBadge
        : badgeText
          ? { value: "", label: badgeText }
          : null;

    const imageColumn = <StoryImageColumn image={image} imageAlt={imageAlt} badge={badge} />;
    const contentColumn = (
        <StoryContentColumn
            topText={topText}
            title={title}
            description={description}
            paragraphs={paragraphs}
            intro={intro}
            numberedPoints={numberedPoints}
            closingParagraphs={closingParagraphs}
            points={points}
            pointsColumns={pointsColumns}
            pointsTitle={pointsTitle}
            pointsDescription={pointsDescription}
            stats={stats}
            features={features}
        >
            {children}
        </StoryContentColumn>
    );

    return (
        <section className={cn("overflow-hidden bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                    {imageSide === "right" ? (
                        <>
                            {contentColumn}
                            {imageColumn}
                        </>
                    ) : (
                        <>
                            {imageColumn}
                            {contentColumn}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
