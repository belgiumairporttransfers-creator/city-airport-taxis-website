'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { useRouter } from '@/i18n/routing'
import { useBookingStore, BookingCategory } from '@/store/use-booking-store'
import CategoryTabs from '@/components/features/booking/setp-1/category-tabs'
import { AddReturnButton } from '@/components/features/booking/setp-1/AddReturnButton'
import {
  calculateArrivalTime,
  getHourlyDurationSelectOptions,
  isAirportAddress,
  validateBookingTime,
} from '@/lib/utils'
import { useCalculateRouteDistance } from '@/hooks/queries/use-calculate-distance'
import { Form } from '@/components/features/form/form'
import { Input } from '@/components/features/form/Input'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { usePublicSettings } from '@/hooks/queries/use-settings'
import { useHourlyDurations } from '@/hooks/queries/use-hourly-durations'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

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

interface BookTransferModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookTransferModal({ isOpen, onClose }: BookTransferModalProps) {
  const t = useTranslations('common.booking_form')
  const tDashboard = useTranslations('dashboard.quick_actions')
  const router = useRouter()
  const calculateRoute = useCalculateRouteDistance()

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

  const { data: hourlyDurations } = useHourlyDurations(isOpen && isHourly)
  const durationOptions = React.useMemo(
    () => getHourlyDurationSelectOptions(hourlyDurations?.items),
    [hourlyDurations?.items]
  )

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

  React.useEffect(() => {
    if (!isOpen) return
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
  }, [isOpen, form])

  const handleAddReturn = () => {
    setCategory('return-trip')
  }

  const handleRemoveReturn = () => {
    setCategory('one-way')
    form.setValue('returnDate', '')
    form.setValue('returnTime', '')
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
        airportPickup: settings.airportPickup,
      })

      onClose()
      router.push('/book-ride/select-vehicle')
    } catch {
      toast.error(t('messages.general_error'))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] p-0 border-none bg-transparent shadow-none [&>button]:hidden"
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement
          if (target?.closest('.pac-container')) {
            e.preventDefault()
          }
        }}
        onPointerDownOutside={(e) => {
          const target = e.target as HTMLElement
          if (target?.closest('.pac-container')) {
            e.preventDefault()
          }
        }}
      >
        <div className="flex w-full flex-col rounded-xl bg-white shadow-2xl">
          <div className="relative border-b border-gray-100 p-5">
            <div className="flex items-center justify-between gap-3">
              <DialogHeader className="p-0">
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {tDashboard('book_transfer.title')}
                </DialogTitle>
              </DialogHeader>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-gray-400 transition-colors hover:text-gray-900"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {tDashboard('book_transfer.subtitle')}
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-stretch gap-2 p-4 sm:p-5"
            >
              <CategoryTabs activeTab={category} onTabChange={handleTabChange} />

              <div className="relative flex-1 space-y-2">
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
                    selectOptions={durationOptions}
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
                          minSelectableDate={
                            form.watch('pickupDate')
                              ? new Date(form.watch('pickupDate'))
                              : null
                          }
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
                className="rounded-md bg-primary py-6"
                loading={isLoading || calculateRoute.isPending}
              >
                <Search className="mr-2 h-5 w-5" aria-hidden />
                {t('buttons.see_prices')}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
