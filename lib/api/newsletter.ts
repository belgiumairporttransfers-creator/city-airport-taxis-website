import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export type NewsletterSource = "coming-soon" | "website";

export type SubscribeNewsletterPayload = {
  email: string;
  source: NewsletterSource;
};

export const subscribeNewsletter = async (payload: SubscribeNewsletterPayload) => {
  return api.post(API_ROUTES.NEWSLETTER_SUBSCRIBE, payload);
};
