import React from "react";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import ContactInfoCards from "@/components/features/contact/contact-info-cards";
import ContactFormSection from "@/components/features/contact/contact-form-section";
import NationwideCoverageSection, {
    type CoverageCategory,
} from "@/components/features/shared/nationwide-coverage-section";
import WhyChooseSection from "@/components/features/about/why-choose-section";
import CorporateTravelSection from "@/components/features/shared/corporate-travel-section";
import FaqSection from "@/components/shared/faqs/faq-section";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('contact.title'),
        description: t('contact.description'),
        keywords: t('contact.keywords'),
    };
}

export default async function ContactPage() {
    
    const t = await getTranslations("contact");
    const tAbout = await getTranslations("about");

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CONTACT_BANNER}
                imageAlt={t("banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("banner.top_text_primary")}</span>
                        {" · "}
                        {t("banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("banner.title_line1")}</span>{" "}
                        {t("banner.title_accent")}
                    </>
                }
                description={t("banner.description")}
                centerContent
                stats={[
                    { end: 500, suffix: "+", label: tAbout("stats.corporate_partners") },
                    { end: 15, suffix: "k+", label: tAbout("stats.vip_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: tAbout("stats.on_time_rate") },
                    { static: "24/7", label: tAbout("stats.concierge_support") },
                ]}
            />
            <div className="pt-42 pb-4 sm:pt-42 md:pt-52">
                <ContactInfoCards />
            </div>
            <ContactFormSection />
           
       
            <CorporateTravelSection
                title={tAbout("corporate_travel.title")}
                paragraphs={tAbout.raw("corporate_travel.paragraphs") as string[]}
                benefitsTitle={tAbout("corporate_travel.benefits_title")}
                benefits={tAbout.raw("corporate_travel.benefits") as string[]}
                accountCard={{
                    title: tAbout("corporate_travel.account_card.title"),
                    description: tAbout("corporate_travel.account_card.description"),
                    ctaText: tAbout("corporate_travel.account_card.cta_text"),
                    ctaHref: tAbout("corporate_travel.account_card.cta_href"),
                }}
            />
             <NationwideCoverageSection
                title={t("service_locations.title")}
                image={IMAGES.CONTACT.SERVICE_LOCATIONS}
                imageAlt={t("service_locations.image_alt")}
                categories={t.raw("service_locations.categories") as CoverageCategory[]}
            />
            <FaqSection />
            <WhyChooseSection
                sidebar={{
                    title: t("why_choose.sidebar.title"),
                    subtitle: t("why_choose.sidebar.subtitle"),
                    features: t.raw("why_choose.sidebar.features") as string[],
                    buttonText: t("why_choose.sidebar.button"),
                    buttonHref: "/#book-ride-form",
                }}
                title={t("why_choose.title")}
                description={t.rich("why_choose.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("why_choose.reasons") as string[]}
                highlight={{
                    tagText: t("why_choose.highlight.tag"),
                    title: t("why_choose.highlight.title"),
                    description: t("why_choose.highlight.description"),
                    ctaText: t("why_choose.highlight.cta_text"),
                    ctaHref: "/",
                }}
            />
        </main>
    );
}
