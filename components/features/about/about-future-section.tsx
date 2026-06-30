import { CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FutureItem {
    title: string;
    description: string;
}

interface AboutFutureSectionProps {
    title: string;
    description: string;
    items: FutureItem[];
    className?: string;
}

function FutureCard({ item }: { item: FutureItem }) {
    return (
        <article className="flex h-full flex-col rounded-2xl border border-gray-200/90 bg-white p-6 md:p-7">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-secondary">
                <CalendarCheck className="h-5 w-5" strokeWidth={2} aria-hidden />
            </div>
            <h3 className="text-base font-bold text-gray-900 md:text-lg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 md:text-[15px]">
                {item.description}
            </p>
        </article>
    );
}

export default function AboutFutureSection({
    title,
    description,
    items,
    className,
}: AboutFutureSectionProps) {
    const topRow = items.slice(0, 3);
    const bottomRow = items.slice(3, 5);

    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">{title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-base">{description}</p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {topRow.map((item, index) => (
                        <FutureCard key={index} item={item} />
                    ))}
                </div>

                {bottomRow.length > 0 && (
                    <div className="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-6 lg:gap-6">
                        {bottomRow.map((item, index) => (
                            <FutureCard key={index} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
