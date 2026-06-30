'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useRouter } from '@/i18n/routing'
import { useBookingStore, BookingCategory } from '@/store/use-booking-store'
import CategoryTabs from './category-tabs'
import { AddReturnButton } from './AddReturnButton'
import {
  isAirportAddress,
  validateBookingTime,
  calculateArrivalTime,
} from '@/lib/utils'
import { useHasHydrated } from '@/hooks/use-has-hydrated'
import { useCalculateRouteDistance } from '@/hooks/queries/use-calculate-distance'
import { Form } from '@/components/features/form/form'
import { Input } from '@/components/features/form/Input'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { usePublicSettings } from '@/hooks/queries/use-settings'
import { Trustpilot } from '@/components/trustpilot'

interface HeroFormValues {
  pickupAddress: string
  deliveryAddress: string
  duration: string
  pickupDate: string
  pickupTime: string
  returnDate: string
  returnTime: string
  passengers: number
}

function Step1() {
  const t = useTranslations('common.booking_form')
  const router = useRouter()
  const calculateRoute = useCalculateRouteDistance()
  const hasHydrated = useHasHydrated()

  const {
    category,
    setCategory,
    setStep1Data,
    setRouteData,
    setBookingSettings,
  } = useBookingStore()

  const { data: settings, isLoading } = usePublicSettings()
  const isTransfer = category === 'one-way' || category === 'return-trip'
  const isReturnTrip = category === 'return-trip'
  const isHourly = category === 'hourly'


  const form = useForm<HeroFormValues>({
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      duration: '',
      pickupDate: '',
      pickupTime: '',
      returnDate: '',
      returnTime: '',
      passengers: 1,
    },
  })

  const handleAddReturn = () => {
    setCategory('return-trip')
  }

  const handleRemoveReturn = () => {
    setCategory('one-way')
    form.setValue('returnDate', '')
    form.setValue('returnTime', '')
  }

  const onSubmit = async (data: HeroFormValues) => {
    try {
      const { isValid, timeDisplay } = validateBookingTime(
        data.pickupDate,
        data.pickupTime,
        settings?.minBookingMinutes || 0
      )

      if (!isValid) {
        toast.error(
          `Booking can't be added within ${timeDisplay} of pickup time, choose another time.`
        )
        return
      }

      if (isReturnTrip && isTransfer) {
        if (!data.returnDate || !data.returnTime) {
          toast.error('Please select return date and time.')
          return
        }

        const returnValidation = validateBookingTime(
          data.returnDate,
          data.returnTime,
          settings?.minBookingMinutes || 0
        )

        if (!returnValidation.isValid) {
          toast.error(
            `Return booking can't be added within ${returnValidation.timeDisplay} of return time, choose another time.`
          )
          return
        }
      }

      const pickupAddress = data.pickupAddress.trim()
      const deliveryAddress = data.deliveryAddress.trim()

      const addresses: string[] = [pickupAddress]
      if (isTransfer && deliveryAddress) {
        addresses.push(deliveryAddress)
      }

      let routeResult = null
      if (addresses.length > 1) {
        routeResult = await calculateRoute.mutateAsync(addresses)
      }

      setStep1Data({
        pickupAddress,
        deliveryAddress,
        pickupDate: data.pickupDate,
        pickupTime: data.pickupTime,
        returnDate: isReturnTrip && isTransfer ? data.returnDate : undefined,
        returnTime: isReturnTrip && isTransfer ? data.returnTime : undefined,
        passengers: data.passengers,
      })

      const estTime = calculateArrivalTime(
        data.pickupTime,
        routeResult?.totalDurationMinutes
      )

      setRouteData({
        distance: routeResult?.totalDistanceKm,
        durationMinutes: routeResult?.totalDurationMinutes,
        estTime: estTime !== '—' ? estTime : undefined,
        isAirportSelected: isAirportAddress(pickupAddress),
        duration:
          isHourly && data.duration ? JSON.parse(data.duration) : undefined,
      })

      if (!settings) {
        toast.error(t('messages.settings_loading'))
        return
      }
      setBookingSettings({
        stopFee: settings.stopFee,
        airportPickup: settings.airportPickup,
      })
      router.replace('/book-ride/select-vehicle')
    } catch {
      toast.error(t('messages.general_error'))
    }
  }

  const handleTabChange = (tab: BookingCategory) => {
    setCategory(tab)
    form.reset({
      pickupAddress: '',
      deliveryAddress: '',
      duration: '',
      pickupDate: '',
      pickupTime: '',
      returnDate: '',
      returnTime: '',
      passengers: 1,
    })
  }

  if (!hasHydrated) return null

  return (
    <div className="mx-auto flex w-full max-w-screen-sm flex-col">
      <CategoryTabs activeTab={category} onTabChange={handleTabChange} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-10 mt-0 flex flex-col items-stretch gap-2 rounded-none bg-white md:rounded-b-md"
        >
          <div className="relative mb-2 flex-1 space-y-2 md:mb-0">
            <Input
              name="pickupAddress"
              type="location"
              label={t('labels.from')}
              placeholder={t('placeholders.location')}
              required
            />

            {isTransfer && (
              <Input
                name="deliveryAddress"
                type="location"
                label={t('labels.to')}
                placeholder={t('placeholders.location')}
                required
              />
            )}

            {category === 'hourly' && (
              <Input
                name="duration"
                type="select"
                label={t('labels.duration')}
                placeholder={t('placeholders.duration')}
                boxed
                required
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                name="pickupDate"
                type="date"
                label={t('labels.pickup_date')}
                placeholder={t('placeholders.date')}
                boxed
                required
              />
            </div>
            <div className="flex-1">
              <Input
                name="pickupTime"
                type="time"
                label={t('labels.pickup_time')}
                placeholder={t('placeholders.time')}
                boxed
                required
              />
            </div>
          </div>

          {isTransfer && (
            <>
              {!isReturnTrip && (
                <AddReturnButton
                  active={false}
                  onToggle={handleAddReturn}
                  addLabel={t('buttons.add_return')}
                  removeLabel={t('buttons.remove_return')}
                />
              )}

              {isReturnTrip && (
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      name="returnDate"
                      type="date"
                      label={t('labels.return_date')}
                      placeholder={t('placeholders.return_date')}
                      minSelectableDate={form.watch('pickupDate') ? new Date(form.watch('pickupDate')) : null}
                      boxed
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      name="returnTime"
                      type="time"
                      label={t('labels.return_time')}
                      placeholder={t('placeholders.return_time')}
                      boxed
                      required
                      onRemove={handleRemoveReturn}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <Input
            name="passengers"
            type="counter"
            label={t('labels.passengers')}
            boxed
            min={1}
            max={99}
            required
          />

         

          <Button
            type="submit"
            className="bg-black py-6"
            loading={
              isLoading ||
              calculateRoute.isPending
            }
          >
            <Search className="mr-2 h-5 w-5" aria-hidden />
            {t('buttons.see_prices')}
          </Button>
          {/* <p className="text-center text-sm font-semibold">
            {t('notes.chauffeur_wait')}
          </p> */}
          {/* <div className="flex justify-center">
            
            <Trustpilot />
          </div> */}
        </form>
      </Form>
    </div>
  )
}

export default Step1
