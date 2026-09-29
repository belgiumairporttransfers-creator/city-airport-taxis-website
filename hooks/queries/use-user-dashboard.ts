import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    getMyBookings,
    getMyDashboardOverview,
    deleteMyBooking,
    deleteMyBookings,
    cancelMyBooking,
    type UserBookingsListParams,
} from "@/lib/api/bookings";
import {
    getMyPayments,
    deleteMyPayment,
    deleteMyPayments,
    type UserPaymentsListParams,
} from "@/lib/api/payments";

// ─── Query keys ────────────────────────────────────────────────────────────

export const USER_DASHBOARD_QUERY_KEY = ["user", "dashboard"] as const;
export const USER_BOOKINGS_QUERY_KEY = ["user", "bookings"] as const;
export const USER_PAYMENTS_QUERY_KEY = ["user", "payments"] as const;

// ─── Dashboard overview ────────────────────────────────────────────────────

export const useUserDashboardOverview = (months?: 3 | 6 | 12) => {
    return useQuery({
        queryKey: [...USER_DASHBOARD_QUERY_KEY, months],
        queryFn: () => getMyDashboardOverview(months),
        staleTime: 1000 * 60 * 2,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

// ─── Bookings ──────────────────────────────────────────────────────────────

export const useMyBookings = (params?: UserBookingsListParams) => {
    return useQuery({
        queryKey: [...USER_BOOKINGS_QUERY_KEY, params],
        queryFn: () => getMyBookings(params),
        staleTime: 1000 * 60,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useCancelMyBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookingId: string) => cancelMyBooking(bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_BOOKINGS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: USER_DASHBOARD_QUERY_KEY });
            toast.success("Booking cancelled.");
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || "Failed to cancel booking.");
        },
    });
};

export const useDeleteMyBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookingId: string) => deleteMyBooking(bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_BOOKINGS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: USER_DASHBOARD_QUERY_KEY });
            toast.success("Booking removed.");
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || "Failed to remove booking.");
        },
    });
};

export const useDeleteMyBookings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (bookingIds: string[]) => deleteMyBookings(bookingIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_BOOKINGS_QUERY_KEY });
            queryClient.invalidateQueries({ queryKey: USER_DASHBOARD_QUERY_KEY });
            toast.success("Bookings removed.");
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || "Failed to remove bookings.");
        },
    });
};

// ─── Payments ─────────────────────────────────────────────────────────────

export const useMyPayments = (params?: UserPaymentsListParams) => {
    return useQuery({
        queryKey: [...USER_PAYMENTS_QUERY_KEY, params],
        queryFn: () => getMyPayments(params),
        staleTime: 1000 * 60,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useDeleteMyPayment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (paymentId: string) => deleteMyPayment(paymentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_PAYMENTS_QUERY_KEY });
            toast.success("Payment record removed.");
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || "Failed to remove payment.");
        },
    });
};

export const useDeleteMyPayments = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (paymentIds: string[]) => deleteMyPayments(paymentIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_PAYMENTS_QUERY_KEY });
            toast.success("Payment records removed.");
        },
        onError: (error: { message?: string }) => {
            toast.error(error?.message || "Failed to remove payment records.");
        },
    });
};
