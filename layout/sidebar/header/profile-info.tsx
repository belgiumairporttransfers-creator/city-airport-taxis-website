"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Power, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthLogout, useAuthMe } from "@/hooks/queries/use-auth";
import { getInitials } from "@/lib/utils";

const ProfileInfo = () => {
  const router = useRouter();
  const { data, isLoading } = useAuthMe();
  const logoutMutation = useAuthLogout();
  const currentAccount = data?.data?.account;

  const fullName = currentAccount?.name?.trim() || `${currentAccount?.firstName ?? ""} ${currentAccount?.lastName ?? ""}`.trim();
  const email = currentAccount?.email;
  const initials = getInitials(fullName || "Admin User", "AU");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full">
        <div className="flex items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground shadow-sm">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : initials}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 rounded-xl border border-border bg-background p-0 text-foreground shadow-xl" align="end" sideOffset={10}>
        <DropdownMenuLabel className="flex items-center gap-3 border-b border-border p-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground">
              {isLoading ? "Loading..." : fullName}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {isLoading ? "..." : email}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="hidden" />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            router.push("/profile");
          }}
          className="mx-1 my-1.5 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground"
        >
          <User className="w-4 h-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            logoutMutation.mutate();
          }}
          disabled={logoutMutation.isPending}
          className="mx-1 mb-1.5 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground disabled:opacity-50"
        >
          {logoutMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Logging out...
            </>
          ) : (
            <>
              <Power className="w-4 h-4" />
              Log out
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileInfo;
