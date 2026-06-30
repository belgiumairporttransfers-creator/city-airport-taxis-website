"use client";

import Image from "next/image";
import { Luggage, Users } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Fleet {
    id: string;
    name: string;
    description?: string;
    image?: string;
    passengers: number;
    suitcases: number;
    carType?: string;
}

export default function FleetCard({ fleet }: { fleet: Fleet }) {
    const t = useTranslations("common");
    const tFleet = useTranslations("home.fleet");

    return (
        <article className="group flex h-full w-full flex-col overflow-hidden rounded-lg bg-white">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-md bg-gray-100">
                {fleet.image ? (
                    <Image
                        src={fleet.image}
                        alt={fleet.name}
                        fill
                        className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 90vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200" />
                )}
            </div>

            <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="text-lg font-bold text-primary md:text-xl">{fleet.name}</h3>
                {(fleet.carType || fleet.description) && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {fleet.carType || fleet.description}
                    </p>
                )}

                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    <li className="flex items-center gap-1.5">
                        <Luggage className="h-4 w-4 shrink-0 text-secondary" strokeWidth={2} />
                        <span className="text-sm font-medium text-primary">
                            {fleet.suitcases} {t("vehicle.bags")}
                        </span>
                    </li>
                    <li className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 shrink-0 text-secondary" strokeWidth={2} />
                        <span className="text-sm font-medium text-primary">
                            {fleet.passengers} {t("vehicle.passengers")}
                        </span>
                    </li>
                </ul>

                <div className="mt-auto pt-5">
                    <Link
                        href="/fleets"
                        className="inline-flex w-full items-center justify-center rounded-full border border-primary bg-white px-6 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
                    >
                        {tFleet("view_details")}
                    </Link>
                </div>
            </div>
        </article>
    );
}
