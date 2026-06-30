import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export type PublicSettings = {
  maintenanceMode: boolean;
  comingSoonMode: boolean;
  minBookingMinutes?: number;
  stopFee?: number;
  cardProcessingFee?: number;
  airportPickup?: number;
  trainPickup?: number;
  meetAndGreet?: number;
  returnMeetAndGreet?: number;
  waitingTimePricePerMinute?: number;
  waitingTimePricePerHour?: number;
};

export const getPublicSettings = async () => {
  return api.get<PublicSettings>(API_ROUTES.PUBLIC_SETTINGS);
};
