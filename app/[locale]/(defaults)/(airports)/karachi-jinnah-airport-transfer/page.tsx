import FleetSection from "@/components/features/home/fleet-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import BookingStepsSection, {
    type BookingStepItem,
} from "@/components/features/shared/booking-steps-section";
import AirportCoverageSection from "@/components/features/shared/airport-coverage-section";
import WhyChooseSafetySection, {
    type SafetyFeatureItem,
} from "@/components/features/shared/why-choose-safety-section";
import BookingBenefitsSection from "@/components/features/shared/booking-benefits-section";
import BookingCTASection from "@/components/features/shared/booking-cta-section";
import FaqSection from "@/components/shared/faqs/faq-section";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("meta");

    return {
        title: t("airport_transfers.karachi_jinnah.title"),
        description: t("airport_transfers.karachi_jinnah.description"),
        keywords: t("airport_transfers.karachi_jinnah.keywords"),
    };
}

export default async function KarachiJinnahAirportTransfersPage() {
    const t = await getTranslations("airports");

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.KARACHI_AIRPORT_BANNER}
                imageAlt={t("karachi_jinnah.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">
                            {t("karachi_jinnah.banner.top_text_primary")}
                        </span>
                        {" · "}
                        {t("karachi_jinnah.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">
                            {t("karachi_jinnah.banner.title_line1")}
                        </span>{" "}
                        {t("karachi_jinnah.banner.title_accent")}
                    </>
                }
                description={t("karachi_jinnah.banner.description")}
                button={{ text: t("karachi_jinnah.banner.book_ride"), href: "/" }}
                secondaryButton={{
                    text: t("karachi_jinnah.banner.view_fleets"),
                    href: "/fleets",
                }}
            />
            <FeaturesGrid
                variant="premium"
                className="pt-20 pb-12 md:pb-16"
                title={t("karachi_jinnah.transfer_services.title")}
                description={t("karachi_jinnah.transfer_services.description")}
                items={t.raw("karachi_jinnah.transfer_services.items") as FeatureItem[]}
            />
            <FleetSection />
            <BookingStepsSection
                title={t("karachi_jinnah.booking_steps.title")}
                description={t("karachi_jinnah.booking_steps.description")}
                steps={t.raw("karachi_jinnah.booking_steps.steps") as BookingStepItem[]}
            />
            <AirportCoverageSection
                title={t("karachi_jinnah.coverage_areas.title")}
                description={t("karachi_jinnah.coverage_areas.description")}
                areas={t.raw("karachi_jinnah.coverage_areas.areas") as string[]}
                popularRoutes={{
                    title: t("karachi_jinnah.coverage_areas.popular_routes.title"),
                    routeLabel: t("karachi_jinnah.coverage_areas.popular_routes.route_label"),
                    destinations: t.raw(
                        "karachi_jinnah.coverage_areas.popular_routes.destinations",
                    ) as string[],
                }}
            />
            <FaqSection itemsNamespace="airports" itemsKey="karachi_jinnah.faqs" />
            <WhyChooseSafetySection
                whyChoose={{
                    title: t("karachi_jinnah.why_choose_safety.why_choose.title"),
                    subtitle: t("karachi_jinnah.why_choose_safety.why_choose.subtitle"),
                    features: t.raw(
                        "karachi_jinnah.why_choose_safety.why_choose.features",
                    ) as string[],
                }}
                safety={{
                    title: t("karachi_jinnah.why_choose_safety.safety.title"),
                    subtitle: t("karachi_jinnah.why_choose_safety.safety.subtitle"),
                    features: t.raw(
                        "karachi_jinnah.why_choose_safety.safety.features",
                    ) as SafetyFeatureItem[],
                }}
            />
            <BookingBenefitsSection
                image={IMAGES.SERVICES.AIRPORTS.KARACHI_JINNAH.STORY_IMAGE}
                imageAlt={t("karachi_jinnah.benefits.image_alt")}
                title={t("karachi_jinnah.benefits.title")}
                description={t("karachi_jinnah.benefits.description")}
                idealFor={{
                    title: t("karachi_jinnah.benefits.ideal_for.title"),
                    items: t.raw("karachi_jinnah.benefits.ideal_for.items") as string[],
                }}
                highlights={t.raw("karachi_jinnah.benefits.highlights") as string[]}
            />
            <BookingCTASection
                title={t("karachi_jinnah.booking_cta.title")}
                description={t("karachi_jinnah.booking_cta.description")}
                bookOnlineText={t("karachi_jinnah.booking_cta.book_online")}
                callSupportText={t("karachi_jinnah.booking_cta.call_support")}
            />
        </main>
    );
}
