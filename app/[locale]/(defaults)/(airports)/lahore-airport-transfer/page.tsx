import FleetSection from "@/components/features/home/fleet-section";
import FeaturesGrid, { type FeatureItem } from "@/components/features/about/features-grid";
import ServiceCTA from "@/components/features/cta/service-cta";
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
    const t = await getTranslations('meta');

    return {
        title: t('airport_transfers.lahore.title'),
        description: t('airport_transfers.lahore.description'),
        keywords: t('airport_transfers.lahore.keywords'),
    };
}

export default async function LahoreAirportTransfersPage() {

    const t = await getTranslations('airports');
    const tCommon = await getTranslations('common');

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.LAHORE_AIRPORT_BANNER}
                imageAlt={t("lahore.banner.image_alt")}
                topText={
                    <>
                        <span className="text-secondary">{t("lahore.banner.top_text_primary")}</span>
                        {" · "}
                        {t("lahore.banner.top_text_suffix")}
                    </>
                }
                title={
                    <>
                        <span className="text-secondary">{t("lahore.banner.title_line1")}</span>{" "}
                        {t("lahore.banner.title_accent")}
                    </>
                }
                description={t("lahore.banner.description")}
                button={{ text: t("lahore.banner.book_ride"), href: "/" }}
                secondaryButton={{ text: t("lahore.banner.view_fleets"), href: "/fleets" }}
            />
            <FeaturesGrid
                variant="premium"
                className="pt-20 pb-12 md:pb-16"
                title={t("lahore.transfer_services.title")}
                description={t("lahore.transfer_services.description")}
                items={t.raw("lahore.transfer_services.items") as FeatureItem[]}
            />
                 <FleetSection />
            <BookingStepsSection
                title={t("lahore.booking_steps.title")}
                description={t("lahore.booking_steps.description")}
                steps={t.raw("lahore.booking_steps.steps") as BookingStepItem[]}
            />
            <AirportCoverageSection
                title={t("lahore.coverage_areas.title")}
                description={t("lahore.coverage_areas.description")}
                areas={t.raw("lahore.coverage_areas.areas") as string[]}
                popularRoutes={{
                    title: t("lahore.coverage_areas.popular_routes.title"),
                    routeLabel: t("lahore.coverage_areas.popular_routes.route_label"),
                    destinations: t.raw(
                        "lahore.coverage_areas.popular_routes.destinations",
                    ) as string[],
                }}
            />
            <FaqSection itemsNamespace="airports" itemsKey="lahore.faqs" />
            <WhyChooseSafetySection
                whyChoose={{
                    title: t("lahore.why_choose_safety.why_choose.title"),
                    subtitle: t("lahore.why_choose_safety.why_choose.subtitle"),
                    features: t.raw(
                        "lahore.why_choose_safety.why_choose.features",
                    ) as string[],
                }}
                safety={{
                    title: t("lahore.why_choose_safety.safety.title"),
                    subtitle: t("lahore.why_choose_safety.safety.subtitle"),
                    features: t.raw(
                        "lahore.why_choose_safety.safety.features",
                    ) as SafetyFeatureItem[],
                }}
            />
            <BookingBenefitsSection
                image={IMAGES.SERVICES.AIRPORTS.LAHORE.STORY_IMAGE}
                imageAlt={t("lahore.benefits.image_alt")}
                title={t("lahore.benefits.title")}
                description={t("lahore.benefits.description")}
                idealFor={{
                    title: t("lahore.benefits.ideal_for.title"),
                    items: t.raw("lahore.benefits.ideal_for.items") as string[],
                }}
                highlights={t.raw("lahore.benefits.highlights") as string[]}
            />
            <BookingCTASection
                title={t("lahore.booking_cta.title")}
                description={t("lahore.booking_cta.description")}
                bookOnlineText={t("lahore.booking_cta.book_online")}
                callSupportText={t("lahore.booking_cta.call_support")}
            />
        </main>
    );
}
