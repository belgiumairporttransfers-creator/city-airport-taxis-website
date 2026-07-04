import React from "react";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import AirlineCrewStorySection from "@/components/features/services/airline-crew-story-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import { getTranslations } from "next-intl/server";
import DestinationsSection from "@/components/features/home/destinations-section";
import WhyChooseSection from "@/components/features/about/why-choose-section";
import FleetSection from "@/components/features/home/fleet-section";
import { SERVICE_PAGE_ICONS, type IconName } from "@/constants/icon-constants";

const SERVICE_IMAGES = IMAGES.SERVICE_PAGES.DIPLOMATIC_EMBASSY_TRANSFERS;

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
        title: t("services.diplomatic_embassy_transfers.title"),
        description: t("services.diplomatic_embassy_transfers.description"),
        keywords: t("services.diplomatic_embassy_transfers.keywords"),
    };
}

export default async function DiplomaticEmbassyTransfersPage() {
    const t = await getTranslations("services");

    const icons = SERVICE_PAGE_ICONS.diplomatic_embassy_transfers;
    const premium = withFeatureIcons(
        t.raw("diplomatic_embassy_transfers.premium_services.items") as TranslatableFeatureItem[],
        icons.premium_services,
        icons.premium_services_featured_index
    );
    const coverage = withFeatureIcons(
        t.raw("diplomatic_embassy_transfers.coverage.items") as TranslatableFeatureItem[],
        icons.coverage
    );
    const support = withFeatureIcons(
        t.raw("diplomatic_embassy_transfers.support.items") as TranslatableFeatureItem[],
        icons.support
    );

    return (
        <main className="min-h-screen">
            <Banner
                image={SERVICE_IMAGES.BANNER}
                imageAlt={t("diplomatic_embassy_transfers.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("diplomatic_embassy_transfers.banner.top_text_primary")}</span>
                        {" · "}
                        {t("diplomatic_embassy_transfers.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("diplomatic_embassy_transfers.banner.title_line1")}</span>{" "}
                        {t("diplomatic_embassy_transfers.banner.title_accent")}
                    </>
                }
                description={t("diplomatic_embassy_transfers.banner.description")}
                centerContent
                stats={[
                    { end: 50, suffix: "+", label: t("diplomatic_embassy_transfers.stats.premium_vehicles") },
                    { end: 15, suffix: "+", label: t("diplomatic_embassy_transfers.stats.years_experience") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("diplomatic_embassy_transfers.stats.on_time_rate") },
                    { static: "24/7", label: t("diplomatic_embassy_transfers.stats.availability") },
                ]}
            />
            <FeaturesGrid
                topText={t("diplomatic_embassy_transfers.support.top_text")}
                title={t("diplomatic_embassy_transfers.support.title")}
                description={t("diplomatic_embassy_transfers.support.description")}
                items={support}
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
            />
            <AirlineCrewStorySection
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                image={SERVICE_IMAGES.STORY}
                imageAlt={t("diplomatic_embassy_transfers.story.image_alt")}
                imageBadge={{
                    value: t("diplomatic_embassy_transfers.story.badge.value"),
                    label: t("diplomatic_embassy_transfers.story.badge.label"),
                }}
                title={
                    <>
                        <span className="text-secondary">{t("diplomatic_embassy_transfers.story.title_line1")}</span>{" "}
                        {t("diplomatic_embassy_transfers.story.title_accent")}
                    </>
                }
                paragraphs={t.raw("diplomatic_embassy_transfers.story.paragraphs") as string[]}
                accountTitle={t("diplomatic_embassy_transfers.story.account.title")}
                accountDescription={t("diplomatic_embassy_transfers.story.account.description")}
                accountPoints={t.raw("diplomatic_embassy_transfers.story.account.points") as string[]}
            />
            <FeaturesGrid
                variant="premium"
                topText={t("diplomatic_embassy_transfers.premium_services.top_text")}
                title={t("diplomatic_embassy_transfers.premium_services.title")}
                items={premium}
            />
            <DestinationsSection />
            <FeaturesGrid
                variant="premium"
                topText={t("diplomatic_embassy_transfers.coverage.top_text")}
                title={t("diplomatic_embassy_transfers.coverage.title")}
                description={t("diplomatic_embassy_transfers.coverage.description")}
                items={coverage}
            />
            <FleetSection />
            <WhyChooseSection
                sidebar={{
                    badge: t("diplomatic_embassy_transfers.why_choose.sidebar.badge"),
                    title: t("diplomatic_embassy_transfers.why_choose.sidebar.title"),
                    subtitle: t("diplomatic_embassy_transfers.why_choose.sidebar.subtitle"),
                    features: t.raw("diplomatic_embassy_transfers.why_choose.sidebar.features") as string[],
                    buttonText: t("diplomatic_embassy_transfers.why_choose.sidebar.button"),
                    buttonHref: "/contact-us",
                }}
                title={t("diplomatic_embassy_transfers.why_choose.title")}
                description={t.rich("diplomatic_embassy_transfers.why_choose.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("diplomatic_embassy_transfers.why_choose.reasons") as string[]}
                highlight={{
                    title: t("diplomatic_embassy_transfers.why_choose.highlight.title"),
                    description: t("diplomatic_embassy_transfers.why_choose.highlight.description"),
                    listTitle: t("diplomatic_embassy_transfers.why_choose.highlight.list_title"),
                    listItems: t.raw("diplomatic_embassy_transfers.why_choose.highlight.list_items") as string[],
                    ctaText: t("diplomatic_embassy_transfers.why_choose.highlight.ctaText"),
                    ctaHref: t("diplomatic_embassy_transfers.why_choose.highlight.ctaHref"),
                }}
            />
        </main>
    );
}
