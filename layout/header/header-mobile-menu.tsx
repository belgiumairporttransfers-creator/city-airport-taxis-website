"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/routing";
import { ChevronDown, ArrowRight, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, isNavActive } from "./header-constants";
import { COMPANY_PHONE, COMPANY_PHONE_HREF, COMPANY_WHATSAPP_HREF } from "@/constants/app-default";
import WhatsAppIcon from "@/components/icons/whatsapp-icon";
import { UserIcon } from "@/components/icons";
import { useTranslations } from "next-intl";

import { Logo } from "./logo";
import { LanguageSelector } from "./language-selector";

interface HeaderMobileMenuProps {
  isOpen: boolean;
  pathname: string | null;
  openDropdownId: string | null;
  onClose: () => void;
  onToggleDropdown: (id: string) => void;
  toggleMobile: () => void;
  mobileToggleRef: React.RefObject<HTMLButtonElement | null>;
  userName?: string;
}

export const HeaderMobileMenu = forwardRef<HTMLDivElement, HeaderMobileMenuProps>(
  ({ isOpen, pathname, openDropdownId, onClose, onToggleDropdown, toggleMobile, mobileToggleRef, userName }, ref) => {
    const t = useTranslations("common");

    return (
      <>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={COMPANY_PHONE_HREF}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-secondary text-white shadow-sm transition-all duration-300 hover:scale-110"
            aria-label={`Call ${COMPANY_PHONE}`}
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href={COMPANY_WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#1ebe57]"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
        <button
          ref={mobileToggleRef}
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white transition-all duration-200 md:hidden"
          onClick={toggleMobile}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className="relative h-6 w-6">
            <Menu
              className={`absolute inset-0 transition-all duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
              strokeWidth={2.5}
            />
            <X
              className={`absolute inset-0 transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
              strokeWidth={2.5}
            />
          </div>
        </button>

        <div
          ref={ref}
          className={`fixed inset-0 z-[60] transition-all duration-300 ease-in-out md:hidden ${isOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none -translate-x-full opacity-0"
            }`}
          role="dialog"
          aria-modal={isOpen}
          aria-label="Mobile navigation menu"
        >
          <div className="flex h-full flex-col overflow-hidden bg-primary">
            {/* Mobile Menu Header */}
            <div className="flex h-20 flex-shrink-0 items-center justify-between border-b border-white/20 px-4">
              <Logo variant="white" />
              <button
                onClick={toggleMobile}
                className="p-2 text-white transition-colors hover:text-secondary"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" strokeWidth={2} />
              </button>
            </div>

            <nav className="mt-4 flex-1 divide-y divide-white/20 overflow-y-auto border-y border-white/20 px-4 pb-10 sm:px-6" role="menu">
              {NAV_LINKS.map((link) => {
                const active = isNavActive(pathname, link);
                const translatedTitle = t(link.title as any);

                if (!link.sublinks) {
                  return (
                    <div key={link.title}>
                      <Link
                        href={link.path || "#"}
                        onClick={onClose}
                        role="menuitem"
                        className={`block py-4 text-base font-medium transition-colors ${active ? "text-secondary" : "text-background hover:text-secondary-400"
                          }`}
                      >
                        {translatedTitle}
                      </Link>
                    </div>
                  );
                }

                const isDropdownOpen = openDropdownId === link.title;

                return (
                  <div key={link.title}>
                    <button
                      onClick={() => onToggleDropdown(link.title)}
                      className={`flex w-full items-center justify-between py-4 text-left text-base font-medium transition-colors ${active ? "text-secondary" : "text-background hover:text-secondary-400"
                        }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      role="menuitem"
                    >
                      {translatedTitle}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      role="menu"
                    >
                      <div className="space-y-1 pb-3 pl-4">
                        {link.sublinks.map((sub) => (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            onClick={onClose}
                            role="menuitem"
                            className={`group flex items-center gap-2 py-2 text-sm transition-colors ${pathname === sub.path ? "text-secondary" : "text-background/80 hover:text-secondary-400"
                              }`}
                          >
                            <ArrowRight className="h-3.5 w-3.5 text-background/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-secondary-400" />
                            <span className="transition-all duration-200 group-hover:translate-x-1">{t(sub.title as any)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

            </nav>

            {/* Mobile Menu Footer Action */}
            <div className="mt-auto border-t border-white/20 px-4 py-8 sm:px-6">
              {userName ? (
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:bg-white/10 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-black shadow-lg">
                      <UserIcon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Personal Account</span>
                      <span className="text-lg font-bold text-white truncate max-w-[180px] leading-tight">{userName}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-secondary" />
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="flex min-w-0 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-black transition-colors hover:bg-gray-100 active:scale-[0.98]"
                  >
                    <UserIcon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{t("buttons.sign_in")}</span>
                  </Link>
                  <LanguageSelector className="min-w-0 w-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

HeaderMobileMenu.displayName = "HeaderMobileMenu";
