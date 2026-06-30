"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface BookTransferHeroProps {
    image: string;
    imageAlt: string;
    badge: string;
    title: string;
    description: ReactNode;
    className?: string;
    imageSizes?: string;
}

export default function BookTransferHero({
    image,
    imageAlt,
    badge,
    title,
    description,
    className,
    imageSizes = "(max-width: 1024px) 100vw, 66vw",
}: BookTransferHeroProps) {
    return (
        <div
            className={cn(
                "relative min-h-[420px] overflow-hidden rounded-3xl lg:min-h-0 lg:aspect-auto",
                className,
            )}
        >
            <Image src={image} alt={imageAlt} fill className="object-cover" sizes={imageSizes} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />

            <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center md:px-12 md:py-16">
                <span className="mb-5 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-primary">
                    {badge}
                </span>
                <h3 className="max-w-2xl text-xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                    {title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}
