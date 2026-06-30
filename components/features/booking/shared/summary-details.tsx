"use client";

import { useMemo, useState } from "react";
import { useBookingStore, useTotalPrice } from "@/store/use-booking-store";
import TripRouteDetails from "./trip-route-details";
import { parseAddress, formatDate, formatPrice, formatDistance, formatDuration } from "@/lib/utils";
import { Check, CheckCircle2, Plane, UserCircle, Users, Luggage, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PaymentMethods from "@/components/shared/payment-methods";
import { IMAGES } from "@/constants/image-constants";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { EditBookingModal } from "../modals/edit-booking-modal";
import { useHasHydrated } from "@/hooks/use-has-hydrated";

const FeatureTag = ({ label, variant, icon }: { label: string; variant?: "success"; icon: React.ReactNode }) => (
  <div className={cn(
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-colors",
    variant === "success"
      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
      : "bg-gray-50 text-gray-700 border-gray-200"
  )}>
    {icon}
    {label}
  </div>
);

function SummaryDetails() {
  const hasHydrated = useHasHydrated();
  const t = useTranslations('booking.shared.summary');
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { category, step1, routeData, step2 } = useBookingStore();
  const totalPrice = useTotalPrice();
  const isHourly = category === "hourly";
  const pickup = useMemo(() => parseAddress(step1?.pickupAddress || ""), [step1?.pickupAddress]);
  const delivery = useMemo(() => parseAddress(step1?.deliveryAddress || ""), [step1?.deliveryAddress]);

  const pickupDate = (step1?.pickupDate || "").trim();
  const pickupTime = (step1?.pickupTime || "").trim();
  const hasPickupTime = Boolean(pickupTime);
  const formattedPickupDate = useMemo(() => formatDate(pickupDate), [pickupDate]);

  const deliveryTime = routeData?.estTime;

  const tripTypeLabel =
    category === "hourly"
      ? t("hourly")
      : category === "return-trip"
        ? t("return")
        : t("one_way");

  const outwardValue = isHourly
    ? formatDuration(routeData?.duration, routeData?.durationMinutes) || "—"
    : formattedPickupDate;

  const estDistance = useMemo(() => formatDistance(routeData?.distance), [routeData?.distance]);
  const estDuration = useMemo(
    () => formatDuration(routeData?.duration, routeData?.durationMinutes) || null,
    [routeData?.duration, routeData?.durationMinutes]
  );

  if (!hasHydrated) return null;

  return (
    <>
      <div className="mx-auto w-full rounded-none lg:rounded-lg border border-border p-4 sm:p-5 shadow-sm mt-2 bg-white">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">{t('title')}</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-black transition-colors"
              aria-label="Edit Booking"
            >
              <Pencil className="h-4 w-4" />
              <span>{t('edit')}</span>
            </button>
          </div>

          <div className="">
            <TripRouteDetails
              pickup={pickup}
              delivery={delivery}
              stops={[]}
              isHourly={isHourly}
              showTripMeta
              tripType={tripTypeLabel}
              categoryLabel={isHourly ? t("duration") : category === "return-trip" ? t("return") : t("outward")}
              categoryValue={outwardValue}
              pickupTime={hasPickupTime ? pickupTime : undefined}
              deliveryTime={hasPickupTime ? deliveryTime : undefined}
              estDistance={estDistance}
              estDuration={estDuration}
            />
          </div>

          {step2 && (
            <div className="space-y-3 py-2 border-y border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">{t('your_choice')}</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-12 flex-shrink-0">
                  {step2.category.image ? (
                    <Image
                      src={step2.category.image}
                      alt={step2.category.name}
                      fill
                      className="object-contain"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-lg truncate leading-none mb-1">{step2.category.name}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <p className="text-sm text-gray-500"> {t('up_to')} </p>
                      <Users className="text-gray-400 h-4 w-4" />
                      <span className="text-sm text-gray-500">{step2.passengers} {t('passengers')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                      <Luggage className="text-gray-400 h-4 w-4" />
                      <span className="text-sm text-gray-500">{step2.luggage} {t('suitcases')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">{t('price_details')}</h3>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium text-lg leading-none">{t('total')}</span>
              <span className="text-2xl font-bold text-gray-900 leading-none">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <FeatureTag label={t("free_cancellation")} variant="success" icon={<CheckCircle2 className="h-4 w-4" />} />
            <FeatureTag label={t("door_to_door")} icon={<Check className="h-4 w-4" />} />
            <FeatureTag label={t("flight_tracking")} icon={<Plane className="h-4 w-4" />} />
            <FeatureTag label={t("licensed_chauffeurs")} icon={<UserCircle className="h-4 w-4" />} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <PaymentMethods image={IMAGES.PAYMENT_METHODS} />
      </div>

      <EditBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default SummaryDetails;