import React from "react";
import { cn } from "@/lib/utils";

interface CalendarDaysIconProps {
    className?: string;
    size?: number;
}

export function CalendarDaysIcon({ className, size = 16 }: CalendarDaysIconProps) {
    return (
        <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width={size}
            height={size}
            className={cn("shrink-0", className)}
            role="img"
        >
            <path
                fill="currentColor"
                opacity={0.4}
                d="M0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm0 128l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM192 272l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm0 128l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM320 272l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm0 128l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"
            />
            <path
                fill="currentColor"
                d="M160 32c0-17.7-14.3-32-32-32S96 14.3 96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 80 448 0 0-80c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32z"
            />
        </svg>
    );
}
