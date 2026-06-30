"use client";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useMemo } from "react";

const StatsChart = ({ height = 305 }) => {
  const themeColor = useMemo(() => "#3B82F6", []);

  const options: any = useMemo(() => ({
    chart: {
      toolbar: {
        show: false,
      },
    },
    labels: ["Pending", "Confirmed", "Assigned", "In Progress", "Completed", "Cancelled"],
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    stroke: {
      width: 0,
    },
    colors: ["#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#22C55E", "#FACC15"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            style: {
              fontSize: "12px",
              fontWeight: 500,
              color: themeColor,
            },
            value: {
              color: themeColor,
            },
            total: {
              show: true,
              color: themeColor,
            },
          },
        },
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      position: "bottom",
      labels: {
        colors: themeColor,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: -5
      }
    }
  }), [themeColor]);

  return (
    <Chart
      options={options}
      series={[]}
      type="donut"
      height={height}
      width={"100%"}
    />
  );
};

export default StatsChart;
