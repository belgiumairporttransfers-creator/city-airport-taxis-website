'use client'

import React, { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useBookingStatus } from "@/hooks/queries/use-booking"
import {
  isBookingPaymentFailed,
  isBookingPaymentSuccess,
  type BookingStatusResponse,
} from "@/lib/api/bookings"
import { formatPrice, parseAddress, formatDate, formatDistance, cn } from "@/lib/utils"
import { PaymentSuccessSkeleton } from "@/components/features/skeletons/payment-success-skeleton"
import { useTranslations } from "next-intl"

import { Check, WalletCards, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TripRouteDetails from "@/components/features/booking/shared/trip-route-details"

const InfoItem = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
  <div className="rounded-md bg-gray-50 px-3 py-2">
    <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
    <p className="mt-1 text-sm font-semibold text-foreground">{value || "—"}</p>
  </div>
)

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const t = useTranslations('booking.payment_success')
  const bookingId =
    searchParams.get("bookingId") ||
    searchParams.get("booking_id") ||
    undefined
  const { data: booking, isLoading, isError, error } = useBookingStatus(bookingId)

  if (!bookingId) {
    return (
      <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-60 px-4 pb-8">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-background p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">Booking not found</h1>
          <p className="mt-2 text-sm text-muted">We could not find your booking reference.</p>
          <Button asChild className="mt-6">
            <Link href="/book-ride">Return to booking</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading && !booking) {
    return <PaymentSuccessSkeleton />
  }

  if (isError && !booking) {
    const message =
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : "Unable to load your booking right now."

    return (
      <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-60 px-4 pb-8">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-background p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{message}</p>
          <Button asChild className="mt-6">
            <Link href="/book-ride">Return to booking</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-60 px-4 pb-8">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-background p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-foreground">Booking not found</h1>
          <p className="mt-2 text-sm text-muted">We could not find this booking.</p>
          <Button asChild className="mt-6">
            <Link href="/book-ride">Return to booking</Link>
          </Button>
        </div>
      </div>
    )
  }

  const isConfirmed = isBookingPaymentSuccess(booking)
  const isFailed = isBookingPaymentFailed(booking)

  if (!isConfirmed && !isFailed) {
    return <PaymentSuccessSkeleton />
  }

  if (isFailed) {
    return (
      <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-60 px-4 pb-8">
        <div className="mx-auto max-w-xl rounded-xl border border-border bg-background p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <XCircle className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t("payment_failed_title")}</h1>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">{t("payment_failed_message")}</p>
          {booking.bookingNumber && (
            <p className="mt-4 text-sm font-semibold text-foreground">
              {t("confirmation_number")}: {booking.bookingNumber}
            </p>
          )}
          <Button asChild className="mt-6">
            <Link href="/book-ride">Return to booking</Link>
          </Button>
        </div>
      </div>
    )
  }

  return <PaymentSuccessDetails booking={booking} t={t} />
}

