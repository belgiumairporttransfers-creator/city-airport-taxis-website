import { getHourlyDurations } from "@/lib/api/hourly-pricing";
import { useQuery } from "@tanstack/react-query";

export const useHourlyDurations = (enabled = true) => {
  return useQuery({
    queryKey: ["hourly-durations"],
    queryFn: getHourlyDurations,
    enabled,
    staleTime: 1000 * 60,
  });
};
