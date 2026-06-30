"use client";

import React from "react";

export default function FleetSkeleton() {
    return (
        <div className="bg-white rounded-md p-3 flex flex-col h-full w-full border border-gray-100">
            {/* Image Container Skeleton */}
            <div className="bg-gray-100 rounded-md mb-4 aspect-[2.2] relative overflow-hidden flex items-center justify-center animate-pulse">
                <div className="w-1/3 h-1/2 bg-gray-200 rounded-lg" />
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 px-1">
                <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse mb-3" />
                <div className="h-3 w-11/12 bg-gray-200 rounded animate-pulse mb-1.5" />
                <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse mb-6" />
            </div>

            {/* Footer Skeleton */}
            <div className="flex items-center justify-between gap-4 mt-auto px-1">
                <div className="flex items-center gap-3">
                    <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
                    <div className="w-[1px] h-3 bg-gray-100" />
                    <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-8 w-24 bg-gray-100 rounded-full animate-pulse" />
            </div>
        </div>
    );
}
