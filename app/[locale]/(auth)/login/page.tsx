import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import LoginForm from "./login-form";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('auth.login.title'),
        description: t('auth.login.description'),
        keywords: t('auth.login.keywords'),
    };
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-white" />}>
            <LoginForm />
        </Suspense>
    );
}