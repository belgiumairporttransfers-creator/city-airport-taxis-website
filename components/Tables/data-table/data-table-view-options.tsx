"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Table, Column } from "@tanstack/react-table";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}
type ColumnWithLabel<TData> = Column<TData> & {
  columnDef: Column<TData>["columnDef"] & {
    meta?: {
      label?: string;
    };
  };
};

const getFriendlyColumnLabel = (id: string) => {
  const labelMap: Record<string, string> = {
    bookingNumber: "Booking Ref",
    transactionId: "Transaction ID",
    customer: "Passenger",
    tripDetails_pickupAddress: "From",
    tripDetails_deliveryAddress: "To",
    createdAt: "Booked On",
  };

  if (labelMap[id]) return labelMap[id];

  return id
    .replaceAll("_", " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ltr:ml-2 rtl:mr-2 h-10">
          <SlidersHorizontal className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[180px] bg-white text-black border border-gray-200 shadow-md"
      >
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            const col = column as ColumnWithLabel<TData>;
            return (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={(value) => col.toggleVisibility(!!value)}
              >
                {col.columnDef.meta?.label ?? getFriendlyColumnLabel(col.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
