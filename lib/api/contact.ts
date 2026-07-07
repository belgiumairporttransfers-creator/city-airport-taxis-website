import API_ROUTES from "@/lib/api/routes";
import { api } from "./client";

export type SubmitContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type SubmitContactResponse = {
  id: string;
};

export const submitContact = async (payload: SubmitContactPayload) => {
  return api.post<SubmitContactResponse>(API_ROUTES.CONTACT, payload);
};
