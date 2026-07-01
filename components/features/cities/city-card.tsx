"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

export interface CityCardData {
    name: string;
    image: string;
    href: string;
}

export default function CityCard({ city }: { city: CityCardData }) {
    return (
        <Link
            href={city.href}
            className="group relative block h-[260px] w-full overflow-hidden rounded-xl md:h-[300px]"
        >
            <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 90vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 md:p-6">
                <h3 className="text-lg font-bold text-white md:text-xl">{city.name}</h3>
                <span className="mt-2 block h-1 w-10 rounded-full bg-secondary transition-all duration-300 group-hover:w-14" />
            </div>
        </Link>
    );
}
