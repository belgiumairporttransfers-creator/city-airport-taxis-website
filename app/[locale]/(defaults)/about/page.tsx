import React from "react";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import StorySection from "@/components/features/about/story-section";
import AboutMissionVisionSection, {
    type MissionVisionItem,
} from "@/components/features/about/about-mission-vision-section";
import AboutDriversSafetySection, {
    type DriversSafetyPanel,
    type SafetyFeatureItem,
} from "@/components/features/about/about-drivers-safety-section";
import AboutFutureSection, { type FutureItem } from "@/components/features/about/about-future-section";
import NationwideCoverageSection, {
    type CoverageCategory,
} from "@/components/features/shared/nationwide-coverage-section";
import { getTranslations } from "next-intl/server";
import FleetSection from "@/components/features/home/fleet-section";
import WhyChooseSection from "@/components/features/about/why-choose-section";
import CorporateTravelSection from "@/components/features/shared/corporate-travel-section";

export async function generateMetadata() {
    const t = await getTranslations("meta");

    return {
        title: t("about.title"),
        description: t("about.description"),
        keywords: t("about.keywords"),
    };
}

export default async function AboutPage() {
    const t = await getTranslations("about");
    const tCoverage = await getTranslations("coverage");

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.ABOUT_BANNER}
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
                    { end: 500, suffix: "+", label: t("stats.corporate_partners") },
                    { end: 15, suffix: "k+", label: t("stats.vip_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("stats.on_time_rate") },
                    { static: "24/7", label: t("stats.concierge_support") },
                ]}
            />
            <StorySection
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                image={IMAGES.ABOUT_US.STORY_IMAGE}
                imageAlt={t("story.image_alt")}
                topText={t("story.top_text")}
                title={t("story.title")}
                paragraphs={t.raw("story.paragraphs") as string[]}
                imageBadge={{
                    value: t("story.badge.value"),
                    label: t("story.badge.label"),
                }}
                stats={t.raw("story.stats") as { value: string; label: string }[]}
            />
            <AboutMissionVisionSection
                items={t.raw("mission_vision.items") as MissionVisionItem[]}
            />
            <AboutDriversSafetySection
                image={IMAGES.ABOUT_US.DRIVERS_PANEL}
                drivers={t.raw("drivers_safety.drivers") as DriversSafetyPanel}
                safety={{
                    title: t("drivers_safety.safety.title"),
                    features: t.raw("drivers_safety.safety.features") as SafetyFeatureItem[],
                }}
            />
            <AboutFutureSection
                title={t("future.title")}
                description={t("future.description")}
                items={t.raw("future.items") as FutureItem[]}
            />
            <NationwideCoverageSection
                title={tCoverage("nationwide.title")}
                image={IMAGES.ABOUT_US.NATIONWIDE_COVERAGE}
                imageAlt={tCoverage("nationwide.image_alt")}
                categories={tCoverage.raw("nationwide.categories") as CoverageCategory[]}
            />
              <CorporateTravelSection
                title={t("corporate_travel.title")}
                paragraphs={t.raw("corporate_travel.paragraphs") as string[]}
                benefitsTitle={t("corporate_travel.benefits_title")}
                benefits={t.raw("corporate_travel.benefits") as string[]}
                accountCard={{
                    title: t("corporate_travel.account_card.title"),
                    description: t("corporate_travel.account_card.description"),
                    ctaText: t("corporate_travel.account_card.cta_text"),
                    ctaHref: t("corporate_travel.account_card.cta_href"),
                }}
            />
            <FleetSection />
            <WhyChooseSection
                sidebar={{
                    title: t("why_choose.sidebar.title"),
                    subtitle: t("why_choose.sidebar.subtitle"),
                    features: t.raw("why_choose.sidebar.features") as string[],
                    buttonText: t("why_choose.sidebar.button"),
                    buttonHref: "/",
                }}
                title={t("why_choose.title")}
                description={t.rich("why_choose.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("why_choose.reasons") as string[]}
                highlight={{
                    title: t("why_choose.highlight.title"),
                    description: t("why_choose.highlight.description"),
                    listTitle: t("why_choose.highlight.list_title"),
                    listItems: t.raw("why_choose.highlight.list_items") as string[],
                }}
            />
          
        </main>
    );
}
