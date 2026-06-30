"use client";

import { cn } from "@/lib/utils";

interface VehicleCardSkeletonProps {
  isExpanded?: boolean;
}

export function VehicleCardSkeleton({ isExpanded = false }: VehicleCardSkeletonProps) {
  return (
    <div
      className={cn(
        "group relative overflow-visible rounded-sm border transition-all duration-300 bg-gray-50 border-border",
        isExpanded && "bg-white shadow-sm"
      )}
    >
      {/* Best Value Pill Skeleton */}
      {/* <div className="absolute -top-3 left-1 z-20">
        <div className="h-6 w-20 sm:w-24 animate-pulse rounded-full bg-primary/20 shadow-sm" />
      </div> */}

      <div className="flex items-center md:p-4 p-2 py-1">
        {/* Vehicle Image Skeleton */}
        <div className="relative flex-shrink-0 w-32 sm:w-40 lg:w-48 aspect-[4/3] sm:aspect-auto flex items-center justify-center bg-gray/10 rounded-md overflow-hidden px-1 sm:px-2">
          <div className="w-full aspect-[16/9] animate-pulse bg-gray-200 rounded" />
        </div>

        {/* Content Section Skeleton */}
        <div className="flex-1 flex flex-col justify-between min-w-0 ml-2 sm:ml-4">
          <div className="flex justify-between items-stretch gap-2">
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div className="space-y-1.5">
                {/* Title */}
                <div className="h-4 sm:h-5 w-24 sm:w-32 animate-pulse rounded bg-gray-200" />
                {/* Subtitle */}
                <div className="h-3 sm:h-4 w-32 sm:w-48 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Icon Pills Skeleton */}
              <div className="flex flex-wrap gap-1 sm:gap-2 pt-3">
                <div className="h-6 sm:h-8 w-12 sm:w-16 animate-pulse rounded-full bg-gray-200 shrink-0" />
                <div className="h-6 sm:h-8 w-12 sm:w-16 animate-pulse rounded-full bg-gray-200 shrink-0" />
                <div className="h-6 sm:h-8 w-6 sm:w-10 animate-pulse rounded-full bg-gray-200 shrink-0" />
              </div>
            </div>

            {/* Selection & Price Skeleton */}
            <div className="flex flex-col items-end justify-between flex-shrink-0">
              {/* Checkbox circle */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full animate-pulse bg-primary/20 shadow-sm" />

              {/* Price */}
              <div className="text-right space-y-1">
                <div className="h-3 w-12 sm:w-16 animate-pulse rounded bg-gray-200 ml-auto" />
                <div className="h-5 sm:h-7 w-16 sm:w-24 animate-pulse rounded bg-gray-200 ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Inset Dashed Separator */}
          <div className="border-t border-dashed border-border mx-4" />
          <div className="px-4 py-2 flex justify-center sm:justify-end">
            <div className="h-9 w-full sm:w-32 animate-pulse bg-primary/20 rounded-sm" />
          </div>
        </div>
      )}
    </div>
  );
}
