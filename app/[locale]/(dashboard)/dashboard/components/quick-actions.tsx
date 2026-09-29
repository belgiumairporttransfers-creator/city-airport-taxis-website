"use client";

import React, { useState } from "react";
import { Car, CreditCard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { BookTransferModal } from "@/components/features/booking/modals/book-transfer-modal";

const QuickActions = () => {
  const t = useTranslations("dashboard.quick_actions");
  const router = useRouter();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const actions = [
    {
      id: "book",
      title: t("book_transfer.title"),
      subTitle: t("book_transfer.subtitle"),
      icon: <Car className="h-5 w-5 text-white" />,
      bg: "bg-secondary shadow-[0_4px_12px_rgba(249,178,51,0.3)]",
    },
    {
      id: "payments",
      title: t("payments.title"),
      subTitle: t("payments.subtitle"),
      icon: <CreditCard className="h-5 w-5 text-white" />,
      bg: "bg-primary shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
      href: "/payments",
    },
    {
      id: "settings",
      title: t("settings.title"),
      subTitle: t("settings.subtitle"),
      icon: <Settings className="h-5 w-5 text-white" />,
      bg: "bg-primary shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
      href: "/profile",
    },
  ];

  const handleAction = (item: (typeof actions)[0]) => {
    if (item.id === "book") {
      setIsBookModalOpen(true);
      return;
    }
    if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleAction(item)}
            className="group flex cursor-pointer items-center gap-4 rounded-md border border-border bg-white p-4 text-left shadow-sm transition-all hover:border-secondary/50"
          >
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-md transition-transform group-hover:scale-105",
                item.bg
              )}
            >
              {item.icon}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-primary">
                {item.title}
              </h3>
              <p className="mt-0.5 truncate text-sm text-primary/70">
                {item.subTitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      <BookTransferModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  );
};

export default QuickActions;
