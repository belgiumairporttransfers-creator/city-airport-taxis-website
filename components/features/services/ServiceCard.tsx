"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

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
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Link
            href={service.path}
            className="group relative block h-[300px] w-full overflow-hidden rounded-xl md:h-[360px]"
        >
            <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 90vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {service.category}
                </p>
                <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-white md:text-lg">
                    {service.title}
                </h3>
                <span className="mt-2 block h-1 w-10 rounded-full bg-secondary transition-all duration-300 group-hover:w-14" />
            </div>
        </Link>
    );
}
