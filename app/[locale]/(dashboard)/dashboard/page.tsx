"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import RevinueChart from "./components/revinue-chart";
import Stats from "./components/stats";
import QuickActions from "./components/quick-actions";
import NextRides from "./components/next-rides";
import ActivityOverview from "./components/activity-overview";
// import { useAuthMe } from "@/hooks/queries/use-auth";
// import { useUserDashboardOverview } from "@/hooks/queries/use-dashboard";
import { formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";

const DUMMY_ACCOUNT = {
    firstName: "Jean",
    lastName: "Dupont",
    rideDiscounts: {
        oneWay: 10,
        returnTrip: 15,
    },
};

const DUMMY_CHART_BY_MONTHS: Record<3 | 6 | 12, { labels: string[]; spending: number[]; bookings: number[] }> = {
    3: {
        labels: ["Apr", "May", "Jun"],
        spending: [520, 460, 550],
        bookings: [4, 3, 5],
    },
    6: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        spending: [320, 410, 380, 520, 460, 550],
        bookings: [2, 3, 2, 4, 3, 5],
    },
    12: {
        labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        spending: [280, 310, 295, 340, 360, 390, 320, 410, 380, 520, 460, 550],
        bookings: [2, 2, 1, 3, 2, 3, 2, 3, 2, 4, 3, 5],
    },
};

const DUMMY_OVERVIEW = {
    stats: {
        totalRides: 24,
        completedRides: 18,
        upcomingRides: 2,
        cancelledRides: 4,
        totalSpent: 2840,
        averageRideValue: 118.33,
        nextRideDate: "2026-07-15T08:00:00.000Z",
        lastRideDate: "2026-06-20T14:30:00.000Z",
    },
    nextRides: [
        {
            _id: "ride-1",
            bookingNumber: "CAT-2401",
            pickupDate: "15 Jul 2026",
            pickupTime: "08:30",
            pickupAddress: "Brussels Airport (BRU), Zaventem",
            dropoffAddress: "Grand Place, Brussels",
            amount: 65,
            status: "confirmed",
        },
        {
            _id: "ride-2",
            bookingNumber: "CAT-2402",
            pickupDate: "22 Jul 2026",
            pickupTime: "17:45",
            pickupAddress: "Antwerp Central Station",
            dropoffAddress: "Antwerp Airport (ANR)",
            amount: 48,
            status: "pending",
        },
    ],
    topDestinations: [
        { name: "Brussels Airport (BRU)", count: 12 },
        { name: "Charleroi Airport (CRL)", count: 5 },
        { name: "Antwerp Central", count: 4 },
        { name: "Liège-Guillemins", count: 3 },
    ],
    security: {
        accountCreatedAt: "2025-03-12T10:00:00.000Z",
        lastSessionAt: "2026-07-01T09:15:00.000Z",
        lastSessionDevice: "Chrome on macOS",
        lastSessionLocation: "Brussels, Belgium",
        activeSessions: 2,
        status: "strong" as const,
    },
};

const DashboardPageView = () => {
    const t = useTranslations("dashboard");
    const [months, setMonths] = React.useState<3 | 6 | 12>(6);
    // const { data, isLoading } = useAuthMe();
    // const { data: overviewResponse } = useUserDashboardOverview(months);
    const isLoading = false;
    const account = DUMMY_ACCOUNT;
    const overview = React.useMemo(
        () => ({
            ...DUMMY_OVERVIEW,
            chart: DUMMY_CHART_BY_MONTHS[months],
        }),
        [months],
    );
    const fullName = `${account.firstName} ${account.lastName}`;
    const oneWayDiscount = Number(account.rideDiscounts.oneWay);
    const returnTripDiscount = Number(account.rideDiscounts.returnTrip);
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
                            {isLoading ? t("loading") : fullName}
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
                        totalRides: overview?.stats?.totalRides ?? 0,
                        completedRides: overview?.stats?.completedRides ?? 0,
                        upcomingRides: overview?.stats?.upcomingRides ?? 0,
                        nextRideDate: overview?.stats?.nextRideDate,
                        lastRideDate: overview?.stats?.lastRideDate,
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
                                labels={overview?.chart?.labels}
                                spending={overview?.chart?.spending}
                                bookings={overview?.chart?.bookings}
                            />
                        </CardContent>
                    </Card>

                    <NextRides rides={overview?.nextRides} />
                </div>

                <div className="col-span-12 xl:col-span-4">
                    <ActivityOverview
                        stats={{
                            upcomingRides: overview?.stats?.upcomingRides ?? 0,
                            completedRides: overview?.stats?.completedRides ?? 0,
                            cancelledRides: overview?.stats?.cancelledRides ?? 0,
                            totalSpent: overview?.stats?.totalSpent ?? 0,
                            averageRideValue: overview?.stats?.averageRideValue ?? 0,
                        }}
                        topDestinations={overview?.topDestinations}
                        security={overview?.security}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPageView;
