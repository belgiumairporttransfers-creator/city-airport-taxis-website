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

const SERVICE_IMAGES = IMAGES.SERVICE_PAGES.CORPORATE_TRANSFERS;

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
        title: t("services.corporate_transfers.title"),
        description: t("services.corporate_transfers.description"),
        keywords: t("services.corporate_transfers.keywords"),
    };
}

export default async function CorporateTransfersPage() {
    const t = await getTranslations("services");

    const icons = SERVICE_PAGE_ICONS.corporate_transfers;
    const premium = withFeatureIcons(
        t.raw("corporate_transfers.premium_services.items") as TranslatableFeatureItem[],
        icons.premium_services,
        icons.premium_services_featured_index
    );
    const coverage = withFeatureIcons(
        t.raw("corporate_transfers.coverage.items") as TranslatableFeatureItem[],
        icons.coverage
    );
    const support = withFeatureIcons(
        t.raw("corporate_transfers.support.items") as TranslatableFeatureItem[],
        icons.support
    );

    return (
        <main className="min-h-screen">
            <Banner
                image={SERVICE_IMAGES.BANNER}
                imageAlt={t("corporate_transfers.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("corporate_transfers.banner.top_text_primary")}</span>
                        {" · "}
                        {t("corporate_transfers.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("corporate_transfers.banner.title_line1")}</span>{" "}
                        {t("corporate_transfers.banner.title_accent")}
                    </>
                }
                description={t("corporate_transfers.banner.description")}
                centerContent
                stats={[
                    { end: 500, suffix: "+", label: t("corporate_transfers.stats.corporate_partners") },
                    { end: 15, suffix: "k+", label: t("corporate_transfers.stats.vip_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("corporate_transfers.stats.on_time_rate") },
                    { static: "24/7", label: t("corporate_transfers.stats.support") },
                ]}
            />
            <FeaturesGrid
                topText={t("corporate_transfers.support.top_text")}
                title={t("corporate_transfers.support.title")}
                description={t("corporate_transfers.support.description")}
                items={support}
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
            />
            <AirlineCrewStorySection
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                image={SERVICE_IMAGES.STORY}
                imageAlt={t("corporate_transfers.story.image_alt")}
                imageBadge={{
                    value: t("corporate_transfers.story.badge.value"),
                    label: t("corporate_transfers.story.badge.label"),
                }}
                title={
                    <>
                        <span className="text-secondary">{t("corporate_transfers.story.title_line1")}</span>{" "}
                        {t("corporate_transfers.story.title_accent")}
                    </>
                }
                paragraphs={t.raw("corporate_transfers.story.paragraphs") as string[]}
                accountTitle={t("corporate_transfers.story.account.title")}
                accountDescription={t("corporate_transfers.story.account.description")}
                accountPoints={t.raw("corporate_transfers.story.account.points") as string[]}
            />
            <FeaturesGrid
                variant="premium"
                topText={t("corporate_transfers.premium_services.top_text")}
                title={t("corporate_transfers.premium_services.title")}
                items={premium}
            />
            <DestinationsSection />
            <FeaturesGrid
                variant="premium"
                topText={t("corporate_transfers.coverage.top_text")}
                title={t("corporate_transfers.coverage.title")}
                description={t("corporate_transfers.coverage.description")}
                items={coverage}
            />
            <FleetSection />
            <WhyChooseSection
                sidebar={{
                    badge: t("corporate_transfers.why_choose.sidebar.badge"),
                    title: t("corporate_transfers.why_choose.sidebar.title"),
                    subtitle: t("corporate_transfers.why_choose.sidebar.subtitle"),
                    features: t.raw("corporate_transfers.why_choose.sidebar.features") as string[],
                    buttonText: t("corporate_transfers.why_choose.sidebar.button"),
                    buttonHref: "/corporate-travel-solutions/register",
                }}
                title={t("corporate_transfers.why_choose.title")}
                description={t.rich("corporate_transfers.why_choose.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("corporate_transfers.why_choose.reasons") as string[]}
                highlight={{
                    title: t("corporate_transfers.why_choose.highlight.title"),
                    description: t("corporate_transfers.why_choose.highlight.description"),
                    listTitle: t("corporate_transfers.why_choose.highlight.list_title"),
                    listItems: t.raw("corporate_transfers.why_choose.highlight.list_items") as string[],
                    ctaText: t("corporate_transfers.why_choose.highlight.ctaText"),
                    ctaHref: t("corporate_transfers.why_choose.highlight.ctaHref"),
                }}
            />
        </main>
    );
}
