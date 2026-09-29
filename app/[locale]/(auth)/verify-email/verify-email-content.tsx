"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import {
    CheckCircle2,
    AlertCircle,
    Loader2,
    Mail,
    ArrowRight,
    ArrowLeft,
    RotateCw,
} from "lucide-react";
import { Logo } from "@/layout/header/logo";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useAuthVerifyEmail, useAuthResendVerification } from "@/hooks/queries/use-auth";

export default function VerifyEmailContent() {
    const t = useTranslations("auth");
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const initialEmail = searchParams.get("email") || "";

    const [email, setEmail] = useState(initialEmail);
    const [cooldown, setCooldown] = useState(0);
    const [redirectCount, setRedirectCount] = useState<number | null>(null);

    const hasAttemptedRef = useRef(false);

    const {
        mutate: verifyEmailMutation,
        isPending: isVerifying,
        isSuccess,
        isError,
        error: verifyError,
    } = useAuthVerifyEmail();

    const {
        mutate: resendVerificationMutation,
        isPending: isResending,
        isSuccess: isResendSuccess,
    } = useAuthResendVerification();

    // Trigger verification if token is present
    useEffect(() => {
        if (token && !hasAttemptedRef.current) {
            hasAttemptedRef.current = true;
            verifyEmailMutation({
                token,
                email: initialEmail || undefined,
            });
        }
    }, [token, initialEmail, verifyEmailMutation]);

    // Resend cooldown timer
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => {
            setCooldown((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldown]);

    // Auto-redirect on successful verification
    useEffect(() => {
        if (isSuccess) {
            setRedirectCount(3);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (redirectCount === null) return;
        if (redirectCount <= 0) {
            router.push("/dashboard");
            return;
        }
        const timer = setTimeout(() => {
            setRedirectCount((prev) => (prev !== null ? prev - 1 : null));
        }, 1000);
        return () => clearTimeout(timer);
    }, [redirectCount, router]);

    const handleResend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || cooldown > 0 || isResending) return;
        resendVerificationMutation(
            { email: email.trim() },
            {
                onSuccess: () => {
                    setCooldown(60);
                },
            }
        );
    };

    const errorMessage =
        (verifyError as { message?: string })?.message ||
        t("verify_email.subtitle_failed");

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side: Form Container */}
            <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
                <div className="mx-auto w-full max-w-md">
                    {/* Logo Section */}
                    <div className="mb-10 flex justify-start">
                        <Logo />
                    </div>

                    {/* STATE 1: Verifying in progress */}
                    {token && isVerifying && (
                        <div className="text-left space-y-6 animate-in fade-in duration-300">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-8 ring-amber-50/50">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    {t("verify_email.title_verifying")}
                                </h1>
                                <p className="mt-3 text-base text-gray-600">
                                    {t("verify_email.subtitle_verifying")}
                                </p>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                <div className="h-full w-2/3 animate-pulse rounded-full bg-amber-500" />
                            </div>
                        </div>
                    )}

                    {/* STATE 2: Verification Successful */}
                    {token && isSuccess && (
                        <div className="text-left space-y-6 animate-in fade-in duration-300">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50 shadow-sm">
                                <CheckCircle2 className="h-9 w-9" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    {t("verify_email.title_success")}
                                </h1>
                                <p className="mt-3 text-base text-gray-600">
                                    {t("verify_email.subtitle_success")}
                                </p>
                            </div>

                            {redirectCount !== null && (
                                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm text-emerald-800">
                                    Redirecting to your dashboard in{" "}
                                    <span className="font-bold">{redirectCount}s</span>...
                                </div>
                            )}

                            <Button
                                onClick={() => router.push("/dashboard")}
                                className="w-full py-7 text-lg font-bold transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                            >
                                {t("verify_email.continue_to_dashboard")}
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </div>
                    )}

                    {/* STATE 3: Verification Failed / Expired */}
                    {token && isError && (
                        <div className="text-left space-y-6 animate-in fade-in duration-300">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-8 ring-rose-50/50 shadow-sm">
                                <AlertCircle className="h-9 w-9" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    {t("verify_email.title_failed")}
                                </h1>
                                <p className="mt-3 text-base text-gray-600">
                                    {errorMessage}
                                </p>
                            </div>

                            <form onSubmit={handleResend} className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50/50 p-5">
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="resend-email"
                                        className="text-xs font-semibold uppercase tracking-wider text-gray-600"
                                    >
                                        {t("forgot_password.email_label")}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            id="resend-email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={t("forgot_password.email_placeholder")}
                                            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={cooldown > 0 || isResending || !email.trim()}
                                    loading={isResending}
                                    variant="outline"
                                    className="w-full py-6 text-sm font-semibold border-gray-300 hover:bg-gray-100"
                                >
                                    <RotateCw className="mr-2 h-4 w-4" />
                                    {cooldown > 0
                                        ? t("verify_email.resend_in", { seconds: cooldown })
                                        : t("verify_email.resend_button")}
                                </Button>
                            </form>

                            <div className="flex items-center justify-between pt-2">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
                                >
                                    <ArrowLeft size={16} className="mr-1.5" />
                                    {t("verify_email.back_to_login")}
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {t("login.create_account")}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* STATE 4: Landing without token (e.g. right after registration) */}
                    {!token && (
                        <div className="text-left space-y-6 animate-in fade-in duration-300">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5 shadow-sm">
                                <Mail className="h-9 w-9" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    {t("verify_email.title_check_inbox")}
                                </h1>
                                <p className="mt-3 text-base text-gray-600">
                                    {t("verify_email.subtitle_check_inbox")}
                                </p>
                            </div>

                            {email && (
                                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-800">
                                        {t("verify_email.email_sent_to")}
                                    </p>
                                    <p className="mt-1 font-mono text-sm font-bold text-blue-950 break-all">
                                        {email}
                                    </p>
                                </div>
                            )}

                            <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 text-xs text-gray-600 space-y-1">
                                <p className="font-semibold text-gray-700">
                                    {t("verify_email.didnt_receive")}
                                </p>
                                <p>{t("verify_email.check_spam")}</p>
                            </div>

                            <form onSubmit={handleResend} className="space-y-4">
                                {!email && (
                                    <div className="space-y-1.5">
                                        <label
                                            htmlFor="check-email"
                                            className="text-xs font-semibold uppercase tracking-wider text-gray-600"
                                        >
                                            {t("forgot_password.email_label")}
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                id="check-email"
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t("forgot_password.email_placeholder")}
                                                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={cooldown > 0 || isResending || !email.trim()}
                                    loading={isResending}
                                    variant="outline"
                                    className="w-full py-6 text-sm font-semibold border-gray-300 hover:bg-gray-100"
                                >
                                    <RotateCw className="mr-2 h-4 w-4" />
                                    {cooldown > 0
                                        ? t("verify_email.resend_in", { seconds: cooldown })
                                        : t("verify_email.resend_button")}
                                </Button>
                            </form>

                            <div className="text-center pt-2">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-600 transition-colors"
                                >
                                    <ArrowLeft size={16} className="mr-1.5" />
                                    {t("verify_email.back_to_login")}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Visual Showcase */}
            <div className="hidden lg:relative lg:flex lg:w-1/2 bg-gray-900 overflow-hidden">
                <Image
                    src="/assets/images/auth/login-bg.png"
                    alt="City Airport Taxis"
                    fill
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[10s] hover:scale-105"
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/45 to-transparent" />

                <div className="relative flex h-full w-full flex-col justify-end p-16 text-white">
                    <div className="max-w-xl">
                        <div className="mb-6 flex space-x-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <svg key={i} className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        <blockquote className="space-y-4">
                            <p className="text-2xl font-light italic leading-relaxed text-gray-100">
                                &ldquo;{t("verify_email.quote")}&rdquo;
                            </p>
                            <footer className="pt-2">
                                <div className="text-sm font-semibold tracking-wide text-white uppercase">
                                    {t("verify_email.quote_footer")}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {t("verify_email.quote_subfooter")}
                                </div>
                            </footer>
                        </blockquote>
                    </div>
                </div>

                <div className="absolute top-12 right-12">
                    <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20">
                        <p className="text-xs font-semibold tracking-widest text-white uppercase">
                            {t("login.premium_label")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
