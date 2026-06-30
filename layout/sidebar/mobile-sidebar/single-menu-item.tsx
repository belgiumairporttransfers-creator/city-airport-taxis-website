"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import type { MenuItemProps } from "@/config/menus";
import { useTranslations } from "next-intl";

const isLocationMatch = (href?: string, pathname?: string) => {
  if (!href || !pathname) return false;
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, "") || "/";
  return cleanPathname === href || cleanPathname.startsWith(`${href}/`);
};

const SingleMenuItem = ({ item, collapsed }: { item: MenuItemProps; collapsed: boolean }) => {
  const t = useTranslations("common.dashboard.sidebar");
  const { badge, href, title } = item;
  const Icon = item.icon;
  const locationName = usePathname();

  // Map the menu title to a translation key
  const getTranslatedTitle = (title: string) => {
    const keyMap: Record<string, string> = {
      "Dashboard": "dashboard",
      "My Bookings": "bookings",
      "My Payments": "payments",
      "Statements": "statements",
      "Profile": "profile"
    };
    const key = keyMap[title];
    return key ? t(key) : title;
  };

  const translatedTitle = getTranslatedTitle(title);

  // If no href, render as a div instead of Link
  if (!href) {
    return (
      <div
        className={cn(
          "flex gap-3 text-default-700 text-sm capitalize px-3 py-3.5 rounded-xl cursor-pointer transition-colors hover:bg-primary hover:text-white",
          {
            "bg-primary text-white": false,
          }
        )}
      >
        <span className="flex-grow-0">{Icon && <Icon className="w-5 h-5" />}</span>
        <div className="text-box flex-grow">{translatedTitle}</div>
        {badge && <Badge className=" rounded">{item.badge}</Badge>}
      </div>
    );
  }

  return (
    <Link href={href}>
      <>
        {collapsed ? (
          <div>
            <span
              className={cn(
                "h-12 w-12 mx-auto rounded-md transition-all duration-300 inline-flex flex-col items-center justify-center relative ",
                {
                  "bg-primary text-white ": isLocationMatch(
                    href,
                    locationName
                  ),
                  " text-default-600 ": !isLocationMatch(href, locationName),
                }
              )}
            >
              {Icon && <Icon className="w-6 h-6" />}
            </span>
          </div>
        ) : (
          <div
            className={cn(
              "flex gap-3 text-default-700 text-sm capitalize px-3 py-3.5 rounded-xl cursor-pointer transition-colors hover:bg-primary hover:text-white",
              {
                "bg-primary text-white": isLocationMatch(
                  href,
                  locationName
                ),
              }
            )}
          >
            <span className="flex-grow-0">{Icon && <Icon className="w-5 h-5" />}</span>
            <div className="text-box flex-grow">{translatedTitle}</div>
            {badge && <Badge className=" rounded">{item.badge}</Badge>}
          </div>
        )}
      </>
    </Link>
  );
};

export default SingleMenuItem;
