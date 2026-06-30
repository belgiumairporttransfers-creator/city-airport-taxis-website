"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";

export const DESTINATION_BADGE_COUNT = 4;

export interface DestinationCardData {
    name: string;
    image: string;
    href: string;
    subtitle?: string;
    description?: string;
    tags?: string[];
    paragraph?: string;
}

export default function DestinationCard({ destination }: { destination: DestinationCardData }) {
    const { name, image, href, subtitle, description, tags, paragraph } = destination;

    if (!subtitle && description) {
        return (
            <Link
                href={href}
                className="relative block h-[260px] w-full cursor-pointer overflow-hidden rounded-md shadow-sm transition-all duration-500 group md:h-[320px]"
            >
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 transition-transform duration-500 group-hover:-translate-y-14">
                    <h3 className="text-lg font-bold leading-[1.3] tracking-tight text-white drop-shadow-md">
                        {name}
                    </h3>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-300 md:text-base">
                        {description}
                    </p>
                </div>
            </Link>
        );
    }

    const displayTags = (tags ?? []).slice(0, DESTINATION_BADGE_COUNT);
    const hasParagraph = Boolean(paragraph);

    return (
        <Link
            href={href}
            className="group flex h-full w-full flex-col overflow-hidden rounded-md border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-md"
        >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-md bg-gray-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 90vw, 25vw"
                />
            </div>

            <div className="flex min-h-0 flex-1 flex-col bg-gray-50/80 p-4 md:p-5">
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-primary md:text-lg">{name}</h3>
                {subtitle ? (
                    <p className="mt-2 shrink-0 text-sm underline underline-offset-4 text-secondary">{subtitle}</p>
                ) : null}

                {hasParagraph ? (
                    <p className="mt-3 text-xs leading-relaxed text-gray-600 md:text-sm">{paragraph}</p>
                ) : (
                    <ul className="mt-3 flex flex-wrap gap-2">
                        {displayTags.map((tag, index) =>
                            tag ? (
                                <li key={index} className="min-w-0 max-w-full">
                                    <span
                                        className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-gray-50 px-3 py-1.5"
                                        title={tag}
                                    >
                                        <CheckCircle2
                                            className="h-4 w-4 shrink-0 text-primary"
                                            strokeWidth={1.5}
                                            aria-hidden
                                        />
                                        <span className="text-sm font-medium leading-snug text-gray-900">
                                            {tag}
                                        </span>
                                    </span>
                                </li>
                            ) : null,
                        )}
                    </ul>
                )}
            </div>
        </Link>
    );
}
