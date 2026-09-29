import { getTranslations } from "next-intl/server";
import VerifyEmailContent from "./verify-email-content";
import { Suspense } from "react";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('auth.verify_email.title'),
        description: t('auth.verify_email.description'),
        keywords: t('auth.verify_email.keywords'),
    };
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-white flex items-center justify-center" />}>
            <VerifyEmailContent />
        </Suspense>
    );
}
