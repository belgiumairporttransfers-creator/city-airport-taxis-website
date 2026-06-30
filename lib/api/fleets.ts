import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export type PublicFleetCategory = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    passengerCapacity: number;
    luggageCapacity: number;
    vehicles: string[];
};

export const getFleetCategories = () => {
    return api.get<PublicFleetCategory[]>(API_ROUTES.VEHICLE_CATEGORIES);
};

export const toFleetCardData = (category: PublicFleetCategory) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    image: category.image,
    passengers: category.passengerCapacity,
    suitcases: category.luggageCapacity,
    carType: category.vehicles.join(", "),
});
