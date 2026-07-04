import React from "react";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import AirlineCrewStorySection from "@/components/features/services/airline-crew-story-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import { getTranslations } from "next-intl/server";
import DestinationsSection from "@/components/features/home/destinations-section";
import WhyChooseSection from "@/components/features/about/why-choose-section";
import FleetSection from "@/components/features/home/fleet-section";
import FaqSection from "@/components/shared/faqs/faq-section";
import BookingCTASection from "@/components/features/shared/booking-cta-section";
import { SERVICE_PAGE_ICONS, type IconName } from "@/constants/icon-constants";

const PAGE_IMAGES = IMAGES.CITY_PAGES.BRUSSELS_TO_MAASTRICHT;

type TranslatableFeatureItem = Omit<FeatureItem, "icon">;

function withFeatureIcons(
    items: TranslatableFeatureItem[],
    icons: readonly IconName[],
    featuredIndex?: number
): FeatureItem[] {
    return items.map((item, index) => ({
        ...item,
        icon: icons[index] ?? icons[0],
        ...(featuredIndex === index ? { featured: true } : {}),
    }));
}

export async function generateMetadata() {
    const t = await getTranslations("meta");

    return {
        title: t("cities.brussels_to_maastricht.title"),
        description: t("cities.brussels_to_maastricht.description"),
        keywords: t("cities.brussels_to_maastricht.keywords"),
    };
}

export default async function BrusselsToMaastrichtPage() {
    const t = await getTranslations("cities");

    const icons = SERVICE_PAGE_ICONS.brussels_to_maastricht;
    const premiumServices = withFeatureIcons(
        t.raw("brussels_to_maastricht.premium_services.items") as TranslatableFeatureItem[],
        icons.premium_services,
        icons.premium_services_featured_index
    );
    const whyChoose = withFeatureIcons(
        t.raw("brussels_to_maastricht.why_choose.items") as TranslatableFeatureItem[],
        icons.why_choose
    );

    return (
        <main className="min-h-screen">
            <Banner
                image={PAGE_IMAGES.BANNER}
                imageAlt={t("brussels_to_maastricht.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("brussels_to_maastricht.banner.top_text_primary")}</span>
                        {" · "}
                        {t("brussels_to_maastricht.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("brussels_to_maastricht.banner.title_line1")}</span>{" "}
                        {t("brussels_to_maastricht.banner.title_accent")}
                    </>
                }
                description={t("brussels_to_maastricht.banner.description")}
                centerContent
                stats={[
                    { end: 500, suffix: "+", label: t("brussels_to_maastricht.stats.corporate_clients") },
                    { end: 6, suffix: "k+", label: t("brussels_to_maastricht.stats.maastricht_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("brussels_to_maastricht.stats.on_time_rate") },
                    { static: "24/7", label: t("brussels_to_maastricht.stats.support") },
                ]}
            />
            <FeaturesGrid
                variant="premium"
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                title={t("brussels_to_maastricht.premium_services.title")}
                description={t("brussels_to_maastricht.premium_services.description")}
                items={premiumServices}
            />
            <AirlineCrewStorySection
                className="pb-12 sm:pb-12 md:pb-16"
                image={PAGE_IMAGES.CITYSCAPE}
                imageAlt={t("brussels_to_maastricht.story.image_alt")}
                imageBadge={{
                    value: t("brussels_to_maastricht.story.badge.value"),
                    label: t("brussels_to_maastricht.story.badge.label"),
                }}
                title={
                    <>
                        <span className="text-secondary">{t("brussels_to_maastricht.story.title_line1")}</span>{" "}
                        {t("brussels_to_maastricht.story.title_accent")}
                    </>
                }
                paragraphs={t.raw("brussels_to_maastricht.story.paragraphs") as string[]}
                accountTitle={t("brussels_to_maastricht.story.account.title")}
                accountDescription={t("brussels_to_maastricht.story.account.description")}
                accountPoints={t.raw("brussels_to_maastricht.story.account.points") as string[]}
            />
            <FeaturesGrid
                className="pb-12 md:pb-16"
                title={t("brussels_to_maastricht.why_choose.title")}
                description={t("brussels_to_maastricht.why_choose.description")}
                items={whyChoose}
            />
            <DestinationsSection />
            <FleetSection />
            <FaqSection itemsNamespace="cities" itemsKey="brussels_to_maastricht.faqs" />
            <WhyChooseSection
                sidebar={{
                    badge: t("brussels_to_maastricht.why_choose_section.sidebar.badge"),
                    title: t("brussels_to_maastricht.why_choose_section.sidebar.title"),
                    subtitle: t("brussels_to_maastricht.why_choose_section.sidebar.subtitle"),
                    features: t.raw("brussels_to_maastricht.why_choose_section.sidebar.features") as string[],
                    buttonText: t("brussels_to_maastricht.why_choose_section.sidebar.button"),
                    buttonHref: "/",
                }}
                title={t("brussels_to_maastricht.why_choose_section.title")}
                description={t.rich("brussels_to_maastricht.why_choose_section.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("brussels_to_maastricht.why_choose_section.reasons") as string[]}
                highlight={{
                    title: t("brussels_to_maastricht.why_choose_section.highlight.title"),
                    description: t("brussels_to_maastricht.why_choose_section.highlight.description"),
                    listTitle: t("brussels_to_maastricht.why_choose_section.highlight.list_title"),
                    listItems: t.raw("brussels_to_maastricht.why_choose_section.highlight.list_items") as string[],
                    ctaText: t("brussels_to_maastricht.why_choose_section.highlight.ctaText"),
                    ctaHref: t("brussels_to_maastricht.why_choose_section.highlight.ctaHref"),
                }}
            />
            <BookingCTASection
                title={t("brussels_to_maastricht.booking_cta.title")}
                description={t("brussels_to_maastricht.booking_cta.description")}
                bookOnlineText={t("brussels_to_maastricht.booking_cta.book_online")}
                callSupportText={t("brussels_to_maastricht.booking_cta.call_support")}
            />
        </main>
    );
}
