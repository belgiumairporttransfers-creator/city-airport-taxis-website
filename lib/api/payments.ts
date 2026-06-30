import { api } from "./client";
import API_ROUTES from "./routes";

export type UserPaymentBookingRef = {
    _id?: string;
    bookingNumber?: string;
};

export type UserPayment = {
    _id: string;
    transactionId?: string;
    paymentId?: string;
    bookingId?: string | UserPaymentBookingRef;
    amount: number;
    paymentMethodType?: string;
    cardLast4?: string;
    status?: "pending" | "completed" | "failed" | "refunded" | string;
    createdAt?: string;
};

export type UserPaymentsListParams = {
    page?: number;
    limit?: number;
};

export type UserPaymentsListResponse = {
    data: UserPayment[];
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
};

export const getMyPayments = async (params?: UserPaymentsListParams) => {
    return api.get<UserPaymentsListResponse>(API_ROUTES.PAYMENTS, { params });
};

export const deleteMyPayment = async (paymentId: string) => {
    return api.delete(`${API_ROUTES.PAYMENTS}/${paymentId}`);
};

export const deleteMyPayments = async (paymentIds: string[]) => {
    return api.post(`${API_ROUTES.PAYMENTS}/bulk-delete`, { ids: paymentIds });
};
