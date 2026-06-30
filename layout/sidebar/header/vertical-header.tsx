import React from "react";
import { useSidebar } from "@/store/use-sidebar-store";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";

const BackToWebsiteButton = ({ className }: { className?: string }) => (
  <Link
    href="/"
    className={cn(
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
      "border border-border/90 bg-background text-foreground shadow-sm",
      "transition-colors hover:bg-muted/90 active:scale-[0.97]",
      className
    )}
    aria-label="Back to website"
    title="Back to website"
  >
    <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={2.25} />
  </Link>
);

const MenuBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) => {
  return (
    <button
      type="button"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className="relative rounded-lg p-2 opacity-50 transition-opacity hover:opacity-100 disabled:cursor-not-allowed cursor-pointer"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div
        className={cn(
          "flex h-[16px] w-[20px] transform flex-col justify-between overflow-hidden transition-all duration-300",
          {
            "-translate-x-1.5 rotate-180": collapsed,
          }
        )}
      >
        <div
          className={cn("h-[2px] origin-left transform bg-foreground transition-all duration-300 delay-150", {
            "w-[11px] rotate-[42deg]": collapsed,
            "w-7": !collapsed,
          })}
        />
        <div
          className={cn("h-[2px] w-7 transform rounded bg-foreground transition-all duration-300", {
            "translate-x-10": collapsed,
          })}
        />
        <div
          className={cn("h-[2px] origin-left transform bg-foreground transition-all duration-300 delay-150", {
            "w-[11px] -rotate-[43deg]": collapsed,
            "w-7": !collapsed,
          })}
        />
      </div>
    </button>
  );
};

const VerticalHeader: React.FC = () => {
  const { collapsed, setCollapsed, subMenu } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  let menuBarContent: React.ReactNode = null;

  if (isDesktop) {
    menuBarContent = <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />;
  }
  if (subMenu && isDesktop) {
    menuBarContent = null;
  }

  if (!isDesktop) {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <BackToWebsiteButton />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-4">
      <BackToWebsiteButton />
      {menuBarContent}
    </div>
  );
};

export default VerticalHeader;
