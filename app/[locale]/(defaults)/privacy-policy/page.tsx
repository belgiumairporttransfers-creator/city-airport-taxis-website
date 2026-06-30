import React from "react";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/constants/app-default";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import { ShieldCheck, Lock, Eye, Mail, ArrowRight, UserCheck } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('legal.privacy.title'),
        description: t('legal.privacy.description'),
        keywords: t('legal.privacy.keywords'),
    };
}

export default async function PrivacyPolicyPage() {
    
    const t = await getTranslations('legal');

    const policySections = t.raw("privacy.content.sections") as any[];

    return (
        <main className="min-h-screen bg-white">
            <Banner
                image={IMAGES.CONTACT_BANNER}
                topText={t("privacy.banner.top_text")}
                title={t("privacy.banner.title")}
                description={t("privacy.banner.description")}
            />

            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Left Sidebar */}
                        <div className="lg:col-span-4 space-y-10">
                            <div className="sticky top-32 space-y-10">
                                <div className="p-8 bg-primary rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-secondary/20">
                                            <ShieldCheck className="w-6 h-6 text-primary" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-3 block">{t("privacy.sidebar.protocol")}</span>
                                        <h3 className="text-2xl font-bold mb-4">{t("privacy.sidebar.overview")}</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-8 opacity-80">
                                            {t("privacy.sidebar.desc")}
                                        </p>
                                        <div className="pt-6 border-t border-white/10 flex items-center justify-between group cursor-pointer">
                                            <span className="text-xs font-bold">{t("privacy.sidebar.contact_dpo")}</span>
                                            <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 border border-gray-100 rounded-[2rem] bg-gray-50/50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <UserCheck className="w-5 h-5 text-secondary" />
                                        <span className="font-bold text-primary">{t("privacy.sidebar.agreement")}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed italic">
                                        {t("privacy.sidebar.agreement")}
                                    </p>
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">{t("privacy.sidebar.updated")}</span>
                                        <span className="text-sm font-bold text-primary">April 25, 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-8">
                            <div className="max-w-3xl space-y-20">
                                {/* Introduction Section */}
                                <div className="space-y-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/5 rounded-full border border-secondary/10">
                                        <Lock className="w-4 h-4 text-secondary" />
                                        <span className="text-xs font-bold text-secondary uppercase tracking-widest">{t("privacy.content.overview")}</span>
                                    </div>
                                    <h2 className="text-4xl font-black text-primary tracking-tight leading-[1.1]">
                                        {t("privacy.content.intro_title")}
                                    </h2>
                                    <p className="text-xl text-gray-500 leading-relaxed">
                                        <strong className="text-primary font-extrabold">{COMPANY_NAME}</strong> {t("privacy.content.intro_desc")}
                                    </p>
                                    <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-secondary">
                                        <p className="text-sm text-gray-600 font-medium">
                                            {t("privacy.content.applies")}
                                        </p>
                                    </div>
                                </div>

                                {/* Privacy Grid - Policy Sections */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {policySections.map((section, index) => (
                                        <div key={index} className="group p-8 rounded-3xl border border-gray-100 hover:border-secondary/20 hover:bg-secondary/[0.02] transition-all duration-500">
                                            <span className="text-4xl font-black text-gray-100 group-hover:text-secondary/10 transition-colors block mb-4 tracking-tighter">
                                                {section.title}
                                            </span>
                                            <h4 className="text-lg font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                                                {section.label}
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {section.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Info Utilization Section */}
                                <div className="bg-primary p-12 rounded-[3rem] text-white relative overflow-hidden shadow-xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <Eye className="w-8 h-8 text-secondary" />
                                            <h3 className="text-2xl font-bold">{t("privacy.content.utilization_title")}</h3>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed">
                                            {t("privacy.content.utilization_desc")}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                                            <div className="space-y-2">
                                                <h5 className="font-bold text-secondary text-sm uppercase tracking-widest">{t("privacy.content.security_title")}</h5>
                                                <p className="text-xs text-gray-400 leading-relaxed">
                                                    {t("privacy.content.security_desc")}
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <h5 className="font-bold text-secondary text-sm uppercase tracking-widest">Third Party</h5>
                                                <p className="text-xs text-gray-400 leading-relaxed">
                                                    {t("privacy.content.third_party")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Compliance Note */}
                                <div className="pt-12 border-t border-gray-100 text-sm text-gray-400 italic">
                                    {t("common.incorrect_info")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="bg-gray-50 py-20 border-y border-gray-100">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h4 className="text-3xl font-black text-primary">{t("common.questions_policy")}</h4>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href={`mailto:${COMPANY_EMAIL}`}
                            className="h-16 px-10 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-primary/20"
                        >
                            <Mail className="w-5 h-5" />
                            {t("common.email_support")}
                        </a>
                        <Link
                            href="/contact-us"
                            className="text-secondary font-black uppercase tracking-[0.2em] hover:translate-x-3 transition-all flex items-center gap-2"
                        >
                            {t("common.contact_page")} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
