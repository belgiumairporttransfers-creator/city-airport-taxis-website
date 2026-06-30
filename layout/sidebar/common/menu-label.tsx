import React from "react";
import { cn } from "@/lib/utils";
import type { MenuItemProps } from "@/config/menus";

const MenuLabel = ({ item, className }: { item: MenuItemProps; className?: string }) => {
    const { title } = item;
    return (
        <div
            className={cn(
                "mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
                className
            )}
        >
            {title}
        </div>
    );
};

export default MenuLabel;
