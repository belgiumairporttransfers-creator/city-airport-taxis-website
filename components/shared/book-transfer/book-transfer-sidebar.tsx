"use client";

import type { LucideIcon } from "lucide-react";
import { MapPin, MoveRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { CompassIcon } from "@/components/icons/compass-icon";
import { cn } from "@/lib/utils";

export interface BookTransferFeatureItem {
    label: string;
    icon: LucideIcon;
}

export interface BookTransferSidebarProps {
    badge?: string;
    title: string;
    subtitle: string;
    features: BookTransferFeatureItem[];
    buttonText?: string;
    buttonHref?: string;
    className?: string;
}

export default function BookTransferSidebar({
    badge,
    title,
    subtitle,
    features,
    buttonText,
    buttonHref = "/",
    className,
}: BookTransferSidebarProps) {
    return (
        <div
            className={cn(
                "relative flex h-fit flex-col overflow-hidden rounded-3xl bg-[#141414] p-6 md:p-8 lg:h-full",
                className,
            )}
        >
            <div className="pointer-events-none absolute -right-6 -top-6" aria-hidden>
                <CompassIcon width={160} height={160} className="text-white/[0.04]" />
            </div>

            <div
                className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                aria-hidden
            >
                <MapPin className="h-5 w-5 text-white" strokeWidth={1.75} />
            </div>

            {badge ? (
                <p className="relative z-10 mb-2 text-xs font-semibold uppercase tracking-wide text-secondary md:text-sm">
                    {badge}
                </p>
            ) : null}
            <h2 className="relative z-10 text-xl font-bold leading-snug text-white md:text-2xl">{title}</h2>
            <p className="relative z-10 mt-2 text-sm text-white/70 md:text-base">{subtitle}</p>

            <ul className="relative z-10 mt-6 grid grid-cols-2 gap-2.5">
                {features.map(({ label, icon: Icon }, index) => (
                    <li key={index} className="flex flex-col gap-2 rounded-xl bg-white/[0.06] p-3.5">
                        <Icon className="h-5 w-5 text-secondary" strokeWidth={1.75} aria-hidden />
                        <span className="text-xs font-medium leading-snug text-white md:text-sm">
                            {label}
                        </span>
                    </li>
                ))}
            </ul>

            {buttonText ? (
                <div className="relative z-10 mt-12 md:mt-14 lg:mt-auto lg:pt-10">
                    <Link
                        href={buttonHref}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3.5 text-sm font-bold text-primary transition-opacity hover:opacity-90 md:text-base"
                    >
                        {buttonText}
                        <MoveRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            ) : null}
        </div>
    );
}
