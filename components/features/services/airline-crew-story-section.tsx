import type { ReactNode } from "react";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/animated-counter";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AirlineCrewStoryImageBadge {
    value: string;
    label: string;
}

export interface AirlineCrewStorySectionProps {
    className?: string;
    title: ReactNode;
    paragraphs: string[];
    accountTitle: string;
    accountDescription: string;
    accountPoints: string[];
    image: string;
    imageAlt: string;
    imageBadge: AirlineCrewStoryImageBadge;
}

const parseBadgeValue = (value: string) => {
    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) return null;
    const num = parseFloat(match[1]);
    if (Number.isNaN(num)) return null;
    return { num, suffix: match[2] };
};

function StoryImageWithBadge({
    image,
    imageAlt,
    badge,
}: {
    image: string;
    imageAlt: string;
    badge: AirlineCrewStoryImageBadge;
}) {
    const animatedBadge = badge.value ? parseBadgeValue(badge.value) : null;

    return (
        <div className="relative h-full min-h-[220px] w-full sm:min-h-[260px]">
            <div
                className="pointer-events-none absolute inset-0 z-0 translate-x-3 translate-y-3 rounded-xl border-2 border-secondary sm:translate-x-4 sm:translate-y-4"
                aria-hidden
            />
            <div className="relative z-10 h-full min-h-[220px] w-full overflow-hidden rounded-xl sm:min-h-[260px]">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 28vw"
                />
            </div>
            <div className="absolute -bottom-4 left-3 z-20 min-w-[150px] rounded-xl bg-primary px-5 py-4 shadow-[0_12px_32px_rgba(0,0,0,0.3)] sm:-bottom-5 sm:left-4 sm:min-w-[168px] sm:px-6 sm:py-5">
                {badge.value && (
                    <p className="text-center text-2xl font-bold leading-none text-secondary tabular-nums sm:text-3xl">
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
                        "text-center text-[9px] font-semibold uppercase leading-snug tracking-[0.12em] text-white sm:text-[10px] sm:tracking-[0.14em]",
                        badge.value && "mt-1.5",
                    )}
                >
                    {badge.label}
                </p>
            </div>
        </div>
    );
}

export default function AirlineCrewStorySection({
    className,
    title,
    paragraphs,
    accountTitle,
    accountDescription,
    accountPoints,
    image,
    imageAlt,
    imageBadge,
}: AirlineCrewStorySectionProps) {
    return (
        <section className={cn("overflow-hidden bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.75fr)] lg:gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,8fr)]">
                    <div className="flex flex-col justify-start rounded-2xl bg-primary p-6 sm:p-7 md:rounded-3xl md:p-8 lg:p-9">
                        <h2 className="text-[1.5rem] font-bold leading-[1.2] text-white sm:text-xl lg:text-2xl xl:text-[1.75rem]">
                            {title}
                        </h2>
                        <div className="mt-4 space-y-4 sm:mt-5">
                            {paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-sm leading-relaxed text-white/85 md:text-[15px] md:leading-7"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:rounded-3xl md:p-7 lg:p-8">
                        <div className="grid w-full grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
                            <div className="min-w-0">
                                <h3 className="text-lg font-bold leading-tight text-gray-900 md:text-xl lg:text-2xl">
                                    {accountTitle}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-[15px]">
                                    {accountDescription}
                                </p>
                                <ul className="mt-5 space-y-3.5 md:mt-6 md:space-y-4">
                                    {accountPoints.map((point, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3 text-sm leading-snug text-gray-800 md:text-[15px]"
                                        >
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                                                <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                                            </div>
                                            <span className="pt-0.5">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex min-h-[220px] items-stretch md:min-h-0">
                                <StoryImageWithBadge image={image} imageAlt={imageAlt} badge={imageBadge} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
