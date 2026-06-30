"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type RouteAddress = {
  name: string;
  detail?: string;
};

type TripRouteDetailsProps = {
  pickup: RouteAddress;
  delivery: RouteAddress;
  stops?: RouteAddress[];
  isHourly?: boolean;
  tripType?: string;
  categoryLabel?: string;
  categoryValue?: string;
  pickupTime?: string;
  deliveryTime?: string;
  estDistance?: string | null;
  estDuration?: string | null;
  showAnimation?: boolean;
  showTripMeta?: boolean;
  className?: string;
};

export default function TripRouteDetails({
  pickup,
  delivery,
  stops = [],
  isHourly = false,
  tripType,
  categoryLabel,
  categoryValue,
  pickupTime,
  deliveryTime,
  estDistance,
  estDuration,
  showAnimation = true,
  showTripMeta = false,
  className,
}: TripRouteDetailsProps) {
  const showPickupTime = Boolean(pickupTime?.trim());
  const showDeliveryTime = Boolean(deliveryTime?.trim());

  return (
    <div className={cn("relative", isHourly ? "pl-0" : "pl-9", className)}>
      {showTripMeta ? (
        <div className={cn("mb-4 space-y-1.5", !isHourly && "-ml-9")}>
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-800 font-semibold">Trip</span>
            <span className="text-sm font-semibold text-gray-500">{tripType || "—"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-800 font-semibold">
              {categoryLabel || (isHourly ? "Duration" : "Outward")}
            </span>
            <span className="text-sm font-semibold text-gray-500 text-right">{categoryValue || "—"}</span>
          </div>
        </div>
      ) : null}

      {!isHourly && (
        <div
          className={cn(
            "absolute left-[14px] bottom-[25px] w-[4px] bg-gray-200 overflow-visible z-0",
            showTripMeta ? "top-[78px]" : "top-[24px]"
          )}
        >
          {showAnimation ? (
            <div
              className="absolute left-[7px] -translate-x-1/2 z-10 h-2.5 w-2.5 rounded-full bg-secondary"
              style={{ animation: "tripRouteMoveDown 3.5s linear infinite" }}
            />
          ) : null}
        </div>
      )}

      <div className={cn("relative", !isHourly && "mb-5")}>
        {isHourly ? (
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base">
                {pickup.name || "Pickup location"}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {pickup.detail || "Full address not specified"}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute -left-[30px] top-[6px] h-5 w-5 rounded-full border-[4.5px] border-primary bg-white z-10" />
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base truncate">
                  {pickup.name || "Pickup location"}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed truncate">
                  {pickup.detail || "Full address not specified"}
                </p>
                {(estDistance || estDuration) && (
                  <div className="flex items-center gap-2 mt-2">
                    {estDuration && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-gray-50 text-[10px] font-bold text-gray-500 border border-gray-200 shadow-sm lowercase">
                        ~ {estDuration}
                      </span>
                    )}
                    {estDistance && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-gray-50 text-[10px] font-bold text-gray-500 border border-gray-200 shadow-sm">
                        ~ {estDistance}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span className="whitespace-nowrap pt-1 text-sm font-semibold text-gray-500">
                {showPickupTime ? pickupTime : "—"}
              </span>
            </div>
          </>
        )}
      </div>

      {!isHourly &&
        stops.map((stop, idx) => (
          <div key={`${stop.name}-${idx}`} className="relative mb-5">
            <div className="absolute -left-[25px] top-[8px] h-2.5 w-2.5 rounded-full bg-gray-300 border-[1.5px] border-white z-10" />
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base truncate">
                  {stop.name || `Stop ${idx + 1}`}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500 leading-relaxed truncate">{stop.detail || ""}</p>
              </div>
            </div>
          </div>
        ))}

      {isHourly &&
        stops.map((stop, idx) => (
          <div key={`${stop.name}-${idx}`} className="mt-6 flex items-start gap-4 border-t border-gray-100 pt-6">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold leading-tight text-gray-800 sm:text-base">
                {stop.name || `Stop ${idx + 1}`}
              </h3>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">{stop.detail || ""}</p>
            </div>
          </div>
        ))}

      {!isHourly && (
        <div className="relative">
          <div className="absolute -left-[31px] top-[2px] z-10">
            <MapPin className="h-6 w-6 text-primary" strokeWidth={2.5} />
          </div>
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base truncate">
                {delivery.name || "Delivery location"}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed truncate">
                {delivery.detail || "Full address not specified"}
              </p>
            </div>
            <span className="whitespace-nowrap pt-1 text-sm font-semibold text-gray-500">
              {showDeliveryTime ? deliveryTime : "—"}
            </span>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes tripRouteMoveDown {
              0% { top: 0%; opacity: 0; transform: translateX(-50%) scale(0.6); }
              10% { opacity: 1; transform: translateX(-50%) scale(1); }
              90% { opacity: 1; transform: translateX(-50%) scale(1); }
              100% { top: 100%; opacity: 0; transform: translateX(-50%) scale(0.6); }
            }
          `,
        }}
      />
    </div>
  );
}
