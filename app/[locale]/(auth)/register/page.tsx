import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import RegisterForm from "./register-form";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('auth.register.title'),
        description: t('auth.register.description'),
        keywords: t('auth.register.keywords'),
    };
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-white" />}>
            <RegisterForm />
        </Suspense>
    );
}
