"use client";

import { LucideIcon, Check } from "lucide-react";
import { ICON_COMPONENTS, IconName } from "@/constants/icon-constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/pagination";

export interface FeaturePointGroup {
    title: string;
    points: string[];
}

export interface FeatureItem {
    icon: IconName | LucideIcon;
    title: string;
    description: string;
    points?: string[];
    pointGroups?: FeaturePointGroup[];
    featured?: boolean;
}

interface FeaturesGridProps {
    topText?: string;
    title?: string;
    description?: string;
    items?: FeatureItem[];
    variant?: "carousel" | "premium";
    className?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
    {
        icon: "MapPin",
        title: "Based at Jinnah Airport",
        description: "Our office is located at Jinnah International Airport, Karachi.",
    },
    {
        icon: "ShieldCheck",
        title: "No Outsourcing",
        description: "Fully controlled in-house professional team - no third parties.",
    },
    {
        icon: "PhoneCall",
        title: "15-Minute Response",
        description: "Taxi or limousine arranged within 15 minutes guaranteed.",
    },
    {
        icon: "Car",
        title: "Luxury Vehicles",
        description: "Premium fleet with executive limousine service available.",
    },
];

function FeatureIcon({ icon, featured }: { icon: FeatureItem["icon"]; featured?: boolean }) {
    const IconComponent = typeof icon === "string" ? ICON_COMPONENTS[icon as IconName] : icon;

    return (
        <div
            className={cn(
                "mb-6 flex h-12 w-12 items-center justify-center rounded-lg",
                featured ? "bg-secondary text-primary" : "bg-primary text-secondary",
            )}
        >
            <IconComponent className="h-6 w-6" strokeWidth={2} />
        </div>
    );
}

function PremiumServiceCard({ item }: { item: FeatureItem }) {
    const featured = Boolean(item.featured);

    return (
        <article
            className={cn(
                "relative flex h-full flex-col rounded-xl border border-border p-6 md:p-7",
                featured
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200/80 bg-[#f5f5f5]",
            )}
        >
            <FeatureIcon icon={item.icon} featured={featured} />
            <h3 className={cn("mb-3 text-lg font-bold md:text-xl", featured ? "text-white" : "text-gray-900")}>
                {item.title}
            </h3>
            {item.description ? (
                <p
                    className={cn(
                        "mb-5 text-sm leading-relaxed md:text-[15px]",
                        featured ? "text-white/80" : "text-gray-500",
                    )}
                >
                    {item.description}
                </p>
            ) : null}
            {item.pointGroups && item.pointGroups.length > 0 ? (
                <div className="mt-auto grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-5">
                    {item.pointGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <p
                                className={cn(
                                    "mb-3 border-b pb-2 text-sm font-semibold md:text-[15px]",
                                    featured
                                        ? "border-white/25 text-white"
                                        : "border-gray-300 text-gray-900",
                                )}
                            >
                                {group.title}
                            </p>
                            <ul className="space-y-2.5">
                                {group.points.map((point, index) => (
                                    <li key={index} className="flex items-start gap-2.5 text-sm md:text-[15px]">
                                        <Check
                                            className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                                            strokeWidth={2.5}
                                        />
                                        <span className={featured ? "text-white/90" : "text-gray-600"}>
                                            {point}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                item.points &&
                item.points.length > 0 && (
                    <ul className="mt-auto space-y-2.5">
                        {item.points.map((point, index) => (
                            <li key={index} className="flex items-start gap-2.5 text-sm md:text-[15px]">
                                <Check
                                    className={cn(
                                        "mt-0.5 h-4 w-4 shrink-0",
                                        featured ? "text-secondary" : "text-secondary",
                                    )}
                                    strokeWidth={2.5}
                                />
                                <span className={featured ? "text-white/90" : "text-gray-600"}>{point}</span>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </article>
    );
}

function CarouselLayout({ items }: { items: FeatureItem[] }) {
    return (
        <div className="relative">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                className="features-swiper !-m-4 !p-4"
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index} className="!h-auto">
                        <div className="group h-full min-h-[250px] rounded-md border border-border bg-white/70 p-8 backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50">
                            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-secondary/20">
                                {typeof item.icon === "string" ? (
                                    (() => {
                                        const Icon = ICON_COMPONENTS[item.icon as IconName];
                                        return <Icon className="h-6 w-6 text-secondary" />;
                                    })()
                                ) : (
                                    <item.icon className="h-6 w-6 text-secondary" />
                                )}
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-500 md:text-base">{item.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default function FeaturesGrid({
    topText,
    title,
    description,
    items = DEFAULT_FEATURES,
    variant = "carousel",
    className = "",
}: FeaturesGridProps) {
    const hasHeader = topText || title || description;
    const isPremium = variant === "premium";

    return (
        <section
            className={cn(
                "overflow-hidden py-16",
                isPremium ? "bg-white" : "bg-gray-100",
                className,
            )}
        >
            <div className="container mx-auto px-4">
                {hasHeader && (
                    <div
                        className={cn(
                            "mb-10 md:mb-12",
                            isPremium ? "mx-auto max-w-3xl text-center" : "mx-auto max-w-3xl text-center",
                        )}
                    >
                        {topText && (
                            <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase text-primary">
                                {topText}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-2xl font-bold text-gray-900 md:text-4xl">{title}</h2>
                        )}
                        {isPremium && title && (
                            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-secondary" />
                        )}
                        {description && (
                            <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-base">{description}</p>
                        )}
                    </div>
                )}

                {isPremium ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        {items.map((item, index) => {
                            const centerLastAlone =
                                items.length % 3 === 1 && index === items.length - 1;

                            return (
                                <div
                                    key={index}
                                    className={cn(centerLastAlone && "lg:col-start-2")}
                                >
                                    <PremiumServiceCard item={item} />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <CarouselLayout items={items} />
                )}
            </div>
        </section>
    );
}
