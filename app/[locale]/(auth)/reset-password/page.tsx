import { getTranslations } from "next-intl/server";
import ResetPasswordForm from "./reset-password-form";
import { Suspense } from "react";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('auth.reset_password.title'),
        description: t('auth.reset_password.description'),
        keywords: t('auth.reset_password.keywords'),
    };
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-white" />}>
            <ResetPasswordForm />
        </Suspense>
    );
}
