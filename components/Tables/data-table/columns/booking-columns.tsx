import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/features/form/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "../data-table-row-actions";
import type { BookingListItem } from "@/lib/api/bookings";
import { formatPrice } from "@/lib/utils";
import { CircleX, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function getBookingColumns({
    onCancel,
    onDelete,
    t,
}: {
    onCancel?: (booking: BookingListItem) => Promise<void>;
    onDelete?: (booking: BookingListItem) => Promise<void>;
    t?: any;
} = {}): ColumnDef<BookingListItem, unknown>[] {
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
            accessorKey: "bookingNumber",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("booking_id", "Booking ID")} />,
            cell: ({ row }) => (
                <span className="font-mono text-sm font-semibold">{row.original.bookingNumber || translate("na", "N/A")}</span>
            ),
        },
        {
            id: "customer",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("passenger", "Passenger")} />,
            accessorFn: (row) => {
                const p = row.passengerDetails || (row as any).customer;
                const fullName =
                    p?.fullName ||
                    `${p?.firstName || ""} ${p?.lastName || ""}`.trim() ||
                    p?.firstName ||
                    p?.name ||
                    translate("na", "N/A");
                return `${fullName} ${p?.email || ""}`.trim();
            },
            cell: ({ row }) => {
                const p = row.original.passengerDetails || (row.original as any).customer;
                const fullName =
                    p?.fullName ||
                    `${p?.firstName || ""} ${p?.lastName || ""}`.trim() ||
                    p?.firstName ||
                    p?.name ||
                    translate("na", "N/A");
                const email = p?.email || translate("na", "N/A");
                return (
                    <div className="flex flex-col">
                        <span className="font-medium">{fullName}</span>
                        <span className="text-xs text-muted-foreground">{email}</span>
                    </div>
                );
            },
        },
        {
            id: "pickupAddress",
            accessorFn: (row) => row.tripDetails?.pickupAddress || (row as any).route?.pickupAddress || "",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("pickup", "Pickup")} />,
            cell: ({ row }) => {
                const address =
                    row.original.tripDetails?.pickupAddress ||
                    (row.original as any).route?.pickupAddress ||
                    translate("na", "N/A");
                return (
                    <span className="block max-w-[180px] truncate" title={address}>
                        {address}
                    </span>
                );
            },
        },
        {
            id: "deliveryAddress",
            accessorFn: (row) =>
                row.tripDetails?.deliveryAddress ||
                (row as any).route?.dropoffAddress ||
                (row as any).route?.deliveryAddress ||
                "",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("dropoff", "Drop-off")} />,
            cell: ({ row }) => {
                const address =
                    row.original.tripDetails?.deliveryAddress ||
                    (row.original as any).route?.dropoffAddress ||
                    (row.original as any).route?.deliveryAddress ||
                    translate("na", "N/A");
                return (
                    <span className="block max-w-[180px] truncate" title={address}>
                        {address}
                    </span>
                );
            },
        },
        {
            id: "amount",
            accessorFn: (row) => Number(row.amount ?? (row as any).pricing?.total ?? 0),
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("amount", "Amount")} />,
            cell: ({ row }) => {
                const amount = Number(row.original.amount ?? (row.original as any).pricing?.total ?? 0);
                return <span className="font-semibold">{formatPrice(amount)}</span>;
            },
        },
        {
            id: "paymentMethod",
            accessorFn: (row) =>
                row.paymentMethod ||
                (row as any).payment?.paymentMethod ||
                (row as any).paymentInfo?.paymentMethod ||
                "mollie",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("payment", "Payment")} />,
            cell: ({ row }) => {
                const method =
                    row.original.paymentMethod ||
                    (row.original as any).payment?.paymentMethod ||
                    (row.original as any).paymentInfo?.paymentMethod ||
                    "mollie";
                const isCash = method === "cash";
                const label = isCash ? translate("cash", "Cash") : translate("online", "Card");
                return (
                    <Badge color="secondary" variant="soft" className="font-semibold">
                        {label}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("status", "Status")} />,
            cell: ({ row }) => {
                const status = row.original.status || "pending";
                const statusClass =
                    status === "complete" || status === "confirmed"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : status === "cancelled"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-slate-100 text-slate-700 border-slate-200";

                return <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusClass}`}>{status}</span>;
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => <DataTableColumnHeader column={column} title={translate("booked_on", "Booked On")} />,
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
                const canCancel = ["pending", "confirmed"].includes(String(row.original.status || ""));
                const actions = [
                    {
                        label: translate("cancel_ride", "Cancel Ride"),
                        onClick: onCancel && canCancel ? () => onCancel(row.original) : undefined,
                        icon: <CircleX className="h-4 w-4" />,
                        destructive: true,
                        confirm: true,
                        successMessage: translate("cancel_success", "Ride cancelled successfully."),
                        confirmTitle: translate("cancel_confirm_title", "Cancel This Ride?"),
                        confirmDescription: translate("cancel_confirm_desc", "You can only cancel up to 4 hours before pickup time. This action will mark the booking as cancelled."),
                        confirmLabel: translate("cancel_ride", "Cancel Ride"),
                    },
                    {
                        label: translate("delete", "Delete"),
                        onClick: onDelete ? () => onDelete(row.original) : undefined,
                        icon: <Trash2 className="h-4 w-4" />,
                        destructive: true,
                        confirm: true,
                        successMessage: translate("delete_success", "Booking deleted successfully."),
                    },
                ].filter((action) => Boolean(action.onClick));

                return <DataTableRowActions row={row} actions={actions} />;
            },
        },
    ];
}
