import Image from "next/image";
import { MapPin, ShieldPlus, Wrench, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SAFETY_ICONS: Record<string, LucideIcon> = {
    MapPin,
    Wrench,
    ShieldPlus,
};

export interface DriversSafetyPanel {
    title: string;
    description: string;
    list_title: string;
    points: string[];
    image_alt: string;
}

export interface SafetyFeatureItem {
    icon: string;
    title: string;
    description: string;
}

interface AboutDriversSafetySectionProps {
    image: string;
    drivers: DriversSafetyPanel;
    safety: {
        title: string;
        features: SafetyFeatureItem[];
    };
    className?: string;
}

export default function AboutDriversSafetySection({
    image,
    drivers,
    safety,
    className,
}: AboutDriversSafetySectionProps) {
    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr] lg:gap-6">
                    <div className="relative min-h-[420px] overflow-hidden rounded-2xl md:min-h-[480px] lg:min-h-[520px]">
                        <Image
                            src={image}
                            alt={drivers.image_alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 65vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/45" />

                        <div className="relative z-10 flex h-full flex-col justify-center p-6 md:p-8 lg:p-10">
                            <h2 className="max-w-xl text-2xl font-bold leading-tight text-white md:text-3xl lg:text-[2rem]">
                                {drivers.title}
                            </h2>
                            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/85 md:text-[15px] md:leading-7">
                                {drivers.description}
                            </p>
                            <p className="mt-6 text-sm font-semibold text-secondary md:text-base">
                                {drivers.list_title}
                            </p>
                            <ul className="mt-3 space-y-2">
                                {drivers.points.map((point, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2.5 text-sm text-white/90 md:text-[15px]"
                                    >
                                        <span
                                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                                            aria-hidden
                                        />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-secondary p-6 md:p-8 lg:p-9">
                        <h2 className="text-2xl font-bold leading-tight text-primary md:text-3xl">
                            {safety.title}
                        </h2>

                        <ul className="mt-8 space-y-7">
                            {safety.features.map((feature, index) => {
                                const Icon = SAFETY_ICONS[feature.icon] ?? ShieldPlus;

                                return (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-primary">
                                            <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-primary md:text-lg">
                                                {feature.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-relaxed text-primary/80 md:text-[15px]">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
