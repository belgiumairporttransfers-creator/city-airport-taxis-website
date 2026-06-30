"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { Input } from "@/components/features/form/Input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Mail, Lock, User, ArrowRight, ArrowLeft } from "lucide-react";
import { Logo } from "@/layout/header/logo";
import { useTranslations } from "next-intl";

import { useAuthSignup } from "@/hooks/queries/use-auth";

interface RegisterFormValues {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}

const RegisterForm = () => {
    const t = useTranslations("auth");
    const { mutate: signup, isPending: isLoading } = useAuthSignup();
    const methods = useForm<RegisterFormValues>({
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        signup(data);
    };

    return (
        <div className="flex min-h-screen w-full bg-white">
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-2xl">
                    <div className="mb-4 flex justify-start">
                        <Logo variant="dark" />
                    </div>
                    <div className="mb-10 text-left">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            {t("register.title")}
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            {t("register.subtitle")}
                        </p>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <Input
                                    name="fullName"
                                    type="text"
                                    label={t("register.fullname_label")}
                                    placeholder={t("register.fullname_placeholder")}
                                    required
                                    icon={<User size={20} className="text-gray-400" />}
                                    className="w-full text-left"
                                />

                                <Input
                                    name="email"
                                    type="email"
                                    label={t("register.email_label")}
                                    placeholder={t("register.email_placeholder")}
                                    required
                                    icon={<Mail size={20} className="text-gray-400" />}
                                    className="w-full text-left"
                                />

                                <Input
                                    name="phone"
                                    type="phone"
                                    label={t("register.phone_label")}
                                    required
                                    className="w-full text-left"
                                />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input
                                        name="password"
                                        type="password"
                                        label={t("register.password_label")}
                                        placeholder={t("login.password_placeholder")}
                                        required
                                        icon={<Lock size={20} className="text-gray-400" />}
                                        className="w-full text-left"
                                    />

                                    <Input
                                        name="confirmPassword"
                                        type="password"
                                        label={t("register.confirm_password_label")}
                                        placeholder={t("login.password_placeholder")}
                                        required
                                        icon={<Lock size={20} className="text-gray-400" />}
                                        className="w-full text-left"
                                    />
                                </div>
                            </div>

                            <Input
                                name="terms"
                                type="checkbox"
                                label={
                                    <span className="text-gray-600">
                                        {t("register.terms_agree")}{' '}
                                        <Link href="/terms-and-conditions" className="font-semibold text-primary hover:underline">
                                            {t("register.terms_link")}
                                        </Link>
                                        {' '}{t("register.and")}{' '}
                                        <Link href="/privacy-policy" className="font-semibold text-primary hover:underline">
                                            {t("register.privacy_link")}
                                        </Link>
                                    </span>
                                }
                                className="cursor-pointer"
                            />

                            <Button
                                type="submit"
                                loading={isLoading}
                                className="w-full py-7 text-lg font-bold transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                            >
                                {t("register.create_button")}
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </form>
                    </FormProvider>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            {t("register.already_have_account")}{' '}
                            <Link
                                href="/login"
                                className="font-bold text-primary hover:text-primary-600 transition-colors underline decoration-2 underline-offset-4"
                            >
                                {t("register.sign_in")}
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center font-bold text-primary hover:text-primary-600 transition-colors"
                        >
                            <ArrowLeft size={18} className="mr-2" />
                            {t("login.back_to_home")}
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:relative lg:flex lg:w-1/2 bg-gray-900 overflow-hidden">
                <Image
                    src="/assets/images/auth/register-bg.png"
                    alt="Welcome to City Airport Taxis"
                    fill
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[10s] hover:scale-110"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />

                <div className="relative flex h-full w-full flex-col justify-end p-16 text-white">
                    <div className="max-w-xl">
                        <div className="mb-8 flex space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <svg key={i} className="h-6 w-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        <blockquote className="space-y-6">
                            <p className="text-3xl font-light italic leading-relaxed text-gray-100">
                                &ldquo;{t("register.quote")}&rdquo;
                            </p>
                        </blockquote>
                    </div>
                </div>

                <div className="absolute top-12 right-12">
                    <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                        <p className="text-xs font-semibold tracking-widest text-white uppercase">
                            {t("register.premium_label")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
