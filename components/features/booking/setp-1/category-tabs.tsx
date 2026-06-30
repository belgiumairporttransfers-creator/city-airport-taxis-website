'use client'

import React from 'react'
import { BookingCategory } from '@/store/use-booking-store'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { RouteIcon } from '@/components/icons/route-icon'
import { TimerIcon } from '@/components/icons/timer-icon'

interface CategoryTabsProps {
    activeTab: BookingCategory
    onTabChange: (tab: BookingCategory) => void
    disabled?: boolean
}

function CategoryTabs({ activeTab, onTabChange, disabled }: CategoryTabsProps) {
    const t = useTranslations('common.booking_form.categories')

    const tabs: { label: string; value: BookingCategory; icon: React.ReactNode }[] = [
        { label: t('one_way'), value: 'one-way', icon: <RouteIcon size={16} /> },
        { label: t('hourly'), value: 'hourly', icon: <TimerIcon size={16} /> },
    ]

    return (
        <div className={cn('mb-2 flex items-center gap-2', disabled && 'opacity-80')}>
            {tabs.map((tab) => {
                const isActive =
                    activeTab === tab.value ||
                    (tab.value === 'one-way' && activeTab === 'return-trip')

                return (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => !disabled && onTabChange(tab.value)}
                        disabled={disabled && !isActive}
                        className={cn(
                            'inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm transition-colors',
                            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                            isActive
                                ? 'bg-black font-bold text-white'
                                : 'bg-transparent font-normal text-foreground hover:bg-gray-50'
                        )}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryTabs
