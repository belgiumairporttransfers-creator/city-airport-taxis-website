'use client'
import React from 'react'
import { useRouter } from '@/i18n/routing'
import { ArrowLeft } from 'lucide-react'
import AnimatedRouteMap from '@/components/features/booking/shared/animated-route-map'
import SummaryDetails from '@/components/features/booking/shared/summary-details'
import Step3 from '@/components/features/booking/setp-3/setp-3'
import { useBookingStore } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

function PassengerDetailsPage() {
    const router = useRouter()
    const t = useTranslations('booking.passenger_details')
    const category = useBookingStore((s) => s.category)
    const showRouteMap = category === 'one-way' || category === 'return-trip'

    return (
        <div className={cn(
            "min-h-screen flex justify-center items-start md:pt-10 md:pb-10 md:px-4",
            "max-md:pt-[calc(0.1rem+env(safe-area-inset-top,0px))] max-md:pb-2"
        )}>
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

                        <div className="w-full py-1.5 px-2 flex flex-row items-center mt-2">
                            <button
                                type="button"
                                onClick={() => router.push('/book-ride/select-vehicle')}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-black hover:text-gray-700 transition-colors cursor-pointer"
                            >
                                <ArrowLeft size={16} strokeWidth={2.5} />
                                <span className="hidden sm:inline">{t('back_to_vehicle')}</span>
                                <span className="sm:hidden">{t('back')}</span>
                            </button>
                        </div>

                        <div className="px-1 md:px-0 mt-2">
                            <Step3 />
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

export default PassengerDetailsPage
