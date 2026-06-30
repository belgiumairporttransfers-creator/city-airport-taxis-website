import React from "react";
import Image from "next/image";
import { ShieldCheck, Clock, Headphones, ArrowRight, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

const ICON_MAP: Record<string, LucideIcon> = {
    ShieldCheck: ShieldCheck,
    Clock: Clock,
    Headphones: Headphones,
};

interface Feature {
    icon?: string | LucideIcon;
    label: string;
}

interface RecruitmentCTAProps {
    image: string;
    tagText?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonHref?: string;
    features?: Feature[];
    className?: string;
}

const DEFAULT_FEATURES: Feature[] = [
    { icon: "ShieldCheck", label: "FULLY INSURED" },
    { icon: "Clock", label: "Instant Booking" },
    { icon: "Headphones", label: "24/7 Support" },
];

export default function RecruitmentCTA({
    image,
    tagText = "Limited Time Offer",
    title,
    description,
    buttonText = "Apply Now",
    buttonHref = "/corporate-travel-solutions/register",
    features = DEFAULT_FEATURES,
    className = "",
}: RecruitmentCTAProps) {
    return (
        <section className={`py-16 px-4 ${className}`}>
            <div className="container mx-auto">
                <div className="relative w-full min-h-[450px] md:min-h-[500px] rounded-lg overflow-hidden">
                    <Image
                        src={image}
                        alt="Recruitment background"
                        fill
                        className="object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 max-w-3xl">
                        {tagText && (
                            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-border px-4 py-1.5 rounded-full mb-8 self-start">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-gray-400 text-xs md:text-sm font-semibold uppercase">
                                    {tagText}
                                </span>
                            </div>
                        )}

                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                            {title}
                        </h2>

                        <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4">
                            {description}
                        </p>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-5 md:gap-y-6">
                            {features.map((feature, index) => {
                                const IconComponent = typeof feature.icon === "string" ? ICON_MAP[feature.icon] || ShieldCheck : (feature.icon || ShieldCheck);

                                return (
                                    <div key={index} className="flex min-w-0 items-center gap-3 group">
                                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-secondary/20 group-hover:border-secondary/20">
                                            <IconComponent className="w-5 h-5 text-secondary" />
                                        </div>
                                        <span className="text-white/90 font-bold text-[11px] tracking-widest uppercase">
                                            {feature.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                            <Link
                                href={buttonHref}
                                className="inline-flex items-center gap-2 px-6 py-2 bg-secondary hover:bg-secondary-600 text-white rounded-full font-bold text-base transition-all duration-300 w-fit  mt-6"
                            >
                                {buttonText}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
