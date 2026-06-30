"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { Input } from "@/components/features/form/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Logo } from "@/layout/header/logo";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import { useAuthResetPassword } from "@/hooks/queries/use-auth";

interface ResetPasswordFormValues {
    password: string;
    confirmPassword: string;
}

const ResetPasswordForm = () => {
    const t = useTranslations("auth");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const scopeParam = searchParams.get("scope");
    const scope = scopeParam === "admin" || scopeParam === "user" ? scopeParam : "user";
    const { mutate: resetPassword, isPending: isLoading } = useAuthResetPassword();
    const methods = useForm<ResetPasswordFormValues>({
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        if (!token) {
            toast.error(t("reset_password.errors.token_missing"));
            return;
        }
        if (data.password !== data.confirmPassword) {
            toast.error(t("reset_password.errors.passwords_dont_match"));
            return;
        }
        resetPassword({ token, password: data.password, scope });
    };

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side: Form Container */}
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-md">
                    {/* Logo Section */}
                    <div className="mb-12 flex justify-start">
                        <Logo variant="dark" />
                    </div>

                    {/* Header Section */}
                    <div className="mb-10 text-start">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            {t("reset_password.title")}
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            {t("reset_password.subtitle")}
                        </p>
                    </div>

                    {/* Form Section */}
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <Input
                                    name="password"
                                    type="password"
                                    label={t("reset_password.password_label")}
                                    placeholder="••••••••"
                                    required
                                    icon={<Lock size={20} className="text-gray-400" />}
                                    className="w-full text-left"
                                />

                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    label={t("reset_password.confirm_password_label")}
                                    placeholder="••••••••"
                                    required
                                    icon={<Lock size={20} className="text-gray-400" />}
                                    className="w-full text-left"
                                />
                            </div>

                            <Button
                                type="submit"
                                loading={isLoading}
                                className="w-full py-7 text-lg font-bold transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                            >
                                {t("reset_password.reset_button")}
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </form>
                    </FormProvider>

                    {/* Support Link */}
                    <div className="mt-12 flex justify-center text-sm text-gray-500">
                        <Link href="/contact-us" className="hover:text-gray-700 transition-colors">
                            {t("reset_password.support_text")}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side: Visual Section */}
            <div className="hidden lg:relative lg:flex lg:w-1/2 bg-gray-900 overflow-hidden">
                <Image
                    src="/assets/images/auth/reset-password-bg.png"
                    alt="Airport Transfer Journey"
                    fill
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                    priority
                />

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="relative flex h-full w-full flex-col justify-end p-16 text-white">
                    <div className="max-w-xl">
                        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                            <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <blockquote className="space-y-6">
                            <p className="text-3xl font-light italic leading-relaxed text-gray-100">
                                &ldquo;{t("reset_password.quote")}&rdquo;
                            </p>
                            <footer className="mt-4">
                                <div className="text-xl font-bold">{t("reset_password.quote_footer")}</div>
                                <div className="text-lg text-gray-400">{t("reset_password.quote_subfooter")}</div>
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
