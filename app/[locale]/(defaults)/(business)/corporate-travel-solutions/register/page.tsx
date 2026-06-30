import React from "react";
import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import CorporateInfoCards from "@/components/features/business/corporate-info-cards";
import CorporateFormSection from "@/components/features/business/corporate-form-section";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('business.corporate_register.title'),
        description: t('business.corporate_register.description'),
        keywords: t('business.corporate_register.keywords'),
    };
}

export default async function CorporateTravelSolutionsPage() {
    
    const t = await getTranslations('business');

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CORPORATE_BANNER}
                topText={t("corporate.banner.top_text")}
                title={t("corporate.register.title")}
                description={t("corporate.register.description")}
            />
            <CorporateInfoCards />
            <CorporateFormSection />
        </main>
    );
}
