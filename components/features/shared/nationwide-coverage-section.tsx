import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CoverageCategory {
    label: string;
    items: string[];
}

export interface NationwideCoverageSectionProps {
    title: string;
    image: string;
    imageAlt: string;
    categories: CoverageCategory[];
    /** Black content panel position on large screens. Default: left */
    contentSide?: "left" | "right";
    className?: string;
}

function CoveragePanel({
    title,
    categories,
}: {
    title: string;
    categories: CoverageCategory[];
}) {
    return (
        <div className="flex h-full flex-col justify-center rounded-2xl bg-primary p-6 md:p-8 lg:rounded-3xl lg:p-10">
            <h2 className="text-xl font-bold leading-snug text-white md:text-2xl lg:text-[1.65rem]">
                {title}
            </h2>

            <div className="mt-8 space-y-6 md:mt-10">
                {categories.map((category, index) => (
                    <div key={index}>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary md:text-xs">
                            {category.label}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {category.items.map((item, itemIndex) => (
                                <li
                                    key={itemIndex}
                                    className="rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white md:px-3.5 md:py-2.5 md:text-sm"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CoverageImage({ image, imageAlt }: { image: string; imageAlt: string }) {
    return (
        <div className="relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[380px] lg:min-h-full lg:rounded-3xl">
            <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
            />
        </div>
    );
}

export default function NationwideCoverageSection({
    title,
    image,
    imageAlt,
    categories,
    contentSide = "left",
    className,
}: NationwideCoverageSectionProps) {
    const panel = <CoveragePanel title={title} categories={categories} />;
    const imageColumn = <CoverageImage image={image} imageAlt={imageAlt} />;

    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
                    {contentSide === "right" ? (
                        <>
                            {imageColumn}
                            {panel}
                        </>
                    ) : (
                        <>
                            {panel}
                            {imageColumn}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
