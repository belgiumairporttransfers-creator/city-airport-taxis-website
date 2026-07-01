"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/constants/image-constants";

const PARTNERS = [
    { name: "GBTA", logo: IMAGES.PARTNERS.GBTA },
    { name: "Travel Awards", logo: IMAGES.PARTNERS.TRAVEL_AWARDS },
    { name: "Events", logo: IMAGES.PARTNERS.EVENTS },
    { name: "NLA", logo: IMAGES.PARTNERS.NLA },
    { name: "GNET", logo: IMAGES.PARTNERS.GNET },
] as const;

export default function PartnersSection() {
    const t = useTranslations("home.partnersSection");
    const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

    return (
        <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden rounded-3xl bg-black px-4 py-10 md:px-8 md:py-14">
                    <div className="mb-10 text-center md:mb-12">
                        <h2 className="mb-4 font-serif text-2xl text-white md:text-4xl">
                            {t("title")}
                        </h2>
                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
                            {t("description")}
                        </p>
                    </div>

                    <div className="relative w-full">
                        <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent md:w-24" />
                        <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent md:w-24" />

                        <div className="flex select-none overflow-hidden">
                            <motion.div
                                className="flex items-center gap-12 pr-12 md:gap-20 md:pr-20"
                                animate={{ x: ["0%", "-33.33%"] }}
                                transition={{
                                    ease: "linear",
                                    duration: 30,
                                    repeat: Infinity,
                                }}
                            >
                                {duplicatedPartners.map((partner, index) => (
                                    <div
                                        key={`${partner.name}-${index}`}
                                        className="flex min-w-[150px] items-center justify-center md:min-w-[220px]"
                                    >
                                        <div className="relative h-24 w-full md:h-32">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                fill
                                                className="object-contain brightness-75 transition-all duration-300 hover:brightness-100"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
