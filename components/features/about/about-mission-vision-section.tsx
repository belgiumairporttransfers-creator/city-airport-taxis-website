import { Eye, Rocket, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
    Rocket,
    Eye,
};

export interface MissionVisionItem {
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    list_title: string;
    points: string[];
}

interface AboutMissionVisionSectionProps {
    items: MissionVisionItem[];
    className?: string;
}

export default function AboutMissionVisionSection({
    items,
    className,
}: AboutMissionVisionSectionProps) {
    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    {items.map((item, index) => {
                        const Icon = ICONS[item.icon] ?? Rocket;

                        return (
                            <article
                                key={index}
                                className="flex h-full flex-col rounded-2xl border border-gray-200/90 bg-white p-6 md:p-8 lg:p-9"
                            >
                                <div className="mb-5 flex h-11 w-11 items-center justify-center text-secondary">
                                    <Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden />
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 md:text-[1.65rem]">
                                    {item.title}
                                </h2>
                                <p className="mt-2 text-base font-bold text-gray-900 md:text-lg">
                                    {item.subtitle}
                                </p>
                                <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-[15px] md:leading-7">
                                    {item.description}
                                </p>

                                <p className="mt-6 text-sm font-semibold text-gray-900 md:text-base">
                                    {item.list_title}
                                </p>
                                <ul className="mt-3 space-y-2">
                                    {item.points.map((point, pointIndex) => (
                                        <li
                                            key={pointIndex}
                                            className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600 md:text-[15px]"
                                        >
                                            <span
                                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900"
                                                aria-hidden
                                            />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
