import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export const subscribeNewsletter = async (payload: { email: string }) => {
  return api.post(API_ROUTES.NEWSLETTER_SUBSCRIBE, payload);
};
