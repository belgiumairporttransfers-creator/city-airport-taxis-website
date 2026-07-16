import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export type HourlyDurationOption = {
  duration: number;
};

export type HourlyDurationsResponse = {
  items: HourlyDurationOption[];
};

export const getHourlyDurations = async () => {
  return api.get<HourlyDurationsResponse>(API_ROUTES.HOURLY_DURATIONS);
};
