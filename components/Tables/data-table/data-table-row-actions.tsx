"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { toast } from "react-hot-toast";

interface LabelOption {
  label: string;
  value: string;
}

interface RowAction<TData> {
  label: string;
  onClick?: (row: TData) => void | Promise<void>;
  shortcut?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  confirm?: boolean;
  subMenu?: {
    title: string;
    options: LabelOption[];
    valueKey?: string;
  };
  openModal?: boolean;
  successMessage?: string;
  href?: string;
  confirmTitle?: string;
  confirmDescription?: string;
  confirmLabel?: string;
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  actions: RowAction<TData>[];
}

import Link from "next/link";
import { useRouter } from "next/navigation";

const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (!error) return fallback;
  if (typeof error === "string") return error;

  const err = error as {
    message?: string;
    response?: { data?: { message?: string; error?: string } };
    statusText?: string;
  };

  return (
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.message ||
    err.statusText ||
    fallback
  );
};

export function DataTableRowActions<TData>({
  row,
  actions,
}: DataTableRowActionsProps<TData>) {
  const item = row.original;
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [pendingAction, setPendingAction] = React.useState<RowAction<TData> | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleAction = async (action: RowAction<TData>) => {
    if (action.href) {
      router.push(action.href);
      return;
    }

    if (action.openModal) {
      setDetailsOpen(true);
      return;
    }

    if (action.confirm && action.destructive) {
      setPendingAction(action);
      setConfirmOpen(true);
      return;
    }

    await action.onClick?.(item);
    if (action.successMessage) toast.success(action.successMessage);
  };

  const handleConfirm = async () => {
    if (!pendingAction || isDeleting) return;

    setIsDeleting(true);
    try {
      await pendingAction.onClick?.(item);
      if (pendingAction.successMessage) toast.success(pendingAction.successMessage);
      setPendingAction(null);
      setConfirmOpen(false);
    } catch (error) {
      const message = extractErrorMessage(
        error,
        "Action failed. Please try again."
      );
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && isDeleting) {
      return;
    }
    setConfirmOpen(open);
    if (!open) {
      setPendingAction(null);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[150px] bg-white text-black border border-gray-200 shadow-md"
        >
          {actions.map((action, index) =>
            action.subMenu ? (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>{action.subMenu.title}</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-white text-black border border-gray-200 shadow-md">
                  <DropdownMenuRadioGroup
                    value={
                      (item as any)[action.subMenu.valueKey || action.subMenu.title] || ""
                    }
                  >
                    {action.subMenu.options.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                        onClick={() => toast(`Set ${option.label}`)}
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                key={index}
                onClick={() => handleAction(action)}
                className={`
                flex items-center justify-between
                ${action.destructive ? "text-destructive focus:text-destructive" : ""}
              `}
              >
                <span>{action.label}</span>
                <span className="w-4 flex justify-end">{action.icon}</span>
              </DropdownMenuItem>

            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirm Delete */}
      <AlertDialog open={confirmOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent className="border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>{pendingAction?.confirmTitle || "Confirm Deletion"}</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.confirmDescription || "Are you sure you want to delete this item? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleConfirm();
              }}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90 disabled:opacity-50"
            >
              {isDeleting
                ? "Processing..."
                : pendingAction?.confirmLabel || "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Item Details</DialogTitle>
            <DialogDescription>Here’s more info about this row.</DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2 text-sm">
            {Object.entries(item as Record<string, any>).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b py-1">
                <span className="font-medium capitalize">{key}</span>
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
