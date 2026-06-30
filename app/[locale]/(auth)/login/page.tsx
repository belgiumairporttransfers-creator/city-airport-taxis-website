import { getTranslations } from "next-intl/server";
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
    return <LoginForm />;
}