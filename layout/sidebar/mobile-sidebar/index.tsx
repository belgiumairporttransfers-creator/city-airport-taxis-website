"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar-store";
import { menus } from "@/config/menus";
import type { MenuItemProps } from "@/config/menus";
import MenuLabel from "../common/menu-label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import SingleMenuItem from "./single-menu-item";
import { Logo } from "@/layout/header/logo";

const MobileSidebar = ({ className }: { className?: string }) => {
  const { sidebarBg, mobileMenu, setMobileMenu, collapsed } = useSidebar();
  const allMenus = menus;

  const locationName = usePathname();

  const prevPathnameRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== locationName) {
      setMobileMenu(false);
    }
    prevPathnameRef.current = locationName;
  }, [locationName, setMobileMenu]);
  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-[9999] flex min-h-0 w-[min(288px,88vw)] flex-col overflow-hidden",
          "bg-background/98 backdrop-blur-md",
          "rounded-r-3xl border border-border/80 border-l-0 shadow-[12px_0_40px_-8px_rgba(15,23,42,0.22)]",
          "transition-[transform,opacity] duration-300 ease-out will-change-transform",
          "pb-[max(1rem,env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)]",
          className,
          !mobileMenu && "-translate-x-[calc(100%+12px)] opacity-0 pointer-events-none",
          mobileMenu && "translate-x-0 opacity-100 shadow-[16px_0_48px_-12px_rgba(15,23,42,0.28)]"
        )}
        aria-hidden={!mobileMenu}
      >
        {sidebarBg !== "none" && (
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-r-3xl bg-cover bg-center opacity-[0.06]"
            style={{ backgroundImage: `url(${sidebarBg})` }}
          />
        )}
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
          <div
            className={cn(
              "shrink-0 border-b border-border",
              collapsed
                ? "flex justify-center px-2 py-3 [&_a]:h-20 [&_a]:w-20"
                : "px-4 py-3 [&_a]:h-25 [&_a]:w-full"
            )}
          >
            <Logo variant="dark" />
          </div>
          <ScrollArea
            className={cn("sidebar-menu min-h-0 flex-1 pt-5", {
              "px-4": !collapsed,
              "px-3": collapsed,
            })}
          >
            <ul
              className={cn("pb-6 pt-1", {
                "space-y-2 text-center": collapsed,
              })}
            >
              {allMenus.map((item: MenuItemProps, i: number) => (
                <li key={`menu_key_${i}`}>
                  {!item?.isHeader && (
                    <SingleMenuItem item={item} collapsed={collapsed} />
                  )}
                  {item.isHeader && !collapsed && (
                    <MenuLabel item={item} />
                  )}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
      {mobileMenu && (
        <div
          role="presentation"
          aria-hidden
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-[3px] transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default MobileSidebar;
