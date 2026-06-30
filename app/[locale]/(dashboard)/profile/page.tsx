"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
// import { useAuthLogoutAllDevices, useAuthMe } from "@/hooks/queries/use-auth";
import { Button } from "@/components/ui/button";
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
import { getInitials } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ProfilePage = () => {
    const t = useTranslations("dashboard.profile_page");
    // const { data, isLoading } = useAuthMe();
    // const logoutAllDevicesMutation = useAuthLogoutAllDevices();
    const isLoading = false;
    const logoutAllDevicesMutation = { isPending: false, mutate: () => {} };
    const [isLogoutAllDialogOpen, setIsLogoutAllDialogOpen] = React.useState(false);
    const account = undefined;

    const fullName = "User";
    const roleLabel = "USER";

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">{t("title")}</CardTitle>
                </CardHeader>
                {/* <CardContent>
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-2xl font-semibold text-secondary-foreground">
                            {getInitials(fullName, "U")}
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold">
                                {isLoading ? t("loading") : fullName}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {isLoading ? t("email_loading") : account?.email || "—"}
                            </p>
                            <Badge color="secondary" variant="soft" className="capitalize">
                                {roleLabel}
                            </Badge>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-md border border-border p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("first_name")}</p>
                            <p className="mt-1 font-medium">{account?.firstName || "—"}</p>
                        </div>
                        <div className="rounded-md border border-border p-4">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("last_name")}</p>
                            <p className="mt-1 font-medium">{account?.lastName || "—"}</p>
                        </div>
                        <div className="rounded-md border border-border p-4 sm:col-span-2">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("email")}</p>
                            <p className="mt-1 font-medium">{account?.email || "—"}</p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-md border border-border p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold">{t("security.title")}</p>
                                <p className="text-xs text-muted-foreground">
                                    {t("security.subtitle")}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                color="destructive"
                                onClick={() => setIsLogoutAllDialogOpen(true)}
                                disabled={logoutAllDevicesMutation.isPending}
                                loading={logoutAllDevicesMutation.isPending}
                                loadingText={t("security.logging_out")}
                            >
                                {t("security.logout_all_button")}
                            </Button>
                        </div>
                    </div>
                </CardContent> */}
            </Card>

            <AlertDialog open={isLogoutAllDialogOpen} onOpenChange={setIsLogoutAllDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t("security.dialog_title")}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("security.dialog_description")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={logoutAllDevicesMutation.isPending}>{t("security.cancel")}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => logoutAllDevicesMutation.mutate()}
                            disabled={logoutAllDevicesMutation.isPending}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {logoutAllDevicesMutation.isPending ? t("security.logging_out") : t("security.confirm")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProfilePage;
