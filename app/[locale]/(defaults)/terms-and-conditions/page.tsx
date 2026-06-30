import React from "react";
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, COMPANY_REGISTRATION, COMPANY_NTN } from "@/constants/app-default";
import { formatPrice } from "@/lib/utils";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import { Scale, FileText, Clock, AlertCircle, Mail, MapPin, Globe, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('legal.terms.title'),
        description: t('legal.terms.description'),
        keywords: t('legal.terms.keywords'),
    };
}

export default async function TermsAndConditionsPage() {
    const t = await getTranslations('legal');
    const cancellationTypes = t.raw("terms.content.cancellation_types") as any[];

    return (
        <main className="min-h-screen bg-white">
            <Banner
                image={IMAGES.CONTACT_BANNER}
                topText={t("terms.banner.top_text")}
                title={t("terms.banner.title")}
                description={t("terms.banner.description")}
            />

            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Left Column: Entity Information */}
                        <div className="lg:col-span-4 space-y-10">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-8 bg-gray-900 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-secondary/20 transition-all" />
                                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-secondary" />
                                        {t("terms.sidebar.identity")}
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t("terms.sidebar.trading_name")}</span>
                                            <span className="font-bold text-secondary text-lg">{COMPANY_NAME}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t("terms.sidebar.url")}</span>
                                            <span className="text-sm font-medium">www.airporttransfer.pk</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t("terms.sidebar.email")}</span>
                                            <span className="text-sm font-medium">{COMPANY_EMAIL}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t("terms.sidebar.kvk")}</span>
                                                <span className="text-sm font-bold text-secondary">{COMPANY_REGISTRATION}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t("terms.sidebar.vat")}</span>
                                                <span className="text-sm font-bold text-secondary">{COMPANY_NTN}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 border border-gray-100 rounded-[2rem] bg-gray-50 flex flex-col gap-6">
                                    <div className="flex items-center gap-3">
                                        <Scale className="w-6 h-6 text-secondary" />
                                        <h4 className="font-bold text-primary">{t("terms.sidebar.knv_title")}</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed italic">
                                        {t("terms.sidebar.knv_desc")}
                                    </p>
                                    <div className="flex flex-col gap-3 mt-2">
                                        <a href="#" className="text-xs font-bold text-secondary hover:underline flex items-center gap-2">
                                            {t("terms.sidebar.knv_link_transfers")} <ArrowRight className="w-3 h-3" />
                                        </a>
                                        <a href="#" className="text-xs font-bold text-secondary hover:underline flex items-center gap-2">
                                            {t("terms.sidebar.knv_link_coach")} <ArrowRight className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Detailed Terms */}
                        <div className="lg:col-span-8">
                            <div className="max-w-3xl space-y-20">

                                {/* Introduction */}
                                <div className="space-y-8">
                                    <div className="w-16 h-1 bg-secondary rounded-full" />
                                    <h2 className="text-4xl font-black text-primary tracking-tight">{t("terms.content.intro_title")}</h2>
                                    <p className="text-lg text-gray-500 leading-relaxed italic">
                                        {t("terms.content.intro_desc")}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                        <div className="p-6 bg-gray-50 rounded-2xl border-l-2 border-gray-200">
                                            <h5 className="font-bold text-primary mb-2">{t("terms.content.entrepreneur_title")}</h5>
                                            <p className="text-sm text-gray-500 leading-relaxed">{t("terms.content.entrepreneur_desc")}</p>
                                        </div>
                                        <div className="p-6 bg-gray-50 rounded-2xl border-l-2 border-gray-200">
                                            <h5 className="font-bold text-primary mb-2">{t("terms.content.passenger_title")}</h5>
                                            <p className="text-sm text-gray-500 leading-relaxed">{t("terms.content.passenger_desc")}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                                        <Globe className="w-6 h-6 text-secondary" />
                                        {t("terms.content.availability_title")}
                                    </h3>
                                    <p className="text-base text-gray-600 leading-relaxed">
                                        {t("terms.content.availability_desc")}
                                    </p>
                                </div>

                                {/* Cancellation Grid */}
                                <div className="space-y-10">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl font-bold text-primary">{t("terms.content.cancellation_title")}</h3>
                                        <p className="text-sm text-gray-400 font-medium">{t("terms.content.fee_note_title")}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {cancellationTypes.map((type, idx) => (
                                            <div key={idx} className="p-8 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 group">
                                                <div className="flex justify-between items-start mb-6">
                                                    <h4 className="font-bold text-primary text-lg">{type.title}</h4>
                                                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase rounded-full tracking-widest">{type.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 leading-relaxed">{type.details}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 flex gap-4 items-start">
                                        <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-1" />
                                        <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
                                            {t("terms.content.fee_note_desc")}
                                        </p>
                                    </div>
                                </div>

                                {/* Waiting Time Table */}
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold text-primary flex items-center gap-3">
                                        <Clock className="w-6 h-6 text-secondary" />
                                        {t("terms.content.waiting_title")}
                                    </h3>
                                    <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th className="px-6 py-4 font-bold text-sm uppercase tracking-widest">{t("terms.content.waiting_included")}</th>
                                                    <th className="px-6 py-4 font-bold text-sm uppercase tracking-widest text-center">{t("terms.content.minutes")}</th>
                                                    <th className="px-6 py-4 font-bold text-sm uppercase tracking-widest text-right">Note</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 bg-white">
                                                <tr className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-primary">{t("terms.content.airport_pickups")}</td>
                                                    <td className="px-6 py-4 text-sm text-center font-bold text-secondary">60</td>
                                                    <td className="px-6 py-4 text-xs text-gray-400 text-right">{t("terms.content.after_landing")}</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-primary">{t("terms.content.train_stations")}</td>
                                                    <td className="px-6 py-4 text-sm text-center font-bold text-secondary">30</td>
                                                    <td className="px-6 py-4 text-xs text-gray-400 text-right">{t("terms.content.after_arrival")}</td>
                                                </tr>
                                                <tr className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-bold text-primary">Home/Office/Hotel</td>
                                                    <td className="px-6 py-4 text-sm text-center font-bold text-secondary">15</td>
                                                    <td className="px-6 py-4 text-xs text-gray-400 text-right">After pickup time</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-8 bg-gray-50 rounded-3xl space-y-6">
                                        <h4 className="font-bold text-primary uppercase tracking-widest text-xs border-b border-gray-200 pb-4">{t("terms.content.additional_costs")}</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-gray-400 font-bold">SEDAN</span>
                                                <p className="font-black text-primary">{formatPrice(45)} / {t("terms.content.per_hour")}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-gray-400 font-bold">BUSINESS</span>
                                                <p className="font-black text-primary">{formatPrice(65)} / {t("terms.content.per_hour")}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-gray-400 font-bold">VAN</span>
                                                <p className="font-black text-primary">{formatPrice(75)} / {t("terms.content.per_hour")}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-gray-400 font-bold">LUXURY</span>
                                                <p className="font-black text-primary">{formatPrice(95)} / {t("terms.content.per_hour")}</p>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-gray-400 italic leading-relaxed pt-4 border-t border-gray-200">
                                            {t("terms.content.tracking_note")}
                                        </p>
                                    </div>
                                </div>

                                {/* Hourly Bookings */}
                                <div className="p-12 bg-primary rounded-[3rem] text-white relative overflow-hidden">
                                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mb-32 blur-3xl" />
                                    <div className="relative z-10 space-y-6">
                                        <h3 className="text-2xl font-bold">{t("terms.content.hourly_title")}</h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {t("terms.content.hourly_desc")}
                                        </p>
                                    </div>
                                </div>

                                {/* Liability */}
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-primary">{t("terms.content.liability_title")}</h3>
                                    <p className="text-base text-gray-500 leading-relaxed">
                                        {t("terms.content.liability_desc")}
                                    </p>
                                </div>

                                {/* Information Submission */}
                                <div className="space-y-6 pb-20">
                                    <h3 className="text-2xl font-bold text-primary">{t("terms.content.submission_title")}</h3>
                                    <p className="text-base text-gray-500 leading-relaxed">
                                        {t("terms.content.submission_desc")}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Final Contact CTA */}
            <section className="bg-gray-50 py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h4 className="text-3xl font-black text-primary tracking-tight">{t("common.questions_legal")}</h4>
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
