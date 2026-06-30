import { subscribeNewsletter } from "@/lib/api/newsletter";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ApiError = { message?: string };

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: subscribeNewsletter,
    onSuccess: () => {
      toast.success("Subscribed successfully!");
    },
    onError: (error: ApiError) => {
      const message = error?.message || "Failed to subscribe. Please try again.";
      toast.error(message);
    },
  });
};
