import React from "react";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import { getTranslations } from "next-intl/server";
import FeaturesGrid from "@/components/features/about/features-grid";
import { ICONS } from "@/constants/icon-constants";
import StickyParallaxCTA from "@/components/features/cta/sticky-parallax-cta";
import { FAQAccordion } from "@/components/shared/faqs/faq-accordion";
import ServiceCTA from "@/components/features/cta/service-cta";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('business.partner.title'),
        description: t('business.partner.description'),
        keywords: t('business.partner.keywords'),
    };
}

export default async function PartnerWithUsPage() {

    const t = await getTranslations('business');
    const partnerFeatures = [
        {
            title: t("partner_page.features.earnings.title"),
            description: t("partner_page.features.earnings.description"),
            icon: ICONS.CAR
        },
        {
            title: t("partner_page.features.payments.title"),
            description: t("partner_page.features.payments.description"),
            icon: ICONS.TAG
        },
        {
            title: t("partner_page.features.schedule.title"),
            description: t("partner_page.features.schedule.description"),
            icon: ICONS.CLOCK
        },
        {
            title: t("partner_page.features.trust.title"),
            description: t("partner_page.features.trust.description"),
            icon: ICONS.SHIELD_CHECK
        }
    ]

    const DEFAULT_FAQS = [
        {
            question: t("partner_page.faq.items.q1.question"),
            answer: t("partner_page.faq.items.q1.answer")
        },
        {
            question: t("partner_page.faq.items.q2.question"),
            answer: t("partner_page.faq.items.q2.answer")
        },
        {
            question: t("partner_page.faq.items.q3.question"),
            answer: t("partner_page.faq.items.q3.answer")
        },
        {
            question: t("partner_page.faq.items.q4.question"),
            answer: t("partner_page.faq.items.q4.answer")
        },
        {
            question: t("partner_page.faq.items.q5.question"),
            answer: t("partner_page.faq.items.q5.answer")
        }

    ];

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CONTACT_BANNER}
                topText={t("partner_page.banner.top_text")}
                title={t.rich("partner_page.banner.title", {
                    br: () => <br />
                })}
                description={t("partner_page.banner.description")}
                button={{
                    text: t("partner_page.banner.button_text"),
                    href: "/partner-with-us/register",
                }}
            />
            <section className="py-16 bg-white pb-0">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t("partner_page.demand.title")}
                        </h2>
                        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
                            {t("partner_page.demand.description")}
                        </p>
                    </div>
                </div>
            </section>
            <FeaturesGrid
                items={partnerFeatures}
                className="bg-white"
            />
            <StickyParallaxCTA
                backgroundImage="/assets/images/cta/cta-image-1.png"
                title={t("partner_page.parallax.title")}
                subtitle={t("partner_page.parallax.subtitle")}
                description={t("partner_page.parallax.description")}
                buttonText={t("partner_page.parallax.button_text")}
                buttonLink="/partner-with-us/register"
            />
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        {/* Left Side */}
                        <div className="lg:col-span-5 flex flex-col items-start gap-6 lg:sticky lg:top-32 h-fit">
                            <div className="flex flex-col gap-2">
                                <span className="text-secondary font-bold text-sm tracking-widest uppercase">
                                    {t("partner_page.faq.top_text")}
                                </span>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                    {t("partner_page.faq.title")}
                                </h2>
                            </div>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                                {t("partner_page.faq.description")}
                            </p>
                        </div>

                        {/* Right Side: Accordion */}
                        <div className="lg:col-span-7 flex flex-col gap-4">
                            <FAQAccordion items={DEFAULT_FAQS} defaultValue="faq-0" />
                        </div>
                    </div>
                </div>
            </section>
            <ServiceCTA
                title={t("partner_page.cta.title")}
                description={t("partner_page.cta.description")}
                buttonText={t("partner_page.cta.button_text")}
                buttonLink="/contact-us"
                className="bg-gray-50"
            />
        </main>
    );
}
