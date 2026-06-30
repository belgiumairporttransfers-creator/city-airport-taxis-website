"use client";

import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useHeaderMenu } from "./use-header-menu";
import { HeaderDesktopNav } from "./header-desktop-nav";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { LanguageSelector } from "./language-selector";
import { Logo } from "./logo";
import { UserIcon } from "@/components/icons";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations("common");
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

  return (
    <header
      className="sticky top-0 z-[70] w-full bg-black shadow-md"
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
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-100"
              >
                <UserIcon className="h-5 w-5" />
                <span>{t("buttons.sign_in")}</span>
              </Link>
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
            />
          </div>
        </div>
      </div>
    </header>
  );
}
