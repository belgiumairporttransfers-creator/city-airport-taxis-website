"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/image-constants";
import React from "react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import Step1 from "@/components/features/booking/setp-1/setp-1";
import AnimatedCounter from "@/components/ui/animated-counter";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BannerStatItem =
    | { label: string; end: number; suffix?: string; decimals?: number }
    | { label: string; static: string };

interface BannerProps {
    image?: string;
    imageAlt?: string;
    topText?: string | React.ReactNode;
    highlightTopText?: boolean;
    title?: string | React.ReactNode;
    description?: string;
    showBookingForm?: boolean;
    button?: {
        text: string;
        href?: string;
        onClick?: () => void;
    };
    secondaryButton?: {
        text: string;
        href: string;
    };
    stats?: BannerStatItem[];
    centerContent?: boolean;
}

function BannerStatsBar({ stats }: { stats: BannerStatItem[] }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex min-h-[84px] flex-col items-center justify-center px-2 py-5 text-center sm:min-h-[96px] sm:px-4 sm:py-6 md:min-h-[92px] md:px-5 md:py-6 lg:min-h-[100px] lg:py-7",
                            index % 2 === 0 && "border-r border-white/10",
                            index < 2 && "border-b border-white/10 md:border-b-0",
                            index < 3 && "md:border-b-0 md:border-r md:border-white/10",
                            index === 3 && "md:border-r-0",
                        )}
                    >
                        <p className="text-2xl font-bold leading-none tracking-tight text-secondary tabular-nums sm:text-3xl md:text-3xl lg:text-4xl">
                            {"static" in stat ? (
                                stat.static
                            ) : (
                                <AnimatedCounter
                                    end={stat.end}
                                    suffix={stat.suffix ?? ""}
                                    decimals={stat.decimals ?? 0}
                                    duration={2200}
                                    once
                                />
                            )}
                        </p>
                        <p className="mt-2 max-w-[8.5rem] text-[10px] font-semibold uppercase leading-snug tracking-[0.1em] text-white sm:mt-2.5 sm:max-w-none sm:text-[11px] md:mt-2.5 md:text-[11px] md:tracking-[0.12em] lg:mt-3 lg:text-xs lg:tracking-[0.15em]">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Banner({
    image,
    imageAlt = "Hero image",
    topText,
    highlightTopText = false,
    title,
    description,
    button,
    secondaryButton,
    showBookingForm = false,
    stats,
    centerContent = false,
}: BannerProps) {
    const defaultImage = IMAGES.CONTACT.BANNER;
    const hasStats = Boolean(stats?.length);

    const renderTitle = (titleContent: string | React.ReactNode) => {
        if (typeof titleContent !== "string") return titleContent;
        const parts = titleContent.split(/<br\s*\/?>/i);
        if (parts.length === 1) return titleContent;

        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < parts.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <section
            className={cn(
                "relative w-full overflow-visible",
                showBookingForm ? "pt-48 pb-0" : hasStats ? "pt-28 pb-0 md:pt-32 lg:pt-36" : "pt-48 pb-4",
            )}
        >
            <div className="absolute inset-0 h-full w-full">
                <div className="absolute inset-0">
                    <Image
                        src={image || defaultImage}
                        alt={imageAlt}
                        fill
                        sizes="100vw"
                        className="h-full w-full object-cover object-center"
                        priority
                    />
                    <div
                        className={cn(
                            "absolute inset-0",
                            hasStats
                                ? "bg-gradient-to-b from-black/80 via-black/55 to-black/70 md:bg-gradient-to-r md:from-black/85 md:via-black/60 md:to-black/30"
                                : "bg-black/60",
                        )}
                    />
                </div>
            </div>

            <div className="relative z-20">
                <div
                    className={cn(
                        "mx-auto grid max-w-screen-2xl gap-6 lg:px-5",
                        hasStats
                            ? "min-h-[420px] px-3 pt-2 pb-32 sm:min-h-[460px] sm:pb-36 md:min-h-[400px] md:px-5 md:pt-8 md:pb-28 lg:min-h-[440px] lg:pt-10 lg:pb-32"
                            : "max-lg:px-3 pt-16 lg:pt-32 lg:pb-32",
                    )}
                >
                    <div className={showBookingForm ? "max-lg:px-0" : undefined}>
                        <div
                            className={
                                showBookingForm
                                    ? "grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,560px)]"
                                    : cn(
                                          "flex w-full flex-col gap-4 md:gap-6",
                                          hasStats
                                              ? centerContent
                                                  ? "min-h-[340px] items-center justify-center text-center sm:min-h-[380px] md:min-h-[320px] md:gap-5 lg:gap-6"
                                                  : "items-center text-center md:items-start md:text-left md:gap-5 lg:gap-6"
                                              : "items-center justify-center gap-6 md:items-start lg:gap-8",
                                      )
                            }
                        >
                            <div
                                className={cn(
                                    "flex flex-col gap-3 sm:gap-4",
                                    centerContent
                                        ? "items-center text-center"
                                        : hasStats || showBookingForm
                                          ? "items-center text-center md:items-start md:text-left"
                                          : "items-center text-center md:items-start md:text-left",
                                    showBookingForm && "pb-2 lg:pb-8",
                                )}
                            >
                                {topText &&
                                    (highlightTopText ? (
                                        <p className="text-xs font-bold text-secondary sm:text-sm">
                                            {topText}
                                        </p>
                                    ) : (
                                        <div
                                            className={cn(
                                                "flex flex-col items-center gap-2",
                                                !centerContent && "md:flex-row md:gap-3",
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "h-[2px] bg-secondary",
                                                    centerContent ? "w-10" : "hidden w-8 md:block",
                                                )}
                                            />
                                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-white md:text-sm md:tracking-widest">
                                                {topText}
                                            </span>
                                            {!centerContent && (
                                                <div className="h-[2px] w-10 bg-secondary md:hidden" />
                                            )}
                                        </div>
                                    ))}
                                <h1
                                    className={cn(
                                        "font-extrabold text-white",
                                        hasStats
                                            ? centerContent
                                                ? "max-w-3xl text-2xl leading-snug sm:text-3xl md:text-4xl md:leading-tight lg:text-5xl"
                                                : "max-w-xl text-2xl leading-snug sm:text-3xl md:max-w-2xl md:text-left md:text-3xl md:leading-tight lg:max-w-3xl lg:text-4xl"
                                            : "text-center text-4xl md:text-left md:text-6xl lg:text-7xl",
                                    )}
                                >
                                    {renderTitle(title)}
                                </h1>

                                {description && (
                                    <p
                                        className={cn(
                                            "max-w-2xl leading-relaxed text-white/75",
                                            hasStats
                                                ? centerContent
                                                    ? "mx-auto max-w-3xl text-sm sm:text-base lg:text-lg"
                                                    : "text-sm sm:text-base md:max-w-xl md:text-left md:text-[15px] lg:max-w-2xl lg:text-base"
                                                : "text-center text-sm md:text-left md:text-base lg:text-lg",
                                        )}
                                    >
                                        {description}
                                    </p>
                                )}

                                {(button || secondaryButton) && (
                                    <div
                                        className={cn(
                                            "flex w-full flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 md:justify-start md:pt-2 lg:pt-3",
                                            hasStats && "sm:max-w-md md:max-w-none",
                                        )}
                                    >
                                        {button &&
                                            (button.href ? (
                                                <Link
                                                    href={button.href}
                                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-primary transition-opacity hover:opacity-90 sm:w-auto sm:px-6 sm:py-3 md:text-base"
                                                >
                                                    {button.text}
                                                    <MoveRight className="h-4 w-4 shrink-0" aria-hidden />
                                                </Link>
                                            ) : (
                                                <Button
                                                    size="lg"
                                                    className="w-full rounded-full bg-secondary font-bold text-primary sm:w-auto"
                                                    onClick={button.onClick}
                                                >
                                                    {button.text}
                                                </Button>
                                            ))}
                                        {secondaryButton && (
                                            <Link
                                                href={secondaryButton.href}
                                                className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:w-auto sm:px-6 sm:py-3 md:text-base"
                                            >
                                                {secondaryButton.text}
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>

                            {showBookingForm && (
                                <div className="w-full">
                                    <Step1 />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {hasStats && (
                <div className="absolute inset-x-0 bottom-0 z-30 px-3 sm:px-4 md:px-6">
                    <div className="mx-auto w-full max-w-6xl translate-y-1/2">
                        <BannerStatsBar stats={stats!} />
                    </div>
                </div>
            )}
        </section>
    );
}
