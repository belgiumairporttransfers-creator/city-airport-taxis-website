import React from "react";
import { IMAGES } from "@/constants/image-constants";
import Banner from "@/components/features/banner/banner";
import { FAQAccordion } from "@/components/shared/faqs/faq-accordion";
import ServiceCTA from "@/components/features/cta/service-cta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('meta');

    return {
        title: t('help.title'),
        description: t('help.description'),
        keywords: t('help.keywords'),
    };
}

export default async function HelpDeskPage() {

    const t = await getTranslations('help');

    const faqSections = [
        {
            category: t("sections.general.category"),
            title: t("sections.general.title"),
            description: t("sections.general.description"),
            items: [
                {
                    id: "booking-advance",
                    question: t("faqs.booking_advance.question"),
                    answer: (
                        <div className="space-y-4">
                            <p>
                                {t.rich("faqs.booking_advance.answer", {
                                    strong_p: (chunks) => <strong className="text-primary font-bold">{chunks}</strong>,
                                    strong_s: (chunks) => <strong className="text-secondary font-bold">{chunks}</strong>,
                                })}
                            </p>
                        </div>
                    )
                },
                {
                    id: "airport-meeting",
                    question: t("faqs.airport_meeting.question"),
                    answer: (
                        <div className="space-y-6">
                            <p className="whitespace-pre-line text-gray-600">
                                {t("faqs.airport_meeting.answer")}
                            </p>
                            <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                                <img
                                    src="https://res.cloudinary.com/dbov9nme7/image/upload/v1778780272/ams-taxi/meeting-instructions/schiphol-meeting-point.png"
                                    alt="Jinnah Airport Meeting Point Map"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    )
                },
                {
                    id: "cancellation",
                    question: t("faqs.cancellation.question"),
                    answer: t("faqs.cancellation.answer")
                },
                {
                    id: "payment",
                    question: t("faqs.payment.question"),
                    answer: t("faqs.payment.answer")
                },
                {
                    id: "wait-time",
                    question: t("faqs.wait_time.question"),
                    answer: t("faqs.wait_time.answer")
                },
                {
                    id: "vip-pickup",
                    question: t("faqs.vip_pickup.question"),
                    answer: t("faqs.vip_pickup.answer")
                },
                {
                    id: "luggage",
                    question: t("faqs.luggage.question"),
                    answer: t("faqs.luggage.answer")
                },
                {
                    id: "local-taxis-connected",
                    question: t("faqs.local_taxis_connected.question"),
                    answer: t("faqs.local_taxis_connected.answer")
                },
                {
                    id: "responsible-all-taxis",
                    question: t("faqs.responsible_all_taxis.question"),
                    answer: t("faqs.responsible_all_taxis.answer")
                }
            ]
        },
        {
            category: t("sections.complications.category"),
            title: t("sections.complications.title"),
            description: t("sections.complications.description"),
            items: [
                {
                    id: "no-journey",
                    question: t("faqs.no_journey.question"),
                    answer: (
                        <p>
                            {t.rich("faqs.no_journey.answer", {
                                a: (chunks) => <a href="/contact-us" className="text-secondary hover:underline font-bold">{chunks}</a>
                            })}
                        </p>
                    )
                },
                {
                    id: "no-phone",
                    question: t("faqs.no_phone.question"),
                    answer: t("faqs.no_phone.answer")
                },
                {
                    id: "no-meeting-point",
                    question: t("faqs.no_meeting_point.question"),
                    answer: t("faqs.no_meeting_point.answer")
                }
            ]
        },
        {
            category: t("sections.management.category"),
            title: t("sections.management.title"),
            description: t("sections.management.description"),
            items: [
                {
                    id: "cancel-booking",
                    question: t("faqs.cancel_booking.question"),
                    answer: (
                        <p>
                            {t.rich("faqs.cancel_booking.answer", {
                                strong: (chunks) => <strong className="text-primary font-bold">{chunks}</strong>
                            })}
                        </p>
                    )
                },
                {
                    id: "change-booking",
                    question: t("faqs.change_booking.question"),
                    answer: t("faqs.change_booking.answer")
                },
                {
                    id: "view-booking",
                    question: t("faqs.view_booking.question"),
                    answer: t("faqs.view_booking.answer")
                }
            ]
        },
        {
            category: t("sections.travel.category"),
            title: t("sections.travel.title"),
            description: t("sections.travel.description"),
            items: [
                {
                    id: "flight-delayed",
                    question: t("faqs.flight_delayed.question"),
                    answer: t("faqs.flight_delayed.answer")
                },
                {
                    id: "left-item",
                    question: t("faqs.left_item.question"),
                    answer: t("faqs.left_item.answer")
                },
                {
                    id: "late-transfer",
                    question: t("faqs.late_transfer.question"),
                    answer: t("faqs.late_transfer.answer")
                }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Banner
                image={IMAGES.CONTACT.BANNER}
                topText={t("banner.top_text")}
                title={t("banner.title")}
                description={t("banner.description")}
            />

            <div className="bg-[#F9FAFB] space-y-px">
                {faqSections.map((section, index) => (
                    <section key={index} className="py-20 bg-white first:bg-[#F9FAFB]">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                                {/* Left Side: Sidebar Text */}
                                <div className="lg:col-span-5 flex flex-col items-start gap-6 lg:sticky lg:top-32 h-fit">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-secondary font-extrabold text-xs tracking-[0.2em] uppercase">
                                            {section.category}
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight tracking-tight">
                                            {section.title}
                                            <span className="text-secondary ml-1">.</span>
                                        </h2>
                                    </div>
                                    <p className="text-base text-gray-500 leading-relaxed max-w-md">
                                        {section.description}
                                    </p>

                                    <div className="w-12 h-1 bg-secondary/20 rounded-full mt-2" />
                                </div>

                                {/* Right Side: Accordion */}
                                <div className="lg:col-span-7">
                                    <FAQAccordion items={section.items} className="md:grid-cols-1" />
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
                <ServiceCTA
                    title={t("cta.title")}
                    description={t("cta.description")}
                    buttonText={t("cta.button")}
                    buttonLink="/contact-us"
                />
            </div>
        </main>
    );
}
