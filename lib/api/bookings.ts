import { api } from "./client";
import API_ROUTES from "./routes";

export type BookingChildSeat = {
  seatId?: { name?: string };
  quantity?: number;
};

export type BookingStatusResponse = {
  bookingNumber: string;
  _id?: string;
  category?: string;
  status?: string;
  amount?: number;
  paymentStatus?: string;
  paymentMethod?: string;
  passengerDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  tripDetails?: {
    pickupAddress?: string;
    deliveryAddress?: string;
    pickupDate?: string;
    pickupTime?: string;
    deliveryTime?: string;
    distance?: number;
    durationMinutes?: number;
    estTime?: string;
    airportPickup?: boolean;
    flightNumber?: string;
    trainNumber?: string;
    notes?: string;
    stops?: Array<{ address?: string }>;
    returnDate?: string;
    returnTime?: string;
    returnNotes?: string;
    childSeats?: BookingChildSeat[];
    returnChildSeats?: BookingChildSeat[];
  };
  vehicle?: {
    name?: string;
    passengers?: number | string;
    suitcases?: number | string;
    image?: string;
    carType?: string;
  };
  pricingBreakdown?: {
    vehicleFare?: number;
    airportPickupFee?: number;
    total?: number;
    subtotal?: number;
    extras?: {
      airportPickup?: { total?: number };
    };
  };
  isBookingForSomeoneElse?: boolean;
};

export type BookingListItem = BookingStatusResponse & {
  _id: string;
  createdAt?: string;
  passengerDetails?: BookingStatusResponse["passengerDetails"] & {
    fullName?: string;
  };
  customer?: {
    firstName?: string;
    lastName?: string;
    fullName?: string;
    email?: string;
    phone?: string;
  };
  route?: {
    pickupAddress?: string;
    dropoffAddress?: string;
    deliveryAddress?: string;
    pickupDate?: string;
    pickupTime?: string;
  };
  pricing?: {
    total?: number;
    vehicleFare?: number;
  };
  payment?: {
    paymentMethod?: string;
    paymentStatus?: string;
  };
};

export const isBookingPaymentSuccess = (booking?: BookingStatusResponse) =>
  booking?.status === "confirmed" || booking?.paymentStatus === "paid";

export const isBookingPaymentFailed = (booking?: BookingStatusResponse) =>
  booking?.status === "cancelled" &&
  ["failed", "expired", "cancelled"].includes(booking.paymentStatus ?? "");

export const canCancelUserBooking = (status?: string) =>
  ["pending", "confirmed", "accepted"].includes(String(status || ""));

export const canDeleteUserBooking = (status?: string) =>
  ["pending", "cancelled"].includes(String(status || ""));

export const canDownloadReceipt = (
  booking: Pick<BookingListItem, "status" | "paymentStatus"> & {
    payment?: { paymentStatus?: string };
  }
) => {
  const paymentStatus = booking.paymentStatus || booking.payment?.paymentStatus;
  if (paymentStatus === "paid") return true;
  return ["confirmed", "accepted", "arrived", "started", "passenger-onboard", "complete"].includes(
    String(booking.status || "")
  );
};

export const getBookingById = async (bookingId: string) => {
  const data = await api.get<BookingStatusResponse>(`${API_ROUTES.BOOKINGS}/${bookingId}`);

  if (!data) {
    throw new Error("Booking not found");
  }

  return data;
};

export type UserBookingsListParams = {
  page?: number;
  limit?: number;
};

export type UserBookingsListResponse = {
  items: BookingListItem[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export const getMyBookings = async (params?: UserBookingsListParams) => {
  return api.get<UserBookingsListResponse>(API_ROUTES.USER_DASHBOARD_BOOKINGS, { params });
};

export const getMyBooking = async (bookingId: string) => {
  const data = await api.get<BookingListItem>(
    `${API_ROUTES.USER_DASHBOARD_BOOKINGS}/${bookingId}`
  );

  if (!data) {
    throw new Error("Booking not found");
  }

  return data;
};

export const deleteMyBooking = async (bookingId: string) => {
  return api.delete(`${API_ROUTES.USER_DASHBOARD_BOOKINGS}/${bookingId}`);
};

export const deleteMyBookings = async (bookingIds: string[]) => {
  return api.post(`${API_ROUTES.USER_DASHBOARD_BOOKINGS}/bulk-delete`, { bookingIds });
};

export const cancelMyBooking = async (bookingId: string, reason?: string) => {
  return api.post(`${API_ROUTES.USER_DASHBOARD_BOOKINGS}/${bookingId}/cancel`, { reason });
};

export const downloadMyBookingReceipt = async (bookingId: string) => {
  const blob = await api.get<Blob>(`${API_ROUTES.USER_DASHBOARD_BOOKINGS}/${bookingId}/receipt`, {
    responseType: "blob",
  });

  if (!blob) {
    throw new Error("Receipt could not be downloaded");
  }

  if (blob.type?.includes("application/json")) {
    const payload = JSON.parse(await blob.text()) as { error?: string; message?: string };
    throw new Error(payload.error || payload.message || "Receipt could not be downloaded");
  }

  return blob;
};

export const getMyDashboardOverview = async (months?: number) => {
  return api.get<Record<string, unknown>>(API_ROUTES.USER_DASHBOARD_OVERVIEW, {
    params: months ? { months } : undefined,
  });
};

