import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";
import type { BookingCategory } from "@/store/use-booking-store";

export type GetQuoteParams = {
  distance?: number;
  passengers: number;
  category: BookingCategory;
  duration?: number;
};

export type PublicQuotePriceBreakdown = {
  totalPrice: number;
  includedDistance?: number;
  extraDistancePrice?: number;
};

export type PublicQuoteCategory = {
  name: string;
  image?: string;
  vehicles: string[];
  requestForQuote: boolean;
};

export type PublicQuote = {
  categoryId: string;
  category: PublicQuoteCategory;
  priceBreakdown: PublicQuotePriceBreakdown;
  passengers: number;
  luggage: number;
};

export const getQuote = async (params: GetQuoteParams) => {
  return api.get<PublicQuote[]>(API_ROUTES.QUOTE, { params });
};
