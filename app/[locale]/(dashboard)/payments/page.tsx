"use client";

import React from "react";
import { DataTable } from "@/components/Tables/data-table/data-table";
import { getPaymentColumns } from "@/components/Tables/data-table/columns/payment-columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import type { UserPayment } from "@/lib/api/payments";
// import { useDeleteMyPayment, useDeleteMyPayments, useMyPayments } from "@/hooks/queries/use-payment";
import { useTranslations } from "next-intl";

const PaymentsPage = () => {
    const t = useTranslations("dashboard.payments_page");
    const tCol = useTranslations("dashboard.table_columns");
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);
    // const { data, isLoading, isFetching, error } = useMyPayments({ page, limit });
    // const { mutateAsync: deleteMyPayment } = useDeleteMyPayment();
    // const { mutateAsync: deleteMyPayments, isPending: isDeleting } = useDeleteMyPayments();
    const data = { data: [] as UserPayment[], meta: undefined };
    const isLoading = false;
    const isFetching = false;
    const isDeleting = false;
    const deleteMyPayment = async (_id: string) => {};
    const deleteMyPayments = async (_ids: string[]) => {};

    const [selectedToDelete, setSelectedToDelete] = React.useState<UserPayment[]>([]);
    const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = React.useState(false);

    const columns = React.useMemo(
        () =>
            getPaymentColumns({
                onDelete: async (payment) => {
                    await deleteMyPayment(payment._id);
                },
                t: tCol
            }),
        [tCol]
    );

    const handleBulkDelete = (selectedRows: UserPayment[]) => {
        setSelectedToDelete(selectedRows);
        setIsBulkDeleteDialogOpen(true);
    };

    const confirmBulkDelete = async () => {
        const ids = selectedToDelete.map((row) => row._id);
        await deleteMyPayments(ids);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-2xl">{t("title")}</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={[]}
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

export default PaymentsPage;
