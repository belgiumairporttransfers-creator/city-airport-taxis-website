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
        title: t("airport_transfers.islamabad.title"),
        description: t("airport_transfers.islamabad.description"),
        keywords: t("airport_transfers.islamabad.keywords"),
    };
}

export default async function IslamabadAirportTransfersPage() {
    const t = await getTranslations("airports");

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.ISLAMABAD_AIRPORT_BANNER}
                imageAlt={t("islamabad.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">
                            {t("islamabad.banner.top_text_primary")}
                        </span>
                        {" · "}
                        {t("islamabad.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">
                            {t("islamabad.banner.title_line1")}
                        </span>{" "}
                        {t("islamabad.banner.title_accent")}
                    </>
                }
                description={t("islamabad.banner.description")}
                button={{ text: t("islamabad.banner.book_ride"), href: "/" }}
                secondaryButton={{
                    text: t("islamabad.banner.view_fleets"),
                    href: "/fleets",
                }}
            />
            <FeaturesGrid
                variant="premium"
                className="pt-20 pb-12 md:pb-16"
                title={t("islamabad.transfer_services.title")}
                description={t("islamabad.transfer_services.description")}
                items={t.raw("islamabad.transfer_services.items") as FeatureItem[]}
            />
            <FleetSection />
            <BookingStepsSection
                title={t("islamabad.booking_steps.title")}
                description={t("islamabad.booking_steps.description")}
                steps={t.raw("islamabad.booking_steps.steps") as BookingStepItem[]}
            />
            <AirportCoverageSection
                title={t("islamabad.coverage_areas.title")}
                description={t("islamabad.coverage_areas.description")}
                areas={t.raw("islamabad.coverage_areas.areas") as string[]}
                popularRoutes={{
                    title: t("islamabad.coverage_areas.popular_routes.title"),
                    routeLabel: t("islamabad.coverage_areas.popular_routes.route_label"),
                    destinations: t.raw(
                        "islamabad.coverage_areas.popular_routes.destinations",
                    ) as string[],
                }}
            />
            <FaqSection itemsNamespace="airports" itemsKey="islamabad.faqs" />
            <WhyChooseSafetySection
                whyChoose={{
                    title: t("islamabad.why_choose_safety.why_choose.title"),
                    subtitle: t("islamabad.why_choose_safety.why_choose.subtitle"),
                    features: t.raw(
                        "islamabad.why_choose_safety.why_choose.features",
                    ) as string[],
                }}
                safety={{
                    title: t("islamabad.why_choose_safety.safety.title"),
                    subtitle: t("islamabad.why_choose_safety.safety.subtitle"),
                    features: t.raw(
                        "islamabad.why_choose_safety.safety.features",
                    ) as SafetyFeatureItem[],
                }}
            />
            <BookingBenefitsSection
                image={IMAGES.SERVICES.AIRPORTS.ISLAMABAD.STORY_IMAGE}
                imageAlt={t("islamabad.benefits.image_alt")}
                title={t("islamabad.benefits.title")}
                description={t("islamabad.benefits.description")}
                idealFor={{
                    title: t("islamabad.benefits.ideal_for.title"),
                    items: t.raw("islamabad.benefits.ideal_for.items") as string[],
                }}
                highlights={t.raw("islamabad.benefits.highlights") as string[]}
            />
            <BookingCTASection
                title={t("islamabad.booking_cta.title")}
                description={t("islamabad.booking_cta.description")}
                bookOnlineText={t("islamabad.booking_cta.book_online")}
                callSupportText={t("islamabad.booking_cta.call_support")}
            />
        </main>
    );
}
