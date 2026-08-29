"use client";

import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GlobeIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSelector({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const label = t(`languages.${locale}` as "languages.en");

  const switchLocale = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "cursor-pointer flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-100",
            className,
          )}
          aria-label={`Language: ${label}`}
        >
          <GlobeIcon className="h-5 w-5 shrink-0" />
          <span className="truncate">{label}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[10rem] rounded-md border border-gray-200 bg-white p-1 text-black shadow-lg"
      >
        {routing.locales.map((item) => {
          const isActive = item === locale;

          return (
            <DropdownMenuItem
              key={item}
              onSelect={() => switchLocale(item)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2 text-sm font-medium focus:bg-gray-100",
                isActive && "bg-gray-50",
              )}
            >
              <span>{t(`languages.${item}` as "languages.en")}</span>
              {isActive ? <Check className="h-4 w-4 shrink-0" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
