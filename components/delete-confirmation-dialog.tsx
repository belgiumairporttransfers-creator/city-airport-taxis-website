"use client";

import React from "react";
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
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

const DeleteConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    defaultToast = true,
    toastMessage = "Successfully deleted",
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
}: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    defaultToast?: boolean;
    toastMessage?: string;
    title?: string;
    description?: string;
}) => {
    const t = useTranslations("common.dashboard");
    const [isPending, setIsPending] = React.useState(false);

    const handleConfirm = async () => {
        if (isPending) return;
        setIsPending(true);
        try {
            await onConfirm();
            if (defaultToast) {
                toast.success(toastMessage, {
                    position: "top-right",
                });
            }
        } catch (error) {
            const message =
                (error as { message?: string })?.message || "Action failed. Please try again.";
            toast.error(message, { position: "top-right" });
        } finally {
            setIsPending(false);
            onClose();
        }
    };

    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="border-border">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                        className={isPending ? "pointer-events-none" : ""}
                        onClick={(event) => {
                            event.preventDefault();
                            void handleConfirm();
                        }}
                    >
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isPending ? t("deleting") : t("continue")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmationDialog;
