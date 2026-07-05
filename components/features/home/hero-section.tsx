import Step1 from "../booking/setp-1/setp-1";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { IMAGES } from "@/constants/image-constants";

export default async function HeroSection() {
    const t = await getTranslations("home.hero");

    return (
        <section className="relative w-full -mt-16 overflow-hidden md:-mt-20">
            <div className="absolute inset-0">
                <Image
                    src={IMAGES.HOME_BANNER}
                    alt={t("image_alt")}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/35" />
            </div>

            <div className="relative z-10 container mx-auto w-full px-4 pt-24 pb-10 md:pt-32 lg:pt-40 xl:pt-44 lg:pb-12">
                <div className="grid w-full grid-cols-1  lg:grid-cols-[1fr_minmax(5rem,7.5rem)_minmax(0,480px)] lg:items-center">
                    {/* Left: Hero content */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left lg:col-start-1">
                        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-left lg:text-[64px] xl:text-[72px]">
                            <span className="block">{t("title_line1")}</span>
                            <span className="block">
                                {t.rich("title_line2", {
                                    accent: (chunks) => (
                                        <span className="text-secondary">{chunks}</span>
                                    ),
                                })}
                            </span>
                        </h1>

                        <p className="mt-5 hidden max-w-2xl text-lg leading-relaxed text-white/80 md:block">
                            {t("description")}
                        </p>
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
