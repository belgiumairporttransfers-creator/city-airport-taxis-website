import { createCheckoutSession } from "@/lib/api/checkout";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ApiError = { message?: string };

export const useCreateCheckoutSession = () => {
    return useMutation({
        mutationFn: createCheckoutSession,
        onSuccess: (data) => {
            if (data?.checkoutUrl) {
                window.location.href = data.checkoutUrl;
                return;
            }

            toast.error("Checkout could not be started. Please try again.");
        },
        onError: (error: ApiError) => {
            const message =
                error?.message || "Failed to start checkout. Please try again.";
            toast.error(message);
        },
    });
};
