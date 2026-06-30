import {
  getBookingById,
  isBookingPaymentFailed,
  isBookingPaymentSuccess,
  type BookingStatusResponse,
} from "@/lib/api/bookings";
import type { ApiError } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

const shouldPollBooking = (booking?: BookingStatusResponse) => {
  if (!booking) {
    return true;
  }

  if (isBookingPaymentSuccess(booking) || isBookingPaymentFailed(booking)) {
    return false;
  }

  return true;
};

export const useBookingStatus = (bookingId?: string) => {
  return useQuery({
    queryKey: ["booking-status", bookingId],
    queryFn: () => getBookingById(bookingId!),
    enabled: Boolean(bookingId),
    refetchInterval: (query) => (shouldPollBooking(query.state.data) ? 5000 : false),
    retry: (failureCount, error) => {
      const status = (error as ApiError)?.status;

      if (status === 429) {
        return failureCount < 6;
      }

      if (status === 404) {
        return false;
      }

      return failureCount < 2;
    },
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
};
