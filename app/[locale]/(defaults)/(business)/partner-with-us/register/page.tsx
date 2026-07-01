import Banner from "@/components/features/banner/banner";
import { IMAGES } from "@/constants/image-constants";
import { getTranslations } from "next-intl/server";
import PartnerFormSection from "@/components/features/partner/partner-form-section";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('business.partner.title'),
        description: t('business.partner.description'),
        keywords: t('business.partner.keywords'),
    };
}

export default async function PartnerWithUsRegisterPage() {

    const t = await getTranslations('business');

    return (
        <main className="min-h-screen">
            <Banner
                image={IMAGES.CONTACT.BANNER}
                topText={t("partner_register.banner.top_text")}
                title={t("partner_register.banner.title")}
                description={t("partner_register.banner.description")}
            />
            <PartnerFormSection />
        </main>
    );
}

