import { getTranslations } from "next-intl/server";
import ForgotPasswordForm from "./forgot-password-form";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('auth.forgot_password.title'),
        description: t('auth.forgot_password.description'),
        keywords: t('auth.forgot_password.keywords'),
    };
}

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}
