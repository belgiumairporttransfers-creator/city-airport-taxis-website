"use client";

import { BarChart3, FileText, CheckCircle2, TrendingUp } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface StatsProps {
  stats?: {
    totalRides: number;
    completedRides: number;
    upcomingRides: number;
    nextRideDate?: string;
    lastRideDate?: string;
  };
}

const Stats = ({ stats }: StatsProps) => {
  const t = useTranslations("dashboard.stats");

  const cards = [
    {
      text: t("total_rides.label"),
      total: String(stats?.totalRides ?? 0),
      trend: t("total_rides.trend"),
      icon: <FileText className="w-5 h-5 text-warning" />,
      color: "warning",
      bg: "bg-warning/10",
    },
    {
      text: t("completed_rides.label"),
      total: String(stats?.completedRides ?? 0),
      trend: t("completed_rides.trend"),
      icon: <CheckCircle2 className="w-5 h-5 text-success" />,
      color: "success",
      bg: "bg-success/10",
    },
    {
      text: t("upcoming_rides.label"),
      total: String(stats?.upcomingRides ?? 0),
      trend: t("upcoming_rides.trend", {
        date: stats?.nextRideDate ? formatDate(stats.nextRideDate) : t("empty_date"),
      }),
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      color: "info",
      bg: "bg-blue-50",
    },
  ];

  return (
    <>
      {cards.map((item, index) => (
        <div
          key={`reports-state-${index}`}
          className="flex flex-col justify-between p-6 rounded-md bg-white border border-border shadow-sm relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="text-base font-semibold capitalize">
              {item.text}
            </span>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", item.bg)}>
              {item.icon}
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary">
              {item.total}
            </div>
            <div className={cn("flex items-center gap-1.5 text-base mt-2 font-medium", {
              "text-warning": item.color === "warning",
              "text-success": item.color === "success",
              "text-slate-500": item.color === "info",
            })}>
              {item.color !== "info" && <TrendingUp className="w-3.5 h-3.5" />}
              <span>{item.trend}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Stats;
