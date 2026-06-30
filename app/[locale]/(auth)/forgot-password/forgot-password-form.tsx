"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { Input } from "@/components/features/form/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Logo } from "@/layout/header/logo";
import { useTranslations } from "next-intl";

import { useAuthForgotPassword } from "@/hooks/queries/use-auth";

interface ForgotPasswordFormValues {
    email: string;
}

const ForgotPasswordForm = () => {
    const t = useTranslations("auth");
    const { mutate: forgotPassword, isPending: isLoading } = useAuthForgotPassword();
    const methods = useForm<ForgotPasswordFormValues>({
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        forgotPassword({ ...data, scope: "user" });
    };

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side: Form Container */}
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-md">
                    {/* Logo Section */}
                    <div className="mb-6 flex justify-start">
                        <Logo variant="dark" />
                    </div>

                    {/* Header Section */}
                    <div className="mb-10 text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            {t("forgot_password.title")}
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            {t("forgot_password.subtitle")}
                        </p>
                    </div>

                    {/* Form Section */}
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <Input
                                name="email"
                                type="email"
                                label={t("forgot_password.email_label")}
                                placeholder={t("forgot_password.email_placeholder")}
                                required
                                icon={<Mail size={20} className="text-gray-400" />}
                                className="w-full text-left"
                            />

                            <Button
                                type="submit"
                                loading={isLoading}
                                className="w-full py-7 text-lg font-bold transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                            >
                                {t("forgot_password.reset_button")}
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </form>
                    </FormProvider>

                    {/* Back to Login */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center font-bold text-primary hover:text-primary-600 transition-colors"
                        >
                            <ArrowLeft size={18} className="mr-2" />
                            {t("forgot_password.back_to_login")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side: Visual Section */}
            <div className="hidden lg:relative lg:flex lg:w-1/2 bg-gray-900 overflow-hidden">
                <Image
                    src="/assets/images/auth/forgot-password-bg.png"
                    alt="Airport Transfer Security"
                    fill
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                    priority
                />

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative flex h-full w-full flex-col justify-end p-16 text-white">
                    <div className="max-w-xl">
                        <blockquote className="space-y-6">
                            <p className="text-3xl font-light italic leading-relaxed text-gray-100">
                                &ldquo;{t("forgot_password.quote")}&rdquo;
                            </p>
                            <footer className="mt-4">
                                <div className="text-xl font-bold">{t("forgot_password.quote_footer")}</div>
                                <div className="text-lg text-gray-400">{t("forgot_password.quote_subfooter")}</div>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
