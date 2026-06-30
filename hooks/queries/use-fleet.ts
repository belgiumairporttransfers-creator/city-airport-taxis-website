import { getFleetCategories } from "@/lib/api/fleets";
import { useQuery } from "@tanstack/react-query";

export const useFleetCategories = () => {
    return useQuery({
        queryKey: ["fleet-categories"],
        queryFn: () => getFleetCategories(),
    });
};
