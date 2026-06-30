"use client";

import { GlobeIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export function LanguageSelector({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const label = t(`languages.${locale}` as "languages.en");

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-100",
        className,
      )}
      aria-label={`Language: ${label}`}
    >
      <GlobeIcon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}
