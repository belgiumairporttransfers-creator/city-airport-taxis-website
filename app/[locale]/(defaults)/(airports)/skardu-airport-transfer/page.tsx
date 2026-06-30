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
        title: t("airport_transfers.skardu.title"),
        description: t("airport_transfers.skardu.description"),
        keywords: t("airport_transfers.skardu.keywords"),
    };
}

export default async function SkarduAirportTransfersPage() {
    const t = await getTranslations("airports");

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.SKARDU_AIRPORT_BANNER}
                imageAlt={t("skardu.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">
                            {t("skardu.banner.top_text_primary")}
                        </span>
                        {" · "}
                        {t("skardu.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">
                            {t("skardu.banner.title_line1")}
                        </span>{" "}
                        {t("skardu.banner.title_accent")}
                    </>
                }
                description={t("skardu.banner.description")}
                button={{ text: t("skardu.banner.book_ride"), href: "/" }}
                secondaryButton={{
                    text: t("skardu.banner.view_fleets"),
                    href: "/fleets",
                }}
            />
            <FeaturesGrid
                variant="premium"
                className="pt-20 pb-12 md:pb-16"
                title={t("skardu.transfer_services.title")}
                description={t("skardu.transfer_services.description")}
                items={t.raw("skardu.transfer_services.items") as FeatureItem[]}
            />
            <FleetSection />
            <BookingStepsSection
                title={t("skardu.booking_steps.title")}
                description={t("skardu.booking_steps.description")}
                steps={t.raw("skardu.booking_steps.steps") as BookingStepItem[]}
            />
            <AirportCoverageSection
                title={t("skardu.coverage_areas.title")}
                description={t("skardu.coverage_areas.description")}
                areas={t.raw("skardu.coverage_areas.areas") as string[]}
                popularRoutes={{
                    title: t("skardu.coverage_areas.popular_routes.title"),
                    routeLabel: t("skardu.coverage_areas.popular_routes.route_label"),
                    destinations: t.raw(
                        "skardu.coverage_areas.popular_routes.destinations",
                    ) as string[],
                }}
            />
            <FaqSection itemsNamespace="airports" itemsKey="skardu.faqs" />
            <WhyChooseSafetySection
                whyChoose={{
                    title: t("skardu.why_choose_safety.why_choose.title"),
                    subtitle: t("skardu.why_choose_safety.why_choose.subtitle"),
                    features: t.raw(
                        "skardu.why_choose_safety.why_choose.features",
                    ) as string[],
                }}
                safety={{
                    title: t("skardu.why_choose_safety.safety.title"),
                    subtitle: t("skardu.why_choose_safety.safety.subtitle"),
                    features: t.raw(
                        "skardu.why_choose_safety.safety.features",
                    ) as SafetyFeatureItem[],
                }}
            />
            <BookingBenefitsSection
                image={IMAGES.SERVICES.AIRPORTS.SKARDU.STORY_IMAGE}
                imageAlt={t("skardu.benefits.image_alt")}
                title={t("skardu.benefits.title")}
                description={t("skardu.benefits.description")}
                idealFor={{
                    title: t("skardu.benefits.ideal_for.title"),
                    items: t.raw("skardu.benefits.ideal_for.items") as string[],
                }}
                highlights={t.raw("skardu.benefits.highlights") as string[]}
            />
            <BookingCTASection
                title={t("skardu.booking_cta.title")}
                description={t("skardu.booking_cta.description")}
                bookOnlineText={t("skardu.booking_cta.book_online")}
                callSupportText={t("skardu.booking_cta.call_support")}
            />
        </main>
    );
}
