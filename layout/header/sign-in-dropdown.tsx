"use client";

import { ChevronDown, Car, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { UserIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DRIVER_PORTAL_LOGIN_URL } from "@/constants/app-default";
import { cn } from "@/lib/utils";

export function SignInDropdown({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const t = useTranslations("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-100",
            className,
          )}
          aria-label={t("buttons.sign_in")}
        >
          <UserIcon className="h-5 w-5 shrink-0" />
          <span className="truncate">{t("buttons.sign_in")}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[12rem] rounded-md border border-gray-200 bg-white p-1 text-black shadow-lg"
      >
        <DropdownMenuItem asChild>
          <Link
            href="/login"
            onClick={onNavigate}
            className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium focus:bg-gray-100"
          >
            <UserRound className="h-4 w-4 shrink-0 text-gray-600" />
            <span>{t("buttons.customer_sign_in")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={DRIVER_PORTAL_LOGIN_URL}
            onClick={onNavigate}
            className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium focus:bg-gray-100"
          >
            <Car className="h-4 w-4 shrink-0 text-gray-600" />
            <span>{t("buttons.driver_sign_in")}</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
