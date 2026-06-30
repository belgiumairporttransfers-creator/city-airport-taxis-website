import { getPublicSettings } from "@/lib/api/settings";
import { useQuery } from "@tanstack/react-query";

export const usePublicSettings = () => {
  return useQuery({
    queryKey: ["public-settings"],
    queryFn: getPublicSettings,
    staleTime: 1000 * 30,
  });
};
