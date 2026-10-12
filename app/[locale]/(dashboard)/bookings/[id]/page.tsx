"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, CircleX, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import {
    useCancelMyBooking,
    useDeleteMyBooking,
    useMyBooking,
} from "@/hooks/queries/use-user-dashboard";
import {
    canCancelUserBooking,
    canDeleteUserBooking,
    canDownloadReceipt,
    type BookingListItem,
} from "@/lib/api/bookings";
import { downloadBookingReceiptPdf } from "@/lib/receipt/download-receipt";
import { formatDate, formatDistance, formatDisplayTime, formatPrice } from "@/lib/utils";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const InfoItem = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <div className="rounded-md border border-border/70 bg-muted/20 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold text-foreground">{value || "—"}</p>
    </div>
);

const statusClassName = (status?: string) => {
    if (status === "complete" || status === "confirmed") {
        return "bg-green-100 text-green-700 border-green-200";
    }
    if (status === "cancelled") {
        return "bg-red-100 text-red-700 border-red-200";
    }
    return "bg-slate-100 text-slate-700 border-slate-200";
};

const passengerName = (booking?: BookingListItem) =>
    booking?.passengerDetails?.fullName ||
    `${booking?.passengerDetails?.firstName ?? ""} ${booking?.passengerDetails?.lastName ?? ""}`.trim() ||
    "—";

const BookingDetailsPage = () => {
    const t = useTranslations("dashboard.booking_details");
    const tCol = useTranslations("dashboard.table_columns");
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const bookingId = params?.id;
    const { data: booking, isLoading, isError, error } = useMyBooking(bookingId);
    const { mutateAsync: cancelBooking, isPending: isCancelling } = useCancelMyBooking();
    const { mutateAsync: deleteBooking, isPending: isDeleting } = useDeleteMyBooking();
    const [cancelOpen, setCancelOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [isDownloadingReceipt, setIsDownloadingReceipt] = React.useState(false);

    const handleCancel = async () => {
        if (!bookingId) return;
        await cancelBooking(bookingId);
    };

    const handleDelete = async () => {
        if (!bookingId) return;
        await deleteBooking(bookingId);
        router.push("/bookings");
    };

    if (isLoading && !booking) {
        return (
            <Card>
                <CardContent className="py-16 text-center text-sm text-muted-foreground">
                    {t("loading")}
                </CardContent>
            </Card>
        );
    }

    if (isError || !booking) {
        return (
            <Card>
                <CardContent className="space-y-4 py-12 text-center">
                    <h1 className="text-xl font-semibold text-foreground">{t("not_found")}</h1>
                    <p className="text-sm text-muted-foreground">
                        {(error as { message?: string })?.message || t("load_error")}
                    </p>
                    <Button asChild variant="outline">
                        <Link href="/bookings">{t("back")}</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const trip = booking.tripDetails ?? {};
    const canCancel = canCancelUserBooking(booking.status);
    const canDelete = canDeleteUserBooking(booking.status);
    const canReceipt = canDownloadReceipt(booking);
    const isCash =
        booking.paymentMethod === "pay_onboard" || booking.paymentMethod === "cash";

    const handleDownloadReceipt = async () => {
        if (isDownloadingReceipt) return;
        setIsDownloadingReceipt(true);
        try {
            await downloadBookingReceiptPdf(booking);
            toast.success(tCol("download_receipt_success"));
        } catch (downloadError) {
            toast.error(
                (downloadError as { message?: string })?.message || tCol("download_receipt_error")
            );
        } finally {
            setIsDownloadingReceipt(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Button asChild variant="ghost" className="h-9 px-2 text-muted-foreground">
                    <Link href="/bookings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t("back")}
                    </Link>
                </Button>
                <div className="flex flex-wrap items-center gap-2">
                    {canReceipt ? (
                        <Button
                            variant="outline"
                            loading={isDownloadingReceipt}
                            onClick={handleDownloadReceipt}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            {tCol("download_receipt")}
                        </Button>
                    ) : null}
                    {canCancel ? (
                        <Button
                            variant="outline"
                            className="text-destructive"
                            loading={isCancelling}
                            onClick={() => setCancelOpen(true)}
                        >
                            <CircleX className="mr-2 h-4 w-4" />
                            {tCol("cancel_ride")}
                        </Button>
                    ) : null}
                    {canDelete ? (
                        <Button
                            variant="destructive"
                            loading={isDeleting}
                            onClick={() => setDeleteOpen(true)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {tCol("delete")}
                        </Button>
                    ) : null}
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {t("booking_number")}
                        </p>
                        <CardTitle className="mt-1 font-mono text-2xl">
                            {booking.bookingNumber || "—"}
                        </CardTitle>
                    </div>
                    <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusClassName(booking.status)}`}
                    >
                        {booking.status || "pending"}
                    </span>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <InfoItem label={t("amount")} value={formatPrice(booking.amount || 0)} />
                    <InfoItem
                        label={t("payment")}
                        value={isCash ? tCol("cash") : tCol("online")}
                    />
                    <InfoItem label={t("payment_status")} value={booking.paymentStatus || "—"} />
                    <InfoItem
                        label={t("booked_on")}
                        value={booking.createdAt ? formatDate(booking.createdAt) : "—"}
                    />
                </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">{t("trip")}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        <InfoItem label={t("pickup")} value={trip.pickupAddress} />
                        <InfoItem label={t("dropoff")} value={trip.deliveryAddress} />
                        <InfoItem label={t("date")} value={formatDate(trip.pickupDate)} />
                        <InfoItem label={t("time")} value={formatDisplayTime(trip.pickupTime)} />
                        <InfoItem label={t("distance")} value={formatDistance(trip.distance) || "—"} />
                        <InfoItem label={t("category")} value={booking.category || "—"} />
                        {trip.flightNumber ? (
                            <InfoItem label={t("flight")} value={trip.flightNumber} />
                        ) : null}
                        {trip.notes ? <InfoItem label={t("notes")} value={trip.notes} /> : null}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">{t("passenger")}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        <InfoItem label={t("name")} value={passengerName(booking)} />
                        <InfoItem label={t("email")} value={booking.passengerDetails?.email} />
                        <InfoItem label={t("phone")} value={booking.passengerDetails?.phone} />
                        <InfoItem label={t("vehicle")} value={booking.vehicle?.name} />
                    </CardContent>
                </Card>
            </div>

            <DeleteConfirmationDialog
                open={cancelOpen}
                onClose={() => setCancelOpen(false)}
                onConfirm={handleCancel}
                defaultToast={false}
                title={tCol("cancel_confirm_title")}
                description={tCol("cancel_confirm_desc")}
            />
            <DeleteConfirmationDialog
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
                defaultToast={false}
                title={tCol("delete_confirm_title")}
                description={tCol("delete_confirm_desc")}
            />
        </div>
    );
};

export default BookingDetailsPage;
