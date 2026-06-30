"use client";
import React from "react";

import { cn, getInitials } from "@/lib/utils";
import { menus } from "@/config/menus";
import type { MenuItemProps } from "@/config/menus";
import MenuLabel from "../common/menu-label";
import SingleMenuItem from "./single-menu-item";
import { useSidebar } from "@/store/use-sidebar-store";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/layout/header/logo";
import { useAuthLogout, useAuthMe } from "@/hooks/queries/use-auth";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const PopoverSidebar = () => {
  const t = useTranslations("common.dashboard");
  const { collapsed } = useSidebar();
  const allMenus = menus;
  const { data, isLoading } = useAuthMe();
  const logoutMutation = useAuthLogout();
  const currentAccount = data?.data?.account;
  const fullName =
    currentAccount?.name?.trim() ||
    `${currentAccount?.firstName ?? ""} ${currentAccount?.lastName ?? ""}`.trim() ||
    "Admin User";
  const email = currentAccount?.email || "admin@example.com";
  const initials = getInitials(fullName, "AU");

  return (
    <div
      className={cn("fixed top-0 start-0 flex min-h-0 flex-col overflow-hidden border border-border bg-background", {
        "w-[248px]": !collapsed,
        "w-[72px]": collapsed,
        "m-6 bottom-0 rounded-md": true,
        "h-full": false,
      })}
    >
      <div
        className={cn(
          "shrink-0 border-b border-border/70",
          collapsed
            ? "flex justify-center px-2 py-3 "
            : "px-4 py-3 [&_a]:h-25 [&_a]:w-full"
        )}
      >
        <Logo variant="dark" className="w-full h-full " />
      </div>
      <Separator className="shrink-0" />
      <ScrollArea
        className={cn("sidebar-menu min-h-0 flex-1 pt-5", {
          "px-4": !collapsed,
        })}
      >
        <ul
          className={cn("space-y-1", {
            "space-y-2 text-center": collapsed,
          })}
        >
          {allMenus.map((item: MenuItemProps, i: number) => (
            <li key={`menu_key_${i}`}>
              {!item?.isHeader && (
                <SingleMenuItem
                  item={item}
                  collapsed={collapsed}
                />
              )}
              {item.isHeader && !collapsed && (
                <MenuLabel item={item} />
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <div className={cn("shrink-0 border-t border-border/70 py-2", collapsed ? "px-0" : "px-3")}>
        {collapsed ? (
          <button
            type="button"
            aria-label={logoutMutation.isPending ? t("logging_out") : t("logout")}
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground disabled:opacity-60"
          >
            {logoutMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : initials}
          </button>
        ) : (
          <div className="px-0.5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {isLoading ? t("loading") : fullName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {isLoading ? "..." : email}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              loading={logoutMutation.isPending}
              loadingText={t("logging_out")}
              className="mt-2 w-full"
            >
              <LogOut className="h-3.5 w-3.5 mr-2" />
              {t("logout")}
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default PopoverSidebar;
