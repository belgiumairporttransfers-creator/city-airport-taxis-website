import {
    forgotPassword,
    login,
    logout,
    logoutAllDevices,
    me,
    resetPassword,
    signup,
} from "@/lib/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

export const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

type ApiError = { message?: string };

export const useAuthLogin = () => {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    return useMutation({
        mutationFn: login,
        onSuccess: async () => {
            toast.success("Logged in successfully!");
            await queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERY_KEY });
            window.location.assign(callbackUrl || "/dashboard");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Failed to log in. Please check your credentials.");
        },
    });
};

export const useAuthSignup = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: signup,
        onSuccess: async () => {
            toast.success("Account created successfully!");
            await queryClient.invalidateQueries({ queryKey: AUTH_ME_QUERY_KEY });
            router.push("/dashboard");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Failed to create account. Please try again.");
        },
    });
};

export const useAuthForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            toast.success("Reset link sent to your email!");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Failed to send reset link. Please try again.");
        },
    });
};

export const useAuthResetPassword = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            toast.success("Password reset successfully! You can now log in.");
            router.push("/login");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Failed to reset password. Please try again.");
        },
    });
};

export const useAuthLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });
            toast.success("Logged out successfully.");
            router.push("/login");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Failed to log out. Please try again.");
        },
    });
};

export const useAuthMe = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: AUTH_ME_QUERY_KEY,
        queryFn: me,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: options?.enabled ?? true,
    });
};

export const useAuthLogoutAllDevices = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logoutAllDevices,
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });
            toast.success("Logged out from all devices.");
            router.push("/login");
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Failed to log out from all devices.");
        },
    });
};
