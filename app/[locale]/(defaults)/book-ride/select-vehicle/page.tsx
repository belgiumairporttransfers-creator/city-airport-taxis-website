'use client'

import React from 'react'
import Setp2 from '@/components/features/booking/setp-2/setp-2'
import AnimatedRouteMap from '@/components/features/booking/shared/animated-route-map'
import SummaryDetails from '@/components/features/booking/shared/summary-details'
import { useBookingStore } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'

function SelectVehiclePage() {
  const category = useBookingStore((s) => s.category)
  const showRouteMap = category === 'one-way' || category === 'return-trip'

  return (
    <div
      className={cn(
        'min-h-screen flex justify-center items-start md:pt-10 md:pb-10 md:px-4',
        'max-md:pt-[calc(0.1rem+env(safe-area-inset-top,0px))] max-md:pb-2'
      )}
    >
      <div className="w-full md:max-w-7xl flex flex-col lg:flex-row gap-6">
        <div
          className={cn(
            'flex-1 min-w-0 md:bg-white md:py-4 md:px-1 relative z-10 md:mt-0 md:rounded-2xl md:overflow-hidden flex flex-col',
            !showRouteMap && 'bg-white rounded-t-3xl max-md:pt-6 max-md:mt-1'
          )}
        >
          {showRouteMap && (
            <div className="max-md:sticky max-md:top-[calc(4rem+env(safe-area-inset-top,0px))] z-0">
              <AnimatedRouteMap />
            </div>
          )}

          <div
            className={cn(
              'flex flex-col bg-white',
              showRouteMap && 'max-md:relative max-md:z-10 max-md:rounded-t-3xl max-md:-mt-10 max-md:pt-2',
              !showRouteMap && 'flex-1'
            )}
          >
            <div className="flex justify-center w-full lg:hidden">
              <div className="w-12 h-1.5 bg-gray rounded-full" />
            </div>

            <div
              className={cn(
                'px-1 md:px-0',
                showRouteMap ? 'mt-4 pt-4 md:mt-6' : 'mt-2'
              )}
            >
              <Setp2 />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/3 flex-shrink-0 flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <SummaryDetails />
        </div>
      </div>
    </div>
  )
}

export default SelectVehiclePage
