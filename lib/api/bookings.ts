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
};

export const isBookingPaymentSuccess = (booking?: BookingStatusResponse) =>
  booking?.status === "confirmed" || booking?.paymentStatus === "paid";

export const isBookingPaymentFailed = (booking?: BookingStatusResponse) =>
  booking?.status === "cancelled" &&
  ["failed", "expired", "cancelled"].includes(booking.paymentStatus ?? "");

export const getBookingById = async (bookingId: string) => {
  const data = await api.get<BookingStatusResponse>(`${API_ROUTES.BOOKINGS}/${bookingId}`);

  if (!data) {
    throw new Error("Booking not found");
  }

  return data;
};
