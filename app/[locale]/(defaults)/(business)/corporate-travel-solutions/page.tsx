import React from "react";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import FeaturesStats from "@/components/features/about/features-stats";
import StorySection from "@/components/features/about/story-section";
import { Clock, CircleDollarSign, MapPin, Code, Car, CreditCard, CheckCircle2 } from "lucide-react";
import ProcessSection from "@/components/features/home/process-section";
import ParallaxCardsSection from "@/components/features/shared/parallax-cards-section";
import Testimonials from "@/components/features/home/testimonial-section";
import FleetSection from "@/components/features/home/fleet-section";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('business.corporate.title'),
        description: t('business.corporate.description'),
        keywords: t('business.corporate.keywords'),
    };
}

export default async function CorporateTravelSolutionsPage() {
    
    const t = await getTranslations('business');

    const statsIconNames = ["sparkles", "clock", "armchair", "shieldCheck"];
    const translatedStats = (t.raw("corporate.stats") as any[]).map((stat, index) => ({
        ...stat,
        icon: statsIconNames[index]
    }));

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CORPORATE_BANNER}
                topText={t("corporate.banner.top_text")}
                title={t("corporate.banner.title")}
                description={t("corporate.banner.description")}
                button={{
                    text: t("corporate.banner.button"),
                    href: "/corporate-travel-solutions/register",
                }}
            />
            <FeaturesStats items={translatedStats} />
            <StorySection
                image={IMAGES.ABOUT_US.STORY_IMAGE}
                topText={t("corporate.story.top_text")}
                title={t("corporate.story.title")}
                description={t("corporate.story.description")}
                badgeText={t("corporate.story.badge")}
                imageSide="right"
                features={[
                    {
                        title: t("corporate.story.features.ride_mgmt.title"),
                        description: t("corporate.story.features.ride_mgmt.description"),
                        icon: <Clock className="w-4 h-4" />,
                    },
                    {
                        title: t("corporate.story.features.expense_ctrl.title"),
                        description: t("corporate.story.features.expense_ctrl.description"),
                        icon: <CircleDollarSign className="w-4 h-4" />,
                    },
                    {
                        title: t("corporate.story.features.coverage.title"),
                        description: t("corporate.story.features.coverage.description"),
                        icon: <MapPin className="w-4 h-4" />,
                    },
                    {
                        title: t("corporate.story.features.api.title"),
                        description: t("corporate.story.features.api.description"),
                        icon: <Code className="w-4 h-4" />,
                    }
                ]}
            />

            <ProcessSection
                topText={t("corporate.process.top_text")}
                title={t("corporate.process.title")}
                description={t("corporate.process.description")}
                buttonText={t("corporate.process.button")}
                buttonLink="/"
                steps={[
                    {
                        id: t("corporate.process.steps.0.id"),
                        title: t("corporate.process.steps.0.title"),
                        description: t("corporate.process.steps.0.description"),
                        icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-secondary" strokeWidth={1.5} />,
                    },
                    {
                        id: t("corporate.process.steps.1.id"),
                        title: t("corporate.process.steps.1.title"),
                        description: t("corporate.process.steps.1.description"),
                        icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-secondary" strokeWidth={1.5} />,
                    },
                    {
                        id: t("corporate.process.steps.2.id"),
                        title: t("corporate.process.steps.2.title"),
                        description: t("corporate.process.steps.2.description"),
                        icon: <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-secondary" strokeWidth={1.5} />,
                    }
                ]}
            />
            <FleetSection />
            <ParallaxCardsSection
                image={IMAGES.CORPORATE_BANNER}
                topText={t("corporate.parallax.top_text")}
                title={t("corporate.parallax.title")}
                description={t("corporate.parallax.description")}
                cards={[
                    {
                        title: t("corporate.parallax.cards.0.title"),
                        description: t("corporate.parallax.cards.0.description"),
                        icon: <CheckCircle2 className="w-5 h-5" />
                    },
                    {
                        title: t("corporate.parallax.cards.1.title"),
                        description: t("corporate.parallax.cards.1.description"),
                        icon: <CheckCircle2 className="w-5 h-5" />
                    },
                    {
                        title: t("corporate.parallax.cards.2.title"),
                        description: t("corporate.parallax.cards.2.description"),
                        icon: <CheckCircle2 className="w-5 h-5" />
                    }
                ]}
            />
            <Testimonials />
        </main>
    );
}
