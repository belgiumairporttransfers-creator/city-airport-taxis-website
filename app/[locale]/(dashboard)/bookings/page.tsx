"use client";

import React from "react";
import { DataTable } from "@/components/Tables/data-table/data-table";
import { getBookingColumns } from "@/components/Tables/data-table/columns/booking-columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import type { BookingListItem } from "@/lib/api/bookings";
import {
    useCancelMyBooking,
    useDeleteMyBooking,
    useDeleteMyBookings,
    useMyBookings,
} from "@/hooks/queries/use-user-dashboard";
import { useTranslations } from "next-intl";

const BookingsPage = () => {
    const t = useTranslations("dashboard.bookings_page");
    const tCol = useTranslations("dashboard.table_columns");
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    const { data, isLoading, isFetching, error } = useMyBookings({ page, limit });
    const { mutateAsync: cancelMyBooking } = useCancelMyBooking();
    const { mutateAsync: deleteMyBooking } = useDeleteMyBooking();
    const { mutateAsync: deleteMyBookings, isPending: isDeleting } = useDeleteMyBookings();

    const [selectedToDelete, setSelectedToDelete] = React.useState<BookingListItem[]>([]);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = React.useState(false);

    const columns = React.useMemo(
        () =>
            getBookingColumns({
                onCancel: async (booking) => {
                    const id = (booking as any)._id || (booking as any).id || "";
                    if (id) await cancelMyBooking(id);
                },
                onDelete: async (booking) => {
                    const id = (booking as any)._id || (booking as any).id || "";
                    if (id) await deleteMyBooking(id);
                },
                t: tCol,
            }),
        [tCol, cancelMyBooking, deleteMyBooking]
    );

    const handleBulkDelete = (selectedRows: BookingListItem[]) => {
        setSelectedToDelete(selectedRows);
        setIsBulkDeleteDialogOpen(true);
    };

    const confirmBulkDelete = async () => {
        const ids = selectedToDelete.map((row) => (row as any)._id || (row as any).id || "").filter(Boolean);
        if (ids.length > 0) {
            await deleteMyBookings(ids);
        }
    };

    // Normalise the response — backend returns { items, meta }
    const items = (data as { items?: BookingListItem[]; data?: BookingListItem[] } | undefined)?.items
        ?? (data as { items?: BookingListItem[]; data?: BookingListItem[] } | undefined)?.data
        ?? [];
    const rawMeta = (data as { meta?: { total?: number; page?: number; totalPages?: number; limit?: number } } | undefined)?.meta;
    const meta = rawMeta
        ? {
              total: rawMeta.total ?? 0,
              page: rawMeta.page ?? 1,
              pages: rawMeta.totalPages ?? 1,
              limit: rawMeta.limit ?? limit,
          }
        : undefined;
    const errorMessage = error ? (error as Error).message || "An error occurred" : null;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-2xl">{t("title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={items}
                        loading={isLoading}
                        fetching={isFetching}
                        error={errorMessage}
                        searchKey={t("search_placeholder")}
                        pagination={meta}
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
