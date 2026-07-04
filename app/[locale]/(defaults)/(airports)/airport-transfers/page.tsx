import FleetSection from "@/components/features/home/fleet-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import BookingBenefitsSection from "@/components/features/shared/booking-benefits-section";
import BookingCTASection from "@/components/features/shared/booking-cta-section";
import WhyChooseSafetySection, {
    type SafetyFeatureItem,
} from "@/components/features/shared/why-choose-safety-section";
import FaqSection from "@/components/shared/faqs/faq-section";
import { SERVICE_PAGE_ICONS, type IconName } from "@/constants/icon-constants";
import { getTranslations } from "next-intl/server";

const PAGE_IMAGES = IMAGES.AIRPORT_PAGES.AIRPORT_TRANSFERS;

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
        title: t("airport_transfers.hub.title"),
        description: t("airport_transfers.hub.description"),
        keywords: t("airport_transfers.hub.keywords"),
    };
}

export default async function AirportTransfersPage() {
    const t = await getTranslations("airports");

    const icons = SERVICE_PAGE_ICONS.airport_transfers;
    const airportHubs = withFeatureIcons(
        t.raw("airport_transfers.airport_hubs.items") as TranslatableFeatureItem[],
        icons.airport_hubs,
        icons.airport_hubs_featured_index
    );
    const whyChoose = withFeatureIcons(
        t.raw("airport_transfers.why_choose.items") as TranslatableFeatureItem[],
        icons.why_choose
    );
    const areasServed = withFeatureIcons(
        t.raw("airport_transfers.areas_served.items") as TranslatableFeatureItem[],
        icons.areas_served
    );

    return (
        <main className="min-h-screen">
            <Banner
                image={PAGE_IMAGES.BANNER}
                imageAlt={t("airport_transfers.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">
                            {t("airport_transfers.banner.top_text_primary")}
                        </span>
                        {" · "}
                        {t("airport_transfers.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">
                            {t("airport_transfers.banner.title_line1")}
                        </span>{" "}
                        {t("airport_transfers.banner.title_accent")}
                    </>
                }
                description={t("airport_transfers.banner.description")}
                centerContent
                stats={[
                    { end: 3, suffix: "+", label: t("airport_transfers.stats.airports_covered") },
                    { end: 15, suffix: "k+", label: t("airport_transfers.stats.annual_transfers") },
                    { end: 99.9, suffix: "%", decimals: 1, label: t("airport_transfers.stats.on_time_rate") },
                    { static: "24/7", label: t("airport_transfers.stats.support") },
                ]}
            />
            <FeaturesGrid
                variant="premium"
                className="pt-42 pb-12 sm:pt-42 md:pt-52 md:pb-16"
                title={t("airport_transfers.airport_hubs.title")}
                description={t("airport_transfers.airport_hubs.description")}
                items={airportHubs}
            />
            <BookingBenefitsSection
                image={PAGE_IMAGES.JOURNEY}
                imageAlt={t("airport_transfers.journey.image_alt")}
                title={t("airport_transfers.journey.title")}
                description={t("airport_transfers.journey.description")}
                idealFor={{
                    title: t("airport_transfers.journey.ideal_for.title"),
                    items: t.raw("airport_transfers.journey.ideal_for.items") as string[],
                }}
                highlights={t.raw("airport_transfers.journey.highlights") as string[]}
            />
            <FeaturesGrid
                className="pb-12 md:pb-16"
                title={t("airport_transfers.why_choose.title")}
                description={t("airport_transfers.why_choose.description")}
                items={whyChoose}
            />
            <FeaturesGrid
                variant="premium"
                topText={t("airport_transfers.areas_served.top_text")}
                title={t("airport_transfers.areas_served.title")}
                description={t("airport_transfers.areas_served.description")}
                items={areasServed}
            />
            <FleetSection />
            <FaqSection itemsNamespace="airports" itemsKey="airport_transfers.faqs" />
            <WhyChooseSafetySection
                whyChoose={{
                    title: t("airport_transfers.why_choose_safety.why_choose.title"),
                    subtitle: t("airport_transfers.why_choose_safety.why_choose.subtitle"),
                    features: t.raw(
                        "airport_transfers.why_choose_safety.why_choose.features",
                    ) as string[],
                }}
                safety={{
                    title: t("airport_transfers.why_choose_safety.safety.title"),
                    subtitle: t("airport_transfers.why_choose_safety.safety.subtitle"),
                    features: t.raw(
                        "airport_transfers.why_choose_safety.safety.features",
                    ) as SafetyFeatureItem[],
                }}
            />
            <BookingCTASection
                title={t("airport_transfers.booking_cta.title")}
                description={t("airport_transfers.booking_cta.description")}
                bookOnlineText={t("airport_transfers.booking_cta.book_online")}
                callSupportText={t("airport_transfers.booking_cta.call_support")}
            />
        </main>
    );
}
