"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar-store";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./sidebar/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { collapsed } = useSidebar();
    const location = usePathname();
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <Sidebar />

            <div
                className={cn("content-wrapper transition-all duration-150", {
                    "xl:ml-[96px]": collapsed,
                    "xl:ml-[272px]": !collapsed,
                })}
            >
                <div className="page-min-height-semibox px-4 pb-8 pt-6 sm:pt-8 xl:pt-10">
                    <div className="semibox-content-wrapper">
                        <LayoutWrapper
                            location={location}
                        >
                            {children}
                        </LayoutWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

const LayoutWrapper = ({
    children,
    location
}: {
    children: React.ReactNode,
    location: string
}) => {
    return (
        <motion.div
            key={location}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={{
                pageInitial: {
                    opacity: 0,
                    y: 50,
                },
                pageAnimate: {
                    opacity: 1,
                    y: 0,
                },
                pageExit: {
                    opacity: 0,
                    y: -50,
                },
            }}
            transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
            }}
        >
            <main>{children}</main>
        </motion.div>
    );
};
