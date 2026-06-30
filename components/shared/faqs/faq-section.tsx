"use client";

import { useTranslations } from "next-intl";
import { FAQAccordion, FAQItem } from "./faq-accordion";

interface FaqSectionProps {
    /** Namespace for custom FAQ items. Defaults to `faqs`. */
    itemsNamespace?: string;
    /** Key prefix for custom FAQ items, e.g. `lahore.faqs`. */
    itemsKey?: string;
}

export default function FaqSection({ itemsNamespace, itemsKey }: FaqSectionProps = {}) {
    const t = useTranslations("faqs");
    const tItems = useTranslations(itemsNamespace ?? "faqs");

    const rawItems = itemsKey
        ? (tItems.raw(`${itemsKey}.items`) as { question: string; answer: string }[])
        : (t.raw("items") as { question: string; answer: string }[]);

    const faqItems: FAQItem[] = rawItems.map(
        (item, index) => ({
            id: `faq-${index}`,
            question: item.question,
            answer: item.answer,
        }),
    );

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="rounded-3xl bg-gray-50 px-4 py-10 md:px-8 md:py-14 lg:px-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 xl:gap-24">
                        {/* Left — title & description */}
                        <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:sticky lg:top-32 lg:h-fit">
                            <span className="inline-block rounded-full bg-secondary/20 px-4 py-1.5 text-xs font-semibold uppercase text-primary">
                                {t("badge")}
                            </span>
                            <h2 className="text-2xl font-bold leading-tight text-primary md:text-3xl lg:text-4xl">
                                {t("title")}
                            </h2>
                            <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                                {t("description")}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                                {t("description_secondary")}
                            </p>
                        </div>

                        {/* Right — questions & answers */}
                        <div className="lg:col-span-7">
                            <FAQAccordion items={faqItems} defaultValue="faq-0" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
