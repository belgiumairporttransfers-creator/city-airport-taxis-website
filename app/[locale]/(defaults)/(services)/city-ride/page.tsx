import React from "react";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import StorySection from "@/components/features/about/story-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import { getTranslations } from "next-intl/server";
import DestinationsSection from "@/components/features/home/destinations-section";
import WhyChooseSection from "@/components/features/about/why-choose-section";
import CustomizedTravelSection from "@/components/features/services/customized-travel-section";
import RecruitmentCTA from "@/components/features/cta/recruitment-cta";
import FleetSection from "@/components/features/home/fleet-section";

export async function generateMetadata() {
    const t = await getTranslations("meta");

    return {
        title: t("services.city_ride.title"),
        description: t("services.city_ride.description"),
        keywords: t("services.city_ride.keywords"),
    };
}

const CORPORATE_FEATURE_ICONS = ["ShieldCheck", "Clock", "Headphones", "ShieldCheck", "Clock", "Headphones"] as const;

export default async function CityRidePage() {
    const t = await getTranslations("services");
    const corporateFeatures = (t.raw("city_ride.corporate_travel.benefits") as string[]).map((label, index) => ({
        label,
        icon: CORPORATE_FEATURE_ICONS[index] ?? "ShieldCheck",
    }));

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CITY_RIDE_BANNER}
                imageAlt={t("city_ride.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("city_ride.banner.top_text_primary")}</span>
                        {" · "}
                        {t("city_ride.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("city_ride.banner.title_line1")}</span>{" "}
                        {t("city_ride.banner.title_accent")}
                    </>
                }
                description={t("city_ride.banner.description")}
                button={{ text: t("city_ride.banner.book_ride"), href: "/" }}
                secondaryButton={{ text: t("city_ride.banner.view_fleets"), href: "/fleets" }}
                stats={[
                    { end: 500, suffix: "+", label: t("city_ride.stats.corporate_partners") },
                    { end: 15, suffix: "k+", label: t("city_ride.stats.vip_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("city_ride.stats.on_time_rate") },
                    { static: "24/7", label: t("city_ride.stats.concierge_support") },
                ]}
            />
            <StorySection
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                image={IMAGES.SERVICES.CITY_RIDE.STORY_IMAGE}
                imageAlt={t("city_ride.story.image_alt")}
                imageSide="right"
                imageBadge={{
                    value: t("city_ride.story.badge.value"),
                    label: t("city_ride.story.badge.label"),
                }}
                title={t("city_ride.story.title")}
                intro={t("city_ride.story.intro")}
                numberedPoints={t.raw("city_ride.story.numbered_points") as { number: string; text: string }[]}
                closingParagraphs={t.raw("city_ride.story.closing_paragraphs") as string[]}
            />
            <FeaturesGrid
                variant="premium"
                topText={t("city_ride.premium_services.top_text")}
                title={t("city_ride.premium_services.title")}
                items={t.raw("city_ride.premium_services.items") as FeatureItem[]}
            />
             <CustomizedTravelSection
                title={t("city_ride.customized_travel.title")}
                description={t("city_ride.customized_travel.description")}
                image={IMAGES.SERVICES.CITY_RIDE.STORY_IMAGE_2}
                imageAlt={t("city_ride.customized_travel.feature.image_alt")}
                featureTitle={t("city_ride.customized_travel.feature.title")}
                featureDescription={t("city_ride.customized_travel.feature.description")}
                routesTitle={t("city_ride.customized_travel.routes.title")}
                routes={t.raw("city_ride.customized_travel.routes.items") as string[]}
                routesFooter={t("city_ride.customized_travel.routes.footer")}
                ctaText={t("city_ride.customized_travel.routes.cta")}
                ctaHref="/contact"
            />
            <DestinationsSection />
           
            <RecruitmentCTA
                image={IMAGES.CTA_IMAGE}
                tagText={t("city_ride.corporate_travel.benefits_title")}
                title={t("city_ride.corporate_travel.title")}
                description={t("city_ride.corporate_travel.description")}
                buttonText={t("city_ride.corporate_travel.button")}
                buttonHref="/corporate-travel-solutions"
                features={corporateFeatures}
            />
            <FeaturesGrid
                topText={t("city_ride.pre_booking.top_text")}
                title={t("city_ride.pre_booking.title")}
                description={t("city_ride.pre_booking.description")}
                items={t.raw("city_ride.pre_booking.items") as FeatureItem[]}
            />
               <FleetSection />
            <WhyChooseSection
                sidebar={{
                    title: t("city_ride.why_choose.sidebar.title"),
                    subtitle: t("city_ride.why_choose.sidebar.subtitle"),
                    features: t.raw("city_ride.why_choose.sidebar.features") as string[],
                    buttonText: t("city_ride.why_choose.sidebar.button"),
                    buttonHref: "/",
                }}
                title={t("city_ride.why_choose.title")}
                description={t.rich("city_ride.why_choose.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("city_ride.why_choose.reasons") as string[]}
                highlight={{
                    title: t("city_ride.why_choose.highlight.title"),
                    description: t("city_ride.why_choose.highlight.description"),
                    listTitle: t("city_ride.why_choose.highlight.list_title"),
                    listItems: t.raw("city_ride.why_choose.highlight.list_items") as string[],
                }}
            />
        </main>
    );
}
