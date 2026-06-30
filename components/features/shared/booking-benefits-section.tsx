import Image from "next/image";
import { Check, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookingBenefitsSectionProps {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    idealFor: {
        title: string;
        items: string[];
    };
    highlights: string[];
    className?: string;
}

export default function BookingBenefitsSection({
    image,
    imageAlt,
    title,
    description,
    idealFor,
    highlights,
    className,
}: BookingBenefitsSectionProps) {
    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14 xl:gap-16">
                    <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:h-full lg:max-w-none">
                        <div
                            className="pointer-events-none absolute -bottom-4 -left-4 z-0 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-2xl border-2 border-secondary lg:h-[calc(100%-1rem)]"
                            aria-hidden
                        />
                        <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:h-full lg:min-h-[280px]">
                            <Image
                                src={image}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
                            {description}
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10">
                            <div className="flex flex-col rounded-2xl bg-primary p-5 sm:p-6">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <Handshake
                                        className="h-5 w-5 shrink-0 text-secondary"
                                        strokeWidth={2}
                                        aria-hidden
                                    />
                                    <h3 className="text-base font-bold leading-snug text-white md:text-lg">
                                        {idealFor.title}
                                    </h3>
                                </div>
                                <ul className="flex flex-col gap-3">
                                    {idealFor.items.map((item, index) => (
                                        <li key={index} className="flex items-start gap-2.5">
                                            <Check
                                                className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                                                strokeWidth={2.5}
                                                aria-hidden
                                            />
                                            <span className="text-sm leading-snug text-white/95">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-4">
                                {highlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-1 items-center rounded-2xl border border-gray-200 bg-gray-50 px-5 py-5 md:px-6 md:py-6"
                                    >
                                        <p className="text-sm font-bold leading-snug text-gray-900 md:text-base">
                                            {highlight}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