function PaymentSuccessDetails({
  booking,
  t,
}: {
  booking: BookingStatusResponse
  t: ReturnType<typeof useTranslations>
}) {
  const tripDetails = booking.tripDetails ?? {}
  const pickup = parseAddress(tripDetails.pickupAddress)
  const delivery = parseAddress(tripDetails.deliveryAddress)
  const routeStops = (tripDetails.stops ?? [])
    .filter((stop) => Boolean(stop.address?.trim()))
    .map((stop) => parseAddress(stop.address))

  const tripType =
    booking.category === "hourly"
      ? t("hourly")
      : booking.category === "return-trip"
        ? t("return")
        : t("one_way")

  const outwardValue = formatDate(tripDetails.pickupDate)
  const passengerName = booking.passengerDetails
    ? `${booking.passengerDetails.firstName} ${booking.passengerDetails.lastName}`.trim()
    : "Guest"
  const passengerEmail = booking.passengerDetails?.email || "N/A"
  const passengerPhone = booking.passengerDetails?.phone || "N/A"
  const bookingNumber = booking.bookingNumber || booking._id || "N/A"
  const pricing = booking.pricingBreakdown
  const vehicleFare = pricing?.vehicleFare ?? pricing?.subtotal ?? booking.amount ?? 0
  const airportPickupFee =
    pricing?.airportPickupFee ?? pricing?.extras?.airportPickup?.total ?? 0
  const totalPaid = pricing?.total ?? booking.amount ?? vehicleFare + airportPickupFee
  const hasAirportPickup =
    Boolean(tripDetails.airportPickup) ||
    Boolean(tripDetails.flightNumber) ||
    airportPickupFee > 0
  const displayAirportFee =
    airportPickupFee > 0
      ? airportPickupFee
      : totalPaid > vehicleFare
        ? Math.max(0, totalPaid - vehicleFare)
        : 0
  const vehicleName = booking.vehicle?.name || "Luxury Fleet"
  const vehiclePassengers = booking.vehicle?.passengers ?? "—"
  const vehicleSuitcases = booking.vehicle?.suitcases ?? "—"
  const vehicleClass = booking.vehicle?.carType || "Standard"
  const vehicleImage = booking.vehicle?.image?.trim() || undefined
  const childSeats = [...(tripDetails.childSeats ?? []), ...(tripDetails.returnChildSeats ?? [])]
  const priceLines = [
    {
      key: "vehicle-fare",
      label: t("base_fare"),
      value: formatPrice(vehicleFare),
    },
    ...(hasAirportPickup || displayAirportFee > 0
      ? [
          {
            key: "airport-pickup",
            label: t("airport_pickup"),
            value: displayAirportFee > 0 ? formatPrice(displayAirportFee) : t("included"),
          },
        ]
      : []),
    ...childSeats.map((seat, index) => ({
      key: `child-seat-${index}`,
      label: `${seat.seatId?.name || "Child Seat"} x${seat.quantity ?? 1}`,
      value: t("included"),
    })),
  ]

  const TripSection = () => (
    <>
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{t("trip_details")}</h2>
      <TripRouteDetails
        className="mt-4"
        pickup={pickup}
        delivery={delivery}
        stops={routeStops}
        pickupTime={tripDetails.pickupTime}
        deliveryTime={tripDetails.deliveryTime}
        showTripMeta
        tripType={tripType}
        categoryLabel={t("outward")}
        categoryValue={outwardValue}
        estDistance={formatDistance(tripDetails.distance)}
      />

      {booking.category === "return-trip" && tripDetails.returnDate && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">
            {t("return")} {t("trip_details")}
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <InfoItem label="Return Date" value={formatDate(tripDetails.returnDate)} />
            <InfoItem label="Return Time" value={tripDetails.returnTime ?? "—"} />
          </div>
          <TripRouteDetails
            pickup={delivery}
            delivery={pickup}
            pickupTime={tripDetails.returnTime}
            showAnimation={false}
          />
        </div>
      )}

      {(tripDetails.notes || tripDetails.returnNotes || tripDetails.flightNumber || tripDetails.trainNumber) && (
        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Special Instructions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tripDetails.flightNumber ? (
              <InfoItem label="Flight Number" value={tripDetails.flightNumber} />
            ) : null}
            {tripDetails.trainNumber ? (
              <InfoItem label="Train Number" value={tripDetails.trainNumber} />
            ) : null}
          </div>
          {tripDetails.notes ? (
            <div className="rounded-md bg-gray-50 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wide text-muted">Outward Notes</p>
              <p className="mt-1 text-sm text-foreground">{tripDetails.notes}</p>
            </div>
          ) : null}
          {tripDetails.returnNotes ? (
            <div className="rounded-md bg-secondary/5 px-3 py-2 border border-secondary/10">
              <p className="text-[11px] uppercase tracking-wide text-secondary/60">Return Notes</p>
              <p className="mt-1 text-sm text-foreground">{tripDetails.returnNotes}</p>
            </div>
          ) : null}
        </div>
      )}
    </>
  )

  const VehicleSection = () => (
    <>
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{t("vehicle_details")}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
        <div className="overflow-hidden rounded-lg border border-border bg-gray-100 p-2">
          {vehicleImage ? (
            <img
              src={vehicleImage}
              alt={vehicleName}
              className="h-36 sm:h-40 w-full object-contain md:h-full"
            />
          ) : (
            <div className="flex h-36 sm:h-40 w-full items-center justify-center md:h-full">
              <p className="text-sm font-medium text-muted">{vehicleName}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoItem label={t("vehicle_type")} value={vehicleName} />
          <InfoItem label={t("car_class")} value={vehicleClass} />
          <div className="sm:col-span-2">
            <InfoItem
              label={t("capacity")}
              value={t("capacity_text", { passengers: vehiclePassengers, bags: vehicleSuitcases })}
            />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="bg-gray-50 pt-28 sm:pt-24 md:pt-40 lg:pt-60 px-3 sm:px-4 pb-6 sm:pb-8">
      <div className="mx-auto w-full container grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr] px-4">
        <div className="space-y-4 sm:space-y-5">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-md mx-auto lg:mx-0">
            <Check className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.6} />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {booking.isBookingForSomeoneElse
                ? t("booking_confirmed")
                : t("thank_you", { name: booking.passengerDetails?.firstName || "Guest" })}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
              {t("confirmation_message", {
                for_someone: booking.isBookingForSomeoneElse
                  ? t("for_someone", { name: passengerName })
                  : "",
                email: passengerEmail,
              })}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background px-4 py-3 sm:px-5 sm:py-4 shadow-sm text-center lg:text-left">
            <p className="text-[11px] uppercase tracking-wide text-muted">
              {t("confirmation_number")}
            </p>
            <p className="mt-1 text-lg sm:text-xl font-semibold text-foreground">{bookingNumber}</p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 sm:p-5 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">Passenger Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoItem label="Name" value={passengerName} />
              <InfoItem label="Phone" value={passengerPhone} />
              <InfoItem label="Email" value={passengerEmail} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4 sm:p-5 shadow-sm lg:hidden">
            <TripSection />
          </div>

          <div className="rounded-xl border border-border bg-background p-4 sm:p-5 shadow-sm lg:hidden">
            <VehicleSection />
          </div>

          <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
            <div className="bg-gray-50/80 border-b border-border px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <WalletCards className="h-5 w-5 text-secondary" />
                {t("payment_summary")}
              </h2>
              <div
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                  booking.paymentStatus === "paid"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                    : "bg-amber-50 text-amber-600 border-amber-200"
                )}
              >
                {booking.paymentStatus || "pending"}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-3">
                {priceLines.map((line) => (
                  <div key={line.key} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-gray-600">{line.label}</span>
                    <span className="font-semibold text-foreground">{line.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-dashed border-border-200">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-base font-bold text-muted uppercase tracking-widest mb-1">{t("total_paid")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-secondary leading-none">
                      {formatPrice(totalPaid)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="hidden rounded-xl border border-border bg-background p-5 shadow-sm lg:block">
            <TripSection />
          </div>

          <div className="hidden rounded-xl border border-border bg-background p-5 shadow-sm lg:block">
            <VehicleSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<PaymentSuccessSkeleton />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
