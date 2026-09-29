"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useAuthMe } from "@/hooks/queries/use-auth";
import { UserIcon } from "@/components/icons";
import { useHeaderMenu } from "./use-header-menu";
import { HeaderDesktopNav } from "./header-desktop-nav";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { LanguageSelector } from "./language-selector";
import { Logo } from "./logo";
import { SignInDropdown } from "./sign-in-dropdown";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("common");
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { data: meData } = useAuthMe();
  const {
    mobileOpen,
    openDropdownId,
    closeAll,
    openDropdown,
    scheduleCloseDropdown,
    toggleMobile,
    toggleDropdown,
    mobileMenuRef,
    mobileToggleRef,
    desktopNavRef,
  } = useHeaderMenu(pathname);

  const account = meData?.data?.account;
  const userName =
    account?.fullName?.trim() ||
    account?.name?.trim() ||
    (account?.firstName && account?.lastName && account.firstName !== account.lastName
      ? `${account.firstName} ${account.lastName}`.trim()
      : account?.firstName || account?.lastName || "") ||
    account?.email ||
    undefined;

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-[70] w-full transition-colors duration-300",
        isTransparent ? "bg-transparent shadow-none" : "bg-black shadow-md",
      )}
      role="banner"
    >
      <div className="relative mx-auto container px-4">
        <div className="relative flex h-16 items-center md:h-20">
          {/* Logo — left */}
          <div className="relative z-10 shrink-0">
            <Logo />
          </div>

          {/* Nav — center (desktop) */}
          <div className="pointer-events-none absolute inset-x-0 hidden justify-center md:flex">
            <div className="pointer-events-auto">
              <HeaderDesktopNav
                ref={desktopNavRef}
                pathname={pathname}
                openDropdownId={openDropdownId}
                onDropdownOpen={openDropdown}
                onDropdownClose={scheduleCloseDropdown}
              />
            </div>
          </div>

          {/* Actions — right */}
          <div className="relative z-10 ml-auto flex items-center gap-3 sm:gap-4">
            <div className="hidden items-center gap-3 md:flex">
              {userName ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-100"
                  aria-label={t("dashboard.sidebar.dashboard")}
                >
                  <UserIcon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{t("dashboard.sidebar.dashboard")}</span>
                </Link>
              ) : (
                <SignInDropdown />
              )}
              <LanguageSelector />
            </div>

            <HeaderMobileMenu
              ref={mobileMenuRef}
              isOpen={mobileOpen}
              pathname={pathname}
              openDropdownId={openDropdownId}
              onClose={closeAll}
              onToggleDropdown={toggleDropdown}
              toggleMobile={toggleMobile}
              mobileToggleRef={mobileToggleRef}
              userName={userName}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
