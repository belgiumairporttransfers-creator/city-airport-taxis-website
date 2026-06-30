"use client";

import { COMPANY_ADDRESS } from "@/constants/app-default";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function FooterBottomBar() {
  const t = useTranslations("common");

  return (
    <div className="bg-primary">
      <div className="container mx-auto flex flex-col items-center border-t border-gray-400 justify-between gap-3 py-4 text-center md:flex-row md:text-left">
        <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS)}`} className="text-xs text-gray-400 sm:text-sm">
          {t("footer.copyright")} © {new Date().getFullYear()} <span className="font-bold text-secondary">Airport Transfer.</span> {t("footer.rights")}
        </Link>


        <p className="text-xs text-gray-400 sm:text-sm">
          <Link href="/privacy-policy" className="transition-colors hover:text-white ml-2">
            {t("footer.links.privacy_policy")}
          </Link>
          {" | "}
          <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
            {t("footer.links.terms")}
          </Link>
          {" | "}
          <Link href="/disclaimer" className="transition-colors hover:text-white">
            {t("footer.links.disclaimer")}
          </Link>
        </p>
        <div className="flex items-center gap-8 text-base text-gray-300">
          <span>
            Developed by{" "}
            <Link href="https://www.thedevsquare.com/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary/80 transition-colors font-bold underline">
              The Dev Square
            </Link>
          </span>
        </div>
      </div>

    </div>
  );
}
