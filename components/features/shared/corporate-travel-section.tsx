import { Building2, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export interface CorporateAccountCard {
    title: string;
    description: string;
    ctaText: string;
    ctaHref?: string;
}

export interface CorporateTravelSectionProps {
    title: string;
    paragraphs: string[];
    benefitsTitle: string;
    benefits: string[];
    accountCard: CorporateAccountCard;
    className?: string;
}

export default function CorporateTravelSection({
    title,
    paragraphs,
    benefitsTitle,
    benefits,
    accountCard,
    className,
}: CorporateTravelSectionProps) {
    return (
        <section className={cn("bg-white py-12 md:py-16", className)}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.7fr_1fr] lg:gap-6">
                    <div className="rounded-2xl border border-gray-200/90 bg-[#f5f5f5] p-6 md:p-8 lg:rounded-3xl lg:p-10">
                        <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-[1.65rem]">
                            {title}
                        </h2>

                        <div className="mt-4 space-y-4">
                            {paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-sm leading-relaxed text-gray-600 md:text-[15px] md:leading-7"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <p className="mt-6 text-sm font-bold text-gray-900 md:text-base">
                            {benefitsTitle}
                        </p>

                        <div className="mt-4 rounded-2xl bg-secondary p-5 md:p-6">
                            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                                {benefits.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2.5 text-sm font-medium text-primary md:text-[15px]"
                                    >
                                        <Check
                                            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                            strokeWidth={2.5}
                                            aria-hidden
                                        />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-2xl bg-primary px-6 py-10 text-center md:px-8 md:py-12 lg:rounded-3xl">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                            <Building2 className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                        </div>

                        <h3 className="text-xl font-bold text-white md:text-2xl">{accountCard.title}</h3>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/80 md:text-[15px] md:leading-7">
                            {accountCard.description}
                        </p>

                        <Link
                            href={accountCard.ctaHref ?? "/corporate-travel-solutions/register"}
                            className="mt-8 text-sm font-bold text-secondary underline underline-offset-4 transition-opacity hover:opacity-80 md:text-base"
                        >
                            {accountCard.ctaText}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
