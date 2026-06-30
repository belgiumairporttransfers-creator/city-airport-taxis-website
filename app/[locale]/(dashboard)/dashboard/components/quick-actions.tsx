"use client";

import React, { useState } from "react";
import { Car, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { EditBookingModal } from "@/components/features/booking/modals/edit-booking-modal";

const QuickActions = () => {
  const t = useTranslations("dashboard.quick_actions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const actions = [
    {
      id: "book",
      title: t("book_transfer.title"),
      subTitle: t("book_transfer.subtitle"),
      icon: <Car className="w-5 h-5 text-white" />,
      bg: "bg-secondary shadow-[0_4px_12px_rgba(249,178,51,0.3)]",
    },
    {
      id: "statements",
      title: t("statements.title"),
      subTitle: t("statements.subtitle"),
      icon: <FileText className="w-5 h-5 text-white" />,
      bg: "bg-primary shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
      href: "/statements",
    },
    {
      id: "settings",
      title: t("settings.title"),
      subTitle: t("settings.subtitle"),
      icon: <Settings className="w-5 h-5 text-white" />,
      bg: "bg-primary shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
      href: "/profile",
    },
  ];

  const handleAction = (item: typeof actions[0]) => {
    if (item.id === "book") {
      setIsModalOpen(true);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {actions.map((item, index) => (
          <div
            key={`quick-action-${index}`}
            onClick={() => handleAction(item)}
            className="flex items-center gap-4 p-4 bg-white border border-border shadow-sm rounded-md cursor-pointer hover:border-secondary/50 transition-all group"
          >
            <div
              className={cn(
                "w-12 h-12 shrink-0 rounded-md flex items-center justify-center transition-transform group-hover:scale-105",
                item.bg
              )}
            >
              {item.icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-primary truncate">
                {item.title}
              </h3>
              <p className="text-sm text-primary/70 truncate mt-0.5">
                {item.subTitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <EditBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default QuickActions;
