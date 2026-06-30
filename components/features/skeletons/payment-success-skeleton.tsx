"use client"

import React from "react"

export function PaymentSuccessSkeleton() {
  return (
    <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-60 px-3 sm:px-4 pb-6 sm:pb-8 min-h-screen">
      <div className="mx-auto w-full container grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr] px-4">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-5">
          {/* Check Circle */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full animate-pulse bg-gray-200 mx-auto lg:mx-0 shadow-sm" />

          {/* Title and Subtitle */}
          <div className="text-center lg:text-left space-y-3">
            <div className="h-8 sm:h-10 w-64 sm:w-80 animate-pulse bg-gray-200 rounded mx-auto lg:mx-0" />
            <div className="h-4 sm:h-5 w-full max-w-md animate-pulse bg-gray-200 rounded mx-auto lg:mx-0" />
            <div className="h-4 sm:h-5 w-3/4 max-w-sm animate-pulse bg-gray-200 rounded mx-auto lg:mx-0" />
          </div>

          {/* Confirmation Box */}
          <div className="rounded-xl border border-border bg-background px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
            <div className="h-3 w-32 animate-pulse bg-gray-200 rounded mb-2 mx-auto lg:mx-0" />
            <div className="h-6 w-48 animate-pulse bg-gray-200 rounded mx-auto lg:mx-0" />
          </div>

          {/* Payment Summary Box (Mobile/Desktop) */}
          <div className="rounded-xl border border-secondary-200 bg-white p-4 sm:p-5 shadow-sm">
            <div className="h-7 w-48 animate-pulse bg-gray-200 rounded mb-6" />
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <div className="h-4 w-24 animate-pulse bg-gray-200 rounded" />
                  <div className="h-5 w-20 animate-pulse bg-gray-200 rounded" />
               </div>
               <div className="border-t border-gray-100 pt-4">
                  <div className="h-3 w-32 animate-pulse bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-48 animate-pulse bg-gray-200 rounded" />
               </div>
               <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <div className="h-8 w-32 animate-pulse bg-gray-200 rounded" />
                  <div className="h-8 w-24 animate-pulse bg-gray-200 rounded" />
               </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="hidden lg:block rounded-xl border border-border bg-background p-5 shadow-sm">
            <div className="h-7 w-40 animate-pulse bg-gray-200 rounded mb-6" />
            <div className="space-y-8">
               <div className="h-24 w-full animate-pulse bg-gray-100 rounded" />
               <div className="h-24 w-full animate-pulse bg-gray-100 rounded" />
            </div>
          </div>

          <div className="hidden lg:block rounded-xl border border-border bg-background p-5 shadow-sm">
            <div className="h-7 w-40 animate-pulse bg-gray-200 rounded mb-6" />
            <div className="grid grid-cols-[180px_1fr] gap-4">
               <div className="h-32 w-full animate-pulse bg-gray-100 rounded-lg" />
               <div className="space-y-3">
                  <div className="h-10 w-full animate-pulse bg-gray-100 rounded" />
                  <div className="h-10 w-full animate-pulse bg-gray-100 rounded" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
