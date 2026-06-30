import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";
import type { BookingCategory } from "@/store/use-booking-store";

export type GetQuoteParams = {
  distance: number;
  passengers: number;
  category: BookingCategory;
};

export type PublicQuotePriceBreakdown = {
  totalPrice: number;
};

export type PublicQuoteCategory = {
  name: string;
  image?: string;
  vehicles: string[];
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
