import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PopularRoutesCard {
    title: string;
    routeLabel: string;
    destinations: string[];
}

export interface AirportCoverageSectionProps {
    title: string;
    description: string;
    areas: string[];
    popularRoutes: PopularRoutesCard;
    className?: string;
}

function splitIntoColumns<T>(items: T[]): [T[], T[]] {
    const midpoint = Math.ceil(items.length / 2);
    return [items.slice(0, midpoint), items.slice(midpoint)];
}

export default function AirportCoverageSection({
    title,
    description,
    areas,
    popularRoutes,
    className,
}: AirportCoverageSectionProps) {
    const [leftAreas, rightAreas] = splitIntoColumns(areas);
    const [leftRoutes, rightRoutes] = splitIntoColumns(popularRoutes.destinations);

    return (
        <section className={cn("py-12 md:py-16", className)}>
            <div className="container mx-auto px-4 bg-primary rounded-3xl p-6 md:p-8 lg:p-10">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-secondary md:text-3xl lg:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-[15px] md:leading-7">
                            {description}
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 md:mt-10">
                            {[leftAreas, rightAreas].map((column, columnIndex) => (
                                <ul key={columnIndex} className="space-y-3">
                                    {column.map((area, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2.5 text-sm text-white md:text-[15px]"
                                        >
                                            <MapPin
                                                className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                                                strokeWidth={2}
                                                aria-hidden
                                            />
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 md:p-8 lg:rounded-3xl">
                            <h3 className="text-lg font-bold text-white md:text-xl">
                                {popularRoutes.title}
                            </h3>

                            <div className="mt-6 grid grid-cols-1 gap-0 sm:grid-cols-2">
                                {[leftRoutes, rightRoutes].map((column, columnIndex) => (
                                    <ul
                                        key={columnIndex}
                                        className={cn(
                                            columnIndex === 1 && "sm:border-l sm:border-white/10",
                                        )}
                                    >
                                        {column.map((destination, index) => (
                                            <li
                                                key={index}
                                                className={cn(
                                                    "px-0 py-4 sm:px-4",
                                                    index < column.length - 1 &&
                                                        "border-b border-white/10",
                                                )}
                                            >
                                                <p className="text-xs text-white/45 md:text-sm">
                                                    {popularRoutes.routeLabel}
                                                </p>
                                                <p className="mt-1 text-sm font-medium text-white md:text-base">
                                                    {destination}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
