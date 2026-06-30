import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import LightImage from "@/public/assets/images/utility/comming-soon-light.png";
import ComingSoonNewsletterForm from "@/components/features/coming-soon/coming-soon-newsletter-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common.coming_soon");

  return {
    title: t("title"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CommingSoonPage() {
  const t = await getTranslations("common.coming_soon");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="container mx-auto flex flex-1 flex-col justify-center px-6 pb-12 lg:pb-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="w-full max-w-xl lg:max-w-[570px]">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl 2xl:text-6xl">
              {t("heading")}
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("description")}
            </p>

            <ComingSoonNewsletterForm />
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <Image
              src={LightImage}
              alt={t("heading")}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
