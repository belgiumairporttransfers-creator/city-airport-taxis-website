"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import RevinueChart from "./components/revinue-chart";
import Stats from "./components/stats";
import QuickActions from "./components/quick-actions";
import NextRides from "./components/next-rides";
import ActivityOverview from "./components/activity-overview";
import { useAuthMe } from "@/hooks/queries/use-auth";
import { useUserDashboardOverview } from "@/hooks/queries/use-user-dashboard";
import { formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";

const DashboardPageView = () => {
    const t = useTranslations("dashboard");
    const [months, setMonths] = React.useState<3 | 6 | 12>(6);
    const { data: meData, isLoading } = useAuthMe();
    const { data: overviewResponse } = useUserDashboardOverview(months);

    const account = meData?.data?.account;
    const overview = overviewResponse as Record<string, unknown> | undefined;
    const stats = overview?.stats as Record<string, unknown> | undefined;
    const nextRides = (overview?.nextRides as Array<{
        _id: string;
        bookingNumber: string;
        pickupDate?: string;
        pickupTime?: string;
        pickupAddress?: string;
        dropoffAddress?: string;
        amount: number;
        status: string;
    }>) ?? [];
    const topDestinations = (overview?.topDestinations as Array<{ name: string; count: number }>) ?? [];
    const chartData = (overview?.chart as Array<{ month: string; spending: number; bookings: number }>) ?? [];

    const labels = chartData.map((p) => p.month);
    const spending = chartData.map((p) => p.spending);
    const bookingCounts = chartData.map((p) => p.bookings);

    const fullName = account
        ? account.fullName?.trim() ||
          account.name?.trim() ||
          (account.firstName && account.lastName && account.firstName !== account.lastName
              ? `${account.firstName} ${account.lastName}`.trim()
              : account.firstName || account.lastName || "")
        : "";
    const oneWayDiscount = Number(account?.rideDiscounts?.oneWay ?? 0);
    const returnTripDiscount = Number(account?.rideDiscounts?.returnTrip ?? 0);
    const currentDate = formatDate(new Date().toISOString());

    return (
        <div className="space-y-4">
            <div className="rounded-md border border-border bg-background px-5 py-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-3 py-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                {t("welcome_back")}
                            </p>
                        </div>
                        <h1 className="text-2xl font-semibold leading-tight text-foreground sm:text-[28px]">
                            {isLoading ? t("loading") : fullName || t("loading")}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {t("overview_subtitle")}
                        </p>
                    </div>
                    <p className="rounded-full bg-muted/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {currentDate}
                    </p>
                </div>
                <div className="mt-4 border-t border-border/70 pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-foreground">{t("ride_discounts.title")}</p>
                            <p className="text-xs text-muted-foreground">{t("ride_discounts.subtitle")}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground">
                                {t("ride_discounts.one_way", { discount: oneWayDiscount })}
                            </span>
                            <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground">
                                {t("ride_discounts.return", { discount: returnTripDiscount })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <Stats
                    stats={{
                        totalRides: Number(stats?.totalRides ?? 0),
                        completedRides: Number(stats?.completedRides ?? 0),
                        upcomingRides: Number(stats?.upcomingRides ?? 0),
                        nextRideDate: stats?.nextRideDate as string | undefined,
                        lastRideDate: stats?.lastRideDate as string | undefined,
                    }}
                />
            </div>

            <QuickActions />

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-8 space-y-6">
                    <Card className="bg-background border-border shadow-sm rounded-md">
                        <CardHeader className="pb-0 mb-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <CardTitle className="flex-1 whitespace-nowrap text-xl font-bold">
                                    {t("spending_bookings.title")}
                                </CardTitle>
                                <div className="inline-flex items-center rounded-md border border-border p-1">
                                    {[3, 6, 12].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setMonths(value as 3 | 6 | 12)}
                                            className={`rounded-sm px-2.5 py-1 text-xs font-semibold ${months === value
                                                ? "bg-secondary text-secondary-foreground"
                                                : "text-muted-foreground"
                                                }`}
                                        >
                                            {t("spending_bookings.months", { value })}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="px-0">
                            <RevinueChart
                                labels={labels}
                                spending={spending}
                                bookings={bookingCounts}
                            />
                        </CardContent>
                    </Card>

                    <NextRides rides={nextRides} />
                </div>

                <div className="col-span-12 xl:col-span-4">
                    <ActivityOverview
                        stats={{
                            upcomingRides: Number(stats?.upcomingRides ?? 0),
                            completedRides: Number(stats?.completedRides ?? 0),
                            cancelledRides: Number(stats?.cancelledRides ?? 0),
                            totalSpent: Number(stats?.totalSpent ?? 0),
                            averageRideValue: Number(stats?.averageRideValue ?? 0),
                        }}
                        topDestinations={topDestinations}
                        security={undefined}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPageView;
