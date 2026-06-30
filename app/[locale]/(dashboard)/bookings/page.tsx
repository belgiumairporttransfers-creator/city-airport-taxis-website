"use client";

import React from "react";
import { DataTable } from "@/components/Tables/data-table/data-table";
import { getBookingColumns } from "@/components/Tables/data-table/columns/booking-columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import type { BookingListItem } from "@/lib/api/bookings";
// import { useCancelMyBooking, useDeleteMyBooking, useDeleteMyBookings, useMyBookings } from "@/hooks/queries/use-booking";
import { useTranslations } from "next-intl";

const BookingsPage = () => {
    const t = useTranslations("dashboard.bookings_page");
    const tCol = useTranslations("dashboard.table_columns");
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    // const { data, isLoading, isFetching, error } = useMyBookings({ page, limit });
    // const { mutateAsync: cancelMyBooking } = useCancelMyBooking();
    // const { mutateAsync: deleteMyBooking } = useDeleteMyBooking();
    // const { mutateAsync: deleteMyBookings, isPending: isDeleting } = useDeleteMyBookings();
    const data = { data: [] as BookingListItem[], meta: undefined };
    const isLoading = false;
    const isFetching = false;
    const isDeleting = false;
    const cancelMyBooking = async (_id: string) => {};
    const deleteMyBooking = async (_id: string) => {};
    const deleteMyBookings = async (_ids: string[]) => {};

    const [selectedToDelete, setSelectedToDelete] = React.useState<BookingListItem[]>([]);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = React.useState(false);

    const columns = React.useMemo(
        () =>
            getBookingColumns({
                onCancel: async (booking) => {
                    await cancelMyBooking(booking._id);
                },
                onDelete: async (booking) => {
                    await deleteMyBooking(booking._id);
                },
                t: tCol
            }),
        [tCol]
    );

    const handleBulkDelete = (selectedRows: BookingListItem[]) => {
        setSelectedToDelete(selectedRows);
        setIsBulkDeleteDialogOpen(true);
    };

    const confirmBulkDelete = async () => {
        const ids = selectedToDelete.map((row) => row._id);
        await deleteMyBookings(ids);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-2xl">{t("title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data?.data || []}
                        loading={isLoading}
                        fetching={isFetching}
                        error={null}
                        searchKey={t("search_placeholder")}
                        pagination={data?.meta}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                        onBulkDelete={handleBulkDelete}
                        isDeleting={isDeleting}
                    />
                </CardContent>
            </Card>

            <DeleteConfirmationDialog
                open={isBulkDeleteDialogOpen}
                onClose={() => setIsBulkDeleteDialogOpen(false)}
                onConfirm={confirmBulkDelete}
                title={t("bulk_delete.title")}
                description={t("bulk_delete.description", { count: selectedToDelete.length })}
                toastMessage={t("bulk_delete.success", { count: selectedToDelete.length })}
                defaultToast={false}
            />
        </div>
    );
};

export default BookingsPage;
