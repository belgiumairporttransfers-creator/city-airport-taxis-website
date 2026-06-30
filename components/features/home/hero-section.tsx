import Step1 from "../booking/setp-1/setp-1";
import HeroStats from "./hero-stats";
import { getTranslations } from "next-intl/server";
import { BadgeCheck } from "lucide-react";

export default async function HeroSection() {
    const t = await getTranslations("home.hero");

    const stats = [
        { value: t("stats.corporate_partners.value"), label: t("stats.corporate_partners.label") },
        { value: t("stats.vip_transfers.value"), label: t("stats.vip_transfers.label") },
        { value: t("stats.on_time_rate.value"), label: t("stats.on_time_rate.label") },
        { value: t("stats.support.value"), label: t("stats.support.label") },
    ];

    return (
        <section className="relative w-full">
            <div className="container mx-auto w-full px-4 pt-16 pb-10 md:pt-20 lg:pt-32 lg:pb-12">
                <div className="grid w-full grid-cols-1  lg:grid-cols-[1fr_minmax(5rem,7.5rem)_minmax(0,480px)] lg:items-center">
                    {/* Left: Hero content */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-start-1">
                        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-secondary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                            <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden />
                            {t("badge")}
                        </span>

                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-left lg:text-[52px] xl:text-[56px]">
                            <span className="block">{t("title_line1")}</span>
                            <span className="block">
                                {t.rich("title_line2", {
                                    accent: (chunks) => (
                                        <span className="text-secondary">{chunks}</span>
                                    ),
                                })}
                            </span>
                        </h1>

                        <p className="mt-5 hidden max-w-2xl text-lg leading-relaxed text-muted-foreground md:block">
                            {t("description")}
                        </p>

                        <HeroStats stats={stats} className="hidden md:block" />
                    </div>

                    {/* Right: Form */}
                    <div
                        id="book-ride-form"
                        className="w-full max-w-[480px] scroll-mt-24 lg:col-start-3 lg:justify-self-end"
                    >
                        <Step1 />
                    </div>
                </div>
            </div>
        </section>
    );
}
