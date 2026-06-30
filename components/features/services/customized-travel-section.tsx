import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export interface CustomizedTravelSectionProps {
    className?: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    featureTitle: string;
    featureDescription: string;
    routesTitle: string;
    routes: string[];
    routesFooter: string;
    ctaText: string;
    ctaHref?: string;
}

export default function CustomizedTravelSection({
    className,
    title,
    description,
    image,
    imageAlt,
    featureTitle,
    featureDescription,
    routesTitle,
    routes,
    routesFooter,
    ctaText,
    ctaHref = "/contact",
}: CustomizedTravelSectionProps) {
    return (
        <section className={cn("bg-white py-16 md:py-20", className)}>
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">{title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-base">{description}</p>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:items-stretch lg:gap-6">
                    <div className="relative min-h-[280px] overflow-hidden rounded-2xl lg:col-span-3 md:min-h-[360px] lg:min-h-0 lg:rounded-3xl">
                        <Image
                            src={image}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
                            <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
                                {featureTitle}
                            </h3>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
                                {featureDescription}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col rounded-2xl bg-[#141414] p-6 md:p-7 lg:col-span-2 lg:rounded-3xl lg:p-8">
                        <h3 className="text-lg font-bold text-secondary md:text-xl">{routesTitle}</h3>

                        <ul className="mt-5 grid flex-1 grid-cols-2 gap-2.5 content-start">
                            {routes.map((route, index) => (
                                <li
                                    key={index}
                                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-2.5 text-center text-xs font-medium leading-snug text-white md:text-sm"
                                >
                                    {route}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-5 text-xs leading-relaxed text-white/65 md:text-sm">{routesFooter}</p>

                        <Link
                            href={ctaHref}
                            className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-secondary transition-opacity hover:opacity-80 md:text-base"
                        >
                            {ctaText}
                            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.25} aria-hidden />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
