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

const SERVICE_IMAGES = IMAGES.SERVICE_PAGES.AIRLINE_CREW_TRANSFERS;

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
        title: t("services.airline_crew.title"),
        description: t("services.airline_crew.description"),
        keywords: t("services.airline_crew.keywords"),
    };
}

export default async function AirlineCrewTransfersPage() {
    const t = await getTranslations("services");

    const icons = SERVICE_PAGE_ICONS.airline_crew;
    const premium = withFeatureIcons(
        t.raw("airline_crew.premium_services.items") as TranslatableFeatureItem[],
        icons.premium_services,
        icons.premium_services_featured_index
    );
    const coverage = withFeatureIcons(
        t.raw("airline_crew.coverage.items") as TranslatableFeatureItem[],
        icons.coverage
    );
    const support = withFeatureIcons(
        t.raw("airline_crew.support.items") as TranslatableFeatureItem[],
        icons.support
    );

    return (
        <main className="min-h-screen">
            <Banner
                image={SERVICE_IMAGES.BANNER}
                imageAlt={t("airline_crew.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("airline_crew.banner.top_text_primary")}</span>
                        {" · "}
                        {t("airline_crew.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("airline_crew.banner.title_line1")}</span>{" "}
                        {t("airline_crew.banner.title_accent")}
                    </>
                }
                description={t("airline_crew.banner.description")}
                centerContent
                stats={[
                    { end: 500, suffix: "+", label: t("airline_crew.stats.corporate_partners") },
                    { end: 15, suffix: "k+", label: t("airline_crew.stats.vip_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("airline_crew.stats.on_time_rate") },
                    { static: "24/7", label: t("airline_crew.stats.support") },
                ]}
            />
              <FeaturesGrid
                topText={t("airline_crew.support.top_text")}
                title={t("airline_crew.support.title")}
                description={t("airline_crew.support.description")}
                items={support}
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
            />
            <AirlineCrewStorySection
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                image={SERVICE_IMAGES.STORY}
                imageAlt={t("airline_crew.story.image_alt")}
                imageBadge={{
                    value: t("airline_crew.story.badge.value"),
                    label: t("airline_crew.story.badge.label"),
                }}
                title={
                    <>
                        <span className="text-secondary">{t("airline_crew.story.title_line1")}</span>{" "}
                        {t("airline_crew.story.title_accent")}
                    </>
                }
                paragraphs={t.raw("airline_crew.story.paragraphs") as string[]}
                accountTitle={t("airline_crew.story.account.title")}
                accountDescription={t("airline_crew.story.account.description")}
                accountPoints={t.raw("airline_crew.story.account.points") as string[]}
            />
            <FeaturesGrid
                variant="premium"
                topText={t("airline_crew.premium_services.top_text")}
                title={t("airline_crew.premium_services.title")}
                items={premium}
            />
            <DestinationsSection />
            <FeaturesGrid
                variant="premium"
                topText={t("airline_crew.coverage.top_text")}
                title={t("airline_crew.coverage.title")}
                description={t("airline_crew.coverage.description")}
                items={coverage}
            />
            <FleetSection />
            <WhyChooseSection
                sidebar={{
                    badge: t("airline_crew.why_choose.sidebar.badge"),
                    title: t("airline_crew.why_choose.sidebar.title"),
                    subtitle: t("airline_crew.why_choose.sidebar.subtitle"),
                    features: t.raw("airline_crew.why_choose.sidebar.features") as string[],
                    buttonText: t("airline_crew.why_choose.sidebar.button"),
                    buttonHref: "/corporate-travel-solutions/register",
                }}
                title={t("airline_crew.why_choose.title")}
                description={t.rich("airline_crew.why_choose.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("airline_crew.why_choose.reasons") as string[]}
                highlight={{
                    title: t("airline_crew.why_choose.highlight.title"),
                    description: t("airline_crew.why_choose.highlight.description"),
                    listTitle: t("airline_crew.why_choose.highlight.list_title"),
                    listItems: t.raw("airline_crew.why_choose.highlight.list_items") as string[],
                    ctaText: t("airline_crew.why_choose.highlight.ctaText"),
                    ctaHref: t("airline_crew.why_choose.highlight.ctaHref"),
                }}
            />
          
        </main>
    );
}
