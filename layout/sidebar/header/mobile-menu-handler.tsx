"use client";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar-store";
const MobileMenuHandler = () => {
    const { mobileMenu, setMobileMenu } = useSidebar();
    return (
        <div>
            <Button
                onClick={() => setMobileMenu(!mobileMenu)}
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
                <Menu className="h-5 w-5" strokeWidth={2.25} />
            </Button>
        </div>
    );
};

export default MobileMenuHandler;
