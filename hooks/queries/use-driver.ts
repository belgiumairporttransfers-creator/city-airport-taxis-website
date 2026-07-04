import { submitDriverApplication, type SubmitDriverApplicationPayload } from "@/lib/api/drivers";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ApiError = { message?: string };

export const useSubmitDriverApplication = () => {
    return useMutation({
        mutationFn: (payload: SubmitDriverApplicationPayload) => submitDriverApplication(payload),
        onSuccess: (data) => {
            const applicationNumber = data?.applicationNumber;
            toast.success(
                applicationNumber
                    ? `Application submitted successfully. Your application number is ${applicationNumber}.`
                    : "Application submitted successfully."
            );
        },
        onError: (error: ApiError) => {
            toast.error(error?.message || "Failed to submit application. Please try again.");
        },
    });
};
