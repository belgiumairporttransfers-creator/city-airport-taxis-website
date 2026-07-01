"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export interface ServiceCardItem {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    path: string;
}

interface ServiceCardProps {
    service: ServiceCardItem;
    isLarge?: boolean;
}

export default function ServiceCard({ service, isLarge = false }: ServiceCardProps) {
    const t = useTranslations("home.servicesSection");

    return (
        <Link href={service.path}>
            <div
                className={`group relative flex w-full flex-col overflow-hidden rounded-lg ${isLarge
                    ? "h-[400px] sm:h-[500px] md:h-[600px]"
                    : "h-[300px] sm:h-[320px] md:h-[340px] lg:h-[290px]"
                    }`}
            >
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 transition-opacity duration-500 ease-out group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 text-white sm:p-5 md:p-6 lg:p-6">
                    <div className="transition-transform duration-500 ease-out will-change-transform">
                        <p className="mb-1 translate-y-0 transform text-xs font-semibold uppercase tracking-wide text-secondary transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:text-sm">
                            {service.category}
                        </p>
                        <h3 className="translate-y-0 transform text-xl font-bold transition-transform duration-500 ease-out group-hover:-translate-y-2 sm:text-2xl">
                            {service.title}
                        </h3>
                        <div className="pointer-events-none max-h-0 translate-y-2 transform overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:pointer-events-auto group-hover:max-h-64 group-hover:translate-y-0 group-hover:opacity-100">
                            <p className="mb-2 line-clamp-2 text-sm text-gray-300 sm:mb-3 sm:text-base md:text-lg">
                                {service.description}
                            </p>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary sm:text-base md:text-lg">
                                {t("read_more")}
                                <ArrowRight className="size-4" aria-hidden />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
