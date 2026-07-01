import React from "react";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import FleetStatsSection from "@/components/features/fleet/fleet-stats-section";
import FleetListSection from "@/components/features/fleet/fleet-list-section";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('fleets.title'),
        description: t('fleets.description'),
        keywords: t('fleets.keywords'),
    };
}

export default async function FleetsPage() {
    
    const t = await getTranslations('fleets');

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CONTACT.BANNER}
                topText={t("banner.top_text")}
                title={t.rich("banner.title", {
                    br: () => <br />
                })}
                description={t("banner.description")}
            />
            <FleetStatsSection />
            <FleetListSection />
        </main>
    );
}
