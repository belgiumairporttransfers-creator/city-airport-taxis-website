"use client";

import React from "react";
import { User, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface RideItem {
  _id: string;
  bookingNumber: string;
  pickupDate?: string;
  pickupTime?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  amount: number;
  status: string;
}

const NextRides = ({ rides = [] }: { rides?: RideItem[] }) => {
  const t = useTranslations("dashboard.next_rides");

  return (
    <div className="bg-white border border-border rounded-md p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">{t("title")}</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary transition-colors">
          {t("view_all")} <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {rides.length === 0 ? (
          <div className="rounded-md border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
            {t("no_rides")}
          </div>
        ) : (
        rides.map((ride, index) => (
          <div
            key={`ride-${index}`}
            className="border border-border/60 rounded-md p-4 space-y-4 hover:border-primary/20 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                  {ride.bookingNumber}
                </span>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span>{ride.pickupDate || "—"}</span>
                  <span className="text-slate-400 font-normal">{ride.pickupTime || "—"}</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider">
                {ride.status}
              </span>
            </div>

            <div className="space-y-4 relative pl-8">
              <div className="absolute left-[7px] top-[10px] bottom-[10px] w-0.5 border-l-2 border-dashed border-slate-200"></div>
              
              <div className="flex items-center gap-3 relative">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center z-10 -ml-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                </div>
                <span className="text-sm font-medium text-slate-700">{ride.pickupAddress || "—"}</span>
              </div>
              
              <div className="flex items-center gap-3 relative">
                <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center z-10 -ml-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                </div>
                <span className="text-sm font-medium text-slate-700">{ride.dropoffAddress || "—"}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 flex justify-between items-center">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <User className="w-4 h-4" />
                <span className="font-medium">{t("order", { number: ride.bookingNumber || "N/A" })}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-slate-900">{formatPrice(Number(ride.amount))}</span>
              </div>
            </div>
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default NextRides;
