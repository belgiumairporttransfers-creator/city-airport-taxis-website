"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/routing";
import { ChevronDown, ArrowRight } from "lucide-react";
import { NAV_LINKS, isNavActive } from "./header-constants";
import { useTranslations } from "next-intl";

interface HeaderDesktopNavProps {
  pathname: string | null;
  openDropdownId: string | null;
  onDropdownOpen: (id: string) => void;
  onDropdownClose: () => void;
}

export const HeaderDesktopNav = forwardRef<HTMLElement, HeaderDesktopNavProps>(
  ({ pathname, openDropdownId, onDropdownOpen, onDropdownClose }, ref) => {
    const t = useTranslations("common");

    return (
      <nav ref={ref} className="hidden items-center justify-center gap-2 md:flex" role="menubar">
        {NAV_LINKS.map((link) => {
          const active = isNavActive(pathname, link);
          const translatedTitle = t(link.title as any);

          if (!link.sublinks) {
            return (
              <Link
                key={link.title}
                href={link.path || "#"}
                role="menuitem"
                className={`block px-2 py-2 text-base font-bold transition-colors ${active ? "text-secondary" : "text-white/90 hover:text-white"
                  }`}
              >
                {translatedTitle}
              </Link>
            );
          }

          const isOpen = openDropdownId === link.title;

          return (
            <div
              key={link.title}
              className="relative"
              onMouseEnter={() => onDropdownOpen(link.title)}
              onMouseLeave={onDropdownClose}
            >
              <button
                className={`flex items-center px-2 py-2 text-base font-bold transition-all duration-300 rounded-full ${isOpen ? "bg-white/10" : "hover:bg-white/5"} ${active || isOpen ? "text-secondary" : "text-white/90 hover:text-white"
                  }`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                role="menuitem"
              >
                <span>{translatedTitle}</span>
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div
                  className="absolute left-0 top-full w-64 pt-4 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-left"
                  onMouseEnter={() => onDropdownOpen(link.title)}
                  onMouseLeave={onDropdownClose}
                >
                  <div className="relative rounded-lg bg-white shadow-2xl p-1.5" role="menu">
                    <div className="absolute -top-[12px] left-8 w-6 h-3.5">
                      <svg
                        viewBox="0 0 20 12"
                        className="w-full h-full fill-white drop-shadow-[0_-2px_1px_rgba(0,0,0,0.05)]"
                      >
                        <path d="M0 12 C4 12 7 0 10 0 C13 0 16 12 20 12" />
                      </svg>
                    </div>

                    <div className="relative z-10 flex flex-col gap-0.5">
                      {link.sublinks.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            role="menuitem"
                            className={`group flex items-center gap-2 rounded-xl px-3 py-1 text-sm font-bold transition-all duration-300 ${pathname === sub.path
                              ? "bg-secondary/10 text-secondary"
                              : "text-gray-600 hover:bg-gray-50 hover:text-secondary"
                              }`}
                          >
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-secondary/20 shrink-0 bg-secondary/10`}>
                              {Icon ? (
                                <Icon className={`h-4 w-4 text-secondary`} />
                              ) : (
                                <ArrowRight className="h-3 w-3 text-gray-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-secondary" />
                              )}
                            </div>
                            <span className="transition-all duration-300 group-hover:translate-x-0.5">{t(sub.title as any)}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  }
);

HeaderDesktopNav.displayName = "HeaderDesktopNav";
