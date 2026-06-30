import React from "react";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import StorySection from "@/components/features/about/story-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import { getTranslations } from "next-intl/server";
import DestinationsSection from "@/components/features/home/destinations-section";
import WhyChooseSection from "@/components/features/about/why-choose-section";
import FleetSection from "@/components/features/home/fleet-section";

export async function generateMetadata() {
    const t = await getTranslations("meta");

    return {
        title: t("services.airport_transfer.title"),
        description: t("services.airport_transfer.description"),
        keywords: t("services.airport_transfer.keywords"),
    };
}

export default async function AirportTransferPage() {
    const t = await getTranslations("services");

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.AIRPORT_TRANSFER_BANNER}
                imageAlt={t("airport_transfer.banner.image_alt")}
                topText={t("airport_transfer.banner.top_text")}
                title={
                    <>
                        {t("airport_transfer.banner.title_line1")}{" "}
                        <span className="text-secondary">{t("airport_transfer.banner.title_accent")}</span>
                    </>
                }
                description={t("airport_transfer.banner.description")}
                button={{ text: t("airport_transfer.banner.book_ride"), href: "/" }}
                secondaryButton={{ text: t("airport_transfer.banner.view_fleets"), href: "/fleets" }}
                stats={[
                    { end: 500, suffix: "+", label: t("airport_transfer.stats.corporate_partners") },
                    { end: 15, suffix: "k+", label: t("airport_transfer.stats.vip_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("airport_transfer.stats.on_time_rate") },
                    { static: "24/7", label: t("airport_transfer.stats.concierge_support") },
                ]}
            />
            <StorySection
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                image={IMAGES.SERVICES.AIRPORT_TRANSFER.STORY_IMAGE}
                imageAlt={t("airport_transfer.story.image_alt")}
                imageSide="right"
                imageBadge={{
                    value: t("airport_transfer.story.badge.value"),
                    label: t("airport_transfer.story.badge.label"),
                }}
                title={t("airport_transfer.story.title")}
                paragraphs={t.raw("airport_transfer.story.paragraphs") as string[]}
                points={t.raw("airport_transfer.story.highlights") as string[]}
                pointsColumns={2}
            />
            <FeaturesGrid
                variant="premium"
                topText={t("airport_transfer.premium_services.top_text")}
                title={t("airport_transfer.premium_services.title")}
                items={t.raw("airport_transfer.premium_services.items") as FeatureItem[]}
            />
            <DestinationsSection />
            <FeaturesGrid
                topText={t("airport_transfer.pre_booking.top_text")}
                title={t("airport_transfer.pre_booking.title")}
                description={t("airport_transfer.pre_booking.description")}
                items={t.raw("airport_transfer.pre_booking.items")}
            />
               <FleetSection />
            <WhyChooseSection
                sidebar={{
                    title: t("airport_transfer.why_choose.sidebar.title"),
                    subtitle: t("airport_transfer.why_choose.sidebar.subtitle"),
                    features: t.raw("airport_transfer.why_choose.sidebar.features") as string[],
                    buttonText: t("airport_transfer.why_choose.sidebar.button"),
                    buttonHref: "/",
                }}
                title={t("airport_transfer.why_choose.title")}
                description={t.rich("airport_transfer.why_choose.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("airport_transfer.why_choose.reasons") as string[]}
                highlight={{
                    title: t("airport_transfer.why_choose.highlight.title"),
                    description: t("airport_transfer.why_choose.highlight.description"),
                }}
            />
        </main>
    );
}
