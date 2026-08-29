"use client";

import { CreditCard, Banknote } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export type WebsitePaymentMethod = "mollie" | "pay_onboard";

const OPTIONS: Array<{
  value: WebsitePaymentMethod;
  labelKey: "payment_method_online" | "payment_method_onboard";
  icon: typeof CreditCard;
}> = [
  {
    value: "mollie",
    labelKey: "payment_method_online",
    icon: CreditCard,
  },
  {
    value: "pay_onboard",
    labelKey: "payment_method_onboard",
    icon: Banknote,
  },
];

export function PaymentMethodField() {
  const t = useTranslations("booking.passenger_details.step3");
  const { setValue, control } = useFormContext();
  const selected = useWatch({ control, name: "paymentMethod" }) as WebsitePaymentMethod;

  return (
    <div className="mt-5">
      <h3 className="text-base font-semibold text-gray-900 tracking-tight px-1 mb-3">
        {t("payment_method_heading")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setValue("paymentMethod", option.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all cursor-pointer",
                isSelected
                  ? "border-foreground bg-white shadow-sm"
                  : "border-border bg-white hover:border-gray-300"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  isSelected ? "border-foreground" : "border-gray-300"
                )}
              >
                {isSelected ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground" />
                ) : null}
              </span>
              <Icon className="h-5 w-5 shrink-0 text-gray-700" strokeWidth={1.75} />
              <span className="text-sm font-medium text-gray-900">{t(option.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
