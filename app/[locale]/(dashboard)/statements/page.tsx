"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
// import { useDownloadMonthlyStatement, useUserStatements } from "@/hooks/queries/use-dashboard";
import { formatDate, formatPrice } from "@/lib/utils";
import { Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

const StatementsPage = () => {
    const t = useTranslations("dashboard.statements_page");
    // const { data, isLoading, isFetching, error } = useUserStatements();
    // const { mutate: downloadStatement, isPending: isDownloading } = useDownloadMonthlyStatement();
    const isLoading = false;
    const isFetching = false;
    const error = null;
    const isDownloading = false;
    const downloadStatement = (_monthKey: string) => {};
    const statements: Array<{
        monthKey: string;
        monthLabel: string;
        totalBookings: number;
        completedBookings: number;
        totalSpent: number;
    }> = [];
    const joinedAt = undefined;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="space-y-1">
                            <CardTitle className="text-2xl">{t("title")}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {t("subtitle")}
                            </p>
                        </div>
                        <div className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground">
                            {t("joined", { date: formatDate(joinedAt) })}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="py-8 text-sm text-muted-foreground">{t("loading")}</div>
                    ) : error ? (
                        <div className="py-8 text-sm font-medium text-red-500">
                            {t("failed")}
                        </div>
                    ) : statements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border py-10 text-center">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{t("no_data")}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-md border border-border">
                            <table className="w-full min-w-[760px] text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="px-4 py-3 text-left font-semibold text-foreground">{t("table.month")}</th>
                                        <th className="px-4 py-3 text-left font-semibold text-foreground">{t("table.bookings")}</th>
                                        <th className="px-4 py-3 text-left font-semibold text-foreground">{t("table.completed")}</th>
                                        <th className="px-4 py-3 text-left font-semibold text-foreground">{t("table.spent")}</th>
                                        <th className="px-4 py-3 text-right font-semibold text-foreground">{t("table.action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statements.map((statement) => (
                                        <tr key={statement.monthKey} className="border-b border-border last:border-0">
                                            <td className="px-4 py-3 font-medium text-foreground">{statement.monthLabel}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{statement.totalBookings}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{statement.completedBookings}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{formatPrice(statement.totalSpent)}</td>
                                            <td className="px-4 py-3 text-right">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => downloadStatement(statement.monthKey)}
                                                    disabled={isDownloading}
                                                    className="gap-1.5"
                                                >
                                                    <Download className="h-3.5 w-3.5" />
                                                    {t("table.download_pdf")}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {isFetching && !isLoading && (
                        <p className="mt-3 text-xs text-muted-foreground">{t("refreshing")}</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StatementsPage;
