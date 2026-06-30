import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Logo } from "@/layout/header/logo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common.maintenance");

  return {
    title: t("title"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MaintenancePage() {
  const t = await getTranslations("common.maintenance");

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="relative mx-auto aspect-[700/432] w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[700px]">
          <Image
            src="/assets/images/utility/construction-light.png"
            alt={t("heading")}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 620px, 700px"
            className="object-contain"
          />
        </div>

        <h1 className="mt-10 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:mt-12 sm:text-3xl lg:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          {t("description")}
          <br />
          {t("description_line_2")}
        </p>
      </div>
    </div>
  );
}
