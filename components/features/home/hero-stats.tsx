"use client";

import AnimatedCounter from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

export interface HeroStatItem {
    value: string;
    label: string;
}

interface HeroStatsProps {
    stats: HeroStatItem[];
    className?: string;
}

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

function parseHeroStatValue(value: string) {
    if (value.includes("/")) {
        return { type: "static" as const, static: value };
    }

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
        return { type: "static" as const, static: value };
    }

    const num = parseFloat(match[1]);
    if (Number.isNaN(num)) {
        return { type: "static" as const, static: value };
    }

    return {
        type: "animated" as const,
        end: num,
        suffix: match[2],
        decimals: match[2].includes(".") ? 1 : 0,
    };
}

export default function HeroStats({ stats, className }: HeroStatsProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <div ref={ref} className={cn("mt-10 border-t border-secondary/20 pt-8", className)}>
            <motion.div
                className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {stats.map((stat) => {
                    const parsed = parseHeroStatValue(stat.value);

                    return (
                        <motion.div key={stat.label} variants={itemVariants}>
                            <p className="text-2xl font-bold text-secondary sm:text-3xl">
                                {parsed.type === "static" ? (
                                    stat.value
                                ) : (
                                    <AnimatedCounter
                                        end={parsed.end}
                                        suffix={parsed.suffix}
                                        decimals={parsed.decimals}
                                        duration={2000}
                                        once
                                    />
                                )}
                            </p>
                            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:text-xs">
                                {stat.label}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
