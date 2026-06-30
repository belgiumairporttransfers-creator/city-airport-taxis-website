import React from "react";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import AirlineCrewStorySection from "@/components/features/services/airline-crew-story-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import { getTranslations } from "next-intl/server";
import DestinationsSection from "@/components/features/home/destinations-section";
import WhyChooseSection from "@/components/features/about/why-choose-section";
import FleetSection from "@/components/features/home/fleet-section";

export async function generateMetadata() {
    const t = await getTranslations("meta");

    return {
        title: t("services.airline_crew.title"),
        description: t("services.airline_crew.description"),
        keywords: t("services.airline_crew.keywords"),
    };
}

export default async function AirlineCrewTransportationPage() {
    const t = await getTranslations("services");

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.AIRLINE_CREW_TRANSPORTATION_BANNER}
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
                button={{ text: t("airline_crew.banner.book_ride"), href: "/" }}
                secondaryButton={{ text: t("airline_crew.banner.view_fleets"), href: "/fleets" }}
                stats={[
                    { end: 500, suffix: "+", label: t("airline_crew.stats.corporate_partners") },
                    { end: 15, suffix: "k+", label: t("airline_crew.stats.vip_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("airline_crew.stats.on_time_rate") },
                    { static: "24/7", label: t("airline_crew.stats.concierge_support") },
                ]}
            />
            <AirlineCrewStorySection
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                image={IMAGES.SERVICES.AIRLINE_CREW_TRANSPORTATION.STORY_IMAGE}
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
                items={t.raw("airline_crew.premium_services.items") as FeatureItem[]}
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
                    badge: t("airline_crew.why_choose.sidebar.badge"),
                    title: t("airline_crew.why_choose.sidebar.title"),
                    subtitle: t("airline_crew.why_choose.sidebar.subtitle"),
                    features: t.raw("airline_crew.why_choose.sidebar.features") as string[],
                    buttonText: t("airline_crew.why_choose.sidebar.button"),
                    buttonHref: "/",
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
                }}
            />
        </main>
    );
}
