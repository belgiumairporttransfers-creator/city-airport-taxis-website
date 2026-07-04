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

const PAGE_IMAGES = IMAGES.CITY_PAGES.GHENT;

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
        title: t("cities.ghent_city.title"),
        description: t("cities.ghent_city.description"),
        keywords: t("cities.ghent_city.keywords"),
    };
}

export default async function GhentCityPage() {
    const t = await getTranslations("cities");

    const icons = SERVICE_PAGE_ICONS.ghent_city;
    const premiumServices = withFeatureIcons(
        t.raw("ghent_city.premium_services.items") as TranslatableFeatureItem[],
        icons.premium_services,
        icons.premium_services_featured_index
    );
    const whyChoose = withFeatureIcons(
        t.raw("ghent_city.why_choose.items") as TranslatableFeatureItem[],
        icons.why_choose
    );

    return (
        <main className="min-h-screen">
            <Banner
                image={PAGE_IMAGES.BANNER}
                imageAlt={t("ghent_city.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("ghent_city.banner.top_text_primary")}</span>
                        {" · "}
                        {t("ghent_city.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("ghent_city.banner.title_line1")}</span>{" "}
                        {t("ghent_city.banner.title_accent")}
                    </>
                }
                description={t("ghent_city.banner.description")}
                centerContent
                stats={[
                    { end: 500, suffix: "+", label: t("ghent_city.stats.corporate_clients") },
                    { end: 15, suffix: "k+", label: t("ghent_city.stats.ghent_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("ghent_city.stats.on_time_rate") },
                    { static: "24/7", label: t("ghent_city.stats.support") },
                ]}
            />
            <FeaturesGrid
                variant="premium"
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                title={t("ghent_city.premium_services.title")}
                description={t("ghent_city.premium_services.description")}
                items={premiumServices}
            />
            <AirlineCrewStorySection
                className="pb-12 sm:pb-12 md:pb-16"
                image={PAGE_IMAGES.CITYSCAPE}
                imageAlt={t("ghent_city.story.image_alt")}
                imageBadge={{
                    value: t("ghent_city.story.badge.value"),
                    label: t("ghent_city.story.badge.label"),
                }}
                title={
                    <>
                        <span className="text-secondary">{t("ghent_city.story.title_line1")}</span>{" "}
                        {t("ghent_city.story.title_accent")}
                    </>
                }
                paragraphs={t.raw("ghent_city.story.paragraphs") as string[]}
                accountTitle={t("ghent_city.story.account.title")}
                accountDescription={t("ghent_city.story.account.description")}
                accountPoints={t.raw("ghent_city.story.account.points") as string[]}
            />
            <FeaturesGrid
                className="pb-12 md:pb-16"
                title={t("ghent_city.why_choose.title")}
                description={t("ghent_city.why_choose.description")}
                items={whyChoose}
            />
            <DestinationsSection />
            <FleetSection />
            <FaqSection itemsNamespace="cities" itemsKey="ghent_city.faqs" />
            <WhyChooseSection
                sidebar={{
                    badge: t("ghent_city.why_choose_section.sidebar.badge"),
                    title: t("ghent_city.why_choose_section.sidebar.title"),
                    subtitle: t("ghent_city.why_choose_section.sidebar.subtitle"),
                    features: t.raw("ghent_city.why_choose_section.sidebar.features") as string[],
                    buttonText: t("ghent_city.why_choose_section.sidebar.button"),
                    buttonHref: "/",
                }}
                title={t("ghent_city.why_choose_section.title")}
                description={t.rich("ghent_city.why_choose_section.description", {
                    highlight: (chunks) => (
                        <span className="font-semibold text-secondary">{chunks}</span>
                    ),
                })}
                reasons={t.raw("ghent_city.why_choose_section.reasons") as string[]}
                highlight={{
                    title: t("ghent_city.why_choose_section.highlight.title"),
                    description: t("ghent_city.why_choose_section.highlight.description"),
                    listTitle: t("ghent_city.why_choose_section.highlight.list_title"),
                    listItems: t.raw("ghent_city.why_choose_section.highlight.list_items") as string[],
                    ctaText: t("ghent_city.why_choose_section.highlight.ctaText"),
                    ctaHref: t("ghent_city.why_choose_section.highlight.ctaHref"),
                }}
            />
            <BookingCTASection
                title={t("ghent_city.booking_cta.title")}
                description={t("ghent_city.booking_cta.description")}
                bookOnlineText={t("ghent_city.booking_cta.book_online")}
                callSupportText={t("ghent_city.booking_cta.call_support")}
            />
        </main>
    );
}
