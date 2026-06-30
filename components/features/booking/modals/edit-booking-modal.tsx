'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader2, LocateFixed, MapPinIcon, Clock, X } from 'lucide-react'
import { useBookingStore } from '@/store/use-booking-store'
import {
  getCurrentLocationErrorMessage,
  isAirportAddress,
  isGeolocationError,
  resolvePickupAddressFromCurrentLocation,
  swapPickupAndDelivery,
  calculateArrivalTime,
} from '@/lib/utils'
import { useCalculateRouteDistance } from '@/hooks/queries/use-calculate-distance'
import { SwapButton } from '../setp-1/SwapButton'
import { Form } from '@/components/features/form/form'
import { Input } from '@/components/features/form/Input'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { usePublicSettings } from '@/hooks/queries/use-settings'

interface HeroFormValues {
  pickupAddress: string
  deliveryAddress: string
  duration: string
  pickupDate: string
  pickupTime: string
}

interface EditBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditBookingModal({ isOpen, onClose }: EditBookingModalProps) {
  const t = useTranslations('common.booking_form')
  const router = useRouter()
  const calculateRoute = useCalculateRouteDistance()
  const [isSwapping, setIsSwapping] = React.useState(false)
  const [isLocating, setIsLocating] = React.useState(false)

  const {
    category,
    setStep1Data,
    setRouteData,
    setBookingSettings,
    step1,
    routeData,
  } = useBookingStore()

  const { data: settings } = usePublicSettings()
  const isOneWay = category === 'one-way' || category === 'return-trip'
  const isHourly = category === 'hourly'

  const form = useForm<HeroFormValues>({
    defaultValues: {
      pickupAddress: step1?.pickupAddress || '',
      deliveryAddress: step1?.deliveryAddress || '',
      duration: routeData?.duration ? JSON.stringify(routeData.duration) : '',
      pickupDate: step1?.pickupDate || '',
      pickupTime: step1?.pickupTime || '',
    },
  })

  // Sync form with store when modal opens
  React.useEffect(() => {
    if (isOpen && step1) {
      form.reset({
        pickupAddress: step1.pickupAddress,
        deliveryAddress: step1.deliveryAddress || '',
        duration: routeData?.duration ? JSON.stringify(routeData.duration) : '',
        pickupDate: step1.pickupDate,
        pickupTime: step1.pickupTime,
      })
    }
  }, [isOpen, step1, routeData, form])

  const handleSwapLocations = () => {
    setIsSwapping(true)
    swapPickupAndDelivery({
      getValues: form.getValues,
      setValue: form.setValue,
    })
    window.setTimeout(() => setIsSwapping(false), 300)
  }

  const handleUseCurrentLocation = () => {
    if (isLocating) return
    setIsLocating(true)
    resolvePickupAddressFromCurrentLocation()
      .then((resolvedAddress) => {
        form.setValue('pickupAddress', resolvedAddress, {
          shouldDirty: true,
          shouldValidate: true,
        })
        toast.success(t('messages.location_updated'))
      })
      .catch((error: unknown) => {
        if (isGeolocationError(error)) {
          toast.error(getCurrentLocationErrorMessage(error))
          return
        }
        toast.error(t('messages.location_error'))
      })
      .finally(() => {
        setIsLocating(false)
      })
  }

  const onSubmit = async (data: HeroFormValues) => {
    try {
      const pickupAddress = data.pickupAddress.trim()
      const deliveryAddress = data.deliveryAddress.trim()

      const addresses: string[] = [pickupAddress]
      if ((category === 'one-way' || category === 'return-trip') && deliveryAddress) {
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
        passengers: step1?.passengers ?? 1,
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
          category === 'hourly' && data.duration
            ? JSON.parse(data.duration)
            : undefined,
      })

      if (settings) {
        setBookingSettings({
          stopFee: settings.stopFee,
          airportPickup: settings.airportPickup,
        })
      }
      
      router.push("/book-ride/select-vehicle")
      toast.success("Trip updated successfully")
      onClose()
    } catch (err) {
      toast.error(t('messages.general_error'))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent shadow-none [&>button]:hidden"
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target?.closest('.pac-container')) {
            e.preventDefault();
          }
        }}
        onPointerDownOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target?.closest('.pac-container')) {
            e.preventDefault();
          }
        }}
      >
        <div className='flex flex-col w-full bg-white rounded-xl overflow-hidden shadow-2xl'>
          <div className='relative p-5 border-b border-gray-100'>
             <div className="flex items-center justify-between">
                <DialogHeader className="p-0">
                  <DialogTitle className="text-lg font-bold text-gray-900">Edit Your Trip</DialogTitle>
                </DialogHeader>
                <button 
                  onClick={onClose} 
                  className="p-1 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>
             </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='px-6 py-6 bg-white flex flex-col items-stretch gap-4'
            >
              <div className='relative mb-2 md:mb-0 space-y-4 flex-1'>
                <div className='absolute left-[8px] top-[36px] bottom-[20px] w-1 bg-border' />

                <div className='flex items-center gap-1'>
                  <div className='w-5 h-5 rounded-full border-4 border-black bg-white z-10 flex-shrink-0' />
                  <div className='flex items-end gap-1 flex-1'>
                    <Input
                      name='pickupAddress'
                      type='location'
                      placeholder={t('placeholders.pickup')}
                      className='flex-1'
                      required
                    />
                    <button
                      type='button'
                      onClick={handleUseCurrentLocation}
                      disabled={isLocating || calculateRoute.isPending}
                      className='h-[46px] w-[46px] inline-flex items-center justify-center rounded-sm border border-border cursor-pointer bg-white text-secondary hover:bg-gray-50 transition-colors disabled:opacity-50'
                    >
                      {isLocating ? <Loader2 className='w-4 h-4 animate-spin' /> : <LocateFixed className='w-5 h-5' />}
                    </button>
                  </div>
                </div>

                {!isHourly && isOneWay && (
                  <div className='flex justify-end'>
                    <SwapButton
                      onSwap={handleSwapLocations}
                      isSwapping={isSwapping}
                      className='self-center'
                    />
                  </div>
                )}

                {(category === 'one-way' || category === 'return-trip') && (
                  <div className='flex items-center gap-1'>
                    <MapPinIcon className='w-5 h-5 text-black z-10 flex-shrink-0' />
                    <Input
                      name='deliveryAddress'
                      type='location'
                      placeholder={t('placeholders.dropoff')}
                      className='flex-1'
                      required
                    />
                  </div>
                )}

                {category === 'hourly' && (
                  <div className='flex items-center gap-1'>
                    <Clock className='w-5 h-5 text-black z-10 flex-shrink-0' />
                    <Input
                      name='duration'
                      type='select'
                      placeholder={t('placeholders.duration')}
                      className='flex-1'
                      selectOptions={[]}
                      required
                    />
                  </div>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <div className='flex-1'>
                  <Input
                    name='pickupDate'
                    type='date'
                    placeholder={t('placeholders.date')}
                    required
                  />
                </div>
                <div className='flex-1'>
                  <Input
                    name='pickupTime'
                    type='time'
                    placeholder={t('placeholders.time')}
                    required
                  />
                </div>
              </div>
              <Button
                type='submit'
                className='bg-black h-12 text-base'
                loading={calculateRoute.isPending}
              >
                Update Ride Details
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
