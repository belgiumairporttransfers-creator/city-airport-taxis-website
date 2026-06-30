"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar-store";
import ProfileInfo from "./profile-info";
import VerticalHeader from "./vertical-header";
import MobileMenuHandler from "./mobile-menu-handler";
import FullScreen from "./full-screen";
import DashboardLogoutButton from "./logout";
import { useMediaQuery } from "@/hooks/use-media-query";

const NavTools = ({ isDesktop }: { isDesktop: boolean }) => {
  return (
    <div
      className={cn(
        "nav-tools flex shrink-0 items-center",
        isDesktop ? "gap-2" : "gap-1.5 border-l border-border/60 pl-3 sm:gap-2 sm:pl-4"
      )}
    >
      {isDesktop && <FullScreen />}
      {isDesktop && <ProfileInfo />}
      {!isDesktop && <DashboardLogoutButton />}
      {!isDesktop && <MobileMenuHandler />}
    </div>
  );
};

const Header = () => {
  const { collapsed } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <header
      className={cn(
        "has-sticky-header z-50 rounded-md mb-6 sm:mb-8 ",
        {
          "xl:ml-[96px]": collapsed,
          "xl:ml-[272px]": !collapsed,
          "sticky top-6": true,
        }
      )}
    >
      <div className="mx-3 sm:mx-4">
        <div
          className={cn(
            "w-full rounded-xl border-b border-border py-2 shadow-md bg-background",
            "md:px-6 md:py-3",
            "px-3 sm:px-4"
          )}
        >
          <div
            className={cn(
              "flex w-full items-center justify-between gap-2",
              !isDesktop && "min-h-[52px]"
            )}
          >
            <VerticalHeader />
            <NavTools isDesktop={isDesktop} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
