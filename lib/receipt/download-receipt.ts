import { downloadMyBookingReceipt, type BookingListItem } from "@/lib/api/bookings";

const triggerBrowserDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

export const downloadBookingReceiptPdf = async (booking: BookingListItem) => {
  const bookingId = booking._id || (booking as { id?: string }).id;
  if (!bookingId) {
    throw new Error("Booking id is missing");
  }

  const blob = await downloadMyBookingReceipt(bookingId);
  const filename = `payment-receipt-${booking.bookingNumber || bookingId}.pdf`;
  triggerBrowserDownload(blob, filename);
};
