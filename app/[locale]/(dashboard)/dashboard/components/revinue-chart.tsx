"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useMemo, useCallback } from "react";
import type { ApexAxisChartSeries, ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";

interface RevinueChartProps {
    height?: number;
    labels?: string[];
    spending?: number[];
    bookings?: number[];
}

const RevinueChart = ({ height = 350, labels, spending, bookings }: RevinueChartProps) => {
    const t = useTranslations("dashboard.chart");

    const chartData = useMemo(() => ({
        labels: labels && labels.length > 0
            ? labels
            : [
                t("months.jan"),
                t("months.feb"),
                t("months.mar"),
                t("months.apr"),
                t("months.may"),
                t("months.jun")
            ],
    }), [labels, t]);

    const series = useMemo<ApexAxisChartSeries>(() => [
        {
            name: t("spending"),
            data: spending && spending.length > 0 ? spending : [0, 0, 0, 0, 0, 0],
        },
        {
            name: t("bookings"),
            data: bookings && bookings.length > 0 ? bookings : [0, 0, 0, 0, 0, 0],
        },
    ], [bookings, spending, t]);

    const themeColors = useMemo(() => {
        return {
            chartLabel: "#64748B",
            primary: "#008492",
            info: "#0EA5E9",
            chartGird: "#E2E8F0",
        };
    }, []);

    // Formatters
    const tooltipFormatter = useCallback((value: number, opts?: { seriesIndex?: number }) => {
        const seriesIndex = opts?.seriesIndex ?? 0;
        if (seriesIndex === 0) {
            return value.toString();
        }
        return `${Math.round(value)}`;
    }, []);

    const gridConfig = useMemo(
        () => ({
            show: false,
        }),
        []
    );

    const yaxisConfig = useMemo(
        () => ({
            labels: {
                style: {
                    colors: themeColors.chartLabel,
                },
            },
        }),
        [themeColors.chartLabel]
    );

    const options = useMemo<ApexOptions>(
        () => ({
            chart: {
                toolbar: { show: false },
            },
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    columnWidth: "20%",
                },
            },
            dataLabels: { enabled: false },
            stroke: { show: false },
            colors: [themeColors.primary, themeColors.info],
            tooltip: {
                y: { formatter: tooltipFormatter },
            },
            grid: gridConfig,
            yaxis: yaxisConfig,
            xaxis: {
                categories: chartData.labels,
                labels: {
                    style: {
                        colors: themeColors.chartLabel,
                        fontSize: "12px",
                    },
                },
            },
            legend: {
                position: "bottom",
                labels: { colors: themeColors.chartLabel },
            },
        }),
        [themeColors, chartData.labels, gridConfig, yaxisConfig, tooltipFormatter]
    );

    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            height={height}
            width="100%"
        />
    );
};

export default RevinueChart;
