import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/features/form/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import type { UserPayment } from "@/lib/api/payments";
import { formatPrice } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export function getPaymentColumns({
    onDelete,
    t,
}: {
    onDelete?: (payment: UserPayment) => Promise<void>;
    t?: any;
} = {}): ColumnDef<UserPayment, unknown>[] {
    const translate = (key: string, fallback: string) => (t ? t(key) : fallback);

    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value: CheckedState) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value: CheckedState) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "transactionId",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("transaction", "Transaction")} />,
            cell: ({ row }) => (
                <span className="font-mono text-xs">{row.original.transactionId || row.original.paymentId || translate("na", "N/A")}</span>
            ),
        },
        {
            accessorKey: "bookingId.bookingNumber",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("booking", "Booking")} />,
            cell: ({ row }) => {
                const booking = row.original.bookingId;
                if (!booking || typeof booking === "string") return <span>{translate("na", "N/A")}</span>;
                return <span className="font-mono text-sm">{booking.bookingNumber || translate("na", "N/A")}</span>;
            },
        },
        {
            accessorKey: "amount",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("amount", "Amount")} />,
            cell: ({ row }) => <span className="font-semibold">{formatPrice(row.original.amount)}</span>,
        },
        {
            accessorKey: "paymentMethodType",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("method", "Method")} />,
            cell: ({ row }) => <span className="capitalize">{row.original.paymentMethodType || translate("online", "Card")}</span>,
        },
        {
            accessorKey: "cardLast4",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("card", "Card")} />,
            cell: ({ row }) => {
                if (!row.original.cardLast4) return <span>{translate("na", "N/A")}</span>;
                return <span className="font-mono">**** {row.original.cardLast4}</span>;
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("payment_status", "Payment Status")} />,
            cell: ({ row }) => {
                const status = row.original.status || "pending";
                const color =
                    status === "completed"
                        ? "success"
                        : status === "failed"
                            ? "destructive"
                            : status === "refunded"
                                ? "warning"
                                : "secondary";
                return (
                    <Badge color={color} variant={color === "secondary" ? "outline" : "soft"} className="capitalize">
                        {status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("paid_on", "Paid On")} />,
            cell: ({ row }) => {
                const date = row.original.createdAt ? new Date(row.original.createdAt) : null;
                if (!date || Number.isNaN(date.getTime())) return <span>{translate("na", "N/A")}</span>;
                return <span>{format(date, "dd MMM yyyy HH:mm")}</span>;
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center">{translate("actions", "Actions")}</div>,
            cell: ({ row }) => {
                const actions = [
                    {
                        label: translate("delete", "Delete"),
                        onClick: onDelete ? () => onDelete(row.original) : undefined,
                        icon: <Trash2 className="h-4 w-4" />,
                        destructive: true,
                        confirm: true,
                        successMessage: translate("delete_success", "Payment deleted successfully."),
                    },
                ].filter((action) => Boolean(action.onClick));

                return <DataTableRowActions row={row} actions={actions} />;
            },
        },
    ];
}
