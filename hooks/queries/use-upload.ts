import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/lib/api/upload";
import toast from "react-hot-toast";
import {
  getFileTooLargeMessage,
  MAX_UPLOAD_FILE_SIZE_LABEL,
} from "@/constants/upload";

export const useUpload = () => {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) => uploadImage(file, folder),
    onError: (error: { message?: string; status?: number }) => {
      if (error?.status === 413) {
        toast.error(getFileTooLargeMessage());
        return;
      }
      if (!error?.status) {
        toast.error(
          `Upload failed. Please ensure your file is under ${MAX_UPLOAD_FILE_SIZE_LABEL} and try again.`
        );
        return;
      }
      toast.error(error.message || "Failed to upload image");
    },
  });
};
